'use client';

import { featuresLogin } from '@/constants';
import { cn } from '@/lib/utils';

export default function FeaturesLogin() {
  return (
    <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
      {featuresLogin.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-card rounded-lg backdrop-blur-sm border"
          >
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center',
                feature.iconBg
              )}
            >
              <Icon className={cn('w-4 h-4', feature.iconColor)} />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm">{feature.title}</p>
              <p className="text-muted-foreground text-xs">{feature.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
