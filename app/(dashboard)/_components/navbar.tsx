"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/shared/mode-toggle"

// Helper function to convert segment to readable title
function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
      'sticky top-0 flex h-14 z-10 shrink-0 items-center gap-2 transition-[width,height,background-color] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12',
      isScrolled && 'bg-primary text-primary-foreground shadow-sm'
    )}>
      <div className="w-full flex items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 dark:text-white" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 hidden sm:block"
          />

          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild className={cn(isScrolled && 'text-white hover:text-secondary')}>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/")
                const isLast = index === segments.length - 1

                return (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator className={cn(isScrolled && 'text-white')} />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className={cn(isScrolled && 'text-gray-300')}>
                          {formatSegment(segment)}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild className={cn(isScrolled && 'text-white hover:text-secondary')}>
                          <Link href={href}>{formatSegment(segment)}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="text-foreground">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Navbar
