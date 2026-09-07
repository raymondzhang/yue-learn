/* =========================================================
   Router v2 — 轻量 Hash-based 路由
   ========================================================= */
const Router = {
  routes: {},
  currentRoute: null,
  currentParams: {},

  init() {
    window.addEventListener('hashchange', () => this._handle());
    // 如果无 hash，默认跳首页
    if (!window.location.hash) {
      window.location.hash = '#/home';
    } else {
      this._handle();
    }
  },

  /** 注册路由 */
  on(path, handler) {
    this.routes[path] = handler;
    return this;
  },

  /** 导航 */
  navigate(path, params = {}) {
    this.currentParams = params;
    if (path.startsWith('#')) path = path.slice(1);
    window.location.hash = '#' + path;
  },

  /** 获取当前参数 */
  getParams() {
    return this.currentParams;
  },

  /** 处理 hash 变化 */
  _handle() {
    const hash = window.location.hash.slice(1) || '/home';
    // 解析路径和查询参数
    const [path, query] = hash.split('?');
    const params = { ...this.currentParams };
    if (query) {
      query.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
      });
    }
    this.currentParams = params;

    // 尝试匹配路由（支持动态参数 :id）
    let handler = null;
    for (const [pattern, fn] of Object.entries(this.routes)) {
      const regex = this._patternToRegex(pattern);
      const match = path.match(regex);
      if (match) {
        // 提取命名参数
        const keys = (pattern.match(/:\w+/g) || []).map(k => k.slice(1));
        keys.forEach((key, i) => {
          params[key] = match[i + 1];
        });
        this.currentParams = params;
        handler = fn;
        break;
      }
    }

    if (handler) {
      this.currentRoute = path;
      handler(params);
    } else {
      console.warn('[Router] 未匹配路由:', path);
      this.navigate('/home');
    }
  },

  _patternToRegex(pattern) {
    // 将 :param 转为 ([^/]+)，将 * 转为 .*
    const regexStr = pattern
      .replace(/\//g, '\\/')
      .replace(/:\w+/g, '([^/]+)')
      .replace(/\*/g, '.*');
    return new RegExp('^' + regexStr + '$');
  }
};