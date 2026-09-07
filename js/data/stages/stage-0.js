/* =========================================================
   Stage 0 — 启蒙级 · 认识粤语
   7 个单元，~20 课时
   ========================================================= */
const STAGE_0_UNITS = [
  /* ===== 单元 0.1：粤语是什么 ===== */
  {
    id: 's0-u1',
    name: '粤语是什么',
    icon: '🌏',
    lessons: [
      {
        id: 's0-u1-l1',
        type: 'story',
        title: '粤语和普通话',
        subtitle: '认识两种语言的不同',
        content: {
          pages: [
            {
              text: '大家好！我係小明。我哋今日一齊來認識粵語。',
              translation: '大家好！我是小明。我们今天一起来认识粤语。',
              words: [
                { cantonese: '我係', meaning: '我是' },
                { cantonese: '我哋', meaning: '我们' },
                { cantonese: '一齊', meaning: '一起' },
                { cantonese: '今日', meaning: '今天' }
              ]
            },
            {
              text: '粵語係香港、澳門同廣東嘅主要語言，有超過八千萬人使用。',
              translation: '粤语是香港、澳门和广东的主要语言，有超过八千万人使用。',
              words: [
                { cantonese: '係', meaning: '是' },
                { cantonese: '同', meaning: '和' },
                { cantonese: '嘅', meaning: '的' }
              ]
            },
            {
              text: '粵語同普通話有好多唔同嘅地方：聲調、發音、用詞都唔一樣。',
              translation: '粤语和普通话有很多不同的地方：声调、发音、用词都不一样。',
              words: [
                { cantonese: '好多', meaning: '很多' },
                { cantonese: '唔同', meaning: '不同' },
                { cantonese: '唔一樣', meaning: '不一样' }
              ]
            },
            {
              text: '例如普通話講「再見」，粵語講「拜拜」。普通話講「謝謝」，粵語講「多謝」。',
              translation: '例如普通话讲"再见"，粤语讲"拜拜"。普通话讲"谢谢"，粤语讲"多谢"。',
              words: [
                { cantonese: '拜拜', meaning: '再见' },
                { cantonese: '多謝', meaning: '谢谢' }
              ]
            },
            {
              text: '學粵語好好玩㗎！我哋一齊開始呢個旅程啦！',
              translation: '学粤语很好玩的！我们一起开始这个旅程吧！',
              words: [
                { cantonese: '好好玩', meaning: '很好玩' },
                { cantonese: '㗎', meaning: '语气词（的呀）' },
                { cantonese: '旅程', meaning: '旅程' }
              ]
            }
          ]
        }
      }
    ]
  },

  /* ===== 单元 0.2：六个声调 ===== */
  {
    id: 's0-u2',
    name: '粤语声调',
    icon: '🎵',
    lessons: [
      {
        id: 's0-u2-l1',
        type: 'story',
        title: '粤语的六个声调',
        subtitle: '认识粤语的音调系统',
        content: {
          pages: [
            {
              text: '粵語有六個聲調，比普通話四個聲調多兩個。學好聲調係講好粵語嘅關鍵！',
              translation: '粤语有六个声调，比普通话四个声调多两个。学好声调是讲好粤语的关键！',
              words: [
                { cantonese: '聲調', meaning: '声调' },
                { cantonese: '關鍵', meaning: '关键' }
              ]
            },
            {
              text: '用「si」呢個音來示範六個聲調：詩(si1) 史(si2) 試(si3) 時(si4) 市(si5) 是(si6)',
              translation: '用"si"这个音来示范六个声调：诗(si1) 史(si2) 试(si3) 时(si4) 市(si5) 是(si6)',
              words: [
                { cantonese: '詩', meaning: '诗（第1声）' },
                { cantonese: '史', meaning: '史（第2声）' },
                { cantonese: '試', meaning: '试（第3声）' },
                { cantonese: '時', meaning: '时（第4声）' },
                { cantonese: '市', meaning: '市（第5声）' },
                { cantonese: '是', meaning: '是（第6声）' }
              ]
            },
            {
              text: '用「分」字：分(fan1) 粉(fan2) 訓(fan3) 焚(fan4) 奮(fan5) 份(fan6)',
              translation: '用"分"字：分(fan1) 粉(fan2) 训(fan3) 焚(fan4) 奋(fan5) 份(fan6)',
              words: [
                { cantonese: '分', meaning: '分开（第1声）' },
                { cantonese: '粉', meaning: '粉（第2声）' },
                { cantonese: '訓', meaning: '训/睡觉（第3声）' },
                { cantonese: '焚', meaning: '焚（第4声）' },
                { cantonese: '奮', meaning: '奋（第5声）' },
                { cantonese: '份', meaning: '份（第6声）' }
              ]
            }
          ]
        }
      },
      {
        id: 's0-u2-l2',
        type: 'quiz',
        title: '声调小测验',
        subtitle: '听听看，是第几声？',
        content: {
          questions: [
            { prompt: '听发音，是第几声？(诗 si1)', promptType: 'audio', speakText: '詩', options: ['第1声', '第3声', '第4声', '第6声'], answer: '第1声' },
            { prompt: '听发音，是第几声？(试 si3)', promptType: 'audio', speakText: '試', options: ['第1声', '第3声', '第4声', '第6声'], answer: '第3声' },
            { prompt: '听发音，是第几声？(时 si4)', promptType: 'audio', speakText: '時', options: ['第1声', '第2声', '第4声', '第5声'], answer: '第4声' },
            { prompt: '听发音，是第几声？(是 si6)', promptType: 'audio', speakText: '是', options: ['第1声', '第3声', '第5声', '第6声'], answer: '第6声' },
            { prompt: '听发音，是第几声？(粉 fan2)', promptType: 'audio', speakText: '粉', options: ['第1声', '第2声', '第4声', '第6声'], answer: '第2声' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 0.3：数字 1-10 ===== */
  {
    id: 's0-u3',
    name: '数字 1-10',
    icon: '🔢',
    lessons: [
      {
        id: 's0-u3-l1',
        type: 'vocab',
        title: '数字 1 到 5',
        subtitle: '学习粤语数字 1-5 的发音',
        content: {
          words: [
            { cantonese: '一', jyutping: 'jat1', meaning: '1', note: '第一声，短促' },
            { cantonese: '二', jyutping: 'ji6', meaning: '2', note: '第六声，和普通话"一"不同' },
            { cantonese: '三', jyutping: 'saam1', meaning: '3', note: '注意闭口音 -m 结尾' },
            { cantonese: '四', jyutping: 'sei3', meaning: '4', note: '第三声，和普通话"四"完全不同' },
            { cantonese: '五', jyutping: 'ng5', meaning: '5', note: '第五声，鼻音开头' }
          ]
        }
      },
      {
        id: 's0-u3-l2',
        type: 'vocab',
        title: '数字 6 到 10',
        subtitle: '学习粤语数字 6-10 的发音',
        content: {
          words: [
            { cantonese: '六', jyutping: 'luk6', meaning: '6', note: '第六声，入声字，短促' },
            { cantonese: '七', jyutping: 'cat1', meaning: '7', note: '第一声，入声字' },
            { cantonese: '八', jyutping: 'baat3', meaning: '8', note: '第三声，入声字' },
            { cantonese: '九', jyutping: 'gau2', meaning: '9', note: '第二声' },
            { cantonese: '十', jyutping: 'sap6', meaning: '10', note: '第六声，入声字' }
          ]
        }
      },
      {
        id: 's0-u3-l3',
        type: 'game',
        title: '数字配对',
        subtitle: '把数字和粤语发音连起来',
        content: {
          gameType: 'match',
          pairs: [
            { cantonese: '一', meaning: '1' },
            { cantonese: '二', meaning: '2' },
            { cantonese: '三', meaning: '3' },
            { cantonese: '四', meaning: '4' },
            { cantonese: '五', meaning: '5' },
            { cantonese: '六', meaning: '6' },
            { cantonese: '七', meaning: '7' },
            { cantonese: '八', meaning: '8' }
          ]
        }
      },
      {
        id: 's0-u3-l4',
        type: 'quiz',
        title: '数字测验',
        subtitle: '听数字，选答案',
        content: {
          questions: [
            { prompt: '听粤语数字，选择正确的意思', promptType: 'audio', speakText: '一', options: ['1', '2', '3', '4'], answer: '1' },
            { prompt: '听粤语数字，选择正确的意思', promptType: 'audio', speakText: '四', options: ['3', '4', '5', '6'], answer: '4' },
            { prompt: '听粤语数字，选择正确的意思', promptType: 'audio', speakText: '七', options: ['6', '7', '8', '9'], answer: '7' },
            { prompt: '听粤语数字，选择正确的意思', promptType: 'audio', speakText: '十', options: ['8', '9', '10', '11'], answer: '10' },
            { prompt: '听粤语数字，选择正确的意思', promptType: 'audio', speakText: '三', options: ['1', '2', '3', '4'], answer: '3' },
            { prompt: '听粤语数字，选择正确的意思', promptType: 'audio', speakText: '八', options: ['6', '7', '8', '9'], answer: '8' },
            { prompt: '听粤语数字，选择正确的意思', promptType: 'audio', speakText: '六', options: ['5', '6', '7', '8'], answer: '6' },
            { prompt: '听粤语数字，选择正确的意思', promptType: 'audio', speakText: '九', options: ['7', '8', '9', '10'], answer: '9' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 0.4：颜色 ===== */
  {
    id: 's0-u4',
    name: '认识颜色',
    icon: '🎨',
    lessons: [
      {
        id: 's0-u4-l1',
        type: 'vocab',
        title: '彩虹的颜色',
        subtitle: '学习粤语颜色词汇',
        content: {
          words: [
            { cantonese: '紅色', jyutping: 'hung4 sik1', meaning: '红色', note: '红 = 红色' },
            { cantonese: '黃色', jyutping: 'wong4 sik1', meaning: '黄色', note: '注意 wong 的发音' },
            { cantonese: '藍色', jyutping: 'laam4 sik1', meaning: '蓝色', note: '闭口音 -m' },
            { cantonese: '綠色', jyutping: 'luk6 sik1', meaning: '绿色', note: '入声字，短促' },
            { cantonese: '白色', jyutping: 'baak6 sik1', meaning: '白色', note: '入声字' },
            { cantonese: '黑色', jyutping: 'hak1 sik1', meaning: '黑色', note: '入声字' },
            { cantonese: '橙色', jyutping: 'caang2 sik1', meaning: '橙色', note: 'caang 第二声' },
            { cantonese: '紫色', jyutping: 'zi2 sik1', meaning: '紫色', note: '普通话说"紫色"也是"紫色"' }
          ]
        }
      },
      {
        id: 's0-u4-l2',
        type: 'quiz',
        title: '颜色测验',
        subtitle: '听颜色，选出正确的答案',
        content: {
          questions: [
            { prompt: '听粤语，这是什么颜色？', promptType: 'audio', speakText: '紅色', options: ['红色', '蓝色', '黄色', '绿色'], answer: '红色' },
            { prompt: '听粤语，这是什么颜色？', promptType: 'audio', speakText: '藍色', options: ['红色', '蓝色', '黄色', '绿色'], answer: '蓝色' },
            { prompt: '听粤语，这是什么颜色？', promptType: 'audio', speakText: '白色', options: ['黑色', '白色', '红色', '紫色'], answer: '白色' },
            { prompt: '听粤语，这是什么颜色？', promptType: 'audio', speakText: '綠色', options: ['红色', '蓝色', '黄色', '绿色'], answer: '绿色' },
            { prompt: '听粤语，这是什么颜色？', promptType: 'audio', speakText: '黑色', options: ['黑色', '白色', '灰色', '棕色'], answer: '黑色' },
            { prompt: '听粤语，这是什么颜色？', promptType: 'audio', speakText: '黃色', options: ['红色', '蓝色', '黄色', '绿色'], answer: '黄色' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 0.5：身体部位 ===== */
  {
    id: 's0-u5',
    name: '身体部位',
    icon: '🧍',
    lessons: [
      {
        id: 's0-u5-l1',
        type: 'vocab',
        title: '我的身体',
        subtitle: '学习粤语身体部位词汇',
        content: {
          words: [
            { cantonese: '頭', jyutping: 'tau4', meaning: '头', note: '第四声，和普通话"头"发音不同' },
            { cantonese: '手', jyutping: 'sau2', meaning: '手', note: '第二声' },
            { cantonese: '腳', jyutping: 'goek3', meaning: '脚', note: '入声字，和普通话完全不同' },
            { cantonese: '眼', jyutping: 'ngaan5', meaning: '眼睛', note: '第五声，鼻音开头' },
            { cantonese: '耳', jyutping: 'ji5', meaning: '耳朵', note: '第五声' },
            { cantonese: '口', jyutping: 'hau2', meaning: '嘴巴', note: '第二声' },
            { cantonese: '鼻', jyutping: 'bei6', meaning: '鼻子', note: '第六声' },
            { cantonese: '面', jyutping: 'min6', meaning: '脸', note: '粤语说"面"不说"脸"' }
          ]
        }
      },
      {
        id: 's0-u5-l2',
        type: 'game',
        title: '身体部位配对',
        subtitle: '把粤语和身体部位连起来',
        content: {
          gameType: 'match',
          pairs: [
            { cantonese: '頭', meaning: '头' },
            { cantonese: '手', meaning: '手' },
            { cantonese: '腳', meaning: '脚' },
            { cantonese: '眼', meaning: '眼睛' },
            { cantonese: '耳', meaning: '耳朵' },
            { cantonese: '口', meaning: '嘴巴' },
            { cantonese: '鼻', meaning: '鼻子' },
            { cantonese: '面', meaning: '脸' }
          ]
        }
      },
      {
        id: 's0-u5-l3',
        type: 'quiz',
        title: '身体部位测验',
        subtitle: '听发音，选择正确的身体部位',
        content: {
          questions: [
            { prompt: '听粤语，这是哪个部位？', promptType: 'audio', speakText: '頭', options: ['头', '手', '脚', '眼睛'], answer: '头' },
            { prompt: '听粤语，这是哪个部位？', promptType: 'audio', speakText: '眼', options: ['耳朵', '嘴巴', '眼睛', '鼻子'], answer: '眼睛' },
            { prompt: '听粤语，这是哪个部位？', promptType: 'audio', speakText: '腳', options: ['手', '脚', '头', '脸'], answer: '脚' },
            { prompt: '听粤语，这是哪个部位？', promptType: 'audio', speakText: '口', options: ['眼睛', '耳朵', '嘴巴', '鼻子'], answer: '嘴巴' },
            { prompt: '听粤语，这是哪个部位？', promptType: 'audio', speakText: '鼻', options: ['眼睛', '嘴巴', '鼻子', '耳朵'], answer: '鼻子' },
            { prompt: '听粤语，这是哪个部位？', promptType: 'audio', speakText: '面', options: ['头', '手', '脸', '脚'], answer: '脸' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 0.6：动物 ===== */
  {
    id: 's0-u6',
    name: '动物世界',
    icon: '🐾',
    lessons: [
      {
        id: 's0-u6-l1',
        type: 'vocab',
        title: '常见的动物',
        subtitle: '学习粤语动物词汇',
        content: {
          words: [
            { cantonese: '貓', jyutping: 'maau1', meaning: '猫', note: '第一声，和普通话"猫"相似' },
            { cantonese: '狗', jyutping: 'gau2', meaning: '狗', note: '第二声' },
            { cantonese: '魚', jyutping: 'jyu4', meaning: '鱼', note: '第四声，和普通话"鱼"发音不同' },
            { cantonese: '鳥', jyutping: 'niu5', meaning: '鸟', note: '第五声' },
            { cantonese: '雞', jyutping: 'gai1', meaning: '鸡', note: '第一声，和普通话"鸡"完全不同' },
            { cantonese: '豬', jyutping: 'zyu1', meaning: '猪', note: '第一声' },
            { cantonese: '牛', jyutping: 'ngau4', meaning: '牛', note: '第四声，鼻音开头' },
            { cantonese: '兔', jyutping: 'tou3', meaning: '兔子', note: '第三声' }
          ]
        }
      },
      {
        id: 's0-u6-l2',
        type: 'game',
        title: '动物配对',
        subtitle: '把粤语和动物连起来',
        content: {
          gameType: 'match',
          pairs: [
            { cantonese: '貓', meaning: '猫' },
            { cantonese: '狗', meaning: '狗' },
            { cantonese: '魚', meaning: '鱼' },
            { cantonese: '鳥', meaning: '鸟' },
            { cantonese: '雞', meaning: '鸡' },
            { cantonese: '豬', meaning: '猪' },
            { cantonese: '牛', meaning: '牛' },
            { cantonese: '兔', meaning: '兔子' }
          ]
        }
      },
      {
        id: 's0-u6-l3',
        type: 'quiz',
        title: '动物测验',
        subtitle: '听发音，选出正确的动物',
        content: {
          questions: [
            { prompt: '听粤语，这是什么动物？', promptType: 'audio', speakText: '貓', options: ['猫', '狗', '鱼', '鸟'], answer: '猫' },
            { prompt: '听粤语，这是什么动物？', promptType: 'audio', speakText: '雞', options: ['猫', '鸡', '猪', '牛'], answer: '鸡' },
            { prompt: '听粤语，这是什么动物？', promptType: 'audio', speakText: '魚', options: ['猫', '狗', '鱼', '鸟'], answer: '鱼' },
            { prompt: '听粤语，这是什么动物？', promptType: 'audio', speakText: '牛', options: ['鸡', '猪', '牛', '兔'], answer: '牛' },
            { prompt: '听粤语，这是什么动物？', promptType: 'audio', speakText: '豬', options: ['猫', '狗', '猪', '牛'], answer: '猪' },
            { prompt: '听粤语，这是什么动物？', promptType: 'audio', speakText: '兔', options: ['鸡', '猪', '兔', '鸟'], answer: '兔子' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 0.7：启蒙级复习 ===== */
  {
    id: 's0-u7',
    name: '启蒙级总复习',
    icon: '📊',
    lessons: [
      {
        id: 's0-u7-l1',
        type: 'review',
        title: '启蒙级综合复习',
        subtitle: '回顾启蒙级学过的所有内容',
        content: { reviewType: 'stage', stageId: 'stage-0' }
      }
    ]
  }
];