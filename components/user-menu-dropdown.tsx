"use client";

import { signOut } from "@/lib/supabase/auth-client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

const ICON_SIZE = 48;

export function UserMenuDropdown({ email }: { email: string }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex size-[35px] items-center justify-center rounded-full bg-gray-800 focus:outline-none"
          aria-label="Customise options"
        >
          <CircleUserRound size={ICON_SIZE} className="text-white" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenuContent
          className="py-2 min-w-[220px] rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          <DropdownMenuItem>
            <div className="truncate w-48 inline-block" title={email}>{email}</div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="w-48 text-left" onClick={signOut}>Logout</button>
          </DropdownMenuItem>
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
