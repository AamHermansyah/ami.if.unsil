'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card';

function Header() {
  return (
    <Card>
      <CardContent>
        <div>
          <h1 className="text-2xl font-bold">Kriteria Audit</h1>
          <p className="text-muted-foreground">
            Kelola kriteria audit mutu internal untuk program studi informatika
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header