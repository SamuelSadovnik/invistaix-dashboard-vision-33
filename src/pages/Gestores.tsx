
import React from "react";
import { Users } from "lucide-react";

export default function Gestores() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="flex items-center mb-4">
        <Users className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-bold text-black dark:text-white">Gestores</h1>
      </div>
      <p className="max-w-md text-muted-foreground">
        Controle o acesso, funções e gerenciamento de todos os gestores de portfólio na plataforma.
      </p>
      <div className="w-full max-w-xl mt-8 rounded-lg bg-white dark:bg-zinc-900 p-6 border border-primary/20 shadow transition hover:shadow-lg">
        <h2 className="text-xl font-semibold text-primary mb-2">Em breve</h2>
        <p>Ferramentas para atuação dos gestores estarão disponíveis aqui.</p>
      </div>
    </div>
  );
}
