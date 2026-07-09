import { COLLABORATIONS } from './collaborations';

export const NAV_HREFS = {
  Shop: '/',
  About: '/pages/our-story',
  Collections: '#',
  Skate: '#',
  Journal: '#',
};

export const MEGA_MENUS = {
  Shop: {
    columns: [
      {
        title: 'CAVALRI RAINY WET 2025 COLLECTION',
        titleHref: '/',
        links: [
          { label: 'All', href: '/' },
          { label: 'Accessories', href: '/collections/accessories' },
          { label: 'Bottoms', href: '/collections/bottoms' },
          { label: 'Headwear', href: '/collections/headwear' },
          { label: 'Outerwear', href: '/collections/outerwear' },
          { label: 'T-Shirts', href: '/collections/t-shirts' },
          { label: 'Tops', href: '/collections/tops' },
        ],
      },
      { title: 'Cavalri Babes', links: [] },
      { title: 'Hardware', links: [] },
    ],
    push: {
      href: '/',
      image:
        'https://www.wafflesncream.com/cdn/shop/files/RNI-Films-IMG-02DFFF79-8F18-42E4-B952-B0BDC6445A43_845c19fe-a1ec-4f37-9bed-679bbcaca6d5_370x230@2x.jpg?v=1743899389',
      heading: "Rainy/Wet '25 Collection",
      subheading: 'Shop Now',
    },
  },
  About: {
    columns: [
      {
        title: 'Our Story',
        titleHref: '/pages/our-story',
        links: [
          { label: 'Sustainability', href: '#' },
          { label: 'Mission', href: '/pages/mission' },
          { label: 'Ethos', href: '/pages/ethos' },
        ],
      },
    ],
    push: {
      href: '/pages/our-story',
      image:
        'https://www.wafflesncream.com/cdn/shop/files/RNI-Films-IMG-02DFFF79-8F18-42E4-B952-B0BDC6445A43_8f262011-cbe2-40e5-b235-d21d7a830cfc_370x230@2x.jpg?v=1743901279',
      heading: 'Our Story',
      subheading: 'Cavalri is a streetwear label that expresses themselves through skateboarding.',
    },
  },
  Collections: {
    columns: [
      {
        title: 'Collaborations',
        titleHref: '/collaborations',
        links: COLLABORATIONS.slice(0, 2).map((collab) => ({
          label: collab.title,
          href: `/collaborations/${collab.slug}`,
        })),
      },
      {
        title: 'Editorial',
        links: [
          { label: "Rainy/Wet '25", href: '#' },
          { label: 'Cavalri Good Faith', href: '#' },
          { label: 'Cavalri Classic Knit Box Shirt', href: '#' },
          { label: 'Cavalri Check Check Shirt and Cargo Pants', href: '#' },
        ],
      },
    ],
    push: {
      href: '/',
      image:
        'https://www.wafflesncream.com/cdn/shop/files/RNI-Films-IMG-02DFFF79-8F18-42E4-B952-B0BDC6445A43_6dcfd3f1-6841-4a7f-9433-65b2388bc0d0_370x230@2x.jpg?v=1743909962',
      heading: "Rainy/Wet '25 Collection",
      subheading: 'Shop Now',
    },
  },
};
