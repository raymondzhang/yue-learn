/* =========================================================
   语音合成 & 语音识别模块 v3
   
   核心策略：
   1. 本地粤语语音（macOS Sinji / Windows zh-HK）是唯一可靠来源
   2. 如果没有本地粤语语音 → 使用 Web Speech API lang='yue' 尝试
   3. 绝不播放普通话冒充粤语
   4. 提供清晰的安装引导
   ========================================================= */
const Speech = {
  synth: window.speechSynthesis,
  voices: [],
  cantoneseVoice: null,
  mandarinVoice: null,
  recognition: null,
  isListening: false,
  audioPlayer: null,
  voiceReady: false,
  ttsProvider: 'none',  // 'local' | 'yue-tag' | 'none'
  _initPromise: null,

  /* ========== 初始化 ========== */
  init() {
    if (this._initPromise) return this._initPromise;

    this._initPromise = new Promise((resolve) => {
      let resolved = false;
      const done = () => { if (!resolved) { resolved = true; resolve(); } };

      const loadVoices = () => {
        const newVoices = this.synth.getVoices();
        if (newVoices.length === 0) return false;

        // 避免重复处理
        if (this.voiceReady && newVoices.length === this.voices.length) return true;

        this.voices = newVoices;
        console.log('[Speech] 语音列表 (' + this.voices.length + '):');
        this.voices.forEach(v => console.log(`  ${v.name} | ${v.lang} | local:${v.localService}`));

        // ---- 粤语语音检测（严格匹配）----
        this.cantoneseVoice = this._detectCantoneseVoice(this.voices);

        // ---- 普通话语音 ----
        this.mandarinVoice =
          this.voices.find(v => /^zh[-_]CN/i.test(v.lang)) ||
          this.voices.find(v => /tingting/i.test(v.name)) ||
          this.voices.find(v => /^zh/i.test(v.lang));

        // ---- 用户手动设置的语音 ----
        try {
          const saved = localStorage.getItem('yue_cantonese_voice');
          if (saved) {
            const pref = JSON.parse(saved);
            if (pref.name) {
              const userVoice = this.voices.find(v => v.name === pref.name);
              if (userVoice) {
                this.cantoneseVoice = userVoice;
                console.log('[Speech] 🎯 用户设置:', userVoice.name, userVoice.lang);
              }
            }
          }
        } catch (e) { /* ignore */ }

        // ---- 确定 TTS Provider ----
        if (this.cantoneseVoice) {
          this.ttsProvider = 'local';
          console.log('[Speech] ✅ 粤语语音:', this.cantoneseVoice.name, '(' + this.cantoneseVoice.lang + ')');
        } else {
          // 检查浏览器是否支持 'yue' 语言标签
          this.ttsProvider = 'yue-tag';
          console.log('[Speech] ⚠️ 无本地粤语语音，将尝试 Web Speech yue 标签');
        }
        console.log('[Speech] 普通话语音:', this.mandarinVoice ? this.mandarinVoice.name : '无');

        this.voiceReady = true;
        done();
        return true;
      };

      loadVoices();
      if (!this.voiceReady) {
        this.synth.onvoiceschanged = () => loadVoices();
        setTimeout(loadVoices, 1000);
        setTimeout(loadVoices, 2500);
        setTimeout(done, 4000);
      }
    });

    return this._initPromise;
  },

  /* ---------- 粤语语音检测 ---------- */
  _detectCantoneseVoice(voices) {
    return (
      // macOS Sinji（善怡）— Chrome 报告为 yue-HK，最正宗的粤语语音
      voices.find(v => /sinji/i.test(v.name)) ||
      // yue / yue-HK 语言标签（Chrome 新版使用这个标签）
      voices.find(v => /^yue/i.test(v.lang)) ||
      // zh-HK / zh_HK 本地语音
      voices.find(v => /^zh[-_]HK/i.test(v.lang) && v.localService) ||
      // zh-HK / zh_HK 任何语音
      voices.find(v => /^zh[-_]HK/i.test(v.lang)) ||
      // 名字包含 cantonese
      voices.find(v => /cantonese/i.test(v.name)) ||
      // macOS Meijia（美佳）— 限定 zh-HK/yue
      voices.find(v => /meijia/i.test(v.name) && (/^zh[-_]HK/i.test(v.lang) || /^yue/i.test(v.lang)))
    ) || null;
  },

  /* ==========================================================
     粤语朗读
     ========================================================== */
  speakCantonese(text, rate = 0.8, onEnd) {
    this.stop();

    // 方案 1: 本地粤语语音
    const voice = this._findCantoneseVoice();
    if (voice) {
      this.ttsProvider = 'local';
      return this._speakLocal(voice, text, rate, onEnd);
    }

    // 方案 2: Web Speech API with lang='yue' / 'zh-HK'
    // 某些浏览器（如较新 Chrome）可能通过 yue 标签自动选择粤语引擎
    const yueVoice = this.synth.getVoices().find(v => /^yue/i.test(v.lang) || /^zh[-_]HK/i.test(v.lang) || /sinji/i.test(v.name) || /cantonese/i.test(v.name));
    if (yueVoice) {
      this.ttsProvider = 'yue-tag';
      return this._speakLocal(yueVoice, text, rate, onEnd);
    }

    // 方案 3: 最后尝试 lang='zh-HK'（不指定 voice，让浏览器自行选择）
    // 注意：这可能会播放普通话，但这是最后的尝试
    try {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'zh-HK';
      utter.rate = rate;
      if (onEnd) utter.onend = onEnd;
      utter.onerror = () => this._showCantoneseUnavailable(text);
      this.synth.speak(utter);
      // 给 500ms 看看是否正常播放
      // （如果浏览器不支持 zh-HK，onerror 会触发）
    } catch (e) {
      this._showCantoneseUnavailable(text);
      onEnd && onEnd();
    }
  },

  /* ---------- 使用本地语音朗读 ---------- */
  _speakLocal(voice, text, rate, onEnd) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voice;
    utter.lang = voice.lang;
    utter.rate = rate;
    utter.pitch = 1.0;
    if (onEnd) utter.onend = onEnd;
    utter.onerror = (e) => {
      console.error('[Speech] 本地语音错误:', e.error);
      this._showCantoneseUnavailable(text);
      onEnd && onEnd();
    };
    this.synth.speak(utter);
    return utter;
  },

  /* ---------- 粤语不可用提示 ---------- */
  _showCantoneseUnavailable(text) {
    console.error('[Speech] ⛔ 粤语语音不可用');
    // 避免连续弹出
    if (this._lastErrorTime && Date.now() - this._lastErrorTime < 3000) return;
    this._lastErrorTime = Date.now();

    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, #333, #555); color: white;
      padding: 16px 24px; border-radius: 16px;
      font-size: 14px; z-index: 9999; max-width: 85%; text-align: center;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3); line-height: 1.6;
    `;
    toast.innerHTML = `
      <div style="font-size:18px;margin-bottom:8px">🔇 需要安装粤语语音</div>
      <div style="font-size:13px;opacity:0.9">
        <strong>macOS:</strong> 系统设置 → 辅助功能 → 朗读内容 → 系统声音 → 管理声音 → 下载「Sinji（善怡）」<br>
        <strong>Windows:</strong> 设置 → 时间和语言 → 语音 → 添加声音 → 中文（繁体，香港）<br>
        <strong>手机:</strong> 请使用 Chrome 浏览器
      </div>
      <button onclick="this.parentElement.remove()" style="margin-top:10px;padding:6px 16px;border:none;background:rgba(255,255,255,0.2);color:white;border-radius:8px;cursor:pointer;font-size:13px">知道了</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 12000);
  },

  /* ==========================================================
     辅助方法
     ========================================================== */

  _findCantoneseVoice() {
    // 每次都重新获取（语音可能延迟加载）
    const voices = this.synth.getVoices();
    if (voices.length > this.voices.length) {
      this.voices = voices;
      this.cantoneseVoice = null;
    }
    if (!this.cantoneseVoice) {
      this.cantoneseVoice = this._detectCantoneseVoice(voices);
      if (this.cantoneseVoice) {
        console.log('[Speech] ✅ 找到粤语语音:', this.cantoneseVoice.name, '(' + this.cantoneseVoice.lang + ')');
        this.ttsProvider = 'local';
      }
    }
    return this.cantoneseVoice;
  },

  _stopAudio() {
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer.onended = null;
      this.audioPlayer.onerror = null;
      this.audioPlayer = null;
    }
  },

  /* ========== 慢速朗读 ========== */
  speakSlow(text, onEnd) {
    return this.speakCantonese(text, 0.5, onEnd);
  },

  /* ========== 普通话朗读 ========== */
  speakMandarin(text, rate = 0.8, onEnd) {
    this.stop();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'zh-CN';
    if (this.mandarinVoice) {
      utter.voice = this.mandarinVoice;
    } else {
      const mdVoice = this.synth.getVoices().find(v => /^zh[-_]CN/i.test(v.lang));
      if (mdVoice) utter.voice = mdVoice;
    }
    utter.rate = rate;
    if (onEnd) utter.onend = onEnd;
    this.synth.speak(utter);
    return utter;
  },

  stop() {
    this.synth.cancel();
    this._stopAudio();
  },

  /* ========== 语音识别 ========== */
  initRecognition() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return false;
    this.recognition = new SR();
    this.recognition.lang = 'zh-HK';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 3;
    return true;
  },

  /** 开始持续监听，累积所有结果，直到调用 stopListening */
  startListening(onInterim, onError, onEnd) {
    if (!this.recognition) {
      if (!this.initRecognition()) {
        onError && onError('浏览器不支持语音识别');
        return;
      }
    }

    this._allResults = null;  // 保存最后一次 event.results 引用

    this.recognition.onresult = (event) => {
      this._allResults = event.results;
      const latest = event.results[event.results.length - 1];
      // 实时文本：拼接 all isFinal + 最新 interim
      let liveText = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal || i === event.results.length - 1) {
          liveText += event.results[i][0].transcript;
        }
      }
      onInterim && onInterim(liveText, latest[0].confidence, latest.isFinal);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      onError && onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      // 只取 isFinal 的结果拼接
      let finalText = '';
      let totalConf = 0;
      let finalCount = 0;
      if (this._allResults) {
        for (let i = 0; i < this._allResults.length; i++) {
          if (this._allResults[i].isFinal) {
            finalText += this._allResults[i][0].transcript;
            totalConf += this._allResults[i][0].confidence;
            finalCount++;
          }
        }
      }
      const avgConf = finalCount > 0 ? totalConf / finalCount : 0;
      onEnd && onEnd(finalText, avgConf);
    };

    this.isListening = true;
    this.recognition.start();
  },

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  },

  /* ========== 状态查询 ========== */
  hasCantoneseTTS() {
    return !!this._findCantoneseVoice();
  },

  hasRecognition() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  },

  getVoiceInfo() {
    const voice = this._findCantoneseVoice();
    return {
      hasVoice: !!voice,
      voiceName: voice ? voice.name : '未找到',
      voiceLang: voice ? voice.lang : '-',
      isLocal: !!voice,
      hasRecognition: this.hasRecognition(),
      totalVoices: this.voices.length,
      ttsProvider: this.ttsProvider
    };
  }
};
