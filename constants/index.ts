import computer from "./animations/computer.json";
import carservices from "./animations/car-services.json";
import engine from "./animations/car-engine.json";
import laptop from "./animations/laptop.json";
import fan from "./animations/fan.json";
import tool from "./animations/tool.json";
import paint from "./animations/paint.json";
import gears from "./animations/gears.json";
import price from "./animations/price.json";
import accesoires from "./animations/accesoires.json";
import audio from "./animations/audio.json";

export const cards = [
  {
    title: "diagnostics",
    text: "diagnostics_text",
    image: laptop,
    link: "#",
    emoji: `💻`,
  },
  {
    title: "service",
    text: "service_text",
    image: tool,
    link: "#",
    emoji: `🔧`,
  },
  {
    title: "inspections",
    text: "inspections_text",
    image: carservices,
    link: "#",
    emoji: `🔍`,
  },
  {
    title: "engine_service",
    text: "engine_service_text",
    image: engine,
    link: "#",
    emoji: `⚙️`,
  },
  {
    title: "brakes_service",
    text: "brakes_service_text",
    image: gears,
    link: "#",
    emoji: `🛠️`,
  },
  {
    title: "coding",
    text: "coding_text",
    image: computer,
    link: "https://hartige.pl",
    emoji: `🖥️`,
  },
  {
    title: "paintwork",
    text: "paintwork_text",
    image: paint,
    link: "#",
    emoji: `🖌️`,
  },
  {
    title: "conditioning",
    text: "conditioning_text",
    image: fan,
    link: "#",
    emoji: `🌡️`,
  },
  {
    title: "accesoires",
    text: "accesoires_text",
    image: audio,
    link: "#",
    emoji: `🎧`,
  },
  {
    title: "pricing",
    text: "pricing_text",
    image: price,
    link: "#",
    emoji: `💲`,
  },
];

export const links = [
  {
    name: "strona_glowna",
    href: "/",
  },
  {
    name: "o_nas",
    href: "/about",
  },
  {
    name: "uslugi",
    href: "/services",
  },
  {
    name: "kontakt",
    href: "/contacts",
  },
  {
    name: "news",
    href: "/news",
  },
];

export const steps = [
  {
    title: "title1",
    text: "content1",
    image: "/services/service-card1.webp",
  },
  {
    title: "title2",
    text: "content2",
    image: "/services/service-card2.webp",
  },
  {
    title: "title3",
    text: "content3",
    image: "/services/service-card3.webp",
  },
  {
    title: "title4",
    text: "content4",
    image: "/services/service-card4.webp",
  },
];
