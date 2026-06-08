import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  condition: string;
  price: number;
  contact: string;
  city: string;
  images: string[];
  createdAt: string;
  userId: string;
  userEmail: string;
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

export async function getAllProducts(): Promise<Product[]> {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getProduct(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, "products", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
}

export async function saveProduct(
  data: Omit<Product, "id" | "createdAt">,
): Promise<Product> {
  const docRef = await addDoc(collection(db, "products"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return { ...data, id: docRef.id, createdAt: new Date().toISOString() };
}
