
import { GoogleGenAI } from "@google/genai";

export type ToolType = 'general' | 'ancient' | 'essay' | 'lesson' | 'reading' | 'poetry';

const TOOL_PROMPTS: Record<ToolType, string> = {
  general: "你是一位资深的语文教学专家。请为老师提供专业的建议、灵感或资源。",
  ancient: "你是一位古典文献学专家。请对输入的文言文进行精准翻译（字对字与意译）、重点实词解析、虚词用法说明，并提取文中的文化常识与艺术特色。",
  poetry: "你是一位精通中国古典诗词的文学评论家与教育专家。请对输入的诗词进行深度鉴赏，重点分析：1. 意境与意象；2. 修辞手法与炼字艺术；3. 作者生平背景及创作时节；4. 核心情感与哲学内涵的深度表达。",
  essay: "你是一位作文阅卷组组长。请从‘语言表达、立意深度、结构逻辑、素材运用’四个维度批改作文。如果是图片输入，请先识别图片中的文字内容。先给出综合评分（百分制），然后列出3个闪光点和2个改进建议，最后提供一段润色后的范文片段。",
  lesson: "你是一位特级语文教师。请根据输入的课文内容或题目，编写一份符合现代教育要求的教案。教案须包含：1. 教学目标（含核心素养）；2. 教学重难点；3. 教学步骤（导入、初读、研读、总结）；4. 课后作业设计。",
  reading: "你是一位阅读推广人。请针对特定书籍或文章，梳理人物关系图谱、核心情节脉络，并设计3个具有思维挑战性的深度探究问题。"
};

export class GeminiService {
  /**
   * 生成教学资源
   * @param prompt 文本提示词
   * @param type 工具类型
   * @param isPro 是否开启专家模式
   * @param imagesBase64 (新增) 图片的 Base64 字符串数组，包含 data:image/... 前缀
   */
  async generateTeachingResource(prompt: string, type: ToolType = 'general', isPro: boolean = false, imagesBase64?: string[]) {
    try {
      const modelName = isPro ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
      const systemInst = TOOL_PROMPTS[type] + " 请使用清晰的 Markdown 格式输出。";

      // 统一使用代理转发
      const proxyUrl = `/api/v1beta/models/${modelName}:generateContent`;
      
      // 构建内容部分 (Multimodal Payload)
      const contentParts: any[] = [];
      
      // 如果有图片，处理图片数据
      if (imagesBase64 && imagesBase64.length > 0) {
        imagesBase64.forEach(img => {
          // 去除 Base64 头部前缀 (例如 "data:image/png;base64,")
          const base64Data = img.split(',')[1];
          // 简单判断类型，默认 jpeg，实际可从 base64 头解析
          const mimeType = img.match(/data:([^;]+);/)?.[1] || 'image/jpeg';
          
          contentParts.push({
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          });
        });
      }

      // 添加文本提示词 (如果用户只发图片没写字，默认加一句提示)
      const textPrompt = prompt.trim() || (imagesBase64 && imagesBase64.length > 0 ? "请分析这些图片的内容。" : "");
      contentParts.push({ text: textPrompt });

      const payload: any = {
        contents: [{ parts: contentParts }],
        system_instruction: { parts: [{ text: systemInst }] },
        generationConfig: { 
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      };

      // 专家模式开启思维预算
      if (isPro) {
        payload.generationConfig.thinkingConfig = { thinkingBudget: 32768 };
      }

      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.error?.message?.includes("key") || response.status === 403) return "ERROR_KEY_INVALID";
        throw new Error(data.error?.message || '请求失败');
      }

      return data.candidates?.[0]?.content?.parts?.[0]?.text || "暂无内容。";
    } catch (error: any) {
      console.error("Gemini Error:", error);
      return "语枢智能服务暂时无法处理，请检查您的网络或稍后再试。";
    }
  }
}

export const gemini = new GeminiService();
