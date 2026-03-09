
import React from 'react';
import { Library, Github, Mail, Globe, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Library className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-ink dark:text-white serif-zh">语枢 AI</span>
            </div>
            <p className="text-ink/40 dark:text-white/40 text-sm leading-relaxed mb-6">
              用技术致敬人文，致力于成为最懂中国语文老师的 AI 教学伙伴。
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-ink/60 dark:text-white/60 hover:text-ink dark:hover:text-white" title="官方网站">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-ink/60 dark:text-white/60 hover:text-ink dark:hover:text-white" title="教学资源库">
                <BookOpen className="w-4 h-4" />
              </a>
              <a href="mailto:lablabe@qq.com" className="p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-ink/60 dark:text-white/60 hover:text-ink dark:hover:text-white" title="发送邮件">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-ink/30 dark:text-white/30">教学工具</h4>
            <ul className="space-y-4 text-sm text-ink/60 dark:text-white/60">
              <li><a href="#" className="hover:text-ink dark:hover:text-white transition-colors">古诗词解析</a></li>
              <li><a href="#" className="hover:text-ink dark:hover:text-white transition-colors">智能备课系统</a></li>
              <li><a href="#" className="hover:text-ink dark:hover:text-white transition-colors">作文批改中心</a></li>
              <li><a href="#" className="hover:text-ink dark:hover:text-white transition-colors">名著导读工具</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-ink/30 dark:text-white/30">资源社区</h4>
            <ul className="space-y-4 text-sm text-ink/60 dark:text-white/60">
              <li><a href="https://www.51jiaoxi.com/" target="_blank" rel="noopener noreferrer" className="hover:text-ink dark:hover:text-white transition-colors">精品教案</a></li>
              <li><a href="https://www.cnki.net/" target="_blank" rel="noopener noreferrer" className="hover:text-ink dark:hover:text-white transition-colors">教学论文</a></li>
              <li><a href="https://www.eduyun.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-ink dark:hover:text-white transition-colors">名师工作室</a></li>
              <li><a href="https://wp.pep.com.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-ink dark:hover:text-white transition-colors">课标解读</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-ink/30 dark:text-white/30">联系语枢</h4>
            <div className="mb-6">
              <p className="text-sm text-ink/40 dark:text-white/40 mb-2">如有商务合作或技术反馈，请联系：</p>
              <a href="mailto:lablabe@qq.com" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 font-medium text-sm transition-colors border-b border-emerald-600/20 dark:border-emerald-400/20 hover:border-emerald-500 dark:hover:border-emerald-300">
                lablabe@qq.com
              </a>
            </div>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="订阅教学周刊" 
                className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-xs flex-1 focus:outline-none focus:border-emerald-500/50 text-ink dark:text-white"
              />
              <button className="p-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
                <Mail className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink/30 dark:text-white/30">
          <p>© 2026 语枢教育科技有限公司 版权所有.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-ink dark:hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-ink dark:hover:text-white transition-colors">服务协议</a>
            <a href="#" className="hover:text-ink dark:hover:text-white transition-colors">京ICP备XXXXXXXX号</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
