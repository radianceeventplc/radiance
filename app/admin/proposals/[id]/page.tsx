import { Metadata } from "next";
import { ProposalDetail } from "@/components/admin/ProposalDetail";

export const metadata: Metadata = {
  title: "Proposal Detail | Admin | Radiance",
  description: "View proposal details",
};

export default function ProposalDetailPage() {
  return <ProposalDetail />;
}