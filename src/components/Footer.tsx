import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import type { Category, Lang } from '../types';
import { STORE_INFO, translations } from '../i18n/translations';

interface FooterProps {
  lang: Lang;
  categories: Category[];
  onSelectCategory: (catAr: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, categories, onSelectCategory }) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#1E1916] text-[#EDE5DA] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={STORE_INFO.logo}
                alt={t.brandName}
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-[#BFB5A9] leading-relaxed max-w-md">{t.footer.about}</p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={STORE_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 rounded-full bg-white/8 hover:bg-[#B8925A] hover:text-[#1E1916] text-xs font-medium transition"
              >
                Instagram
              </a>
              <a
                href={STORE_INFO.snapchat}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 rounded-full bg-white/8 hover:bg-[#B8925A] hover:text-[#1E1916] text-xs font-medium transition"
              >
                Snapchat
              </a>
              <a
                href={STORE_INFO.tiktok}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 rounded-full bg-white/8 hover:bg-[#B8925A] hover:text-[#1E1916] text-xs font-medium transition"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Categories Quick Links */}
          <div className="md:col-span-4">
            <h4 className="font-editorial text-lg font-bold text-white mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="grid grid-cols-2 gap-2.5 text-sm text-[#BFB5A9]">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#catalog"
                    onClick={() => onSelectCategory(cat.nameAr)}
                    className="hover:text-[#D4B788] transition"
                  >
                    {lang === 'ar' ? cat.nameAr : cat.nameEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-editorial text-lg font-bold text-white mb-4">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-2.5 text-sm text-[#BFB5A9]">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-[#D4B788] transition"
              >
                <Phone className="w-4 h-4 text-[#D4B788] shrink-0" />
                <span dir="ltr">{STORE_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${STORE_INFO.email}`}
                className="flex items-center gap-2.5 hover:text-[#D4B788] transition"
              >
                <Mail className="w-4 h-4 text-[#D4B788] shrink-0" />
                <span>{STORE_INFO.email}</span>
              </a>
              {STORE_INFO.branches.map((branch) => (
                <a
                  key={branch.id}
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2.5 hover:text-[#D4B788] transition"
                >
                  <MapPin className="w-4 h-4 text-[#D4B788] shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    <strong className="text-white font-semibold">
                      {lang === 'ar' ? branch.nameAr : branch.nameEn}:
                    </strong>{' '}
                    {lang === 'ar' ? branch.addressAr : branch.addressEn}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8D8378]">
          <p>{t.footer.rights}</p>
          <p>
            {lang === 'ar'
              ? 'الرياض • ورود فاخرة وهدايا مصمّمة حسب الطلب'
              : 'Riyadh • Luxury Florals & Bespoke Gifting'}
          </p>
        </div>
      </div>
    </footer>
  );
};
