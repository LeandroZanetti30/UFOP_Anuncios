"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { Product, getProduct } from "@/app/lib/products";

function formatPrice(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`;
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500 w-36 shrink-0">{label}</span>
      <span className="text-xs font-medium text-gray-800">{value}</span>
    </div>
  );
}

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setProduct(getProduct(id) ?? null);
  }, [id]);

  if (product === undefined) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-20 text-gray-400 text-sm">
          Carregando...
        </main>
        <SiteFooter />
      </>
    );
  }

  if (product === null) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-gray-500 text-lg font-medium">Anúncio não encontrado</p>
          <Link href="/" className="text-sm text-primary-700 hover:underline">
            Voltar para o início
          </Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  const hasImages = product.images.length > 0;

  return (
    <>
      <SiteHeader />

      <main className="flex-1 bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-500 mb-5 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-primary-700">Início</Link>
            <span>/</span>
            <Link href={`/categorias/${product.category.toLowerCase()}`} className="hover:text-primary-700">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left column */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Main image */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {hasImages ? (
                  <img
                    src={product.images[activeImg]}
                    alt={product.title}
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-20 h-20 text-primary-200">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}

                {/* Thumbnails */}
                {hasImages && product.images.length > 1 && (
                  <div className="flex gap-2 p-3">
                    {product.images.map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImg(i)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                          activeImg === i ? "border-primary-600" : "border-transparent"
                        }`}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-3">Descrição</h2>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Contact */}
              {product.contact && (
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">
                    Contato com o anunciante
                  </h2>
                  <p className="text-xs text-gray-500 mb-3">
                    Entre em contato diretamente com o anunciante sobre este anúncio.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2.5">
                      <PhoneIcon />
                      <div>
                        <p className="text-xs text-gray-400">Telefone / WhatsApp</p>
                        <p className="text-sm font-medium text-gray-800">{product.contact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-xl shadow-sm p-5">
                <span className="inline-block text-xs font-medium text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full mb-3">
                  {product.category}
                </span>

                <h1 className="text-xl font-bold text-gray-900 leading-tight mb-3">
                  {product.title}
                </h1>

                <p className="text-3xl font-bold text-gray-900 mb-3">
                  {formatPrice(product.price)}
                </p>

                {product.city && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-5">
                    <PinIcon />
                    {product.city}
                  </div>
                )}

                {product.contact && (
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Olá! Vi seu anúncio "${product.title}" no UFOP Anúncios e tenho interesse.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold py-3 rounded-lg transition-colors text-sm mb-4"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.117 1.529 5.843L.057 23.492l5.776-1.516A11.951 11.951 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.663-.523-5.175-1.433l-.371-.221-3.831 1.005 1.022-3.724-.241-.383A9.959 9.959 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                    Entrar em contato
                  </a>
                )}

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Detalhes</p>
                  <SpecRow label="Categoria" value={product.category} />
                  <SpecRow label="Estado de conservação" value={product.condition} />
                  {product.city && <SpecRow label="Cidade" value={product.city} />}
                  <SpecRow
                    label="Publicado em"
                    value={new Date(product.createdAt).toLocaleDateString("pt-BR")}
                  />
                </div>
              </div>

              <Link
                href="/"
                className="text-center text-sm text-primary-700 hover:underline py-1"
              >
                ← Voltar para os anúncios
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
