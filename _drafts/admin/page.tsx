/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { constructMetadata } from '@/components/SEO'; 
import AdminRouteGuard from '@/components/AdminRouteGurde';

// 🎯 The Next.js engine reads this server-side to generate headers, 
// using your updated Next.js Core Metadata Builder utility.
export const metadata = constructMetadata({
  title: 'Admin Dashboard',
  description: 'Kariflow administrative monitoring station.',
  url: 'https://kariflow.com/admin'
});

export default function CookiesRoute() {
  return (
    // 🎯 FIXED: Wrapped using valid React children context parsing nodes
    <AdminRouteGuard>
      <div className="p-8 bg-slate-50 min-h-screen">
        <h1 className="text-2xl font-black text-slate-900">Control Panel Active</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome to the central Kariflow administration hub.</p>
      </div>
    </AdminRouteGuard>
  );
}