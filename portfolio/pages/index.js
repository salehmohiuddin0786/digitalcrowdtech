import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import HeroSection from '@/components/home/HeroSection';
import WhatWeBuild from '@/components/home/WhatWeBuild';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import ProductsSection from '@/components/home/ProductsSection';
import TechSection from '@/components/home/TechSection';
import ProcessSection from '@/components/home/ProcessSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import CTASection from '@/components/home/CTASection';
import { SITE } from '@/lib/data';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
      description: SITE.description,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { '@id': `${SITE.url}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}/#webpage`,
      url: SITE.url,
      name: `${SITE.name} | Software Development & Digital Solutions`,
      description: SITE.description,
      isPartOf: { '@id': `${SITE.url}/#website` },
    },
  ],
};

export default function Home() {
  return (
    <Layout>
      <SEO
        canonical="/"
        structuredData={STRUCTURED_DATA}
      />
      <HeroSection />
      <WhatWeBuild />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <TechSection />
      <ProcessSection />
      <WhyUsSection />
      <CTASection />
    </Layout>
  );
}
