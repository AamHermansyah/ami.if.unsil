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
          <h1 className="text-2xl font-bold">Beban Kerja Dosen</h1>
          <p className="text-muted-foreground">
            Kelola dan monitor beban kerja mengajar, pembimbingan, dan perwalian
          </p>
        </div>
        <Select defaultValue="Genap 2024/2025">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Genap 2024/2025">Genap 2024/2025</SelectItem>
            <SelectItem value="Ganjil 2024/2025">Ganjil 2024/2025</SelectItem>
            <SelectItem value="Genap 2023/2024">Genap 2023/2024</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default Header