'use client'

import ErrorLayout from '@/components/shared/error-layout';
import React from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {

  return (
    <html className="dark">
      <body>
        <main>
          <ErrorLayout error={error.message} />
        </main>
      </body>
    </html>
  )
}