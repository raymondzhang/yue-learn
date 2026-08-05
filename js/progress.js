/* 学习进度管理 - localStorage 持久化 */
const Progress = {
  KEY: 'yue_learn_progress',
  data: null,

  defaults() {
    return {
      stars: 0,
      hearts: 5,
      maxHearts: 5,
      heartsRegenTime: null, // 心耗尽的时间戳
      badges: [],
      learned: {},           // { charId: { correct: n, wrong: n } }
      phraseLearned: {},     // { phraseId: { listened: n, practiced: n } }
      streak: 0,             // 连续答对
      bestStreak: 0,
      totalCorrect: 0,
      totalWrong: 0,
      lastPlayDate: null,
      dailyGoal: 20,
      todayProgress: 0,
      todayDate: null,
      quizHistory: []        // 最近20条
    };
  },

  init() {
    try {
      const saved = localStorage.getItem(this.KEY);
      this.data = saved ? JSON.parse(saved) : this.defaults();
    } catch (e) {
      this.data = this.defaults();
    }
    // 合并缺失字段
    const defs = this.defaults();
    for (const k in defs) {
      if (this.data[k] === undefined) this.data[k] = defs[k];
    }
    // 检查新的一天
    this.checkDailyReset();
    // 心回复
    this.checkHeartRegen();
    this.save();
  },

  save() {
    localStorage.setItem(this.KEY, JSON.stringify(this.data));
  },

  checkDailyReset() {
    const today = new Date().toISOString().slice(0, 10);
    if (this.data.todayDate !== today) {
      this.data.todayDate = today;
      this.data.todayProgress = 0;
      // 检查连续天数
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().slice(0, 10);
      if (this.data.lastPlayDate !== yStr && this.data.lastPlayDate !== today) {
        this.data.streak = 0; // 断签
      }
    }
  },

  checkHeartRegen() {
    if (this.data.hearts < this.data.maxHearts && this.data.heartsRegenTime) {
      const elapsed = Date.now() - this.data.heartsRegenTime;
      const regenCount = Math.floor(elapsed / (5 * 60 * 1000)); // 每5分钟回一颗心
      if (regenCount > 0) {
        this.data.hearts = Math.min(this.data.maxHearts, this.data.hearts + regenCount);
        this.data.heartsRegenTime = this.data.hearts < this.data.maxHearts ? Date.now() : null;
      }
    }
  },

  addStars(n) {
    this.data.stars += n;
    this.data.todayProgress += n;
    this.checkBadges();
    this.save();
  },

  loseHeart() {
    this.data.hearts--;
    this.data.streak = 0;
    if (this.data.hearts <= 0) {
      this.data.hearts = 0;
      this.data.heartsRegenTime = Date.now();
    }
    this.save();
  },

  recordAnswer(charId, correct) {
    if (!this.data.learned[charId]) {
      this.data.learned[charId] = { correct: 0, wrong: 0 };
    }
    if (correct) {
      this.data.learned[charId].correct++;
      this.data.totalCorrect++;
      this.data.streak++;
      if (this.data.streak > this.data.bestStreak) {
        this.data.bestStreak = this.data.streak;
      }
      this.addStars(1);
    } else {
      this.data.learned[charId].wrong++;
      this.data.totalWrong++;
      this.loseHeart();
    }
    this.data.lastPlayDate = new Date().toISOString().slice(0, 10);
    this.save();
  },

  recordPhrase(phraseId, type) {
    if (!this.data.phraseLearned[phraseId]) {
      this.data.phraseLearned[phraseId] = { listened: 0, practiced: 0 };
    }
    this.data.phraseLearned[phraseId][type]++;
    this.data.lastPlayDate = new Date().toISOString().slice(0, 10);
    this.save();
  },

  getCharMastery(charId) {
    const d = this.data.learned[charId];
    if (!d) return 0;
    const total = d.correct + d.wrong;
    if (total === 0) return 0;
    return Math.round((d.correct / total) * 100);
  },

  checkBadges() {
    const badges = this.data.badges;
    const d = this.data;

    const defs = [
      { id: 'first_star', name: '第一颗星', icon: '⭐', condition: () => d.stars >= 1 },
      { id: 'star_50', name: '50星小达人', icon: '🌟', condition: () => d.stars >= 50 },
      { id: 'star_100', name: '百星学霸', icon: '💫', condition: () => d.stars >= 100 },
      { id: 'star_500', name: '五百星传说', icon: '🏆', condition: () => d.stars >= 500 },
      { id: 'streak_5', name: '连对5题', icon: '🔥', condition: () => d.bestStreak >= 5 },
      { id: 'streak_10', name: '连对10题', icon: '💥', condition: () => d.bestStreak >= 10 },
      { id: 'streak_20', name: '连对20题', icon: '⚡', condition: () => d.bestStreak >= 20 },
      { id: 'learn_20', name: '学了20个字', icon: '📖', condition: () => Object.keys(d.learned).length >= 20 },
      { id: 'learn_50', name: '学了50个字', icon: '📚', condition: () => Object.keys(d.learned).length >= 50 },
      { id: 'learn_100', name: '百字通', icon: '🎓', condition: () => Object.keys(d.learned).length >= 100 },
      { id: 'phrase_10', name: '学了10个句子', icon: '💬', condition: () => Object.keys(d.phraseLearned).length >= 10 },
      { id: 'phrase_50', name: '粤语小能手', icon: '🗣️', condition: () => Object.keys(d.phraseLearned).length >= 50 },
      { id: 'correct_100', name: '答对100题', icon: '✅', condition: () => d.totalCorrect >= 100 },
      { id: 'streak_days_3', name: '连续3天学习', icon: '📅', condition: () => d.streak >= 3 },
      { id: 'master_10', name: '掌握10个字(100%)', icon: '👑', condition: () => {
        return Object.values(d.learned).filter(v => v.correct >= 3 && v.wrong === 0).length >= 10;
      }}
    ];

    defs.forEach(b => {
      if (!badges.includes(b.id) && b.condition()) {
        badges.push(b.id);
        // 弹窗通知
        setTimeout(() => {
          App && App.showBadgeUnlock && App.showBadgeUnlock(b);
        }, 500);
      }
    });
  },

  getAllBadges() {
    return [
      { id: 'first_star', name: '第一颗星', icon: '⭐' },
      { id: 'star_50', name: '50星小达人', icon: '🌟' },
      { id: 'star_100', name: '百星学霸', icon: '💫' },
      { id: 'star_500', name: '五百星传说', icon: '🏆' },
      { id: 'streak_5', name: '连对5题', icon: '🔥' },
      { id: 'streak_10', name: '连对10题', icon: '💥' },
      { id: 'streak_20', name: '连对20题', icon: '⚡' },
      { id: 'learn_20', name: '学了20个字', icon: '📖' },
      { id: 'learn_50', name: '学了50个字', icon: '📚' },
      { id: 'learn_100', name: '百字通', icon: '🎓' },
      { id: 'phrase_10', name: '学了10个句子', icon: '💬' },
      { id: 'phrase_50', name: '粤语小能手', icon: '🗣️' },
      { id: 'correct_100', name: '答对100题', icon: '✅' },
      { id: 'streak_days_3', name: '连续3天学习', icon: '📅' },
      { id: 'master_10', name: '掌握10个字(100%)', icon: '👑' }
    ];
  },

  getStats() {
    const d = this.data;
    return {
      stars: d.stars,
      hearts: d.hearts,
      maxHearts: d.maxHearts,
      streak: d.streak,
      bestStreak: d.bestStreak,
      totalCorrect: d.totalCorrect,
      totalWrong: d.totalWrong,
      accuracy: d.totalCorrect + d.totalWrong > 0
        ? Math.round(d.totalCorrect / (d.totalCorrect + d.totalWrong) * 100) : 0,
      learnedChars: Object.keys(d.learned).length,
      learnedPhrases: Object.keys(d.phraseLearned).length,
      todayProgress: d.todayProgress,
      dailyGoal: d.dailyGoal,
      badges: d.badges.length,
      lastPlayDate: d.lastPlayDate
    };
  },

  resetAll() {
    this.data = this.defaults();
    this.save();
  }
};
