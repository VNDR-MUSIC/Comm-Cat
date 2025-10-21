
'use client';

import { useTransition } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Shield, User } from 'lucide-react';
import { toggleAdminStatus } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { UserData } from './columns';

interface UserActionsProps {
  user: UserData;
}

export function UserActions({ user }: UserActionsProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleToggleAdmin = () => {
    startTransition(async () => {
      const result = await toggleAdminStatus(user.id, !!user.isAdmin);
      if (result.success) {
        toast({
          title: 'Success',
          description: `User ${user.firstName} is now ${!user.isAdmin ? 'an admin' : 'a student'}.`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message,
        });
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
          Copy user ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleToggleAdmin} disabled={isPending}>
          {user.isAdmin ? (
            <>
              <User className="mr-2 h-4 w-4" />
              <span>Remove Admin</span>
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              <span>Make Admin</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
