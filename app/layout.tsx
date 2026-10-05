import type { Metadata } from "next";
import SpaceScene from "@/components/SpaceScene";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarthak Painuli: Software Engineer",
  description:
    "Software engineer in Bengaluru building backend systems and developer tools. Creator of Ghost Protocol, a behavioral digital twin for production systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="dark">
      <body>
        <SpaceScene />
        <div className="vignette" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}