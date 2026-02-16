import {type NewsArticle, type Sponsor, type TeamMember, Tier} from "./types.ts";
import avt from "./images/amadorvallytoday.jpeg";
import patch from "./images/patch.webp";
import haas from "./images/sponsor-logos/haas.png";
import polymaker from "./images/sponsor-logos/polymaker.png";
import vbelt from "./images/sponsor-logos/vbelt.png";
import fabworks from "./images/sponsor-logos/fabworks.png";
import createit from "./images/sponsor-logos/createit.png";
import placeholderAvatar from "./images/team/placeholder-avatar.svg";
import devesh from "./images/team/devesh.jpg"
import amber from "./images/team/amber.jpg"
import anish from "./images/team/anish.jpg"
import atharv from "./images/team/atharv.jpg"
import ethan from "./images/team/ethan.jpg"
import meet from "./images/team/meet.jpg"
import parv from "./images/team/parv.jpg"
import prathik from "./images/team/prathik.jpg"
import rachel from "./images/team/rachel.jpg"
import sai from "./images/team/sai.jpg"
import sushant from "./images/team/sushant.jpg"
import vedant from "./images/team/vedant.jpg"
import veer from "./images/team/veer.jpg"
import yuvan from "./images/team/yuvan.jpg"
import levi from "./images/team/levi.jpg"
import peter from "./images/team/peter.jpg"
import steven from "./images/team/steven.jpg"

export const email: string = "ftcturbov8@gmail.com";

export const contactFormUrl: string = "https://formspree.io/f/mzzvkpln";

export const applyFormUrl: string = "https://formspree.io/f/mzzvkpln";


export const teamMembers: TeamMember[] = [{
    name: "Veer Nanda",
    subTeam: "Team Captain",
    role: "Team Captain",
    image: veer
}, {
    name: "Devesh Senthilraja ",
    subTeam: "Hardware",
    role: "Hardware Lead",
    image: devesh
}, {
    name: "Rukshana Yowvanaraj",
    subTeam: "Hardware",
    role: "Hardware Member",
    image: placeholderAvatar
}, {
    name: "Amber Mo",
    subTeam: "Hardware",
    role: "Hardware Member",
    image: amber
}, {
    name: "Prathik Prasanna",
    subTeam: "Hardware",
    role: "Hardware Member",
    image: prathik
}, {
    name: "Meet Bhanushali",
    subTeam: "Hardware",
    role: "Hardware Member",
    image: meet
}, {
    name: "Vedant Yelluru",
    subTeam: "Hardware",
    role: "Hardware Member",
    image: vedant
}, {
    name: "Sushant Indupuru",
    subTeam: "Software",
    role: "Software Lead",
    image: sushant
}, {
    name: "Ethan Wang",
    subTeam: "Software",
    role: "Software Member",
    image: ethan
}, {
    name: "Parv Surjan",
    subTeam: "Software",
    role: "Software Member",
    image: parv
}, {
    name: "Yuvan Ramesh",
    subTeam: "Software",
    role: "Software Member",
    image: yuvan
}, {
    name: "Aarav Shah",
    subTeam: "Software",
    role: "Software Member",
    image: placeholderAvatar
}, {
    name: "Abhay Girish",
    subTeam: "Outreach",
    role: "Outreach Lead",
    image: placeholderAvatar
}, {
    name: "Atharv Dua",
    subTeam: "Outreach",
    role: "Outreach Member",
    image: atharv
}, {
    name: "Rachel Dong",
    subTeam: "Outreach",
    role: "Outreach Member",
    image: rachel
}, {
    name: "Sai Kata",
    subTeam: "Outreach",
    role: "Outreach Member",
    image: sai
}, {
    name: "Anish Dhamjia",
    subTeam: "Outreach",
    role: "Outreach Member",
    image: anish
}, {
    name: "Peter Wetherell",
    subTeam: "Mentor",
    role: "Mentor",
    image: peter
}, {
    name: "Steven Szczeszynski",
    subTeam: "Mentor",
    role: "Mentor",
    image: steven
}, {
    name: "Levi",
    subTeam: "Mentor",
    role: "Mentor",
    image: levi
}
];

export const newsArticles: NewsArticle[] = [{
    title: "Tri-Valley Schools Robotics Team Shines with 3rd Place Win",
    description: "In a stunning display of engineering excellence and strategic gameplay, TurbΩ V8 secured third place in their division at the FTC World Championship, showcasing months of dedicated preparation and innovation.",
    image: patch,
    imageAlt: "TurbΩ V8 team with third place trophy",
    source: "Patch.com",
    date: "2025-06-11",
    url: "https://patch.com/california/pleasanton/tri-valley-schools-robotics-team-shines-3rd-place-win-their-division-ftc-world-nodx",
    featured: true
}, {
    title: "Local Robotics Team TurbΩ V8 Reaches Internationals",
    description: "TurbΩ V8 robotics team from Tri-Valley area has made remarkable progress this season, advancing to international competition levels with their innovative robot design and exceptional teamwork.",
    image: avt,
    imageAlt: "TurbΩ V8 team celebrating",
    source: "Amador Valley Today",
    date: "2024-03-24",
    url: "https://www.amadorvalleytoday.org/57336/news/local-robotics-team-turbo-v8-reaches-internationals",
    featured: true
}];
export const sponsorsHeight: number = 110;

export const sponsors: Sponsor[] = [/*{
    name: "Bytebridge",
    logo: bytebridge,
    url: "https://www.bytebt.com/",
    tier: Tier.Silver,
    description: "Technology solutions and consulting"
},*/ {
    name: "Gene Haas Foundation",
    logo: haas,
    url: "https://www.ghaasfoundation.org/",
    tier: Tier.Diamond,
    description: "Supporting STEM education and manufacturing careers"
}, /*{
    name: "Underground Printing Press",
    logo: ugp,
    url: "https://undergroundshirts.com/",
    tier: Tier.Gold,
    description: "Custom apparel and team merchandise"
},*/ {
    name: "Polymaker",
    logo: polymaker,
    url: "https://polymaker.com/",
    tier: Tier.Diamond,
    description: "3D printing materials and solutions"
}, {
    name: "V-Belt Guy",
    logo: vbelt,
    url: "https://www.vbeltguys.com/",
    tier: Tier.Gold,
    description: "Industrial belts and power transmission"
}, /*{
    name: "PCBWay",
    logo: pcbway,
    url: "https://www.pcbway.com/",
    tier: Tier.Silver,
    description: "PCB manufacturing and assembly services"
}, */{
    name: "Fabworks",
    logo: fabworks,
    url: "https://www.fabworks.com/",
    tier: Tier.Gold,
    description: "Manufacturing and fabrication services"
}, {
    name: "Create It Factory",
    logo: createit,
    url: "https://www.createitfactory.com/",
    tier: Tier.Diamond,
    description: "STEM education and enrichment programs"
    
}];

export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;