import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <div className="bg-primary-50 border-t border-primary-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-primary-700"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Dicas de segurança
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Nunca efetue pagamentos antecipados ou transfira dinheiro sem ver
              o item pessoalmente.{" "}
              <Link
                href="/dicas"
                className="text-primary-700 hover:underline"
              >
                Ver todas as dicas
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-gray-400 text-center py-4 text-xs">
        © 2024 UFOP Anúncios. Todos os direitos reservados.
      </div>
    </footer>
  );
}
