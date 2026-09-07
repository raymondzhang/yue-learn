/* =========================================================
   LessonPlayer v2 — 统一课时播放器
   支持 6 种课时类型：story | vocab | dialogue | quiz | game | review
   ========================================================= */
const LessonPlayer = {
  current: null,  // { stage, unit, lesson, lessonIndex, unitLessons }
  _state: {},     // 运行时状态

  /** 加载课时 */
  load(stage, unit, lessonIndex) {
    const lesson = unit.lessons[lessonIndex];
    this.current = {
      stage,
      unit,
      lesson,
      lessonIndex,
      unitLessons: unit.lessons,
      totalLessons: unit.lessons.length
    };
    this._state = {};
    this._render();
  },

  _render() {
    const el = document.getElementById('main-content');
    const { stage, unit, lesson, lessonIndex, totalLessons } = this.current;
    const isDone = Curriculum.isLessonDone(stage.id, unit.id, lesson.id);

    // 公共头部
    const header = `
      <div class="lesson-view">
        <div class="lesson-topbar">
          <button class="back-btn" onclick="Router.navigate('/lesson/${stage.id}/${unit.id}')">← ${unit.name}</button>
          <div class="lesson-progress-text">${lessonIndex + 1} / ${totalLessons}</div>
          <div class="lesson-stage-badge" style="background:${stage.color}">${stage.icon}</div>
        </div>
        <div class="lesson-header-card">
          <div class="lesson-type-badge type-${lesson.type}">${this._typeLabel(lesson.type)}</div>
          <h2>${lesson.title}</h2>
          ${lesson.subtitle ? `<p class="lesson-subtitle">${lesson.subtitle}</p>` : ''}
          ${isDone ? '<div class="lesson-done-badge">✅ 已完成</div>' : ''}
        </div>`;

    // 根据类型渲染内容
    let body = '';
    switch (lesson.type) {
      case 'story': body = this._renderStory(lesson); break;
      case 'vocab': body = this._renderVocab(lesson); break;
      case 'dialogue': body = this._renderDialogue(lesson); break;
      case 'quiz': body = this._renderQuiz(lesson); break;
      case 'game': body = this._renderGame(lesson); break;
      case 'review': body = this._renderReview(lesson); break;
      default: body = '<p>未知课时类型</p>';
    }

    // 底部导航
    const footer = this._renderFooter(stage, unit, lesson, lessonIndex, totalLessons, isDone);

    el.innerHTML = header + body + footer + '</div>';
    el.scrollTop = 0;
    window.scrollTo(0, 0);

    // 自动播放音频（如果有）
    if (lesson.type === 'vocab' && lesson.content && lesson.content.words) {
      setTimeout(() => this._playVocabAudio(0), 600);
    }
  },

  _typeLabel(type) {
    const labels = {
      story: '📖 故事', vocab: '📝 词汇', dialogue: '💬 对话',
      quiz: '🎮 测验', game: '🎯 游戏', review: '📊 复习'
    };
    return labels[type] || type;
  },

  /* ===== 故事模式 ===== */
  _renderStory(lesson) {
    const pages = lesson.content.pages || [];
    const idx = this._state.storyPage || 0;
    const page = pages[idx] || {};
    this._state.storyPage = idx;
    const isLastPage = idx >= pages.length - 1;

    return `
      <div class="lesson-body story-body">
        <div class="story-page">
          ${page.image ? `<div class="story-image">${page.image}</div>` : ''}
          <div class="story-text" onclick="Speech.speakCantonese('${this._esc(page.text || '')}')">
            <p>${page.text || ''}</p>
            <div class="tap-hint">🔊 点击听粤语</div>
          </div>
          ${page.translation ? `<div class="story-translation">${page.translation}</div>` : ''}

          <!-- 跟读练习 -->
          <div class="story-speak-section">
            <p class="story-speak-hint">🎤 跟读练习：先听一遍，然后自己读一遍</p>
            <div class="story-speak-btns">
              <button class="btn btn-speak" onclick="Speech.speakCantonese('${this._esc(page.text || '')}')">🔊 听一遍</button>
              ${Speech.hasRecognition() ? `
                <button class="btn btn-record" id="btn-story-record" onclick="LessonPlayer._storyRecord()">🎤 跟读</button>
                <span class="record-status" id="story-record-status"></span>
              ` : '<span class="voice-warn">⚠️ 需要 Chrome 浏览器才能使用跟读功能</span>'}
            </div>
          </div>

          ${page.words ? `
          <div class="story-keywords">
            <p class="kw-title">📝 生词：</p>
            ${page.words.map(w => `
              <span class="keyword-chip" onclick="event.stopPropagation();Speech.speakCantonese('${this._esc(w.cantonese)}')">
                ${w.cantonese} <small>${w.meaning}</small> 🔊
              </span>
            `).join('')}
          </div>` : ''}

          ${isLastPage ? `
          <div class="story-mini-quiz">
            <p class="mini-quiz-title">🧠 小测验：你记住了吗？</p>
            ${this._renderStoryMiniQuiz(lesson)}
          </div>` : ''}
        </div>
        <div class="story-nav">
          <button class="btn btn-secondary" ${idx === 0 ? 'disabled' : ''}
            onclick="LessonPlayer._storyGo(${idx - 1})">⬅ 上一页</button>
          <div class="story-dots">${pages.map((_, i) =>
            `<span class="story-dot ${i === idx ? 'active' : i < idx ? 'done' : ''}" onclick="LessonPlayer._storyGo(${i})"></span>`
          ).join('')}</div>
          <button class="btn btn-primary" ${isLastPage ? 'disabled' : ''}
            onclick="LessonPlayer._storyGo(${idx + 1})">下一页 ➡</button>
        </div>
        ${isLastPage ? `
        <div class="story-complete-section">
          <button class="btn btn-correct btn-lg" onclick="LessonPlayer._completeLesson()">
            ✅ 完成学习，获得奖励
          </button>
        </div>` : ''}
      </div>`;
  },

  _storyMiniQuizState: null,

  _renderStoryMiniQuiz(lesson) {
    // 从故事中提取关键词生成简单测验
    const pages = lesson.content.pages || [];
    const allWords = [];
    pages.forEach(p => {
      if (p.words) allWords.push(...p.words);
    });
    if (allWords.length < 2) return '<p class="mini-quiz-empty">回顾上面的生词吧！</p>';

    // 选 2-3 个词做测验
    const picked = allWords.sort(() => Math.random() - 0.5).slice(0, Math.min(3, allWords.length));
    if (!this._state.storyQuiz) {
      this._state.storyQuiz = { picked, answered: 0, correct: 0 };
    }
    const sq = this._state.storyQuiz;
    const current = picked[sq.answered] || null;

    if (!current) {
      return `
        <div class="mini-quiz-result">
          <p>🎉 答对 ${sq.correct}/${picked.length} 题！</p>
        </div>`;
    }

    // 生成干扰选项
    const others = allWords.filter(w => w.cantonese !== current.cantonese);
    const distractors = others.sort(() => Math.random() - 0.5).slice(0, 2);
    const options = [current.meaning, ...distractors.map(w => w.meaning)].sort(() => Math.random() - 0.5);

    return `
      <div class="mini-quiz-q">
        <p class="mini-quiz-prompt">「${current.cantonese}」是什么意思？</p>
        <div class="mini-quiz-opts">
          ${options.map(opt => `
            <button class="btn btn-sm btn-outline" onclick="LessonPlayer._storyQuizAnswer('${this._esc(opt)}', '${this._esc(current.meaning)}')">${opt}</button>
          `).join('')}
        </div>
        <span class="mini-quiz-feedback" id="story-quiz-fb"></span>
      </div>`;
  },

  _storyQuizAnswer(chosen, correct) {
    const fb = document.getElementById('story-quiz-fb');
    if (chosen === correct) {
      this._state.storyQuiz.correct++;
      if (fb) fb.innerHTML = '<span class="score-good">✅ 正确！</span>';
      Speech.speakCantonese('啱咗！');
    } else {
      if (fb) fb.innerHTML = `<span class="score-ok">❌ 正确答案是「${correct}」</span>`;
    }
    this._state.storyQuiz.answered++;
    Gamification.addXp(5);
    Gamification.recordCalendar(5);
    setTimeout(() => this._render(), 1200);
  },

  _storyRecord() {
    const page = this.current.lesson.content.pages[this._state.storyPage || 0];
    if (!page) return;
    const statusEl = document.getElementById('story-record-status');
    if (statusEl) statusEl.textContent = '🔴 正在听...请朗读';
    Speech.startListening(
      (transcript) => {
        if (statusEl) statusEl.textContent = `你说：「${transcript}」👍`;
        Gamification.addXp(5);
        Gamification.recordCalendar(5);
      },
      () => { if (statusEl) statusEl.textContent = '请重试'; },
      () => {}
    );
  },

  _storyGo(idx) {
    this._state.storyPage = idx;
    this._render();
    const page = this.current.lesson.content.pages[idx];
    if (page && page.text) {
      setTimeout(() => Speech.speakCantonese(page.text), 400);
    }
  },

  /* ===== 词汇模式 ===== */
  _renderVocab(lesson) {
    const words = lesson.content.words || [];
    const idx = this._state.vocabIdx || 0;
    this._state.vocabIdx = idx;
    const word = words[idx] || {};
    const done = this._state.vocabDone || new Set();

    return `
      <div class="lesson-body vocab-body">
        <div class="vocab-card-big">
          <div class="vocab-display">
            <div class="vocab-word">${word.cantonese || ''}</div>
            <div class="vocab-jp">[${word.jyutping || ''}]</div>
            <div class="vocab-meaning">${word.meaning || ''}</div>
            ${word.note ? `<div class="vocab-note">💡 ${word.note}</div>` : ''}
          </div>
          <div class="vocab-audio-btns">
            <button class="btn btn-speak" onclick="Speech.speakCantonese('${this._esc(word.cantonese)}')">🔊 听发音</button>
            <button class="btn btn-speak" onclick="Speech.speakSlow('${this._esc(word.cantonese)}')">🐢 慢速</button>
          </div>
          ${Speech.hasRecognition() ? `
          <div class="vocab-speak-section">
            <button class="btn btn-record" id="btn-vocab-record" onclick="LessonPlayer._vocabRecord()">🎤 跟读</button>
            <div class="record-status" id="vocab-record-status"></div>
          </div>` : ''}
        </div>
        <div class="vocab-progress-row">
          ${words.map((w, i) => `
            <span class="vocab-dot ${i === idx ? 'active' : done.has(i) ? 'done' : ''}"
              onclick="LessonPlayer._vocabGo(${i})">${i + 1}</span>
          `).join('')}
        </div>
        <div class="vocab-nav">
          <button class="btn btn-secondary" ${idx === 0 ? 'disabled' : ''}
            onclick="LessonPlayer._vocabGo(${idx - 1})">⬅ 上一个</button>
          <button class="btn btn-correct" onclick="LessonPlayer._vocabMarkDone(${idx})">
            ${done.has(idx) ? '✅ 已学' : '✅ 记住了'}
          </button>
          <button class="btn btn-primary" ${idx >= words.length - 1 ? 'disabled' : ''}
            onclick="LessonPlayer._vocabGo(${idx + 1})">下一个 ➡</button>
        </div>
      </div>`;
  },

  _vocabGo(idx) {
    this._state.vocabIdx = idx;
    this._render();
    this._playVocabAudio(idx);
  },

  _playVocabAudio(idx) {
    const words = this.current.lesson.content.words || [];
    if (words[idx]) {
      Speech.speakCantonese(words[idx].cantonese);
    }
  },

  _vocabMarkDone(idx) {
    if (!this._state.vocabDone) this._state.vocabDone = new Set();
    this._state.vocabDone.add(idx);
    this._render();
  },

  _vocabRecord() {
    const statusEl = document.getElementById('vocab-record-status');
    const word = this.current.lesson.content.words[this._state.vocabIdx || 0];
    if (!word) return;
    statusEl.textContent = '🔴 正在听...请朗读';
    Speech.startListening(
      (transcript, confidence) => {
        statusEl.textContent = `你说的是：「${transcript}」`;
        Gamification.addXp(5);
        Gamification.recordCalendar(5);
      },
      () => { statusEl.textContent = '识别失败，请重试'; },
      () => {}
    );
  },

  /* ===== 对话模式 ===== */
  _renderDialogue(lesson) {
    const lines = lesson.content.lines || [];
    const idx = this._state.dialogueIdx || 0;
    this._state.dialogueIdx = idx;
    const line = lines[idx] || {};

    return `
      <div class="lesson-body dialogue-body">
        <div class="dialogue-scene">
          <div class="dialogue-scene-title">${lesson.content.scene || ''}</div>
          <div class="dialogue-bubble ${line.speaker === 'A' ? 'left' : 'right'}">
            <div class="bubble-avatar">${line.speaker === 'A' ? '🧑' : '👧'}</div>
            <div class="bubble-content">
              <div class="bubble-cantonese" onclick="Speech.speakCantonese('${this._esc(line.cantonese)}')">
                ${line.cantonese}
                <div class="tap-hint-sm">🔊 点击听发音</div>
              </div>
              <div class="bubble-jp">[${line.jyutping || ''}]</div>
              <div class="bubble-meaning">${line.meaning || ''}</div>
            </div>
          </div>
          ${line.note ? `<div class="dialogue-note">💡 ${line.note}</div>` : ''}
        </div>
        <div class="dialogue-nav">
          <button class="btn btn-secondary" ${idx === 0 ? 'disabled' : ''}
            onclick="LessonPlayer._dialogueGo(${idx - 1})">⬅ 上一句</button>
          <div class="dialogue-dots">${lines.map((_, i) =>
            `<span class="story-dot ${i === idx ? 'active' : i < idx ? 'done' : ''}" onclick="LessonPlayer._dialogueGo(${i})"></span>`
          ).join('')}</div>
          <button class="btn btn-primary" ${idx >= lines.length - 1 ? 'disabled' : ''}
            onclick="LessonPlayer._dialogueGo(${idx + 1})">下一句 ➡</button>
        </div>
        <div class="dialogue-roleplay">
          <p class="roleplay-hint">🎭 角色扮演：跟着读一遍</p>
          <button class="btn btn-speak" onclick="Speech.speakCantonese('${this._esc(line.cantonese)}')">🔊 听一遍</button>
          ${Speech.hasRecognition() ? `
            <button class="btn btn-record" onclick="LessonPlayer._dialogueRecord()">🎤 我来读</button>
            <div id="dialogue-record-status"></div>` : ''}
        </div>
      </div>`;
  },

  _dialogueGo(idx) {
    this._state.dialogueIdx = idx;
    this._render();
    const line = this.current.lesson.content.lines[idx];
    if (line) setTimeout(() => Speech.speakCantonese(line.cantonese), 400);
  },

  _dialogueRecord() {
    const line = this.current.lesson.content.lines[this._state.dialogueIdx || 0];
    if (!line) return;
    const statusEl = document.getElementById('dialogue-record-status');
    if (statusEl) statusEl.textContent = '🔴 正在听...';
    Speech.startListening(
      (transcript) => {
        if (statusEl) statusEl.textContent = `你说：「${transcript}」👍`;
        Gamification.addXp(5);
        Gamification.recordCalendar(5);
      },
      () => { if (statusEl) statusEl.textContent = '请重试'; },
      () => {}
    );
  },

  /* ===== 测验模式 ===== */
  _renderQuiz(lesson) {
    const questions = lesson.content.questions || [];
    const idx = this._state.quizIdx || 0;
    this._state.quizIdx = idx;
    this._state.quizCorrect = this._state.quizCorrect || 0;
    this._state.quizWrong = this._state.quizWrong || 0;
    this._state.quizAnswered = this._state.quizAnswered || false;

    if (idx >= questions.length) {
      return this._renderQuizResult();
    }

    const q = questions[idx];
    // 播放音频题
    if (q.promptType === 'audio') {
      setTimeout(() => Speech.speakCantonese(q.speakText), 500);
    }

    return `
      <div class="lesson-body quiz-body">
        <div class="quiz-header">
          <div class="quiz-progress">${idx + 1} / ${questions.length}</div>
          <div class="quiz-score">✅${this._state.quizCorrect} ❌${this._state.quizWrong}</div>
        </div>
        <div class="quiz-prompt-card">
          <div class="quiz-prompt">${q.prompt}</div>
          ${q.promptBig ? `<div class="quiz-prompt-big">${q.promptBig}</div>` : ''}
          ${q.promptType === 'audio' ? `
            <button class="btn btn-speak" onclick="Speech.speakCantonese('${this._esc(q.speakText)}')">🔊 再听一次</button>
          ` : ''}
        </div>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <div class="quiz-option" data-value="${this._esc(opt)}" onclick="LessonPlayer._quizAnswer(this, '${this._esc(opt)}', '${this._esc(q.answer)}')">
              <span class="opt-letter">${'ABCD'[i]}</span>
              <span class="opt-text">${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>`;
  },

  _quizAnswer(el, value, answer) {
    if (this._state.quizAnswered) return;
    this._state.quizAnswered = true;
    const correct = value === answer;

    document.querySelectorAll('.quiz-option').forEach(opt => {
      opt.classList.add('disabled');
      if (opt.dataset.value === answer) opt.classList.add('correct');
    });
    if (!correct) el.classList.add('wrong');

    if (correct) {
      this._state.quizCorrect++;
      Gamification.addCorrect();
      Gamification.addXp(10);
      Gamification.recordCalendar(10);
      Speech.speakCantonese(answer);
    } else {
      this._state.quizWrong++;
      Gamification.addWrong();
    }

    setTimeout(() => {
      this._state.quizIdx++;
      this._state.quizAnswered = false;
      this._render();
    }, correct ? 1200 : 2200);
  },

  _renderQuizResult() {
    const total = this._state.quizIdx;
    const correct = this._state.quizCorrect;
    const pct = total > 0 ? Math.round(correct / total * 100) : 0;
    const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;
    Gamification.addStars(stars);
    Gamification.addXp(stars * 20);
    Gamification.recordCalendar(stars * 20);

    let emoji, msg;
    if (pct >= 90) { emoji = '🏆'; msg = '太厉害了！'; }
    else if (pct >= 70) { emoji = '🌟'; msg = '做得不错！'; }
    else if (pct >= 50) { emoji = '💪'; msg = '继续加油！'; }
    else { emoji = '📚'; msg = '再试一次吧！'; }

    return `
      <div class="lesson-body quiz-result">
        <div class="completion-view">
          <div class="complete-icon">${emoji}</div>
          <h2>${msg}</h2>
          <div class="result-stars">${'⭐'.repeat(stars)}</div>
          <div class="result-stats">
            <div>✅ 答对：${correct}</div>
            <div>❌ 答错：${this._state.quizWrong}</div>
            <div>📊 正确率：${pct}%</div>
          </div>
          <div class="result-actions">
            <button class="btn btn-primary" onclick="LessonPlayer._quizRetry()">🔄 再试一次</button>
            <button class="btn btn-correct" onclick="LessonPlayer._completeLesson()">✅ 完成课时</button>
          </div>
        </div>
      </div>`;
  },

  _quizRetry() {
    this._state.quizIdx = 0;
    this._state.quizCorrect = 0;
    this._state.quizWrong = 0;
    this._state.quizAnswered = false;
    this._render();
  },

  /* ===== 游戏模式 ===== */
  _renderGame(lesson) {
    const gameType = lesson.content.gameType || 'match';
    if (gameType === 'match') return this._renderMatchGame(lesson);

    return `
      <div class="lesson-body game-body">
        <div class="game-placeholder">
          <div class="game-icon">🎮</div>
          <p>游戏类型：${gameType}</p>
          <p class="game-hint">互动游戏开发中...</p>
        </div>
      </div>`;
  },

  _renderMatchGame(lesson) {
    // 配对游戏：粤语词 ↔ 普通话意思
    const pairs = lesson.content.pairs || [];
    const selected = this._state.matchSelected || null;
    const matched = this._state.matchMatched || new Set();
    this._state.matchMatched = matched;

    // 创建两个列表（打乱顺序）
    const leftItems = pairs.map((p, i) => ({ id: i, text: p.cantonese, side: 'left' }));
    const rightItems = pairs.map((p, i) => ({ id: i, text: p.meaning, side: 'right' }));
    if (!this._state.matchLeft) {
      this._state.matchLeft = [...leftItems].sort(() => Math.random() - 0.5);
      this._state.matchRight = [...rightItems].sort(() => Math.random() - 0.5);
    }

    const allMatched = matched.size === pairs.length;

    return `
      <div class="lesson-body game-body">
        <div class="game-instruction">🔗 把左边的粤语词和右边的普通话意思连起来！点击配对</div>
        ${allMatched ? `
          <div class="completion-view">
            <div class="complete-icon">🎉</div>
            <h2>全部配对成功！</h2>
            <button class="btn btn-correct" onclick="LessonPlayer._completeLesson()">✅ 完成课时</button>
          </div>
        ` : `
        <div class="match-grid">
          <div class="match-column">
            ${this._state.matchLeft.filter(item => !matched.has(item.id)).map(item => `
              <div class="match-card left ${selected && selected.id === item.id && selected.side === 'left' ? 'selected' : ''}"
                onclick="LessonPlayer._matchSelect(${item.id}, 'left', '${this._esc(item.text)}')">
                <span class="match-text">${item.text}</span>
                <span class="match-speaker" onclick="event.stopPropagation();Speech.speakCantonese('${this._esc(item.text)}')">🔊</span>
              </div>
            `).join('')}
          </div>
          <div class="match-column">
            ${this._state.matchRight.filter(item => !matched.has(item.id)).map(item => `
              <div class="match-card right ${selected && selected.id === item.id && selected.side === 'right' ? 'selected' : ''}"
                onclick="LessonPlayer._matchSelect(${item.id}, 'right', '${this._esc(item.text)}')">
                <span class="match-text">${item.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div id="match-feedback" class="match-feedback"></div>`}
      </div>`;
  },

  _matchSelect(id, side, text) {
    const selected = this._state.matchSelected;
    if (!selected) {
      this._state.matchSelected = { id, side, text };
      this._render();
      return;
    }
    // 第二个选择
    if (selected.side === side) {
      // 同侧，切换选择
      this._state.matchSelected = { id, side, text };
      this._render();
      return;
    }
    // 不同侧，检查配对
    if (selected.id === id) {
      // 配对成功
      if (!this._state.matchMatched) this._state.matchMatched = new Set();
      this._state.matchMatched.add(id);
      this._state.matchSelected = null;
      Gamification.addXp(15);
      Gamification.recordCalendar(15);
      Gamification.addCorrect();
      Speech.speakCantonese(selected.side === 'left' ? selected.text : text);
      this._render();
    } else {
      // 配对失败
      Gamification.addWrong();
      const fb = document.getElementById('match-feedback');
      if (fb) {
        fb.innerHTML = '<span class="match-wrong">❌ 不匹配，再试一次！</span>';
        setTimeout(() => { if (fb) fb.innerHTML = ''; }, 1500);
      }
      this._state.matchSelected = null;
      this._render();
    }
  },

  /* ===== 复习模式 ===== */
  _renderReview(lesson) {
    // 复习当前单元的薄弱点
    const unitId = this.current.unit.id;
    const stageId = this.current.stage.id;
    const weakLessons = [];

    this.current.unit.lessons.forEach((l, i) => {
      const key = `${stageId}/${unitId}/${l.id}`;
      const state = Curriculum.state[key];
      if (state && state.score !== undefined && state.score < 70) {
        weakLessons.push({ lesson: l, index: i, score: state.score });
      }
    });

    const unitProgress = Curriculum.getUnitProgress(stageId, unitId);

    return `
      <div class="lesson-body review-body">
        <div class="review-summary">
          <div class="review-stat">
            <div class="review-stat-value">${unitProgress.done}/${unitProgress.total}</div>
            <div class="review-stat-label">已完成课时</div>
          </div>
          <div class="review-stat">
            <div class="review-stat-value">${weakLessons.length}</div>
            <div class="review-stat-label">薄弱环节</div>
          </div>
        </div>
        ${weakLessons.length > 0 ? `
        <div class="review-weak">
          <h3>📌 需要加强的部分</h3>
          ${weakLessons.map(w => `
            <div class="review-weak-item" onclick="LessonPlayer._reviewRetry(${w.index})">
              <div class="review-weak-name">${w.lesson.title}</div>
              <div class="review-weak-score">上次得分：${w.score}%</div>
              <button class="btn btn-sm">🔄 重新练习</button>
            </div>
          `).join('')}
        </div>` : `
        <div class="review-all-good">
          <div class="complete-icon">🌟</div>
          <p>全部掌握得很好！</p>
        </div>`}
        <div class="review-actions">
          <button class="btn btn-correct" onclick="LessonPlayer._completeLesson()">✅ 完成复习</button>
        </div>
      </div>`;
  },

  _reviewRetry(lessonIndex) {
    const { stage, unit } = this.current;
    this.current.lessonIndex = lessonIndex;
    this.current.lesson = unit.lessons[lessonIndex];
    this._state = {};
    this._render();
  },

  /* ===== 完成课时 ===== */
  async _completeLesson() {
    const { stage, unit, lesson, lessonIndex } = this.current;
    const key = `${stage.id}/${unit.id}/${lesson.id}`;
    const score = this._state.quizCorrect !== undefined
      ? Math.round(this._state.quizCorrect / Math.max(1, this._state.quizIdx) * 100)
      : 100;

    await Curriculum._saveState(key, {
      done: true,
      score,
      completedAt: new Date().toISOString()
    });

    // 奖励
    Gamification.addXp(30);
    Gamification.addStars(1);
    await Gamification.recordCalendar(30);
    Gamification.recordPlay();

    // 检查徽章
    const newBadges = await Gamification.checkBadges();

    // 检查每日挑战
    const ctx = {
      lessonsDone: 1,
      quizCorrect: this._state.quizCorrect || 0,
      bestTodayStreak: Gamification.data.streak,
      speakCount: 0,
      starsEarned: 1,
      reviewDone: lesson.type === 'review' ? 1 : 0,
      perfectCount: score === 100 ? 1 : 0,
      studyMinutes: 5
    };
    await Gamification.checkDailyChallenge(ctx);

    // 检查单元/阶段完成徽章
    if (Curriculum.isUnitDone(stage.id, unit.id)) {
      Gamification.addXp(50);
      Gamification.addStars(3);
    }
    if (Curriculum.isStageDone(stage.id)) {
      const badge = await Gamification.awardBadge(`stage_${stage.level}`);
      if (badge) newBadges.push(badge);
    }
    if (score === 100) {
      await Gamification.awardBadge('perfect_quiz');
    }

    // 渲染完成页
    const el = document.getElementById('main-content');
    const nextLesson = lessonIndex + 1 < this.current.totalLessons ? lessonIndex + 1 : null;
    const nextUnit = !nextLesson ? Curriculum.getNextLesson() : null;

    el.innerHTML = `
      <div class="lesson-view">
        <div class="completion-view">
          <div class="complete-icon">🎉</div>
          <h2>课时完成！</h2>
          <div class="result-stars">⭐ +1</div>
          <div class="result-stats">
            <div>📊 得分：${score}%</div>
            <div>✨ 经验 +30</div>
          </div>
          ${newBadges.length > 0 ? `
          <div class="new-badges">
            ${newBadges.map(b => `
              <div class="new-badge">
                <div class="badge-icon">${b.icon}</div>
                <div class="badge-name">${b.name}</div>
              </div>
            `).join('')}
          </div>` : ''}
          <div class="result-actions">
            ${nextLesson !== null ? `
              <button class="btn btn-primary" onclick="LessonPlayer.load(Curriculum.getStage('${stage.id}'), Curriculum.getUnit('${stage.id}', '${unit.id}'), ${nextLesson})">
                下一个课时 ➡
              </button>` : `
              <button class="btn btn-primary" onclick="Router.navigate('/curriculum')">
                📋 返回课程树
              </button>`}
            <button class="btn btn-secondary" onclick="Router.navigate('/home')">🏠 返回首页</button>
          </div>
        </div>
      </div>`;

    window.scrollTo(0, 0);
  },

  /* ===== 底部导航 ===== */
  _renderFooter(stage, unit, lesson, lessonIndex, totalLessons, isDone) {
    return `
      <div class="lesson-footer">
        <div class="lesson-progress-bar">
          <div class="progress-fill" style="width:${Math.round((lessonIndex + 1) / totalLessons * 100)}%;background:${stage.color}"></div>
        </div>
        <div class="lesson-footer-btns">
          <button class="btn btn-secondary" ${lessonIndex === 0 ? 'disabled' : ''}
            onclick="LessonPlayer.load(Curriculum.getStage('${stage.id}'), Curriculum.getUnit('${stage.id}', '${unit.id}'), ${lessonIndex - 1})">
            ⬅ 上一课
          </button>
          ${lesson.type === 'quiz' || lesson.type === 'review' ? '' : `
            <button class="btn btn-correct" onclick="LessonPlayer._completeLesson()">
              ✅ 完成学习
            </button>`}
          <button class="btn btn-primary" ${lessonIndex >= totalLessons - 1 ? 'disabled' : ''}
            onclick="LessonPlayer.load(Curriculum.getStage('${stage.id}'), Curriculum.getUnit('${stage.id}', '${unit.id}'), ${lessonIndex + 1})">
            下一课 ➡
          </button>
        </div>
      </div>`;
  },

  /* ===== 工具 ===== */
  _esc(s) {
    if (!s) return '';
    return s.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, ' ');
  }
};