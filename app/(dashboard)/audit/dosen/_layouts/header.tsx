import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className="bg-card rounded-lg shadow-sm border p-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          Daftar Profil Dosen
        </h1>
        <p className="text-muted-foreground mt-1">
          Manajemen data profil dan kualifikasi dosen untuk audit mutu internal
        </p>
        <div className="flex items-center gap-2 mt-3">
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            Total: 6 Dosen
          </Badge>
          <Badge className="bg-green-50 text-green-700 border-green-200">
            Tetap: 4
          </Badge>
          <Badge className="bg-orange-50 text-orange-700 border-orange-200">
            NIDK: 1
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default Header