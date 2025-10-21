
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Timestamp } from "firebase/firestore"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface SponsorshipData {
  id: string;
  name: string;
  email: string;
  sponsorshipType: 'individual' | 'corporate';
  organizationName?: string;
  sponsorshipLevel: string;
  createdAt: Timestamp;
}

export const columns: ColumnDef<SponsorshipData>[] = [
  {
    accessorKey: "name",
    header: "Sponsor Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "sponsorshipType",
    header: "Type",
    cell: ({ row }) => {
        const type = row.original.sponsorshipType;
        return <Badge variant={type === 'corporate' ? 'secondary' : 'default'} className="capitalize">{type}</Badge>
    }
  },
  {
    accessorKey: "organizationName",
    header: "Organization",
    cell: ({ row }) => row.original.organizationName || 'N/A',
  },
  {
    accessorKey: "sponsorshipLevel",
    header: "Level/Amount",
     cell: ({ row }) => {
      const level = row.original.sponsorshipLevel;
      const isNumeric = !isNaN(Number(level));
      return isNumeric ? `$${Number(level).toLocaleString()}` : level;
    },
  },
    {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submission Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.original.createdAt?.toDate();
      return date ? format(date, "MM/dd/yyyy") : "N/A";
    }
  },
]
