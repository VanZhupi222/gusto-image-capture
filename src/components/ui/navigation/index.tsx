'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  // Navigation items configuration
  const navItems = [
    { href: '/', label: 'Camera' },
    { href: '/result', label: 'Result' }
  ];

  // Navigation styles
  const navItemBase = "px-4 py-2 rounded-lg font-medium transition-colors";
  const activeClasses = "bg-blue-500 text-white";
  const inactiveClasses = "text-gray-600 hover:text-gray-900 hover:bg-gray-100";

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Selfies</h1>
          </div>

          {/* Links */}
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={`${navItemBase} ${isActive(item.href) ? activeClasses : inactiveClasses}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 