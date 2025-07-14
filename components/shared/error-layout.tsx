import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Home,
  AlertTriangle,
  Bug,
  Mail,
  Phone,
  Shield,
} from 'lucide-react';
import Image from 'next/image';

interface IProps {
  error?: string;
  type?: 'default' | 'login';
}

function ErrorLayout({ error, type = 'default' }: IProps) {
  const handleGoHome = () => {
    // In real implementation, use router navigation
    window.location.href = type === 'default' ? '/dashboard' : '/auth/login';
  };

  const handleReportIssue = () => {
    // In real implementation, open support ticket or email
    window.open('mailto:admin@informatika.unsil.ac.id?subject=Error%20500%20-%20AMI%20System', '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full space-y-4">
        {/* Header */}
        <div className="text-center">
          <div className="relative w-24 h-24 bg-card rounded-lg flex items-center justify-center mx-auto mb-6 overflow-hidden">
            <Image
              src="/logo-if.png"
              alt="logo"
              fill
            />
          </div>
          <h1 className="text-6xl font-bold mb-4">500</h1>
          <h2 className="text-2xl font-semibold mb-2">
            Terjadi Kesalahan Server
          </h2>
          <p className="text-muted-foreground text-lg">
            Maaf, terjadi kesalahan internal pada server. Tim teknis kami sedang menangani masalah ini.
          </p>
        </div>

        {/* Error Info */}
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Internal Server Error:</strong>
            {error || 'Terjadi kesalahan di server'}
          </AlertDescription>
        </Alert>

        {/* What to do */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-orange-600" />
              Apa yang Bisa Anda Lakukan?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border">
                <Home className="w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">Kembali ke Dashboard</h4>
                  <p className="text-sm text-muted-foreground">Akses halaman utama yang mungkin masih berfungsi normal.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg border">
                <Mail className="w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">Laporkan Masalah</h4>
                  <p className="text-sm text-muted-foreground">Hubungi tim teknis jika masalah terus berlanjut.</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={handleGoHome} className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                {type === 'default' ? 'Ke Dashboard' : 'Coba Lagi'}
              </Button>
              <Button variant="outline" onClick={handleReportIssue} className="flex items-center gap-2">
                <Bug className="w-4 h-4" />
                Laporkan Masalah
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-sky-600" />
              Informasi Teknis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-2 rounded">
                <span className="text-muted-foreground">Error Code:</span>
                <span className="font-mono text-muted-foreground">HTTP 500</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded">
                <span className="text-muted-foreground">Timestamp:</span>
                <span className="font-mono text-muted-foreground">{new Date().toISOString()}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded">
                <span className="text-muted-foreground">Request ID:</span>
                <span className="font-mono text-muted-foreground">AMI-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Hubungi Tim Support
            </CardTitle>
            <CardDescription>
              Jika masalah berlanjut, hubungi tim teknis kami
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Email Support</div>
                  <div className="text-sm text-muted-foreground">admin@informatika.unsil.ac.id</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium">Telepon</div>
                  <div className="text-sm text-muted-foreground">(0265) 330634</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>AMI Prodi Informatika - Universitas Siliwangi</p>
          <p className="mt-1">Jika masalah berlanjut, tim teknis akan segera menangani</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorLayout