
import React from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Topbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
  };

  const handleConfigClick = () => {
    navigate('/dashboard/configuracoes');
  };

  return (
    <header className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">InvistaIX</h1>
        <span className="ml-3 text-sm opacity-90">Sistema de Gestão</span>
      </div>
      
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback className="bg-white text-green-600 font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-3 p-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt="Admin" />
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white text-lg font-bold">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-base font-semibold leading-none text-gray-900">Administrator</p>
                    <p className="text-sm text-gray-500 mt-1">
                      admin@invistaix.com
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-medium text-gray-600">Usuário:</span>
                      <p className="text-gray-900 font-semibold">ADMIN</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Tipo:</span>
                      <p className="text-gray-900 font-semibold">Administrador</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Status:</span>
                      <p className="text-green-600 font-semibold flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        Ativo
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Acesso:</span>
                      <p className="text-gray-900 font-semibold">Total</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Último login:</span>
                        <span className="text-gray-900 font-medium">Hoje, 09:15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sessão ativa:</span>
                        <span className="text-green-600 font-medium">2h 30min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Permissões:</span>
                        <span className="text-blue-600 font-medium">Todas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleConfigClick} className="cursor-pointer hover:bg-gray-50">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
