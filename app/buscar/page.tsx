import { Suspense } from "react";
import BuscarContent from "./BuscarContent";

export default function BuscarPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Carregando...</div>}>
      <BuscarContent />
    </Suspense>
  );
}