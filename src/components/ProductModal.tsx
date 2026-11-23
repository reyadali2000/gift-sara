import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Minus, Plus, Sparkles } from 'lucide-react';
import type { Lang, Product } from '../types';
import { STORE_INFO, translations } from '../i18n/translations';

interface ProductModalProps {
  lang: Lang;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, giftMessage: string, ribbonColor: string) => void;
}

const RIBBON_SWATCHES = ['#F5EFE6', '#C59B5F', '#C9968F', '#191512'];

export const ProductModal: React.FC<ProductModalProps> = ({
  lang,
  product,
  onClose,
  onAddToCart,
}) => {
  const t = translations[lang];
  const [quantity, setQuantity] = useState(1);
  const [giftMessage, setGiftMessage] = useState('');
  const [ribbonIdx, setRibbonIdx] = useState(1);

  if (!product) return null;

  const ribbonColor = t.modal.ribbons[ribbonIdx] || t.modal.ribbons[0];
  const swatchHex = RIBBON_SWATCHES[ribbonIdx] || '#C59B5F';
  const categoryLabel = lang === 'ar' ? product.categoryAr : product.categoryEn;
  const hasDiscount = product.isOnSale && product.regularPrice > product.price;
  const description = product.description || t.modal.defaultDesc;

  const handleAdd = () => {
    onAddToCart(product, quantity, giftMessage.trim(), ribbonColor);
    onClose();
  };

  const whatsappDirectUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
    lang === 'ar'
      ? `مرحباً هدايا سارة، أرغب بطلب:\n• ${product.name} (${product.price} ر.س)\n• الكمية: ${quantity}\n• التغليف: ${ribbonColor}${
          giftMessage.trim() ? `\n• رسالة الإهداء: ${giftMessage.trim()}` : ''
        }`
      : `Hello Gift Sarah, I would like to order:\n• ${product.name} (${product.price} SAR)\n• Quantity: ${quantity}\n• Wrapping: ${ribbonColor}${
          giftMessage.trim() ? `\n• Gift Card: ${giftMessage.trim()}` : ''
        }`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#191512]/65 backdrop-blur-sm animate-fade-up"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FBF8F3] rounded-t-[2rem] sm:rounded-[2.25rem] overflow-y-auto md:overflow-hidden shadow-2xl border border-[#DFD3C1] grid md:grid-cols-2 max-h-[92dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 end-3.5 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#191512] flex items-center justify-center shadow-md cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="bg-[#F2EAE0] relative aspect-[4/3] sm:aspect-[4/4] md:aspect-auto md:h-full md:max-h-[92dvh] overflow-hidden shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {hasDiscount && (
            <span className="absolute top-4 start-4 px-3 py-1 rounded-full bg-[#9E4747] text-white text-xs font-semibold">
              {t.catalog.saleBadge}
            </span>
          )}
        </div>

        {/* Details & Live Gift Card Personalization */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B88D50] tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              {categoryLabel}
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#191512] mt-1.5 leading-snug">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mt-2.5">
              {product.price > 0 ? (
                <>
                  <span className="text-2xl font-bold text-[#191512]">
                    {product.price.toLocaleString()} {t.catalog.sar}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-[#9B9087] line-through">
                      {product.regularPrice.toLocaleString()} {t.catalog.sar}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-base font-semibold text-[#8C7352]">
                  {t.catalog.customBadge}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-[#5C5149] leading-relaxed border-y border-[#E7DDD0] py-3.5">
            {description}
          </p>

          {/* Ribbon Swatch Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#191512] mb-2">
              {t.modal.ribbonLabel}
            </label>
            <div className="flex flex-wrap gap-2">
              {t.modal.ribbons.map((r, idx) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRibbonIdx(idx)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
                    ribbonIdx === idx
                      ? 'bg-[#191512] text-white border-[#191512] shadow-xs'
                      : 'bg-white text-[#4A413B] border-[#DFD5C7] hover:border-[#C59B5F]'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/15 shrink-0"
                    style={{ backgroundColor: RIBBON_SWATCHES[idx] }}
                  />
                  <span>{r}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gift Message + Live Embossed Card Preview */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-[#191512]">
              {t.modal.giftNoteLabel}
            </label>
            <textarea
              rows={2}
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder={t.modal.giftNotePlaceholder}
              className="w-full rounded-2xl bg-white border border-[#DFD5C7] focus:border-[#C59B5F] focus:outline-none px-4 py-2.5 text-sm text-[#191512] placeholder:text-[#9B9087]"
            />

            {/* Live Luxury Embossed Gift Card Preview */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#F4ECE0] border border-[#E2D3BC] p-4 shadow-inner overflow-hidden">
              <div
                className="absolute top-0 inset-x-0 h-1.5 transition-colors duration-300"
                style={{ backgroundColor: swatchHex }}
              />
              <div className="flex flex-col items-center text-center pt-1">
                <img
                  src={STORE_INFO.logo}
                  alt="Gift Sarah"
                  className="h-8 w-auto object-contain opacity-90 mb-2"
                />
                <p className="font-editorial text-sm sm:text-base italic text-[#3A312B] leading-relaxed min-h-[2.25rem] flex items-center justify-center px-2">
                  {giftMessage.trim()
                    ? `“ ${giftMessage.trim()} ”`
                    : lang === 'ar'
                    ? '« ستظهر عبارتك هنا على بطاقة هدايا سارة الفاخرة »'
                    : '“ Your heartfelt message will appear on our embossed card ”'}
                </p>
                <span className="mt-1.5 text-[10px] tracking-widest uppercase text-[#B88D50]">
                  ✦ {ribbonColor} ✦
                </span>
              </div>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#191512]">{t.modal.quantity}</span>
              <div className="inline-flex items-center gap-3 bg-white border border-[#DFD5C7] rounded-full px-3 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-[#4A413B] hover:text-[#191512] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-bold min-w-5 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-[#4A413B] hover:text-[#191512] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="w-full py-3.5 rounded-full bg-[#191512] hover:bg-[#2F2722] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#E4C796]" />
              <span>{t.modal.addToCart}</span>
            </button>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-full bg-white hover:bg-[#F3EDE3] text-[#191512] border border-[#D8CCBC] text-sm font-semibold flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4 text-[#4D5B47]" />
              <span>{t.modal.orderWhatsapp}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
