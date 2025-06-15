"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash2, CalendarPlus } from "lucide-react"
import Header from "./_layouts/header"
import AddSemesterDialog from "./_components/add-semester-dialog"
import DetailSemesterSheet from "./_components/detail-semester-sheet"

type Semester = {
  id: string
  nama: string
  tahunAkademik: string
  periode: "Ganjil" | "Genap"
  status: "Aktif" | "Nonaktif"
}

const dataSemester: Semester[] = [
  {
    id: "1",
    nama: "Ganjil 2024/2025",
    tahunAkademik: "2024/2025",
    periode: "Ganjil",
    status: "Aktif",
  },
  {
    id: "2",
    nama: "Genap 2023/2024",
    tahunAkademik: "2023/2024",
    periode: "Genap",
    status: "Nonaktif",
  },
]

export default function ManajemenSemesterAuditorPage() {
  return (
    <div className="space-y-4">
      <Header />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 text-blue-600" />
                Manajemen Semester
              </CardTitle>
              <CardDescription>
                Tambah dan kelola data semester untuk kebutuhan audit AMI.
              </CardDescription>
            </div>
            <AddSemesterDialog />
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Semester</TableHead>
                  <TableHead>Tahun Akademik</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSemester.map((smt) => (
                  <TableRow key={smt.id}>
                    <TableCell className="font-medium">{smt.nama}</TableCell>
                    <TableCell>{smt.tahunAkademik}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{smt.periode}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          smt.status === "Aktif"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }
                      >
                        {smt.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <DetailSemesterSheet
                          semester={{
                            nama: smt.nama,
                            tahunAkademik: smt.tahunAkademik,
                            periode: smt.periode,
                          }}
                          trigger={
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          }
                        />

                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
