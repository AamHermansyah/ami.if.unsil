'use client'

import ErrorLayout from "@/components/shared/error-layout"

function AuthErrorPage() {
  return (
    <ErrorLayout
      error="Autentikasi gagal: Hanya pengguna dengan alamat email @unsil.ac.id yang sudah terdaftar yang dapat masuk. Jika Anda yakin sudah terdaftar namun tetap tidak bisa masuk, kemungkinan akun Anda telah dinonaktifkan."
      type="login"
    />
  )
}

export default AuthErrorPage