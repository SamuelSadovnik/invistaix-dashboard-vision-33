
import React from "react";
import { Home } from "lucide-react";

export default function Imoveis() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="flex items-center mb-4">
        <Home className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-bold text-black dark:text-white">Imóveis</h1>
      </div>
      <p className="max-w-md text-muted-foreground">
        Cadastro e gestão de todos os imóveis. Visualize detalhes, status e informações relevantes dos ativos sob administração.
      </p>
      <div className="w-full max-w-xl mt-8 rounded-lg bg-white dark:bg-zinc-900 p-6 border border-primary/20 shadow transition hover:shadow-lg">
        <h2 className="text-xl font-semibold text-primary mb-2">Em breve</h2>
        <p>Funções avançadas de gestão de imóveis serão integradas.</p>
      </div>
    </div>
  );
}
