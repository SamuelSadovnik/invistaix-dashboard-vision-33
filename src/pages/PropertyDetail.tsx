
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Home, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Landmark,
  FileText,
  BadgePercent,
  Building,
  TrendingUp,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PerformanceChart from '@/components/charts/PerformanceChart';

import { properties, owners, transactions, performanceData, incomeData, expenseData, resultData } from '@/data/mockData';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === id);
  const owner = property ? owners.find((o) => o.id === property.owner) : undefined;
  
  const propertyTransactions = transactions.filter((t) => t.propertyId === id);
  const incomes = propertyTransactions.filter((t) => t.type === 'income');
  const expenses = propertyTransactions.filter((t) => t.type === 'expense');
  
  const totalIncome = incomes.reduce((acc, curr) => acc + curr.value, 0);
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.value, 0);
  const result = totalIncome - totalExpense;
  
  if (!property || !owner) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Home className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Imóvel não encontrado</h1>
        <p className="text-muted-foreground mb-6">O imóvel que você está procurando não existe ou foi removido.</p>
        <Button asChild>
          <Link to="/imoveis">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Imóveis
          </Link>
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link to="/imoveis" className="text-sm text-muted-foreground hover:text-foreground flex items-center mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para Imóveis
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">{property.name}</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.address}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tipo de Imóvel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Home className="h-5 w-5 mr-2 text-invistaix-300" />
              <span className="font-medium">{property.type}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Proprietário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-invistaix-300" />
              <div>
                <span className="font-medium">{owner.name}</span>
                <Badge 
                  variant="outline" 
                  className="ml-2 text-xs bg-invistaix-100 text-invistaix-400 border-invistaix-200"
                >
                  {owner.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor da Matrícula
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-invistaix-300" />
              <div>
                <span className="font-medium">R$ {property.matriculaValue.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {formatDate(property.matriculaDate)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {property.rentValue && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Valor do Aluguel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {property.rentValue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Valor mensal</p>
            </CardContent>
          </Card>
        )}
        
        {property.saleValue && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Valor de Venda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {property.saleValue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Última avaliação</p>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor do IPTU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {property.taxValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Anual</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="financeiro">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="liquidacao">Liquidação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financeiro" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Receitas</CardTitle>
                <CardDescription>Total de receitas do imóvel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  R$ {totalIncome.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Despesas</CardTitle>
                <CardDescription>Total de despesas do imóvel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  R$ {totalExpense.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resultado</CardTitle>
                <CardDescription>Resultado financeiro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${result >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  R$ {result.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Transações</CardTitle>
              <CardDescription>Receitas e despesas deste imóvel</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="avaliacoes" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Avaliações</CardTitle>
              <CardDescription>Evolução do valor do imóvel ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Variação</TableHead>
                    <TableHead>Avaliador</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(property.assessments || []).map((assessment, index) => {
                    const previousValue = index > 0 ? property.assessments![index - 1].value : property.matriculaValue;
                    const variation = ((assessment.value - previousValue) / previousValue) * 100;
                    
                    return (
                      <TableRow key={index}>
                        <TableCell>{formatDate(assessment.date)}</TableCell>
                        <TableCell>R$ {assessment.value.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={variation >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {variation >= 0 ? '+' : ''}{variation.toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell>{assessment.assessor}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PerformanceChart 
              title="Valorização do Imóvel" 
              description="Com base nas avaliações e índice INCC"
              data={performanceData}
            />
            <PerformanceChart 
              title="Resultado Financeiro" 
              description="Receitas - Despesas"
              data={resultData}
              color="#10b981"
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Retorno</CardTitle>
                <CardDescription>Retorno sobre o valor do imóvel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center rounded-full w-24 h-24 border-4 border-invistaix-300">
                    <div className="text-2xl font-bold">
                      {property.rentValue 
                        ? ((property.rentValue * 12 / property.saleValue!) * 100).toFixed(2)
                        : "0.00"}%
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Taxa de retorno anual sobre o valor atual do imóvel
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Indicadores de Performance</CardTitle>
                <CardDescription>Principais métricas de desempenho</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Valorização (INCC)</span>
                    <span className="font-medium text-green-600">+3.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ROI Mensal</span>
                    <span className="font-medium">
                      {property.rentValue 
                        ? ((property.rentValue / property.saleValue!) * 100).toFixed(2)
                        : "0.00"}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Taxa de Vacância</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Performance Global</span>
                    <span className="font-medium text-green-600">+5.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="liquidacao" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Simulação de Liquidação</CardTitle>
              <CardDescription>
                Calcule o resultado financeiro da venda deste imóvel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Dados do Imóvel</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valor da Matrícula</span>
                        <span>R$ {property.matriculaValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Última Avaliação</span>
                        <span>R$ {property.saleValue?.toLocaleString() || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tipo de Proprietário</span>
                        <span>{owner.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Simulação de Venda</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valor de Venda</span>
                        <span>R$ {property.saleValue?.toLocaleString() || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ganho de Capital</span>
                        <span>
                          R$ {(
                            property.saleValue ? property.saleValue - property.matriculaValue : 0
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Imposto ({owner.type === 'PF' ? '15% sobre ganho' : 'PJ'})
                        </span>
                        <span>
                          R$ {(
                            property.saleValue ? 
                              (property.saleValue - property.matriculaValue) * (owner.type === 'PF' ? 0.15 : 0.25) : 0
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t">
                        <span className="text-muted-foreground">Valor Líquido</span>
                        <span className="text-green-600">
                          R$ {(
                            property.saleValue ? 
                              property.saleValue - 
                              (property.saleValue - property.matriculaValue) * (owner.type === 'PF' ? 0.15 : 0.25) : 0
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-6 rounded-lg border">
                  <h3 className="font-medium mb-4">Simulador de Liquidação</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Ajuste o valor de venda para simular diferentes cenários de liquidação para o imóvel.
                  </p>
                  <div className="text-center">
                    <Button className="invistaix-gradient">
                      Abrir Simulador Completo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyDetail;
