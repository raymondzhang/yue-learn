/* =========================================================
   Stage 3 — 进阶级 · 复杂对话·香港文化
   5 个单元，~14 课时
   ========================================================= */
const STAGE_3_UNITS = [
  /* ===== 单元 3.1：讲故事 ===== */
  {
    id: 's3-u1',
    name: '讲故事',
    icon: '📖',
    lessons: [
      {
        id: 's3-u1-l1',
        type: 'story',
        title: '龟兔赛跑',
        subtitle: '用粤语听经典故事',
        content: {
          pages: [
            {
              text: '好耐好耐之前，有一隻兔同一隻烏龜。兔成日笑烏龜行得慢。',
              translation: '很久很久以前，有一只兔子和一只乌龟。兔子整天笑乌龟走得慢。',
              words: [
                { cantonese: '好耐', meaning: '很久' },
                { cantonese: '一隻', meaning: '一只' },
                { cantonese: '成日', meaning: '整天/总是' },
                { cantonese: '行得慢', meaning: '走得慢' }
              ]
            },
            {
              text: '烏龜話：「我哋嚟比賽跑啦！」兔話：「好呀，我一定贏！」',
              translation: '乌龟说："我们来比赛跑步吧！"兔子说："好呀，我一定赢！"',
              words: [
                { cantonese: '話', meaning: '说' },
                { cantonese: '嚟', meaning: '来' },
                { cantonese: '比賽', meaning: '比赛' },
                { cantonese: '贏', meaning: '赢' }
              ]
            },
            {
              text: '比賽開始，兔好快就跑到前面。兔諗：「我休息下先啦。」',
              translation: '比赛开始，兔子很快就跑到前面。兔子想："我先休息一下吧。"',
              words: [
                { cantonese: '開始', meaning: '开始' },
                { cantonese: '跑到前面', meaning: '跑到前面' },
                { cantonese: '諗', meaning: '想（粤语特色词）' },
                { cantonese: '休息下', meaning: '休息一下' }
              ]
            },
            {
              text: '兔瞓着咗。烏龜一步一步，慢慢咁行，冇停過。',
              translation: '兔子睡着了。乌龟一步一步，慢慢地走，没有停过。',
              words: [
                { cantonese: '瞓着咗', meaning: '睡着了' },
                { cantonese: '一步一步', meaning: '一步一步' },
                { cantonese: '慢慢咁', meaning: '慢慢地' },
                { cantonese: '冇停過', meaning: '没有停过' }
              ]
            },
            {
              text: '最後，烏龜贏咗！呢個故事話我哋知：堅持到底就係勝利！',
              translation: '最后，乌龟赢了！这个故事告诉我们：坚持到底就是胜利！',
              words: [
                { cantonese: '最後', meaning: '最后' },
                { cantonese: '贏咗', meaning: '赢了' },
                { cantonese: '堅持到底', meaning: '坚持到底' },
                { cantonese: '勝利', meaning: '胜利' }
              ]
            }
          ]
        }
      },
      {
        id: 's3-u1-l2',
        type: 'vocab',
        title: '故事常用词',
        subtitle: '学习讲故事的粤语词汇',
        content: {
          words: [
            { cantonese: '好耐之前', jyutping: 'hou2 noi6 zi1 cin4', meaning: '很久以前', note: '讲故事的开头' },
            { cantonese: '跟住', jyutping: 'gan1 zyu6', meaning: '然后/接着', note: '粤语特色词' },
            { cantonese: '最後', jyutping: 'zeoi3 hau6', meaning: '最后', note: '第三声+第六声' },
            { cantonese: '忽然', jyutping: 'fat1 jin4', meaning: '忽然/突然', note: '第一声+第四声' },
            { cantonese: '原來', jyutping: 'jyun4 loi4', meaning: '原来', note: '第四声+第四声' },
            { cantonese: '所以', jyutping: 'so2 ji5', meaning: '所以', note: '第二声+第五声' },
            { cantonese: '因為', jyutping: 'jan1 wai6', meaning: '因为', note: '第一声+第六声' },
            { cantonese: '但係', jyutping: 'daan6 hai6', meaning: '但是', note: '第六声+第六声' }
          ]
        }
      },
      {
        id: 's3-u1-l3',
        type: 'game',
        title: '故事排序',
        subtitle: '把句子排成正确的故事顺序',
        content: {
          gameType: 'word-order',
          questions: [
            { words: ['好耐', '之前', '有', '一隻', '烏龜'], answer: '好耐之前有一隻烏龜', meaning: '很久以前有一只乌龟', hint: '时间 + 有 + 什么' },
            { words: ['跟住', '佢哋', '開始', '比賽'], answer: '跟住佢哋開始比賽', meaning: '然后他们开始比赛', hint: '然后 + 谁 + 做什么' },
            { words: ['最後', '烏龜', '贏咗', '比賽'], answer: '最後烏龜贏咗比賽', meaning: '最后乌龟赢了比赛', hint: '最后 + 谁 + 结果' },
            { words: ['因為', '佢', '冇', '放棄'], answer: '因為佢冇放棄', meaning: '因为他没有放弃', hint: '因为 + 谁 + 没做什么' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 3.2：表达感受 ===== */
  {
    id: 's3-u2',
    name: '表达感受',
    icon: '😊',
    lessons: [
      {
        id: 's3-u2-l1',
        type: 'vocab',
        title: '情感词汇',
        subtitle: '学习用粤语表达各种感受',
        content: {
          words: [
            { cantonese: '開心', jyutping: 'hoi1 sam1', meaning: '高兴/开心', note: '第一声+第一声' },
            { cantonese: '唔開心', jyutping: 'm4 hoi1 sam1', meaning: '不高兴/不开心', note: '加"唔"变否定' },
            { cantonese: '驚', jyutping: 'geng1', meaning: '害怕/怕', note: '第一声，粤语说"驚"不说"怕"' },
            { cantonese: '嬲', jyutping: 'nau1', meaning: '生气', note: '第一声，粤语特色词' },
            { cantonese: '興奮', jyutping: 'hing1 fan5', meaning: '兴奋', note: '第一声+第五声' },
            { cantonese: '悶', jyutping: 'mun6', meaning: '无聊/闷', note: '第六声' },
            { cantonese: '掛住', jyutping: 'gwaa3 zyu6', meaning: '想念/思念', note: '粤语特色词' },
            { cantonese: '滿足', jyutping: 'mun5 zuk1', meaning: '满足', note: '第五声+第一声' }
          ]
        }
      },
      {
        id: 's3-u2-l2',
        type: 'dialogue',
        title: '你今天开心吗？',
        subtitle: '学习用粤语表达每天的心情',
        content: {
          scene: '放学后，妈妈问小明今天过得怎样',
          lines: [
            { speaker: 'A', cantonese: '小明，你今日點呀？開唔開心？', jyutping: 'siu2 ming4 nei5 gam1 jat6 dim2 aa3 hoi1 m4 hoi1 sam1', meaning: '小明，你今天怎样？开不开心？', note: '點 = 怎样' },
            { speaker: 'B', cantonese: '我好開心！今日交咗好多新朋友！', jyutping: 'ngo5 hou2 hoi1 sam1 gam1 jat6 gaau1 zo2 hou2 do1 san1 pang4 jau5', meaning: '我很开心！今天交了好多新朋友！', note: '交咗 = 交了' },
            { speaker: 'A', cantonese: '咁就好！有冇咩唔開心嘅事？', jyutping: 'gam3 zau6 hou2 jau5 mou5 me1 m4 hoi1 sam1 ge3 si6', meaning: '那就好！有没有什么不开心的事？', note: '咁 = 那/这样' },
            { speaker: 'B', cantonese: '冇呀。不過我有啲掛住嫲嫲。', jyutping: 'mou5 aa3 bat1 gwo3 ngo5 jau5 di1 gwaa3 zyu6 maa4 maa4', meaning: '没有。不过我有点想念奶奶。', note: '有啲 = 有点，掛住 = 想念' },
            { speaker: 'A', cantonese: '我哋聽日去探嫲嫲啦！', jyutping: 'ngo5 dei6 ting1 jat6 heoi3 taam3 maa4 maa4 laa1', meaning: '我们明天去探望奶奶吧！', note: '聽日 = 明天，探 = 探望' }
          ]
        }
      },
      {
        id: 's3-u2-l3',
        type: 'game',
        title: '听音辨情绪',
        subtitle: '听发音，选出正确的情绪',
        content: {
          gameType: 'sound-picture',
          questions: [
            { speakText: '開心', answer: '开心', options: [{ emoji: '😊', text: '开心' }, { emoji: '😢', text: '伤心' }, { emoji: '😡', text: '生气' }, { emoji: '😱', text: '害怕' }] },
            { speakText: '嬲', answer: '生气', options: [{ emoji: '😄', text: '高兴' }, { emoji: '😡', text: '生气' }, { emoji: '😴', text: '困了' }, { emoji: '🤔', text: '思考' }] },
            { speakText: '驚', answer: '害怕', options: [{ emoji: '😊', text: '开心' }, { emoji: '😡', text: '生气' }, { emoji: '😱', text: '害怕' }, { emoji: '😐', text: '无聊' }] },
            { speakText: '悶', answer: '无聊', options: [{ emoji: '🤩', text: '兴奋' }, { emoji: '😐', text: '无聊' }, { emoji: '😊', text: '开心' }, { emoji: '😢', text: '伤心' }] },
            { speakText: '興奮', answer: '兴奋', options: [{ emoji: '🤩', text: '兴奋' }, { emoji: '😴', text: '困了' }, { emoji: '😡', text: '生气' }, { emoji: '😢', text: '伤心' }] },
            { speakText: '掛住', answer: '想念', options: [{ emoji: '💕', text: '想念' }, { emoji: '😡', text: '生气' }, { emoji: '😱', text: '害怕' }, { emoji: '😊', text: '开心' }] }
          ]
        }
      }
    ]
  },

  /* ===== 单元 3.3：香港节日 ===== */
  {
    id: 's3-u3',
    name: '香港节日',
    icon: '🎊',
    lessons: [
      {
        id: 's3-u3-l1',
        type: 'story',
        title: '香港的节日',
        subtitle: '了解香港的传统和现代节日',
        content: {
          pages: [
            {
              text: '香港有好多好玩嘅節日。農曆新年係最重要嘅節日，大家都會返屋企食團年飯。',
              translation: '香港有很多好玩的节日。农历新年是最重要的节日，大家都会回家吃团年饭。',
              words: [
                { cantonese: '節日', meaning: '节日' },
                { cantonese: '農曆新年', meaning: '农历新年/春节' },
                { cantonese: '團年飯', meaning: '团年饭/年夜饭' },
                { cantonese: '返屋企', meaning: '回家' }
              ]
            },
            {
              text: '小朋友最鍾意過年，因為有利是收！大人會派利是俾小朋友。',
              translation: '小朋友最喜欢过年，因为有红包收！大人会给小朋友发红包。',
              words: [
                { cantonese: '利是', meaning: '红包/压岁钱' },
                { cantonese: '派', meaning: '发/给' },
                { cantonese: '過年', meaning: '过年' }
              ]
            },
            {
              text: '中秋節，大家食月餅、玩燈籠、賞月。維園嘅花燈好靚！',
              translation: '中秋节，大家吃月饼、玩灯笼、赏月。维园的花灯很漂亮！',
              words: [
                { cantonese: '中秋節', meaning: '中秋节' },
                { cantonese: '月餅', meaning: '月饼' },
                { cantonese: '燈籠', meaning: '灯笼' },
                { cantonese: '靚', meaning: '漂亮/好看' }
              ]
            },
            {
              text: '端午節，大家睇龍舟比賽、食糭。糭有鹹肉糭同鹼水糭。',
              translation: '端午节，大家看龙舟比赛、吃粽子。粽子有咸肉粽和碱水粽。',
              words: [
                { cantonese: '端午節', meaning: '端午节' },
                { cantonese: '龍舟', meaning: '龙舟' },
                { cantonese: '糭', meaning: '粽子' }
              ]
            },
            {
              text: '聖誕節，尖沙咀嘅燈飾好美麗。大家交換禮物、食聖誕大餐。好開心！',
              translation: '圣诞节，尖沙咀的灯饰很美丽。大家交换礼物、吃圣诞大餐。很开心！',
              words: [
                { cantonese: '聖誕節', meaning: '圣诞节' },
                { cantonese: '燈飾', meaning: '灯饰' },
                { cantonese: '禮物', meaning: '礼物' }
              ]
            }
          ]
        }
      },
      {
        id: 's3-u3-l2',
        type: 'vocab',
        title: '节日词汇',
        subtitle: '学习香港节日相关的粤语',
        content: {
          words: [
            { cantonese: '新年', jyutping: 'san1 nin4', meaning: '新年', note: '第一声+第四声' },
            { cantonese: '利是', jyutping: 'lei6 si6', meaning: '红包', note: '粤语特色词' },
            { cantonese: '月餅', jyutping: 'jyut6 beng2', meaning: '月饼', note: '第六声+第二声' },
            { cantonese: '龍舟', jyutping: 'lung4 zau1', meaning: '龙舟', note: '第四声+第一声' },
            { cantonese: '聖誕', jyutping: 'sing3 daan3', meaning: '圣诞', note: '第三声+第三声' },
            { cantonese: '花市', jyutping: 'faa1 si5', meaning: '花市/年宵市场', note: '第一声+第五声' },
            { cantonese: '煙花', jyutping: 'jin1 faa1', meaning: '烟花', note: '第一声+第一声' },
            { cantonese: '拜年', jyutping: 'baai3 nin4', meaning: '拜年', note: '第三声+第四声' }
          ]
        }
      },
      {
        id: 's3-u3-l3',
        type: 'quiz',
        title: '节日测验',
        subtitle: '测试你对香港节日的了解',
        content: {
          questions: [
            { prompt: '粤语"红包"怎么说？', promptType: 'audio', speakText: '利是', options: ['利是', '红包', '压岁钱', '利事'], answer: '利是' },
            { prompt: '粤语"回家"怎么说？', promptType: 'audio', speakText: '返屋企', options: ['返屋企', '回家', '回去', '归家'], answer: '返屋企' },
            { prompt: '粤语"漂亮"怎么说？', promptType: 'audio', speakText: '靚', options: ['漂亮', '好看', '美丽', '靓'], answer: '漂亮' },
            { prompt: '粤语"烟花"怎么说？', promptType: 'audio', speakText: '煙花', options: ['烟花', '火花', '花火', '灯火'], answer: '烟花' },
            { prompt: '粤语"拜年"怎么说？', promptType: 'audio', speakText: '拜年', options: ['拜年', '过年', '贺年', '新年'], answer: '拜年' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 3.4：香港地标 ===== */
  {
    id: 's3-u4',
    name: '香港地标',
    icon: '🏙️',
    lessons: [
      {
        id: 's3-u4-l1',
        type: 'story',
        title: '游香港',
        subtitle: '用粤语认识香港的著名地标',
        content: {
          pages: [
            {
              text: '歡迎嚟到香港！我哋今日一齊遊覽香港嘅 famous 地標。',
              translation: '欢迎来到香港！我们今天一起游览香港的 famous 地标。',
              words: [
                { cantonese: '歡迎', meaning: '欢迎' },
                { cantonese: '嚟到', meaning: '来到' },
                { cantonese: '遊覽', meaning: '游览' },
                { cantonese: '地標', meaning: '地标' }
              ]
            },
            {
              text: '第一站係山頂。坐山頂纜車上去，可以睇到成個維港嘅景色，好壯觀！',
              translation: '第一站是山顶。坐山顶缆车上去，可以看到整个维港的景色，很壮观！',
              words: [
                { cantonese: '山頂', meaning: '山顶（太平山）' },
                { cantonese: '纜車', meaning: '缆车' },
                { cantonese: '維港', meaning: '维多利亚港' },
                { cantonese: '壯觀', meaning: '壮观' }
              ]
            },
            {
              text: '跟住去星光大道，喺尖沙咀海邊。度有好多明星嘅手印同埋維港靚景。',
              translation: '然后去星光大道，在尖沙咀海边。那里有很多明星的手印和维港美景。',
              words: [
                { cantonese: '星光大道', meaning: '星光大道' },
                { cantonese: '尖沙咀', meaning: '尖沙咀' },
                { cantonese: '手印', meaning: '手印' }
              ]
            },
            {
              text: '夜晚去廟街夜市，食街頭小食、睇算命先生。好熱鬧！',
              translation: '晚上去庙街夜市，吃街头小食、看算命先生。好热闹！',
              words: [
                { cantonese: '廟街', meaning: '庙街' },
                { cantonese: '夜市', meaning: '夜市' },
                { cantonese: '街頭小食', meaning: '街头小食' },
                { cantonese: '熱鬧', meaning: '热闹' }
              ]
            },
            {
              text: '最後坐天星小輪過海。維港嘅夜景係全世界最靚嘅之一！香港真係好好玩！',
              translation: '最后坐天星小轮过海。维港的夜景是全世界最漂亮的之一！香港真的很好玩！',
              words: [
                { cantonese: '天星小輪', meaning: '天星小轮' },
                { cantonese: '過海', meaning: '过海' },
                { cantonese: '夜景', meaning: '夜景' },
                { cantonese: '全世界', meaning: '全世界' }
              ]
            }
          ]
        }
      },
      {
        id: 's3-u4-l2',
        type: 'vocab',
        title: '地标词汇',
        subtitle: '学习香港地标的粤语',
        content: {
          words: [
            { cantonese: '維港', jyutping: 'wai4 gong2', meaning: '维多利亚港', note: '简称' },
            { cantonese: '山頂', jyutping: 'saan1 ding2', meaning: '山顶/太平山顶', note: '第一声+第二声' },
            { cantonese: '大嶼山', jyutping: 'daai6 jyu4 saan1', meaning: '大屿山', note: '有迪士尼和大佛' },
            { cantonese: '旺角', jyutping: 'wong6 gok3', meaning: '旺角', note: '购物天堂' },
            { cantonese: '中環', jyutping: 'zung1 waan4', meaning: '中环', note: '商业金融中心' },
            { cantonese: '銅鑼灣', jyutping: 'tung4 lo4 waan1', meaning: '铜锣湾', note: '购物区' },
            { cantonese: '大館', jyutping: 'daai6 gun2', meaning: '大馆（古迹）', note: '第六声+第二声' },
            { cantonese: '西九', jyutping: 'sai1 gau2', meaning: '西九文化区', note: '文化艺术区' }
          ]
        }
      },
      {
        id: 's3-u4-l3',
        type: 'game',
        title: '听音选地标',
        subtitle: '听发音，选出正确的地标',
        content: {
          gameType: 'sound-picture',
          questions: [
            { speakText: '山頂', answer: '山顶', options: [{ emoji: '⛰️', text: '山顶' }, { emoji: '🏖️', text: '海滩' }, { emoji: '🏙️', text: '市中心' }, { emoji: '🌉', text: '大桥' }] },
            { speakText: '維港', answer: '维多利亚港', options: [{ emoji: '🏔️', text: '山' }, { emoji: '🌊', text: '维多利亚港' }, { emoji: '🏛️', text: '博物馆' }, { emoji: '🎢', text: '游乐园' }] },
            { speakText: '廟街', answer: '庙街', options: [{ emoji: '🛍️', text: '商场' }, { emoji: '🏮', text: '庙街' }, { emoji: '⛪', text: '教堂' }, { emoji: '🏫', text: '学校' }] },
            { speakText: '星光大道', answer: '星光大道', options: [{ emoji: '⭐', text: '星光大道' }, { emoji: '🎭', text: '剧院' }, { emoji: '🏟️', text: '体育馆' }, { emoji: '🌳', text: '公园' }] },
            { speakText: '旺角', answer: '旺角', options: [{ emoji: '🛒', text: '旺角' }, { emoji: '🏖️', text: '海滩' }, { emoji: '🏔️', text: '山' }, { emoji: '🌲', text: '森林' }] }
          ]
        }
      }
    ]
  },

  /* ===== 单元 3.5：进阶级总复习 ===== */
  {
    id: 's3-u5',
    name: '进阶级总复习',
    icon: '📊',
    lessons: [
      {
        id: 's3-u5-l1',
        type: 'review',
        title: '进阶级综合复习',
        subtitle: '回顾进阶级学过的所有内容',
        content: { reviewType: 'stage', stageId: 'stage-3' }
      }
    ]
  }
];
