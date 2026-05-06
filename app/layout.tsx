import type { Metadata } from "next";
import "./globals.css";
import StarLoader from "@/components/ui/StarLoader";

export const metadata: Metadata = {
  title: "Radiance | Premium Event Experiences",
  description:
    "Crafting extraordinary events that leave lasting impressions. Premium event design and production.",
  icons: {
    icon: "/assets/Radiance_Icon.svg",
    apple: "/assets/Radiance_Icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased bg-secondary-white text-neutral-black">
        <StarLoader>{children}</StarLoader>
      </body>
    </html>
  );
}
