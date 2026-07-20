/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { constructMetadata } from '@/components/SEO'; 
import Privacy from '@/components/Privacy';
import { BRAND_NAME } from '@/constants';

// 🎯 The Next.js engine reads this server-side to generate headers, 
// using your updated Next.js Core Metadata Builder utility.
export const metadata = constructMetadata({
  title: 'Policy ',
  description: `Learn how ${BRAND_NAME}.`,
  url: 'https://kariflow.com/policy'
});

export default function CookiesRoute() {
  return <Privacy />;
}