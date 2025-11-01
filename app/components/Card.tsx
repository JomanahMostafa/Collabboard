import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = true, children, ...props }, ref) => {
    const variants = {
      default: 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm',
      glass: 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/30 dark:border-cyan-500/10 shadow-xl shadow-cyan-500/5',
      gradient: 'bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 dark:from-cyan-950/30 dark:via-teal-950/30 dark:to-emerald-950/30 border border-cyan-200/50 dark:border-cyan-800/30 shadow-lg',
    };

    const content = (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl p-6 shadow-lg transition-all duration-300',
          variants[variant],
          hover && 'hover:shadow-xl hover:scale-[1.02]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (hover) {
      return (
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          {content}
        </motion.div>
      );
    }

    return content;
  }
);

Card.displayName = 'Card';

