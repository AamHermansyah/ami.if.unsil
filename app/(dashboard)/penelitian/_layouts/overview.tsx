import React from 'react'
import { OverviewCard } from '@/components/shared/overview-card'
import {
  BookOpen,
  Award,
  TrendingUp,
  Users,
} from 'lucide-react';

function Overview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <OverviewCard
        label="Total Publikasi"
        value={2}
        icon={<BookOpen className="w-6 h-6 text-blue-600" />}
        color="blue"
        description="Tahun 2024"
      />

      <OverviewCard
        label="Sitasi"
        value={10}
        icon={<TrendingUp className="w-6 h-6 text-green-600" />}
        color="green"
        description={`Rata-rata: 12.5`}
      />

      <OverviewCard
        label="Produk Diterapkan"
        value={5}
        icon={<Award className="w-6 h-6 text-purple-600" />}
        color="purple"
        description={`Target: 4 minimal`}
      />

      <OverviewCard
        label="Kolaborasi Mahasiswa"
        value={10}
        icon={<Users className="w-6 h-6 text-orange-600" />}
        color="orange"
        description="Mahasiswa terlibat"
      />
    </div>
  )
}

export default Overview