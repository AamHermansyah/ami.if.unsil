import React from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FcGoogle } from "react-icons/fc";
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

function FormLogin() {
  return (
    <div className="w-full flex justify-center lg:justify-end">
      <Card className="w-full max-w-md shadow-xl border bg-card backdrop-blur-lg">
        <CardHeader className="text-center space-y-4">
          <div className="relative mx-auto w-20 h-20">
            <Image
              src="/logo-unsil.png"
              alt="Logo Unsil"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              Selamat Datang
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Masuk dengan akun Google Anda untuk mengakses sistem AMI
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Login Button */}
          <Button
            className="w-full h-12 shadow-sm"
            variant="outline"
          >
            <div className="flex items-center justify-center gap-3">
              <FcGoogle className="w-4 h-4" />
              <span className="font-medium">Masuk dengan Google</span>
            </div>
          </Button>

          {/* Info Text */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Dengan masuk, Anda setuju dengan syarat dan ketentuan yang berlaku
            </p>
            <p className="text-xs text-muted-foreground">
              Gunakan akun Google institusi (@unsil.ac.id)
            </p>
          </div>
          <Separator />
          {/* University Info */}
          <div>
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">
                Universitas Siliwangi
              </p>
              <p className="text-xs text-muted-foreground">
                Fakultas Teknik - Program Studi Informatika
              </p>
              <p className="text-xs text-muted-foreground">
                Sistem Penjaminan Mutu Internal
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormLogin