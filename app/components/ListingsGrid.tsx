"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product, getAllUserProducts } from "@/app/lib/products";

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-4 h-4 text-gray-500"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-3 h-3 shrink-0"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function ProductCard({ item }: { item: Product }) {
  return (
    <Link
      href={`/anuncio/${item.id}`}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
    >
      <div className="relative">
        {item.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full aspect-[4/3] object-cover"
          />
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-10 h-10 text-primary-200">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        <button
          type="button"
          aria-label="Favoritar"
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-colors"
        >
          <HeartIcon />
        </button>
      </div>
      <div className="p-3">
        <p className="text-xs font-medium text-primary-700 truncate">
          {item.category}
        </p>
        <h3 className="text-sm font-medium text-gray-900 mt-0.5 truncate group-hover:text-primary-700 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm font-bold text-gray-900 mt-1">
          R$ {item.price.toLocaleString("pt-BR")}
        </p>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <PinIcon />
          {item.city || "A combinar"}
        </p>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-primary-300">
          <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
          <path d="M16 3H8L6 7h12l-2-4z" />
        </svg>
      </div>
      <div>
        <p className="text-gray-700 font-medium">Nenhum anúncio ainda</p>
        <p className="text-sm text-gray-400 mt-1">
          Seja o primeiro a publicar um item!
        </p>
      </div>
      <Link
        href="/anunciar"
        className="mt-1 bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
      >
        Cadastrar produto
      </Link>
    </div>
  );
}

export default function ListingsGrid() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    setProducts(getAllUserProducts());
  }, []);

  // null = still loading (avoid flash of empty state on SSR)
  if (products === null) return null;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-base font-semibold text-gray-800 mb-5">
          Anúncios recentes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <EmptyState />
          ) : (
            products.map((item) => <ProductCard key={item.id} item={item} />)
          )}
        </div>
      </div>
    </section>
  );
}
