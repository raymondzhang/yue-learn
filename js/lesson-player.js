/* =========================================================
   LessonPlayer v2 — 统一课时播放器
   支持 6 种课时类型：story | vocab | dialogue | quiz | game | review
   ========================================================= */
const LessonPlayer = {
  current: null,  // { stage, unit, lesson, lessonIndex, unitLessons }
  _state: {},     // 运行时状态
  _speakState: { active: false, status: 'idle' }, // 跟读状态

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
    this._speakState = { active: false, status: 'idle' };
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
          ${Speech.hasRecognition() ? this._renderSpeakSection(page.text || '', 'story-speak') : `
          <div class="speak-practice">
            <div class="speak-target">
              <div class="speak-target-label">🎯 请跟读：</div>
              <div class="speak-target-text" onclick="Speech.speakCantonese('${this._esc(page.text || '')}')">
                ${page.text || ''} <span class="speak-replay">🔊</span>
              </div>
            </div>
            <p class="speak-unsupported">⚠️ 请使用 Chrome 浏览器开启跟读评分功能</p>
          </div>`}

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
          ${Speech.hasRecognition() ? this._renderSpeakSection(word.cantonese || '', 'vocab-speak') : `
          <div class="speak-practice">
            <p class="speak-unsupported">⚠️ 请使用 Chrome 浏览器开启跟读评分功能</p>
          </div>`}
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
          <p class="roleplay-hint">🎭 角色扮演</p>
          <button class="btn btn-speak" onclick="Speech.speakCantonese('${this._esc(line.cantonese)}')">🔊 听一遍</button>
          ${Speech.hasRecognition() ? this._renderSpeakSection(line.cantonese || '', 'dialogue-speak') : ''}
        </div>
      </div>`;
  },

  _dialogueGo(idx) {
    this._state.dialogueIdx = idx;
    this._render();
    const line = this.current.lesson.content.lines[idx];
    if (line) setTimeout(() => Speech.speakCantonese(line.cantonese), 400);
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
    if (gameType === 'word-order') return this._renderWordOrderGame(lesson);
    if (gameType === 'fill-blank') return this._renderFillBlankGame(lesson);
    if (gameType === 'sound-picture') return this._renderSoundPictureGame(lesson);

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
                data-id="${item.id}" data-side="left" data-text="${item.text.replace(/"/g, '&quot;')}"
                onclick="LessonPlayer._matchSelect(this)">
                <span class="match-text">${item.text}</span>
                <span class="match-speaker" onclick="event.stopPropagation();Speech.speakCantonese('${this._esc(item.text)}')">🔊</span>
              </div>
            `).join('')}
          </div>
          <div class="match-column">
            ${this._state.matchRight.filter(item => !matched.has(item.id)).map(item => `
              <div class="match-card right ${selected && selected.id === item.id && selected.side === 'right' ? 'selected' : ''}"
                data-id="${item.id}" data-side="right" data-text="${item.text.replace(/"/g, '&quot;')}"
                onclick="LessonPlayer._matchSelect(this)">
                <span class="match-text">${item.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div id="match-feedback" class="match-feedback"></div>`}
      </div>`;
  },

  _matchSelect(el) {
    const id = parseInt(el.dataset.id);
    const side = el.dataset.side;
    const text = el.dataset.text;
    const selected = this._state.matchSelected;
    if (!selected) {
      this._state.matchSelected = { id, side, text };
      this._render();
      return;
    }
    if (selected.side === side) {
      this._state.matchSelected = { id, side, text };
      this._render();
      return;
    }
    if (selected.id === id) {
      if (!this._state.matchMatched) this._state.matchMatched = new Set();
      this._state.matchMatched.add(id);
      this._state.matchSelected = null;
      Gamification.addXp(15);
      Gamification.recordCalendar(15);
      Gamification.addCorrect();
      Speech.speakCantonese(selected.side === 'left' ? selected.text : text);
      this._render();
    } else {
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

  /* ===== 排字成句游戏 ===== */
  _renderWordOrderGame(lesson) {
    const questions = lesson.content.questions || [];
    const idx = this._state.woIdx || 0;
    this._state.woIdx = idx;
    this._state.woCorrect = this._state.woCorrect || 0;

    if (idx >= questions.length) {
      return this._renderWordOrderResult(questions.length);
    }

    const q = questions[idx];
    const words = q.words || [];
    const selected = this._state.woSelected || [];
    this._state.woSelected = selected;

    // 播放提示音
    if (selected.length === 0 && !this._state.woPlayed) {
      this._state.woPlayed = true;
      setTimeout(() => Speech.speakCantonese(q.answer), 500);
    }

    const remaining = words.map((w, i) => ({ word: w, idx: i })).filter(item => !selected.includes(item.idx));
    const allDone = selected.length === words.length;
    const userSentence = selected.map(i => words[i]).join('');
    const isCorrect = allDone && userSentence === q.answer;

    return `
      <div class="lesson-body game-body">
        <div class="game-header">
          <div class="quiz-progress">${idx + 1} / ${questions.length}</div>
          <div class="quiz-score">✅${this._state.woCorrect}</div>
        </div>
        <div class="game-instruction">📝 点击词语，排出正确的粤语句子</div>
        ${q.hint ? `<div class="game-hint-text">💡 ${q.hint}</div>` : ''}
        <div class="wo-meaning">普通话：${q.meaning}</div>
        <div class="wo-target-area">
          ${selected.length > 0 ? `
            <div class="wo-selected-words">${selected.map(i => `<span class="wo-word selected">${words[i]}</span>`).join('')}</div>
          ` : `<div class="wo-placeholder">👇 点击下方词语组句</div>`}
        </div>
        ${!allDone ? `
          <div class="wo-word-pool">
            ${remaining.map(item => `
              <div class="wo-word-tile" data-idx="${item.idx}" onclick="LessonPlayer._woSelect(this)">${item.word}</div>
            `).join('')}
          </div>
        ` : ''}
        <div class="wo-actions">
          ${selected.length > 0 && !allDone ? `
            <button class="btn btn-secondary btn-sm" onclick="LessonPlayer._woUndo()">↩ 撤回</button>
          ` : ''}
          ${selected.length > 0 ? `
            <button class="btn btn-secondary btn-sm" onclick="LessonPlayer._woReset()">🔄 重来</button>
          ` : ''}
        </div>
        ${allDone ? `
          <div class="wo-result-area">
            <div class="wo-result-sentence ${isCorrect ? 'correct' : 'wrong'}">
              ${isCorrect ? '✅' : '❌'} ${userSentence}
            </div>
            ${!isCorrect ? `<div class="wo-correct-answer">正确答案：${q.answer}</div>` : ''}
            <div class="wo-result-actions">
              <button class="btn ${isCorrect ? 'btn-correct' : 'btn-primary'}" onclick="LessonPlayer._woNext()">
                ${idx < questions.length - 1 ? '下一题 ➡' : '查看结果'}
              </button>
            </div>
          </div>
        ` : ''}
        <button class="btn btn-speak" onclick="Speech.speakCantonese('${this._esc(q.answer)}')" style="margin-top:12px">🔊 听标准句子</button>
      </div>`;
  },

  _woSelect(el) {
    const idx = parseInt(el.dataset.idx);
    if (!this._state.woSelected) this._state.woSelected = [];
    this._state.woSelected.push(idx);

    const q = this.current.lesson.content.questions[this._state.woIdx];
    const words = q.words;
    const userSentence = this._state.woSelected.map(i => words[i]).join('');

    // 全部选完时自动判定
    if (this._state.woSelected.length === words.length) {
      if (userSentence === q.answer) {
        this._state.woCorrect++;
        Gamification.addXp(15);
        Gamification.recordCalendar(15);
        Gamification.addCorrect();
        Speech.speakCantonese(q.answer);
      } else {
        Gamification.addWrong();
      }
    }
    this._render();
  },

  _woUndo() {
    if (this._state.woSelected && this._state.woSelected.length > 0) {
      this._state.woSelected.pop();
      this._render();
    }
  },

  _woReset() {
    this._state.woSelected = [];
    this._render();
  },

  _woNext() {
    this._state.woIdx++;
    this._state.woSelected = [];
    this._state.woPlayed = false;
    this._render();
  },

  _renderWordOrderResult(total) {
    const correct = this._state.woCorrect || 0;
    const pct = total > 0 ? Math.round(correct / total * 100) : 0;
    const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;
    Gamification.addStars(stars);
    Gamification.addXp(stars * 15);
    Gamification.recordCalendar(stars * 15);

    return `
      <div class="lesson-body game-body">
        <div class="completion-view">
          <div class="complete-icon">${pct >= 70 ? '🎉' : '💪'}</div>
          <h2>${pct >= 90 ? '太厉害了！' : pct >= 70 ? '做得不错！' : '继续加油！'}</h2>
          <div class="result-stars">${'⭐'.repeat(stars)}</div>
          <div class="result-stats">
            <div>✅ 答对：${correct}/${total}</div>
            <div>📊 正确率：${pct}%</div>
          </div>
          <div class="result-actions">
            <button class="btn btn-primary" onclick="LessonPlayer._woRetry()">🔄 再试一次</button>
            <button class="btn btn-correct" onclick="LessonPlayer._completeLesson()">✅ 完成课时</button>
          </div>
        </div>
      </div>`;
  },

  _woRetry() {
    this._state.woIdx = 0;
    this._state.woCorrect = 0;
    this._state.woSelected = [];
    this._state.woPlayed = false;
    this._render();
  },

  /* ===== 填空游戏 ===== */
  _renderFillBlankGame(lesson) {
    const questions = lesson.content.questions || [];
    const idx = this._state.fbIdx || 0;
    this._state.fbIdx = idx;
    this._state.fbCorrect = this._state.fbCorrect || 0;
    this._state.fbWrong = this._state.fbWrong || 0;
    this._state.fbAnswered = this._state.fbAnswered || false;

    if (idx >= questions.length) {
      return this._renderFillBlankResult(questions.length);
    }

    const q = questions[idx];
    // 播放音频提示
    if (q.speakText && !this._state.fbAnswered) {
      setTimeout(() => Speech.speakCantonese(q.speakText), 500);
    }

    // 生成选项（正确答案 + 干扰项）
    const options = q.options || this._generateFillBlankOptions(q.answer, lesson);

    return `
      <div class="lesson-body game-body">
        <div class="game-header">
          <div class="quiz-progress">${idx + 1} / ${questions.length}</div>
          <div class="quiz-score">✅${this._state.fbCorrect} ❌${this._state.fbWrong}</div>
        </div>
        <div class="game-instruction">✏️ 选出正确的词语填入空格</div>
        <div class="fb-sentence-card">
          <div class="fb-sentence">${this._highlightBlank(q.sentence)}</div>
          ${q.meaning ? `<div class="fb-meaning">💬 ${q.meaning}</div>` : ''}
        </div>
        ${q.speakText ? `
          <button class="btn btn-speak" onclick="Speech.speakCantonese('${this._esc(q.speakText)}')" style="margin:8px 0">🔊 听完整句子</button>
        ` : ''}
        <div class="quiz-options">
          ${options.map((opt, i) => `
            <div class="quiz-option" data-value="${this._esc(opt)}" data-answer="${this._esc(q.answer)}" onclick="LessonPlayer._fbAnswer(this)">
              <span class="opt-letter">${'ABCD'[i]}</span>
              <span class="opt-text">${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>`;
  },

  _highlightBlank(sentence) {
    return sentence.replace('___', '<span class="fb-blank">___</span>');
  },

  _generateFillBlankOptions(answer, lesson) {
    // 从当前课时其他题目中收集干扰项
    const allAnswers = (lesson.content.questions || []).map(q => q.answer).filter(a => a !== answer);
    const distractors = allAnswers.sort(() => Math.random() - 0.5).slice(0, 3);
    while (distractors.length < 3 && allAnswers.length > 0) {
      distractors.push(allAnswers.pop());
    }
    return [answer, ...distractors].sort(() => Math.random() - 0.5);
  },

  _fbAnswer(el) {
    if (this._state.fbAnswered) return;
    this._state.fbAnswered = true;
    const value = el.dataset.value;
    const answer = el.dataset.answer;
    const correct = value === answer;

    document.querySelectorAll('.quiz-option').forEach(opt => {
      opt.classList.add('disabled');
      if (opt.dataset.value === answer) opt.classList.add('correct');
    });
    if (!correct) el.classList.add('wrong');

    // 高亮填空处
    const blankEl = document.querySelector('.fb-blank');
    if (blankEl) {
      blankEl.textContent = correct ? answer : answer;
      blankEl.classList.add(correct ? 'fb-correct' : 'fb-wrong');
    }

    if (correct) {
      this._state.fbCorrect++;
      Gamification.addXp(10);
      Gamification.recordCalendar(10);
      Gamification.addCorrect();
      if (this.current.lesson.content.questions[this._state.fbIdx].speakText) {
        Speech.speakCantonese(this.current.lesson.content.questions[this._state.fbIdx].speakText);
      }
    } else {
      this._state.fbWrong++;
      Gamification.addWrong();
    }

    setTimeout(() => {
      this._state.fbIdx++;
      this._state.fbAnswered = false;
      this._render();
    }, correct ? 1200 : 2200);
  },

  _renderFillBlankResult(total) {
    const correct = this._state.fbCorrect || 0;
    const wrong = this._state.fbWrong || 0;
    const pct = total > 0 ? Math.round(correct / total * 100) : 0;
    const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;
    Gamification.addStars(stars);
    Gamification.addXp(stars * 15);
    Gamification.recordCalendar(stars * 15);

    return `
      <div class="lesson-body game-body">
        <div class="completion-view">
          <div class="complete-icon">${pct >= 70 ? '🎉' : '💪'}</div>
          <h2>${pct >= 90 ? '太厉害了！' : pct >= 70 ? '做得不错！' : '继续加油！'}</h2>
          <div class="result-stars">${'⭐'.repeat(stars)}</div>
          <div class="result-stats">
            <div>✅ 答对：${correct}</div>
            <div>❌ 答错：${wrong}</div>
            <div>📊 正确率：${pct}%</div>
          </div>
          <div class="result-actions">
            <button class="btn btn-primary" onclick="LessonPlayer._fbRetry()">🔄 再试一次</button>
            <button class="btn btn-correct" onclick="LessonPlayer._completeLesson()">✅ 完成课时</button>
          </div>
        </div>
      </div>`;
  },

  _fbRetry() {
    this._state.fbIdx = 0;
    this._state.fbCorrect = 0;
    this._state.fbWrong = 0;
    this._state.fbAnswered = false;
    this._render();
  },

  /* ===== 听音选图游戏 ===== */
  _renderSoundPictureGame(lesson) {
    const questions = lesson.content.questions || [];
    const idx = this._state.spIdx || 0;
    this._state.spIdx = idx;
    this._state.spCorrect = this._state.spCorrect || 0;
    this._state.spWrong = this._state.spWrong || 0;
    this._state.spAnswered = this._state.spAnswered || false;

    if (idx >= questions.length) {
      return this._renderSoundPictureResult(questions.length);
    }

    const q = questions[idx];

    // 自动播放音频
    if (!this._state.spAnswered) {
      setTimeout(() => Speech.speakCantonese(q.speakText), 500);
    }

    return `
      <div class="lesson-body game-body">
        <div class="game-header">
          <div class="quiz-progress">${idx + 1} / ${questions.length}</div>
          <div class="quiz-score">✅${this._state.spCorrect} ❌${this._state.spWrong}</div>
        </div>
        <div class="game-instruction">👂 听粤语发音，选出正确的意思</div>
        <div class="sp-audio-area">
          <button class="btn btn-speak btn-lg" onclick="Speech.speakCantonese('${this._esc(q.speakText)}')">
            🔊 再听一次
          </button>
          ${q.speakSlow !== false ? `
            <button class="btn btn-speak" onclick="Speech.speakSlow('${this._esc(q.speakText)}')">🐢 慢速</button>
          ` : ''}
        </div>
        <div class="sp-options-grid">
          ${(q.options || []).map((opt, i) => `
            <div class="sp-option-card" data-value="${this._esc(opt.text)}" data-answer="${this._esc(q.answer)}" onclick="LessonPlayer._spAnswer(this)">
              <div class="sp-option-emoji">${opt.emoji || '📌'}</div>
              <div class="sp-option-text">${opt.text}</div>
            </div>
          `).join('')}
        </div>
      </div>`;
  },

  _spAnswer(el) {
    if (this._state.spAnswered) return;
    this._state.spAnswered = true;
    const value = el.dataset.value;
    const answer = el.dataset.answer;
    const correct = value === answer;

    document.querySelectorAll('.sp-option-card').forEach(card => {
      card.classList.add('disabled');
      if (card.dataset.value === answer) card.classList.add('correct');
    });
    if (!correct) el.classList.add('wrong');

    if (correct) {
      this._state.spCorrect++;
      Gamification.addXp(10);
      Gamification.recordCalendar(10);
      Gamification.addCorrect();
      Speech.speakCantonese(answer);
    } else {
      this._state.spWrong++;
      Gamification.addWrong();
    }

    setTimeout(() => {
      this._state.spIdx++;
      this._state.spAnswered = false;
      this._render();
    }, correct ? 1200 : 2200);
  },

  _renderSoundPictureResult(total) {
    const correct = this._state.spCorrect || 0;
    const wrong = this._state.spWrong || 0;
    const pct = total > 0 ? Math.round(correct / total * 100) : 0;
    const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;
    Gamification.addStars(stars);
    Gamification.addXp(stars * 15);
    Gamification.recordCalendar(stars * 15);

    return `
      <div class="lesson-body game-body">
        <div class="completion-view">
          <div class="complete-icon">${pct >= 70 ? '🎉' : '💪'}</div>
          <h2>${pct >= 90 ? '太厉害了！' : pct >= 70 ? '做得不错！' : '继续加油！'}</h2>
          <div class="result-stars">${'⭐'.repeat(stars)}</div>
          <div class="result-stats">
            <div>✅ 答对：${correct}</div>
            <div>❌ 答错：${wrong}</div>
            <div>📊 正确率：${pct}%</div>
          </div>
          <div class="result-actions">
            <button class="btn btn-primary" onclick="LessonPlayer._spRetry()">🔄 再试一次</button>
            <button class="btn btn-correct" onclick="LessonPlayer._completeLesson()">✅ 完成课时</button>
          </div>
        </div>
      </div>`;
  },

  _spRetry() {
    this._state.spIdx = 0;
    this._state.spCorrect = 0;
    this._state.spWrong = 0;
    this._state.spAnswered = false;
    this._render();
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
  },

  /* ===== 跟读练习（共享组件） ===== */
  /** 渲染跟读区域 */
  _renderSpeakSection(targetText, elemId) {
    const ss = this._speakState;
    const isRecording = ss.status === 'listening';
    const isProcessing = ss.status === 'processing';
    const hasResult = ss.status === 'result';
    const hasError = ss.status === 'error';
    const remaining = Math.max(0, 20 - (ss.elapsed || 0));

    return `
      <div class="speak-practice" id="${elemId}">
        <div class="speak-target">
          <div class="speak-target-label">🎯 请跟读：</div>
          <div class="speak-target-text" onclick="Speech.speakCantonese('${this._esc(targetText)}')">
            ${targetText} <span class="speak-replay">🔊</span>
          </div>
        </div>

        <div class="speak-controls">
          <button class="btn-speak-record ${isRecording ? 'recording' : ''} ${isProcessing ? 'processing' : ''}"
            id="btn-speak-${elemId}"
            ${isRecording || isProcessing ? 'disabled' : ''}
            onclick="LessonPlayer._startSpeak('${this._esc(targetText)}', '${elemId}')">
            ${isRecording ? `🔴 聆听中 ${remaining}s` : isProcessing ? '⏳ 识别中...' : hasResult ? '🔄 再试一次' : '🎤 点击跟读'}
          </button>
          ${isRecording ? `
            <button class="btn-speak-stop" onclick="LessonPlayer._stopSpeak('${elemId}')">⏹ 完成</button>
          ` : ''}
        </div>

        <div class="speak-status" id="status-${elemId}">
          ${isRecording ? `
            <div class="speak-status-recording">
              <span class="speak-pulse"></span>
              正在聆听，唸完点击「⏹ 完成」...
              <span class="speak-timer">${remaining}s</span>
            </div>
            ${ss.liveText ? `
            <div class="speak-live-text">
              <span class="speak-live-label">实时识别：</span>${ss.liveText}
            </div>` : ''}
          ` : ''}
          ${isProcessing ? '<div class="speak-status-processing">⏳ 正在识别你的发音...</div>' : ''}
          ${hasResult ? `
            <div class="speak-result">
              <div class="speak-result-row">
                <span class="speak-result-label">标准粤语：</span>
                <span class="speak-result-text">${targetText}</span>
              </div>
              <div class="speak-result-row">
                <span class="speak-result-label">你的发音：</span>
                <span class="speak-result-text user">${ss.userText || '—'}</span>
              </div>
              <div class="speak-result-score">
                ${this._renderSpeakScore(ss.score || 0)}
              </div>
              <div class="speak-result-detail">${ss.feedback || ''}</div>
            </div>
          ` : ''}
          ${hasError ? `
            <div class="speak-result">
              <div class="speak-result-error">❌ ${ss.errorMsg || '识别失败，请确保已授权麦克风权限，并重试'}</div>
            </div>
          ` : ''}
        </div>
      </div>`;
  },

  /** 渲染评分星星 */
  _renderSpeakScore(score) {
    // score: 0-100
    const stars = score >= 80 ? 3 : score >= 50 ? 2 : score >= 20 ? 1 : 0;
    const labels = ['再试试！', '有进步！', '很不错！', '太棒了！'];
    const colors = ['#f44336', '#ff9800', '#4caf50', '#4caf50'];
    return `
      <div class="speak-stars">
        ${[1,2,3].map(i => `<span class="speak-star ${i <= stars ? 'active' : ''}" style="color:${i <= stars ? colors[stars] : '#ddd'}">★</span>`).join('')}
        <span class="speak-score-text" style="color:${colors[stars]}">${labels[stars]}</span>
        <span class="speak-score-pct">相似度 ${score}%</span>
      </div>`;
  },

  /** 开始跟读 */
  _startSpeak(targetText, elemId) {
    this._speakState = { active: true, status: 'listening', targetText, elemId, liveText: '', elapsed: 0 };
    this._render();

    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      if (this._speakState.status === 'listening') {
        this._speakState.elapsed = Math.round((Date.now() - startTime) / 1000);
        this._render();
      }
    }, 500);

    // 最大 20 秒超时（安全兜底）
    const maxTimeout = setTimeout(() => {
      if (this._speakState.status === 'listening') {
        Speech.stopListening();
      }
    }, 20000);

    Speech.startListening(
      // onInterim: 实时更新识别文本
      (transcript, confidence) => {
        this._speakState.liveText = transcript;
        this._speakState.confidence = confidence;
        this._render();
      },
      // onError
      (error) => {
        clearInterval(timerInterval);
        clearTimeout(maxTimeout);
        this._speakState = {
          active: true,
          status: 'error',
          errorMsg: error === 'not-allowed' ? '请允许麦克风权限后重试' :
                    error === 'no-speech' ? '未检测到语音，请大声朗读' :
                    error === 'network' ? '网络错误，请检查网络连接' : `识别失败：${error || '未知错误'}`,
          targetText, elemId
        };
        this._render();
      },
      // onEnd: 录音结束，计算最终评分
      (finalText, avgConfidence) => {
        clearInterval(timerInterval);
        clearTimeout(maxTimeout);
        this._speakState.status = 'processing';
        this._render();

        setTimeout(() => {
          const score = this._calcSpeakScore(targetText, finalText, avgConfidence);
          const feedback = this._getSpeakFeedback(score);
          this._speakState = {
            active: true,
            status: 'result',
            targetText,
            userText: finalText || '(未识别到语音)',
            score,
            feedback,
            elemId
          };
          Gamification.addXp(Math.round(score / 10));
          Gamification.recordCalendar(Math.round(score / 10));
          this._render();
        }, 500);
      }
    );
  },

  /** 手动停止跟读 */
  _stopSpeak(elemId) {
    Speech.stopListening();
    this._speakState.status = 'processing';
    this._render();
  },

  /** 计算发音相似度 */
  _calcSpeakScore(target, spoken, confidence) {
    if (!spoken || !target) return confidence ? Math.round(confidence * 100) : 0;

    // 方法1: 字符级匹配
    const targetChars = target.replace(/\s+/g, '').split('');
    const spokenChars = spoken.replace(/\s+/g, '').split('');
    let matchCount = 0;
    const checked = new Set();

    for (const tc of targetChars) {
      for (let i = 0; i < spokenChars.length; i++) {
        if (!checked.has(i) && spokenChars[i] === tc) {
          matchCount++;
          checked.add(i);
          break;
        }
      }
    }

    const charScore = Math.round((matchCount / Math.max(targetChars.length, 1)) * 100);

    // 方法2: 置信度
    const confScore = confidence ? Math.round(confidence * 100) : 0;

    // 综合评分（字符匹配权重 60%，置信度 40%）
    const finalScore = confidence
      ? Math.round(charScore * 0.6 + confScore * 0.4)
      : charScore;

    return Math.min(100, Math.max(0, finalScore));
  },

  /** 跟读反馈文案 */
  _getSpeakFeedback(score) {
    if (score >= 90) return '发音非常标准，和母语者一样好！🎉';
    if (score >= 70) return '发音不错，继续练习会更完美！👍';
    if (score >= 50) return '还可以更好，再听一遍标准发音试试？💪';
    if (score >= 30) return '和标准发音差距较大，多听几遍再试试！📚';
    return '识别结果和原句差异较大，请确保用粤语朗读，发音清晰。🔊';
  },
};