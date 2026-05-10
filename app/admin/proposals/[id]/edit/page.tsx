"use client";

import { useParams } from "next/navigation";
import { ProposalBuilder } from "@/components/admin/ProposalBuilder";

export default function EditProposalPage() {
  const params = useParams<{ id: string }>();
  return <ProposalBuilder proposalId={params.id} isEditing />;
}