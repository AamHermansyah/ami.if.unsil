import React from 'react'
import Image from 'next/image';
import FeaturesLogin from './features-login';

function HeroLogin() {
  return (
    <div className="w-full space-y-8 text-center md:text-left">
      {/* Logo & Title */}
      <div className="space-y-4">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="relative">
            <div className="relative w-16 h-16 bg-muted rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/logo-if.png"
                alt="Logo Informatika"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-blue-900 dark:to-secondary bg-clip-text text-transparent">
              AMI-IF Unsil
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Audit Mutu Internal</p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl lg:text-3xl font-bold">
            Sistem Audit Mutu Internal
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto lg:mx-0">
            Platform digital untuk monitoring dan evaluasi kualitas akademik yang terintegrasi dan real-time
          </p>
        </div>
      </div>

      {/* Features */}
      <FeaturesLogin />
    </div>
  )
}

export default HeroLogin