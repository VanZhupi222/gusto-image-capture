'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCameraStore, selectIsCountdownActive, usePhotoStore, selectIsAnalyzing } from '@/store';

export default function Navigation() {
  const pathname = usePathname();
  const isCountdownActive = useCameraStore(selectIsCountdownActive);
  const isAnalyzing = usePhotoStore(selectIsAnalyzing);

  // Navigation items configuration
  const navItems = [
    { href: '/', label: 'Camera' },
    { href: '/result', label: 'Result' }
  ];

  // Navigation styles
  const navItemBase = "px-4 py-2 rounded-lg font-medium transition-colors";
  const activeClasses = "bg-accent text-white";
  const inactiveClasses = "text-secondary hover:text-primary hover:bg-surface-secondary";
  const disabledClasses = "text-muted cursor-not-allowed bg-surface-secondary";

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-primary shadow-sm border-b border-surface-tertiary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">Selfies</h1>
          </div>

          {/* Links */}
          <div className="flex space-x-2">
            {navItems.map((item) => {
              if (isCountdownActive || isAnalyzing) {
                // Show disabled button during countdown
                return (
                  <div
                    key={item.href}
                    className={`${navItemBase} ${disabledClasses}`}
                  >
                    {item.label}
                  </div>
                );
              }
              
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`${navItemBase} ${isActive(item.href) ? activeClasses : inactiveClasses}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
} 