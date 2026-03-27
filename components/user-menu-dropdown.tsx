"use client";

import { signOut } from "@/lib/supabase/auth-client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CircleUserRound } from "lucide-react";

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
        <DropdownMenu.Content
          className="py-2 min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item className="py-2 text-black group relative flex h-auto select-none items-center rounded-[3px] pl-4 pr-4 text-[13px] leading-none outline-none w-48">
            <div className="truncate w-48 inline-block" title={email}>{email}</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="py-2 text-black group relative flex h-auto select-none items-center rounded-[3px] pl-4 pr-4 text-[13px] leading-none outline-none ">
            <button onClick={signOut}>Logout</button>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
