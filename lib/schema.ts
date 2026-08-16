// ============================================================
// ON SIXTH RESTAURANT — JSON-LD SCHEMA BUILDERS
// Schema.org structured data for SEO rich results
// ============================================================

export const RESTAURANT_INFO = {
  name: 'On Sixth Restaurant',
  url:  'https://onsixthrestaurant.co.za',
  telephone: '+27114251668',
  email: 'info@onsixthrestaurant.co.za',
  address: {
    streetAddress: 'Shop A1, Cocoa Bean Centre, Cnr 2nd St & 6th Ave',
    addressLocality: 'Northmead',
    addressRegion: 'Ekurhuleni',
    postalCode: '1501',
    addressCountry: 'ZA',
  },
  geo: {
    latitude:  -26.1867,
    longitude:  28.3089,
  },
  openingHours: [
    'Mo-Th 12:00-21:00',
    'Fr-Sa 12:00-22:00',
    'Su 12:00-18:00',
  ],
  priceRange: 'ZAR 95 – ZAR 295',
  servesCuisine: ['Japanese', 'Italian', 'South African', 'Sushi', 'Pizza', 'Seafood'],
  hasMenu: 'https://onsixthrestaurant.co.za/menu',
  aggregateRating: {
    ratingValue: 4.8,
    reviewCount: 1200,
    bestRating: 5,
  },
  awards: [
    'Best Upmarket Restaurant – Best of Ekurhuleni Readers\' Choice',
    'Best Romantic Restaurant – Best of Ekurhuleni Readers\' Choice',
    'Best Neighbourhood Restaurant – Best of Ekurhuleni Readers\' Choice',
  ],
};

// ── Restaurant Schema ──
export function buildRestaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: RESTAURANT_INFO.name,
    url: RESTAURANT_INFO.url,
    telephone: RESTAURANT_INFO.telephone,
    email: RESTAURANT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      ...RESTAURANT_INFO.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: RESTAURANT_INFO.geo.latitude,
      longitude: RESTAURANT_INFO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '12:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '12:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '12:00',
        closes: '18:00',
      },
    ],
    priceRange: RESTAURANT_INFO.priceRange,
    servesCuisine: RESTAURANT_INFO.servesCuisine,
    hasMenu: RESTAURANT_INFO.hasMenu,
    aggregateRating: {
      '@type': 'AggregateRating',
      ...RESTAURANT_INFO.aggregateRating,
    },
    currenciesAccepted: 'ZAR',
    paymentAccepted: 'Cash, Credit Card, EFT',
    image: `${RESTAURANT_INFO.url}/og-image.jpg`,
  };
}

// ── Local Business Schema ──
export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: RESTAURANT_INFO.name,
    address: {
      '@type': 'PostalAddress',
      ...RESTAURANT_INFO.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: RESTAURANT_INFO.geo.latitude,
      longitude: RESTAURANT_INFO.geo.longitude,
    },
    url: RESTAURANT_INFO.url,
    telephone: RESTAURANT_INFO.telephone,
  };
}

// ── Menu Schema ──
import { menuData } from './menu-data';

export function buildMenuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'On Sixth Restaurant Menu',
    url: `${RESTAURANT_INFO.url}/menu`,
    hasMenuSection: menuData.map((category) => ({
      '@type': 'MenuSection',
      name: category.name,
      hasMenuItem: category.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description ?? '',
        offers: item.price
          ? {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'ZAR',
            }
          : item.options?.map((opt) => ({
              '@type': 'Offer',
              name: opt.name,
              price: opt.price,
              priceCurrency: 'ZAR',
            })),
      })),
    })),
  };
}

// ── Breadcrumb Schema ──
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
