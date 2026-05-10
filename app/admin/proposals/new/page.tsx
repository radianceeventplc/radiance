import { Metadata } from "next";
import { ProposalBuilder } from "@/components/admin/ProposalBuilder";

export const metadata: Metadata = {
  title: "New Proposal | Admin | Radiance",
  description: "Create a new event proposal",
};

export default function NewProposalPage() {
  return <ProposalBuilder />;
}