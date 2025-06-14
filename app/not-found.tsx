'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Home,
  HelpCircle,
  Mail,
} from 'lucide-react';
import Image from 'next/image';

// 404 Error Page Component
const NotFoundPage: React.FC = () => {
  const handleGoHome = () => {
    // In real implementation, use router navigation
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="relative w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6 overflow-hidden">
            <Image
              src="/logo-if.png"
              alt="logo"
              fill
            />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-600 text-lg">
            Maaf, halaman yang kamu cari tidak dapat ditemukan di sistem AMI Prodi Informatika.
          </p>
        </div>

        {/* Possible Reasons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Kemungkinan Penyebab
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                URL yang Anda masukkan salah atau tidak lengkap
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                Halaman telah dipindahkan atau dihapus
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                Anda tidak memiliki akses ke halaman tersebut
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                Link yang Anda klik sudah kadaluarsa
              </li>
            </ul>
            <div className="mt-4">
              <Button onClick={handleGoHome} className="w-full">
                <Home className="w-4 h-4" />
                Ke Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Alert>
          <Mail className="h-4 w-4" />
          <AlertDescription>
            <strong>Butuh Bantuan?</strong> Hubungi administrator sistem di{' '}
            <a href="mailto:admin@informatika.unsil.ac.id" className="text-blue-600 hover:underline">
              admin@informatika.unsil.ac.id
            </a>{' '}
            atau telepon (0265) 330634.
          </AlertDescription>
        </Alert>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>AMI Prodi Informatika - Universitas Siliwangi</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;