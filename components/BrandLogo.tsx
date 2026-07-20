"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const ASSET_LOGO = "/assets/kariflowlogo.png"; 

export function KariflowLogomark({
  className = "w-10 h-10",
  bgColor = "#005B41",
  trackColor = "#FFFFFF",
  showBackground = true,
}: {
  className?: string;
  bgColor?: string;
  trackColor?: string;
  showBackground?: boolean;
}) {
  return (
    <svg
      className={`overflow-hidden flex-shrink-0 ${
        showBackground ? "rounded-xl shadow-sm" : ""
      } ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {showBackground && (
        <rect width="100" height="100" rx="26" fill={bgColor} />
      )}

      {/* Adjusted so the full K is visible */}
      <g transform="translate(16,16) scale(0.64)">
        <path
          d="M36 -5 C27 35,27 65,36 105"
          stroke={trackColor}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M52 34 L68 50 L52 66 L36 50 Z"
          stroke={trackColor}
          strokeWidth="6"
          strokeLinejoin="round"
          fill="none"
        />

        <path
          d="M54 48 C66 36,76 25,105 25"
          stroke={trackColor}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M54 52 C66 64,76 75,105 75"
          stroke={trackColor}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

interface Branding {
  logoMode: "svg" | "asset" | "custom";
  customUrl: string | null;
}

interface BrandLogoProps {
  className?: string;
  variant?: "nav" | "footer" | "admin";
}

export default function BrandLogo({
  className = "",
  variant = "nav",
}: BrandLogoProps) {
  const [branding, setBranding] = useState<Branding>({
    logoMode: "asset",
    customUrl: null,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    fetch("/api/branding")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Branding unavailable");
        }
        return res.json();
      })
      .then((data) =>
        setBranding({
          logoMode: data.logoMode ?? "asset",
          customUrl: data.customUrl ?? null,
        })
      )
      .catch(() => {
        setBranding({
          logoMode: "asset",
          customUrl: null,
        });
      });
  }, []);

  const defaultDimensions =
    variant === "nav"
      ? "h-8 w-8"
      : variant === "footer"
      ? "h-10 w-10"
      : "h-9 w-9";

  const containerClasses = className || defaultDimensions;

  const renderSvg = () => (
    <KariflowLogomark
      bgColor={variant === "footer" ? "#022C22" : "#005B41"}
      trackColor={variant === "footer" ? "#34D399" : "#FFFFFF"}
      className="w-full h-full"
    />
  );

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${containerClasses}`}
    >
      {!isClient ? (
        <div className="w-full h-full animate-pulse rounded-lg bg-slate-200" />
      ) : branding.logoMode === "custom" && branding.customUrl ? (
        <Image
          src={branding.customUrl}
          alt="Brand Logo"
          fill
          sizes="32px"
          className="object-contain"
        />
      ) : branding.logoMode === "asset" ? (
        <Image
          src={ASSET_LOGO}
          alt="Kariflow"
          fill
          priority
          sizes="32px"
          className="object-contain"
        />
      ) : (
        renderSvg()
      )}
    </div>
  );
}