"use client"

import React, { useMemo, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

import { ReportChart } from "../_components/report-chart"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BarChart as BarIcon, FileWarning, FileSpreadsheet, Printer, Radar as RadarIcon } from "lucide-react"
import { Session } from "next-auth"
import { IndicatorType } from "@/lib/generated/prisma"
import { stripHtml } from "@/lib/utils"

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
      type: IndicatorType // "UTAMA" | "TAMBAHAN" -> UTAMA = IKU & TAMBAHAN = IKT
    }[]
  }[];
  periodName: string;
  user: Session['user'];
}

export default function ReportLayout({ data, periodName, user }: IProps) {
  const [viewMode, setViewMode] = useState<"radar" | "bar">("radar")

  // --- PRINT/ PDF ---
  const printAreaRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    contentRef: printAreaRef,
    documentTitle: `Laporan-AMI-${new Date().toLocaleDateString("id-ID")}`,
    pageStyle: `
      @page { size: A4; margin: 16mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .print-break-avoid { break-inside: avoid; page-break-inside: avoid; }
        .print-page-break { page-break-after: always; }
        .no-print { display: none !important; }
      }
    `,
  })

  const { indicatorAOA, indicatorHeaderRows } = useMemo(() => {
    const aoa: (string | number)[][] = []
    const headerRows: number[] = []
    data.forEach((crit, ci) => {
      const subStandar = crit.indicators.length
      // HEADER tabel kriteria (tanpa "Tabel Kriteria N")
      headerRows.push(aoa.length) // simpan index baris sebelum push
      aoa.push([
        ci + 1,
        `${crit.criteriaTitle} (${subStandar} Sub Standar)`,
        "Capaian",
        "Kode",
      ])

      let jumlah = 0
      crit.indicators.forEach((ind, idx) => {
        const cap = Number(ind.achievement) || 0
        jumlah += cap
        aoa.push([
          idx + 1,
          stripHtml(ind.indicatorTitle),
          Number(cap.toFixed(2)),
          ind.indicatorCode,
        ])
      })

      aoa.push(["", "JUMLAH", Number(jumlah.toFixed(2)), ""])
      aoa.push([""]) // pemisah antar kriteria
    })
    return { indicatorAOA: aoa, indicatorHeaderRows: headerRows }
  }, [data])

  // Sheet "Kriteria" (ringkasan per kriteria)
  const criteriaSummaryRows = useMemo(() => {
    return data.map((crit) => {
      const totalIndicators = crit.indicators.length
      const sumAchievement = crit.indicators.reduce(
        (acc, v) => acc + (Number(v.achievement) || 0),
        0
      )
      const ideal = 4 * totalIndicators
      const percent = ideal ? Number(((sumAchievement / ideal) * 100).toFixed(2)) : 0
      const average = totalIndicators ? Number((sumAchievement / totalIndicators).toFixed(2)) : 0
      const iku = crit.indicators.filter(i => i.type === "UTAMA").length
      const ikt = crit.indicators.filter(i => i.type === "TAMBAHAN").length

      return {
        Kriteria: crit.criteriaTitle,
        Kode: crit.criteriaCode,
        "Capaian (total indikator)": Number(sumAchievement.toFixed(2)),
        "Kondisi Ideal": ideal,
        "Persentase Capaian": percent,
        "Rata Rata Capaian": average,
        "JML Sub Standar": totalIndicators,
        IKU: iku,
        IKT: ikt,
      }
    })
  }, [data])

  async function exportToExcel() {
    const XLSX = await import("xlsx-js-style") // <— styled SheetJS

    // ====== style helpers ======
    const borderAllThin = {
      top: { style: "thin", color: { rgb: "FF000000" } },
      bottom: { style: "thin", color: { rgb: "FF000000" } },
      left: { style: "thin", color: { rgb: "FF000000" } },
      right: { style: "thin", color: { rgb: "FF000000" } },
    } as const

    const headerFill = { patternType: "solid", fgColor: { rgb: "FFD9E1F2" } } // biru muda
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      fill: headerFill,
      border: borderAllThin,
    } as const

    const borderOnly = { border: borderAllThin } as const

    const wb = XLSX.utils.book_new()

    // ====== SHEET 1: Data Indikator ======
    // sisipkan 2 baris judul periode paling atas
    const aoaWithTitle = [[`Nama Periode: ${periodName}`], [], ...indicatorAOA]
    const wsData = XLSX.utils.aoa_to_sheet(aoaWithTitle)

    // merge A1:D1 untuk judul periode
    wsData["!merges"] = [...(wsData["!merges"] || []), { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }]

    // style cell A1
    wsData["A1"].s = { font: { bold: true }, alignment: { horizontal: "left" } }

      // lebar kolom
      ; (wsData["!cols"] as unknown) = [{ wch: 6 }, { wch: 80 }, { wch: 14 }, { wch: 18 }]

    // beri warna header tiap tabel kriteria
    const offsetRows = 2 // karena ada 2 baris judul periode
    const rangeData = XLSX.utils.decode_range(wsData["!ref"]!)
    const encode = XLSX.utils.encode_cell

    indicatorHeaderRows.forEach((r0) => {
      const r = r0 + offsetRows
      for (let c = 0; c <= 3; c++) {
        const addr = encode({ r, c })
        if (!wsData[addr]) wsData[addr] = { t: "s", v: "" }
        wsData[addr].s = headerStyle
      }
    })

    // border seluruh area tabel (mulai baris 3 sampai baris terakhir)
    for (let r = 2; r <= rangeData.e.r; r++) {
      for (let c = 0; c <= 3; c++) {
        const addr = encode({ r, c })
        if (!wsData[addr]) continue // biarkan baris pemisah kosong
        wsData[addr].s = { ...(wsData[addr].s || {}), ...borderOnly }
      }
    }

    XLSX.utils.book_append_sheet(wb, wsData, "Data Indikator")

    // ====== SHEET 2: Kriteria (ringkasan) ======
    const header = [
      "Kriteria",
      "Kode",
      "Capaian (total indikator)",
      "Kondisi Ideal",
      "Persentase Capaian",
      "Rata Rata Capaian",
      "JML Sub Standar",
      "IKU",
      "IKT",
    ]

    // 1) Buat sheet dengan 2 baris pertama untuk judul periode,
    //    dan BARIS HEADER dibuat eksplisit di baris ke-3 (A3:I3).
    const wsSummary = XLSX.utils.aoa_to_sheet([
      [`Nama Periode: ${periodName}`], // A1
      [],                              // A2
      header,                          // A3 (header tabel)
    ])

    // Merge A1:I1 untuk judul periode
    wsSummary["!merges"] = [...(wsSummary["!merges"] || []), { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } }]

    // 2) Tambahkan DATA mulai A4 tanpa header
    XLSX.utils.sheet_add_json(wsSummary, criteriaSummaryRows, {
      origin: "A4",
      skipHeader: true,
    })

      // Lebar kolom
      ; (wsSummary["!cols"] as unknown) = [
        { wch: 40 }, { wch: 12 }, { wch: 24 }, { wch: 16 }, { wch: 20 },
        { wch: 20 }, { wch: 18 }, { wch: 8 }, { wch: 8 },
      ]

    // Bold judul periode (A1) dan merge sudah dibuat di atas
    wsSummary["A1"].s = { font: { bold: true } }

    // Baris header = baris ke-3 (indeks 2 zero-based)
    const headerRowIdx = 2
    for (let c = 0; c < header.length; c++) {
      const addr = XLSX.utils.encode_cell({ r: headerRowIdx, c })
      if (!wsSummary[addr]) wsSummary[addr] = { t: "s", v: header[c] }
      wsSummary[addr].s = headerStyle
    }

    // Border seluruh area data (dari A3 sampai baris terakhir)
    const rng = XLSX.utils.decode_range(wsSummary["!ref"]!)
    for (let r = headerRowIdx; r <= rng.e.r; r++) {
      for (let c = 0; c < header.length; c++) {
        const addr = XLSX.utils.encode_cell({ r, c })
        if (!wsSummary[addr]) continue
        wsSummary[addr].s = { ...(wsSummary[addr].s || {}), ...borderOnly }
      }
    }

    XLSX.utils.book_append_sheet(wb, wsSummary, "Kriteria")


    // ====== simpan sebagai Blob (menghindari file korup) ======
    const wbout: ArrayBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      compression: true,
    })
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Laporan-AMI-${new Date().toISOString().slice(0, 10)}.xlsx`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
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
