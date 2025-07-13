import React from 'react'
import Navbar from './_components/navbar'
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from './_components/app-sidebar'
import Footer from './_layouts/footer'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex-1 overflow-hidden">
        <Navbar />
        <div className="w-full flex flex-1 flex-col gap-4 p-4 pt-14">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout