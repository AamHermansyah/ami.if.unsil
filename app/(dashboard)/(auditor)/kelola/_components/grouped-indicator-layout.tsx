import React, { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Target,
  MoreVertical,
  Pencil,
  Delete
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const data = [
  {
    code: "K1",
    title: "Visi, Misi, Tujuan dan Strategi",
    indikators: [
      {
        id: "i1",
        kodeIndikator: "I.1",
        namaIndikator: "Dokumen visi dan misi tersedia",
      },
      {
        id: "i2",
        kodeIndikator: "I.2",
        namaIndikator: "Tujuan pendidikan sesuai SN-Dikti",
      },
    ],
  },
  {
    code: "K2",
    title: "Tata Pamong, Tata Kelola, dan Kerjasama",
    indikators: [
      {
        id: "i3",
        kodeIndikator: "II.1",
        namaIndikator: "Kurikulum terkini berbasis OBE",
      },
    ],
  },
]

function GroupedIndicatorLayout() {
  const [expandedKriteria, setExpandedKriteria] = useState<string[]>(['K001', 'K002', 'K003', 'K004', 'K005']);

  const toggleKriteriaExpansion = (kriteriaCode: string) => {
    setExpandedKriteria(prev =>
      prev.includes(kriteriaCode)
        ? prev.filter(code => code !== kriteriaCode)
        : [...prev, kriteriaCode]
    );
  };

  return (
    <div className="space-y-4">
      {data.map((kriteria) => {
        const isExpanded = expandedKriteria.includes(kriteria.code)

        return (
          <Card key={kriteria.code}>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleKriteriaExpansion(kriteria.code)}
            >
              <div className="w-full flex sm:items-center justify-between gap-y-2">
                <div className="flex-1 flex items-center space-x-4">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-primary dark:text-secondary" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-primary dark:text-secondary" />
                  )}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-2">
                    <div className="flex items-center justify-between">
                      <code className="bg-primary w-max text-primary-foreground px-2 py-1 rounded-full text-xs sm:text-sm font-mono">
                        {kriteria.code}
                      </code>
                      <Badge variant="outline" className="sm:hidden">
                        {kriteria.indikators.length} Indikator
                      </Badge>
                    </div>
                    <h3 className="flex-1 sm:text-lg font-semibold">
                      {kriteria.title}
                    </h3>
                  </div>
                </div>
                <Badge variant="outline" className="hidden sm:inline-flex">
                  {kriteria.indikators.length} Indikator
                </Badge>
              </div>
            </CardHeader>
            {isExpanded && (
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {kriteria.indikators.map((indikator) => (
                    <div
                      key={indikator.id}
                      className="w-full flex gap-3 items-center justify-between p-4 border rounded-md"
                    >
                      <div className="flex-1 flex items-center space-x-4">
                        <div className="hidden sm:block bg-foreground p-2 rounded-lg border border-gray-200">
                          <Target className="h-4 w-4 text-background" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <code className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-mono">
                              {indikator.kodeIndikator}
                            </code>
                          </div>
                          <p className="text-sm font-medium">
                            {indikator.namaIndikator}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="w-4 h-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Delete className="w-4 h-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}

export default GroupedIndicatorLayout