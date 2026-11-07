export type NavItem = { label: string; href: string; icon?: "uber" | "instagram" | "line" };

export type HoursRow = { label: string; times: string[] };

export type Store = {
  name: string;
  nameShort: string;
  tagline: string;
  lead: string;
  opened: string;
  openedLabel: string;
  about: string[];
  address: { postal: string; line1: string; line2: string };
  tel: string;
  email: string;
  hours: HoursRow[];
  closed: string;
  links: { instagram: string; line: string; uberEats: string };
  copyright: string;
  description: string;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  options?: string[];
};

export type MenuSection = {
  id: string;
  title: string;
  layout: "card" | "list";
  note?: string;
  items: MenuItem[];
};

export type GoodsItem = { id: string; name: string; price: number; description: string; image: string };

export type NewsPost = { id: string; image: string; caption: string; date: string };

export type HeroImage = { src: string; alt: string };
