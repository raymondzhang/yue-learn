/* =========================================================
   Stage 4 — 流利级 · 自主表达·长篇故事
   5 个单元，~12 课时
   ========================================================= */
const STAGE_4_UNITS = [
  /* ===== 单元 4.1：长篇故事 ===== */
  {
    id: 's4-u1',
    name: '长篇故事',
    icon: '📚',
    lessons: [
      {
        id: 's4-u1-l1',
        type: 'story',
        title: '西游记：大闹天宫',
        subtitle: '用粤语听中国经典故事',
        content: {
          pages: [
            {
              text: '好耐好耐之前，有一塊仙石爆開，入面跳出一隻石猴。佢就係孫悟空！',
              translation: '很久很久以前，有一块仙石爆开，里面跳出一只石猴。他就是孙悟空！',
              words: [
                { cantonese: '仙石', meaning: '仙石/神仙的石头' },
                { cantonese: '爆開', meaning: '爆开/裂开' },
                { cantonese: '入面', meaning: '里面' },
                { cantonese: '跳出', meaning: '跳出' }
              ]
            },
            {
              text: '悟空好叻，跟住去學咗七十二變同埋筋斗雲。佢可以變咗做咩都得！',
              translation: '悟空很厉害，然后去学了七十二变和筋斗云。他可以变成什么都行！',
              words: [
                { cantonese: '好叻', meaning: '很厉害/很棒' },
                { cantonese: '七十二變', meaning: '七十二变' },
                { cantonese: '筋斗雲', meaning: '筋斗云' },
                { cantonese: '變', meaning: '变/变化' }
              ]
            },
            {
              text: '悟空去到龍宮，攞咗一支如意金箍棒。呢支棒可以變大變細，好犀利！',
              translation: '悟空去到龙宫，拿了一支如意金箍棒。这支棒可以变大变小，很厉害！',
              words: [
                { cantonese: '龍宮', meaning: '龙宫' },
                { cantonese: '攞', meaning: '拿/取' },
                { cantonese: '如意金箍棒', meaning: '如意金箍棒' },
                { cantonese: '犀利', meaning: '厉害/犀利' }
              ]
            },
            {
              text: '玉皇大帝好嬲，派咗十萬天兵天將嚟捉悟空。但係悟空好勁，打贏咗所有天兵！',
              translation: '玉皇大帝很生气，派了十万天兵天将来捉悟空。但是悟空很强，打赢了所有天兵！',
              words: [
                { cantonese: '玉皇大帝', meaning: '玉皇大帝' },
                { cantonese: '嬲', meaning: '生气' },
                { cantonese: '天兵天將', meaning: '天兵天将' },
                { cantonese: '勁', meaning: '强/厉害' }
              ]
            },
            {
              text: '最後，如來佛祖用計困住咗悟空。但係悟空嘅故事先啱啱開始……',
              translation: '最后，如来佛祖用计困住了悟空。但是悟空的故事才刚刚开始……',
              words: [
                { cantonese: '如來佛祖', meaning: '如来佛祖' },
                { cantonese: '困住', meaning: '困住' },
                { cantonese: '先', meaning: '才/刚刚' },
                { cantonese: '啱啱', meaning: '刚刚' }
              ]
            }
          ]
        }
      },
      {
        id: 's4-u1-l2',
        type: 'story',
        title: '西游记：三打白骨精',
        subtitle: '孙悟空保护师父取经',
        content: {
          pages: [
            {
              text: '悟空同師父唐三藏、師弟八戒同沙僧一齊去西天取經。',
              translation: '悟空和师父唐三藏、师弟八戒和沙僧一起去西天取经。',
              words: [
                { cantonese: '師父', meaning: '师父' },
                { cantonese: '師弟', meaning: '师弟' },
                { cantonese: '取經', meaning: '取经' }
              ]
            },
            {
              text: '行到半路，有一個白骨精扮嘅女仔嚟送嘢食。悟空用火眼金睛一睇就知係妖怪！',
              translation: '走到半路，有一个白骨精变的女孩来送吃的。悟空用火眼金睛一看就知道是妖怪！',
              words: [
                { cantonese: '半路', meaning: '半路' },
                { cantonese: '扮', meaning: '假装/装扮' },
                { cantonese: '火眼金睛', meaning: '火眼金睛' },
                { cantonese: '妖怪', meaning: '妖怪' }
              ]
            },
            {
              text: '悟空打咗白骨精三次！第一次打走佢，第二次又嚟，第三次先至打敗佢。',
              translation: '悟空打了白骨精三次！第一次打走她，第二次又来，第三次才打败她。',
              words: [
                { cantonese: '三次', meaning: '三次' },
                { cantonese: '先至', meaning: '才/终于' },
                { cantonese: '打敗', meaning: '打败' }
              ]
            },
            {
              text: '但係唐僧唔知係妖怪，以為悟空亂打人，趕走咗悟空。悟空好傷心。',
              translation: '但是唐僧不知道是妖怪，以为悟空乱打人，赶走了悟空。悟空很伤心。',
              words: [
                { cantonese: '以為', meaning: '以为' },
                { cantonese: '亂', meaning: '乱/随便' },
                { cantonese: '趕走', meaning: '赶走' },
                { cantonese: '傷心', meaning: '伤心' }
              ]
            },
            {
              text: '後來唐僧知道錯咗，請悟空返嚟。師徒和好如初，繼續上路取經。',
              translation: '后来唐僧知道错了，请悟空回来。师徒和好如初，继续上路取经。',
              words: [
                { cantonese: '後來', meaning: '后来' },
                { cantonese: '錯', meaning: '错' },
                { cantonese: '和好如初', meaning: '和好如初' },
                { cantonese: '繼續', meaning: '继续' }
              ]
            }
          ]
        }
      },
      {
        id: 's4-u1-l3',
        type: 'quiz',
        title: '故事理解测验',
        subtitle: '测试你对故事的理解',
        content: {
          questions: [
            { prompt: '粤语"很厉害"怎么说？', promptType: 'audio', speakText: '好叻', options: ['很厉害', '很好看', '很聪明', '很高兴'], answer: '很厉害' },
            { prompt: '粤语"生气"怎么说？', promptType: 'audio', speakText: '嬲', options: ['高兴', '生气', '伤心', '害怕'], answer: '生气' },
            { prompt: '粤语"刚刚"怎么说？', promptType: 'audio', speakText: '啱啱', options: ['刚刚', '刚才', '已经', '马上'], answer: '刚刚' },
            { prompt: '粤语"终于"怎么说？', promptType: 'audio', speakText: '先至', options: ['终于', '先至/才', '开始', '马上'], answer: '先至' },
            { prompt: '粤语"以为"怎么说？', promptType: 'audio', speakText: '以為', options: ['以为', '知道', '觉得', '相信'], answer: '以为' },
            { prompt: '粤语"伤心"怎么说？', promptType: 'audio', speakText: '傷心', options: ['开心', '伤心', '生气', '害怕'], answer: '伤心' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 4.2：粤语儿歌 ===== */
  {
    id: 's4-u2',
    name: '粤语儿歌',
    icon: '🎵',
    lessons: [
      {
        id: 's4-u2-l1',
        type: 'story',
        title: '何家公鸡何家猜',
        subtitle: '学唱经典粤语儿歌',
        content: {
          pages: [
            {
              text: '何家公雞何家猜，何家小雞何家猜。',
              translation: '何家公鸡何家猜，何家小鸡何家猜。（经典粤语儿歌）',
              words: [
                { cantonese: '公雞', meaning: '公鸡' },
                { cantonese: '小雞', meaning: '小鸡' },
                { cantonese: '猜', meaning: '猜' }
              ]
            },
            {
              text: '排排坐，食果果。豬拉柴，狗透火。',
              translation: '排排坐，吃水果。猪拉柴，狗生火。（经典粤语儿歌）',
              words: [
                { cantonese: '排排坐', meaning: '排排坐（一起坐）' },
                { cantonese: '食果果', meaning: '吃水果' },
                { cantonese: '拉柴', meaning: '拉柴火' },
                { cantonese: '透火', meaning: '生火/吹火' }
              ]
            },
            {
              text: '氹氹轉，菊花園。炒米餅，糯米糍。',
              translation: '转转转，菊花园。炒米饼，糯米糍。（经典粤语儿歌）',
              words: [
                { cantonese: '氹氹轉', meaning: '转转转（围着转）' },
                { cantonese: '菊花園', meaning: '菊花园' },
                { cantonese: '炒米餅', meaning: '炒米饼' },
                { cantonese: '糯米糍', meaning: '糯米糍（糯米团）' }
              ]
            },
            {
              text: '月光光，照地堂。年三十晚，摘檳榔。',
              translation: '月光光，照地堂。年三十晚，摘槟榔。（经典粤语儿歌）',
              words: [
                { cantonese: '月光光', meaning: '月光光（月亮很亮）' },
                { cantonese: '照地堂', meaning: '照在地上' },
                { cantonese: '年三十晚', meaning: '大年三十晚上' }
              ]
            }
          ]
        }
      },
      {
        id: 's4-u2-l2',
        type: 'vocab',
        title: '儿歌词汇',
        subtitle: '学习儿歌中的粤语词汇',
        content: {
          words: [
            { cantonese: '排排坐', jyutping: 'paai4 paai4 co5', meaning: '排排坐/一起坐', note: '儿歌常用词' },
            { cantonese: '食果果', jyutping: 'sik6 gwo2 gwo2', meaning: '吃水果', note: '儿歌叠词' },
            { cantonese: '月光光', jyutping: 'jyut6 gwong1 gwong1', meaning: '月光光', note: '形容月亮很亮' },
            { cantonese: '氹氹轉', jyutping: 'tam4 tam4 zyun3', meaning: '转转转', note: '围着转圈' },
            { cantonese: '糯米糍', jyutping: 'no6 mai5 ci4', meaning: '糯米糍/糯米团子', note: '传统食品' },
            { cantonese: '炒米餅', jyutping: 'caau2 mai5 beng2', meaning: '炒米饼', note: '传统零食' }
          ]
        }
      },
      {
        id: 's4-u2-l3',
        type: 'game',
        title: '儿歌听音选词',
        subtitle: '听儿歌词汇，选出正确的意思',
        content: {
          gameType: 'sound-picture',
          questions: [
            { speakText: '月光光', answer: '月光光', options: [{ emoji: '🌙', text: '月光光' }, { emoji: '☀️', text: '太阳光' }, { emoji: '⭐', text: '星星亮' }, { emoji: '🌈', text: '彩虹' }] },
            { speakText: '排排坐', answer: '排排坐', options: [{ emoji: '🧑‍🤝‍🧑', text: '排排坐' }, { emoji: '🏃', text: '一起跑' }, { emoji: '🍽️', text: '一起吃饭' }, { emoji: '😴', text: '一起睡觉' }] },
            { speakText: '糯米糍', answer: '糯米糍', options: [{ emoji: '🍡', text: '糯米糍' }, { emoji: '🍪', text: '饼干' }, { emoji: '🍰', text: '蛋糕' }, { emoji: '🍬', text: '糖果' }] },
            { speakText: '炒米餅', answer: '炒米饼', options: [{ emoji: '🍘', text: '炒米饼' }, { emoji: '🍚', text: '炒饭' }, { emoji: '🍜', text: '面条' }, { emoji: '🥟', text: '饺子' }] },
            { speakText: '氹氹轉', answer: '转转转', options: [{ emoji: '🔄', text: '转转转' }, { emoji: '⬆️', text: '向上走' }, { emoji: '⬇️', text: '向下走' }, { emoji: '➡️', text: '向前走' }] }
          ]
        }
      }
    ]
  },

  /* ===== 单元 4.3：社区生活 ===== */
  {
    id: 's4-u3',
    name: '社区生活',
    icon: '🏘️',
    lessons: [
      {
        id: 's4-u3-l1',
        type: 'dialogue',
        title: '看医生',
        subtitle: '学习用粤语看医生',
        content: {
          scene: '在诊所，小明不舒服去看医生',
          lines: [
            { speaker: 'A', cantonese: '醫生，我個頭好痛，仲有啲發燒。', jyutping: 'ji1 sang1 ngo5 go3 tau4 hou2 tung3 zung6 jau5 di1 faat3 siu1', meaning: '医生，我的头很痛，还有点发烧。', note: '仲有 = 还有' },
            { speaker: 'B', cantonese: '幾耐啦？有冇咳同流鼻水？', jyutping: 'gei2 noi6 laa3 jau5 mou5 kat1 tung4 lau4 bei6 seoi2', meaning: '多久了？有没有咳嗽和流鼻涕？', note: '幾耐 = 多久' },
            { speaker: 'A', cantonese: '兩日啦。咳得好犀利，夜晚瞓唔到。', jyutping: 'loeng5 jat6 laa3 kat1 dak1 hou2 sai1 lei6 je6 maan5 fan3 m4 dou3', meaning: '两天了。咳得很厉害，晚上睡不着。', note: '瞓唔到 = 睡不着' },
            { speaker: 'B', cantonese: '我開啲藥俾你。食完藥要多飲水、多休息。', jyutping: 'ngo5 hoi1 di1 joek3 bei2 nei5 sik6 jyun4 joek3 jiu3 do1 jam2 seoi2 do1 jau1 sik1', meaning: '我开点药给你。吃完药要多喝水、多休息。', note: '開藥 = 开药' },
            { speaker: 'A', cantonese: '好，多謝醫生！', jyutping: 'hou2 do1 ze6 ji1 sang1', meaning: '好，谢谢医生！' }
          ]
        }
      },
      {
        id: 's4-u3-l2',
        type: 'vocab',
        title: '社区场所',
        subtitle: '学习社区场所的粤语',
        content: {
          words: [
            { cantonese: '醫院', jyutping: 'ji1 jyun2', meaning: '医院', note: '第一声+第二声' },
            { cantonese: '診所', jyutping: 'can2 so2', meaning: '诊所', note: '第二声+第二声' },
            { cantonese: '圖書館', jyutping: 'syu1 bun2 gun2', meaning: '图书馆', note: '第一声+第二声+第二声' },
            { cantonese: '郵局', jyutping: 'jau4 guk6', meaning: '邮局', note: '第四声+第六声' },
            { cantonese: '街市', jyutping: 'gaai1 si5', meaning: '菜市场', note: '粤语叫"街市"不说"菜市场"' },
            { cantonese: '公園', jyutping: 'gung1 jyun4', meaning: '公园', note: '第一声+第四声' },
            { cantonese: '泳池', jyutping: 'wing6 ci4', meaning: '游泳池', note: '第六声+第四声' },
            { cantonese: '社區中心', jyutping: 'se5 keoi1 zung1 sam1', meaning: '社区中心', note: '第五声+第一声+第一声+第一声' }
          ]
        }
      },
      {
        id: 's4-u3-l3',
        type: 'game',
        title: '社区填空',
        subtitle: '选出正确的词语完成句子',
        content: {
          gameType: 'fill-blank',
          questions: [
            { sentence: '我個頭好___。（我的头很痛）', answer: '痛', meaning: '我的头很痛', speakText: '頭好痛' },
            { sentence: '有冇___同流鼻水？', answer: '咳', meaning: '有没有咳嗽和流鼻涕？', speakText: '咳' },
            { sentence: '食完藥要多___水。', answer: '飲', meaning: '吃完药要多喝水', speakText: '多飲水' },
            { sentence: '我哋去___買餸。（我们去菜市场买菜）', answer: '街市', meaning: '我们去菜市场买菜', speakText: '街市' },
            { sentence: '夜晚___唔到。（晚上睡不着）', answer: '瞓', meaning: '晚上睡不着', speakText: '瞓唔到' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 4.4：自由表达 ===== */
  {
    id: 's4-u4',
    name: '自由表达',
    icon: '🎤',
    lessons: [
      {
        id: 's4-u4-l1',
        type: 'vocab',
        title: '表达观点',
        subtitle: '学习用粤语表达自己的看法',
        content: {
          words: [
            { cantonese: '我覺得', jyutping: 'ngo5 gok3 dak1', meaning: '我觉得', note: '表达意见的开头' },
            { cantonese: '我認為', jyutping: 'ngo5 jing6 wai6', meaning: '我认为', note: '较正式的表达' },
            { cantonese: '可能', jyutping: 'ho2 nang4', meaning: '可能/也许', note: '第二声+第四声' },
            { cantonese: '應該', jyutping: 'jing1 goi1', meaning: '应该', note: '第一声+第一声' },
            { cantonese: '希望', jyutping: 'hei1 mong6', meaning: '希望', note: '第一声+第六声' },
            { cantonese: '同意', jyutping: 'tung4 ji3', meaning: '同意', note: '第四声+第三声' },
            { cantonese: '唔同意', jyutping: 'm4 tung4 ji3', meaning: '不同意', note: '加"唔"变否定' },
            { cantonese: '冇所謂', jyutping: 'mou5 so2 wai6', meaning: '无所谓/都可以', note: '粤语常用' }
          ]
        }
      },
      {
        id: 's4-u4-l2',
        type: 'dialogue',
        title: '讨论周末计划',
        subtitle: '学习用粤语讨论和表达意见',
        content: {
          scene: '小明和小美讨论周末去哪里玩',
          lines: [
            { speaker: 'A', cantonese: '我覺得我哋應該去行山。天氣好好！', jyutping: 'ngo5 gok3 dak1 ngo5 dei6 jing1 goi1 heoi3 haang4 saan1 tin1 hei3 hou2 hou2', meaning: '我觉得我们应该去爬山。天气很好！', note: '行山 = 爬山' },
            { speaker: 'B', cantonese: '我唔同意。我好攰，想喺屋企休息。', jyutping: 'ngo5 m4 tung4 ji3 ngo5 hou2 gui6 soeng2 hai2 uk1 kei2 jau1 sik1', meaning: '我不同意。我很累，想在家里休息。', note: '攰 = 累（粤语特色词）' },
            { speaker: 'A', cantonese: '咁我哋去沙灘啦！可以晒太陽同游泳。', jyutping: 'gam3 ngo5 dei6 heoi3 sa1 taan1 laa1 ho2 ji5 saai3 taai3 joeng4 tung4 jau4 wing6', meaning: '那我们去海滩吧！可以晒太阳和游泳。', note: '沙灘 = 海滩' },
            { speaker: 'B', cantonese: '好主意！我同意！我帶啲嘢食去野餐。', jyutping: 'hou2 zyu2 ji3 ngo5 tung4 ji3 ngo5 daai3 di1 je5 sik6 heoi3 je5 caan1', meaning: '好主意！我同意！我带点吃的去野餐。', note: '嘢食 = 吃的东西' },
            { speaker: 'A', cantonese: '希望聽日好天啦！', jyutping: 'hei1 mong6 ting1 jat6 hou2 tin1 laa1', meaning: '希望明天好天气！', note: '好天 = 好天气' }
          ]
        }
      },
      {
        id: 's4-u4-l3',
        type: 'game',
        title: '表达排字成句',
        subtitle: '把词语排成表达观点的句子',
        content: {
          gameType: 'word-order',
          questions: [
            { words: ['我覺得', '呢個', '主意', '好好'], answer: '我覺得呢個主意好好', meaning: '我觉得这个主意很好', hint: '我觉得 + 这个 + 什么 + 怎样' },
            { words: ['我哋', '應該', '去', '行山'], answer: '我哋應該去行山', meaning: '我们应该去爬山', hint: '谁 + 应该 + 去 + 做什么' },
            { words: ['希望', '聽日', '好天'], answer: '希望聽日好天', meaning: '希望明天好天气', hint: '希望 + 时间 + 怎样' },
            { words: ['我', '唔同意', '你', '嘅', '講法'], answer: '我唔同意你嘅講法', meaning: '我不同意你的说法', hint: '谁 + 不同意 + 谁的 + 什么' },
            { words: ['冇所謂', '去', '邊度', '都', '得'], answer: '冇所謂去邊度都得', meaning: '无所谓去哪里都行', hint: '无所谓 + 去 + 哪里 + 都 + 行' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 4.5：流利级总复习 ===== */
  {
    id: 's4-u5',
    name: '流利级总复习',
    icon: '🏆',
    lessons: [
      {
        id: 's4-u5-l1',
        type: 'review',
        title: '流利级综合复习',
        subtitle: '回顾流利级学过的所有内容',
        content: { reviewType: 'stage', stageId: 'stage-4' }
      },
      {
        id: 's4-u5-l2',
        type: 'quiz',
        title: '终极粤语大挑战',
        subtitle: '测试你的粤语综合水平',
        content: {
          questions: [
            { prompt: '粤语"很厉害"怎么说？', promptType: 'audio', speakText: '好叻', options: ['好叻/很厉害', '好好玩', '好開心', '好靚'], answer: '好叻/很厉害' },
            { prompt: '粤语"累"怎么说？', promptType: 'audio', speakText: '攰', options: ['累', '饿', '困', '热'], answer: '累' },
            { prompt: '粤语"爬山"怎么说？', promptType: 'audio', speakText: '行山', options: ['行山/爬山', '走路', '远足', '跑步'], answer: '行山/爬山' },
            { prompt: '粤语"无所谓"怎么说？', promptType: 'audio', speakText: '冇所謂', options: ['无所谓', '没关系', '不知道', '不可以'], answer: '无所谓' },
            { prompt: '粤语"睡不着"怎么说？', promptType: 'audio', speakText: '瞓唔到', options: ['睡不着', '不想睡', '睡太久', '刚睡醒'], answer: '睡不着' },
            { prompt: '粤语"才/刚刚"怎么说？', promptType: 'audio', speakText: '啱啱', options: ['刚刚', '已经', '马上', '正在'], answer: '刚刚' },
            { prompt: '粤语"回家"怎么说？', promptType: 'audio', speakText: '返屋企', options: ['返屋企/回家', '去学校', '去公司', '出去玩'], answer: '返屋企/回家' },
            { prompt: '粤语"好久不见"怎么说？', promptType: 'audio', speakText: '好耐冇見', options: ['好耐冇見/好久不见', '再见', '你好', '晚安'], answer: '好耐冇見/好久不见' }
          ]
        }
      }
    ]
  }
];
