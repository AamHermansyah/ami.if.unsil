// app/login/page.tsx
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FcGoogle } from "react-icons/fc"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Image src="/logo-unsil.png" alt="Logo Unsil" width={60} height={60} />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">AMI-IF Unsil</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Sistem Audit Mutu Internal Prodi Informatika
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-sm"
          >
            <FcGoogle className="w-5 h-5" />
            Login dengan Akun Google
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Hanya akun dosen (Auditee) dan pimpinan prodi (Auditor) yang dapat login.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
