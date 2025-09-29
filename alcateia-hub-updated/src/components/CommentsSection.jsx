import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Avatar } from '@/components/ui/avatar.jsx';
import { Star, MessageCircle, ThumbsUp, ThumbsDown, Send } from 'lucide-react';

const CommentsSection = ({ characterId, characterName }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'GamerPro123',
      avatar: '/placeholder-avatar.jpg',
      rating: 5,
      comment: 'Excelente guia! As builds recomendadas funcionaram perfeitamente no meu Rover. Consegui aumentar muito o dano seguindo essas dicas.',
      date: '2024-09-20',
      likes: 12,
      dislikes: 1,
      helpful: true
    },
    {
      id: 2,
      user: 'WuWaFan',
      avatar: '/placeholder-avatar.jpg',
      rating: 4,
      comment: 'Muito bom o guia, mas acho que poderia ter mais informações sobre rotação de habilidades. No geral, muito útil!',
      date: '2024-09-19',
      likes: 8,
      dislikes: 0,
      helpful: true
    },
    {
      id: 3,
      user: 'F2PPlayer',
      avatar: '/placeholder-avatar.jpg',
      rating: 5,
      comment: 'Perfeito para jogadores F2P! As alternativas de armas 4* são muito boas. Obrigado por incluir opções acessíveis.',
      date: '2024-09-18',
      likes: 15,
      dislikes: 0,
      helpful: true
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const averageRating = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
  const totalComments = comments.length;

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // Simular envio (aqui você integraria com o backend)
    setTimeout(() => {
      const comment = {
        id: comments.length + 1,
        user: 'Usuário Anônimo',
        avatar: '/placeholder-avatar.jpg',
        rating: newRating,
        comment: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        dislikes: 0,
        helpful: false
      };

      setComments(prev => [comment, ...prev]);
      setNewComment('');
      setNewRating(5);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleLike = (commentId) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1, helpful: true }
        : comment
    ));
  };

  const handleDislike = (commentId) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, dislikes: comment.dislikes + 1 }
        : comment
    ));
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'text-yellow-500 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => onRatingChange(star) : undefined}
          />
        ))}
        {!interactive && (
          <span className="ml-2 text-sm text-muted-foreground">
            ({rating.toFixed(1)})
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Resumo de Avaliações */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Avaliações da Comunidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-primary">
                {averageRating.toFixed(1)}
              </div>
              <div>
                {renderStars(averageRating)}
                <p className="text-sm text-muted-foreground mt-1">
                  {totalComments} avaliações
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {averageRating >= 4.5 ? 'Excelente' : 
               averageRating >= 4.0 ? 'Muito Bom' : 
               averageRating >= 3.0 ? 'Bom' : 'Regular'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Novo Comentário */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Deixe sua Avaliação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Sua Avaliação</label>
            {renderStars(newRating, true, setNewRating)}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Comentário</label>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={`Compartilhe sua experiência com ${characterName}...`}
              rows={4}
            />
          </div>
          <Button 
            onClick={handleSubmitComment}
            disabled={isSubmitting || !newComment.trim()}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
          </Button>
        </CardContent>
      </Card>

      {/* Lista de Comentários */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Comentários ({totalComments})</h3>
        {comments.map((comment) => (
          <Card key={comment.id} className="glass-effect">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <div className="w-full h-full bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {comment.user.charAt(0).toUpperCase()}
                  </div>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{comment.user}</p>
                      <div className="flex items-center gap-2">
                        {renderStars(comment.rating)}
                        <span className="text-sm text-muted-foreground">
                          {comment.date}
                        </span>
                      </div>
                    </div>
                    {comment.helpful && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Útil
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{comment.comment}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(comment.id)}
                      className="text-muted-foreground hover:text-green-600"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDislike(comment.id)}
                      className="text-muted-foreground hover:text-red-600"
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {comment.dislikes}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas de Engajamento */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Estatísticas do Guia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{totalComments}</div>
              <p className="text-sm text-muted-foreground">Avaliações</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {comments.reduce((acc, c) => acc + c.likes, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Curtidas</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(averageRating * 20)}%
              </div>
              <p className="text-sm text-muted-foreground">Aprovação</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {comments.filter(c => c.helpful).length}
              </div>
              <p className="text-sm text-muted-foreground">Úteis</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentsSection;

