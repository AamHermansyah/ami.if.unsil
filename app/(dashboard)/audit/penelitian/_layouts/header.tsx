import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Header() {
  return (
    <div className="bg-card rounded-lg shadow-sm border p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Audit Penelitian & Publikasi</h1>
          <p className="text-muted-foreground">
            Monitor dan verifikasi capaian penelitian Program Studi Informatika
          </p>
        </div>
        <Select defaultValue="2024">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default Header