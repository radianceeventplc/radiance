import { Metadata } from "next";
import { PublicProposalView } from "@/components/public/PublicProposalView";

export const metadata: Metadata = {
  title: "Proposal | Radiance Event PLC",
  description: "View your event proposal",
  robots: { index: false, follow: false },
};

export default function PublicProposalPage() {
  return <PublicProposalView />;
}