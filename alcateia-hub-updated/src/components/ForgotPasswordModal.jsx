import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPasswordModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(data.error || 'Erro ao enviar email de recuperação');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSuccess(false);
    setError('');
    setEmail('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black/95 border-[#FF0034]/30 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#FF0034] to-[#FF3366] bg-clip-text text-transparent">
            Recuperar Senha
          </DialogTitle>
        </DialogHeader>
        
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
              Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.
            </AlertDescription>
          </Alert>
        )}
        
        <Card className="bg-transparent border-gray-800/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white">Esqueceu sua senha?</CardTitle>
            <CardDescription className="text-gray-400">
              Digite seu email para receber instruções de recuperação
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="Digite seu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      Enviando...
                    </>
                  ) : (
                    'Enviar Email de Recuperação'
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
                <p className="text-white">Email enviado com sucesso!</p>
                <p className="text-sm text-gray-400">
                  Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                </p>
                <Button
                  onClick={handleClose}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;

