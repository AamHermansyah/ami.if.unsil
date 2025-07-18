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
  LucideIcon,
  Pencil,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { auth } from '@/lib/auth';
import { getUserByEmail } from '@/data/user';
import { redirect } from 'next/navigation';
import { differenceInYears, format } from 'date-fns';
import Link from 'next/link';
import { id } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3 p-4 rounded-md border hover:bg-muted transition-all">
    <div className="flex-shrink-0 mt-0.5">
      <Icon className="h-5 w-5 text-primary dark:text-secondary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground break-words">{value}</p>
    </div>
  </div>
);

async function ProfileDisplay() {
  const session = await auth();
  if (!session?.user) return null;

  const access = await getUserByEmail(session.user.email!);
  if (!access) return redirect('/404');

  const { user } = access;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <Card className="overflow-hidden relative">
          <Link href="/profil/edit" className="absolute bottom-4 right-4">
            <Button size="icon" variant="outline">
              <Pencil />
            </Button>
          </Link>
          <CardContent>
            <div className="absolute top-0 right-0 w-32 h-32 bg-muted-foreground/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-muted-foreground/10 rounded-full translate-y-12 -translate-x-12" />
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.image || ""} alt="profil" className="object-cover" />
                  <AvatarFallback>
                    {user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
                  <p className="text-sm text-muted-foreground mb-2">NIDN: {user.nidn || '-'}</p>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{user.city || '-'}, {user.province || '-'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>{user.citizenship || '-'}</span>
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
                    value={user.gender || '-'}
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
                  <p className="text-sm leading-relaxed">
                    {user.address || '-'}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
                    <Badge variant="info">{user.city || '-'}</Badge>
                    <Badge variant="info">{user.province || '-'}</Badge>
                    <Badge variant="info">{user.zipCode || '-'}</Badge>
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
                      {user.dateOfBirth ? `${differenceInYears(new Date(), new Date(user.dateOfBirth))}` : '-'}
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

export default ProfileDisplay;
