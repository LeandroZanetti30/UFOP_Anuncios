"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { Product, getAllProducts } from "@/app/lib/products";

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
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full aspect-[4/3] object-cover"
          />
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              className="w-10 h-10 text-primary-200"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
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

export default function BuscarContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const [results, setResults] = useState<Product[] | null>(null);

  useEffect(() => {
    getAllProducts().then((all) => {
      const termo = q.toLowerCase().trim();

      if (!termo) {
        setResults(all);
        return;
      }

      setResults(
        all.filter(
          (p) =>
            p.title.toLowerCase().includes(termo) ||
            p.description.toLowerCase().includes(termo) ||
            p.category.toLowerCase().includes(termo)
        )
      );
    });
  }, [q]);

  return (
    <>
      <SiteHeader />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900">
              {q ? `Resultados para "${q}"` : "Todos os anúncios"}
            </h1>

            {results !== null && (
              <p className="text-sm text-gray-500 mt-1">
                {results.length}{" "}
                {results.length === 1
                  ? "anúncio encontrado"
                  : "anúncios encontrados"}
              </p>
            )}
          </div>

          {results === null ? (
            <p className="text-sm text-gray-400">Buscando...</p>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <p className="text-gray-700 font-medium">
                Nenhum anúncio encontrado
              </p>

              <p className="text-sm text-gray-400">
                Tente pesquisar por outro termo.
              </p>

              <Link
                href="/"
                className="mt-2 text-sm text-primary-700 hover:underline"
              >
                Voltar para o início
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}