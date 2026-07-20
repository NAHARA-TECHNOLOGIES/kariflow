import { Metadata } from 'next';

interface SEOConfigProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

// 🎯 FIXED: Replaced legacy JSX markup component with clean Next.js Core Metadata Builders
export function constructMetadata({
  title = 'Kariflow - Modern Fashion Tech Solutions',
  description = 'The all-in-one platform for fashion designers and brands. Measurements, task tracking, and business automation in one place.',
  image = 'https://kariflow.com/og-image.jpg',
  url = 'https://kariflow.com',
  type = 'website'
}: SEOConfigProps = {}): Metadata {
  const siteTitle = title.includes('Kariflow') ? title : `${title} | Kariflow`;

  return {
    title: siteTitle,
    description: description,
    openGraph: {
      type: type,
      title: siteTitle,
      description: description,
      url: url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: description,
      images: [image],
    },
    metadataBase: new URL('https://kariflow.com'),
  };
}