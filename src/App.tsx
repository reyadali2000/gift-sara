import React, { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, MessageCircle, CheckCircle2, Home, Grid2x2, ShoppingBag, MapPin } from 'lucide-react';
import catalogData from './data/catalog.json';
import type { CartItem, Category, Lang, Product } from './types';
import { STORE_INFO, translations } from './i18n/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GiftConcierge, type BudgetTier } from './components/GiftConcierge';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { BespokeSection } from './components/BespokeSection';
import { Footer } from './components/Footer';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'sale';

const rawProducts: Product[] = catalogData.products;
const customServices: Product[] = rawProducts.filter((p) => p.type === 'service');
const allProducts: Product[] = rawProducts.filter((p) => p.type !== 'service');
const categories: Category[] = catalogData.categories.map((cat) => ({
  ...cat,
  count:
    cat.nameAr === 'خدمة حسب الطلب'
      ? customServices.length
      : allProducts.filter((p) => p.categoryAr === cat.nameAr).length,
}));

// Curate a diverse set of 5 showcase products across different categories for the Hero slider
const heroShowcaseProducts: Product[] = (() => {
  const seenCats = new Set<string>();
  const diverse: Product[] = [];
  for (const p of allProducts) {
    if (p.price > 0 && p.image.startsWith('/images/products/') && !seenCats.has(p.categoryAr)) {
      seenCats.add(p.categoryAr);
      diverse.push(p);
      if (diverse.length >= 5) break;
    }
  }
  return diverse.length >= 5
    ? diverse
    : allProducts.filter((p) => p.price > 0 && p.image.startsWith('/images/products/')).slice(0, 5);
})();

