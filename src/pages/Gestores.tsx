
import React, { useState } from 'react';
import { 
  UserPlus, 
  Plus, 
  Search,
  Building,
  Mail,
  Phone,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { managers, properties } from '@/data/mockData';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

export default function Gestores() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredManagers = managers.filter(manager => {
    const matchesSearch = manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          manager.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Gestores</h1>
          <p className="text-muted-foreground">Gerencie a equipe de gestores</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Gestor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Gestor</DialogTitle>
              <DialogDescription>
                Preencha os dados do gestor para adicioná-lo à equipe.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                    <CardDescription>Dados do gestor</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Nome completo</label>
                        <Input id="name" placeholder="Nome do gestor" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <Input id="email" type="email" placeholder="email@exemplo.com" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefone</label>
                        <Input id="phone" placeholder="(00) 00000-0000" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Acesso à Plataforma</CardTitle>
                    <CardDescription>Defina as permissões de acesso</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium mb-1">Função</label>
                      <Input id="role" placeholder="Gestor de portfólio" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="mr-2">Cancelar</Button>
              <Button>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Imóveis Gerenciados</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredManagers.length > 0 ? (
              filteredManagers.map((manager) => {
                const managerProperties = properties.filter(p => 
                  manager.properties.includes(p.id)
                );
                return (
                  <TableRow key={manager.id}>
                    <TableCell className="font-medium">{manager.name}</TableCell>
                    <TableCell>{manager.email}</TableCell>
                    <TableCell>{manager.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{managerProperties.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {manager.isOwner && (
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                          Também Proprietário
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center">
                    <UserPlus className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">Nenhum gestor encontrado</h3>
                    <p className="text-muted-foreground mt-1">
                      Tente ajustar sua busca ou cadastre um novo gestor.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
