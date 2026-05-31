import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GalleryClient } from "@/app/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Radiance",
  description: "Explore Radiance event designs, celebrations, and transformations.",
};

export default function GalleryPage() {
  return (
    <>
      <Header topVariant="light" />
      <GalleryClient />
      <Footer />
    </>
  );
}
