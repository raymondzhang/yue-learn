/* =========================================================
   Stage 1 — 入门级 · 学词语·说短句
   7 个单元，~20 课时
   ========================================================= */
const STAGE_1_UNITS = [
  /* ===== 单元 1.1：打招呼 ===== */
  {
    id: 's1-u1',
    name: '打招呼',
    icon: '👋',
    lessons: [
      {
        id: 's1-u1-l1',
        type: 'vocab',
        title: '打招呼用语',
        subtitle: '学会用粤语打招呼',
        content: {
          words: [
            { cantonese: '你好', jyutping: 'nei5 hou2', meaning: '你好', note: '和普通话一样，但发音不同' },
            { cantonese: '早晨', jyutping: 'zou2 san4', meaning: '早上好', note: '粤语说"早晨"不说"早上好"' },
            { cantonese: '拜拜', jyutping: 'baai1 baai3', meaning: '再见', note: '粤语常用"拜拜"' },
            { cantonese: '多謝', jyutping: 'do1 ze6', meaning: '谢谢', note: '粤语说"多谢"不说"谢谢"' },
            { cantonese: '唔該', jyutping: 'm4 goi1', meaning: '谢谢/劳驾', note: '用于别人帮了忙，和多謝不同' },
            { cantonese: '對唔住', jyutping: 'deoi3 m4 zyu6', meaning: '对不起', note: '粤语说"对唔住"' },
            { cantonese: '你叫咩名？', jyutping: 'nei5 giu3 me1 meng2', meaning: '你叫什么名字？', note: '咩 = 什么' },
            { cantonese: '你好嗎？', jyutping: 'nei5 hou2 maa3', meaning: '你好吗？', note: '加"吗"表疑问' }
          ]
        }
      },
      {
        id: 's1-u1-l2',
        type: 'dialogue',
        title: '初次见面',
        subtitle: '学习第一次见面的对话',
        content: {
          scene: '在学校门口，两个小朋友第一次见面',
          lines: [
            { speaker: 'A', cantonese: '你好！我係小明。你叫咩名呀？', jyutping: 'nei5 hou2 ngo5 hai6 siu2 ming4 nei5 giu3 me1 meng2 aa3', meaning: '你好！我是小明。你叫什么名字？' },
            { speaker: 'B', cantonese: '你好！我叫小美。好開心認識你！', jyutping: 'nei5 hou2 ngo5 giu3 siu2 mei5 hou2 hoi1 sam1 jing6 sik1 nei5', meaning: '你好！我叫小美。很高兴认识你！', note: '開心 = 高兴' },
            { speaker: 'A', cantonese: '我都好開心！你幾歲呀？', jyutping: 'ngo5 dou1 hou2 hoi1 sam1 nei5 gei2 seoi3 aa3', meaning: '我也很高兴！你几岁？', note: '幾歲 = 几岁' },
            { speaker: 'B', cantonese: '我六歲。你呢？', jyutping: 'ngo5 luk6 seoi3 nei5 ne1', meaning: '我六岁。你呢？', note: '呢 = 呢（语气词）' },
            { speaker: 'A', cantonese: '我都係六歲！', jyutping: 'ngo5 dou1 hai6 luk6 seoi3', meaning: '我也是六岁！', note: '都係 = 也是' }
          ]
        }
      },
      {
        id: 's1-u1-l3',
        type: 'quiz',
        title: '打招呼测验',
        subtitle: '测试你的打招呼技能',
        content: {
          questions: [
            { prompt: '粤语"早上好"怎么说？', promptType: 'audio', speakText: '早晨', options: ['早晨', '早安', '早上好', '你好'], answer: '早晨' },
            { prompt: '粤语"谢谢"怎么说？', promptType: 'audio', speakText: '多謝', options: ['多谢', '谢谢', '唔该', '你好'], answer: '多谢' },
            { prompt: '粤语"你叫什么名字？"怎么说？', promptType: 'audio', speakText: '你叫咩名', options: ['你叫什么名', '你叫咩名', '你叫什么', '你叫咩'], answer: '你叫咩名' },
            { prompt: '粤语"对不起"怎么说？', promptType: 'audio', speakText: '對唔住', options: ['对不起', '对唔住', '唔好意思', '多谢'], answer: '对唔住' },
            { prompt: '粤语"再见"怎么说？', promptType: 'audio', speakText: '拜拜', options: ['再见', '拜拜', '拜', '后会有期'], answer: '拜拜' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 1.2：我的家人 ===== */
  {
    id: 's1-u2',
    name: '我的家人',
    icon: '👨‍👩‍👧‍👦',
    lessons: [
      {
        id: 's1-u2-l1',
        type: 'vocab',
        title: '家庭成员',
        subtitle: '学习家人的粤语称呼',
        content: {
          words: [
            { cantonese: '爸爸', jyutping: 'baa4 baa1', meaning: '爸爸', note: '第四声+第一声' },
            { cantonese: '媽媽', jyutping: 'maa1 maa1', meaning: '妈妈', note: '第一声' },
            { cantonese: '哥哥', jyutping: 'go1 go1', meaning: '哥哥', note: '第一声' },
            { cantonese: '姐姐', jyutping: 'ze2 ze2', meaning: '姐姐', note: '第二声' },
            { cantonese: '弟弟', jyutping: 'dai6 dai6', meaning: '弟弟', note: '第六声' },
            { cantonese: '妹妹', jyutping: 'mui6 mui6', meaning: '妹妹', note: '第六声' },
            { cantonese: '爺爺', jyutping: 'je4 je4', meaning: '爷爷', note: '第四声' },
            { cantonese: '嫲嫲', jyutping: 'maa4 maa4', meaning: '奶奶', note: '粤语说"嫲嫲"（爸爸的妈妈）' }
          ]
        }
      },
      {
        id: 's1-u2-l2',
        type: 'dialogue',
        title: '介绍我的家人',
        subtitle: '学习用粤语介绍家人',
        content: {
          scene: '在家里，小明向朋友介绍家人',
          lines: [
            { speaker: 'A', cantonese: '呢個係我爸爸，呢個係我媽媽。', jyutping: 'ni1 go3 hai6 ngo5 baa4 baa1 ni1 go3 hai6 ngo5 maa1 maa1', meaning: '这个是我爸爸，这个是我妈妈。', note: '呢個 = 这个' },
            { speaker: 'B', cantonese: '你爸爸媽媽好靚仔靚女！', jyutping: 'nei5 baa4 baa1 maa1 maa1 hou2 leng3 zai2 leng3 neoi2', meaning: '你爸爸妈妈好帅好漂亮！', note: '靚 = 漂亮/帅' },
            { speaker: 'A', cantonese: '多謝！我有個哥哥同一個妹妹。', jyutping: 'do1 ze6 ngo5 jau5 go3 go1 go1 tung4 jat1 go3 mui6 mui6', meaning: '谢谢！我有一个哥哥和一个妹妹。', note: '同 = 和' },
            { speaker: 'B', cantonese: '你屋企好熱鬧喎！', jyutping: 'nei5 uk1 kei2 hou2 jit6 naau6 wo3', meaning: '你家好热闹啊！', note: '屋企 = 家' }
          ]
        }
      },
      {
        id: 's1-u2-l3',
        type: 'quiz',
        title: '家人测验',
        subtitle: '你能认出每个家人吗？',
        content: {
          questions: [
            { prompt: '粤语"爸爸"怎么说？', promptType: 'audio', speakText: '爸爸', options: ['爸爸', '老爹', '阿爸', '父亲'], answer: '爸爸' },
            { prompt: '粤语"哥哥"怎么说？', promptType: 'audio', speakText: '哥哥', options: ['哥哥', '阿哥', '哥哥', '大兄'], answer: '哥哥' },
            { prompt: '粤语"弟弟"怎么说？', promptType: 'audio', speakText: '弟弟', options: ['弟弟', '细佬', '阿弟', '小弟'], answer: '弟弟' },
            { prompt: '粤语"奶奶"（爸爸的妈妈）怎么说？', promptType: 'audio', speakText: '嫲嫲', options: ['嫲嫲', '婆婆', '奶奶', '阿嫲'], answer: '嫲嫲' },
            { prompt: '粤语"姐姐"怎么说？', promptType: 'audio', speakText: '姐姐', options: ['姐姐', '家姐', '阿姐', '大姐'], answer: '姐姐' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 1.3：食物（上）===== */
  {
    id: 's1-u3',
    name: '美味食物（上）',
    icon: '🍚',
    lessons: [
      {
        id: 's1-u3-l1',
        type: 'vocab',
        title: '日常食物',
        subtitle: '学习常见食物的粤语说法',
        content: {
          words: [
            { cantonese: '飯', jyutping: 'faan6', meaning: '米饭/饭', note: '第六声' },
            { cantonese: '麵', jyutping: 'min6', meaning: '面条', note: '第六声' },
            { cantonese: '魚', jyutping: 'jyu4', meaning: '鱼', note: '第四声' },
            { cantonese: '雞', jyutping: 'gai1', meaning: '鸡', note: '第一声' },
            { cantonese: '蛋', jyutping: 'daan2', meaning: '蛋', note: '第二声' },
            { cantonese: '菜', jyutping: 'coi3', meaning: '蔬菜', note: '第三声' },
            { cantonese: '水果', jyutping: 'seoi2 gwo2', meaning: '水果', note: '第二声+第二声' },
            { cantonese: '包', jyutping: 'baau1', meaning: '包子/面包', note: '第一声' }
          ]
        }
      },
      {
        id: 's1-u3-l2',
        type: 'dialogue',
        title: '吃饭时间',
        subtitle: '学习吃饭时的粤语对话',
        content: {
          scene: '晚餐时间，一家人在吃饭',
          lines: [
            { speaker: 'A', cantonese: '食飯啦！今日有雞同魚。', jyutping: 'sik6 faan6 laa3 gam1 jat6 jau5 gai1 tung4 jyu4', meaning: '吃饭了！今天有鸡和鱼。', note: '食飯 = 吃饭' },
            { speaker: 'B', cantonese: '哇，好香呀！我鍾意食雞。', jyutping: 'waa1 hou2 hoeng1 aa3 ngo5 zung1 ji3 sik6 gai1', meaning: '哇，好香啊！我喜欢吃鸡。', note: '鍾意 = 喜欢' },
            { speaker: 'A', cantonese: '食多啲菜啦，對身體好㗎。', jyutping: 'sik6 do1 di1 coi3 laa1 deoi3 san1 tai2 hou2 gaa3', meaning: '多吃点菜吧，对身体好的。', note: '多啲 = 多一点' },
            { speaker: 'B', cantonese: '好味！多謝媽媽！', jyutping: 'hou2 mei6 do1 ze6 maa1 maa1', meaning: '好吃！谢谢妈妈！', note: '好味 = 好吃' }
          ]
        }
      },
      {
        id: 's1-u3-l3',
        type: 'quiz',
        title: '食物测验',
        subtitle: '这些食物你认识吗？',
        content: {
          questions: [
            { prompt: '粤语"吃饭"怎么说？', promptType: 'audio', speakText: '食飯', options: ['食饭', '吃饭', '食米', '食面'], answer: '食饭' },
            { prompt: '粤语"好吃"怎么说？', promptType: 'audio', speakText: '好味', options: ['好吃', '好味', '好食', '美味'], answer: '好味' },
            { prompt: '粤语"喜欢"怎么说？', promptType: 'audio', speakText: '鍾意', options: ['钟意', '喜欢', '中意', '钟爱'], answer: '钟意' },
            { prompt: '粤语"多一点"怎么说？', promptType: 'audio', speakText: '多啲', options: ['多点', '多啲', '多些', '多啲'], answer: '多啲' },
            { prompt: '粤语"面条"怎么说？', promptType: 'audio', speakText: '麵', options: ['面', '面', '面', '面'], answer: '面' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 1.4：食物（下）===== */
  {
    id: 's1-u4',
    name: '美味食物（下）',
    icon: '🍜',
    lessons: [
      {
        id: 's1-u4-l1',
        type: 'vocab',
        title: '饮品和点心',
        subtitle: '学习粤语饮品和点心说法',
        content: {
          words: [
            { cantonese: '茶', jyutping: 'caa4', meaning: '茶', note: '第四声' },
            { cantonese: '奶', jyutping: 'naai5', meaning: '牛奶', note: '第五声' },
            { cantonese: '水', jyutping: 'seoi2', meaning: '水', note: '第二声' },
            { cantonese: '奶茶', jyutping: 'naai5 caa4', meaning: '奶茶', note: '香港奶茶很有名' },
            { cantonese: '檸檬茶', jyutping: 'ning4 mung1 caa4', meaning: '柠檬茶', note: '茶餐厅经典饮品' },
            { cantonese: '點心', jyutping: 'dim2 sam1', meaning: '点心', note: '饮茶文化' },
            { cantonese: '蝦餃', jyutping: 'haa1 gaau2', meaning: '虾饺', note: '经典点心' },
            { cantonese: '燒賣', jyutping: 'siu1 maai2', meaning: '烧卖', note: '经典点心' }
          ]
        }
      },
      {
        id: 's1-u4-l2',
        type: 'dialogue',
        title: '在茶餐厅',
        subtitle: '学习在茶餐厅点餐',
        content: {
          scene: '在茶餐厅，小明和小美在点餐',
          lines: [
            { speaker: 'A', cantonese: '唔該，我想叫一杯凍奶茶。', jyutping: 'm4 goi1 ngo5 soeng2 giu3 jat1 bui1 dung3 naai5 caa4', meaning: '麻烦，我想点一杯冻奶茶。', note: '凍 = 冰的' },
            { speaker: 'B', cantonese: '我要一杯熱檸檬茶，同埋一籠蝦餃。', jyutping: 'ngo5 jiu3 jat1 bui1 jit6 ning4 mung1 caa4 tung4 maai4 jat1 lung4 haa1 gaau2', meaning: '我要一杯热柠檬茶，还有一笼虾饺。', note: '同埋 = 还有' },
            { speaker: 'A', cantonese: '呢度嘅點心好好味㗎！', jyutping: 'ni1 dou6 ge3 dim2 sam1 hou2 hou2 mei6 gaa3', meaning: '这里的点心很好吃的！', note: '呢度 = 这里' },
            { speaker: 'B', cantonese: '係呀！我次次都嚟呢度食。', jyutping: 'hai6 aa3 ngo5 ci3 ci3 dou1 lai4 ni1 dou6 sik6', meaning: '是啊！我每次都来这里吃。', note: '次次 = 每次，嚟 = 来' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 1.5：日常动作 ===== */
  {
    id: 's1-u5',
    name: '日常动作',
    icon: '🏃',
    lessons: [
      {
        id: 's1-u5-l1',
        type: 'vocab',
        title: '常用动词',
        subtitle: '学习粤语常用动作词汇',
        content: {
          words: [
            { cantonese: '食', jyutping: 'sik6', meaning: '吃', note: '粤语"食"=普通话"吃"' },
            { cantonese: '飲', jyutping: 'jam2', meaning: '喝', note: '粤语"饮"=普通话"喝"' },
            { cantonese: '睇', jyutping: 'tai2', meaning: '看', note: '粤语"睇"=普通话"看"' },
            { cantonese: '聽', jyutping: 'teng1', meaning: '听', note: '第一声' },
            { cantonese: '走', jyutping: 'zau2', meaning: '走/跑', note: '粤语"走"有"跑"的意思' },
            { cantonese: '行', jyutping: 'haang4', meaning: '走/步行', note: '粤语"行"=普通话"走"' },
            { cantonese: '坐', jyutping: 'co5', meaning: '坐', note: '第五声' },
            { cantonese: '企', jyutping: 'kei5', meaning: '站', note: '粤语"企"=普通话"站"' }
          ]
        }
      },
      {
        id: 's1-u5-l2',
        type: 'quiz',
        title: '动作测验',
        subtitle: '选出正确的粤语动作词',
        content: {
          questions: [
            { prompt: '普通话"吃"用粤语怎么说？', promptType: 'audio', speakText: '食', options: ['食', '吃', '咬', '吞'], answer: '食' },
            { prompt: '普通话"喝"用粤语怎么说？', promptType: 'audio', speakText: '飲', options: ['喝', '饮', '食', '吞'], answer: '饮' },
            { prompt: '普通话"看"用粤语怎么说？', promptType: 'audio', speakText: '睇', options: ['看', '望', '睇', '见'], answer: '睇' },
            { prompt: '普通话"站"用粤语怎么说？', promptType: 'audio', speakText: '企', options: ['站', '企', '立', '起'], answer: '企' },
            { prompt: '普通话"步行"用粤语怎么说？', promptType: 'audio', speakText: '行', options: ['走', '行', '跑', '步'], answer: '行' },
            { prompt: '粤语"走"在普通话里是什么意思？', promptType: 'text', options: ['走', '跑', '跳', '行'], answer: '跑' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 1.6：学校用品 ===== */
  {
    id: 's1-u6',
    name: '学校生活',
    icon: '📚',
    lessons: [
      {
        id: 's1-u6-l1',
        type: 'vocab',
        title: '学校用品',
        subtitle: '学习学校用品的粤语说法',
        content: {
          words: [
            { cantonese: '書', jyutping: 'syu1', meaning: '书', note: '第一声' },
            { cantonese: '筆', jyutping: 'bat1', meaning: '笔', note: '入声字，短促' },
            { cantonese: '紙', jyutping: 'zi2', meaning: '纸', note: '第二声' },
            { cantonese: '課本', jyutping: 'fo3 bun2', meaning: '课本', note: '第三声+第二声' },
            { cantonese: '書包', jyutping: 'syu1 baau1', meaning: '书包', note: '第一声+第一声' },
            { cantonese: '功課', jyutping: 'gung1 fo3', meaning: '功课/作业', note: '第一声+第三声' },
            { cantonese: '老師', jyutping: 'lou5 si1', meaning: '老师', note: '第五声+第一声' },
            { cantonese: '同學', jyutping: 'tung4 hok6', meaning: '同学', note: '第四声+第六声' }
          ]
        }
      },
      {
        id: 's1-u6-l2',
        type: 'dialogue',
        title: '在教室里',
        subtitle: '学习课堂上的粤语对话',
        content: {
          scene: '在教室里，上课前',
          lines: [
            { speaker: 'A', cantonese: '你有冇帶課本呀？', jyutping: 'nei5 jau5 mou5 daai3 fo3 bun2 aa3', meaning: '你有没有带课本？', note: '有冇 = 有没有' },
            { speaker: 'B', cantonese: '有呀！喺書包度。', jyutping: 'jau5 aa3 hai2 syu1 baau1 dou6', meaning: '有啊！在书包里。', note: '喺...度 = 在...里' },
            { speaker: 'A', cantonese: '今日有功課要交。你做咗未？', jyutping: 'gam1 jat6 jau5 gung1 fo3 jiu3 gaau1 nei5 zou6 zo2 mei6', meaning: '今天有功课要交。你做了吗？', note: '做咗 = 做了' },
            { speaker: 'B', cantonese: '做咗啦！尋晚做完㗎。', jyutping: 'zou6 zo2 laa3 cam4 maan5 zou6 jyun4 gaa3', meaning: '做了！昨晚做完的。', note: '尋晚 = 昨晚' }
          ]
        }
      },
      {
        id: 's1-u6-l3',
        type: 'quiz',
        title: '学校测验',
        subtitle: '测试学校相关的粤语词汇',
        content: {
          questions: [
            { prompt: '粤语"课本"怎么说？', promptType: 'audio', speakText: '課本', options: ['课本', '书本', '课本', '教材'], answer: '课本' },
            { prompt: '粤语"有没有"怎么说？', promptType: 'audio', speakText: '有冇', options: ['有无', '有冇', '有没有', '有没'], answer: '有冇' },
            { prompt: '粤语"功课"是什么意思？', promptType: 'text', options: ['课程', '作业', '功课', '工作'], answer: '作业' },
            { prompt: '粤语"昨晚"怎么说？', promptType: 'audio', speakText: '尋晚', options: ['昨晚', '寻晚', '昨晚', '琴晚'], answer: '寻晚' },
            { prompt: '粤语"在书包里"怎么说？', promptType: 'audio', speakText: '喺書包度', options: ['在书包', '喺书包', '喺书包度', '在书包里'], answer: '喺书包度' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 1.7：入门级复习 ===== */
  {
    id: 's1-u7',
    name: '入门级总复习',
    icon: '📊',
    lessons: [
      {
        id: 's1-u7-l1',
        type: 'review',
        title: '入门级综合复习',
        subtitle: '回顾入门级学过的所有内容',
        content: { reviewType: 'stage', stageId: 'stage-1' }
      }
    ]
  }
];