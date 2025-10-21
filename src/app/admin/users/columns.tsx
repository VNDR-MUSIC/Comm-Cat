
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Timestamp } from "firebase/firestore"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  enrollmentDate: Timestamp;
}


export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "enrollmentDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enrollment Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.original.enrollmentDate?.toDate();
      return date ? format(date, "MM/dd/yyyy") : "N/A";
    }
  },
]
