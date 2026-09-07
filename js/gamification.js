/* =========================================================
   Gamification v2 — 增强游戏化系统
   等级、经验值、每日挑战、成就墙、学习日历
   ========================================================= */
const Gamification = {
  data: null,

  defaults() {
    return {
      xp: 0,
      level: 1,
      stars: 0,
      badges: [],
      streak: 0,
      bestStreak: 0,
      lastPlayDate: null,
      dailyChallenges: [],     // { date, challenges: [{id, desc, done}] }
      todayDate: null,
      totalCorrect: 0,
      totalWrong: 0,
      calendar: {}             // { 'YYYY-MM-DD': xp }
    };
  },

  async init() {
    await Storage.init();
    const saved = await Storage.getProgress();
    this.data = saved && saved.gamification ? { ...this.defaults(), ...saved.gamification } : this.defaults();
    this._checkDaily();
    // 从保存的数据恢复 check 函数（IndexedDB 不存函数）
    this._hydrateChecks();
    await this._save();
  },

  async _save() {
    const progress = (await Storage.getProgress()) || {};
    // 构建可序列化副本（剥离函数）
    const saveData = this._toSerializable();
    progress.gamification = saveData;
    await Storage.setProgress(progress);
  },

  /** 构建可序列化数据副本（移除所有函数） */
  _toSerializable() {
    const d = this.data;
    return {
      xp: d.xp,
      level: d.level,
      stars: d.stars,
      badges: [...d.badges],
      streak: d.streak,
      bestStreak: d.bestStreak,
      lastPlayDate: d.lastPlayDate,
      todayDate: d.todayDate,
      totalCorrect: d.totalCorrect,
      totalWrong: d.totalWrong,
      calendar: { ...d.calendar },
      dailyChallenges: d.dailyChallenges.map(c => ({
        id: c.id,
        desc: c.desc,
        done: c.done
      }))
    };
  },

  /** 恢复 dailyChallenges 中的 check 函数 */
  _hydrateChecks() {
    const pool = this._getChallengePool();
    for (const challenge of this.data.dailyChallenges) {
      const template = pool.find(c => c.id === challenge.id);
      if (template) challenge.check = template.check;
    }
  },

  _getChallengePool() {
    return [
      { id: 'learn_3', desc: '完成 3 个课时', check: (ctx) => ctx.lessonsDone >= 3 },
      { id: 'quiz_10', desc: '答对 10 道题', check: (ctx) => ctx.quizCorrect >= 10 },
      { id: 'streak_3', desc: '连续答对 3 题', check: (ctx) => ctx.bestTodayStreak >= 3 },
      { id: 'speak_5', desc: '跟读 5 次', check: (ctx) => ctx.speakCount >= 5 },
      { id: 'star_5', desc: '获得 5 颗星星', check: (ctx) => ctx.starsEarned >= 5 },
      { id: 'review_1', desc: '完成一次复习', check: (ctx) => ctx.reviewDone >= 1 },
      { id: 'perfect_1', desc: '一次满分通关', check: (ctx) => ctx.perfectCount >= 1 },
      { id: 'daily_1', desc: '学习 15 分钟', check: (ctx) => ctx.studyMinutes >= 15 },
    ];
  },

  _checkDaily() {
    const today = new Date().toISOString().slice(0, 10);
    if (this.data.todayDate !== today) {
      this.data.todayDate = today;
      this.data.dailyChallenges = this._generateDailyChallenges();
      // 检查连续签到
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (this.data.lastPlayDate !== yesterday && this.data.lastPlayDate !== today) {
        this.data.streak = 0;
      }
    }
  },

  _generateDailyChallenges() {
    const pool = this._getChallengePool();
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3).map(c => ({ ...c, done: false }));
  },

  /* ========== 等级计算 ========== */
  _xpForLevel(level) {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  },

  getLevelInfo() {
    const currentXp = this._xpForLevel(this.data.level);
    const nextXp = this._xpForLevel(this.data.level + 1);
    const progress = Math.min(100, Math.round((this.data.xp - currentXp) / (nextXp - currentXp) * 100));
    return {
      level: this.data.level,
      xp: this.data.xp,
      currentXp,
      nextXp,
      progress
    };
  },

  /* ========== 奖励 ========== */
  addXp(amount) {
    this.data.xp += amount;
    const oldLevel = this.data.level;
    while (this.data.xp >= this._xpForLevel(this.data.level + 1)) {
      this.data.level++;
    }
    this._save();
    return { xp: amount, levelUp: this.data.level > oldLevel, newLevel: this.data.level };
  },

  addStars(amount) {
    this.data.stars += amount;
    this._save();
  },

  addCorrect() {
    this.data.totalCorrect++;
    this.data.streak++;
    if (this.data.streak > this.data.bestStreak) {
      this.data.bestStreak = this.data.streak;
    }
    this._save();
  },

  addWrong() {
    this.data.totalWrong++;
    this.data.streak = 0;
    this._save();
  },

  recordPlay() {
    this.data.lastPlayDate = new Date().toISOString().slice(0, 10);
    this._save();
  },

  /** 记录日历活动 */
  async recordCalendar(xp) {
    const today = new Date().toISOString().slice(0, 10);
    this.data.calendar[today] = (this.data.calendar[today] || 0) + xp;
    await this._save();
  },

  /** 检查每日挑战完成 */
  async checkDailyChallenge(ctx) {
    let completed = 0;
    for (const challenge of this.data.dailyChallenges) {
      if (!challenge.done && challenge.check(ctx)) {
        challenge.done = true;
        this.addStars(3);
        this.addXp(50);
        completed++;
      }
    }
    if (completed > 0) await this._save();
    return completed;
  },

  /* ========== 徽章 ========== */
  ALL_BADGES: [
    { id: 'first_lesson', icon: '🌟', name: '初次见面', desc: '完成第一个课时', condition: (d) => d.totalCorrect + d.totalWrong >= 3 },
    { id: 'level_5', icon: '📈', name: '小有所成', desc: '达到等级 5', condition: (d) => d.level >= 5 },
    { id: 'level_10', icon: '🚀', name: '突飞猛进', desc: '达到等级 10', condition: (d) => d.level >= 10 },
    { id: 'streak_7', icon: '🔥', name: '七日坚持', desc: '连续学习 7 天', condition: (d) => d.streak >= 7 },
    { id: 'star_50', icon: '⭐', name: '星光熠熠', desc: '累计获得 50 颗星', condition: (d) => d.stars >= 50 },
    { id: 'star_200', icon: '✨', name: '满天繁星', desc: '累计获得 200 颗星', condition: (d) => d.stars >= 200 },
    { id: 'correct_100', icon: '🎯', name: '百发百中', desc: '答对 100 题', condition: (d) => d.totalCorrect >= 100 },
    { id: 'stage_0', icon: '🏁', name: '启蒙完成', desc: '完成启蒙级全部课程', condition: (d) => d.badges && d.badges.includes('stage_0') },
    { id: 'stage_1', icon: '🔤', name: '入门通过', desc: '完成入门级全部课程', condition: (d) => d.badges && d.badges.includes('stage_1') },
    { id: 'perfect_quiz', icon: '💯', name: '满分达人', desc: '一次测验全部答对', condition: (d) => d.badges && d.badges.includes('perfect_quiz') },
    { id: 'all_daily', icon: '📅', name: '日事日毕', desc: '一天完成全部3个每日挑战', condition: (d) => d.badges && d.badges.includes('all_daily') },
    { id: 'speak_50', icon: '🎤', name: '敢说敢讲', desc: '累计跟读 50 次', condition: (d) => d.badges && d.badges.includes('speak_50') },
  ],

  async checkBadges() {
    const newBadges = [];
    for (const badge of this.ALL_BADGES) {
      if (!this.data.badges.includes(badge.id) && badge.condition(this.data)) {
        this.data.badges.push(badge.id);
        newBadges.push(badge);
      }
    }
    if (newBadges.length > 0) {
      await this._save();
    }
    return newBadges;
  },

  /** 手动授予徽章（如 stage_0 完成） */
  async awardBadge(badgeId) {
    if (!this.data.badges.includes(badgeId)) {
      this.data.badges.push(badgeId);
      await this._save();
      const badge = this.ALL_BADGES.find(b => b.id === badgeId);
      return badge;
    }
    return null;
  },

  getStats() {
    const d = this.data;
    const levelInfo = this.getLevelInfo();
    return {
      xp: d.xp,
      level: d.level,
      levelProgress: levelInfo.progress,
      stars: d.stars,
      streak: d.streak,
      bestStreak: d.bestStreak,
      totalCorrect: d.totalCorrect,
      totalWrong: d.totalWrong,
      accuracy: d.totalCorrect + d.totalWrong > 0
        ? Math.round(d.totalCorrect / (d.totalCorrect + d.totalWrong) * 100) : 0,
      badges: d.badges.length,
      todayChallenges: d.dailyChallenges,
      lastPlayDate: d.lastPlayDate,
      calendar: d.calendar
    };
  }
};