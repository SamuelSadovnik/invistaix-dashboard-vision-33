
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building, 
  Mail, 
  Phone, 
  User,
  MapPin
} from 'lucide-react';
import { properties } from '@/data/mockData';

interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  properties: string[];
  isOwner?: boolean;
}

interface ManagerDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  manager: Manager;
}

export const ManagerDetailsDialog: React.FC<ManagerDetailsDialogProps> = ({
  isOpen,
  onClose,
  manager,
}) => {
  const managerProperties = properties.filter(p => 
    manager.properties.includes(p.id)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {manager.name}
            {manager.isOwner && (
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                Também Proprietário
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Informações detalhadas do gestor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="font-medium mr-2">Função:</span>
                <span>{manager.role}</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="font-medium mr-2">Email:</span>
                <span>{manager.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="font-medium mr-2">Telefone:</span>
                <span>{manager.phone}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Imóveis Gerenciados ({managerProperties.length})
              </CardTitle>
              <CardDescription>
                Imóveis sob responsabilidade deste gestor
              </CardDescription>
            </CardHeader>
            <CardContent>
              {managerProperties.length > 0 ? (
                <div className="space-y-3">
                  {managerProperties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{property.name}</h4>
                        <Badge variant="outline">{property.type}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{property.address}</span>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Valor: </span>
                        <span>R$ {property.value.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum imóvel atribuído a este gestor.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
