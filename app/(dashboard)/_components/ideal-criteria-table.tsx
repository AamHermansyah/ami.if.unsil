import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getCriteriaAuditValues } from '@/data/dashboard';

interface IProps {
  periodId: string;
}

async function IdealCriteriaTable({ periodId }: IProps) {
  const res = await getCriteriaAuditValues(periodId);
  if (res?.error) throw Error(res.message);

  const data = res.data!;

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Laporan Kriteria Audit</CardTitle>
        <CardDescription>
          Laporan untuk mendapatkan data kondisi ideal dan capaian yang didapat dari semua indikator
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">#</TableHead>
              <TableHead className="font-medium">Kriteria</TableHead>
              <TableHead className="font-medium">Kode</TableHead>
              <TableHead className="font-medium">Kondisi Ideal</TableHead>
              <TableHead className="font-medium">Capaian</TableHead>
              <TableHead className="font-medium">Capaian (%)</TableHead>
              <TableHead className="font-medium">IKU</TableHead>
              <TableHead className="font-medium">IKT</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? data.map((item, index) => (
              <TableRow
                key={item.criteriaCode}
                className="border-b hover:bg-muted transition-colors"
              >
                <TableCell>
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {item.criteriaTitle}
                </TableCell>
                <TableCell>
                  <code className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-mono">
                    {item.criteriaCode}
                  </code>
                </TableCell>
                <TableCell>{item.idealScore}</TableCell>
                <TableCell>{item.totalAchievement}</TableCell>
                <TableCell>{item.percentage}%</TableCell>
                <TableCell>{item.totalIndicatorUtama}</TableCell>
                <TableCell>{item.totalIndicatorTambahan}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Kriteria audit masih kosong
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default IdealCriteriaTable