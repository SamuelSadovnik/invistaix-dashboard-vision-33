
import React from 'react';
import { 
  TrendingUp,
  ChartBar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import PerformanceChart from '@/components/charts/PerformanceChart';
import { properties, incomeData, expenseData, resultData } from '@/data/mockData';

const Performance = () => {
  const totalProperties = properties.length;
  const occupiedProperties = properties.filter(p => p.status === 'Ocupado').length;
  const occupancyRate = ((occupiedProperties / totalProperties) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Performance</h1>
          <p className="text-muted-foreground">Análise de desempenho da carteira</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar Período
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Ocupação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{occupancyRate}%</div>
              <div className="p-2 rounded-full bg-green-100 text-green-800">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {occupiedProperties} de {totalProperties} imóveis ocupados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rentabilidade Média
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">0.82%</div>
              <div className="p-2 rounded-full bg-green-100 text-green-800">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+0.1pp vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inadimplência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">1.2%</div>
              <div className="p-2 rounded-full bg-red-100 text-red-800">
                <ArrowDownRight className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">-0.3pp vs. mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
          <TabsTrigger value="occupancy">Ocupação</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <PerformanceChart
            title="Performance Geral"
            description="Evolução dos principais indicadores"
            data={resultData}
            color="#8b5cf6"
          />
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <PerformanceChart
              title="Receitas"
              description="Evolução das receitas"
              data={incomeData}
              color="#10b981"
            />
            <PerformanceChart
              title="Despesas"
              description="Evolução das despesas"
              data={expenseData}
              color="#ef4444"
            />
          </div>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-4">
          <PerformanceChart
            title="Taxa de Ocupação"
            description="Evolução da taxa de ocupação"
            data={resultData}
            color="#8b5cf6"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;
