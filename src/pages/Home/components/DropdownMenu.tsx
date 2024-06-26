'use client'

import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu as OriginalDropdownMenu,
} from '@/shared/components/ui/dropdown-menu'

function DropdownMenu() {
  return (
    <OriginalDropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </OriginalDropdownMenu>
  )
}

export { DropdownMenu }
