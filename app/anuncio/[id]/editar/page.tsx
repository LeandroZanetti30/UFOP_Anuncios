"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { CATEGORIES, CONDITIONS, getProduct, updateProduct } from "@/app/lib/products";
import { useAuth } from "@/app/lib/auth-context";

export default function EditarAnuncio() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    condition: "",
    price: "",
    contact: "",
    city: "",
  });
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    getProduct(id).then((p) => {
      if (!p) { setNotFound(true); return; }
      if (user && p.userId !== user.uid) { router.push(`/anuncio/${id}`); return; }
      setForm({
        category: p.category,
        title: p.title,
        description: p.description,
        condition: p.condition,
        price: String(p.price),
        contact: p.contact,
        city: p.city,
      });
    });
  }, [id, user, loading, router]);

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.category) e.category = "Selecione uma categoria";
    if (!form.title.trim()) e.title = "Informe o título do anúncio";
    if (!form.description.trim()) e.description = "Informe a descrição";
    if (!form.condition) e.condition = "Selecione o estado de conservação";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Informe um preço válido";
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    await updateProduct(id, {
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      condition: form.condition,
      price: Number(form.price),
      contact: form.contact.trim(),
      city: form.city.trim(),
    });
    router.push(`/anuncio/${id}`);
  }

  if (notFound) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-20">
          <p className="text-gray-500">Anúncio não encontrado.</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Editar Anúncio</h1>
            <p className="text-sm text-gray-500 mt-1">Atualize os dados do seu anúncio</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Categoria <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white outline-none focus:ring-2 focus:ring-primary-600 transition ${errors.category ? "border-red-400" : "border-gray-300"}`}
              >
                <option value="">Selecione uma categoria</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary-600 transition ${errors.title ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Descrição <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary-600 transition resize-none ${errors.description ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Estado de conservação <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => set("condition", c)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition ${
                      form.condition === c
                        ? "bg-primary-700 text-white border-primary-700"
                        : "bg-white text-gray-600 border-gray-300 hover:border-primary-600 hover:text-primary-700"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {errors.condition && <p className="text-xs text-red-500 mt-2">{errors.condition}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Preço (R$) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary-600 transition ${errors.price ? "border-red-400" : "border-gray-300"}`}
                />
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contato</label>
                <input
                  type="text"
                  value={form.contact}
                  onChange={(e) => set("contact", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary-600 transition"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Cidade</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary-600 transition"
              />
            </div>

            <div className="flex items-center justify-end gap-3 mt-1">
              <Link
                href={`/anuncio/${id}`}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-primary-700 hover:bg-primary-800 rounded-lg transition-colors disabled:opacity-60"
              >
                {submitting ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
