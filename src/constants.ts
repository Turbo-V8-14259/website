import type {NewsArticle} from "./types.d.ts";
import avt from './images/news-articles/amadorvallytoday.jpeg'
import patch from './images/news-articles/patch.webp'

export const email = "ftcturbov8@gmail.com";

export const newsArticles: NewsArticle[] = [
    {
        title: "Tri-Valley Schools Robotics Team Shines with 3rd Place Win",
        description: "In a stunning display of engineering excellence and strategic gameplay, TurboV8 secured third place in their division at the FTC World Championship, showcasing months of dedicated preparation and innovation.",
        image: patch,
        imageAlt: "TurboV8 team with third place trophy",
        source: "Patch.com",
        date: "2025-06-11",
        url: "https://patch.com/california/pleasanton/tri-valley-schools-robotics-team-shines-3rd-place-win-their-division-ftc-world-nodx",
        featured: true
    },
    {
        title: "Local Robotics Team TurboV8 Reaches Internationals",
        description: "TurboV8 robotics team from Tri-Valley area has made remarkable progress this season, advancing to international competition levels with their innovative robot design and exceptional teamwork.",
        image: avt,
        imageAlt: "TurboV8 team celebrating",
        source: "Amador Valley Today",
        date: "2024-03-24",
        url: "https://www.amadorvalleytoday.org/57336/news/local-robotics-team-turbo-v8-reaches-internationals/",
        featured: true
    }
]
