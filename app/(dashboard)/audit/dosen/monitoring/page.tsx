import React from 'react'
import Header from '../_layouts/header'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Users,
  Search,
  Edit,
  Eye,
  CheckCircle,
  User,
  GraduationCap,
  Mail,
  Phone,
  Clock,
  Shield,
  MoreHorizontal
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const dosenData = [
  {
    id: 1,
    nama: "Dr. Ahmad Fauzi, M.Kom",
    nidn: "0123456789",
    nip: "198501012018031001",
    status: "Tetap",
    jabfung: "Lektor",
    tmtJabfung: "2022-04-01",
    pendidikan: "S3 Teknik Informatika",
    universitas: "Institut Teknologi Bandung",
    tahunLulus: 2020,
    email: "ahmad.fauzi@unsil.ac.id",
    phone: "+62 812-3456-7890",
    sertifikat: true,
    status_data: "Lengkap",
    last_update: "2024-06-08",
    foto: null
  },
  {
    id: 2,
    nama: "Prof. Dr. Sarah Indira, M.T",
    nidn: "0234567890",
    nip: "197803152008122002",
    status: "Tetap",
    jabfung: "Guru Besar",
    tmtJabfung: "2020-01-01",
    pendidikan: "S3 Teknik Informatika",
    universitas: "Institut Teknologi Sepuluh Nopember",
    tahunLulus: 2018,
    email: "sarah.indira@unsil.ac.id",
    phone: "+62 813-4567-8901",
    sertifikat: true,
    status_data: "Lengkap",
    last_update: "2024-06-07",
    foto: null
  },
  {
    id: 3,
    nama: "Dr. Budi Santoso, M.Kom",
    nidn: "0345678901",
    nip: "198012102015031003",
    status: "Tetap",
    jabfung: "Lektor Kepala",
    tmtJabfung: "2021-10-01",
    pendidikan: "S3 Ilmu Komputer",
    universitas: "Universitas Indonesia",
    tahunLulus: 2019,
    email: "budi.santoso@unsil.ac.id",
    phone: "+62 814-5678-9012",
    sertifikat: true,
    status_data: "Lengkap",
    last_update: "2024-06-05",
    foto: null
  },
  {
    id: 4,
    nama: "Rini Marlina, M.Kom",
    nidn: "0456789012",
    nip: "198506201019032004",
    status: "Tetap",
    jabfung: "Asisten Ahli",
    tmtJabfung: "2019-03-01",
    pendidikan: "S2 Teknik Informatika",
    universitas: "Universitas Padjadjaran",
    tahunLulus: 2017,
    email: "rini.marlina@unsil.ac.id",
    phone: "+62 815-6789-0123",
    sertifikat: false,
    status_data: "Perlu Update",
    last_update: "2024-05-20",
    foto: null
  },
  {
    id: 5,
    nama: "Dr. Eko Prasetyo, M.T",
    nidn: "0567890123",
    nip: "197909152008121005",
    status: "Tetap",
    jabfung: "Lektor",
    tmtJabfung: "2023-01-01",
    pendidikan: "S3 Teknik Elektro",
    universitas: "Institut Teknologi Bandung",
    tahunLulus: 2021,
    email: "eko.prasetyo@unsil.ac.id",
    phone: "+62 816-7890-1234",
    sertifikat: true,
    status_data: "Lengkap",
    last_update: "2024-06-06",
    foto: null
  },
  {
    id: 6,
    nama: "Dian Permata, M.Kom",
    nidk: "8812345678",
    nip: "-",
    status: "NIDK",
    jabfung: "Asisten Ahli",
    tmtJabfung: "2023-08-01",
    pendidikan: "S2 Sistem Informasi",
    universitas: "Universitas Siliwangi",
    tahunLulus: 2022,
    email: "dian.permata@unsil.ac.id",
    phone: "+62 817-8901-2345",
    sertifikat: false,
    status_data: "Perlu Update",
    last_update: "2024-05-15",
    foto: null
  }
];

function AuditDosenMonitoringPage() {
  return (
    <div className="space-y-4">
      <Header />
      <div className="w-full flex justify-end">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari nama, NIDN, atau NIDK..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Dosen Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {dosenData.map((dosen) => (
          <Card key={dosen.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold truncate">{dosen.nama}</h3>
                  <p className="text-sm text-muted-foreground">{dosen.nidn || dosen.nidk}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium">{dosen.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Jabatan Fungsional</p>
                  <p className="font-medium">{dosen.jabfung}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pendidikan Terakhir</p>
                  <p className="font-medium">{dosen.pendidikan}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tahun Lulus</p>
                  <p className="font-medium">{dosen.tahunLulus}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-muted-foreground truncate">{dosen.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-muted-foreground">{dosen.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  <span className="text-muted-foreground truncate">{dosen.universitas}</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {dosen.sertifikat && (
                    <Badge className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      Bersertifikat
                    </Badge>
                  )}
                  <Badge
                    className={cn(
                      'text-xs',
                      dosen.status_data === "Lengkap"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    )}
                  >
                    {dosen.status_data === "Lengkap" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {dosen.status_data}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="text-xs text-muted-foreground">
                Terakhir update: {new Date(dosen.last_update).toLocaleDateString('id-ID')}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {dosenData.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">Tidak ada data dosen</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter yang dipilih.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AuditDosenMonitoringPage