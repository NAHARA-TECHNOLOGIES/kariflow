/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { constructMetadata } from '@/components/SEO'; 
import AboutUs from '@/components/AboutPage';
import { BRAND_NAME } from '@/constants';

// 🎯 The Next.js engine reads this server-side to generate headers, 
// using your updated Next.js Core Metadata Builder utility.
export const metadata = constructMetadata({
  title: 'About Us',
  description: `Learn how ${BRAND_NAME} about kariflow.`,
  url: 'https://kariflow.com/about'
});

export default function CookiesRoute() {
  return <AboutUs />;
}