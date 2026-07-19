/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { constructMetadata } from '@/components/SEO'; // Adjust path if needed
import ContactPageClient from '@/components/ContactPage';
import { BRAND_NAME } from '@/constants';

// 🎯 Server-side SEO generation
export const metadata = constructMetadata({
  title: `Contact ${BRAND_NAME} | Connect with the Studio`,
  description: `Ready to scale your fashion business? Connect with the ${BRAND_NAME} team for support and digital transformation.`,
  url: 'https://kariflow.com/contact'
});

export default function ContactRoute() {
  return <ContactPageClient />;
}