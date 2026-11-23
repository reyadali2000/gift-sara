import React from 'react';
import { Check, MessageCircle, Flower2, Gift, Truck, Sparkles, MapPin, Navigation } from 'lucide-react';
import type { Lang, Product } from '../types';
import { STORE_INFO, translations } from '../i18n/translations';

interface BespokeSectionProps {
  lang: Lang;
  services: Product[];
}

export const BespokeSection: React.FC<BespokeSectionProps> = ({ lang, services }) => {
  const t = translations[lang];

  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً هدايا سارة، أرغب بالاستفسار عن تصميم مداخل / استاندات / تقديم مهور حسب الطلب.'
      : 'Hello Gift Sarah, I would like to consult on a bespoke reception stand / Mahr presentation.'
  )}`;

  const pillarIcons = [Flower2, Gift, Truck, Sparkles];

  return (
    <>
      {/* Bespoke Atelier Banner */}
      <section id="bespoke" className="py-16 lg:py-24 bg-[#F2EAE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#191512] text-[#FBF8F3] rounded-[2.75rem] overflow-hidden shadow-2xl border border-[#C59B5F]/30 grid lg:grid-cols-12 items-center">
            <div className="pointer-events-none absolute -top-24 start-0 w-96 h-96 rounded-full bg-[#C59B5F]/10 blur-3xl" />

            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 relative">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#E4C796]">
                <span>✦</span>
                <span>{t.bespoke.eyebrow}</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {t.bespoke.title}
              </h2>
              <p className="text-sm sm:text-base text-[#D7CEC4] leading-relaxed max-w-xl">
                {t.bespoke.subtitle}
              </p>

              <ul className="grid sm:grid-cols-2 gap-3.5 pt-2">
                {t.bespoke.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-[#F5EFE6]">
                    <span className="w-5 h-5 rounded-full bg-[#C59B5F]/20 text-[#E4C796] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#C59B5F] to-[#DFBE89] hover:brightness-105 text-[#191512] text-sm font-bold transition shadow-lg"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                  <span>{t.bespoke.cta}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 lg:p-10 flex items-center justify-center">
              <div className="w-full max-w-sm p-2 rounded-t-[11rem] rounded-b-[2rem] border border-[#C59B5F]/45">
                <div className="rounded-t-[10.5rem] rounded-b-[1.65rem] overflow-hidden aspect-[4/4.6] relative">
                  <img
                    src="/images/banners/banner-6.webp"
                    alt="Bespoke Gift Sarah Reception Stand"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191512]/50 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated Custom-Order Services Cards */}
          {services.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5 mt-8">
              {services.map((srv) => {
                const srvWa = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
                  lang === 'ar'
                    ? `مرحباً هدايا سارة، أرغب بالاستفسار عن خدمة: ${srv.name}`
                    : `Hello Gift Sarah, I would like to inquire about the bespoke service: ${srv.name}`
                )}`;
                return (
                  <div
                    key={srv.id}
                    className="bg-white rounded-3xl border border-[#E5D9C7] p-6 sm:p-7 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="space-y-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191512] text-[#E4C796] text-[11px] font-semibold">
                        <Sparkles className="w-3 h-3" />
                        {lang === 'ar' ? 'خدمة حسب الطلب' : 'Bespoke Service'}
                      </span>
                      <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#191512]">
                        {srv.name}
                      </h3>
                      {srv.description && (
                        <p className="text-sm text-[#6A5F57] leading-relaxed line-clamp-3">
                          {srv.description}
                        </p>
                      )}
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-[#F2EAE0]">
                      <span className="text-xs font-medium text-[#8C7352]">
                        {lang === 'ar'
                          ? 'تُحدد التكلفة حسب المقاس والتصميم'
                          : 'Priced according to dimensions & design'}
                      </span>
                      <a
                        href={srvWa}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#191512] hover:bg-[#2F2722] text-[#FBF8F3] text-xs font-semibold transition"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#E4C796]" />
                        <span>{lang === 'ar' ? 'اطلب عبر واتساب' : 'Inquire on WhatsApp'}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Brand Pillars — Atelier Craftsmanship */}
      <section id="pillars" className="py-16 lg:py-20 bg-[#FBF8F3] border-b border-[#E7DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.pillars.map((pillar, idx) => {
              const Icon = pillarIcons[idx % pillarIcons.length];
              return (
                <div
                  key={pillar.title}
                  className="group relative p-7 rounded-[2rem] bg-white border border-[#EAE0D2] hover:border-[#C59B5F]/70 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="absolute top-5 end-6 font-editorial text-2xl font-bold text-[#EAE0D2] group-hover:text-[#E4C796] transition">
                    0{idx + 1}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#FBF8F3] border border-[#EAE0D2] text-[#C59B5F] group-hover:bg-[#191512] group-hover:text-[#E4C796] flex items-center justify-center mb-5 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-[#191512]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#6A5F57] mt-2 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Riyadh Branches Section */}
      <section id="branches" className="py-16 lg:py-20 bg-[#F4ECE1]/60 border-b border-[#E7DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#B88D50]">
              <span>✦</span>
              <span>{lang === 'ar' ? 'زورونا في الرياض' : 'Visit Our Boutiques'}</span>
              <span>✦</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#191512] mt-2">
              {lang === 'ar' ? 'فروع هدايا سارة' : 'Gift Sarah Branches'}
            </h2>
            <p className="text-sm sm:text-base text-[#6A5F57] mt-2">
              {lang === 'ar'
                ? 'نسعد باستقبالكم في فروعنا بالرياض لاختيار وتنسيق هداياكم وورودكم بكل حب'
                : 'We welcome you at our Riyadh boutiques to curate your flowers and bespoke gifts in person'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {STORE_INFO.branches.map((branch, idx) => (
              <div
                key={branch.id}
                className="group bg-white rounded-[2rem] border border-[#E6DCCB] hover:border-[#C59B5F] p-7 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#191512] text-[#E4C796] flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B88D50]">
                      {lang === 'ar' ? `الفرع 0${idx + 1}` : `Branch 0${idx + 1}`}
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-[#191512]">
                      {lang === 'ar' ? branch.nameAr : branch.nameEn}
                    </h3>
                    <p className="text-sm text-[#5C5149] leading-relaxed">
                      {lang === 'ar' ? branch.addressAr : branch.addressEn}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#F2EAE0]">
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#191512] hover:bg-[#2F2722] text-[#FBF8F3] text-xs font-semibold transition"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#E4C796]" />
                    <span>{lang === 'ar' ? 'الاتجاه عبر خرائط قوقل' : 'Directions on Google Maps'}</span>
                  </a>
                  <a
                    href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FBF8F3] hover:bg-[#EFE7DB] text-[#191512] border border-[#E2D6C3] text-xs font-semibold transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#4D5B47]" />
                    <span>{lang === 'ar' ? 'تواصل مع الفرع' : 'WhatsApp Branch'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
