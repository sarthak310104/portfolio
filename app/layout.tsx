import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarthak Painuli — Backend Engineer",
  description:
    "Backend engineer building payment infrastructure and developer tools. Java, Spring Boot, Python, FastAPI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="dark">
      <body>{children}</body>
    </html>
  );
}
