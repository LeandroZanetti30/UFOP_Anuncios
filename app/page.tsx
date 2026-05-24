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

const listings = [
  {
    id: 1,
    name: "Notebook Dell Inspiron",
    category: "Eletrônicos",
    price: "R$ 2.000",
    location: "Mariana, MG",
    bg: "from-slate-200 to-slate-300",
  },
  {
    id: 2,
    name: "Micro-ondas Electrolux",
    category: "Eletrodomésticos",
    price: "R$ 200",
    location: "Ouro Preto, MG",
    bg: "from-stone-200 to-stone-300",
  },
  {
    id: 3,
    name: "Fone JBL Tune 510BT",
    category: "Eletrônicos",
    price: "R$ 200",
    location: "Mariana, MG",
    bg: "from-zinc-700 to-zinc-900",
  },
  {
    id: 4,
    name: "Mesa de estudo",
    category: "Estudo",
    price: "R$ 150",
    location: "São Paulo, MG",
    bg: "from-amber-100 to-amber-200",
  },
  {
    id: 5,
    name: "Liquidificador Mondial",
    category: "Eletrodomésticos",
    price: "R$ 129",
    location: "Mariana, MG",
    bg: "from-gray-100 to-gray-200",
  },
  {
    id: 6,
    name: 'Monitor LG 24"',
    category: "Eletrônicos",
    price: "R$ 400",
    location: "Mariana, MG",
    bg: "from-slate-700 to-slate-900",
  },
  {
    id: 7,
    name: "Cadeira de escritório",
    category: "Móveis",
    price: "R$ 200",
    location: "Mariana, MG",
    bg: "from-gray-200 to-gray-400",
  },
  {
    id: 8,
    name: "Calculadora Científica Casio",
    category: "Estudo",
    price: "R$ 80",
    location: "Mariana, MG",
    bg: "from-slate-300 to-slate-400",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Navbar ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-primary-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3" />
                <rect x="4" y="10" width="4" height="11" />
                <rect x="10" y="10" width="4" height="11" />
                <rect x="16" y="10" width="4" height="11" />
              </svg>
            </span>
            <span className="font-bold text-gray-900 text-lg leading-tight">
              UFOP <span className="text-primary-700">Anúncios</span>
            </span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="/" className="hover:text-primary-700 font-medium text-gray-900">
              Início
            </a>
            <a href="/categorias" className="hover:text-primary-700">
              Categorias
            </a>
            <a href="/sobre" className="hover:text-primary-700">
              Sobre
            </a>
            <a href="/dicas" className="hover:text-primary-700">
              Dicas de Segurança
            </a>
          </nav>

          {/* CTA */}
          <a
            href="/entrar"
            className="shrink-0 bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Entrar / Anunciar
          </a>
        </div>
      </header>

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
          {/* dark overlay */}
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

            {/* Search bar */}
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

        {/* ── Recent Listings ── */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5">
              Anúncios recentes
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {listings.map((item) => (
                <a
                  key={item.id}
                  href={`/anuncio/${item.id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  {/* Image placeholder */}
                  <div className="relative">
                    <div
                      className={`aspect-[4/3] bg-gradient-to-br ${item.bg} flex items-center justify-center`}
                    />
                    {/* Heart button */}
                    <button
                      type="button"
                      aria-label="Favoritar"
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-colors"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-4 h-4 text-gray-500"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </button>
                  </div>

                  {/* Card body */}
                  <div className="p-3">
                    <p className="text-xs font-medium text-primary-700 truncate">
                      {item.category}
                    </p>
                    <h3 className="text-sm font-medium text-gray-900 mt-0.5 truncate group-hover:text-primary-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {item.price}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
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
                      {item.location}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer>
        {/* Safety tip bar */}
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
                Nunca efetue pagamentos antecipados ou transfira dinheiro sem
                ver o item pessoalmente.{" "}
                <a href="/dicas" className="text-primary-700 hover:underline">
                  Ver todas as dicas
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-gray-900 text-gray-400 text-center py-4 text-xs">
          © 2024 UFOP Anúncios. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}
