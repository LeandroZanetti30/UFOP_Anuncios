import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";

export default function Sobre() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Sobre o UFOP Anúncios</h1>
            <p className="text-gray-500 mt-2 text-sm">Conectando a comunidade universitária da UFOP</p>
          </div>

          <div className="flex flex-col gap-6">

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">O que é?</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                O UFOP Anúncios é uma plataforma de compra e venda de itens usados exclusiva para
                a comunidade da Universidade Federal de Ouro Preto. Aqui, estudantes, professores
                e servidores podem anunciar e encontrar produtos de forma simples, rápida e sem taxas.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Para quem é?</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                A plataforma é exclusiva para membros da comunidade UFOP. Para criar uma conta e
                publicar anúncios, é necessário ter um <span className="font-medium text-primary-700">email institucional</span> com
                os domínios <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">@aluno.ufop.edu.br</span> ou{" "}
                <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">@ufop.edu.br</span>.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Como funciona?</h2>
              <div className="flex flex-col gap-4">
                {[
                  { n: "1", titulo: "Crie sua conta", desc: "Cadastre-se com seu email institucional da UFOP." },
                  { n: "2", titulo: "Publique seu anúncio", desc: "Adicione fotos, descrição, preço e informações de contato." },
                  { n: "3", titulo: "Negocie diretamente", desc: "Compradores entram em contato com você pelo WhatsApp ou pelo contato informado." },
                  { n: "4", titulo: "Conclua a venda", desc: "Combine o local de entrega e finalize a negociação pessoalmente, com segurança." },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-700 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {step.n}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{step.titulo}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Categorias disponíveis</h2>
              <div className="flex flex-wrap gap-2">
                {["Eletrônicos", "Móveis", "Eletrodomésticos", "Estudo", "Esportes", "Outros"].map((cat) => (
                  <Link
                    key={cat}
                    href={`/categorias/${cat.toLowerCase()}`}
                    className="px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium hover:bg-primary-100 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Dicas de segurança</h2>
              <ul className="flex flex-col gap-2 text-sm text-gray-600">
                {[
                  "Nunca efetue pagamentos antecipados ou transfira dinheiro sem ver o item pessoalmente.",
                  "Prefira realizar as trocas em locais públicos e movimentados dentro do campus.",
                  "Desconfie de preços muito abaixo do mercado.",
                  "Verifique o estado do produto antes de fechar negócio.",
                  "Em caso de golpe ou situação suspeita, comunique às autoridades.",
                ].map((dica, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary-700 font-bold mt-0.5">•</span>
                    {dica}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
              <p className="text-sm text-gray-500 mb-4">Pronto para começar?</p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/cadastro"
                  className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Criar conta
                </Link>
                <Link
                  href="/"
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Ver anúncios
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
