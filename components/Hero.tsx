import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const MotionDiv = motion.div as any;

interface HeroProps {
  onStartClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full -z-10" />
      <div className="max-w-7xl mx-auto text-center">
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.2] serif-zh">
            让每一堂语文课 <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-200 bg-clip-text text-transparent">都充满智慧与灵感</span>
          </h1>
          <p className="text-lg md:text-xl text-ink/60 dark:text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            语枢 AI 深度理解语文核心素养。从古诗词解析到整本书阅读，为您打造一站式教学资源建设引擎。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={onStartClick}
              className="w-full sm:w-auto px-10 py-4 bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all hover:scale-105 shadow-xl shadow-emerald-600/20"
            >
              开启智能备课 <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-ink dark:text-white font-bold rounded-2xl hover:bg-black/10 dark:hover:bg-white/10 transition-all">
              查看教学案例
            </button>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};