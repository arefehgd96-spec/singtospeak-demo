import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Search, Map, Gamepad2, MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useTranslation } from '@/components/TranslationProvider';

export default function MobileNav({ currentPage }) {
  const { t } = useTranslation();
  
  const navItems = [
    { icon: Home, label: t('home'), page: 'Home' },
    { icon: Search, label: t('explore'), page: 'Explore' },
    { icon: Map, label: 'Journey', page: 'LearningPath', bigger: true },
    { icon: Gamepad2, label: 'Games', page: 'Games' },
    { icon: MessageSquare, label: 'AI Chat', page: 'AIChat' },
  ];
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border z-40 pb-safe shadow-lg">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          return (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 transition-colors rounded-lg",
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", item.bigger && "h-[1.4375rem] w-[1.4375rem] stroke-[2.5]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}