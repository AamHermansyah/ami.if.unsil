"use client"

import React, { useMemo, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"
import * as XLSX from "xlsx"

import { ReportChart } from "../_components/report-chart"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BarChart as BarIcon, FileWarning, FileSpreadsheet, Printer, Radar as RadarIcon } from "lucide-react"
import { Session } from "next-auth"

interface IProps {
  data: {
    criteriaAuditId: string
    criteriaCode: string
    criteriaTitle: string
    indicators: {
      indicatorAuditId: string
      indicatorCode: string
      indicatorTitle: string
      achievement: number
    }[]
  }[];
  periodName: string;
  user: Session['user'];
}

export default function ReportLayout({ data, periodName, user }: IProps) {
  const [viewMode, setViewMode] = useState<"radar" | "bar">("radar")

  // --- PRINT/ PDF ---
  // We'll render a separate, print-only version of the grid (no Masonry) for clean page breaks.
  const printAreaRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: printAreaRef,
    documentTitle: `Laporan-AMI-${new Date().toLocaleDateString("id-ID")}`,
    // Tweak page & print styles for nicer output
    pageStyle: `
      @page { size: A4; margin: 16mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .print-break-avoid { break-inside: avoid; page-break-inside: avoid; }
        .print-page-break { page-break-after: always; }
        /* ensure buttons/controls hidden */
        .no-print { display: none !important; }
      }
    `,
  })

  // --- EXCEL ---
  const excelRows = useMemo(() => {
    // Flatten rows for a "Data Indikator" sheet
    const rows: Array<Record<string, string | number>> = []
    data.forEach((crit) => {
      const avg =
        crit.indicators.reduce((acc, v) => acc + (Number(v.achievement) || 0), 0) /
        (crit.indicators.length || 1)

      crit.indicators.forEach((ind) => {
        rows.push({
          KriteriaKode: crit.criteriaCode,
          KriteriaJudul: crit.criteriaTitle,
          IndikatorKode: ind.indicatorCode,
          IndikatorJudul: ind.indicatorTitle,
          Capaian: ind.achievement,
        })
      })

      // Optionally append a summary row per criteria (easy to filter/sort by blank IndikatorKode)
      rows.push({
        KriteriaKode: crit.criteriaCode,
        KriteriaJudul: "Rata-rata Kriteria",
        IndikatorKode: "",
        IndikatorJudul: "",
        Capaian: Number.isFinite(avg) ? Number(avg.toFixed(2)) : 0,
      })
    })
    return rows
  }, [data])

  const excelSummary = useMemo(() => {
    // Second sheet: one row per criteria (summary only)
    return data.map((crit) => {
      const avg =
        crit.indicators.reduce((acc, v) => acc + (Number(v.achievement) || 0), 0) /
        (crit.indicators.length || 1)
      return {
        KriteriaKode: crit.criteriaCode,
        KriteriaJudul: crit.criteriaTitle,
        JumlahIndikator: crit.indicators.length,
        RataRataCapaian: Number.isFinite(avg) ? Number(avg.toFixed(2)) : 0,
      }
    })
  }, [data])

  function exportToExcel() {
    const wb = XLSX.utils.book_new()

    // Sheet 1: Data Indikator (flatten)
    const wsData = XLSX.utils.json_to_sheet(excelRows)
    XLSX.utils.book_append_sheet(wb, wsData, "Data Indikator")

    // Sheet 2: Ringkasan Kriteria
    const wsSummary = XLSX.utils.json_to_sheet(excelSummary)
    XLSX.utils.book_append_sheet(wb, wsSummary, "Ringkasan Kriteria")

    // Optional: set simple column widths
    const setColWidths = (ws: XLSX.WorkSheet, widths: number[]) => {
      // Each width unit ~ 1 char
      ; (ws["!cols"] as XLSX.ColInfo[] | undefined) = widths.map((wch) => ({ wch }))
    }
    setColWidths(wsData, [16, 40, 18, 50, 10])
    setColWidths(wsSummary, [16, 40, 16, 16])

    XLSX.writeFile(wb, `Laporan-AMI-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 no-print">
        <div className="w-max flex bg-card border rounded-lg p-1">
          <Button
            variant={viewMode === "radar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("radar")}
            className="rounded-md"
          >
            <RadarIcon className="h-4 w-4 mr-2" />
            Radar
          </Button>
          <Button
            variant={viewMode === "bar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("bar")}
            className="rounded-md"
          >
            <BarIcon className="h-4 w-4 mr-2" />
            Batang
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={handlePrint} disabled={!data.length}>
            <Printer className="h-4 w-4" />
            Ekspor PDF
          </Button>
          <Button variant="secondary" onClick={exportToExcel} disabled={!data.length}>
            <FileSpreadsheet className="h-4 w-4" />
            Ekspor Excel
          </Button>
        </div>
      </div>

      {/* Report content (single source for screen & print) */}
      <div ref={printAreaRef}>
        <div className="mb-4 hidden print:block text-center">
          <h1 className="text-lg font-semibold">
            Laporan AMI Periode &quot;{periodName}&quot; - Diagram {viewMode === 'bar' ? 'Batang' : 'Radar'}
          </h1>
          <p className="italic text-sm">Dicetak oleh {user.name}</p>
        </div>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {data.map((report) => (
              <div key={report.criteriaAuditId} className="print-break-avoid">
                <ReportChart report={report} type={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <FileWarning className="w-10 h-10 mb-4 text-muted-foreground" />
            <p className="text-sm">Tidak ada data laporan yang tersedia.</p>
          </div>
        )}
      </div>

      {/* Subtle separator at bottom (screen only) */}
      <Separator className="mt-6 print:hidden" />
    </>
  )
}
