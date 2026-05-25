import Link from "next/link";

export default function SiteHeader() {
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

        <Link
          href="/anunciar"
          className="shrink-0 bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Cadastrar Produto
        </Link>
      </div>
    </header>
  );
}
