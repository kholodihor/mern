import { INewsItem } from "@/types";
import { CATEGORIES } from "@/constants/categories";

export const galleryData: INewsItem[] = [
  {
    id: 5,
    car: "BMW 1' F40 M135iX",
    slug: "BMW-1-F40-M135iX",
    services: [
      "services.engine_mount",
      "services.brake_fluid",
      "services.back_brake",
      "services.electronic_book",
    ],
    contact: {
      serviceCenter:
        "motto",
      address: " 📍 Przyszłość 2A, Stanisławów Pierwszy",
      phone: " ☎️ 509 158 159",
      email: "📨 mern.serwis@gmail.com",
    },
    categories: [
      CATEGORIES.COMPUTER_DIAGNOSTICS,
      CATEGORIES.MECHANICAL_SERVICE,
      CATEGORIES.ELECTRICAL_SERVICE
    ],
    images: [
      "/news/f40_1.webp",
      "/news/f40_2.webp",
      "/news/f40_3.webp",
      "/news/f40_4.webp",
      "/news/f40_5.webp",
    ],
    desc: "BMW1F40M135iX.desc",
    fullDesc: "BMW1F40M135iX.fullDesc",
    createdAt: '15.10.2024'
  },
  {
    id: 4,
    car: "BMW X2 F39",
    slug: "BMW-X2-F39",
    services: [
      "services.upgrade",
      "services.door_to_door",
    ],
    contact: {
      serviceCenter:
        "motto",
      address: " 📍 Przyszłość 2A, Stanisławów Pierwszy",
      phone: " ☎️ 509 158 159",
      email: "📨 mern.serwis@gmail.com",
    },
    categories: [
      CATEGORIES.MECHANICAL_SERVICE,
      CATEGORIES.SUSPENSION_REPAIR,
    ],
    images: [
      "/news/bmwx2_1.webp",
      "/news/bmwx2_2.webp",
      "/news/bmwx2_3.webp",
      "/news/bmwx2_4.webp",
      "/news/bmwx2_5.webp",
    ],
    desc: "BMWX2F39.desc",
    fullDesc: "BMWX2F39.fullDesc",
    createdAt: '08.10.2024'
  },
  {
    id: 3,
    car: "BMW I I3 Rex",
    slug: "BMW-I-I3-Rex",
    services: [
      "services.seat",
      "services.diagnostics",
      "services.front_brake",
      "services.electronic_book",
    ],
    contact: {
      serviceCenter:
        "motto",
      address: " 📍 Przyszłość 2A, Stanisławów Pierwszy",
      phone: " ☎️ 509 158 159",
      email: "📨 mern.serwis@gmail.com",
    },
    categories: [
      CATEGORIES.COMPUTER_DIAGNOSTICS,
      CATEGORIES.CODING_AND_PROGRAMMING,
    ],
    images: [
      "/news/rex_1.webp",
      "/news/rex_2.webp",
      "/news/rex_3.webp",
      "/news/rex_4.webp",
      "/news/rex_5.webp",
    ],
    desc: "BMWII3Rex.desc",
    fullDesc: "BMWII3Rex.fullDesc",
    createdAt: '21.09.2024'
  },
  {
    id: 2,
    car: "BMW 2' F44 Gran Coupé",
    slug: "BMW-2-F44-Gran-Coupe",
    services: [
      "services.inspetion",
      "services.brake_fluid",
      "services.front_brake",
      "services.back_brake",
      "services.door_to_door",
    ],
    contact: {
      serviceCenter:
        "motto",
      address: " 📍 Przyszłość 2A, Stanisławów Pierwszy",
      phone: " ☎️ 509 158 159",
      email: "📨 mern.serwis@gmail.com",
    },
    categories: [
      CATEGORIES.COMPUTER_DIAGNOSTICS,
      CATEGORIES.BRAKES_REPAIR,
      CATEGORIES.ELECTRICAL_SERVICE,
    ],
    images: [
      "/news/f44_1.webp",
      "/news/f44_2.webp",
      "/news/f44_3.webp",
      "/news/f44_5.webp",
      "/news/f44_6.webp",
    ],
    desc: "BMW2F44GranCoupé.desc",
    fullDesc: "BMW2F44GranCoupé.fullDesc",
    createdAt: '14.09.2024'
  },
  {
    id: 1,
    car: "BMW 5' G30 540iX",
    slug: "BMW-5-G30-540iX",
    services: [
      "services.oil_service",
      "services.brake_disks",
      "services.contidioning_disinfection",
      "services.door_to_door",
      "services.electronic_book",
    ],
    contact: {
      serviceCenter:
        "motto",
      address: " 📍 Przyszłość 2A, Stanisławów Pierwszy",
      phone: " ☎️ 509 158 159",
      email: "📨 mern.serwis@gmail.com",
    },
    categories: [
      CATEGORIES.PERIODIC_SERVICE,
      CATEGORIES.ENGINE_REPAIR,
      CATEGORIES.SUSPENSION_REPAIR,
    ],
    images: [
      "/news/g30_1.jpg",
      "/news/g30_2.jpg",
      "/news/g30_3.jpg",
      "/news/g30_4.jpg",
      "/news/g30_5.jpg",
    ],
    desc: "BMW5G30540iX.desc",
    fullDesc: "BMW5G30540iX.fullDesc",
    createdAt: '13.08.2024'
  },
];
