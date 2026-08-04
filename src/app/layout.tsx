import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Metaboličko zdravlje",
  description:
    "Edukativna platforma o metaboličkom zdravlju na srpskom jeziku — u pripremi.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="sr-Latn-RS">
      <body>{children}</body>
    </html>
  );
}
