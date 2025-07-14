import { BarsLoader } from '@/components/core/loader'
import React from 'react'

function Loading() {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 justify-center items-center">
      <BarsLoader fontSize={20} className="mx-auto" />
      <p>Sedang memuat...</p>
    </div>
  )
}

export default Loading