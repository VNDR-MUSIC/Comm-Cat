
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Timestamp } from "firebase/firestore"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { UserActions } from "./UserActions"

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  enrollmentDate: Timestamp;
  isAdmin?: boolean;
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
  {
    accessorKey: "isAdmin",
    header: "Role",
    cell: ({ row }) => {
      const isAdmin = row.original.isAdmin;
      return isAdmin ? <Badge variant="secondary">Admin</Badge> : <Badge variant="outline">Student</Badge>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      return <UserActions user={user} />
    },
  },
]
