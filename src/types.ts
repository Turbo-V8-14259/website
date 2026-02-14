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
    name: string;
    logo: ImageMetadata;
    url: string;
    tier: Tier;
    description: string;
}
export type TeamMember = {
    name: string;
    subTeam: "Team Captain" | "Hardware" | "Software" | "Outreach" | "Mentor" | "Alumni";
    role: "Team Captain" | "Hardware Lead" | "Hardware Member" | "Software Lead" | "Software Member" | "Outreach Lead" | "Outreach Member" | "Mentor" | "Alumni";
    image: ImageMetadata;
}
export enum Tier {
    Diamond = "Diamond",
    Gold = "Gold",
    Silver = "Silver",
    Bronze = "Bronze"
}