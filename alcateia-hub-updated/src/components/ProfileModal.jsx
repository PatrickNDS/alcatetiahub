import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, User, Mail, Lock, Settings, CheckCircle } from 'lucide-react';

const ProfileModal = ({ children, user, onProfileUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Estados para edição de perfil
  const [profileData, setProfileData] = useState({
    username: '',
    email: ''
  });
  
  // Estados para mudança de senha
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('blackwolf_token');
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Perfil atualizado com sucesso!');
        localStorage.setItem('blackwolf_user', JSON.stringify(data.user));
        
        if (onProfileUpdate) {
          onProfileUpdate(data.user);
        }
      } else {
        setError(data.error || 'Erro ao atualizar perfil');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validações
    if (passwordData.new_password !== passwordData.confirm_password) {
      setError('As novas senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (passwordData.new_password.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('blackwolf_token');
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Senha alterada com sucesso!');
        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_password: ''
        });
      } else {
        setError(data.error || 'Erro ao alterar senha');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordInputChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setError('');
    setSuccess('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-black/95 border-[#FF0034]/30 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#FF0034] to-[#FF3366] bg-clip-text text-transparent">
            Meu Perfil
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900/50">
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#FF0034] data-[state=active]:text-white">
              <Settings className="mr-2 h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="password" className="data-[state=active]:bg-[#FF0034] data-[state=active]:text-white">
              <Lock className="mr-2 h-4 w-4" />
              Senha
            </TabsTrigger>
          </TabsList>
          
          {error && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-400">
                {success}
              </AlertDescription>
            </Alert>
          )}
          
          <TabsContent value="profile">
            <Card className="bg-transparent border-gray-800/50">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-white">Editar Perfil</CardTitle>
                <CardDescription className="text-gray-400">
                  Atualize suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-username" className="text-white">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="profile-username"
                        name="username"
                        type="text"
                        placeholder="Seu username"
                        value={profileData.username}
                        onChange={handleProfileInputChange}
                        className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF0034]"
                        required
                        minLength={3}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="profile-email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="profile-email"
                        name="email"
                        type="email"
                        placeholder="Seu email"
                        value={profileData.email}
                        onChange={handleProfileInputChange}
                        className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF0034]"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FF0034] to-[#FF3366] hover:from-[#FF3366] to-[#FF0034] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      'Salvar Alterações'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card className="bg-transparent border-gray-800/50">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-white">Alterar Senha</CardTitle>
                <CardDescription className="text-gray-400">
                  Mantenha sua conta segura com uma senha forte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-white">Senha Atual</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="current-password"
                        name="current_password"
                        type="password"
                        placeholder="Digite sua senha atual"
                        value={passwordData.current_password}
                        onChange={handlePasswordInputChange}
                        className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF0034]"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-white">Nova Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="new-password"
                        name="new_password"
                        type="password"
                        placeholder="Digite sua nova senha"
                        value={passwordData.new_password}
                        onChange={handlePasswordInputChange}
                        className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF0034]"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-new-password" className="text-white">Confirmar Nova Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-new-password"
                        name="confirm_password"
                        type="password"
                        placeholder="Confirme sua nova senha"
                        value={passwordData.confirm_password}
                        onChange={handlePasswordInputChange}
                        className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF0034]"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FF0034] to-[#FF3366] hover:from-[#FF3366] to-[#FF0034] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Alterando...
                      </>
                    ) : (
                      'Alterar Senha'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;

