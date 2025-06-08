"use client"

import * as React from "react"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { navigations } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

// This is sample data.
const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="w-[--radix-dropdown-menu-trigger-width] flex items-center gap-2">
          <Image
            src="/logo-if.png"
            alt="logo"
            width={50}
            height={50}
            priority
          />
          {state === 'expanded' && (
            <h1 className="flex-1 text-sm py-1.5 text-primary dark:text-foreground font-semibold whitespace-wrap overflow-hidden">
              Aktual Mutu Internal Informatika
            </h1>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {(Object.keys(navigations) as Array<keyof typeof navigations>).map((key) => {
          return (
            <SidebarGroup key={`sb-${key}`}>
              <SidebarGroupLabel className="uppercase text-primary dark:text-secondary">{key}</SidebarGroupLabel>
              <SidebarMenu>
                {navigations[key].map((item) => (
                  <Link key={item.title} href={item.url}>
                    <SidebarMenuButton
                      variant="primary"
                      tooltip={item.title}
                      isActive={
                        (pathname === '/' && item.url === '/')
                        || (item.url !== '/' && pathname.includes(item.url))}
                      className="cursor-pointer"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
