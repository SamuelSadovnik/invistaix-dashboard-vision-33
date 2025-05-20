
import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search,
  Building,
  UserCheck,
  Mail,
  Phone,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { owners, properties } from '@/data/mockData';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';

export default function Proprietarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ownerType, setOwnerType] = useState<string | undefined>(undefined);
  
  const filteredOwners = owners.filter(owner => {
    const matchesSearch = owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          owner.document.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !ownerType || owner.type === ownerType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Proprietários</h1>
          <p className="text-muted-foreground">Gerencie os proprietários de imóveis</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Proprietário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Proprietário</DialogTitle>
              <DialogDescription>
                Preencha os dados do proprietário para adicioná-lo ao sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                    <CardDescription>Dados do proprietário</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium mb-1">Tipo</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PF">Pessoa Física</SelectItem>
                            <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Nome completo</label>
                        <Input id="name" placeholder="Nome do proprietário" />
                      </div>
                      <div>
                        <label htmlFor="document" className="block text-sm font-medium mb-1">CPF/CNPJ</label>
                        <Input id="document" placeholder="000.000.000-00" />
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
            placeholder="Buscar por nome, email ou documento..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={ownerType} onValueChange={setOwnerType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de pessoa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os tipos</SelectItem>
              <SelectItem value="PF">Pessoa Física</SelectItem>
              <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOwners.length > 0 ? (
          filteredOwners.map((owner) => {
            const ownerProperties = properties.filter(p => p.owner === owner.id);
            return (
              <Card key={owner.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{owner.name}</CardTitle>
                    <Badge 
                      className={owner.type === 'PF' ? 'bg-invistaix-100 text-invistaix-400 hover:bg-invistaix-100' : 'bg-blue-100 text-blue-700 hover:bg-blue-100'}
                    >
                      {owner.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <Building className="h-3 w-3 mr-1" />
                    {ownerProperties.length} imóvel(is)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <UserCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{owner.document}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{owner.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{owner.phone}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">Nenhum proprietário encontrado</h3>
            <p className="text-muted-foreground mt-1">
              Tente ajustar seus filtros ou cadastre um novo proprietário.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
