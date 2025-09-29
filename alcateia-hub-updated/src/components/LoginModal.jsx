import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import ForgotPasswordModal from './ForgotPasswordModal';

const LoginModal = ({ children, onLoginSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estados para login
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  // Estados para registro
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar token no localStorage
        localStorage.setItem('blackwolf_token', data.token);
        localStorage.setItem('blackwolf_user', JSON.stringify(data.user));
        
        // Chamar callback de sucesso
        if (onLoginSuccess) {
          onLoginSuccess(data.user, data.token);
        }
        
        // Fechar modal
        setIsOpen(false);
        
        // Limpar formulários
        setLoginData({ username: '', password: '' });
        setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validações
    if (registerData.password !== registerData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerData.username,
          email: registerData.email,
          password: registerData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar token no localStorage
        localStorage.setItem('blackwolf_token', data.token);
        localStorage.setItem('blackwolf_user', JSON.stringify(data.user));
        
        // Chamar callback de sucesso
        if (onLoginSuccess) {
          onLoginSuccess(data.user, data.token);
        }
        
        // Fechar modal
        setIsOpen(false);
        
        // Limpar formulários
        setLoginData({ username: '', password: '' });
        setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        setError(data.error || 'Erro ao criar conta');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterInputChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black/95 border-[#FF0034]/30 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#FF0034] to-[#FF3366] bg-clip-text text-transparent">
            BlackWolf
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900/50">
            <TabsTrigger value="login" className="data-[state=active]:bg-[#FF0034] data-[state=active]:text-white">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-[#FF0034] data-[state=active]:text-white">
              Registro
            </TabsTrigger>
          </TabsList>
          
          {error && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <TabsContent value="login">
            <Card className="bg-transparent border-gray-800/50">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-white">Entrar na sua conta</CardTitle>
                <CardDescription className="text-gray-400">
                  Digite suas credenciais para acessar o BlackWolf
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username" className="text-white">Username ou Email</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-username"
                        name="username"
                        type="text"
                        placeholder="Digite seu username ou email"
                        value={loginData.username}
                        onChange={handleLoginInputChange}
                        className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF0034]"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={loginData.password}
                        onChange={handleLoginInputChange}
                        className="pl-10 pr-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF0034]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
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
                        Entrando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <ForgotPasswordModal>
                      <button
                        type="button"
                        className="text-sm text-gray-400 hover:text-[#FF0034] transition-colors"
                      >
                        Esqueceu sua senha?
                      </button>
                    </ForgotPasswordModal>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card className="bg-transparent border-gray-800/50">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-white">Criar nova conta</CardTitle>
                <CardDescription className="text-gray-400">
                  Junte-se à comunidade BlackWolf
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username" className="text-white">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-username"
                        name="username"
                        type="text"
                        placeholder="Escolha um username"
                        value={registerData.username}
                        onChange={handleRegisterInputChange}
                        className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF0034]"
                        required
                        minLength={3}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="Digite seu email"
                        value={registerData.email}
                        onChange={handleRegisterInputChange}
                        className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF0034]"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-white">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Crie uma senha"
                        value={registerData.password}
                        onChange={handleRegisterInputChange}
                        className="pl-10 pr-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF0034]"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password" className="text-white">Confirmar Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterInputChange}
                        className="pl-10 pr-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FF0034]"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
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
                        Criando conta...
                      </>
                    ) : (
                      'Criar Conta'
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

export default LoginModal;

