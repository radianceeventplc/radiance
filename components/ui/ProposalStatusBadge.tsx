import { cn } from "@/lib/utils";
import { PROPOSAL_STATUS_LABELS } from "@/types";

interface Props {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700 border-gray-300",
  SENT: "bg-blue-50 text-blue-700 border-blue-300",
  VIEWED: "bg-purple-50 text-purple-700 border-purple-300",
  APPROVED: "bg-green-50 text-green-700 border-green-300",
  REJECTED: "bg-red-50 text-red-700 border-red-300",
  EXPIRED: "bg-yellow-50 text-yellow-700 border-yellow-300",
};

export function ProposalStatusBadge({ status, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status] || "bg-gray-100 text-gray-700 border-gray-300",
        className
      )}
    >
      {PROPOSAL_STATUS_LABELS[status] || status}
    </span>
  );
}