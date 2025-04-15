
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Previews from "./pages/Previews";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Owners from "./pages/Owners";
import Managers from "./pages/Managers";
import Financial from "./pages/Financial";
import Performance from "./pages/Performance";
import Reports from "./pages/Reports";
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
              <Route path="vistorias" element={<Previews />} />
              <Route path="imoveis" element={<Properties />} />
              <Route path="imoveis/:id" element={<PropertyDetail />} />
              <Route path="proprietarios" element={<Owners />} />
              <Route path="gestores" element={<Managers />} />
              <Route path="financeiro" element={<Financial />} />
              <Route path="performance" element={<Performance />} />
              <Route path="relatorios" element={<Reports />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
