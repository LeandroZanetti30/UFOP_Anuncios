export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  condition: string;
  price: number;
  contact: string;
  city: string;
  images: string[]; // base64 data URLs
  createdAt: string;
}

export const CATEGORIES = [
  "Eletrônicos",
  "Móveis",
  "Eletrodomésticos",
  "Estudo",
  "Esportes",
  "Outros",
];

export const CONDITIONS = ["Novo", "Seminovo", "Ótimo", "Bom", "Regular", "Para peças"];

const STORAGE_KEY = "ufop_products";

export function getAllUserProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getProduct(id: string): Product | null {
  return getAllUserProducts().find((p) => p.id === id) ?? null;
}

export function saveProduct(
  data: Omit<Product, "id" | "createdAt">
): Product {
  const product: Product = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  const existing = getAllUserProducts();
  existing.unshift(product);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  return product;
}
