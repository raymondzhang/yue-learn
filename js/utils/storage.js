/* =========================================================
   Storage v2 — IndexedDB + localStorage 双层存储
   IndexedDB 用于大量数据（课程进度、词典），localStorage 兜底
   ========================================================= */
const Storage = {
  DB_NAME: 'yue_learn_v2',
  DB_VERSION: 1,
  db: null,
  _ready: null,

  /* ========== 初始化 ========== */
  init() {
    if (this._ready) return this._ready;
    this._ready = new Promise((resolve) => {
      if (!window.indexedDB) {
        console.warn('[Storage] IndexedDB 不可用，降级到 localStorage');
        this.db = null;
        resolve(false);
        return;
      }
      const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('curriculum')) {
          db.createObjectStore('curriculum', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
      req.onsuccess = (e) => {
        this.db = e.target.result;
        console.log('[Storage] IndexedDB 就绪');
        resolve(true);
      };
      req.onerror = () => {
        console.warn('[Storage] IndexedDB 打开失败，降级到 localStorage');
        this.db = null;
        resolve(false);
      };
    });
    return this._ready;
  },

  /* ========== IndexedDB 操作 ========== */
  async _idbGet(storeName, key) {
    if (!this.db) return null;
    return new Promise((resolve) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ? req.result.value : null);
      req.onerror = () => resolve(null);
    });
  },

  async _idbSet(storeName, key, value) {
    if (!this.db) return;
    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.put({ key, value });
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch (e) {
        // 结构化克隆失败（如含函数）时静默降级
        console.warn('[Storage] IndexedDB put 失败，降级到 localStorage:', e.message);
        resolve();
      }
    });
  },

  async _idbGetAll(storeName) {
    if (!this.db) return {};
    return new Promise((resolve) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => {
        const result = {};
        (req.result || []).forEach(item => { result[item.key] = item.value; });
        resolve(result);
      };
      req.onerror = () => resolve({});
    });
  },

  /* ========== 公共 API ========== */

  /** 获取课程进度 */
  async getProgress() {
    if (this.db) {
      const data = await this._idbGet('progress', 'main');
      if (data) return data;
    }
    // localStorage 兜底
    try {
      const raw = localStorage.getItem('yue_learn_v2_progress');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  /** 保存课程进度 */
  async setProgress(data) {
    try {
      if (this.db) await this._idbSet('progress', 'main', data);
    } catch (e) { console.warn('[Storage] setProgress IDB 失败:', e.message); }
    try {
      localStorage.setItem('yue_learn_v2_progress', JSON.stringify(data));
    } catch {}
  },

  /** 获取课程状态（单元完成、星级等） */
  async getCurriculumState() {
    try {
      if (this.db) return await this._idbGetAll('curriculum');
    } catch (e) { console.warn('[Storage] getCurriculumState IDB 失败:', e.message); }
    try {
      const raw = localStorage.getItem('yue_learn_v2_curriculum');
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  },

  /** 保存课程状态 */
  async setCurriculumState(key, value) {
    try {
      if (this.db) await this._idbSet('curriculum', key, value);
    } catch (e) { console.warn('[Storage] setCurriculumState IDB 失败:', e.message); }
    try {
      const all = await this.getCurriculumState();
      all[key] = value;
      localStorage.setItem('yue_learn_v2_curriculum', JSON.stringify(all));
    } catch {}
  },

  /** 获取设置 */
  async getSettings() {
    try {
      if (this.db) return await this._idbGetAll('settings');
    } catch (e) { console.warn('[Storage] getSettings IDB 失败:', e.message); }
    try {
      const raw = localStorage.getItem('yue_learn_v2_settings');
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  },

  /** 保存设置 */
  async setSettings(key, value) {
    try {
      if (this.db) await this._idbSet('settings', key, value);
    } catch (e) { console.warn('[Storage] setSettings IDB 失败:', e.message); }
    try {
      const all = await this.getSettings();
      all[key] = value;
      localStorage.setItem('yue_learn_v2_settings', JSON.stringify(all));
    } catch {}
  }
};