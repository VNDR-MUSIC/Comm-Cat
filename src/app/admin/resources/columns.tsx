
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export interface ResourceData {
  id: string;
  title: string;
  type: string;
  url: string;
}

export const columns: ColumnDef<ResourceData>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const resource = row.original;
        // In the future, this could link to an edit page: /admin/resources/{resource.id}/edit
        return <div className="font-medium">{resource.title}</div>
    }
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
        return <Badge variant="secondary">{row.original.type}</Badge>
    }
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
        const url = row.original.url;
        return (
            <Link href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent hover:underline">
                <span className="truncate max-w-xs">{url}</span>
                <LinkIcon className="h-4 w-4 shrink-0" />
            </Link>
        )
    }
  },
]
