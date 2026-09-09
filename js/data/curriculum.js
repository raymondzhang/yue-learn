/* =========================================================
   Curriculum Data — 五级课程体系结构定义
   实际内容在 stages/ 目录下按需加载
   ========================================================= */
const CURRICULUM_DATA = {
  stages: [
    {
      id: 'stage-0',
      level: 0,
      name: '启蒙级',
      subtitle: '认识粤语·声调感知',
      icon: '🏁',
      color: '#FF6B6B',
      description: '从零开始认识粤语，学习声调、数字、颜色、身体、动物等基础词汇，建立对粤语的第一印象。',
      units: STAGE_0_UNITS
    },
    {
      id: 'stage-1',
      level: 1,
      name: '入门级',
      subtitle: '学词语·说短句',
      icon: '🔤',
      color: '#4ECDC4',
      description: '学习打招呼、家人、食物、动作、学校用品等日常词汇和短句，开始用粤语进行简单交流。',
      units: STAGE_1_UNITS
    },
    {
      id: 'stage-2',
      level: 2,
      name: '基础级',
      subtitle: '日常场景对话',
      icon: '💬',
      color: '#45B7D1',
      description: '在教室、餐厅、街道、商店等场景中进行完整对话，掌握日常交际粤语。',
      units: STAGE_2_UNITS
    },
    {
      id: 'stage-3',
      level: 3,
      name: '进阶级',
      subtitle: '复杂对话·香港文化',
      icon: '🎯',
      color: '#96CEB4',
      description: '讲故事、表达感受、了解香港文化，用粤语进行更复杂的表达。',
      units: STAGE_3_UNITS
    },
    {
      id: 'stage-4',
      level: 4,
      name: '流利级',
      subtitle: '自主表达·长篇故事',
      icon: '🏆',
      color: '#DDA0DD',
      description: '自主表达、讲长篇故事、唱粤语儿歌，达到日常流利水平。',
      units: STAGE_4_UNITS
    }
  ]
};