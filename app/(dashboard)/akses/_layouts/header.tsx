'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card';

function Header() {
  return (
    <Card>
      <CardContent>
        <div>
          <h1 className="text-2xl font-bold">Akses</h1>
          <p className="text-muted-foreground">
            Kelola akses email yang bisa menggunakan aplikasi ini
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header