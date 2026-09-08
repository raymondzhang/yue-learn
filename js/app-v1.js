/* 粤学乐园 - 主应用逻辑 */
var AppV1 = {
  currentView: 'home',
  currentCategory: null,
  currentScenario: null,
  quizState: null,
  flashcardState: null,

  async init() {
    Progress.init();
    await Speech.init();
    this.updateHeader();
    this.navigateTo('home');
    // 绑定返回按钮等全局事件
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.currentView !== 'home') {
        this.navigateTo('home');
      }
    });
  },

  updateHeader() {
    const s = Progress.data;
    const starEl = document.getElementById('star-count');
    if (starEl) starEl.textContent = s.stars;
    const heartsEl = document.getElementById('hearts-display');
    if (heartsEl) {
      let h = '';
      for (let i = 0; i < Progress.data.maxHearts; i++) {
        h += i < s.hearts
          ? '<span class="heart full">❤️</span>'
          : '<span class="heart empty">🤍</span>';
      }
      heartsEl.innerHTML = h;
    }
  },

  showBadgeUnlock(badge) {
    const modal = document.createElement('div');
    modal.className = 'badge-modal';
    modal.innerHTML = `
      <div class="badge-modal-content">
        <div class="badge-icon-big">${badge.icon}</div>
        <div class="badge-title">🎉 获得新徽章！</div>
        <div class="badge-name">${badge.name}</div>
        <button class="btn btn-primary" onclick="this.closest('.badge-modal').remove()">太棒了！</button>
      </div>`;
    document.body.appendChild(modal);
    setTimeout(() => modal.remove(), 5000);
  },

  /* ===== 导航 ===== */
  navigateTo(view, params = {}) {
    this.currentView = view;
    Speech.stop();
    const main = document.getElementById('main-content');
    main.className = 'view-container';

    switch (view) {
      case 'home': this.renderHome(main); break;
      case 'characters': this.renderCharacters(main); break;
      case 'char-detail': this.renderCharDetail(main, params); break;
      case 'char-flashcard': this.startFlashcards(main, params); break;
      case 'cantonese': this.renderCantonese(main); break;
      case 'scenario': this.renderScenario(main, params); break;
      case 'comparison': this.renderComparison(main); break;
      case 'particles': this.renderParticles(main); break;
      case 'quiz': this.renderQuizMenu(main); break;
      case 'quiz-play': this.startQuiz(main, params); break;
      case 'listening': this.renderListening(main); break;
      case 'listen-play': this.startListening(main, params); break;
      case 'speaking': this.renderSpeaking(main); break;
      case 'speak-play': this.startSpeaking(main, params); break;
      case 'voice-test': this.renderVoiceTest(main); break;
      case 'stats': this.renderStats(main); break;
    }
    main.scrollTop = 0;
    window.scrollTo(0, 0);
  },

  /* ===== 首页 ===== */
  renderHome(el) {
    const stats = Progress.getStats();
    const todayPct = Math.min(100, Math.round(stats.todayProgress / stats.dailyGoal * 100));

    // 随机推荐一条粤语
    const allPhrases = PHRASE_DATA.scenarios.flatMap(s =>
      s.phrases.map(p => ({ ...p, scenario: s.name }))
    );
    const daily = allPhrases[Math.floor(Math.random() * allPhrases.length)];

    el.innerHTML = `
      <div class="home-view">
        <div class="welcome-card">
          <div class="welcome-text">
            <h2>👋 欢迎回来！</h2>
            <p>今天也要加油学习哦～</p>
          </div>
          <div class="daily-goal">
            <div class="goal-label">今日进度 ${stats.todayProgress}/${stats.dailyGoal}</div>
            <div class="progress-bar"><div class="progress-fill" style="width:${todayPct}%"></div></div>
          </div>
        </div>

        <div class="voice-status-bar" id="voice-status-bar">
          ${this._renderVoiceStatus()}
        </div>

        <div class="daily-phrase-card" onclick="Speech.speakCantonese('${daily.cantonese}')">
          <div class="card-badge">📌 今日推荐</div>
          <div class="phrase-cantonese">${daily.cantonese}</div>
          <div class="phrase-jp">[${daily.jp}]</div>
          <div class="phrase-meaning">普通话：${daily.meaning}</div>
          ${daily.note ? `<div class="phrase-note">💡 ${daily.note}</div>` : ''}
          <div class="tap-hint">🔊 点击听粤语发音</div>
        </div>

        <div class="module-grid">
          <div class="module-card" onclick="AppV1.navigateTo('characters')" style="--accent: #FF6B6B">
            <div class="module-icon">📝</div>
            <div class="module-name">繁体字学堂</div>
            <div class="module-desc">学习常用繁体字</div>
            <div class="module-progress">${stats.learnedChars}字已学</div>
          </div>
          <div class="module-card" onclick="AppV1.navigateTo('cantonese')" style="--accent: #4ECDC4">
            <div class="module-icon">🗣️</div>
            <div class="module-name">粤语训练营</div>
            <div class="module-desc">场景对话学粤语</div>
            <div class="module-progress">${stats.learnedPhrases}句已学</div>
          </div>
          <div class="module-card" onclick="AppV1.navigateTo('quiz')" style="--accent: #45B7D1">
            <div class="module-icon">🎮</div>
            <div class="module-name">闯关练习</div>
            <div class="module-desc">答题巩固知识</div>
            <div class="module-progress">正确率 ${stats.accuracy}%</div>
          </div>
          <div class="module-card" onclick="AppV1.navigateTo('listening')" style="--accent: #96CEB4">
            <div class="module-icon">👂</div>
            <div class="module-name">听力训练</div>
            <div class="module-desc">听懂粤语表达</div>
            <div class="module-progress">最佳连对 ${stats.bestStreak}</div>
          </div>
          <div class="module-card" onclick="AppV1.navigateTo('speaking')" style="--accent: #FFEAA7">
            <div class="module-icon">🎤</div>
            <div class="module-name">语音跟读</div>
            <div class="module-desc">开口说粤语</div>
            <div class="module-progress">连对 ${stats.streak} 题</div>
          </div>
          <div class="module-card" onclick="AppV1.navigateTo('stats')" style="--accent: #DDA0DD">
            <div class="module-icon">📊</div>
            <div class="module-name">学习统计</div>
            <div class="module-desc">查看成就徽章</div>
            <div class="module-progress">${stats.badges}个徽章</div>
          </div>
        </div>
      </div>`;
  },

  /* ===== 繁体字学堂 ===== */
  renderCharacters(el) {
    const cats = CHARACTER_DATA.categories;
    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="AppV1.navigateTo('home')">← 返回首页</button>
        <h2>📝 繁体字学堂</h2>
        <p class="section-desc">选择分类，学习简体和繁体的对照</p>
        <div class="category-grid">
          ${cats.map(cat => {
            const charCount = cat.chars ? cat.chars.length : (cat.rules ? cat.rules.reduce((a, r) => a + r.examples.length, 0) : 0);
            const learned = cat.chars
              ? cat.chars.filter(c => Progress.data.learned[c.t]).length
              : 0;
            return `
            <div class="category-card" onclick="AppV1.navigateTo('char-detail', {categoryId:'${cat.id}'})" style="--cat-color: ${this.getCategoryColor(cat.id)}">
              <div class="cat-icon">${cat.icon}</div>
              <div class="cat-name">${cat.name}</div>
              <div class="cat-count">${charCount}字</div>
              ${learned > 0 ? `<div class="cat-learned">已学 ${learned}</div>` : ''}
            </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  getCategoryColor(id) {
    const colors = {
      school: '#FF6B6B', daily: '#4ECDC4', family: '#45B7D1',
      body: '#96CEB4', food: '#FFEAA7', animal: '#DDA0DD',
      place: '#F0B27A', feeling: '#85C1E9', nature: '#82E0AA', radical: '#F1948A'
    };
    return colors[id] || '#999';
  },

  renderCharDetail(el, params) {
    const cat = CHARACTER_DATA.categories.find(c => c.id === params.categoryId);
    if (!cat) return this.navigateTo('characters');
    this.currentCategory = cat;

    let content = '';
    if (cat.chars) {
      content = `
        <div class="char-grid">
          ${cat.chars.map((c, i) => {
            const mastery = Progress.getCharMastery(c.t);
            const masteryClass = mastery >= 80 ? 'mastered' : mastery >= 50 ? 'learning' : '';
            return `
            <div class="char-card ${masteryClass}" onclick="AppV1.showCharCard('${c.t}', ${i})" data-idx="${i}">
              <div class="char-traditional">${c.t}</div>
              <div class="char-simplified">简：${c.s}</div>
              ${mastery > 0 ? `<div class="char-mastery">${mastery}%</div>` : ''}
            </div>`;
          }).join('')}
        </div>`;
    }
    if (cat.rules) {
      content = `
        <div class="rules-list">
          ${cat.rules.map(rule => `
            <div class="rule-card">
              <div class="rule-header">
                <span class="rule-radical">「${rule.s_radical}」→「${rule.t_radical}」</span>
                <span class="rule-desc">${rule.desc}</span>
              </div>
              <div class="rule-examples">
                ${rule.examples.map(ex => `
                  <div class="rule-example" onclick="Speech.speakCantonese('${ex.t}')">
                    <span class="ex-s">${ex.s}</span>
                    <span class="ex-arrow">→</span>
                    <span class="ex-t">${ex.t}</span>
                    <span class="ex-jp">[${ex.jp}]</span>
                    <span class="ex-play">🔊</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>`;
    }

    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="AppV1.navigateTo('characters')">← 返回分类</button>
        <h2>${cat.icon} ${cat.name}</h2>
        ${content}
        <div class="action-bar">
          <button class="btn btn-primary" onclick="AppV1.startFlashcards(AppV1.currentView === 'home' ? {} : {categoryId:'${cat.id}'})">
            🃏 开始闪卡学习
          </button>
          <button class="btn btn-secondary" onclick="AppV1.startQuiz({type:'s2t', categoryId:'${cat.id}'})">
            ✏️ 做选择题
          </button>
        </div>
      </div>`;
  },

  showCharCard(charT, idx) {
    const cat = this.currentCategory;
    const c = cat.chars ? cat.chars[idx] : null;
    if (!c) return;
    // 弹出详情
    const modal = document.createElement('div');
    modal.className = 'char-modal';
    modal.innerHTML = `
      <div class="char-modal-content" onclick="event.stopPropagation()">
        <div class="char-big">${c.t}</div>
        <div class="char-info-row">
          <div><span class="label">简体：</span>${c.s}</div>
          <div><span class="label">拼音：</span>${c.py}</div>
          <div><span class="label">粤拼：</span>${c.jp}</div>
          <div><span class="label">意思：</span>${c.en}</div>
        </div>
        <div class="char-actions">
          <button class="btn btn-speak" onclick="Speech.speakCantonese('${c.t}')">🔊 听粤语</button>
          <button class="btn btn-speak" onclick="Speech.speakMandarin('${c.s}')">🔊 听普通话</button>
          <button class="btn btn-speak" onclick="Speech.speakSlow('${c.t}')">🐢 慢速</button>
        </div>
        <button class="btn btn-close" onclick="this.closest('.char-modal').remove()">关闭</button>
      </div>`;
    modal.onclick = () => modal.remove();
    document.body.appendChild(modal);
    Speech.speakCantonese(c.t);
  },

  /* ===== 闪卡模式 ===== */
  startFlashcards(el, params) {
    let chars;
    if (params.categoryId) {
      const cat = CHARACTER_DATA.categories.find(c => c.id === params.categoryId);
      chars = cat && cat.chars ? [...cat.chars] : getAllChars();
    } else {
      chars = getAllChars();
    }
    // 打乱
    chars.sort(() => Math.random() - 0.5);
    this.flashcardState = {
      chars,
      index: 0,
      flipped: false,
      total: chars.length
    };
    this.renderFlashcard(el);
  },

  renderFlashcard(el) {
    const st = this.flashcardState;
    if (!st || st.index >= st.total) {
      el.innerHTML = `
        <div class="section-view completion-view">
          <div class="complete-icon">🎉</div>
          <h2>太棒了！全部学完！</h2>
          <p>获得 ${st.total} 颗星星</p>
          <button class="btn btn-primary" onclick="AppV1.navigateTo('home')">返回首页</button>
        </div>`;
      return;
    }
    const c = st.chars[st.index];
    el.innerHTML = `
      <div class="flashcard-view">
        <button class="back-btn" onclick="AppV1.navigateTo('home')">← 返回</button>
        <div class="flashcard-progress">${st.index + 1} / ${st.total}</div>
        <div class="flashcard ${st.flipped ? 'flipped' : ''}" onclick="AppV1.flipCard()">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <div class="fc-char">${c.t}</div>
              <div class="fc-hint">点击翻转看简体</div>
            </div>
            <div class="flashcard-back">
              <div class="fc-char">${c.s}</div>
              <div class="fc-pinyin">${c.py}</div>
              <div class="fc-meaning">${c.en}</div>
              <div class="fc-jp">粤拼：${c.jp}</div>
            </div>
          </div>
        </div>
        <div class="flashcard-actions">
          <button class="btn btn-speak" onclick="event.stopPropagation(); Speech.speakCantonese('${c.t}')">🔊 粤语</button>
          <button class="btn btn-speak" onclick="event.stopPropagation(); Speech.speakSlow('${c.t}')">🐢 慢速</button>
        </div>
        <div class="flashcard-nav">
          <button class="btn btn-secondary" onclick="AppV1.flashcardPrev()">⬅ 上一个</button>
          <button class="btn btn-wrong" onclick="AppV1.flashcardNext(false)">😕 不认识</button>
          <button class="btn btn-correct" onclick="AppV1.flashcardNext(true)">✅ 认识</button>
        </div>
      </div>`;
    Speech.speakCantonese(c.t);
  },

  flipCard() {
    this.flashcardState.flipped = !this.flashcardState.flipped;
    const card = document.querySelector('.flashcard');
    if (card) card.classList.toggle('flipped');
  },

  flashcardNext(correct) {
    const st = this.flashcardState;
    const c = st.chars[st.index];
    Progress.recordAnswer(c.t, correct);
    this.updateHeader();
    st.index++;
    st.flipped = false;
    this.renderFlashcard(document.getElementById('main-content'));
  },

  flashcardPrev() {
    const st = this.flashcardState;
    if (st.index > 0) {
      st.index--;
      st.flipped = false;
      this.renderFlashcard(document.getElementById('main-content'));
    }
  },

  /* ===== 粤语训练营 ===== */
  renderCantonese(el) {
    const scenarios = PHRASE_DATA.scenarios;
    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="AppV1.navigateTo('home')">← 返回首页</button>
        <h2>🗣️ 粤语训练营</h2>
        <p class="section-desc">选择场景，学习地道粤语表达</p>
        <div class="scenario-grid">
          ${scenarios.map(s => `
            <div class="scenario-card" onclick="AppV1.navigateTo('scenario', {scenarioId:'${s.id}'})">
              <div class="sc-icon">${s.icon}</div>
              <div class="sc-name">${s.name}</div>
              <div class="sc-count">${s.phrases.length}句</div>
            </div>
          `).join('')}
        </div>
        <div class="extra-sections">
          <div class="extra-card" onclick="AppV1.navigateTo('comparison')">
            <div class="extra-icon">🔄</div>
            <div class="extra-name">粤语 vs 普通话</div>
            <div class="extra-desc">常用词对比</div>
          </div>
          <div class="extra-card" onclick="AppV1.navigateTo('particles')">
            <div class="extra-icon">✨</div>
            <div class="extra-name">语气词入门</div>
            <div class="extra-desc">啦、喇、嘅、啲…</div>
          </div>
        </div>
      </div>`;
  },

  renderScenario(el, params) {
    const scenario = PHRASE_DATA.scenarios.find(s => s.id === params.scenarioId);
    if (!scenario) return this.navigateTo('cantonese');
    this.currentScenario = scenario;

    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="AppV1.navigateTo('cantonese')">← 返回场景</button>
        <h2>${scenario.icon} ${scenario.name}</h2>
        <div class="phrase-list">
          ${scenario.phrases.map((p, i) => `
            <div class="phrase-item" data-idx="${i}">
              <div class="phrase-top" onclick="Speech.speakCantonese('${p.cantonese}'); AppV1.recordPhraseListen('${scenario.id}', ${i})">
                <div class="phrase-main">
                  <span class="phrase-zh">${p.zh}</span>
                  <span class="phrase-arrow">→</span>
                  <span class="phrase-ct">${p.cantonese}</span>
                </div>
                <div class="phrase-jp-line">[${p.jp}]</div>
                <div class="tap-hint-sm">🔊 点击听发音</div>
              </div>
              <div class="phrase-details">
                ${p.note ? `<div class="phrase-note">💡 ${p.note}</div>` : ''}
                <div class="phrase-actions-sm">
                  <button class="btn-sm" onclick="Speech.speakSlow('${p.cantonese}')">🐢 慢速</button>
                  <button class="btn-sm" onclick="AppV1.togglePhraseAnswer(${i})">👀 看解释</button>
                </div>
                <div class="phrase-answer" id="phrase-ans-${i}" style="display:none">
                  <span class="label">意思：</span>${p.meaning}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;
  },

  togglePhraseAnswer(idx) {
    const el = document.getElementById(`phrase-ans-${idx}`);
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
  },

  recordPhraseListen(scenarioId, phraseIdx) {
    const id = `${scenarioId}_${phraseIdx}`;
    Progress.recordPhrase(id, 'listened');
  },

  renderComparison(el) {
    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="AppV1.navigateTo('cantonese')">← 返回</button>
        <h2>🔄 粤语 vs 普通话用词对比</h2>
        <p class="section-desc">粤语和普通话有很多不同的用词，来了解一下吧！</p>
        <div class="comparison-table">
          <div class="comp-header">
            <span>普通话</span><span>粤语</span><span>粤拼</span><span>🔊</span>
          </div>
          ${WORD_COMPARISON.map(w => `
            <div class="comp-row" onclick="Speech.speakCantonese('${w.cantonese}')">
              <span class="comp-md">${w.mandarin}</span>
              <span class="comp-ct">${w.cantonese}</span>
              <span class="comp-jp">${w.jp}</span>
              <span class="comp-play">🔊</span>
            </div>
          `).join('')}
        </div>
      </div>`;
  },

  renderParticles(el) {
    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="AppV1.navigateTo('cantonese')">← 返回</button>
        <h2>✨ 粤语常用语气词</h2>
        <p class="section-desc">语气词是粤语的一大特色，让说话更有感情！</p>
        <div class="particles-list">
          ${PARTICLES.map(p => `
            <div class="particle-card" onclick="Speech.speakCantonese('${p.example.split('=')[0].trim()}')">
              <div class="particle-char">${p.char}</div>
              <div class="particle-jp">[${p.jp}]</div>
              <div class="particle-usage">${p.usage}</div>
              <div class="particle-example">
                <span class="label">例子：</span>${p.example}
              </div>
              <div class="tap-hint-sm">🔊 点击听例句</div>
            </div>
          `).join('')}
        </div>
      </div>`;
  },

  /* ===== 闯关练习 ===== */
  renderQuizMenu(el) {
    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="AppV1.navigateTo('home')">← 返回首页</button>
        <h2>🎮 闯关练习</h2>
        <p class="section-desc">选择题目类型，开始答题！</p>
        ${Progress.data.hearts <= 0 ? `
          <div class="no-hearts">
            <div class="no-hearts-icon">💔</div>
            <p>心用完了，休息一下吧！</p>
            <p class="regen-hint">每5分钟自动恢复一颗心</p>
            <button class="btn btn-secondary" onclick="Progress.checkHeartRegen(); AppV1.updateHeader(); AppV1.navigateTo('home')">返回首页</button>
          </div>
        ` : `
          <div class="quiz-type-grid">
            <div class="quiz-type-card" onclick="AppV1.startQuiz({type:'s2t'})">
              <div class="qt-icon">📝</div>
              <div class="qt-name">看简选繁</div>
              <div class="qt-desc">看简体字，选出正确的繁体字</div>
            </div>
            <div class="quiz-type-card" onclick="AppV1.startQuiz({type:'t2s'})">
              <div class="qt-icon">🔤</div>
              <div class="qt-name">看繁选简</div>
              <div class="qt-desc">看繁体字，选出正确的简体字</div>
            </div>
            <div class="quiz-type-card" onclick="AppV1.startQuiz({type:'listen'})">
              <div class="qt-icon">👂</div>
              <div class="qt-name">听音选字</div>
              <div class="qt-desc">听粤语发音，选出对应的字</div>
            </div>
            <div class="quiz-type-card" onclick="AppV1.startQuiz({type:'phrase'})">
              <div class="qt-icon">💬</div>
              <div class="qt-name">粤语翻译</div>
              <div class="qt-desc">听粤语句子，选择普通话意思</div>
            </div>
            <div class="quiz-type-card" onclick="AppV1.startQuiz({type:'fill'})">
              <div class="qt-icon">✏️</div>
              <div class="qt-name">选词填空</div>
              <div class="qt-desc">选择正确的粤语词填空</div>
            </div>
            <div class="quiz-type-card" onclick="AppV1.startQuiz({type:'mix'})">
              <div class="qt-icon">🎲</div>
              <div class="qt-name">综合挑战</div>
              <div class="qt-desc">随机混合各种题型</div>
            </div>
          </div>
        `}
      </div>`;
  },

  /* 生成题目 */
  generateQuiz(type, count = 10) {
    const allChars = getAllChars();
    const allPhrases = PHRASE_DATA.scenarios.flatMap(s =>
      s.phrases.map(p => ({ ...p, scenarioId: s.id, scenarioName: s.name }))
    );
    const questions = [];

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    const pick = (arr, n) => shuffle(arr).slice(0, n);
    const pickWrong = (arr, correct, n) => {
      return shuffle(arr.filter(x => x !== correct)).slice(0, n);
    };

    for (let i = 0; i < count; i++) {
      let qType = type === 'mix'
        ? ['s2t', 't2s', 'listen', 'phrase', 'fill'][Math.floor(Math.random() * 5)]
        : type;

      if (qType === 's2t') {
        const correct = allChars[Math.floor(Math.random() * allChars.length)];
        const wrongs = pickWrong(allChars.map(c => c.t), correct.t, 3);
        const options = shuffle([correct.t, ...wrongs]);
        questions.push({
          type: 's2t',
          prompt: `「${correct.s}」的繁体字是？`,
          promptType: 'text',
          options,
          answer: correct.t,
          speakText: correct.t,
          charId: correct.t
        });
      } else if (qType === 't2s') {
        const correct = allChars[Math.floor(Math.random() * allChars.length)];
        const wrongs = pickWrong(allChars.map(c => c.s), correct.s, 3);
        const options = shuffle([correct.s, ...wrongs]);
        questions.push({
          type: 't2s',
          prompt: `「${correct.t}」的简体字是？`,
          promptType: 'text',
          promptBig: correct.t,
          options,
          answer: correct.s,
          speakText: correct.t,
          charId: correct.t
        });
      } else if (qType === 'listen') {
        const correct = allChars[Math.floor(Math.random() * allChars.length)];
        const wrongs = pickWrong(allChars.map(c => c.t), correct.t, 3);
        const options = shuffle([correct.t, ...wrongs]);
        questions.push({
          type: 'listen',
          prompt: '听发音，选出对应的字',
          promptType: 'audio',
          speakText: correct.t,
          options,
          answer: correct.t,
          charId: correct.t
        });
      } else if (qType === 'phrase') {
        const correct = allPhrases[Math.floor(Math.random() * allPhrases.length)];
        const wrongs = pickWrong(allPhrases.map(p => p.meaning), correct.meaning, 3);
        const options = shuffle([correct.meaning, ...wrongs]);
        questions.push({
          type: 'phrase',
          prompt: '听这句粤语，选择普通话意思',
          promptType: 'audio',
          speakText: correct.cantonese,
          options,
          answer: correct.meaning,
          extra: `粤语：${correct.cantonese}`,
          charId: `${correct.scenarioId}_phrase`
        });
      } else if (qType === 'fill') {
        // 基于用词对比的填空题
        const comp = WORD_COMPARISON[Math.floor(Math.random() * WORD_COMPARISON.length)];
        const wrongs = pickWrong(WORD_COMPARISON.map(w => w.cantonese), comp.cantonese, 3);
        const options = shuffle([comp.cantonese, ...wrongs]);
        questions.push({
          type: 'fill',
          prompt: `普通话「${comp.mandarin}」用粤语怎么说？`,
          promptType: 'text',
          options,
          answer: comp.cantonese,
          speakText: comp.cantonese,
          charId: `fill_${comp.cantonese}`
        });
      }
    }
    return questions;
  },

  startQuiz(el, params) {
    // 兼容 onclick 直接调用：AppV1.startQuiz({type:'s2t'}) 时 el 是参数对象
    if (el && typeof el === 'object' && !(el instanceof Element)) {
      params = el;
      el = document.getElementById('main-content');
    }
    params = params || {};
    if (Progress.data.hearts <= 0) {
      return this.navigateTo('quiz');
    }
    const questions = this.generateQuiz(params.type || 's2t');
    this.quizState = {
      questions,
      index: 0,
      correct: 0,
      wrong: 0,
      type: params.type
    };
    this.renderQuizQuestion(el);
  },

  renderQuizQuestion(el) {
    const qs = this.quizState;
    if (!qs || qs.index >= qs.questions.length) {
      this.renderQuizResult(el);
      return;
    }
    const q = qs.questions[qs.index];
    this.updateHeader();

    // 播放音频
    if (q.promptType === 'audio') {
      setTimeout(() => Speech.speakCantonese(q.speakText), 500);
    }

    el.innerHTML = `
      <div class="quiz-view">
        <div class="quiz-header">
          <button class="back-btn" onclick="AppV1.navigateTo('quiz')">← 退出</button>
          <div class="quiz-progress">${qs.index + 1} / ${qs.questions.length}</div>
          <div class="quiz-score">✅${qs.correct} ❌${qs.wrong}</div>
        </div>
        <div class="quiz-body">
          <div class="quiz-prompt">${q.prompt}</div>
          ${q.promptBig ? `<div class="quiz-prompt-big">${q.promptBig}</div>` : ''}
          ${q.promptType === 'audio' ? `
            <button class="btn btn-speak quiz-replay" onclick="Speech.speakCantonese('${q.speakText}')">
              🔊 再听一次
            </button>
          ` : ''}
          ${q.extra ? `<div class="quiz-extra">${q.extra}</div>` : ''}
          <div class="quiz-options">
            ${q.options.map((opt, i) => `
              <div class="quiz-option" data-value="${opt}" onclick="AppV1.answerQuiz(this, '${opt.replace(/'/g, "\\'")}')">
                <span class="opt-letter">${'ABCD'[i]}</span>
                <span class="opt-text">${opt}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>`;
  },

  answerQuiz(el, value) {
    const qs = this.quizState;
    const q = qs.questions[qs.index];
    const correct = value === q.answer;

    // 防止重复点击
    if (document.querySelector('.quiz-option.selected')) return;

    document.querySelectorAll('.quiz-option').forEach(opt => {
      opt.classList.add('disabled');
      if (opt.dataset.value === q.answer) {
        opt.classList.add('correct');
      }
      if (opt.dataset.value === value && !correct) {
        opt.classList.add('wrong');
      }
    });
    el.classList.add('selected');

    if (correct) {
      qs.correct++;
      Speech.speakCantonese(q.speakText || q.answer);
    } else {
      qs.wrong++;
    }
    Progress.recordAnswer(q.charId, correct);
    this.updateHeader();

    setTimeout(() => {
      qs.index++;
      this.renderQuizQuestion(document.getElementById('main-content'));
    }, correct ? 1200 : 2000);
  },

  renderQuizResult(el) {
    const qs = this.quizState;
    const pct = Math.round(qs.correct / qs.questions.length * 100);
    let emoji, msg;
    if (pct >= 90) { emoji = '🏆'; msg = '太厉害了！'; }
    else if (pct >= 70) { emoji = '🌟'; msg = '做得不错！'; }
    else if (pct >= 50) { emoji = '💪'; msg = '继续加油！'; }
    else { emoji = '📚'; msg = '多复习一下吧！'; }

    el.innerHTML = `
      <div class="section-view completion-view">
        <div class="complete-icon">${emoji}</div>
        <h2>${msg}</h2>
        <div class="result-stats">
          <div class="result-correct">✅ 答对：${qs.correct}</div>
          <div class="result-wrong">❌ 答错：${qs.wrong}</div>
          <div class="result-pct">正确率：${pct}%</div>
          <div class="result-stars">获得 ⭐ ${qs.correct} 颗星</div>
        </div>
        <div class="result-actions">
          <button class="btn btn-primary" onclick="AppV1.startQuiz({type:'${qs.type}'})">再来一轮</button>
          <button class="btn btn-secondary" onclick="AppV1.navigateTo('quiz')">换个题型</button>
          <button class="btn btn-secondary" onclick="AppV1.navigateTo('home')">返回首页</button>
        </div>
      </div>`;
  },

  /* ===== 听力训练 ===== */
  renderListening(el) {
    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="AppV1.navigateTo('home')">← 返回首页</button>
        <h2>👂 听力训练</h2>
        <p class="section-desc">听粤语，选答案，训练你的耳朵！</p>
        <div class="quiz-type-grid">
          <div class="quiz-type-card" onclick="AppV1.startListening({mode:'char'})">
            <div class="qt-icon">🔤</div>
            <div class="qt-name">听音辨字</div>
            <div class="qt-desc">听粤语发音，选出正确的字</div>
          </div>
          <div class="quiz-type-card" onclick="AppV1.startListening({mode:'phrase'})">
            <div class="qt-icon">💬</div>
            <div class="qt-name">听句辨意</div>
            <div class="qt-desc">听粤语句子，选择普通话意思</div>
          </div>
          <div class="quiz-type-card" onclick="AppV1.startListening({mode:'number'})">
            <div class="qt-icon">🔢</div>
            <div class="qt-name">粤语数字</div>
            <div class="qt-desc">听懂粤语数字1-100</div>
          </div>
          <div class="quiz-type-card" onclick="AppV1.startListening({mode:'classroom'})">
            <div class="qt-icon">🏫</div>
            <div class="qt-name">课堂指令</div>
            <div class="qt-desc">听懂老师说的粤语指令</div>
          </div>
        </div>
      </div>`;
  },

  startListening(el, params) {
    // 复用 quiz engine
    let typeMap = {
      char: 'listen',
      phrase: 'phrase',
      number: 'listen',
      classroom: 'phrase'
    };
    const quizType = typeMap[params.mode] || 'listen';

    if (params.mode === 'number') {
      this.startNumberListening(el);
      return;
    }
    if (params.mode === 'classroom') {
      this.startClassroomListening(el);
      return;
    }

    this.startQuiz(el, { type: quizType });
  },

  startNumberListening(el) {
    const numbers = [
      { n: 1, ct: '一', jp: 'jat1' }, { n: 2, ct: '二', jp: 'ji6' },
      { n: 3, ct: '三', jp: 'saam1' }, { n: 4, ct: '四', jp: 'sei3' },
      { n: 5, ct: '五', jp: 'ng5' }, { n: 6, ct: '六', jp: 'luk6' },
      { n: 7, ct: '七', jp: 'cat1' }, { n: 8, ct: '八', jp: 'baat3' },
      { n: 9, ct: '九', jp: 'gau2' }, { n: 10, ct: '十', jp: 'sap6' },
      { n: 11, ct: '十一', jp: 'sap6 jat1' }, { n: 12, ct: '十二', jp: 'sap6 ji6' },
      { n: 20, ct: '二十', jp: 'ji6 sap6' }, { n: 30, ct: '三十', jp: 'saam1 sap6' },
      { n: 50, ct: '五十', jp: 'ng5 sap6' }, { n: 100, ct: '一百', jp: 'jat1 baak3' }
    ];
    const shuffled = [...numbers].sort(() => Math.random() - 0.5).slice(0, 8);
    const questions = shuffled.map(num => {
      const wrongs = [...numbers].sort(() => Math.random() - 0.5)
        .filter(x => x.n !== num.n).slice(0, 3);
      const options = [num, ...wrongs].sort(() => Math.random() - 0.5);
      return {
        type: 'listen',
        prompt: '听粤语数字，选择正确的阿拉伯数字',
        promptType: 'audio',
        speakText: num.ct,
        options: options.map(o => `${o.n}`),
        answer: `${num.n}`,
        charId: `num_${num.n}`,
        extra: `粤语写法：${num.ct} [${num.jp}]`
      };
    });
    this.quizState = { questions, index: 0, correct: 0, wrong: 0, type: 'number' };
    this.renderQuizQuestion(el);
  },

  startClassroomListening(el) {
    const classroomPhrases = PHRASE_DATA.scenarios.find(s => s.id === 'classroom');
    const phrases = classroomPhrases ? classroomPhrases.phrases : [];
    const shuffled = [...phrases].sort(() => Math.random() - 0.5).slice(0, 8);
    const questions = shuffled.map(p => {
      const wrongs = [...phrases].sort(() => Math.random() - 0.5)
        .filter(x => x.meaning !== p.meaning).slice(0, 3);
      const options = [p, ...wrongs].sort(() => Math.random() - 0.5);
      return {
        type: 'phrase',
        prompt: '听这句课堂粤语，选择普通话意思',
        promptType: 'audio',
        speakText: p.cantonese,
        options: options.map(o => o.meaning),
        answer: p.meaning,
        extra: `粤语：${p.cantonese}`,
        charId: `classroom_${p.meaning}`
      };
    });
    this.quizState = { questions, index: 0, correct: 0, wrong: 0, type: 'classroom' };
    this.renderQuizQuestion(el);
  },

  /* ===== 语音跟读 ===== */
  renderSpeaking(el) {
    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="AppV1.navigateTo('home')">← 返回首页</button>
        <h2>🎤 语音跟读</h2>
        <p class="section-desc">先听粤语发音，然后跟着读，看看你读得准不准！</p>
        ${!Speech.hasRecognition() ? `
          <div class="feature-unavailable">
            <p>⚠️ 你的浏览器不支持语音识别</p>
            <p>请使用 Chrome 浏览器获得完整体验</p>
            <p style="margin-top:10px">你仍然可以先听发音，自己跟读练习哦！</p>
          </div>
        ` : ''}
        <div class="quiz-type-grid">
          <div class="quiz-type-card" onclick="AppV1.startSpeaking({mode:'word'})">
            <div class="qt-icon">📝</div>
            <div class="qt-name">词语跟读</div>
            <div class="qt-desc">听发音，跟读单个词语</div>
          </div>
          <div class="quiz-type-card" onclick="AppV1.startSpeaking({mode:'sentence'})">
            <div class="qt-icon">💬</div>
            <div class="qt-name">句子跟读</div>
            <div class="qt-desc">听句子，整句跟读</div>
          </div>
        </div>
      </div>`;
  },

  startSpeaking(el, params) {
    let items;
    if (params.mode === 'word') {
      items = getAllChars().sort(() => Math.random() - 0.5).slice(0, 10).map(c => ({
        text: c.t, display: c.t, sub: `简：${c.s} | 粤拼：${c.jp}`, meaning: c.en
      }));
    } else {
      const allPhrases = PHRASE_DATA.scenarios.flatMap(s => s.phrases);
      items = allPhrases.sort(() => Math.random() - 0.5).slice(0, 8).map(p => ({
        text: p.cantonese, display: p.cantonese, sub: `[${p.jp}]`, meaning: p.meaning
      }));
    }
    this.speakState = { items, index: 0, scores: [] };
    this.renderSpeakItem(el);
  },

  renderSpeakItem(el) {
    const ss = this.speakState;
    if (!ss || ss.index >= ss.items.length) {
      const avg = ss.scores.length > 0
        ? Math.round(ss.scores.reduce((a, b) => a + b, 0) / ss.scores.length) : 0;
      el.innerHTML = `
        <div class="section-view completion-view">
          <div class="complete-icon">🎤</div>
          <h2>跟读完成！</h2>
          <div class="result-stats">
            <div class="result-pct">平均得分：${avg}分</div>
          </div>
          <button class="btn btn-primary" onclick="AppV1.navigateTo('speaking')">再来一组</button>
          <button class="btn btn-secondary" onclick="AppV1.navigateTo('home')">返回首页</button>
        </div>`;
      return;
    }
    const item = ss.items[ss.index];
    el.innerHTML = `
      <div class="speak-view">
        <button class="back-btn" onclick="AppV1.navigateTo('speaking')">← 返回</button>
        <div class="speak-progress">${ss.index + 1} / ${ss.items.length}</div>
        <div class="speak-card">
          <div class="speak-text">${item.display}</div>
          <div class="speak-sub">${item.sub}</div>
          <div class="speak-meaning">普通话：${item.meaning}</div>
        </div>
        <div class="speak-actions">
          <button class="btn btn-speak" id="btn-listen" onclick="Speech.speakCantonese('${item.text}')">
            🔊 听发音
          </button>
          <button class="btn btn-speak" onclick="Speech.speakSlow('${item.text}')">
            🐢 慢速
          </button>
        </div>
        ${Speech.hasRecognition() ? `
          <div class="speak-record-section">
            <button class="btn btn-record" id="btn-record" onclick="AppV1.startRecord()">
              🎤 点击跟读
            </button>
            <div class="record-status" id="record-status"></div>
            <div class="record-result" id="record-result"></div>
          </div>
        ` : `
          <div class="self-eval">
            <p>自己评价一下读得怎么样？</p>
            <div class="self-eval-btns">
              <button class="btn btn-correct" onclick="AppV1.selfEval(true)">👍 读得不错</button>
              <button class="btn btn-wrong" onclick="AppV1.selfEval(false)">😅 还需练习</button>
            </div>
          </div>
        `}
      </div>`;
    // 自动播放
    setTimeout(() => Speech.speakCantonese(item.text), 500);
  },

  startRecord() {
    const ss = this.speakState;
    const item = ss.items[ss.index];
    const statusEl = document.getElementById('record-status');
    const resultEl = document.getElementById('record-result');
    const btnEl = document.getElementById('btn-record');

    statusEl.textContent = '🔴 正在听...请朗读';
    btnEl.disabled = true;
    btnEl.classList.add('recording');

    Speech.startListening(
      (transcript, confidence) => {
        statusEl.textContent = `你说的是：「${transcript}」`;
        // 简单对比
        const score = this.compareText(transcript, item.text);
        const displayScore = Math.round(score * 100);
        ss.scores.push(displayScore);

        if (score >= 0.6) {
          resultEl.innerHTML = `<div class="score-good">👍 得分：${displayScore}分 - 读得很好！</div>`;
          Speech.speakCantonese(item.text); // 奖励播放
        } else {
          resultEl.innerHTML = `<div class="score-ok">💪 得分：${displayScore}分 - 再试一次吧！</div>`;
        }
        btnEl.disabled = false;
        btnEl.classList.remove('recording');
        btnEl.textContent = '🎤 再读一次';

        // 自动进入下一个
        setTimeout(() => {
          ss.index++;
          this.renderSpeakItem(document.getElementById('main-content'));
        }, 2500);
      },
      (error) => {
        statusEl.textContent = '识别失败，请重试';
        btnEl.disabled = false;
        btnEl.classList.remove('recording');
      },
      () => {
        btnEl.disabled = false;
        btnEl.classList.remove('recording');
      }
    );
  },

  compareText(spoken, target) {
    // 简单的字符匹配度
    const s = spoken.replace(/\s/g, '');
    const t = target.replace(/\s/g, '');
    if (s === t) return 1;
    let matches = 0;
    for (const ch of t) {
      if (s.includes(ch)) matches++;
    }
    return t.length > 0 ? matches / t.length : 0;
  },

  selfEval(good) {
    const ss = this.speakState;
    ss.scores.push(good ? 85 : 40);
    ss.index++;
    this.renderSpeakItem(document.getElementById('main-content'));
  },

  /* ===== 语音状态指示器 ===== */
  _renderVoiceStatus() {
    const info = Speech.getVoiceInfo();
    const statusClass = info.hasVoice ? 'voice-ok' : 'voice-warn';
    const statusIcon = info.hasVoice ? '✅' : '⚠️';
    const statusText = info.hasVoice
      ? `粤语语音：${info.voiceName} (本地)`
      : '粤语语音未安装 — 点击右侧按钮查看如何安装';
    return `
      <div class="voice-status ${statusClass}">
        <span>${statusIcon} ${statusText}</span>
        <button class="btn-sm voice-test-btn" onclick="event.stopPropagation(); AppV1.navigateTo('voice-test')">🔊 ${info.hasVoice ? '测试语音' : '安装引导'}</button>
      </div>`;
  },

  refreshVoiceStatus() {
    const bar = document.getElementById('voice-status-bar');
    if (bar) bar.innerHTML = this._renderVoiceStatus();
  },

  /* ===== 语音测试页 ===== */
  renderVoiceTest(el) {
    const info = Speech.getVoiceInfo();
    const freshVoices = Speech.synth.getVoices();
    const zhVoices = freshVoices.filter(v => v.lang && v.lang.startsWith('zh'));
    const hkVoices = freshVoices.filter(v => /^zh[-_]HK/i.test(v.lang) || /^yue/i.test(v.lang));
    const testWords = [
      { text: '你好', desc: '你好' },
      { text: '早晨', desc: '早上好' },
      { text: '食飯', desc: '吃饭' },
      { text: '多謝', desc: '谢谢' },
      { text: '返學', desc: '上学' },
      { text: '我鍾意你', desc: '我喜欢你' }
    ];

    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="AppV1.navigateTo('home')">← 返回首页</button>
        <h2>🔊 语音调试 & 安装引导</h2>

        <div class="voice-info-card">
          <h3>当前状态</h3>
          <div class="voice-info-row">
            <span class="label">系统总语音数：</span>
            <span><strong>${freshVoices.length}</strong> 个</span>
          </div>
          <div class="voice-info-row">
            <span class="label">中文语音数：</span>
            <span><strong>${zhVoices.length}</strong> 个</span>
          </div>
          <div class="voice-info-row">
            <span class="label">zh-HK / yue 语音：</span>
            <span><strong>${hkVoices.length}</strong> 个</span>
          </div>
          <div class="voice-info-row">
            <span class="label">粤语语音状态：</span>
            <span class="${info.hasVoice ? 'voice-ok' : 'voice-warn'}" style="font-weight:700">
              ${info.hasVoice ? '✅ 已就绪 — ' + info.voiceName + ' (' + info.voiceLang + ')' : '❌ 未安装粤语语音'}
            </span>
          </div>
        </div>

        ${!info.hasVoice ? `
        <div class="voice-fix-tip">
          <h3>⚠️ 未检测到粤语语音，请按以下步骤安装：</h3>
          <ol>
            <li><strong>macOS：</strong>
              打开「系统设置」→「辅助功能」→「朗读内容」(Spoken Content)<br>
              → 点击「系统声音」下拉 →「管理声音...」<br>
              → 搜索 <strong>Sinji</strong>（善怡）或 <strong>zh-HK</strong><br>
              → 点击下载，等待安装完成<br>
              → 然后点下方「🔄 刷新语音列表」
            </li>
            <li><strong>Windows：</strong>
              设置 → 时间和语言 → 语音 → 添加声音<br>
              → 搜索「中文（繁体，香港）」或「Tracy」<br>
              → 安装后刷新本页
            </li>
            <li><strong>Chrome 浏览器：</strong>
              确保 Chrome 版本 ≥ 90，Chrome 内置在线粤语语音<br>
              如果仍然没有，请先安装系统语音
            </li>
          </ol>
          <p style="margin-top:12px;color:#e65100">安装后记得点击下方的「🔄 刷新语音列表」按钮！</p>
        </div>
        ` : ''}

        <div style="margin: 16px 0; display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="AppV1.refreshVoices()">🔄 刷新语音列表</button>
        </div>

        <h3>🎯 逐个试听所有中文语音</h3>
        <p class="section-desc">点击「试听」，找到听起来是粤语的那个语音，然后点「设为粤语」</p>
        <div class="voice-list">
          ${zhVoices.length === 0 ? '<p style="padding:16px;">未找到任何中文语音</p>' : zhVoices.map((v, i) => `
            <div class="voice-item">
              <div class="voice-item-info">
                <span class="voice-name">${v.name}</span>
                <span class="voice-lang">${v.lang} ${v.localService ? '(本地)' : '(在线)'} ${v.default ? '[默认]' : ''}</span>
              </div>
              <div style="display:flex;gap:6px;">
                <button class="btn-sm" onclick="AppV1.testVoiceByIndex(${Speech.voices.indexOf(v) >= 0 ? Speech.voices.indexOf(v) : i}, '你好早晨食飯多謝返學')">试听</button>
                <button class="btn-sm" onclick="AppV1.setAsCantonese(${Speech.voices.indexOf(v) >= 0 ? Speech.voices.indexOf(v) : i})">设为粤语</button>
              </div>
            </div>
          `).join('')}
        </div>

        <h3>🔤 试听粤语词语</h3>
        <p class="section-desc">用当前选中的语音朗读</p>
        <div class="voice-test-grid">
          ${testWords.map(w => `
            <div class="voice-test-card">
              <div class="vt-word">${w.text}</div>
              <div class="vt-desc">(${w.desc})</div>
              <div class="vt-btns">
                <button class="btn-sm" onclick="Speech.speakCantonese('${w.text}')">🔊 正常</button>
                <button class="btn-sm" onclick="Speech.speakSlow('${w.text}')">🐢 慢速</button>
              </div>
            </div>
          `).join('')}
        </div>

        ${freshVoices.length === 0 ? `
        <div class="voice-fix-tip">
          <h3>⚠️ Chrome 未检测到任何语音</h3>
          <p>请尝试：</p>
          <ol>
            <li>点击上面的「🔄 刷新语音列表」</li>
            <li>完全关闭 Chrome 再重新打开</li>
            <li>检查系统设置中的语音是否已下载完成</li>
          </ol>
        </div>
        ` : ''}
      </div>`;
  },

  testVoiceByIndex(index, text) {
    Speech.stop();
    const voices = Speech.synth.getVoices();
    const voice = voices[index];
    if (!voice) {
      alert('语音不存在，请刷新列表');
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = 0.8;
    console.log('[测试] 使用语音:', voice.name, voice.lang);
    Speech.synth.speak(u);
  },

  testVoice(voiceName, text) {
    Speech.stop();
    const utter = new SpeechSynthesisUtterance(text);
    const voices = Speech.synth.getVoices();
    const voice = voices.find(v => v.name === voiceName);
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    }
    Speech.synth.speak(utter);
  },

  setAsCantonese(index) {
    const voices = Speech.synth.getVoices();
    const voice = voices[index];
    if (!voice) {
      alert('语音不存在');
      return;
    }
    Speech.cantoneseVoice = voice;
    Speech.ttsProvider = 'local';
    // 保存到 localStorage 以便下次记住
    localStorage.setItem('yue_cantonese_voice', JSON.stringify({
      name: voice.name,
      lang: voice.lang
    }));
    alert(`已设为粤语语音：${voice.name} (${voice.lang})\n\n现在点「试听粤语词语」试试看！`);
    this.refreshVoiceStatus();
    this.navigateTo('voice-test');
  },

  refreshVoices() {
    // 强制重新加载
    Speech.voices = Speech.synth.getVoices();
    Speech.cantoneseVoice = null;
    Speech.ttsProvider = 'none';
    Speech.voiceReady = false;
    Speech._initPromise = null;
    // 重新触发加载
    Speech.init().then(() => {
      Speech.voices = Speech.synth.getVoices();
      this.refreshVoiceStatus();
      this.navigateTo('voice-test');
    });
  },

  forceLocalTTS() {
    Speech.cantoneseVoice = null;
    Speech.ttsProvider = 'none';
    Speech._initPromise = null;
    localStorage.removeItem('yue_cantonese_voice');
    Speech.init().then(() => {
      this.refreshVoiceStatus();
      this.navigateTo('voice-test');
    });
  },

  /* ===== 学习统计 ===== */
  renderStats(el) {
    const stats = Progress.getStats();
    const allBadges = Progress.getAllBadges();
    const earnedBadges = Progress.data.badges;

    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="AppV1.navigateTo('home')">← 返回首页</button>
        <h2>📊 学习统计</h2>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-value">${stats.stars}</div>
            <div class="stat-label">总星星数</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📝</div>
            <div class="stat-value">${stats.learnedChars}</div>
            <div class="stat-label">已学汉字</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💬</div>
            <div class="stat-value">${stats.learnedPhrases}</div>
            <div class="stat-label">已学句子</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-value">${stats.accuracy}%</div>
            <div class="stat-label">正确率</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔥</div>
            <div class="stat-value">${stats.bestStreak}</div>
            <div class="stat-label">最佳连对</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-value">${stats.lastPlayDate || '今天'}</div>
            <div class="stat-label">上次学习</div>
          </div>
        </div>

        <h3>🏆 成就徽章 (${earnedBadges.length}/${allBadges.length})</h3>
        <div class="badges-grid">
          ${allBadges.map(b => {
            const earned = earnedBadges.includes(b.id);
            return `
              <div class="badge-item ${earned ? 'earned' : 'locked'}">
                <div class="badge-icon">${earned ? b.icon : '🔒'}</div>
                <div class="badge-name">${b.name}</div>
              </div>`;
          }).join('')}
        </div>

        <div class="stats-actions">
          <button class="btn btn-danger" onclick="if(confirm('确定要清除所有学习记录吗？')) { Progress.resetAll(); AppV1.updateHeader(); AppV1.navigateTo('home'); }">
            🗑️ 重置所有进度
          </button>
        </div>
      </div>`;
  }
};

/* 启动应用 */
// v1 init is now controlled by v2 App (App.init() calls AppV1.init() when needed)
// document.addEventListener('DOMContentLoaded', () => AppV1.init());

window.AppV1 = AppV1;
