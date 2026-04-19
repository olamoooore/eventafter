import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const siteName = 'Ever After Centre';
const baseUrl = 'https://everaftercentre.com';
const defaultImage = `${baseUrl}/hero-slide-1.webp`;

type SeoEntry = {
  title: string;
  description: string;
  path: string;
  keywords: string;
  type?: 'website' | 'article';
};

const pageSeo: Record<string, SeoEntry> = {
  '/': {
    title: 'Ever After Centre | Elegant Event Venue in Ikeja, Lagos',
    description:
      'Ever After Centre is a refined event venue in Ikeja, Lagos for weddings, birthdays, seminars, and corporate events with attentive planning support.',
    path: '/',
    keywords:
      'event venue Ikeja, wedding venue Lagos, event centre Ikeja, corporate event venue Lagos, birthday venue Ikeja, Ever After Centre',
    type: 'website',
  },
  '/services': {
    title: 'Event Venue Services | Weddings, Celebrations and Corporate Events',
    description:
      'Explore Ever After Centre services for weddings, birthday celebrations, seminars, conferences, and corporate events in Ikeja, Lagos.',
    path: '/services',
    keywords:
      'wedding reception venue Ikeja, seminar venue Lagos, corporate events Ikeja, birthday party venue Lagos, event services Ever After',
    type: 'website',
  },
  '/gallery': {
    title: 'Event Gallery | Ever After Centre Moments and Venue Highlights',
    description:
      'Browse the Ever After Centre gallery for weddings, celebrations, venue styling, and event highlights captured at our Ikeja, Lagos event space.',
    path: '/gallery',
    keywords:
      'event gallery Ikeja, wedding venue photos Lagos, Ever After Centre gallery, event hall pictures Ikeja, venue styling gallery Lagos',
    type: 'website',
  },
  '/about': {
    title: 'About Ever After Centre | Trusted Event Venue in Ikeja',
    description:
      'Learn about Ever After Centre, a trusted Ikeja event venue known for elegant spaces, thoughtful hospitality, and flexible event planning.',
    path: '/about',
    keywords:
      'about Ever After Centre, event venue Ikeja Lagos, elegant event centre Nigeria, trusted wedding venue Ikeja',
    type: 'website',
  },
  '/contact': {
    title: 'Contact Ever After Centre | Ikeja, Lagos Event Venue',
    description:
      'Contact Ever After Centre in Ikeja, Lagos for venue inquiries, bookings, business hours, and directions to our event centre.',
    path: '/contact',
    keywords:
      'contact event venue Ikeja, Ever After Centre phone number, event centre address Ikeja Lagos, venue inquiry Lagos',
    type: 'website',
  },
  '/bookings': {
    title: 'Book an Event at Ever After Centre | Venue Inquiry',
    description:
      'Submit your booking inquiry for weddings, birthdays, seminars, and corporate events at Ever After Centre in Ikeja, Lagos.',
    path: '/bookings',
    keywords:
      'book event venue Ikeja, wedding booking Lagos, venue inquiry Ever After Centre, corporate event booking Ikeja',
    type: 'website',
  },
};

function setMetaByName(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setMetaByProperty(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function setJsonLd(data: Record<string, unknown>) {
  const scriptId = 'seo-structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export default function Seo() {
  const location = useLocation();
  const seo = pageSeo[location.pathname] ?? pageSeo['/'];

  useEffect(() => {
    const canonicalUrl = `${baseUrl}${seo.path}`;

    document.title = seo.title;
    document.documentElement.lang = 'en';

    setMetaByName('description', seo.description);
    setMetaByName('keywords', seo.keywords);
    setMetaByName('robots', 'index, follow');
    setMetaByName('theme-color', '#243026');

    setMetaByProperty('og:type', seo.type ?? 'website');
    setMetaByProperty('og:site_name', siteName);
    setMetaByProperty('og:locale', 'en_NG');
    setMetaByProperty('og:title', seo.title);
    setMetaByProperty('og:description', seo.description);
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByProperty('og:image', defaultImage);
    setMetaByProperty('og:image:alt', 'Ever After Centre event venue in Ikeja, Lagos');

    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', seo.title);
    setMetaByName('twitter:description', seo.description);
    setMetaByName('twitter:image', defaultImage);

    setLink('canonical', canonicalUrl);

    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'EventVenue',
      name: siteName,
      description: seo.description,
      url: canonicalUrl,
      image: defaultImage,
      telephone: '+2348059565056',
      email: 'hello@everaftercentre.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '6 Bolaji Street, Off Kudirat Abiola Way / Oregun Road',
        addressLocality: 'Ikeja',
        addressRegion: 'Lagos',
        addressCountry: 'NG',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      sameAs: ['https://www.instagram.com/theeverafterlagos/'],
      areaServed: 'Lagos, Nigeria',
    });
  }, [seo]);

  return null;
}