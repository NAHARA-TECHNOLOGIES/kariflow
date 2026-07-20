/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { constructMetadata } from '@/components/SEO'; 
import CookiesPageClient from '@/components/CookiePage';
import { BRAND_NAME } from '@/constants';

// 🎯 The Next.js engine reads this server-side to generate headers, 
// using your updated Next.js Core Metadata Builder utility.
export const metadata = constructMetadata({
  title: 'Cookie Policy',
  description: `Learn how ${BRAND_NAME} uses cookies to keep your artisan workshop session secure.`,
  url: 'https://kariflow.com/cookies'
});

export default function CookiesRoute() {
  return <CookiesPageClient />;
}