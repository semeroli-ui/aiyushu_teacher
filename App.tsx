
import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureGrid } from './components/FeatureGrid';
import { AIPortal } from './components/AIPortal';
import { Footer } from './components/Footer';
import { PaymentModal, AuthModal } from './components/Modals';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const partners = [
    { name: '国家教育云', url: 'https://www.smartedu.cn/' },
    { name: '人教数字', url: 'https://jc.pep.com.cn/' },
    { name: '国家智慧教育网', url: 'https://basic.smartedu.cn/' },
    { name: '北京师范大学', url: 'http://www.bnu.edu.cn/' },
    { name: '知网教育', url: 'https://www.cnki.net/' }
  ];

  return (
    <div className="min-h-screen bg-paper dark:bg-[#050505] text-ink dark:text-white transition-colors duration-300 selection:bg-emerald-500/30">
      {/* 导航栏点击触发注册 */}
      <Navbar onAuthClick={() => setIsAuthOpen(true)} />
      
      <main>
        {/* 主视觉区域点击触发注册 */}
        <Hero onStartClick={() => setIsAuthOpen(true)} />
        
        <section className="py-12 border-y border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-black/20 dark:text-white/20 font-bold mb-10">已助力全国 500+ 所学校建设智慧语文库</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              {partners.map(partner => (
                <a 
                  key={partner.name} 
                  href={partner.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl font-bold tracking-tight opacity-30 grayscale contrast-125 hover:opacity-100 hover:grayscale-0 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 cursor-pointer"
                  title={`访问 ${partner.name} 官网`}
                >
                  {partner.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        <FeatureGrid />
        
        <AIPortal />

        <section id="pricing" className="py-24 px-6 bg-paper dark:bg-[#050505]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 serif-zh">灵活的资源获取方案</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* 免费版 */}
              <div className="p-8 rounded-3xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] flex flex-col group hover:border-black/10 dark:hover:border-white/10 transition-all shadow-sm">
                <h3 className="text-lg font-semibold mb-2">教学体验版</h3>
                <div className="text-3xl font-bold mb-6">免费</div>
                <ul className="space-y-3 mb-8 text-left text-sm text-black/40 dark:text-white/40 flex-1">
                  <li>• 基础文本解析</li>
                  <li>• 社区资源共享</li>
                  <li>• 每日有限额度</li>
                </ul>
                <button onClick={() => setIsAuthOpen(true)} className="w-full py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all text-sm font-bold mt-auto">
                  立即加入
                </button>
              </div>
              
              {/* 专家版 */}
              <div className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.05] flex flex-col relative scale-105 shadow-xl shadow-emerald-900/10">
                <div className="absolute top-0 right-0 bg-emerald-600 dark:bg-emerald-500 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase text-white">个人首选</div>
                <h3 className="text-lg font-semibold mb-2">资深专家版</h3>
                <div className="text-3xl font-bold mb-6">¥299<span className="text-sm font-normal text-black/40 dark:text-white/40">/年</span></div>
                <ul className="space-y-3 mb-8 text-left text-sm text-black/70 dark:text-white/70 font-medium flex-1">
                  <li>✓ 独占专家级思考能力</li>
                  <li>✓ 文言文/诗词深度鉴赏</li>
                  <li>✓ 无限次数资源导出</li>
                </ul>
                <button onClick={() => setIsPaymentOpen(true)} className="w-full py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all font-bold shadow-lg shadow-emerald-600/20">
                  立即订阅
                </button>
              </div>
              
              {/* 定制版 */}
              <div className="p-8 rounded-3xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] flex flex-col group hover:border-black/10 dark:hover:border-white/10 transition-all shadow-sm">
                <h3 className="text-lg font-semibold mb-2">学校定制版</h3>
                <div className="text-3xl font-bold mb-6">咨询定制</div>
                <ul className="space-y-3 mb-8 text-left text-sm text-black/40 dark:text-white/40 flex-1">
                  <li>• 专属校本资源库</li>
                  <li>• 多端同步协作系统</li>
                  <li>• 线下金牌教师培训</li>
                </ul>
                <button onClick={() => window.location.href = 'mailto:lablabe@qq.com'} className="w-full py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all font-bold mt-auto">
                  联系我们
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-white/10 text-center relative overflow-hidden group">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 relative z-10 text-white">开启智慧语文新篇章</h2>
            <button onClick={() => setIsAuthOpen(true)} className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all text-lg shadow-2xl relative z-10">
              免费注册账号
            </button>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* 支付模态框 */}
      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
      {/* 注册模态框 */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
