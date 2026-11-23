import React from 'react';
import type { Category, Lang } from '../types';
import { translations } from '../i18n/translations';

interface CategoryShowcaseProps {
  lang: Lang;
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (catAr: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  lang,
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const t = translations[lang];

  const handleSelect = (catAr: string) => {
    onSelectCategory(catAr);
    if (catAr !== 'خدمة حسب الطلب') {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-14 lg:py-20 bg-[#FBF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#B88D50]">
            <span>✦</span>
            <span>{t.categories.eyebrow}</span>
            <span>✦</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191512] mt-2">
            {t.categories.title}
          </h2>
          <p className="text-sm sm:text-base text-[#6A5F57] mt-2.5">
            {t.categories.subtitle}
          </p>
        </div>

        {/* Arched Boutique Alcoves Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((cat, idx) => {
            const isActive = selectedCategory === cat.nameAr;
            const title = lang === 'ar' ? cat.nameAr : cat.nameEn;
            const indexLabel = String(idx + 1).padStart(2, '0');

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelect(cat.nameAr)}
                className={`group relative p-1.5 rounded-t-[8rem] rounded-b-[1.75rem] transition-all duration-500 cursor-pointer border ${
                  isActive
                    ? 'border-[#C59B5F] bg-white shadow-xl -translate-y-1.5'
                    : 'border-[#E6DCCB] hover:border-[#C59B5F]/80 bg-white/70 hover:bg-white shadow-sm hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                <div className="rounded-t-[7.5rem] rounded-b-[1.45rem] aspect-[3/3.6] overflow-hidden bg-[#F2EAE0] relative">
                  <img
                    src={cat.cover}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191512]/80 via-[#191512]/20 to-transparent" />

                  {/* Index Badge */}
                  <div className="absolute top-4 inset-x-0 flex justify-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-semibold tracking-widest text-white">
                      {indexLabel}
                    </span>
                  </div>

                  {/* Category Title & Count */}
                  <div className="absolute bottom-4 inset-x-3 text-center text-white">
                    <h3 className="font-editorial text-lg sm:text-xl font-bold leading-snug drop-shadow-xs">
                      {title}
                    </h3>
                    <p className="text-[11px] text-[#E4C796] mt-1 font-medium">
                      {cat.count > 0
                        ? `${cat.count} ${t.categories.itemsCount}`
                        : lang === 'ar'
                        ? 'تفصيل حسب الطلب'
                        : 'Bespoke Service'}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
