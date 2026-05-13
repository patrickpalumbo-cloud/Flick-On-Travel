import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flick On Travel",
  description: "Premium sports, points and experience-based travel planning."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
