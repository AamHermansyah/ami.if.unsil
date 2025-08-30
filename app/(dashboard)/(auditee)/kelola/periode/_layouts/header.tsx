'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card';

function Header() {
  return (
    <Card>
      <CardContent>
        <div>
          <h1 className="text-2xl font-bold">Periode</h1>
          <p className="text-muted-foreground">
            Kelola periode sebagai acuan pengisian data setiap periode audit.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header