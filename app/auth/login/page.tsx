import React from 'react';
import { ModeToggle } from '@/components/shared/mode-toggle';
import HeroLogin from '../_components/hero-login';
import FormLogin from '../_components/form-login';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 lg:gap-4 px-4 md:px-10 py-10">
      <div className="fixed top-4 right-4 z-10">
        <ModeToggle />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-center">
          <HeroLogin />
          <FormLogin />
        </div>
      </div>

      {/* Footer */}
      <div className="justify-self-end">
        <p className="text-xs text-gray-400 text-center">
          © 2024 Universitas Siliwangi. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;