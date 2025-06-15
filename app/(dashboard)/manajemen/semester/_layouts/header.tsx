'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function Header() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div>
          <h1 className="text-2xl font-bold">Semester</h1>
          <p className="text-muted-foreground">
            Kelola data semester sebagai acuan pengisian beban kerja auditee pada setiap periode audit.
          </p>
        </div>
      </div>
    </>
  )
}

export default Header