import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Mail, Lock, User, ArrowRight } from 'lucide-react';

const MotionDiv = motion.div as any;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
        <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm" />
        <MotionDiv initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-paper dark:bg-[#0f0f0f] border border-black/10 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold tracking-tight text-ink dark:text-white serif-zh">{title}</h3>
              <button onClick={onClose} className="p-2 text-ink/40 dark:text-white/40 hover:text-ink dark:hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            {children}
          </div>
        </MotionDiv>
      </div>
    )}
  </AnimatePresence>
);

export const PaymentModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="开启专家权益">
    <div className="space-y-6 text-center">
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex gap-4 text-left">
        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0"><ShieldCheck className="w-6 h-6 text-white" /></div>
        <div><p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">资深专家版 / ¥299/年</p><p className="text-xs text-ink/40 dark:text-white/40">解锁 Gemini 3 Pro 深度思考与高级解析权限</p></div>
      </div>
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="relative p-3 bg-white rounded-2xl w-48 h-48 shadow-inner border border-black/5">
          {/* ↓↓↓ 重要提示：请将下方的 URL 替换为您真实的微信/支付宝收款码图片地址 ↓↓↓ */}
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeChatPay_Placeholder" 
            alt="支付码" 
            className="w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-2xl pointer-events-none">
             <span className="text-[10px] font-bold text-black/20 uppercase tracking-widest">请此处替换为您的收款码图片</span>
          </div>
        </div>
        <p className="text-xs text-ink/30 dark:text-white/30 leading-relaxed">请扫码支付，支付后请截屏发送至 <br/><span className="text-emerald-600 dark:text-emerald-400">lablabe@qq.com</span><br/>后台将在 2 小时内为您开通专家权限</p>
      </div>
      <button onClick={onClose} className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-500 transition-all">我已支付，通知客服</button>
    </div>
  </BaseModal>
);

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="欢迎加入语枢">
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 dark:text-white/20" />
          <input type="text" placeholder="教师姓名" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-11 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-ink dark:text-white" />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 dark:text-white/20" />
          <input type="email" placeholder="常用邮箱" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-11 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-ink dark:text-white" />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 dark:text-white/20" />
          <input type="password" placeholder="设置密码" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-11 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-ink dark:text-white" />
        </div>
      </div>
      <button onClick={() => { alert('注册演示：您的信息已记录，由于是演示环境，请直接在工作台体验。'); onClose(); }} className="w-full py-4 bg-emerald-600 dark:bg-white text-white dark:text-black font-black rounded-xl flex items-center justify-center gap-2 group mt-4 hover:bg-emerald-500 dark:hover:bg-emerald-50 transition-all">
        立即创建账号 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
      <p className="text-center text-[10px] text-ink/20 dark:text-white/20 px-6">点击注册即代表您同意语枢服务协议与隐私政策</p>
    </div>
  </BaseModal>
);