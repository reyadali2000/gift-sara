import React, { useEffect, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, MessageCircle, Sparkles, Eye } from 'lucide-react';
import type { Lang, Product } from '../types';
import { STORE_INFO, translations } from '../i18n/translations';

interface HeroProps {
  lang: Lang;
  featuredProducts: Product[];
  onQuickView: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, featuredProducts, onQuickView }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = featuredProducts.slice(0, 5);
  const activeProduct = slides[activeIndex] || slides[0];

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً هدايا سارة، أرغب بالاستفسار عن تصميم طلب خاص.'
      : 'Hello Gift Sarah, I would like to inquire about a bespoke arrangement.'
  )}`;

  const marqueeItems =
    lang === 'ar'
      ? [
          'ورود طبيعية فاخرة',
          'مسكات عرايس ملكية',
          'استاندات استقبال ومداخل',
          'تقديم المهور والدزات',
          'بطاقات إهداء مخصصة',
          'توصيل فوري ومبرّد بالرياض',
        ]
      : [
          'Fresh Luxury Blooms',
          'Royal Bridal Bouquets',
          'Bespoke Reception Stands',
          'Mahr & Wedding Styling',
          'Calligraphy Gift Cards',
          'Same-Day Riyadh Delivery',
        ];

  return (
    <>
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-b from-[#F4ECE1] via-[#FBF8F3] to-[#FBF8F3] pt-8 pb-12 lg:pt-12 lg:pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Editorial Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-start animate-fade-up">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/85 border border-[#E2D6C3] text-xs font-medium text-[#7C6039] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B5F]" />
                <span>{t.hero.eyebrow}</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-[#191512] leading-[1.2] tracking-tight">
                {lang === 'ar' ? (
                  <>
                    حيث تتحوّل الورود والهدايا إلى
                    <span className="block mt-3 text-gold-gradient">تحفة لا تُنسى</span>
                  </>
                ) : (
                  <>
                    Where Every Bloom &amp; Gift Becomes
                    <span className="block mt-2 text-gold-gradient italic">Pure Art</span>
                  </>
                )}
              </h1>

              {/* Delicate Gold Divider */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-[#C59B5F] to-transparent" />
                <span className="text-[#C59B5F] text-xs">✦</span>
                <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-[#C59B5F] to-transparent" />
              </div>

              <p className="text-base sm:text-lg text-[#5C5149] leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="#catalog"
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#191512] hover:bg-[#2F2722] text-[#FBF8F3] text-sm font-semibold transition-all duration-300 shadow-[0_12px_30px_-10px_rgba(25,21,18,0.45)] hover:-translate-y-0.5"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  {isRtl ? (
                    <ArrowDownLeft className="w-4 h-4 text-[#E4C796]" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-[#E4C796]" />
                  )}
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#191512] border border-[#DDD0BC] hover:border-[#C59B5F] text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#4D5B47]" />
                  <span>{t.hero.ctaSecondary}</span>
                </a>
              </div>

              {/* Luxury Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E6DCCB] max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#191512]">
                    {t.hero.stat1Num}
                  </div>
                  <div className="text-xs text-[#7D7168] mt-0.5">{t.hero.stat1Label}</div>
                </div>
                <div className="border-x border-[#E6DCCB] px-2">
                  <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#191512]">
                    {t.hero.stat2Num}
                  </div>
                  <div className="text-xs text-[#7D7168] mt-0.5">{t.hero.stat2Label}</div>
                </div>
                <div>
                  <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#191512]">
                    {t.hero.stat3Num}
                  </div>
                  <div className="text-xs text-[#7D7168] mt-0.5">{t.hero.stat3Label}</div>
                </div>
              </div>
            </div>

            {/* Iconic Arched Living Showcase + Small Thumbnails Underneath */}
            <div
              className="lg:col-span-6 space-y-4"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {activeProduct && (
                <>
                  {/* Outer Architectural Gold Arch Offset */}
                  <div className="relative p-1.5 sm:p-2.5 rounded-t-[8.5rem] sm:rounded-t-[13rem] rounded-b-[1.75rem] sm:rounded-b-[2.25rem] border border-[#C59B5F]/45 bg-gradient-to-b from-white/70 to-transparent shadow-[0_25px_60px_-20px_rgba(25,21,18,0.18)]">
                    {/* Large Auto-Rotating Arched Image */}
                    <div
                      onClick={() => onQuickView(activeProduct)}
                      className="relative rounded-t-[8rem] sm:rounded-t-[12.25rem] rounded-b-[1.45rem] sm:rounded-b-[1.85rem] overflow-hidden aspect-[4/4.3] sm:aspect-[4/3.8] bg-[#EFE7DB] group cursor-pointer"
                    >
                      {slides.map((item, idx) => (
                        <img
                          key={item.id}
                          src={item.image}
                          alt={item.name}
                          loading={idx === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          fetchPriority={idx === 0 ? 'high' : 'low'}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                            idx === activeIndex
                              ? 'opacity-100 animate-ken-burns'
                              : 'opacity-0 pointer-events-none'
                          }`}
                        />
                      ))}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#191512]/70 via-[#191512]/10 to-transparent" />

                      {/* Centered Quick View Pill — hidden until hover */}
                      <div className="absolute top-6 inset-x-0 flex justify-center z-10 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/92 backdrop-blur-md text-[#191512] text-xs font-semibold shadow-md border border-[#E7DDD0]">
                          <Eye className="w-3.5 h-3.5 text-[#C59B5F]" />
                          {t.catalog.quickView}
                        </span>
                      </div>

                      {/* Active Product Frosted Glass Info Card */}
                      <div className="absolute bottom-5 start-4 end-4 bg-white/92 backdrop-blur-md rounded-2xl px-4 py-3.5 shadow-lg border border-white/80 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-wider text-[#B88D50] font-semibold flex items-center gap-1.5">
                            <span>✦</span>
                            <span>
                              {lang === 'ar' ? activeProduct.categoryAr : activeProduct.categoryEn}
                            </span>
                          </p>
                          <p className="text-sm sm:text-base font-bold text-[#191512] truncate mt-0.5">
                            {activeProduct.name}
                          </p>
                        </div>
                        {activeProduct.price > 0 && (
                          <span className="shrink-0 px-4 py-1.5 rounded-full bg-[#191512] text-[#FBF8F3] text-xs font-bold shadow-xs">
                            {activeProduct.price.toLocaleString()} {t.catalog.sar}
                          </span>
                        )}
                      </div>

                      {/* Live Gold Progress Bar */}
                      {!isPaused && (
                        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/25">
                          <div
                            key={activeIndex}
                            className="h-full bg-gradient-to-r from-[#C59B5F] to-[#E4C796] animate-progress"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Small Clickable Product Thumbnails Underneath */}
                  <div className="grid grid-cols-5 gap-2.5 sm:gap-3 px-1">
                    {slides.map((item, idx) => {
                      const isCurrent = idx === activeIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className={`group relative rounded-2xl overflow-hidden aspect-square bg-[#EFE7DB] transition-all duration-300 cursor-pointer border-2 ${
                            isCurrent
                              ? 'border-[#C59B5F] ring-2 ring-[#C59B5F]/30 -translate-y-1 shadow-md'
                              : 'border-white/90 opacity-75 hover:opacity-100 hover:border-[#D9BE91] hover:-translate-y-0.5'
                          }`}
                          aria-label={item.name}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          {isCurrent && (
                            <span className="absolute bottom-1.5 inset-x-3 h-0.5 rounded-full bg-[#E4C796]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Luxury Marquee Ribbon */}
      <div className="bg-[#191512] text-[#E9DFD1] py-3.5 overflow-hidden border-y border-[#C59B5F]/30">
        <div className="animate-marquee flex items-center gap-10">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((text, i) => (
            <div key={i} className="flex items-center gap-10 shrink-0">
              <span className="font-editorial text-sm sm:text-base tracking-wide">{text}</span>
              <span className="text-[#C59B5F] text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
