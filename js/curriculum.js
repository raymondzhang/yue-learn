/* =========================================================
   Curriculum — 课程数据模型 + 课程树渲染
   ========================================================= */
const Curriculum = {
  stages: [],       // 所有阶段数据
  state: {},        // 课程进度 { 'stage-0-unit-1-lesson-1': { done, stars, score } }
  _ready: false,

  async init() {
    await Storage.init();
    this.stages = CURRICULUM_DATA.stages;
    this.state = await Storage.getCurriculumState();
    this._ready = true;
  },

  /** 保存课程状态 */
  async _saveState(key, value) {
    this.state[key] = value;
    await Storage.setCurriculumState(key, value);
  },

  /** 获取阶段 */
  getStage(stageId) {
    return this.stages.find(s => s.id === stageId);
  },

  /** 获取单元 */
  getUnit(stageId, unitId) {
    const stage = this.getStage(stageId);
    if (!stage) return null;
    return stage.units.find(u => u.id === unitId);
  },

  /** 获取课时 */
  getLesson(stageId, unitId, lessonId) {
    const unit = this.getUnit(stageId, unitId);
    if (!unit) return null;
    return unit.lessons.find(l => l.id === lessonId);
  },

  /** 课时是否完成 */
  isLessonDone(stageId, unitId, lessonId) {
    const key = `${stageId}/${unitId}/${lessonId}`;
    return this.state[key] && this.state[key].done;
  },

  /** 单元是否完成 */
  isUnitDone(stageId, unitId) {
    const unit = this.getUnit(stageId, unitId);
    if (!unit) return false;
    return unit.lessons.every(l => this.isLessonDone(stageId, unitId, l.id));
  },

  /** 阶段是否完成 */
  isStageDone(stageId) {
    const stage = this.getStage(stageId);
    if (!stage) return false;
    return stage.units.every(u => this.isUnitDone(stageId, u.id));
  },

  /** 单元是否解锁 */
  isUnitUnlocked(stageId, unitId) {
    const stage = this.getStage(stageId);
    if (!stage) return false;
    const idx = stage.units.findIndex(u => u.id === unitId);
    if (idx === 0) return this.isStageUnlocked(stageId);
    return this.isUnitDone(stageId, stage.units[idx - 1].id);
  },

  /** 阶段是否解锁 */
  isStageUnlocked(stageId) {
    const idx = this.stages.findIndex(s => s.id === stageId);
    if (idx === 0) return true; // 启蒙级始终解锁
    if (idx === 1) return this._stage0Progress() >= 0.7; // 入门级需启蒙级70%完成
    // 其他阶段需前一级完成
    return this.isStageDone(this.stages[idx - 1].id);
  },

  _stage0Progress() {
    const stage = this.stages[0];
    if (!stage) return 0;
    let total = 0, done = 0;
    stage.units.forEach(u => {
      u.lessons.forEach(l => {
        total++;
        if (this.isLessonDone(stage.id, u.id, l.id)) done++;
      });
    });
    return total > 0 ? done / total : 0;
  },

  /** 获取阶段进度 */
  getStageProgress(stageId) {
    const stage = this.getStage(stageId);
    if (!stage) return { done: 0, total: 0, pct: 0 };
    let total = 0, done = 0;
    stage.units.forEach(u => {
      u.lessons.forEach(l => {
        total++;
        if (this.isLessonDone(stageId, u.id, l.id)) done++;
      });
    });
    return { done, total, pct: total > 0 ? Math.round(done / total * 100) : 0 };
  },

  /** 获取单元进度 */
  getUnitProgress(stageId, unitId) {
    const unit = this.getUnit(stageId, unitId);
    if (!unit) return { done: 0, total: 0, pct: 0 };
    let total = unit.lessons.length;
    let done = unit.lessons.filter(l => this.isLessonDone(stageId, unitId, l.id)).length;
    return { done, total, pct: total > 0 ? Math.round(done / total * 100) : 0 };
  },

  /** 获取总进度 */
  getTotalProgress() {
    let total = 0, done = 0;
    this.stages.forEach(s => {
      s.units.forEach(u => {
        u.lessons.forEach(l => {
          total++;
          if (this.isLessonDone(s.id, u.id, l.id)) done++;
        });
      });
    });
    return { done, total, pct: total > 0 ? Math.round(done / total * 100) : 0 };
  },

  /** 获取下一个未完成课时 */
  getNextLesson() {
    for (const stage of this.stages) {
      if (!this.isStageUnlocked(stage.id)) continue;
      for (const unit of stage.units) {
        if (!this.isUnitUnlocked(stage.id, unit.id)) continue;
        for (const lesson of unit.lessons) {
          if (!this.isLessonDone(stage.id, unit.id, lesson.id)) {
            return { stage, unit, lesson };
          }
        }
      }
    }
    return null;
  },

  /* ========== 渲染课程树 ========== */
  renderTree(el) {
    const totalProg = this.getTotalProgress();
    const unlockedCount = this.stages.filter(s => this.isStageUnlocked(s.id)).length;

    let html = `
      <div class="curriculum-view">
        <div class="curriculum-header">
          <h2>🗺️ 学习旅程</h2>
          <div class="curriculum-overall">
            <div class="overall-stat">
              <span class="overall-value">${totalProg.done}</span>
              <span class="overall-label">已完成课时</span>
            </div>
            <div class="overall-stat">
              <span class="overall-value">${unlockedCount}/${this.stages.length}</span>
              <span class="overall-label">已解锁阶段</span>
            </div>
            <div class="overall-stat">
              <span class="overall-value">${totalProg.pct}%</span>
              <span class="overall-label">总进度</span>
            </div>
          </div>
          <div class="progress-bar large"><div class="progress-fill" style="width:${totalProg.pct}%"></div></div>
        </div>
        <div class="stage-tree">`;

    this.stages.forEach((stage, si) => {
      const unlocked = this.isStageUnlocked(stage.id);
      const done = this.isStageDone(stage.id);
      const prog = this.getStageProgress(stage.id);
      const stageClass = done ? 'done' : unlocked ? 'unlocked' : 'locked';

      html += `
        <div class="stage-node ${stageClass}" data-stage="${stage.id}">
          <div class="stage-connector">
            <div class="stage-dot ${stageClass}">${done ? '✅' : unlocked ? stage.icon : '🔒'}</div>
            ${si < this.stages.length - 1 ? '<div class="stage-line"></div>' : ''}
          </div>
          <div class="stage-card" onclick="Curriculum._toggleStage('${stage.id}')">
            <div class="stage-header">
              <div class="stage-level">Lv.${stage.level}</div>
              <div class="stage-info">
                <div class="stage-name">${stage.name}</div>
                <div class="stage-subtitle">${stage.subtitle}</div>
              </div>
              <div class="stage-progress-badge">
                ${unlocked ? `<span>${prog.done}/${prog.total}</span>` : '🔒'}
              </div>
            </div>
            ${unlocked ? `
            <div class="stage-progress-bar">
              <div class="progress-fill" style="width:${prog.pct}%;background:${stage.color}"></div>
            </div>` : ''}
            ${!unlocked ? `<div class="stage-lock-hint">完成前一阶段后解锁</div>` : ''}
          </div>
          <div class="stage-units" id="units-${stage.id}" style="display:none">
            ${stage.units.map((unit, ui) => {
              const unitUnlocked = this.isUnitUnlocked(stage.id, unit.id);
              const unitDone = this.isUnitDone(stage.id, unit.id);
              const uprog = this.getUnitProgress(stage.id, unit.id);
              return `
              <div class="unit-node ${unitUnlocked ? 'unlocked' : 'locked'} ${unitDone ? 'done' : ''}">
                <div class="unit-connector">
                  <div class="unit-line"></div>
                  <div class="unit-dot">${unitDone ? '✅' : unitUnlocked ? '📖' : '🔒'}</div>
                </div>
                <div class="unit-card" onclick="event.stopPropagation(); Curriculum._openUnit('${stage.id}', '${unit.id}')"
                  ${!unitUnlocked ? 'style="opacity:0.5;pointer-events:none"' : ''}>
                  <div class="unit-header">
                    <div class="unit-icon">${unit.icon}</div>
                    <div class="unit-info">
                      <div class="unit-name">${unit.name}</div>
                      <div class="unit-count">${unit.lessons.length} 课时 · ${uprog.done} 已完成</div>
                    </div>
                    <div class="unit-arrow">▶</div>
                  </div>
                  ${unitUnlocked ? `
                  <div class="unit-progress-bar">
                    <div class="progress-fill" style="width:${uprog.pct}%;background:${stage.color}"></div>
                  </div>` : ''}
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>`;
    });

    html += `
        </div>
      </div>`;
    el.innerHTML = html;
  },

  _toggleStage(stageId) {
    const el = document.getElementById(`units-${stageId}`);
    if (!el) return;
    const isHidden = el.style.display === 'none';
    // 收起所有
    document.querySelectorAll('.stage-units').forEach(u => u.style.display = 'none');
    if (isHidden) {
      el.style.display = 'block';
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  },

  _openUnit(stageId, unitId) {
    Router.navigate(`/lesson/${stageId}/${unitId}`);
  }
};