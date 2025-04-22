
import React from "react";
import { DollarSign } from "lucide-react";

export default function Financeiro() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="flex items-center mb-4">
        <DollarSign className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-bold text-black dark:text-white">Financeiro</h1>
      </div>
      <p className="max-w-md text-muted-foreground">
        Acompanhe e monitore as informações financeiras dos imóveis, incluindo receitas, despesas e relatórios simplificados.
      </p>
      <div className="w-full max-w-xl mt-8 rounded-lg bg-white dark:bg-zinc-900 p-6 border border-primary/20 shadow transition hover:shadow-lg">
        <h2 className="text-xl font-semibold text-primary mb-2">Em breve</h2>
        <p>Análises e extratos financeiros aparecerão neste painel.</p>
      </div>
    </div>
  );
}
