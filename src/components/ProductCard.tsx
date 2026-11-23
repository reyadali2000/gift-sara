import React from 'react';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import type { Lang, Product } from '../types';
import { translations } from '../i18n/translations';

interface ProductCardProps {
  lang: Lang;
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  lang,
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const t = translations[lang];
  const categoryLabel = lang === 'ar' ? product.categoryAr : product.categoryEn;
  const hasDiscount = product.isOnSale && product.regularPrice > product.price;

  return (
    <article className="group flex flex-col bg-white rounded-3xl border border-[#EAE2D6] hover:border-[#C9A96E]/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5EFE6]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onClick={() => onQuickView(product)}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700 cursor-pointer"
        />

        {/* Top Badges */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5 pointer-events-none">
          {hasDiscount && (
            <span className="px-2.5 py-1 rounded-full bg-[#9E4747] text-white text-[11px] font-semibold shadow-xs">
              {t.catalog.saleBadge}
            </span>
          )}
          {product.type === 'service' && (
            <span className="px-2.5 py-1 rounded-full bg-[#1E1916]/85 text-[#F5EFE6] text-[11px] font-medium backdrop-blur-xs">
              {t.catalog.customBadge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-3 end-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition cursor-pointer shadow-xs ${
            isWishlisted
              ? 'bg-[#C89B96] text-white'
              : 'bg-white/85 hover:bg-white text-[#1E1916]'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Actions (Desktop) */}
        <div className="hidden sm:flex absolute inset-x-3 bottom-3 items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="flex-1 py-2.5 px-3 rounded-full bg-white/95 hover:bg-white text-[#1E1916] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md backdrop-blur-xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#B8925A]" />
            <span>{t.catalog.quickView}</span>
          </button>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="py-2.5 px-3.5 rounded-full bg-[#1E1916] hover:bg-[#332B27] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            aria-label={t.catalog.addToBag}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4B788]" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between gap-2.5 sm:gap-3">
        <div>
          <span className="text-[10px] sm:text-[11px] font-medium text-[#8C7352] tracking-wide line-clamp-1">
            {categoryLabel}
          </span>
          <h3
            onClick={() => onQuickView(product)}
            className="mt-1 text-xs sm:text-base font-bold text-[#1E1916] line-clamp-2 leading-snug hover:text-[#8C7352] transition cursor-pointer"
          >
            {product.name}
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#F3EDE3]">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            {product.price > 0 ? (
              <>
                <span className="text-sm sm:text-lg font-bold text-[#1E1916]">
                  {product.price.toLocaleString()} {t.catalog.sar}
                </span>
                {hasDiscount && (
                  <span className="text-[11px] sm:text-xs text-[#9B9087] line-through">
                    {product.regularPrice.toLocaleString()}
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs sm:text-sm font-semibold text-[#8C7352]">
                {t.catalog.customBadge}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="w-full sm:w-auto px-3 py-1.5 rounded-full bg-[#F5EFE6] hover:bg-[#1E1916] text-[#1E1916] hover:text-white text-[11px] sm:text-xs font-semibold transition cursor-pointer text-center"
          >
            {t.catalog.addToBag}
          </button>
        </div>
      </div>
    </article>
  );
};
