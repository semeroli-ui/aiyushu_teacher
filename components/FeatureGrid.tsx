
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Scroll, PenTool, ClipboardCheck, Sparkles, Map } from 'lucide-react';

// Use a type-casted motion.div to resolve property 'initial' does not exist error
const MotionDiv = motion.div as any;

const features = [
  {
    title: "文言文智慧译注",
    description: "一键获取精准翻译、实词虚词解析及文化背景，显著降低文言文备课难度。",
    icon: <Scroll className="w-6 h-6 text-orange-400" />,
    className: "md:col-span-2"
  },
  {
    title: "创意作文批改",
    description: "多维度智能评分，提供极具温情的启发式评语与润色建议。",
    icon: <PenTool className="w-6 h-6 text-pink-400" />,
    className: "md:col-span-1"
  },
  {
    title: "整本书阅读导图",
    description: "AI 快速梳理长篇名著的人物关系、情节脉络，自动生成探究性问题。",
    icon: <Map className="w-6 h-6 text-blue-400" />,
    className: "md:col-span-1"
  },
  {
    title: "智能练习设计",
    description: "根据教材文本自动生成高质量阅读理解、基础知识测试卷。",
    icon: <ClipboardCheck className="w-6 h-6 text-emerald-400" />,
    className: "md:col-span-2"
  }
];

export const FeatureGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 bg-paper dark:bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 serif-zh">全方位的 <span className="text-emerald-600 dark:text-emerald-500">教学资源生产力</span></h2>
          <p className="text-ink/60 dark:text-white/60 max-w-2xl mx-auto">为语文老师量身打造的 AI 套件，让您从琐碎的事务中解脱，回归教学艺术本质。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <MotionDiv
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-3xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] hover:bg-white/80 dark:hover:bg-white/[0.04] transition-all group shadow-sm dark:shadow-none ${feature.className}`}
            >
              <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 serif-zh">{feature.title}</h3>
              <p className="text-ink/50 dark:text-white/50 leading-relaxed">{feature.description}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};
