import { Metadata } from "next";
import { ProposalDashboard } from "@/components/admin/ProposalDashboard";

export const metadata: Metadata = {
  title: "Proposals | Admin | Radiance",
  description: "Manage event proposals and quotations",
};

export default function AdminProposalsPage() {
  return <ProposalDashboard />;
}