import React from 'react';
import { Sparkles, HeartHandshake, PartyPopper, Crown, Gem } from 'lucide-react';
import type { Lang } from '../types';

export type BudgetTier = 'ALL' | 'UNDER_300' | 'MID_300_800' | 'LUX_800_PLUS';

interface GiftConciergeProps {
  lang: Lang;
  selectedCategory: string;
  budgetTier: BudgetTier;
  onSelectOccasion: (catAr: string) => void;
  onSelectBudget: (tier: BudgetTier) => void;
}

export const GiftConcierge: React.FC<GiftConciergeProps> = ({
  lang,
  selectedCategory,
  budgetTier,
  onSelectOccasion,
  onSelectBudget,
}) => {
  const occasions = [
    {
      catAr: 'الورد الطبيعي',
      labelAr: 'إهداء ومشاعر يومية',
      labelEn: 'Everyday Romance & Roses',
      subAr: 'باقات الورد الطبيعي',
      subEn: 'Fresh Natural Blooms',
      icon: Sparkles,
    },
    {
      catAr: 'مسكات عرايس',
      labelAr: 'ليلة العمر والعروس',
      labelEn: 'Bridal & Wedding',
      subAr: 'مسكات عرايس فاخرة',
      subEn: 'Bespoke Bridal Bouquets',
      icon: Crown,
    },
    {
      catAr: 'استاندات استقبال (مداخل)',
      labelAr: 'استقبال ومناسبات كبرى',
      labelEn: 'Grand Receptions',
      subAr: 'استاندات ومداخل ملكية',
      subEn: 'Luxury Entrance Stands',
      icon: PartyPopper,
    },
    {
      catAr: 'تقديم المهور',
      labelAr: 'تقديم المهور والدزات',
      labelEn: 'Mahr & Dazza',
      subAr: 'تنسيق مهور وشبكات',
      subEn: 'Ceremonial Gifting',
      icon: Gem,
    },
    {
      catAr: 'الهدايا والورد',
      labelAr: 'هدايا متكاملة بالورد',
      labelEn: 'Complete Gift Sets',
      subAr: 'صناديق وهدايا مختارة',
      subEn: 'Curated Gift Boxes',
      icon: HeartHandshake,
    },
  ];

  const budgets: { id: BudgetTier; labelAr: string; labelEn: string }[] = [
    { id: 'ALL', labelAr: 'كل الميزانيات', labelEn: 'Any Budget' },
    { id: 'UNDER_300', labelAr: 'أقل من 300 ر.س', labelEn: 'Under 300 SAR' },
    { id: 'MID_300_800', labelAr: '300 – 800 ر.س', labelEn: '300 – 800 SAR' },
    { id: 'LUX_800_PLUS', labelAr: 'فاخرة +800 ر.س', labelEn: 'Luxury 800+ SAR' },
  ];

  const handleOccasionClick = (catAr: string) => {
    onSelectOccasion(selectedCategory === catAr ? 'ALL' : catAr);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 lg:py-16 bg-[#FBF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.25rem] bg-white border border-[#E8DEC9] p-6 sm:p-9 lg:p-11 shadow-[0_14px_45px_-20px_rgba(25,21,18,0.08)] overflow-hidden">
          {/* Decorative corner gold hairline */}
          <div className="pointer-events-none absolute top-0 end-0 w-48 h-48 bg-gradient-to-bl from-[#E4C796]/20 to-transparent rounded-bl-full" />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 relative">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B88D50]">
                <span>✦</span>
                <span>{lang === 'ar' ? 'كونسيرج الإهداء الذكي' : 'Bespoke Gift Concierge'}</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#191512] mt-1.5">
                {lang === 'ar'
                  ? 'اختاري هديتك المثالية حسب المناسبة والميزانية'
                  : 'Find the Perfect Creation by Occasion & Budget'}
              </h2>
            </div>

            {/* Budget Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {budgets.map((b) => {
                const active = budgetTier === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      onSelectBudget(b.id);
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
                      active
                        ? 'bg-[#191512] text-[#FBF8F3] border-[#191512] shadow-xs'
                        : 'bg-[#FBF8F3] text-[#5C5149] border-[#E4D9C8] hover:border-[#C59B5F]'
                    }`}
                  >
                    {lang === 'ar' ? b.labelAr : b.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Occasion Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative">
            {occasions.map((occ) => {
              const Icon = occ.icon;
              const isSelected = selectedCategory === occ.catAr;
              return (
                <button
                  key={occ.catAr}
                  type="button"
                  onClick={() => handleOccasionClick(occ.catAr)}
                  className={`group text-start p-4 sm:p-5 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#191512] text-[#FBF8F3] border-[#191512] shadow-lg -translate-y-0.5'
                      : 'bg-[#FBF8F3]/80 hover:bg-white text-[#191512] border-[#EAE0D2] hover:border-[#C59B5F] hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition ${
                      isSelected
                        ? 'bg-[#C59B5F]/20 text-[#E4C796]'
                        : 'bg-white text-[#B88D50] border border-[#EAE0D2] group-hover:bg-[#191512] group-hover:text-[#E4C796]'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-snug">
                      {lang === 'ar' ? occ.labelAr : occ.labelEn}
                    </h3>
                    <p
                      className={`text-[11px] mt-1 ${
                        isSelected ? 'text-[#D6CBBF]' : 'text-[#7D7168]'
                      }`}
                    >
                      {lang === 'ar' ? occ.subAr : occ.subEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
