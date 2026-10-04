import Head from 'next/head';
import { SITE } from '@/lib/data';

export default function SEO({
  title,
  description,
  canonical,
  ogImage = '/og-image.png',
  noIndex = false,
  structuredData,
}) {
  const fullTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} | Software Development & Digital Solutions`;
  const metaDescription = description || SITE.description;
  const canonicalUrl = canonical
    ? `${SITE.url}${canonical}`
    : SITE.url;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:image" content={`${SITE.url}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${SITE.url}${ogImage}`} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}
