'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import AvatarUploader from '@/components/core/avatar-uploader';
import DatePicker from '@/components/core/date-picker';

const CreateDosenProfilePage: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <Button variant="ghost" size="sm">
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </Button>
      <div className="bg-gradient-to-b from-card to-background shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold">
                Data Profil
              </h1>
              <p className="text-sm text-muted-foreground">
                Silahkan lengkapi data profil akun untuk informasi lebih jelas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 order-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Data Profil
            </CardTitle>
            <CardDescription>
              Lengkapi data profil dengan lengkap
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 flex flex-col">
              <Label htmlFor="foto">Foto Profil</Label>
              <AvatarUploader
                id="foto"
                maxSizeMB={2}
                className="items-start"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="namaLengkap">Nama Lengkap *</Label>
                <Input
                  id="namaLengkap"
                  placeholder="Dr. Ahmad Fauzi, M.Kom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nidn">NIDN *</Label>
                <Input
                  id="nidn"
                  placeholder="Masukan NIDN"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jenisKelamin">Jenis Kelamin *</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Laki-laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
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
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Agama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Kristen">Kristen</SelectItem>
                    <SelectItem value="Katolik">Katolik</SelectItem>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Buddha">Buddha</SelectItem>
                    <SelectItem value="Konghucu">Konghucu</SelectItem>
                  </SelectContent>
                </Select>
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

            <Separator />

            {/* Navigation Buttons */}
            <div className="flex justify-end">
              <Button>
                <Save className="w-4 h-4" />
                Simpan Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateDosenProfilePage;