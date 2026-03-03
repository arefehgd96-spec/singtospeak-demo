import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Play, Heart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import DownloadButton from '@/components/downloads/DownloadButton';
import { useTranslation } from '@/components/TranslationProvider';

export default function SongCard({ 
  song, 
  onClick, 
  isPlaying = false,
  isFavorite = false,
  variant = 'default' 
}) {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {}
    };
    loadUser();
  }, []);

  const difficultyColors = {
    beginner: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    intermediate: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    advanced: 'bg-zinc-800 text-zinc-400 border-zinc-700'
  };

  const languageFlags = {
    german: '🇩🇪',
    english: '🇬🇧'
  };

  if (variant === 'compact') {
    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        className={cn(
          "flex items-center gap-4 p-4 rounded-2xl transition-all active:bg-zinc-800/70",
          isPlaying ? "bg-emerald-500/10" : "bg-zinc-900/50"
        )}
      >
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer" onClick={onClick}>
          {song.cover_image ? (
            <img src={song.cover_image} alt={song.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-700" />
          )}
          <div className={cn(
            "absolute inset-0 bg-black/40 flex items-center justify-center",
            isPlaying && "opacity-100"
          )}>
            <Play className={cn("h-5 w-5 text-white", isPlaying && "fill-white")} />
          </div>
        </div>
        
        <div className="min-w-0 flex-1 cursor-pointer" onClick={onClick}>
          <h4 className="text-white font-medium text-base truncate mb-1">{song.title}</h4>
          <p className="text-zinc-400 text-sm truncate">{song.artist}</p>
        </div>

        <DownloadButton itemType="song" itemId={song.id} user={user} size="icon" song={song} />
        <span className="text-2xl">{languageFlags[song.language]}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-zinc-800">
        {song.cover_image ? (
          <img 
            src={song.cover_image} 
            alt={song.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Play className="h-5 w-5 text-white ml-1" fill="white" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4", difficultyColors[song.difficulty])}>
            {t(song.difficulty)}
          </Badge>
          <span className="text-2xl drop-shadow-lg">{languageFlags[song.language]}</span>
        </div>

        {/* Favorite */}
        {isFavorite && (
          <div className="absolute bottom-3 right-3">
            <Heart className="h-4 w-4 text-emerald-400 fill-emerald-400" />
          </div>
        )}
      </div>

      <div className="px-1">
        <h3 className="text-white font-medium text-sm truncate">{song.title}</h3>
        <p className="text-zinc-400 text-xs truncate">{song.artist}</p>
      </div>
    </motion.div>
  );
}