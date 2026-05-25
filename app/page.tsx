import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import ListingsGrid from "@/app/components/ListingsGrid";

const categories = [
  {
    name: "Eletrônicos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    name: "Móveis",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3" />
        <path d="M2 11a2 2 0 012 2v2h16v-2a2 2 0 012-2H2z" />
        <path d="M6 15v3M18 15v3" />
      </svg>
    ),
  },
  {
    name: "Eletrodomésticos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <rect x="6" y="10" width="9" height="8" rx="1" />
        <circle cx="17.5" cy="11.5" r="1" />
        <circle cx="17.5" cy="15.5" r="1" />
      </svg>
    ),
  },
  {
    name: "Estudo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    name: "Esportes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 000 20M12 2a14.5 14.5 0 010 20M2 12h20" />
      </svg>
    ),
  },
  {
    name: "Outros",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <circle cx="5" cy="12" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="19" cy="12" r="1.5" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section
          className="relative flex items-center min-h-[420px]"
          style={{
            backgroundImage: "url('/ufop-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
              Conectando a comunidade da{" "}
              <span className="text-primary-200">UFOP</span>
            </h1>
            <p className="text-gray-200 text-base sm:text-lg mb-8 max-w-xl">
              Compre e venda itens usados entre universitários.
              <br className="hidden sm:block" />
              Simples, rápido e sem taxas.
            </p>
            <form
              action="/buscar"
              method="GET"
              className="flex max-w-2xl rounded-xl overflow-hidden shadow-lg"
            >
              <input
                type="text"
                name="q"
                placeholder="Buscar por item (ex. notebook, fogão, livros...)"
                className="flex-1 px-4 py-3 text-sm text-gray-800 bg-white outline-none placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-primary-700 hover:bg-primary-800 text-white font-semibold px-6 py-3 text-sm transition-colors"
              >
                Buscar
              </button>
            </form>
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="bg-white border-b border-gray-100 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5">
              Categorias
            </h2>
            <div className="flex gap-2 sm:gap-6 overflow-x-auto pb-1 justify-between">
              {categories.map((cat) => (
                <a
                  key={cat.name}
                  href={`/categorias/${cat.name.toLowerCase()}`}
                  className="flex flex-col items-center gap-2 min-w-[72px] group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center text-primary-700 transition-colors">
                    {cat.icon}
                  </div>
                  <span className="text-xs text-gray-600 text-center group-hover:text-primary-700 transition-colors leading-tight">
                    {cat.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Listings (client component — reads localStorage) ── */}
        <ListingsGrid />
      </main>

      <SiteFooter />
    </>
  );
}
