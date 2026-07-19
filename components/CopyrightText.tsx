import React from 'react';

export default function CopyrightText({ brandName }: { brandName: string }) {
  // Grab the year directly without state
  const year = new Date().getFullYear();

  return (
    <p 
      suppressHydrationWarning 
      className="text-center md:text-left"
    >
      © {year} {brandName}. ALL RIGHTS RESERVED.
    </p>
  );
}