import React from 'react'
import Header from '../_layouts/header'
import { ChartExample } from './_components/chart-example'

function LaporanPage() {
  return (
    <div className="space-y-4">
      <Header />
      <div className="grid grid-cols-2 gap-4">
        <ChartExample />
        <ChartExample />
        <ChartExample />
        <ChartExample />
      </div>
    </div>
  )
}

export default LaporanPage