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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DatePicker from '@/components/core/date-picker';
import { Access, User } from '@/lib/generated/prisma';
import { EditProfileInput, EditProfileOutput, editProfileSchema } from '@/lib/schemas/profile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

interface IProps {
  access: Access & { user: User };
}

function EditProfileLayout({ access }: IProps) {
  const { user } = access;
  const form = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name || "",
      nidn: user.nidn || "",
      gender: (user.gender as "L" | "P") || undefined,
      placeOfBirth: user.placeOfBirth || "",
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth : undefined,
      religion: user.religion || "",
      citizenship: user.citizenship || "",
      email: access.email || "",
      phone: user.phone || "",
      city: user.city || "",
      province: user.province || "",
      zipCode: user.zipCode || "",
      address: user.address || "",
    },
  });

  const onSubmit = (data: EditProfileOutput) => {
    console.log("Form Data:", data)
    // TODO: kirim ke backend
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Data Profil
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Silahkan lengkapi data profil akun untuk informasi lebih jelas
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="lg:col-span-2 order-2">
        <Card>
          <CardContent className="space-y-6">
            <div className="space-y-3 flex flex-col">
              <Label htmlFor="foto">Foto Profil</Label>

              <Avatar className="w-20 h-20">
                <AvatarImage src={user.image || ""} alt="profil" className="object-cover" />
                <AvatarFallback>
                  {user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <Alert variant="warning" className="mt-2">
                <Info className="h-4 w-4" />
                <AlertTitle className="text-sm font-medium">Informasi</AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground">
                  Untuk mengganti foto profil, silakan ubah langsung di akun Google Anda lalu login ulang ke website ini.
                </AlertDescription>
              </Alert>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => onSubmit(data as z.output<typeof editProfileSchema>))}
                className="grid items-start grid-cols-1 md:grid-cols-2 gap-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap *</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. Ahmad Fauzi, M.Kom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nidn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIDN *</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukan NIDN" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Kelamin *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="L">Laki-laki</SelectItem>
                          <SelectItem value="P">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="placeOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat Lahir *</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukan tempat lahir" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir *</FormLabel>
                      <FormControl>
                        <DatePicker
                          id={field.name}
                          value={field.value as Date}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agama</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukan agama" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="citizenship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kewarganegaraan</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukan kewarganegaraan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukan email" disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon *</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukan nomor telepon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kota</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukan kota" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukan Provinsi" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Pos</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukan kode pos" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Alamat Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukan alamat lengkap" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2 flex justify-end">
                  <Button>
                    <Save className="w-4 h-4" />
                    Simpan
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfileLayout;