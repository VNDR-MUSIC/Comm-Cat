
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export interface CourseData {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export const columns: ColumnDef<CourseData>[] = [
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
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
        const description = row.original.description;
        return <div className="truncate max-w-sm">{description}</div>
    }
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
]
