import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Search, Star, Trophy, Users, Gamepad2, List, BookOpen, Menu, X, LogOut, User, Calculator } from 'lucide-react'
import LoginModal from './components/LoginModal'
import CharacterGuide from './components/CharacterGuide'
import AdminPanel from './components/AdminPanel'
import BuildCalculator from './components/BuildCalculator'
import './App.css'

// Componente Header
function Header({ user, onLoginSuccess, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-transparent hover:border-primary transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">AH</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Alcateia Hub
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center justify-center flex-grow space-x-6">
            <a href="#home" className="hover:text-primary transition-colors">Início</a>
            <a href="#build-calculator" className="hover:text-primary transition-colors">Calculadora</a>
            <a href="#tier-lists" className="hover:text-primary transition-colors">Tier Lists</a>
            <a href="#characters" className="hover:text-primary transition-colors">Personagens</a>
            <a href="#games" className="hover:text-primary transition-colors">Jogos</a>
            <a href="/admin" className="hover:text-primary transition-colors">Admin</a>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{user.username}</span>
                </div>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sair
                </Button>
              </div>
            ) : (
              <LoginModal onLoginSuccess={onLoginSuccess}>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Login
                </Button>
              </LoginModal>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-2">
              <a href="#home" className="hover:text-primary transition-colors py-2">Início</a>
              <a href="#build-calculator" className="hover:text-primary transition-colors py-2">Calculadora</a>
              <a href="#tier-lists" className="hover:text-primary transition-colors py-2">Tier Lists</a>
              <a href="#characters" className="hover:text-primary transition-colors py-2">Personagens</a>
              <a href="#games" className="hover:text-primary transition-colors py-2">Jogos</a>
              <a href="/admin" className="hover:text-primary transition-colors py-2">Admin</a>
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{user.username}</span>
                  </div>
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sair
                  </Button>
                </div>
              ) : (
                <LoginModal onLoginSuccess={onLoginSuccess}>
                  <Button variant="outline" size="sm" className="mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Login
                  </Button>
                </LoginModal>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

// Componente Hero Section
function HeroSection() {
  return (
    <section id="home" className="minimal-section min-h-screen flex items-center justify-center bg-background">
      <div className="minimal-container text-center">
        <h1 className="minimal-title text-6xl md:text-8xl">
          Alcateia Hub
        </h1>
        <p className="minimal-subtitle max-w-2xl mx-auto">
          O hub definitivo para jogos gacha. Crie tier lists, explore guias de personagens e conecte-se com a comunidade.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Button size="lg" className="minimal-button" onClick={() => document.getElementById('build-calculator')?.scrollIntoView({ behavior: 'smooth' })}>
            <Calculator className="mr-2 h-5 w-5" />
            Calculadora de Build
          </Button>
          <Button size="lg" variant="outline" className="minimal-button" onClick={() => document.getElementById('tier-lists')?.scrollIntoView({ behavior: 'smooth' })}>
            <List className="mr-2 h-5 w-5" />
            Criar Tier List
          </Button>
          <Button size="lg" variant="outline" className="minimal-button" onClick={() => document.getElementById('characters')?.scrollIntoView({ behavior: 'smooth' })}>
            <BookOpen className="mr-2 h-5 w-5" />
            Explorar Guias
          </Button>
        </div>

        <div className="minimal-grid">
          <Card className="minimal-card cursor-pointer" onClick={() => document.getElementById('build-calculator')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardContent className="p-8 text-center">
              <Calculator className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-medium mb-2">Calculadora de Build</h3>
              <p className="minimal-text">Otimize seus personagens com cálculos precisos</p>
            </CardContent>
          </Card>
          
          <Card className="minimal-card cursor-pointer" onClick={() => document.getElementById('tier-lists')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardContent className="p-8 text-center">
              <List className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-medium mb-2">Tier Lists</h3>
              <p className="minimal-text">Crie e compartilhe suas tier lists personalizadas</p>
            </CardContent>
          </Card>
          
          <Card className="minimal-card cursor-pointer" onClick={() => document.getElementById('characters')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardContent className="p-8 text-center">
              <Users className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-medium mb-2">Guias de Personagens</h3>
              <p className="minimal-text">Builds, estratégias e análises detalhadas</p>
            </CardContent>
          </Card>
          
          <Card className="minimal-card cursor-pointer">
            <CardContent className="p-8 text-center">
              <Gamepad2 className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-medium mb-2">Comunidade</h3>
              <p className="minimal-text">Conecte-se com outros jogadores</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Componente Tier Lists Section
function TierListsSection() {
  const tierLists = [
    {
      id: 1,
      title: "Tier List Wuthering Waves",
      author: "Alcateia Hub",
      votes: 0,
      game: "Wuthering Waves",
      image: "/src/assets/characters/gacha_character_1.jpg"
    },
    {
      id: 2,
      title: "Tier List Punishing Gray Raven",
      author: "Alcateia Hub",
      votes: 0,
      game: "Punishing Gray Raven",
      image: "/src/assets/characters/gacha_character_2.png"
    },
    {
      id: 3,
      title: "Tier List Duet Night Abyss",
      author: "Alcateia Hub",
      votes: 0,
      game: "Duet Night Abyss",
      image: "/src/assets/characters/gacha_character_3.jpg"
    }
  ]

  return (
    <section id="tier-lists" className="minimal-section">
      <div className="minimal-container">
        <div className="text-center minimal-spacing">
          <h2 className="minimal-title">
            Tier Lists Populares
          </h2>
          <p className="minimal-subtitle max-w-2xl mx-auto">
            Descubra as tier lists mais votadas pela comunidade e crie as suas próprias
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Buscar tier lists..." 
              className="pl-10 glass-effect"
            />
          </div>
        </div>

        <div className="minimal-grid">
          {tierLists.map((tierList) => (
            <Card key={tierList.id} className="minimal-card overflow-hidden">
              <div className="relative h-40">
                <img 
                  src={tierList.image} 
                  alt={tierList.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-xs">
                  {tierList.game}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">{tierList.title}</CardTitle>
                <CardDescription className="minimal-text">Por {tierList.author}</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="minimal-text">{tierList.votes} votos</span>
                  </div>
                  <Button size="sm" variant="outline" className="minimal-button">
                    Ver Tier List
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="neon-glow">
            <Trophy className="mr-2 h-5 w-5" />
            Criar Nova Tier List
          </Button>
        </div>
      </div>
    </section>
  )
}

// Componente Characters Section
function CharactersSection() {
  const characters = [
    {
      id: 1,
      name: "Raiden Shogun",
      game: "Genshin Impact",
      element: "Electro",
      rarity: 5,
      image: "/src/assets/characters/gacha_character_4.jpeg"
    },
    {
      id: 2,
      name: "Kafka",
      game: "Honkai Star Rail",
      element: "Lightning",
      rarity: 5,
      image: "/src/assets/characters/gacha_character_5.jpeg"
    },
    {
      id: 3,
      name: "Surtr",
      game: "Arknights",
      element: "Arts",
      rarity: 6,
      image: "/src/assets/characters/gacha_character_6.jpg"
    },
    {
      id: 4,
      name: "Ayaka",
      game: "Genshin Impact",
      element: "Cryo",
      rarity: 5,
      image: "/src/assets/characters/gacha_character_7.png"
    }
  ]

  return (
    <section id="characters" className="py-20 px-4 bg-card/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Guias de Personagens
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Builds, estratégias e análises completas dos melhores personagens
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <Card key={character.id} className="glass-effect character-card overflow-hidden">
              <div className="relative">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-yellow-500 text-black">
                    {character.rarity}★
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-primary">
                    {character.element}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{character.name}</CardTitle>
                <CardDescription>{character.game}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Button size="sm" variant="outline" className="w-full">
                  Ver Guia Completo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="glass-effect">
            <BookOpen className="mr-2 h-5 w-5" />
            Ver Todos os Personagens
          </Button>
        </div>
      </div>
    </section>
  )
}

// Componente Footer
function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AH</span>
              </div>
              <h3 className="text-xl font-bold">BlackWolf</h3>
            </div>
            <p className="text-muted-foreground">
              O hub definitivo para jogos gacha. Crie, compartilhe e descubra o melhor conteúdo da comunidade.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Tier Lists</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Guias de Personagens</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Jogos Suportados</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Comunidade</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Reddit</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 BlackWolf. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

// Componente BuildCalculatorSection
function BuildCalculatorSection() {
  return (
    <section id="build-calculator" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Calculadora de Build
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Otimize seus personagens com nossa calculadora avançada de builds e stats
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <BuildCalculator />
        </div>
      </div>
    </section>
  )
}

// Componente principal App
function Home() {
  return (
    <>
      <HeroSection />
      <BuildCalculatorSection />
      <TierListsSection />
      <CharactersSection />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Verificar se há usuário logado ao carregar a página
  useEffect(() => {
    const savedToken = localStorage.getItem('blackwolf_token');
    const savedUser = localStorage.getItem('blackwolf_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('blackwolf_token');
    localStorage.removeItem('blackwolf_user');
    setUser(null);
    setToken(null);
  };

  return (
    <Router>
      <div className="bg-background text-foreground min-h-screen">
        <Header user={user} onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides/:game/:characterName" element={<CharacterGuide />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

