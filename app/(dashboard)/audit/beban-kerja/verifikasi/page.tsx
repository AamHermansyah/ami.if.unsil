import React from 'react'
import Header from '../_layouts/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Eye, UserCheck, UserX } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const pendingApprovals = [
  {
    id: '1',
    dosenId: '2',
    namaDosen: 'Dr. Sarah Indira, M.T',
    jenis: 'Beban Mengajar',
    deskripsi: 'Update mata kuliah Algoritma Lanjut - 3 SKS',
    tanggalSubmit: '2024-06-09',
    priority: 'Sedang'
  },
  {
    id: '2',
    dosenId: '1',
    namaDosen: 'Dr. Ahmad Fauzi, M.Kom',
    jenis: 'Bimbingan Skripsi',
    deskripsi: 'Tambah bimbingan mahasiswa baru - Rizki Ahmad',
    tanggalSubmit: '2024-06-08',
    priority: 'Tinggi'
  },
  {
    id: '3',
    dosenId: '3',
    namaDosen: 'Prof. Bambang Sutrisno, Ph.D',
    jenis: 'Perwalian',
    deskripsi: 'Update data bimbingan perwalian semester ini',
    tanggalSubmit: '2024-06-07',
    priority: 'Rendah'
  }
];

function AuditBebanKerjaVerifikasiPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Tinggi': return 'bg-red-100 text-red-800 border-red-200';
      case 'Sedang': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rendah': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <Header />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Pending Approval
            <Badge className="bg-orange-50 text-orange-700 border-orange-200">
              {pendingApprovals.length}
            </Badge>
          </CardTitle>
          <CardDescription>
            Daftar permintaan update data beban kerja yang menunggu persetujuan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-medium">{approval.namaDosen}</p>
                      <Badge variant="outline">{approval.jenis}</Badge>
                      <Badge className={getPriorityColor(approval.priority)}>
                        {approval.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {approval.deskripsi}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Disubmit: {approval.tanggalSubmit}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <UserCheck className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                  >
                    <UserX className="w-4 h-4" />
                    Reject
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                    Detail
                  </Button>
                </div>
              </div>
            ))}

            {pendingApprovals.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-muted-foreground">Tidak ada approval yang pending</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuditBebanKerjaVerifikasiPage