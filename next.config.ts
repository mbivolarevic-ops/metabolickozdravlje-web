import type { NextConfig } from "next";

/**
 * Namerno minimalna konfiguracija (Sprint 1).
 * Odluke o hostingu i strategiji renderovanja (ISR vs. pun statički rebuild)
 * nisu donete — videti docs/01, sekcije 6.3 i 16.2. Ništa ovde ne sme
 * tvrdo zavisiti od ISR-a niti od funkcija specifičnih za jednu platformu.
 */
const nextConfig: NextConfig = {
  images: {
    /*
     * Jedini dozvoljen spoljni izvor slika je Sanity CDN, i to samo putanja
     * za slike (`/images/**`). Lista je namerno uska: svaki dodatni host je
     * novi kanal ka trećoj strani i traži zasebnu odluku vlasnika.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
