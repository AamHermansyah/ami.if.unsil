'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  ClipboardList,
  Target,
  UserCheck,
  CheckCircle,
  TrendingUp,
  FileText,
  Award,
  MoreVertical,
  Eye,
  Pencil,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from '../_layouts/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Session } from 'next-auth';

interface AuditMetrics {
  totalKriteria: number;
  totalIndikator: number;
  totalAuditee: number;
  totalAuditor: number;
  indikatorSelesai: number;
  rataRataCapaian: number;
  statusAudit: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  tingkatKesesuaian: number;
}

interface AuditData {
  id: number;
  kriteria: string;
  indikator: string;
}

interface IProps {
  user: Session['user'];
}

function OverviewLayout({ user }: IProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-1');

  // Data dummy untuk metrics
  const metrics: AuditMetrics = {
    totalKriteria: 9,
    totalIndikator: 47,
    totalAuditee: 15,
    totalAuditor: 8,
    indikatorSelesai: 32,
    rataRataCapaian: 78.5,
    statusAudit: 'Sedang Berlangsung',
    tanggalMulai: '2024-03-01',
    tanggalSelesai: '2024-04-15',
    tingkatKesesuaian: 85.2
  };

  // Data dummy untuk tabel audit
  const auditData: AuditData[] = [
    {
      id: 1,
      kriteria: 'Visi, Misi, Tujuan dan Strategi',
      indikator: 'Kejelasan visi dan misi program studi',
    },
    {
      id: 2,
      kriteria: 'Tata Pamong, Tata Kelola dan Kerjasama',
      indikator: 'Struktur organisasi dan tata pamong',
    },
    {
      id: 3,
      kriteria: 'Mahasiswa',
      indikator: 'Sistem penerimaan mahasiswa',
    },
    {
      id: 4,
      kriteria: 'Sumber Daya Manusia',
      indikator: 'Kualifikasi dan kompetensi dosen',
    },
    {
      id: 5,
      kriteria: 'Keuangan, Sarana dan Prasarana',
      indikator: 'Ketersediaan dan kualitas sarana TI',
    }
  ];

  const progressPercentage = (metrics.indikatorSelesai / metrics.totalIndikator) * 100;

  return (
    <div className="min-h-screen space-y-4">
      <Header />

      <div>
        <h2 className="text-xl font-semibold tracking-wide">Selamat datang, {user.name}!</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kriteria</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalKriteria}</div>
            <p className="text-xs text-muted-foreground">Kriteria SPMI</p>
          </CardContent>
        </Card>

        <Card className="bg-sky-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Indikator</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalIndikator}</div>
            <p className="text-xs text-muted-foreground">Indikator audit</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Auditee</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalAuditee}</div>
            <p className="text-xs text-muted-foreground">Dosen & Staff</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Auditor</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalAuditor}</div>
            <p className="text-xs text-muted-foreground">Auditor internal</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress Audit</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.indikatorSelesai}/{metrics.totalIndikator}</div>
            <Progress value={progressPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {progressPercentage.toFixed(1)}% indikator selesai
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Capaian</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.rataRataCapaian}%</div>
            <Progress value={metrics.rataRataCapaian} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Dari indikator yang selesai</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tingkat Kesesuaian</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{metrics.tingkatKesesuaian}%</div>
            <Progress value={metrics.tingkatKesesuaian} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Kesesuaian dengan standar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid items-start grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Audit Belum Terlaksana</CardTitle>
            <CardDescription>
              Daftar 5 indikator audit mutu internal yang belum dilaksanakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">#</TableHead>
                  <TableHead className="font-medium">Kriteria</TableHead>
                  <TableHead className="font-medium">Kode</TableHead>
                  <TableHead className="font-medium">Indikator</TableHead>
                  <TableHead className="font-medium">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {auditData.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="border-b hover:bg-muted transition-colors"
                  >
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.kriteria}
                    </TableCell>
                    <TableCell>
                      <code className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-mono">
                        VIS/T/5
                      </code>
                    </TableCell>
                    <TableCell>{item.indikator}</TableCell>
                    <TableCell>
                      <div className="w-full flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="mx-auto">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link href={`/audit/${encodeURIComponent('VIS/U/03')}?tahun=2023/2024`}>
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4" />
                                Detail
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/audit/${encodeURIComponent('VIS/U/03')}/edit?tahun=2023/2024`}>
                              <DropdownMenuItem>
                                <Pencil className="w-4 h-4" />
                                Edit
                              </DropdownMenuItem>
                            </Link>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Ringkasan Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Selesai</span>
                <Badge className="bg-green-100 text-green-800">3 indikator</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Sedang Proses</span>
                <Badge className="bg-yellow-100 text-yellow-800">1 indikator</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Belum Mulai</span>
                <Badge className="bg-gray-100 text-gray-800">1 indikator</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total</span>
                <Badge className="bg-blue-100 text-blue-800">5 indikator</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewLayout;