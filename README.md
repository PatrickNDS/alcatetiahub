# Alcateia Hub - Frontend Atualizado v2.3

## 🚀 Melhorias Implementadas

### ✅ Calculadora de Build Movida para Página Principal
- **Calculadora de Build** agora está integrada na página inicial
- **Menu de navegação** inclui link direto para a calculadora
- **Botão principal** na hero section redireciona para a calculadora
- **Card destacado** na seção de recursos principais
- **Seção completa** com todos os campos funcionais

### 🎨 Tema Preto Total com Bordas Vermelhas no Hover (Inspirado no WuWa Tracker)
- **Fundo totalmente preto** igual ao wuwatracker.com/pt
- **Header com fundo preto** e borda vermelha no hover
- **Bordas vermelhas** aparecem somente ao passar o mouse
- **Inputs e elementos** com bordas vermelhas ao focar
- **Experiência interativa** com feedback visual sutil
- **Visual limpo e minimalista** sem elementos visuais desnecessários

### ✅ Funcionalidades Preservadas
- **Tier Lists** - Sistema completo de criação e visualização
- **Guias de Personagens** - Análises detalhadas e builds
- **Painel Administrativo** - Gerenciamento de conteúdo
- **Sistema de Login** - Autenticação de usuários
- **Design Responsivo** - Funciona em desktop e mobile

### ✅ Melhorias de UX/UI
- **Navegação suave** entre seções com scroll automático
- **Cards interativos** com hover effects aprimorados
- **Menu responsivo** para dispositivos móveis
- **Scrollbar personalizada** com tema escuro
- **Animações fade-in** para elementos
- **Efeitos neon** nos botões principais

## 📦 Instalação e Deploy

Este pacote já inclui a pasta `dist/` com os arquivos otimizados para produção. Você pode implantá-la diretamente em seu servidor web ou serviço de hospedagem.

### Para Deploy (Produção)

Basta copiar o conteúdo da pasta `dist/` para o diretório raiz do seu servidor web (ex: `public_html`, `www`).

### Para Desenvolvimento

```bash
# 1. Navegue até a pasta do projeto
cd /caminho/para/alcateia-hub-updated

# 2. Instale as dependências
npm install --legacy-peer-deps

# 3. Execute em desenvolvimento
npm run dev

# 4. Para gerar uma nova build de produção (se necessário)
npm run build
```

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **React Router** - Navegação
- **Framer Motion** - Animações

## 📱 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes base do shadcn/ui
│   ├── AdminPanel.jsx   # Painel administrativo
│   ├── BuildCalculator.jsx # Calculadora de builds
│   ├── CharacterGuide.jsx  # Guias de personagens
│   └── LoginModal.jsx   # Modal de login
├── assets/              # Imagens e recursos
├── App.jsx             # Componente principal
└── main.jsx            # Entry point
```

## 🎯 Funcionalidades da Calculadora

- **Seleção de Armas** - Dropdown com armas disponíveis
- **Stats de Echoes** - Campos para Crit Rate, Crit Damage, ATK, etc.
- **Cálculo Automático** - Stats finais calculados em tempo real
- **Estimativa de Dano** - Diferentes tipos de ataque
- **Dicas de Otimização** - Guias para melhorar builds

## 📝 Notas de Desenvolvimento

- Projeto configurado com **ESLint** para qualidade de código
- **Tailwind CSS** configurado com tema customizado
- **Componentes reutilizáveis** seguindo padrões do shadcn/ui
- **Responsividade** testada em diferentes tamanhos de tela

---

**Desenvolvido por:** Manus AI  
**Versão:** 2.3 - Tema Preto Total com Bordas Vermelhas no Hover + Calculadora Integrada  
**Data:** Setembro 2025

## 🎨 Detalhes da Nova Paleta de Cores

### Cores Principais
- **Background:** `oklch(0.05 0 0)` - Preto total como o WuWa Tracker
- **Primary:** `oklch(0.55 0.22 15)` - Vermelho vibrante
- **Card:** `oklch(0.08 0 0)` - Preto ligeiramente mais claro para cards
- **Border:** `oklch(0.1 0 0)` - Bordas escuras por padrão, vermelhas no hover

### Inspiração e Interatividade
Baseado no design **totalmente preto** do **wuwatracker.com/pt**, com o vermelho característico do Alcateia Hub aplicado **apenas no hover** dos elementos, criando uma experiência mais sutil e interativa. As bordas vermelhas aparecem somente ao passar o mouse, proporcionando feedback visual elegante.
