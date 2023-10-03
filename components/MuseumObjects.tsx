import { useState } from "react";
import { z } from "zod";

const objectSchema = z.object({
    objectID: z.number(),
    isHighlight: z.boolean(),
    accessionYear: z.string(),
    isPublicDomain: z.boolean(),
    primaryImage: z.string(),
    primaryImageSmall: z.string(),
    additionalImages: z.array(z.string()),
    constituents: z.array(z.string()),
    department: z.string(),
    objectName: z.string(),
    title: z.string(),
    culture: z.string(),
    period: z.string(),
    dynasty: z.string(),
    reign: z.string(),
    portfolio: z.string(),
    artistRole: z.string(),
    artistPrefix: z.string(),
    artistDisplayName: z.string(),
    artistDisplayBio: z.string(),
    artistSuffix: z.string(),
    artistAlphaSort: z.string(),
    artistNationality: z.string(),
    artistBeginDate: z.string(),
    artistEndDate: z.string(),
    artistGender: z.string(),
    artistWikidata_URL: z.string(),
    artistULAN_URL: z.string(),
    objectDate: z.string(),
    objectBeginDate: z.number(),
    objectEndDate: z.number(),
    medium: z.string(),
    dimensions: z.string(),
    creditLine: z.string(),
    geographyType: z.string(),
    city: z.string(),
    state: z.string(),
    county: z.string(),
    country: z.string(),
    region: z.string(),
    subregion: z.string(),
    locale: z.string(),
    locus: z.string(),
    excavation: z.string(),
    river: z.string(),
    classification: z.string(),
    rightsAndReproduction: z.string(),
    linkResource: z.string(),
    metadataDate: z.string(),
    repository: z.string(),
    objectURL: z.string(),
    tags: z.array(z.string()),
    objectWikidata_URL: z.string(),
    isTimelineWork: z.boolean(),
    GalleryNumber: z.string(),
    constituentsULAN_URL: z.string(),
    constituentWikidata_URL: z.string(),
    
});

export default function MuseumObjects() { 
    const [data, setData ] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchObjects = async () => {
        const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?isHighlight=true');
        const data = await response.json();
        setData(data);
        setLoading(false);
    }

}