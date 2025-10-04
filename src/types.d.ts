import type {ImageMetadata} from "astro";

export type NewsArticle = {
    title: string;
    description: string;
    image: ImageMetadata;
    imageAlt: string;
    source: string;
    date: string;
    url: string;
    featured: boolean;
}

export type Sponsor = {
    name: string; logo: ImageMetadata; url: string;
}