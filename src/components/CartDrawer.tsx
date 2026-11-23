import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import type { CartItem, Lang } from '../types';
import { STORE_INFO, translations } from '../i18n/translations';

interface CartDrawerProps {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  lang,
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const t = translations[lang];

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const buildWhatsappCheckout = () => {
    const lines = items.map((it, idx) => {
      const priceText =
        it.product.price > 0
          ? `${(it.product.price * it.quantity).toLocaleString()} ${t.catalog.sar}`
          : t.catalog.customBadge;
      let line = `${idx + 1}. ${it.product.name} × ${it.quantity} — ${priceText}`;
      if (it.ribbonColor) line += `\n   • ${t.cart.ribbonPrefix} ${it.ribbonColor}`;
      if (it.giftMessage) line += `\n   • ${t.cart.giftNotePrefix} "${it.giftMessage}"`;
      return line;
    });

    const header =
      lang === 'ar'
        ? 'مرحباً هدايا سارة، أرغب بتأكيد الطلب التالي:'
        : 'Hello Gift Sarah, I would like to confirm the following order:';
    const totalLine =
      lang === 'ar'
        ? `\nالمجموع الفرعي: ${subtotal.toLocaleString()} ر.س`
        : `\nSubtotal: ${subtotal.toLocaleString()} SAR`;

    return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
      `${header}\n\n${lines.join('\n')}${totalLine}`
    )}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#1E1916]/50 backdrop-blur-xs" onClick={onClose}>
      <aside
        className="w-full max-w-md bg-[#FAF7F2] h-[100dvh] shadow-2xl flex flex-col border-s border-[#E7DFD3]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E7DFD3] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B8925A]" />
            <h2 className="font-editorial text-xl font-bold text-[#1E1916]">
              {t.cart.title} ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F3EDE3] text-[#1E1916] cursor-pointer"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F3EDE3] flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-[#B8925A]" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1E1916]">
                {t.cart.emptyTitle}
              </h3>
              <p className="text-sm text-[#6B615A] mt-1.5 max-w-xs">{t.cart.emptyDesc}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#1E1916] text-white text-xs font-semibold cursor-pointer"
              >
                {t.cart.browseBtn}
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${idx}`}
                className="flex gap-3.5 bg-white p-3.5 rounded-2xl border border-[#EAE2D6] shadow-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-24 rounded-xl object-cover bg-[#F3EDE3] shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-[#1E1916] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(idx)}
                        className="text-[#9B9087] hover:text-[#9E4747] p-0.5 cursor-pointer"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {item.ribbonColor && (
                      <p className="text-[11px] text-[#7A6F67] mt-0.5">
                        {t.cart.ribbonPrefix} {item.ribbonColor}
                      </p>
                    )}
                    {item.giftMessage && (
                      <p className="text-[11px] text-[#8C7352] mt-0.5 line-clamp-1">
                        {t.cart.giftNotePrefix} "{item.giftMessage}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#E7DFD3] rounded-full px-2 py-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(idx, -1)}
                        className="p-0.5 text-[#4A413B] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold min-w-4 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(idx, 1)}
                        className="p-0.5 text-[#4A413B] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#1E1916]">
                      {item.product.price > 0
                        ? `${(item.product.price * item.quantity).toLocaleString()} ${t.catalog.sar}`
                        : t.catalog.customBadge}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-[#E7DFD3] bg-white space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#6B615A]">{t.cart.subtotal}</span>
              <span className="font-editorial text-2xl font-bold text-[#1E1916]">
                {subtotal.toLocaleString()} {t.catalog.sar}
              </span>
            </div>
            <p className="text-[11px] text-[#7A6F67]">{t.cart.deliveryNote}</p>

            <a
              href={buildWhatsappCheckout()}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-full bg-[#1E1916] hover:bg-[#332B27] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageCircle className="w-4 h-4 text-[#D4B788]" />
              <span>{t.cart.checkoutWhatsapp}</span>
            </a>

            <button
              type="button"
              onClick={onClearCart}
              className="w-full py-2 text-xs font-medium text-[#8A7F76] hover:text-[#9E4747] transition cursor-pointer"
            >
              {t.cart.clearCart}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
