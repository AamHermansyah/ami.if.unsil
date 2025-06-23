import React from 'react'
import Header from '../_layouts/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, GraduationCap, Target } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const dosenBebanKerja = [
  {
    id: '1',
    nama: 'Dr. Ahmad Fauzi, M.Kom',
    nidn: '0123456789',
    statusKepegawaian: 'Tetap',
    semester: 'Genap 2024/2025',
    totalSKS: 14,
    targetSKS: { min: 12, max: 16 },
    jumlahMataKuliah: 3,
    totalMahasiswaKelas: 105,
    bimbinganSkripsi: 4,
    maxBimbinganSkripsi: 6,
    mahasiswaPerwalian: 8,
    minPerwalian: 3,
    praktikLapangan: 2,
    rataRataBimbingan: 15,
    minBimbingan: 12,
    statusKeseluruhan: 'Sesuai',
    terakhirUpdate: '2024-06-08',
    catatan: 'Semua indikator terpenuhi dengan baik'
  },
  {
    id: '2',
    nama: 'Dr. Sarah Indira, M.T',
    nidn: '0234567890',
    statusKepegawaian: 'Tetap',
    semester: 'Genap 2024/2025',
    totalSKS: 18,
    targetSKS: { min: 12, max: 16 },
    jumlahMataKuliah: 4,
    totalMahasiswaKelas: 145,
    bimbinganSkripsi: 7,
    maxBimbinganSkripsi: 6,
    mahasiswaPerwalian: 6,
    minPerwalian: 3,
    praktikLapangan: 1,
    rataRataBimbingan: 8,
    minBimbingan: 12,
    statusKeseluruhan: 'Tidak Sesuai',
    terakhirUpdate: '2024-06-05',
    catatan: 'Melebihi beban mengajar dan bimbingan, kurang frekuensi bimbingan'
  },
  {
    id: '3',
    nama: 'Prof. Bambang Sutrisno, Ph.D',
    nidn: '0345678901',
    statusKepegawaian: 'Tetap',
    semester: 'Genap 2024/2025',
    totalSKS: 10,
    targetSKS: { min: 12, max: 16 },
    jumlahMataKuliah: 2,
    totalMahasiswaKelas: 68,
    bimbinganSkripsi: 3,
    maxBimbinganSkripsi: 6,
    mahasiswaPerwalian: 5,
    minPerwalian: 3,
    praktikLapangan: 0,
    rataRataBimbingan: 18,
    minBimbingan: 12,
    statusKeseluruhan: 'Perlu Review',
    terakhirUpdate: '2024-06-10',
    catatan: 'Beban mengajar di bawah minimum'
  },
  {
    id: '4',
    nama: 'Dr. Rina Novita, M.Kom',
    nidn: '8812345678',
    statusKepegawaian: 'NIDK',
    semester: 'Genap 2024/2025',
    totalSKS: 12,
    targetSKS: { min: 12, max: 16 },
    jumlahMataKuliah: 3,
    totalMahasiswaKelas: 92,
    bimbinganSkripsi: 2,
    maxBimbinganSkripsi: 6,
    mahasiswaPerwalian: 4,
    minPerwalian: 3,
    praktikLapangan: 1,
    rataRataBimbingan: 14,
    minBimbingan: 12,
    statusKeseluruhan: 'Sesuai',
    terakhirUpdate: '2024-06-09',
    catatan: 'Memenuhi semua target dengan baik'
  }
];

function AuditBebanKerjaAnalisisPage() {
  const totalDosen = dosenBebanKerja.length;
  const dosenSesuai = dosenBebanKerja.filter(d => d.statusKeseluruhan === 'Sesuai').length;
  const persentaseKepatuhan = totalDosen > 0 ? (dosenSesuai / totalDosen) * 100 : 0;

  return (
    <div className="space-y-4">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Distribusi Beban SKS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { range: '< 12 SKS', count: dosenBebanKerja.filter(d => d.totalSKS < 12).length, color: 'red' },
                { range: '12-16 SKS', count: dosenBebanKerja.filter(d => d.totalSKS >= 12 && d.totalSKS <= 16).length, color: 'green' },
                { range: '> 16 SKS', count: dosenBebanKerja.filter(d => d.totalSKS > 16).length, color: 'orange' }
              ].map((item) => (
                <div key={item.range} className="flex items-center justify-between">
                  <span className="text-sm">{item.range}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color === 'green' ? 'bg-green-500' :
                          item.color === 'red' ? 'bg-red-500' : 'bg-orange-500'
                          }`}
                        style={{ width: `${(item.count / totalDosen) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-8">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-600" />
              Distribusi Bimbingan Skripsi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { range: '0-2 mahasiswa', count: dosenBebanKerja.filter(d => d.bimbinganSkripsi <= 2).length, color: 'blue' },
                { range: '3-6 mahasiswa', count: dosenBebanKerja.filter(d => d.bimbinganSkripsi >= 3 && d.bimbinganSkripsi <= 6).length, color: 'green' },
                { range: '> 6 mahasiswa', count: dosenBebanKerja.filter(d => d.bimbinganSkripsi > 6).length, color: 'red' }
              ].map((item) => (
                <div key={item.range} className="flex items-center justify-between">
                  <span className="text-sm">{item.range}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color === 'green' ? 'bg-green-500' :
                          item.color === 'red' ? 'bg-red-500' : 'bg-blue-500'
                          }`}
                        style={{ width: `${(item.count / totalDosen) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-8">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Indikator AMI - Ringkasan Kepatuhan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {dosenBebanKerja.filter(d => d.totalSKS >= d.targetSKS.min && d.totalSKS <= d.targetSKS.max).length}
              </div>
              <div className="text-sm text-blue-800 mb-2">SKS Sesuai Target</div>
              <div className="text-xs text-blue-600">
                {((dosenBebanKerja.filter(d => d.totalSKS >= d.targetSKS.min && d.totalSKS <= d.targetSKS.max).length / totalDosen) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {dosenBebanKerja.filter(d => d.bimbinganSkripsi <= d.maxBimbinganSkripsi).length}
              </div>
              <div className="text-sm text-green-800 mb-2">Bimbingan Sesuai</div>
              <div className="text-xs text-green-600">
                {((dosenBebanKerja.filter(d => d.bimbinganSkripsi <= d.maxBimbinganSkripsi).length / totalDosen) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {dosenBebanKerja.filter(d => d.mahasiswaPerwalian >= d.minPerwalian).length}
              </div>
              <div className="text-sm text-purple-800 mb-2">Perwalian Sesuai</div>
              <div className="text-xs text-purple-600">
                {((dosenBebanKerja.filter(d => d.mahasiswaPerwalian >= d.minPerwalian).length / totalDosen) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">
                {dosenBebanKerja.filter(d => d.rataRataBimbingan >= d.minBimbingan).length}
              </div>
              <div className="text-sm text-orange-800 mb-2">Frekuensi Sesuai</div>
              <div className="text-xs text-orange-600">
                {((dosenBebanKerja.filter(d => d.rataRataBimbingan >= d.minBimbingan).length / totalDosen) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <Alert variant={persentaseKepatuhan >= 80 ? "default" : "destructive"} className="mt-6">
            <Target className="h-4 w-4" />
            <AlertDescription>
              <strong>Status Keseluruhan:</strong> {persentaseKepatuhan >= 80 ? 'Baik' : 'Perlu Perbaikan'} -
              {persentaseKepatuhan.toFixed(1)}% dosen memenuhi seluruh indikator AMI beban kerja.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuditBebanKerjaAnalisisPage