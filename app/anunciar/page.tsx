"use client";

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { CATEGORIES, CONDITIONS, saveProduct } from "@/app/lib/products";
import { useAuth } from "@/app/lib/auth-context";

export default function NovoAnuncio() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    condition: "",
    price: "",
    contact: "",
    city: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

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

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    const product = await saveProduct({
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      condition: form.condition,
      price: Number(form.price),
      contact: form.contact.trim(),
      city: form.city.trim(),
      images,
      userId: user!.uid,
      userEmail: user!.email ?? "",
    });
    router.push(`/anuncio/${product.id}`);
  }

  return (
    <>
      <SiteHeader />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Page heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Novo Anúncio</h1>
            <p className="text-sm text-gray-500 mt-1">
              Preencha os dados abaixo para publicar seu item
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form fields */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {/* Categoria */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Categoria <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white outline-none focus:ring-2 focus:ring-primary-600 transition ${
                      errors.category ? "border-red-400" : "border-gray-300"
                    }`}
                  >
                    <option value="">Selecione uma categoria</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-xs text-red-500 mt-1">{errors.category}</p>
                  )}
                </div>

                {/* Título */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Título do anúncio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="Ex. Notebook Dell Inspiron i5"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary-600 transition ${
                      errors.title ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Descrição */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Descrição <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Descreva o item com detalhes: marca, modelo, estado, motivo da venda..."
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary-600 transition resize-none ${
                      errors.description ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Estado de conservação */}
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
                  {errors.condition && (
                    <p className="text-xs text-red-500 mt-2">{errors.condition}</p>
                  )}
                </div>

                {/* Preço + Contato */}
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
                      placeholder="Ex. 200"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary-600 transition ${
                        errors.price ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.price && (
                      <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                    )}
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Contato (WhatsApp)
                    </label>
                    <input
                      type="text"
                      value={form.contact}
                      onChange={(e) => set("contact", e.target.value)}
                      placeholder="(11) 99999-9999 ou @instagram"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary-600 transition"
                    />
                  </div>
                </div>

                {/* Cidade */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="Ex. Ouro Preto, MG"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary-600 transition"
                  />
                </div>
              </div>

              {/* Image upload */}
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Fotos do item
                  </p>

                  {/* Upload zone */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-300 hover:border-primary-500 rounded-xl p-6 flex flex-col items-center gap-2 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center text-primary-700 transition-colors">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      Clique para adicionar fotos
                    </p>
                    <p className="text-xs text-gray-400 text-center">
                      Arraste e solte ou clique para selecionar.
                      <br />
                      Tamanho máximo: 5MB (PNG, JPG)
                    </p>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    multiple
                    className="hidden"
                    onChange={handleFiles}
                  />

                  {/* Image previews */}
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {images.map((src, i) => (
                        <div
                          key={i}
                          className="relative rounded-lg overflow-hidden aspect-square"
                        >
                          <img
                            src={src}
                            alt={`Foto ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center text-xs transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tips card */}
                <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 text-xs text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-700">Dicas para um bom anúncio</p>
                  <p>• Use fotos com boa iluminação</p>
                  <p>• Descreva defeitos com honestidade</p>
                  <p>• Informe o preço real, sem taxas ocultas</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <Link
                href="/"
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-primary-700 hover:bg-primary-800 rounded-lg transition-colors disabled:opacity-60"
              >
                {submitting ? "Publicando..." : "Publicar anúncio"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
