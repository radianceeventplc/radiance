import { Metadata } from "next";
import { CardDesignBuilder } from "@/components/admin/CardDesignBuilder";

export const metadata: Metadata = {
  title: "Card Design | Admin | Radiance",
  description: "Design wedding invitation card content",
};

export const dynamic = "force-dynamic";

export default function CardDesignPage() {
  return <CardDesignBuilder />;
}