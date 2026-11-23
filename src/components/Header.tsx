import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Globe, Menu, X, Sparkles } from 'lucide-react';
import type { Lang } from '../types';
import { STORE_INFO, translations } from '../i18n/translations';

interface HeaderProps {
  lang: Lang;
  onToggleLang: () => void;
  cartCount: number;
  wishlistCount: number;
  showWishlistOnly: boolean;
  onToggleWishlistFilter: () => void;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory: (catAr: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  cartCount,
  wishlistCount,
  showWishlistOnly,
  onToggleWishlistFilter,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onSelectCategory,
}) => {
  const t = translations[lang];
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.collections, href: '#collections' },
    { label: t.nav.catalog, href: '#catalog' },
    { label: t.nav.bespoke, href: '#bespoke' },
    { label: lang === 'ar' ? 'الفروع' : 'Branches', href: '#branches' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#1E1916] text-[#F5EFE6] text-xs py-2 px-4 text-center tracking-wide border-b border-[#B8925A]/25">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4B788] shrink-0" />
          <span className="truncate">{t.announcement}</span>
        </div>
      </div>

      {/* Main Glassmorphic Nav */}
      <div className="bg-[#FAF7F2]/92 backdrop-blur-md border-b border-[#E7DFD3] transition-colors">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-full hover:bg-[#EFE8DC] text-[#1E1916] transition"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={() => onSelectCategory('ALL')}
            className="flex items-center gap-3 group shrink-0"
          >
            <img
              src={STORE_INFO.logo}
              alt={t.brandName}
              className="h-10 sm:h-14 w-auto object-contain group-hover:scale-105 transition duration-500"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#4A413B]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 hover:text-[#1E1916] transition after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#B8925A] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className={`p-2.5 rounded-full transition ${
                searchOpen
                  ? 'bg-[#1E1916] text-[#FAF7F2]'
                  : 'hover:bg-[#EFE8DC] text-[#1E1916]'
              }`}
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Wishlist Filter Toggle */}
            <button
              type="button"
              onClick={() => {
                onToggleWishlistFilter();
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative p-2.5 rounded-full transition ${
                showWishlistOnly
                  ? 'bg-[#C89B96]/25 text-[#9E5B55]'
                  : 'hover:bg-[#EFE8DC] text-[#1E1916]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-4.5 h-4.5 ${showWishlistOnly ? 'fill-current' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -end-0.5 w-4.5 h-4.5 rounded-full bg-[#C89B96] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D9CFC1] hover:border-[#B8925A] bg-white/70 text-xs font-semibold text-[#1E1916] transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#B8925A]" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#1E1916] hover:bg-[#332B27] text-[#FAF7F2] text-xs sm:text-sm font-medium transition shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4B788]" />
              <span className="hidden sm:inline">{t.cart.title}</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#B8925A] text-white text-[11px] font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-[#E7DFD3] bg-[#FAF7F2] px-4 py-3 animate-fade-up">
            <div className="max-w-3xl mx-auto relative flex items-center">
              <Search className="w-4.5 h-4.5 text-[#8A7F76] absolute start-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (e.target.value.trim()) {
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                placeholder={t.searchPlaceholder}
                autoFocus
                className="w-full ps-11 pe-10 py-2.5 rounded-full bg-white border border-[#DFD5C7] focus:border-[#B8925A] focus:outline-none text-sm text-[#1E1916] placeholder:text-[#9B9087]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute end-3.5 p-1 rounded-full hover:bg-[#EFE8DC] text-[#7A6F67]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E7DFD3] bg-[#FAF7F2] px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-[#1E1916] border-b border-[#EFE8DC] last:border-none"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
