import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Shield, Users, FileText, CheckCircle, Globe } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">

        {/* Left Side - Hero Content */}
        <div className="space-y-8 text-center lg:text-left">
          {/* Logo & Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                  AMI-IF Unsil
                </h1>
                <p className="text-muted-foreground text-sm font-medium">Audit Mutu Internal</p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Sistem Audit Mutu Internal
              </h2>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-700">
                Program Studi Informatika
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto lg:mx-0">
                Platform digital untuk monitoring dan evaluasi kualitas akademik yang terintegrasi dan real-time
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
            <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm border border-gray-200">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">Manajemen SDM</p>
                <p className="text-muted-foreground text-xs">Profil & Kualifikasi Dosen</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm border border-gray-200">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">Penelitian & Pengabdian</p>
                <p className="text-muted-foreground text-xs">Publikasi & Sitasi</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm border border-gray-200">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">Real-time Monitoring</p>
                <p className="text-muted-foreground text-xs">Dashboard & Laporan</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm border border-gray-200">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">Akses Terpusat</p>
                <p className="text-muted-foreground text-xs">Single Sign-On Google</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center lg:justify-start gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">29+</div>
              <div className="text-sm text-muted-foreground">Indikator AMI</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2</div>
              <div className="text-sm text-muted-foreground">Role Akses</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-sm text-muted-foreground">Digital</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md shadow-xl border bg-white/80 backdrop-blur-lg">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Selamat Datang
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Masuk dengan akun Google Anda untuk mengakses sistem AMI
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Role Badges */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 text-center">
                  Tersedia untuk:
                </p>
                <div className="flex gap-2 justify-center">
                  <Badge variant="secondary" className="bg-blue-50 text-primary border-blue-200">
                    <Users className="w-3 h-3 mr-1" />
                    Auditee (Dosen)
                  </Badge>
                  <Badge variant="secondary" className="bg-indigo-50 text-primary border-indigo-200">
                    <Shield className="w-3 h-3 mr-1" />
                    Auditor (Kaprodi)
                  </Badge>
                </div>
              </div>

              {/* Google Login Button */}
              <Button
                className="w-full h-12 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200 shadow-sm"
                variant="outline"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="font-medium">Masuk dengan Google</span>
                </div>
              </Button>

              {/* Info Text */}
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500">
                  Dengan masuk, Anda setuju dengan syarat dan ketentuan yang berlaku
                </p>
                <p className="text-xs text-gray-500">
                  Gunakan akun Google institusi (@unsil.ac.id)
                </p>
              </div>

              {/* University Info */}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Universitas Siliwangi
                  </p>
                  <p className="text-xs text-gray-500">
                    Fakultas Teknik - Program Studi Informatika
                  </p>
                  <p className="text-xs text-gray-400">
                    Sistem Penjaminan Mutu Internal
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-xs text-gray-400 text-center">
          © 2024 Universitas Siliwangi. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;