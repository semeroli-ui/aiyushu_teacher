
interface PagesFunction {
  (context: {
    request: Request;
    params: Record<string, string | string[]>;
    env: Record<string, any>;
  }): Promise<Response> | Response;
}

export const onRequest: PagesFunction = async (context) => {
  const { request, params, env } = context;
  
  // --- 安全加固：来源校验 ---
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');
  
  // 允许本地开发调试 (localhost) 以及你自己的 Pages 域名
  // 线上环境部署后，建议将此处的逻辑锁定为你具体的域名
  const isAllowedOrigin = referer && (
    referer.includes('localhost') || 
    referer.includes('127.0.0.1') ||
    (host && referer.includes(host))
  );

  if (!isAllowedOrigin) {
    return new Response(JSON.stringify({ 
      error: 'Unauthorized access', 
      message: '语枢代理服务：拒绝非法外部调用。' 
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // --- 安全加固结束 ---

  // 1. 解析目标路径
  const path = Array.isArray(params.path) ? params.path.join('/') : params.path;
  
  // 2. 构造指向 Google 的真实 URL
  const googleUrl = new URL(`https://generativelanguage.googleapis.com/${path}`);
  
  // 3. 复制查询参数
  const clientUrl = new URL(request.url);
  clientUrl.searchParams.forEach((value, key) => {
    googleUrl.searchParams.set(key, value);
  });

  // 4. 安全核心：注入 API_KEY
  if (!googleUrl.searchParams.has('key') && env.API_KEY) {
    googleUrl.searchParams.set('key', env.API_KEY);
  }

  // 5. 过滤并复制 Headers
  const filteredHeaders = new Headers();
  const forbiddenHeaders = ['host', 'cf-connecting-ip', 'cf-ray', 'cf-visitor', 'x-forwarded-for', 'x-real-ip', 'referer'];
  
  request.headers.forEach((value, key) => {
    if (!forbiddenHeaders.includes(key.toLowerCase())) {
      filteredHeaders.set(key, value);
    }
  });

  // 6. 转发请求
  try {
    const modifiedRequest = new Request(googleUrl.toString(), {
      method: request.method,
      headers: filteredHeaders,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.clone().blob() : null,
      redirect: 'follow',
    });

    const response = await fetch(modifiedRequest);
    const newResponse = new Response(response.body, response);
    
    // 跨域支持
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return newResponse;
  } catch (err) {
    return new Response(JSON.stringify({ 
      error: '语枢代理服务转发失败',
      details: err instanceof Error ? err.message : String(err)
    }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
