
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

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
    cell: ({ row }) => {
        const course = row.original;
        return (
            <Link href={`/admin/courses/${course.id}`} className="font-medium hover:text-accent hover:underline">
                {course.title}
            </Link>
        )
    }
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
