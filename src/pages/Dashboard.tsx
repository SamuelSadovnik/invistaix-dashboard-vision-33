
import React from 'react';
import { 
  Home, 
  Users, 
  UserPlus, 
  ArrowUpRight,
  DollarSign,
  TrendingUp,
  LineChart,
  Building
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PerformanceChart from '@/components/charts/PerformanceChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { 
  properties, 
  owners, 
  managers, 
  transactions, 
  performanceData, 
  incomeData, 
  expenseData, 
  resultData,
  inccData
} from '@/data/mockData';

const Dashboard = () => {
  const totalProperties = properties.length;
  const totalOwners = owners.length;
  const totalManagers = managers.length;
  
  const totalRentIncome = transactions
    .filter(t => t.type === 'income' && t.category === 'Aluguel')
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const result = totalIncome - totalExpenses;
  
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua carteira de imóveis e desempenho financeiro.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total de Imóveis"
          value={totalProperties}
          description="Imóveis registrados no sistema"
          icon={<Home />}
          trend={{ value: 20, isPositive: true }}
        />
        <DashboardCard
          title="Total de Proprietários"
          value={totalOwners}
          description="Proprietários cadastrados"
          icon={<Users />}
          trend={{ value: 5, isPositive: true }}
        />
        <DashboardCard
          title="Total de Gestores"
          value={totalManagers}
          description="Gestores ativos"
          icon={<UserPlus />}
          trend={{ value: 0, isPositive: true }}
        />
        <DashboardCard
          title="Resultado Financeiro"
          value={`R$ ${result.toLocaleString()}`}
          description="Receitas - Despesas (mês atual)"
          icon={<ArrowUpRight />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 animate-fade-in">
          <CardHeader>
            <CardTitle>Índice INCC</CardTitle>
            <CardDescription>Índice Nacional de Custo da Construção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {inccData.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md border ${
                    index === inccData.length - 1 
                      ? 'bg-invistaix-100 border-invistaix-300'
                      : 'bg-card'
                  }`}
                >
                  <p className="text-sm font-medium">{item.month}</p>
                  <p className={`text-lg font-bold ${
                    item.value > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.value > 0 ? '+' : ''}{item.value}%
                  </p>
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Fonte: FGV • Última atualização: 15 de Abril de 2025
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Resumo Financeiro</CardTitle>
            <CardDescription>Visão geral do mês atual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Receitas</span>
                <span className="font-medium">R$ {totalIncome.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Despesas</span>
                <span className="font-medium">R$ {totalExpenses.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full" 
                  style={{ width: `${(totalExpenses / totalIncome) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Resultado</span>
                <span className="font-medium text-green-600">R$ {result.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-invistaix-300 rounded-full" 
                  style={{ width: `${(result / totalIncome) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <PerformanceChart 
          title="Performance dos Imóveis" 
          description="Valorização com base no índice INCC"
          data={performanceData}
        />
        <PerformanceChart 
          title="Resultado Financeiro" 
          description="Receitas - Despesas"
          data={resultData}
          color="#10b981"
        />
      </div>
      
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
          <CardDescription>Últimas movimentações financeiras registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Imóvel</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => {
                const property = properties.find(p => p.id === transaction.propertyId);
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{property?.name || 'N/A'}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={transaction.type === 'income' ? 'default' : 'outline'} 
                        className={
                          transaction.type === 'income' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : 'text-red-800 border-red-200 bg-red-50'
                        }
                      >
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      R$ {transaction.value.toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="mt-4 text-center">
            <Button variant="outline">Ver todas as transações</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