export function App() {
  const [lang, setLang] = useState<Lang>('ar');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(16);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'collections' | 'branches' | 'cart'>('hero');

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gs_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gs_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Scroll-spy for interactive mobile bottom navigation bar
  useEffect(() => {
    const onScroll = () => {
      if (isCartOpen) return;
      const branchesEl = document.getElementById('branches');
      const collectionsEl = document.getElementById('collections');
      const scrollY = window.scrollY + 220;

      if (branchesEl && scrollY >= branchesEl.offsetTop) {
        setActiveTab('branches');
      } else if (collectionsEl && scrollY >= collectionsEl.offsetTop) {
        setActiveTab('collections');
      } else {
        setActiveTab('hero');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isCartOpen]);

  useEffect(() => {
    try {
      localStorage.setItem('gs_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore storage errors
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('gs_cart', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    giftMessage = '',
    ribbonColor = ''
  ) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (it) =>
          it.product.id === product.id &&
          (it.giftMessage || '') === giftMessage &&
          (it.ribbonColor || '') === ribbonColor
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, quantity, giftMessage, ribbonColor }];
    });
    showToast(
      lang === 'ar'
        ? `تمت إضافة "${product.name}" إلى حقيبة الهدايا`
        : `Added "${product.name}" to your gift bag`
    );
  };

  const handleUpdateCartQty = (index: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredProducts = useMemo(() => {
    let list = allProducts.filter((p) => {
      if (selectedCategory !== 'ALL' && p.categoryAr !== selectedCategory) return false;
      if (showWishlistOnly && !wishlist.includes(p.id)) return false;
      if (budgetTier === 'UNDER_300' && !(p.price > 0 && p.price < 300)) return false;
      if (budgetTier === 'MID_300_800' && !(p.price >= 300 && p.price <= 800)) return false;
      if (budgetTier === 'LUX_800_PLUS' && !(p.price > 800)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const hay = `${p.name} ${p.description} ${p.categoryAr} ${p.categoryEn}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'sale') {
      list = [...list].sort((a, b) => Number(b.isOnSale) - Number(a.isOnSale));
    }

    return list;
  }, [selectedCategory, budgetTier, searchQuery, sortBy, showWishlistOnly, wishlist]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSelectCategory = (catAr: string) => {
    if (catAr === 'خدمة حسب الطلب') {
      document.getElementById('bespoke')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setSelectedCategory(catAr);
    setShowWishlistOnly(false);
    setVisibleCount(16);
  };

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setBudgetTier('ALL');
    setSearchQuery('');
    setShowWishlistOnly(false);
    setSortBy('featured');
    setVisibleCount(16);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#191512] pb-16 md:pb-0">
      <Header
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'ar' ? 'en' : 'ar'))}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        showWishlistOnly={showWishlistOnly}
        onToggleWishlistFilter={() => setShowWishlistOnly((v) => !v)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={handleSelectCategory}
      />

      <main className="flex-1">
        <Hero
          lang={lang}
          featuredProducts={heroShowcaseProducts}
          onQuickView={setQuickViewProduct}
        />

        <GiftConcierge
          lang={lang}
          selectedCategory={selectedCategory}
          budgetTier={budgetTier}
          onSelectOccasion={handleSelectCategory}
          onSelectBudget={(tier) => {
            setBudgetTier(tier);
            setVisibleCount(16);
          }}
        />

        <CategoryShowcase
          lang={lang}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Boutique Catalog Section */}
        <section id="catalog" className="py-14 lg:py-20 bg-[#FBF8F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B88D50]">
                  ✦ {t.catalog.eyebrow}
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191512] mt-1.5">
                  {t.catalog.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#7D7168] mt-1.5">
                  {t.catalog.showing} {visibleProducts.length} {t.catalog.of}{' '}
                  {filteredProducts.length} {t.catalog.product}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {(selectedCategory !== 'ALL' || budgetTier !== 'ALL' || searchQuery || showWishlistOnly) && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 rounded-full border border-[#DFD3C1] bg-white hover:border-[#C59B5F] text-xs font-semibold text-[#6A5F57] hover:text-[#191512] transition cursor-pointer"
                  >
                    {t.catalog.resetFilters}
                  </button>
                )}

                <div className="inline-flex items-center gap-2 bg-white border border-[#DFD3C1] rounded-full px-4 py-2 text-xs font-medium text-[#191512] shadow-xs">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C59B5F]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="featured">{t.catalog.sortFeatured}</option>
                    <option value="price-asc">{t.catalog.sortPriceAsc}</option>
                    <option value="price-desc">{t.catalog.sortPriceDesc}</option>
                    <option value="sale">{t.catalog.sortSale}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
              <button
                type="button"
                onClick={() => handleSelectCategory('ALL')}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer border ${
                  selectedCategory === 'ALL' && !showWishlistOnly
                    ? 'bg-[#191512] text-white border-[#191512] shadow-xs'
                    : 'bg-white text-[#4A413B] border-[#DFD3C1] hover:border-[#C59B5F]'
                }`}
              >
                {t.categories.all} ({allProducts.length})
              </button>

              {categories.map((cat) => {
                const active = selectedCategory === cat.nameAr && !showWishlistOnly;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.nameAr)}
                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer border ${
                      active
                        ? 'bg-[#191512] text-white border-[#191512] shadow-xs'
                        : 'bg-white text-[#4A413B] border-[#DFD3C1] hover:border-[#C59B5F]'
                    }`}
                  >
                    {lang === 'ar' ? cat.nameAr : cat.nameEn}
                  </button>
                );
              })}
            </div>

            {/* Products Grid */}
            {visibleProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#EAE0D2] p-12 text-center max-w-lg mx-auto my-8">
                <p className="text-sm text-[#5C5149] mb-5">{t.catalog.noResults}</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#191512] text-white text-xs font-semibold cursor-pointer"
                >
                  {t.catalog.resetFilters}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      lang={lang}
                      product={product}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onQuickView={setQuickViewProduct}
                      onAddToCart={(p) => handleAddToCart(p, 1, '', '')}
                    />
                  ))}
                </div>

                {visibleCount < filteredProducts.length && (
                  <div className="mt-12 text-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((c) => c + 16)}
                      className="px-8 py-3.5 rounded-full bg-white hover:bg-[#191512] text-[#191512] hover:text-white border border-[#D8CCBC] text-sm font-semibold transition shadow-xs cursor-pointer"
                    >
                      {t.catalog.loadMore} ({filteredProducts.length - visibleCount})
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <BespokeSection lang={lang} services={customServices} />
      </main>

      <Footer
        lang={lang}
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />

      {/* Quick View & Live Embossed Gift Card Modal */}
      <ProductModal
        lang={lang}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        lang={lang}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
      />

      {/* Floating WhatsApp Concierge */}
      <a
        href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 md:bottom-5 end-4 md:end-5 z-30 w-12 h-12 md:w-13 md:h-13 rounded-full bg-[#25D366] hover:bg-[#1EB958] text-white shadow-xl flex items-center justify-center transition hover:scale-105"
        aria-label="WhatsApp Concierge"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Interactive Native-Style Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FBF8F3]/95 backdrop-blur-lg border-t border-[#E6DCCB] px-3 pt-2 pb-[max(0.55rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-12px_rgba(25,21,18,0.16)]"
      >
        <div className="grid grid-cols-4 gap-1.5">
          {[
            {
              id: 'hero' as const,
              label: t.nav.home,
              icon: Home,
              action: () => {
                setIsCartOpen(false);
                setActiveTab('hero');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              },
            },
            {
              id: 'collections' as const,
              label: t.nav.collections,
              icon: Grid2x2,
              action: () => {
                setIsCartOpen(false);
                setActiveTab('collections');
                document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
              },
            },
            {
              id: 'branches' as const,
              label: lang === 'ar' ? 'الفروع' : 'Branches',
              icon: MapPin,
              action: () => {
                setIsCartOpen(false);
                setActiveTab('branches');
                document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' });
              },
            },
            {
              id: 'cart' as const,
              label: t.cart.title,
              icon: ShoppingBag,
              action: () => {
                setActiveTab('cart');
                setIsCartOpen(true);
              },
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = isCartOpen ? tab.id === 'cart' : activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={tab.action}
                className={`relative flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-2xl transition-all duration-300 active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-[#191512] text-[#FBF8F3] shadow-md -translate-y-0.5'
                    : 'text-[#6A5F57] hover:bg-[#EFE7DB]/70'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-4.5 h-4.5 transition-transform duration-300 ${
                      isActive ? 'text-[#E4C796] scale-110' : 'text-[#9A7A4C]'
                    }`}
                  />
                  {tab.id === 'cart' && cartCount > 0 && (
                    <span className="absolute -top-1.5 -end-2.5 min-w-4 h-4 px-1 rounded-full bg-[#C59B5F] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] leading-tight transition-colors ${
                    isActive ? 'font-bold text-[#FBF8F3]' : 'font-medium text-[#6A5F57]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-20 md:bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none px-4">
          <div className="px-5 py-3 rounded-full bg-[#191512] text-[#FBF8F3] text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2 border border-[#C59B5F]/40 animate-fade-up">
            <CheckCircle2 className="w-4 h-4 text-[#E4C796] shrink-0" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
