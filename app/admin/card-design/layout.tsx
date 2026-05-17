import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card Design | Admin | Radiance",
  description: "Manage wedding digital card content",
};

export const dynamic = "force-dynamic";

export default function CardDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}