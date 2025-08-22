import React from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Heart,
  Users,
  Pencil,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { differenceInYears, format } from 'date-fns';
import Link from 'next/link';
import { id } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { InfoItem } from '../_components/info-item';
import { Access, User as UserType } from '@/lib/generated/prisma';

interface IProps {
  access: Access & {
    user: UserType
  };
  hiddenEdit?: boolean;
}

function ProfileLayout({ access, hiddenEdit }: IProps) {
  const { user } = access;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <Card className="overflow-hidden relative">
          {!hiddenEdit && (
            <Link href="/profil/edit" className="absolute bottom-4 right-4">
              <Button size="icon" variant="outline">
                <Pencil />
              </Button>
            </Link>
          )}
          <CardContent>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/50 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/50 rounded-full translate-y-12 -translate-x-12" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center space-x-4 mb-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.image || ""} alt="profil" className="object-cover" />
                  <AvatarFallback>
                    {user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-3xl font-bold mb-1">{user.name}</h1>
                  <p className="text-sm text-muted-foreground mb-2">NIDN: {user.nidn || '-'}</p>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span className="capitalize">{user.city || '-'}, {user.province || '-'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span className="capitalize">{user.citizenship || '-'}</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info Pribadi & Alamat */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary dark:text-secondary" />
                  Informasi Pribadi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InfoItem
                    icon={Users}
                    label="Jenis Kelamin"
                    value={['L', 'P'].includes(user.gender || '') ? ({ L: 'Laki-laki', P: 'Perempuan' })[user.gender as 'L' | 'P'] : '-'}
                  />
                  <InfoItem
                    icon={MapPin}
                    label="Tempat Lahir"
                    value={user.placeOfBirth || '-'}
                  />
                  <InfoItem
                    icon={Calendar}
                    label="Tanggal Lahir"
                    value={user.dateOfBirth ? format(new Date(user.dateOfBirth), "d MMMM yyyy", { locale: id }) : '-'}
                  />
                  <InfoItem
                    icon={Heart}
                    label="Agama"
                    value={user.religion || '-'}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary dark:text-secondary" />
                  Alamat Lengkap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-xl p-6 border border-l-4 border-primary dark:border-secondary">
                  <p className="text-sm leading-relaxed capitalize">
                    {user.address || '-'}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
                    <Badge variant="info" className="capitalize">{user.city || '-'}</Badge>
                    <Badge variant="info" className="capitalize">{user.province || '-'}</Badge>
                    <Badge variant="info" className="capitalize">{user.zipCode || '-'}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kontak & Quick Info */}
          <div className="space-y-6 sticky top-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary dark:text-secondary" />
                  Kontak
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={
                    <Link
                      href={`mailto:${access.email}`}
                      className="text-primary dark:text-secondary hover:text-blue-800 font-medium break-all"
                    >
                      {access.email}
                    </Link>
                  }
                />
                <InfoItem
                  icon={Phone}
                  label="Telepon"
                  value={
                    <Link
                      href={user.phone ? `tel:${user.phone}` : ''}
                      className="text-primary dark:text-secondary hover:text-blue-800 font-medium"
                    >
                      {user.phone || '-'}
                    </Link>
                  }
                />
                <InfoItem
                  icon={Globe}
                  label="Kewarganegaraan"
                  value={user.citizenship || '-'}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <Calendar className="h-5 w-5 text-primary dark:text-secondary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Usia</p>
                    <p className="text-sm font-semibold">
                      {user.dateOfBirth ? `${differenceInYears(new Date(), new Date(user.dateOfBirth))} Tahun` : '-'}
                    </p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <MapPin className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Lokasi</p>
                    <p className="text-sm font-semibold">{user.province || '-'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
