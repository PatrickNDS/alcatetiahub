import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Calculator, Zap, Shield, Heart, Swords } from 'lucide-react';

const BuildCalculator = ({ character }) => {
  const [build, setBuild] = useState({
    level: 90,
    weapon: {
      name: '',
      level: 90,
      baseAttack: 0,
      subStat: '',
      subStatValue: 0
    },
    echoes: {
      mainStats: {
        echo1: 'ATK%',
        echo2: 'ATK%',
        echo3: 'ATK%',
        echo4: 'ATK%',
        echo5: 'ATK%'
      },
      subStats: {
        critRate: 0,
        critDamage: 0,
        attack: 0,
        attackPercent: 0,
        elementalDamage: 0
      }
    },
    stats: {
      baseAttack: 0,
      totalAttack: 0,
      critRate: 5,
      critDamage: 150,
      elementalDamage: 0
    }
  });

  const [calculatedDamage, setCalculatedDamage] = useState({
    normalAttack: 0,
    criticalAttack: 0,
    skillDamage: 0,
    ultimateDamage: 0
  });

  const weapons = [
    { name: 'Emerald of Genesis', baseAttack: 587, subStat: 'Crit Rate', subStatValue: 22.1 },
    { name: 'Lunar Eclipse', baseAttack: 500, subStat: 'ATK%', subStatValue: 41.3 },
    { name: 'Sword #18', baseAttack: 412, subStat: 'Crit Damage', subStatValue: 48.6 },
    { name: 'Commando of Conviction', baseAttack: 337, subStat: 'ATK%', subStatValue: 55.1 }
  ];

  const mainStatOptions = ['ATK%', 'Elemental DMG%', 'Crit Rate%', 'Crit DMG%', 'Energy Regen%'];

  useEffect(() => {
    calculateStats();
  }, [build]);

  const calculateStats = () => {
    const selectedWeapon = weapons.find(w => w.name === build.weapon.name);
    if (!selectedWeapon) return;

    // Cálculo básico de stats
    const baseAttack = 300; // Base do personagem no nível 90
    const weaponAttack = selectedWeapon.baseAttack;
    const echoAttackFlat = build.echoes.subStats.attack;
    const echoAttackPercent = build.echoes.subStats.attackPercent;
    
    const totalAttack = (baseAttack + weaponAttack + echoAttackFlat) * (1 + echoAttackPercent / 100);
    
    let critRate = build.stats.critRate + build.echoes.subStats.critRate;
    let critDamage = build.stats.critDamage + build.echoes.subStats.critDamage;
    
    // Adicionar stats da arma
    if (selectedWeapon.subStat === 'Crit Rate') {
      critRate += selectedWeapon.subStatValue;
    } else if (selectedWeapon.subStat === 'Crit Damage') {
      critDamage += selectedWeapon.subStatValue;
    }

    const elementalDamage = build.echoes.subStats.elementalDamage;

    // Cálculo de dano
    const baseDamageMultiplier = 1 + (elementalDamage / 100);
    const normalAttackDamage = totalAttack * 1.2 * baseDamageMultiplier; // 120% de scaling
    const criticalAttackDamage = normalAttackDamage * (1 + critDamage / 100);
    const skillDamage = totalAttack * 2.5 * baseDamageMultiplier; // 250% de scaling
    const ultimateDamage = totalAttack * 4.0 * baseDamageMultiplier; // 400% de scaling

    setBuild(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        baseAttack: baseAttack,
        totalAttack: Math.round(totalAttack),
        critRate: Math.round(critRate * 10) / 10,
        critDamage: Math.round(critDamage * 10) / 10,
        elementalDamage: Math.round(elementalDamage * 10) / 10
      }
    }));

    setCalculatedDamage({
      normalAttack: Math.round(normalAttackDamage),
      criticalAttack: Math.round(criticalAttackDamage),
      skillDamage: Math.round(skillDamage),
      ultimateDamage: Math.round(ultimateDamage)
    });
  };

  const handleWeaponChange = (weaponName) => {
    const selectedWeapon = weapons.find(w => w.name === weaponName);
    setBuild(prev => ({
      ...prev,
      weapon: {
        ...prev.weapon,
        name: weaponName,
        baseAttack: selectedWeapon?.baseAttack || 0,
        subStat: selectedWeapon?.subStat || '',
        subStatValue: selectedWeapon?.subStatValue || 0
      }
    }));
  };

  const handleEchoSubStatChange = (stat, value) => {
    setBuild(prev => ({
      ...prev,
      echoes: {
        ...prev.echoes,
        subStats: {
          ...prev.echoes.subStats,
          [stat]: parseFloat(value) || 0
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Calculadora de Build
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Seleção de Arma */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Arma</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Arma</label>
                <Select value={build.weapon.name} onValueChange={handleWeaponChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma arma" />
                  </SelectTrigger>
                  <SelectContent>
                    {weapons.map((weapon) => (
                      <SelectItem key={weapon.name} value={weapon.name}>
                        {weapon.name} ({weapon.baseAttack} ATK)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nível da Arma</label>
                <Input
                  type="number"
                  min="1"
                  max="90"
                  value={build.weapon.level}
                  onChange={(e) => setBuild(prev => ({
                    ...prev,
                    weapon: { ...prev.weapon, level: parseInt(e.target.value) || 1 }
                  }))}
                />
              </div>
            </div>
            {build.weapon.name && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>{build.weapon.name}</strong> - {build.weapon.baseAttack} ATK Base
                </p>
                <p className="text-sm text-muted-foreground">
                  {build.weapon.subStat}: +{build.weapon.subStatValue}%
                </p>
              </div>
            )}
          </div>

          {/* Echoes Sub-Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sub-Stats dos Echoes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Crit Rate (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={build.echoes.subStats.critRate}
                  onChange={(e) => handleEchoSubStatChange('critRate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Crit Damage (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="300"
                  value={build.echoes.subStats.critDamage}
                  onChange={(e) => handleEchoSubStatChange('critDamage', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ATK Flat</label>
                <Input
                  type="number"
                  min="0"
                  value={build.echoes.subStats.attack}
                  onChange={(e) => handleEchoSubStatChange('attack', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ATK% (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={build.echoes.subStats.attackPercent}
                  onChange={(e) => handleEchoSubStatChange('attackPercent', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Elemental DMG (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={build.echoes.subStats.elementalDamage}
                  onChange={(e) => handleEchoSubStatChange('elementalDamage', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Finais */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Stats Finais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Swords className="h-4 w-4" />
                ATK Total:
              </span>
              <Badge variant="secondary">{build.stats.totalAttack}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Crit Rate:</span>
              <Badge variant="secondary">{build.stats.critRate}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Crit Damage:</span>
              <Badge variant="secondary">{build.stats.critDamage}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Elemental DMG:</span>
              <Badge variant="secondary">{build.stats.elementalDamage}%</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Dano Calculado */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Dano Estimado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Ataque Normal:</span>
              <Badge>{calculatedDamage.normalAttack.toLocaleString()}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Ataque Crítico:</span>
              <Badge variant="destructive">{calculatedDamage.criticalAttack.toLocaleString()}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Habilidade:</span>
              <Badge className="bg-blue-500">{calculatedDamage.skillDamage.toLocaleString()}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Ultimate:</span>
              <Badge className="bg-purple-500">{calculatedDamage.ultimateDamage.toLocaleString()}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dicas de Otimização */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Dicas de Otimização</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>Crit Rate ideal:</strong> Entre 60-80% para consistência</p>
            <p>• <strong>Crit Damage:</strong> Quanto maior, melhor (200%+ é excelente)</p>
            <p>• <strong>ATK%:</strong> Importante, mas não negligencie crit stats</p>
            <p>• <strong>Elemental DMG:</strong> Muito eficiente, priorize quando possível</p>
            <p>• <strong>Ratio Crit:</strong> Tente manter 1:2 (Rate:Damage) para otimização</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildCalculator;

