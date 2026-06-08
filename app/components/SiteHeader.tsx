"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function SiteHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-primary-700">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7"
            >
              <path d="M3 21h18M3 10h18M5 6l7-3 7 3" />
              <rect x="4" y="10" width="4" height="11" />
              <rect x="10" y="10" width="4" height="11" />
              <rect x="16" y="10" width="4" height="11" />
            </svg>
          </span>
          <span className="font-bold text-gray-900 text-lg leading-tight">
            UFOP <span className="text-primary-700">Anúncios</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary-700">
            Início
          </Link>
          <Link href="/categorias" className="hover:text-primary-700">
            Categorias
          </Link>
          <Link href="/sobre" className="hover:text-primary-700">
            Sobre
          </Link>
          <Link href="/dicas" className="hover:text-primary-700">
            Dicas de Segurança
          </Link>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-gray-600">
                Olá, <span className="font-medium text-gray-900">{user.displayName ?? user.email}</span>
              </span>
              <Link
                href="/anunciar"
                className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Cadastrar Produto
              </Link>
              <button
                onClick={() => signOut(auth)}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-primary-700 transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
