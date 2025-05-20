
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import PropertyDetail from "./pages/PropertyDetail";
import Imoveis from "./pages/Imoveis";
import Vistorias from "./pages/Vistorias"; 
import Proprietarios from "./pages/Proprietarios";
import Gestores from "./pages/Gestores";
import Financial from "./pages/Financial";
import Performance from "./pages/Performance";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="vistorias" element={<Vistorias />} />
              <Route path="imoveis" element={<Imoveis />} />
              <Route path="imoveis/:id" element={<PropertyDetail />} />
              <Route path="proprietarios" element={<Proprietarios />} />
              <Route path="gestores" element={<Gestores />} />
              <Route path="financeiro" element={<Financial />} />
              <Route path="performance" element={<Performance />} />
              <Route path="relatorios" element={<Relatorios />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
