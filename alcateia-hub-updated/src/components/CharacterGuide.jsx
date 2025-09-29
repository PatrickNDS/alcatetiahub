import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Star, Zap, Shield, Swords, Users, ArrowLeft, Calculator, MessageCircle } from 'lucide-react';
import BuildCalculator from './BuildCalculator.jsx';
import CommentsSection from './CommentsSection.jsx';

const characterData = {
  'wuthering-waves': {
    name: 'Rover (Spectro)',
    game: 'Wuthering Waves',
    element: 'Spectro',
    rarity: 5,
    image: '/src/assets/characters/gacha_character_1.jpg',
    description: 'O protagonista de Wuthering Waves, capaz de ressoar com diferentes elementos. Versátil e poderoso, especialmente na forma Spectro.',
    weapons: [
      { name: 'Emerald of Genesis', type: 'Sword', recommendation: 'Best in Slot - Máximo dano crítico' },
      { name: 'Lunar Eclipse', type: 'Sword', recommendation: 'Excelente alternativa F2P' },
      { name: 'Sword #18', type: 'Sword', recommendation: 'Boa opção para Crit Damage' },
      { name: 'Commando of Conviction', type: 'Sword', recommendation: 'Alternativa 4★ acessível' }
    ],
    echoes: [
      { name: 'Void Thunder', set: '5-piece', recommendation: 'Melhor para Spectro DMG - +30% Spectro DMG' },
      { name: 'Lingering Tunes', set: '2-piece', recommendation: 'ATK% +22% - Boa para híbrido' },
      { name: 'Sierra Gale', set: '2-piece', recommendation: 'Aero DMG +22% - Para builds específicas' }
    ],
    skillPriority: [
      { skill: 'Resonance Skill (E)', priority: 1, description: 'Máxima prioridade - Principal fonte de dano' },
      { skill: 'Basic Attack (LMB)', priority: 2, description: 'Segunda prioridade - Combo essencial' },
      { skill: 'Resonance Liberation (Q)', priority: 3, description: 'Ultimate poderoso - Terceira prioridade' },
      { skill: 'Intro Skill', priority: 4, description: 'Útil para rotação de personagens' },
      { skill: 'Outro Skill', priority: 5, description: 'Menor prioridade - Buff para próximo personagem' }
    ],
    teamRecommendations: [
      { 
        team: 'Rover (Spectro) + Verina + Sanhua', 
        role: 'DPS Principal',
        description: 'Time balanceado com heal e suporte. Verina oferece cura e buffs, Sanhua fornece Glacio DMG.' 
      },
      { 
        team: 'Rover (Spectro) + Yangyang + Mortefi', 
        role: 'Elemental Synergy',
        description: 'Foco em reações elementais. Yangyang para Aero, Mortefi para Fusion DMG.' 
      },
      { 
        team: 'Rover (Spectro) + Baizhi + Chixia', 
        role: 'F2P Friendly',
        description: 'Time acessível para iniciantes. Baizhi como healer, Chixia como sub-DPS.' 
      }
    ],
    stats: {
      baseAttack: 337,
      baseHP: 12405,
      baseDef: 1165
    }
  }
};

function CharacterGuide() {
  const { game, characterName } = useParams();
  const navigate = useNavigate();
  const character = characterData[game];

  if (!character) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Personagem não encontrado</h2>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Início
        </Button>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-card/50 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Guia Completo: {character.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {character.description}
            </p>
          </div>
        </div>

        {/* Character Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Card className="glass-effect overflow-hidden">
              <img 
                src={character.image} 
                alt={character.name}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = '/src/assets/characters/gacha_character_1.jpg';
                }}
              />
              <CardHeader>
                <CardTitle className="text-2xl">{character.name}</CardTitle>
                <p className="text-muted-foreground">{character.game}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="bg-yellow-500 text-black">
                    {character.rarity}★
                  </Badge>
                  <Badge className="bg-primary">
                    {character.element}
                  </Badge>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ATK Base:</span>
                    <span className="font-semibold">{character.stats.baseAttack}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HP Base:</span>
                    <span className="font-semibold">{character.stats.baseHP.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DEF Base:</span>
                    <span className="font-semibold">{character.stats.baseDef}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="builds" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="builds" className="flex items-center gap-2">
                  <Swords className="h-4 w-4" />
                  Builds
                </TabsTrigger>
                <TabsTrigger value="calculator" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Calculadora
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Habilidades
                </TabsTrigger>
                <TabsTrigger value="teams" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Times
                </TabsTrigger>
                <TabsTrigger value="comments" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Avaliações
                </TabsTrigger>
              </TabsList>

              <TabsContent value="builds" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-effect">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Swords className="h-5 w-5 text-primary" />
                        Armas Recomendadas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {character.weapons.map((weapon, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{weapon.name}</h4>
                            <Badge variant="outline">{weapon.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{weapon.recommendation}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="glass-effect">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Echoes Recomendados
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {character.echoes.map((echo, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{echo.name}</h4>
                            <Badge variant="outline">{echo.set}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{echo.recommendation}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="calculator" className="mt-6">
                <BuildCalculator character={character} />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Prioridade de Habilidades
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {character.skillPriority.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                        <Badge className="bg-primary text-primary-foreground min-w-[2rem] h-8 flex items-center justify-center">
                          {item.priority}
                        </Badge>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{item.skill}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teams" className="mt-6">
                <div className="space-y-6">
                  {character.teamRecommendations.map((teamRec, index) => (
                    <Card key={index} className="glass-effect">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            {teamRec.team}
                          </span>
                          <Badge variant="secondary">{teamRec.role}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{teamRec.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <CommentsSection 
                  characterId={game} 
                  characterName={character.name} 
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CharacterGuide;

