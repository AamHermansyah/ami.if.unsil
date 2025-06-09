'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  User,
  Award,
  BookOpen,
  GraduationCap,
  Edit,
  Camera,
  Shield,
  Activity,
  FileText,
  CheckCircle,
  Download,
  Upload,
  Briefcase,
  Users
} from 'lucide-react';
import Link from 'next/link';

const ProfilePage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="relative bg-card rounded-lg shadow-sm border overflow-hidden">
          {/* Cover Photo */}
          <div className="h-36 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 bg-background/90 hover:bg-background"
            >
              <Camera className="w-4 h-4 mr-2" />
              Ubah Cover
            </Button>
          </div>

          {/* Profile Info */}
          <div className="px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Profile Picture */}
              <div className="w-max relative">
                <div className="w-23 sm:w-32 h-23 sm:h-32 bg-background rounded-2xl shadow-lg border-4 border-background flex items-center justify-center">
                  <div className="w-19 sm:w-28 h-19 sm:h-28 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src="https://avatars.githubusercontent.com/u/74630284?v=4&size=64"
                      alt="profile"
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-indigo-600 hover:bg-indigo-700"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {/* Profile Details */}
              <div className="relative flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">
                      Dr. Ahmad Fauzi, M.Kom
                    </h1>
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                      <Shield className="w-3 h-3 mr-1" />
                      Auditee
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Dosen Tetap • Program Studi Informatika
                  </p>
                  <p className="text-sm text-muted-foreground">
                    NIDN: 0123456789 • Jabatan Fungsional: Lektor • Bergabung: Januari 2018
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    S3 Teknik Informatika
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    <Award className="w-3 h-3 mr-1" />
                    Sertifikat Pendidik
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <BookOpen className="w-3 h-3 mr-1" />
                    25 Publikasi
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Link href="/sdm/profil-dosen/edit">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profil
                </Button>
              </Link>
              <Button className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download CV
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Personal Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informasi Pribadi
                </CardTitle>
                <CardDescription>
                  Data pribadi dan kontak
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Nama Lengkap</Label>
                    <Input
                      id="fullname"
                      defaultValue="Dr. Ahmad Fauzi, M.Kom"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nidn">NIDN</Label>
                    <Input
                      id="nidn"
                      defaultValue="0123456789"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="ahmad.fauzi@unsil.ac.id"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      defaultValue="+62 812-3456-7890"
                      disabled
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Textarea
                      id="address"
                      defaultValue="Jl. Siliwangi No. 24, Tasikmalaya, Jawa Barat"
                      disabled
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  Informasi Kepegawaian
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="position">Status Kepegawaian</Label>
                    <Input
                      id="position"
                      defaultValue="Dosen Tetap"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="functional">Jabatan Fungsional</Label>
                    <Input
                      id="functional"
                      defaultValue="Lektor"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Program Studi</Label>
                    <Input
                      id="department"
                      defaultValue="Informatika"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faculty">Fakultas</Label>
                    <Input
                      id="faculty"
                      defaultValue="Teknik"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joindate">Tanggal Bergabung</Label>
                    <Input
                      id="joindate"
                      defaultValue="15 Januari 2018"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tmtjabfung">TMT Jabatan Fungsional</Label>
                    <Input
                      id="tmtjabfung"
                      defaultValue="1 April 2022"
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Aktivitas Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Menambahkan publikasi baru</p>
                      <p className="text-xs text-gray-500">Deep Learning Approach for Text Classification</p>
                      <p className="text-xs text-gray-400">2 jam yang lalu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Update data beban kerja</p>
                      <p className="text-xs text-gray-500">Semester Genap 2024/2025</p>
                      <p className="text-xs text-gray-400">1 hari yang lalu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Upload className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Upload sertifikat AWS</p>
                      <p className="text-xs text-gray-500">AWS Certified Solutions Architect</p>
                      <p className="text-xs text-gray-400">3 hari yang lalu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Bimbingan skripsi - Muhammad Rizki</p>
                      <p className="text-xs text-gray-500">Progress penelitian dan revisi proposal</p>
                      <p className="text-xs text-gray-400">5 hari yang lalu</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Pendidikan Terakhir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-l-4 border-l-blue-500 pl-4 space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-semibold">S3 Teknik Informatika</h4>
                    <p className="text-sm text-muted-foreground">Institut Teknologi Bandung</p>
                    <p className="text-xs text-primary dark:text-secondary">2016 - 2020</p>
                  </div>

                  {/* Judul Tesis */}
                  <div>
                    <p className="text-sm font-medium">Judul Tesis:</p>
                    <p className="text-sm text-muted-foreground italic">
                      &quot;Pengembangan Algoritma Pembelajaran Mesin untuk Deteksi Dini Anomali Jaringan&quot;
                    </p>
                  </div>

                  {/* File Ijazah */}
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium">Ijazah Terakhir:</p>
                    <Button size="sm">
                      <Download className="w-4 h-4" />
                      Download Ijazah
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  Sertifikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800">Sertifikat Pendidik</h4>
                  <p className="text-sm text-green-600">Kemenristekdikti • 2020</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800">AWS Certified Solutions Architect</h4>
                  <p className="text-sm text-blue-600">Amazon Web Services • 2023</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-800">Certified Ethical Hacker</h4>
                  <p className="text-sm text-purple-600">EC-Council • 2022</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Kelengkapan Profil</p>
                    <p className="text-2xl font-bold text-blue-600">92%</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <Progress value={92} className="mt-3" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;