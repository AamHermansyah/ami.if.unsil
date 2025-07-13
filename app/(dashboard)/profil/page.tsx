'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import DatePicker from '@/components/core/date-picker';

const ProfilePage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-4">
        <Card>
          <CardContent className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="w-23 sm:w-32 h-23 sm:h-32 bg-background rounded-xl border shadow-lg overflow-hidden">
              <img
                src="https://avatars.githubusercontent.com/u/74630284?v=4&size=64"
                alt="profile"
                className="w-full h-full"
              />
            </div>

            {/* Profile Details */}
            <div className="relative flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold">
                    Dr. Ahmad Fauzi, M.Kom
                  </h1>
                  <Badge variant="default">
                    Auditee
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-2">
                  NIDN: 0123456789
                </p>
                <div className="flex gap-3 mt-6">
                  <Link href="/profil/edit">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profil
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
              <CardDescription>
                Data pribadi dan kontak
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="namaLengkap">Nama Lengkap *</Label>
                  <Input
                    id="namaLengkap"
                    placeholder="Dr. Ahmad Fauzi, M.Kom"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jenisKelamin">Jenis Kelamin *</Label>
                  <Input
                    id="jenisKelamin"
                    placeholder="Jenis Kelamin"
                    defaultValue="Laki-laki"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempatLahir">Tempat Lahir *</Label>
                  <Input
                    id="tempatLahir"
                    placeholder="Jakarta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tanggalLahir">Tanggal Lahir *</Label>
                  <DatePicker id="tanggalLahir" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agama">Agama</Label>
                  <Input
                    id="agama"
                    placeholder="Agama"
                    defaultValue="Islam"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kewarganegaraan">Kewarganegaraan</Label>
                  <Input
                    id="kewarganegaraan"
                    placeholder="Indonesia"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ahmad.fauzi@unsil.ac.id"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telepon">Nomor Telepon *</Label>
                  <Input
                    id="telepon"
                    placeholder="+62 812-3456-7890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kota">Kota</Label>
                  <Input
                    id="kota"
                    placeholder="Tasikmalaya"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provinsi">Provinsi</Label>
                  <Input
                    id="provinsi"
                    placeholder="Jawa Barat"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kodePos">Kode Pos</Label>
                  <Input
                    id="kodePos"
                    placeholder="46115"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alamat">Alamat Lengkap</Label>
                  <Input
                    id="alamat"
                    placeholder="Jl. Siliwangi No. 24, Tasikmalaya"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;