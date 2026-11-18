'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Search, Heart, User, Menu, X, Compass, MapPin } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'خانه', icon: Home },
  { href: '/properties', label: 'اقامتگاه‌ها', icon: Compass },
  { href: '#regions', label: 'مناطق گردشگری', icon: MapPin },
  { href: '#features', label: 'امکانات', icon: Heart },
  { href: '#why-us', label: 'درباره ما', icon: User },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Floating pill navigation container (دقیقاً مثل عکس اصلی) */}
        <nav
          className={`flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'glass-pill shadow-xl'
              : 'bg-white/90 backdrop-blur-md shadow-md border border-white/80'
          }`}
        >
          {/* Logo (Poulls / سرپناه) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-lg shadow-md group-hover:scale-105 transition-transform"
              style={{ background: 'hsl(var(--primary))' }}
            >
              🌿
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-green-800 transition-colors">
                سرپناه
              </span>
              <span className="text-[10px] text-gray-500 font-medium -mt-1">
                رزرو بوم‌گردی و ویلا
              </span>
            </div>
          </Link>

          {/* Center Links (دسکتاپ) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-green-900 hover:bg-green-50/70 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/properties"
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-green-800 hover:bg-gray-100 transition-colors"
              title="جستجوی سریع"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/login"
              className="btn-3d-clay px-6 py-2.5 text-sm font-bold text-white shadow-md flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>ورود / ثبت‌نام</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/login"
              className="btn-3d-clay px-3.5 py-1.5 text-xs font-bold text-white shadow-sm"
            >
              ورود
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100"
              aria-label="منو"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 animate-fade-up">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-900 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-green-700" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-gray-100 flex gap-2">
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-3d-clay flex-1 py-2.5 text-center text-xs font-bold text-white rounded-xl"
                >
                  ثبت‌نام کاربر جدید
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center text-xs font-semibold text-gray-700 border border-gray-200 rounded-xl"
                >
                  ورود
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
