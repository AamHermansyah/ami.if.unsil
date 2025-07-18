import React from 'react'
import Navbar from './_components/navbar'
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from './_components/app-sidebar'
import Footer from './_layouts/footer'
import { auth, signOut } from '@/lib/auth'

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("User tidak ditemukan di session.");
  }

  if (session.user.status === 'NONACTIVE') {
    signOut();
  }

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} />
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