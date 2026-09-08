/* =========================================================
   粤学乐园 v2 — 主应用逻辑
   分阶段自主学习平台
   ========================================================= */
const App = {
  ready: false,

  async init() {
    try {
      // 初始化 v1 兼容层（Progress, Speech 等）
      if (typeof AppV1 !== 'undefined' && AppV1.init) {
        try { await AppV1.init(); } catch(e) { console.warn('AppV1 init error:', e); }
      }

      // 初始化 v2 模块
      await Storage.init();
      await Gamification.init();
      await Curriculum.init();

      // 兼容 v1 Progress（如果有旧数据）
      this._migrateV1Progress();

      // 初始化路由
      Router
        .on('/home', () => this.renderHome())
        .on('/curriculum', () => this.renderCurriculum())
        .on('/lesson/:stageId/:unitId', (params) => this.renderUnitLessons(params))
        .on('/lesson/:stageId/:unitId/:lessonIdx', (params) => this.renderLesson(params))
        .on('/practice', () => this.renderPractice())
        .on('/stats', () => this.renderStats())
        .on('/voice-test', () => this.renderVoiceTest());

      Router.init();

      // 初始化语音
      await Speech.init();
      this.ready = true;
      this.updateHeader();
    } catch (e) {
      console.error('[App] 初始化失败:', e);
      document.getElementById('main-content').innerHTML = `
        <div class="section-view" style="text-align:center;padding:40px 20px">
          <h2>😢 加载失败</h2>
          <p style="color:#888;margin:12px 0">${e.message}</p>
          <button class="btn btn-primary" onclick="location.reload()">🔄 重新加载</button>
        </div>`;
    }
  },

  /* ========== 迁移 v1 旧数据 ========== */
  _migrateV1Progress() {
    try {
      const old = localStorage.getItem('yue_learn_progress');
      if (old && !localStorage.getItem('yue_learn_v2_migrated')) {
        const oldData = JSON.parse(old);
        if (oldData.stars > 0) {
          Gamification.data.stars = oldData.stars || 0;
          Gamification.data.totalCorrect = oldData.totalCorrect || 0;
          Gamification.data.totalWrong = oldData.totalWrong || 0;
          Gamification.data.bestStreak = oldData.bestStreak || 0;
          Gamification._save();
        }
        localStorage.setItem('yue_learn_v2_migrated', '1');
      }
    } catch {}
  },

  /* ========== 顶部导航栏 ========== */
  updateHeader() {
    const stats = Gamification.getStats();
    const el = document.getElementById('star-count');
    if (el) el.textContent = stats.stars;

    // 等级
    const lvlEl = document.getElementById('level-display');
    if (lvlEl) lvlEl.textContent = `Lv.${stats.level}`;
  },

  /* ========== 首页 ========== */
  renderHome() {
    const el = document.getElementById('main-content');
    const stats = Gamification.getStats();
    const totalProg = Curriculum.getTotalProgress();
    const nextLesson = Curriculum.getNextLesson();
    const stats2 = Gamification.getStats();

    // 随机每日推荐
    const allPhrases = [];
    if (typeof PHRASE_DATA !== 'undefined') {
      PHRASE_DATA.scenarios.forEach(s => s.phrases.forEach(p => allPhrases.push(p)));
    }
    const daily = allPhrases.length > 0 ? allPhrases[Math.floor(Math.random() * allPhrases.length)] : null;

    el.innerHTML = `
      <div class="home-view">
        <!-- 欢迎卡片 -->
        <div class="welcome-card">
          <div class="welcome-text">
            <h2>👋 歡迎返嚟！</h2>
            <p>今日都要加油學粵語哦～</p>
          </div>
          <div class="level-badge-home">
            <div class="level-num">Lv.${stats.level}</div>
            <div class="level-xp-bar">
              <div class="progress-fill" style="width:${stats.levelProgress}%"></div>
            </div>
            <div class="level-xp-text">${stats.xp} XP</div>
          </div>
        </div>

        <!-- 课程进度 -->
        <div class="home-section" onclick="Router.navigate('/curriculum')">
          <div class="section-header">
            <h3>🗺️ 学习旅程</h3>
            <span class="section-arrow">▶</span>
          </div>
          <div class="progress-bar large">
            <div class="progress-fill" style="width:${totalProg.pct}%"></div>
          </div>
          <div class="section-meta">已完成 ${totalProg.done}/${totalProg.total} 课时 (${totalProg.pct}%)</div>
        </div>

        ${nextLesson ? `
        <!-- 继续学习 -->
        <div class="home-section continue-section" onclick="Router.navigate('/lesson/${nextLesson.stage.id}/${nextLesson.unit.id}/${nextLesson.unit.lessons.indexOf(nextLesson.lesson)}')">
          <div class="section-header">
            <h3>▶ 继续学习</h3>
            <span class="section-arrow">→</span>
          </div>
          <div class="continue-card">
            <div class="continue-stage" style="background:${nextLesson.stage.color}">${nextLesson.stage.icon}</div>
            <div class="continue-info">
              <div class="continue-unit">${nextLesson.unit.name}</div>
              <div class="continue-title">${nextLesson.lesson.title}</div>
              <div class="continue-type">${nextLesson.lesson.type === 'story' ? '📖 故事' : nextLesson.lesson.type === 'vocab' ? '📝 词汇' : nextLesson.lesson.type === 'dialogue' ? '💬 对话' : nextLesson.lesson.type === 'quiz' ? '🎮 测验' : nextLesson.lesson.type === 'game' ? '🎯 游戏' : '📊 复习'}</div>
            </div>
          </div>
        </div>` : ''}

        ${daily ? `
        <!-- 每日推荐 -->
        <div class="home-section daily-phrase-card" onclick="Speech.speakCantonese('${daily.cantonese.replace(/'/g, "\\'")}')">
          <div class="card-badge">📌 今日推荐</div>
          <div class="phrase-cantonese">${daily.cantonese}</div>
          <div class="phrase-jp">[${daily.jp}]</div>
          <div class="phrase-meaning">普通话：${daily.meaning}</div>
          <div class="tap-hint">🔊 点击听粤语发音</div>
        </div>` : ''}

        <!-- 每日挑战 -->
        <div class="home-section">
          <div class="section-header">
            <h3>🎯 每日挑战</h3>
          </div>
          <div class="challenge-list">
            ${stats.todayChallenges.map(c => `
              <div class="challenge-item ${c.done ? 'done' : ''}">
                <span class="challenge-check">${c.done ? '✅' : '⬜'}</span>
                <span class="challenge-desc">${c.desc}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 快捷入口 -->
        <div class="home-section">
          <div class="section-header">
            <h3>🧩 自由练习</h3>
            <span class="section-desc">复习已学内容，任意练习</span>
          </div>
          <div class="quick-grid">
            <div class="quick-card" onclick="Router.navigate('/practice')" style="--accent: #FF6B6B">
              <div class="quick-icon">📝</div>
              <div class="quick-name">繁体字学堂</div>
            </div>
            <div class="quick-card" onclick="Router.navigate('/practice')" style="--accent: #4ECDC4">
              <div class="quick-icon">🗣️</div>
              <div class="quick-name">场景对话</div>
            </div>
            <div class="quick-card" onclick="Router.navigate('/practice')" style="--accent: #45B7D1">
              <div class="quick-icon">🎮</div>
              <div class="quick-name">闯关练习</div>
            </div>
            <div class="quick-card" onclick="Router.navigate('/stats')" style="--accent: #DDA0DD">
              <div class="quick-icon">📊</div>
              <div class="quick-name">学习统计</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* ========== 课程树 ========== */
  renderCurriculum() {
    const el = document.getElementById('main-content');
    Curriculum.renderTree(el);
  },

  /* ========== 单元课时列表 ========== */
  renderUnitLessons(params) {
    const el = document.getElementById('main-content');
    const { stageId, unitId } = params;
    const stage = Curriculum.getStage(stageId);
    const unit = Curriculum.getUnit(stageId, unitId);

    if (!stage || !unit) {
      Router.navigate('/curriculum');
      return;
    }

    const unitProg = Curriculum.getUnitProgress(stageId, unitId);
    const unitUnlocked = Curriculum.isUnitUnlocked(stageId, unitId);

    if (!unitUnlocked) {
      Router.navigate('/curriculum');
      return;
    }

    el.innerHTML = `
      <div class="unit-lessons-view">
        <div class="unit-lessons-header">
          <button class="back-btn" onclick="Router.navigate('/curriculum')">← 课程树</button>
          <div class="unit-header-card" style="border-left: 4px solid ${stage.color}">
            <div class="unit-header-top">
              <span class="unit-icon-lg">${unit.icon}</span>
              <div>
                <div class="unit-stage-label" style="color:${stage.color}">${stage.icon} ${stage.name}</div>
                <h2>${unit.name}</h2>
              </div>
            </div>
            <div class="unit-progress-info">
              <div class="progress-bar">
                <div class="progress-fill" style="width:${unitProg.pct}%;background:${stage.color}"></div>
              </div>
              <span>${unitProg.done}/${unitProg.total} 课时完成</span>
            </div>
          </div>
        </div>
        <div class="lesson-list">
          ${unit.lessons.map((lesson, i) => {
            const isDone = Curriculum.isLessonDone(stageId, unitId, lesson.id);
            const isUnlocked = i === 0 || Curriculum.isLessonDone(stageId, unitId, unit.lessons[i - 1].id);
            const typeIcon = { story: '📖', vocab: '📝', dialogue: '💬', quiz: '🎮', game: '🎯', review: '📊' }[lesson.type] || '📌';
            return `
            <div class="lesson-item ${isDone ? 'done' : ''} ${!isUnlocked ? 'locked' : ''}"
              onclick="${isUnlocked ? `Router.navigate('/lesson/${stageId}/${unitId}/${i}')` : ''}">
              <div class="lesson-item-num">${isDone ? '✅' : !isUnlocked ? '🔒' : i + 1}</div>
              <div class="lesson-item-content">
                <div class="lesson-item-type">${typeIcon} ${lesson.type === 'story' ? '故事' : lesson.type === 'vocab' ? '词汇' : lesson.type === 'dialogue' ? '对话' : lesson.type === 'quiz' ? '测验' : lesson.type === 'game' ? '游戏' : '复习'}</div>
                <div class="lesson-item-title">${lesson.title}</div>
                ${lesson.subtitle ? `<div class="lesson-item-sub">${lesson.subtitle}</div>` : ''}
              </div>
              <div class="lesson-item-arrow">${isUnlocked ? '▶' : ''}</div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  /* ========== 课时播放 ========== */
  renderLesson(params) {
    const { stageId, unitId, lessonIdx } = params;
    const stage = Curriculum.getStage(stageId);
    const unit = Curriculum.getUnit(stageId, unitId);
    const idx = parseInt(lessonIdx) || 0;

    if (!stage || !unit || idx >= unit.lessons.length) {
      Router.navigate(`/lesson/${stageId}/${unitId}`);
      return;
    }

    LessonPlayer.load(stage, unit, idx);
  },

  /* ========== 自由练习（v1 兼容） ========== */
  renderPractice() {
    const el = document.getElementById('main-content');
    if (typeof AppV1 !== 'undefined') {
      // 委托给 v1，渲染 v1 首页
      AppV1.currentView = 'home';
      AppV1.renderHome(el);
      return;
    }
    // 简易回退
    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="Router.navigate('/home')">← 返回首页</button>
        <h2>🧩 自由练习</h2>
        <p class="section-desc">选择一种练习方式</p>
        <div class="quick-grid" style="margin-top:16px">
          <div class="quick-card" onclick="AppV1.navigateTo('characters')" style="--accent: #FF6B6B">
            <div class="quick-icon">📝</div><div class="quick-name">繁体字学堂</div></div>
          <div class="quick-card" onclick="AppV1.navigateTo('cantonese')" style="--accent: #4ECDC4">
            <div class="quick-icon">🗣️</div><div class="quick-name">场景对话</div></div>
          <div class="quick-card" onclick="AppV1.navigateTo('quiz')" style="--accent: #45B7D1">
            <div class="quick-icon">🎮</div><div class="quick-name">闯关练习</div></div>
          <div class="quick-card" onclick="AppV1.navigateTo('listening')" style="--accent: #96CEB4">
            <div class="quick-icon">👂</div><div class="quick-name">听力训练</div></div>
          <div class="quick-card" onclick="AppV1.navigateTo('speaking')" style="--accent: #FFEAA7">
            <div class="quick-icon">🎤</div><div class="quick-name">语音跟读</div></div>
        </div>
      </div>`;
  },

  /* ========== 学习统计 ========== */
  renderStats() {
    const el = document.getElementById('main-content');
    const stats = Gamification.getStats();
    const totalProg = Curriculum.getTotalProgress();
    const levelInfo = Gamification.getLevelInfo();

    // 日历热力图（最近30天）
    const calendar = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().slice(0, 10);
      const xp = stats.calendar[key] || 0;
      const level = xp === 0 ? 0 : xp < 30 ? 1 : xp < 60 ? 2 : xp < 100 ? 3 : 4;
      calendar.push({ date: key, day: d.getDate(), xp, level });
    }

    // 所有徽章
    const allBadges = Gamification.ALL_BADGES.map(b => ({
      ...b,
      earned: Gamification.data.badges.includes(b.id)
    }));

    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="Router.navigate('/home')">← 返回首页</button>
        <h2>📊 学习统计</h2>

        <!-- 等级 -->
        <div class="level-card">
          <div class="level-display">
            <div class="level-big">Lv.${levelInfo.level}</div>
            <div class="level-progress-section">
              <div class="progress-bar large">
                <div class="progress-fill" style="width:${levelInfo.progress}%"></div>
              </div>
              <div class="level-xp-detail">${levelInfo.xp} / ${levelInfo.nextXp} XP</div>
            </div>
          </div>
        </div>

        <!-- 数据网格 -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-value">${stats.stars}</div>
            <div class="stat-label">总星星</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔥</div>
            <div class="stat-value">${stats.streak}</div>
            <div class="stat-label">连续天数</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-value">${stats.accuracy}%</div>
            <div class="stat-label">正确率</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-value">${totalProg.done}</div>
            <div class="stat-label">已完成课时</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔥</div>
            <div class="stat-value">${stats.bestStreak}</div>
            <div class="stat-label">最佳连对</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🏅</div>
            <div class="stat-value">${stats.badges}</div>
            <div class="stat-label">徽章</div>
          </div>
        </div>

        <!-- 日历热力图 -->
        <div class="calendar-section">
          <h3>📅 最近30天</h3>
          <div class="calendar-grid">
            ${calendar.map(d => `
              <div class="calendar-day level-${d.level}" title="${d.date}: ${d.xp} XP">
                <span>${d.day}</span>
              </div>
            `).join('')}
          </div>
          <div class="calendar-legend">
            <span class="legend-item"><span class="legend-box level-0"></span> 无</span>
            <span class="legend-item"><span class="legend-box level-1"></span> 1-29</span>
            <span class="legend-item"><span class="legend-box level-2"></span> 30-59</span>
            <span class="legend-item"><span class="legend-box level-3"></span> 60-99</span>
            <span class="legend-item"><span class="legend-box level-4"></span> 100+</span>
          </div>
        </div>

        <!-- 徽章墙 -->
        <div class="badges-section">
          <h3>🏅 徽章墙</h3>
          <div class="badges-grid">
            ${allBadges.map(b => `
              <div class="badge-card ${b.earned ? 'earned' : 'locked'}">
                <div class="badge-icon">${b.earned ? b.icon : '🔒'}</div>
                <div class="badge-name">${b.name}</div>
                <div class="badge-desc">${b.earned ? b.desc : '尚未解锁'}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>`;
  },

  /* ========== 语音测试页 ========== */
  renderVoiceTest() {
    const el = document.getElementById('main-content');
    if (typeof AppV1 !== 'undefined') {
      AppV1.renderVoiceTest(el);
      return;
    }
    const info = Speech.getVoiceInfo();
    el.innerHTML = `
      <div class="section-view">
        <button class="back-btn" onclick="Router.navigate('/home')">← 返回首页</button>
        <h2>🔊 语音状态</h2>
        <div class="voice-info-card">
          <div class="voice-info-row">
            <span>粤语语音：</span>
            <span class="${info.hasVoice ? 'voice-ok' : 'voice-warn'}">
              ${info.hasVoice ? '✅ ' + info.voiceName : '⚠️ 未安装'}
            </span>
          </div>
        </div>
        <p class="section-desc" style="margin-top:16px">请使用 Chrome 浏览器并在系统设置中安装粤语语音（如 macOS Sinji）获得最佳体验。</p>
      </div>`;
  }
};

/* 启动应用 */
document.addEventListener('DOMContentLoaded', () => App.init());

// v1 兼容已在 app-v1.js 中完成（window.AppV1 = AppV1）