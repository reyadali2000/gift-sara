import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Globe, Menu, X, Sparkles } from 'lucide-react';
import type { Lang, Product } from '../types';
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
  searchResults: Product[];
  onSelectProduct: (product: Product) => void;
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
  searchResults,
  onSelectProduct,
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Left/Right Group: Mobile Menu + Brand Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-1.5 sm:p-2 rounded-full hover:bg-[#EFE8DC] text-[#1E1916] transition shrink-0"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo */}
            <a
              href="#hero"
              onClick={() => onSelectCategory('ALL')}
              className="flex items-center group shrink-0"
            >
              <img
                src={STORE_INFO.logo}
                alt={t.brandName}
                className="h-8 sm:h-14 w-auto max-w-[115px] sm:max-w-none object-contain group-hover:scale-105 transition duration-500"
              />
            </a>
          </div>

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
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Search Toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className={`p-2 sm:p-2.5 rounded-full transition ${
                searchOpen
                  ? 'bg-[#1E1916] text-[#FAF7F2]'
                  : 'hover:bg-[#EFE8DC] text-[#1E1916]'
              }`}
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Wishlist Filter Toggle */}
            <button
              type="button"
              onClick={() => {
                onToggleWishlistFilter();
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative p-2 sm:p-2.5 rounded-full transition ${
                showWishlistOnly
                  ? 'bg-[#C89B96]/25 text-[#9E5B55]'
                  : 'hover:bg-[#EFE8DC] text-[#1E1916]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${showWishlistOnly ? 'fill-current' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -end-0.5 w-4 h-4 rounded-full bg-[#C89B96] text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full border border-[#D9CFC1] hover:border-[#B8925A] bg-white/70 text-[11px] sm:text-xs font-semibold text-[#1E1916] transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#B8925A]" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#1E1916] hover:bg-[#332B27] text-[#FAF7F2] text-xs sm:text-sm font-medium transition shadow-sm cursor-pointer shrink-0"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4B788]" />
              <span className="hidden sm:inline">{t.cart.title}</span>
              <span className="inline-flex items-center justify-center min-w-4.5 h-4.5 sm:min-w-5 sm:h-5 px-1 rounded-full bg-[#B8925A] text-white text-[10px] sm:text-[11px] font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar with Instant Product-Name Results */}
        {searchOpen && (
          <div className="border-t border-[#E7DFD3] bg-[#FAF7F2] px-4 py-3 animate-fade-up">
            <div className="max-w-3xl mx-auto relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setSearchOpen(false);
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative flex items-center"
              >
                <Search className="w-4.5 h-4.5 text-[#8A7F76] absolute start-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  autoFocus
                  className="w-full ps-11 pe-10 py-2.5 rounded-full bg-white border border-[#DFD5C7] focus:border-[#B8925A] focus:outline-none text-sm text-[#1E1916] placeholder:text-[#9B9087]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="absolute end-3.5 p-1 rounded-full hover:bg-[#EFE8DC] text-[#7A6F67] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Live Name-Only Matching Results Dropdown */}
              {searchQuery.trim() && (
                <div className="mt-2.5 rounded-2xl bg-white border border-[#E5D9C7] shadow-xl overflow-hidden">
                  {searchResults.length === 0 ? (
                    <p className="px-4 py-4 text-xs sm:text-sm text-[#7A6F67] text-center">
                      {lang === 'ar'
                        ? 'لا توجد منتجات مطابقة لهذا الاسم'
                        : 'No products matched this name'}
                    </p>
                  ) : (
                    <>
                      <ul className="divide-y divide-[#F2EAE0] max-h-72 overflow-y-auto">
                        {searchResults.map((prod) => (
                          <li key={prod.id}>
                            <button
                              type="button"
                              onClick={() => {
                                onSelectProduct(prod);
                                setSearchOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAF7F2] transition text-start cursor-pointer"
                            >
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-11 h-11 rounded-xl object-cover bg-[#F2EAE0] shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-bold text-[#1E1916] truncate">
                                  {prod.name}
                                </p>
                                <p className="text-[11px] text-[#8C7352]">
                                  {lang === 'ar' ? prod.categoryAr : prod.categoryEn}
                                </p>
                              </div>
                              {prod.price > 0 && (
                                <span className="shrink-0 text-xs font-bold text-[#1E1916]">
                                  {prod.price.toLocaleString()} {t.catalog.sar}
                                </span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full py-2.5 bg-[#FBF8F3] hover:bg-[#F2EAE0] border-t border-[#EAE0D2] text-xs font-semibold text-[#8C7352] transition cursor-pointer"
                      >
                        {lang === 'ar'
                          ? 'عرض كل النتائج المطابقة في المتجر'
                          : 'View all matching results in catalog'}
                      </button>
                    </>
                  )}
                </div>
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
