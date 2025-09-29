import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Plus, Trash2, Save } from 'lucide-react';

function AdminPanel() {
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState({
    name: '',
    game: '',
    element: '',
    rarity: 5,
    image: '',
    weapons: [],
    echoes: [],
    skillPriority: [],
    teamRecommendations: []
  });

  const [newWeapon, setNewWeapon] = useState({ name: '', type: '', recommendation: '' });
  const [newEcho, setNewEcho] = useState({ name: '', set: '', recommendation: '' });
  const [newSkill, setNewSkill] = useState('');
  const [newTeam, setNewTeam] = useState('');

  const games = ['Wuthering Waves', 'Punishing Gray Raven', 'Duet Night Abyss'];
  const elements = ['Spectro', 'Aero', 'Electro', 'Fusion', 'Glacio', 'Havoc'];
  const rarities = [3, 4, 5, 6];

  const handleInputChange = (field, value) => {
    setCurrentCharacter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addWeapon = () => {
    if (newWeapon.name && newWeapon.type && newWeapon.recommendation) {
      setCurrentCharacter(prev => ({
        ...prev,
        weapons: [...prev.weapons, newWeapon]
      }));
      setNewWeapon({ name: '', type: '', recommendation: '' });
    }
  };

  const removeWeapon = (index) => {
    setCurrentCharacter(prev => ({
      ...prev,
      weapons: prev.weapons.filter((_, i) => i !== index)
    }));
  };

  const addEcho = () => {
    if (newEcho.name && newEcho.set && newEcho.recommendation) {
      setCurrentCharacter(prev => ({
        ...prev,
        echoes: [...prev.echoes, newEcho]
      }));
      setNewEcho({ name: '', set: '', recommendation: '' });
    }
  };

  const removeEcho = (index) => {
    setCurrentCharacter(prev => ({
      ...prev,
      echoes: prev.echoes.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (newSkill) {
      setCurrentCharacter(prev => ({
        ...prev,
        skillPriority: [...prev.skillPriority, newSkill]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setCurrentCharacter(prev => ({
      ...prev,
      skillPriority: prev.skillPriority.filter((_, i) => i !== index)
    }));
  };

  const addTeam = () => {
    if (newTeam) {
      setCurrentCharacter(prev => ({
        ...prev,
        teamRecommendations: [...prev.teamRecommendations, newTeam]
      }));
      setNewTeam('');
    }
  };

  const removeTeam = (index) => {
    setCurrentCharacter(prev => ({
      ...prev,
      teamRecommendations: prev.teamRecommendations.filter((_, i) => i !== index)
    }));
  };

  const saveCharacter = () => {
    if (currentCharacter.name && currentCharacter.game) {
      setCharacters(prev => [...prev, { ...currentCharacter, id: Date.now() }]);
      setCurrentCharacter({
        name: '',
        game: '',
        element: '',
        rarity: 5,
        image: '',
        weapons: [],
        echoes: [],
        skillPriority: [],
        teamRecommendations: []
      });
      alert('Personagem salvo com sucesso!');
    } else {
      alert('Por favor, preencha pelo menos o nome e o jogo do personagem.');
    }
  };

  const loadCharacter = (character) => {
    setCurrentCharacter(character);
  };

  const deleteCharacter = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este personagem?')) {
      setCharacters(prev => prev.filter(char => char.id !== id));
    }
  };

  return (
    <div className="py-20 px-4 bg-card/50 min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Painel Administrativo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gerencie os guias de personagens e suas informações
          </p>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Criar/Editar Personagem</TabsTrigger>
            <TabsTrigger value="list">Lista de Personagens</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome do Personagem</label>
                    <Input
                      value={currentCharacter.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ex: Rover (Spectro)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Jogo</label>
                    <Select value={currentCharacter.game} onValueChange={(value) => handleInputChange('game', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o jogo" />
                      </SelectTrigger>
                      <SelectContent>
                        {games.map((game) => (
                          <SelectItem key={game} value={game}>{game}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Elemento</label>
                    <Select value={currentCharacter.element} onValueChange={(value) => handleInputChange('element', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o elemento" />
                      </SelectTrigger>
                      <SelectContent>
                        {elements.map((element) => (
                          <SelectItem key={element} value={element}>{element}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Raridade</label>
                    <Select value={currentCharacter.rarity.toString()} onValueChange={(value) => handleInputChange('rarity', parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a raridade" />
                      </SelectTrigger>
                      <SelectContent>
                        {rarities.map((rarity) => (
                          <SelectItem key={rarity} value={rarity.toString()}>{rarity}★</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL da Imagem</label>
                  <Input
                    value={currentCharacter.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="Ex: /src/assets/characters/character.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Armas Recomendadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    value={newWeapon.name}
                    onChange={(e) => setNewWeapon(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome da arma"
                  />
                  <Input
                    value={newWeapon.type}
                    onChange={(e) => setNewWeapon(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="Tipo (Ex: Sword)"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={newWeapon.recommendation}
                      onChange={(e) => setNewWeapon(prev => ({ ...prev, recommendation: e.target.value }))}
                      placeholder="Recomendação"
                    />
                    <Button onClick={addWeapon} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {currentCharacter.weapons.map((weapon, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span>{weapon.name} ({weapon.type}) - {weapon.recommendation}</span>
                      <Button onClick={() => removeWeapon(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Echoes Recomendados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    value={newEcho.name}
                    onChange={(e) => setNewEcho(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome do echo"
                  />
                  <Input
                    value={newEcho.set}
                    onChange={(e) => setNewEcho(prev => ({ ...prev, set: e.target.value }))}
                    placeholder="Set (Ex: 5-piece)"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={newEcho.recommendation}
                      onChange={(e) => setNewEcho(prev => ({ ...prev, recommendation: e.target.value }))}
                      placeholder="Recomendação"
                    />
                    <Button onClick={addEcho} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {currentCharacter.echoes.map((echo, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span>{echo.name} ({echo.set}) - {echo.recommendation}</span>
                      <Button onClick={() => removeEcho(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Prioridade de Habilidades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Ex: Resonance Skill (E)"
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {currentCharacter.skillPriority.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span>{index + 1}. {skill}</span>
                      <Button onClick={() => removeSkill(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Recomendações de Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTeam}
                    onChange={(e) => setNewTeam(e.target.value)}
                    placeholder="Ex: Rover (Spectro), Verina, Sanhua"
                  />
                  <Button onClick={addTeam} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {currentCharacter.teamRecommendations.map((team, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span>{team}</span>
                      <Button onClick={() => removeTeam(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button onClick={saveCharacter} size="lg" className="neon-glow">
                <Save className="mr-2 h-5 w-5" />
                Salvar Personagem
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character) => (
                <Card key={character.id} className="glass-effect overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src={character.image || '/placeholder-character.jpg'} 
                      alt={character.name}
                      className="w-full h-full object-cover"
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
                    <p className="text-sm text-muted-foreground">{character.game}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-2">
                    <div className="flex gap-2">
                      <Button onClick={() => loadCharacter(character)} size="sm" variant="outline" className="flex-1">
                        Editar
                      </Button>
                      <Button onClick={() => deleteCharacter(character.id)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {characters.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum personagem cadastrado ainda.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminPanel;

