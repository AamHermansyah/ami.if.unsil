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
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Image from "next/image"
import { navigations } from "@/constants/navigations"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

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
    <Sidebar collapsible="icon" {...props} className="z-[11]">
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
                {navigations[key].map((item) => {
                  if (!item.children) {
                    const isActive = (pathname === '/' && item.url === '/') || (item.url !== '/' && pathname.includes(item.url!));
                    return (
                      <Link key={item.title} href={item.url || ''}>
                        <SidebarMenuButton
                          variant="primary"
                          tooltip={item.title}
                          isActive={isActive}
                          className="cursor-pointer"
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </Link>
                    );
                  }

                  const isActive = item.children.some((subItem) => pathname.includes(subItem.url || ''));

                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={isActive}
                            variant="primary"
                          >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-1">
                          <SidebarMenuSub>
                            {item?.children && item.children.map((subItem) => {
                              const isActive = item.parentPath !== subItem.url && pathname.includes(subItem.url!);

                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton isActive={isActive || pathname === item.parentPath} asChild>
                                    <Link href={subItem.url || ''}>
                                      {subItem.icon && <subItem.icon />}
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              )
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                })}
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
