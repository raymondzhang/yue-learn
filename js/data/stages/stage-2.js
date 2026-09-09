/* =========================================================
   Stage 2 — 基础级 · 日常场景对话
   5 个单元，~15 课时
   ========================================================= */
const STAGE_2_UNITS = [
  /* ===== 单元 2.1：在教室 ===== */
  {
    id: 's2-u1',
    name: '在教室',
    icon: '🏫',
    lessons: [
      {
        id: 's2-u1-l1',
        type: 'vocab',
        title: '课堂用语',
        subtitle: '学习课堂上常用的粤语',
        content: {
          words: [
            { cantonese: '老師', jyutping: 'lou5 si1', meaning: '老师', note: '第五声+第一声' },
            { cantonese: '同學', jyutping: 'tung4 hok6', meaning: '同学', note: '第四声+第六声' },
            { cantonese: '上課', jyutping: 'soeng5 fo3', meaning: '上课', note: '第五声+第三声' },
            { cantonese: '落堂', jyutping: 'lok6 tong4', meaning: '下课', note: '粤语说"落堂"不说"下课"' },
            { cantonese: '舉手', jyutping: 'geoi2 sau2', meaning: '举手', note: '第二声+第二声' },
            { cantonese: '問題', jyutping: 'man6 tai4', meaning: '问题', note: '第六声+第四声' },
            { cantonese: '答案', jyutping: 'daap3 on3', meaning: '答案', note: '第三声+第三声' },
            { cantonese: '考試', jyutping: 'haau2 si3', meaning: '考试', note: '第二声+第三声' }
          ]
        }
      },
      {
        id: 's2-u1-l2',
        type: 'dialogue',
        title: '课堂对话',
        subtitle: '学习课堂上的粤语对话',
        content: {
          scene: '在教室里，上课中',
          lines: [
            { speaker: 'A', cantonese: '老師，我唔明呢條問題。', jyutping: 'lou5 si1 ngo5 m4 ming4 ni1 tiu4 man6 tai4', meaning: '老师，我不明白这道问题。', note: '唔明 = 不明白，呢條 = 这道' },
            { speaker: 'B', cantonese: '唔緊要，我再解釋一次。', jyutping: 'm4 gan2 jiu3 ngo5 zoi3 gaai2 sik1 jat1 ci3', meaning: '不要紧，我再解释一次。', note: '唔緊要 = 不要紧' },
            { speaker: 'A', cantonese: '可唔可以借你支筆？', jyutping: 'ho2 m4 ho2 ji5 ze3 nei5 zi1 bat1', meaning: '可不可以借你的笔？', note: '可唔可以 = 可不可以，支 = 支（量词）' },
            { speaker: 'B', cantonese: '當然可以，俾你。', jyutping: 'dong1 jin4 ho2 ji5 bei2 nei5', meaning: '当然可以，给你。', note: '俾 = 给' },
            { speaker: 'A', cantonese: '多謝！你真好！', jyutping: 'do1 ze6 nei5 zan1 hou2', meaning: '谢谢！你真好！' }
          ]
        }
      },
      {
        id: 's2-u1-l3',
        type: 'game',
        title: '排字成句',
        subtitle: '把词语排成正确的粤语句子',
        content: {
          gameType: 'word-order',
          questions: [
            { words: ['我', '唔明', '呢條', '問題'], answer: '我唔明呢條問題', meaning: '我不明白这道问题', hint: '主语 + 动词 + 宾语' },
            { words: ['可唔可以', '借', '你', '支筆'], answer: '可唔可以借你支筆', meaning: '可不可以借你的笔', hint: '先问可否，再说借什么' },
            { words: ['老師', '叫', '我哋', '翻開', '課本'], answer: '老師叫我哋翻開課本', meaning: '老师叫我们翻开课本', hint: '谁叫谁做什么' },
            { words: ['今日', '有', '考試', '要', '溫書'], answer: '今日有考試要溫書', meaning: '今天有考试要温习', hint: '时间 + 有什么 + 要做什么' },
            { words: ['我', '想', '舉手', '答', '問題'], answer: '我想舉手答問題', meaning: '我想举手回答问题', hint: '主语 + 想 + 动作' }
          ]
        }
      },
      {
        id: 's2-u1-l4',
        type: 'quiz',
        title: '教室测验',
        subtitle: '测试课堂用语',
        content: {
          questions: [
            { prompt: '粤语"下课"怎么说？', promptType: 'audio', speakText: '落堂', options: ['下课', '落堂', '放学', '完课'], answer: '落堂' },
            { prompt: '粤语"不明白"怎么说？', promptType: 'audio', speakText: '唔明', options: ['不明白', '唔明', '不懂', '不知'], answer: '唔明' },
            { prompt: '粤语"给你"怎么说？', promptType: 'audio', speakText: '俾你', options: ['给你', '俾你', '送你', '让你'], answer: '俾你' },
            { prompt: '粤语"不要紧"怎么说？', promptType: 'audio', speakText: '唔緊要', options: ['不要紧', '唔紧要', '没关系', '算了吧'], answer: '唔緊要' },
            { prompt: '粤语"可不可以"怎么说？', promptType: 'audio', speakText: '可唔可以', options: ['可不可以', '可唔可以', '能不能', '行不行'], answer: '可唔可以' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 2.2：在餐厅 ===== */
  {
    id: 's2-u2',
    name: '在餐厅',
    icon: '🍽️',
    lessons: [
      {
        id: 's2-u2-l1',
        type: 'vocab',
        title: '餐厅用语',
        subtitle: '学习在餐厅吃饭的粤语',
        content: {
          words: [
            { cantonese: '叫嘢食', jyutping: 'giu3 je5 sik6', meaning: '点菜/点餐', note: '粤语说"叫嘢食"不说"点菜"' },
            { cantonese: '埋單', jyutping: 'maai4 daan1', meaning: '买单/结账', note: '粤语说"埋单"' },
            { cantonese: '加多', jyutping: 'gaa1 do1', meaning: '多加/再来一份', note: '第一声+第一声' },
            { cantonese: '走甜', jyutping: 'zau2 tim4', meaning: '少糖/不加糖', note: '茶餐厅术语' },
            { cantonese: '凍飲', jyutping: 'dung3 jam2', meaning: '冷饮/冰的', note: '凍 = 冰的' },
            { cantonese: '熱飲', jyutping: 'jit6 jam2', meaning: '热饮', note: '第六声+第二声' },
            { cantonese: '外賣', jyutping: 'ngoi6 maai6', meaning: '外卖/打包', note: '第六声+第六声' },
            { cantonese: '堂食', jyutping: 'tong4 sik6', meaning: '堂食/在这里吃', note: '第四声+第六声' }
          ]
        }
      },
      {
        id: 's2-u2-l2',
        type: 'dialogue',
        title: '在茶餐厅点餐',
        subtitle: '学习在茶餐厅用粤语点餐',
        content: {
          scene: '在茶餐厅，准备点餐',
          lines: [
            { speaker: 'A', cantonese: '唔該，我想叫嘢食。', jyutping: 'm4 goi1 ngo5 soeng2 giu3 je5 sik6', meaning: '麻烦，我想点餐。', note: '唔該 = 麻烦/劳驾（用于引起注意）' },
            { speaker: 'B', cantonese: '你想要咩呀？', jyutping: 'nei5 soeng2 jiu3 me1 aa3', meaning: '你想要什么？', note: '咩 = 什么' },
            { speaker: 'A', cantonese: '我要一個菠萝油同一杯凍奶茶。', jyutping: 'ngo5 jiu3 jat1 go3 bo1 lo4 jau4 tung4 jat1 bui1 dung3 naai5 caa4', meaning: '我要一个菠萝油（港式面包）和一杯冰奶茶。', note: '菠蘿油 = 港式黄油面包' },
            { speaker: 'B', cantonese: '堂食定係外賣呀？', jyutping: 'tong4 sik6 ding6 hai6 ngoi6 maai6 aa3', meaning: '在这里吃还是打包？', note: '定係 = 还是' },
            { speaker: 'A', cantonese: '堂食。唔該埋單。', jyutping: 'tong4 sik6 m4 goi1 maai4 daan1', meaning: '堂食。麻烦结账。' }
          ]
        }
      },
      {
        id: 's2-u2-l3',
        type: 'game',
        title: '餐厅填空',
        subtitle: '选出正确的词语完成对话',
        content: {
          gameType: 'fill-blank',
          questions: [
            { sentence: '唔該，我想___嘢食。', answer: '叫', meaning: '麻烦，我想点餐。', speakText: '我想叫嘢食' },
            { sentence: '我要一杯___奶茶。', answer: '凍', meaning: '我要一杯冰奶茶。', speakText: '凍奶茶' },
            { sentence: '堂食定係___呀？', answer: '外賣', meaning: '堂食还是打包？', speakText: '堂食定係外賣' },
            { sentence: '唔該___。', answer: '埋單', meaning: '麻烦结账。', speakText: '埋單' },
            { sentence: '___多一碗飯。', answer: '加', meaning: '多加一碗饭。', speakText: '加多一碗飯' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 2.3：逛街购物 ===== */
  {
    id: 's2-u3',
    name: '逛街购物',
    icon: '🛍️',
    lessons: [
      {
        id: 's2-u3-l1',
        type: 'vocab',
        title: '购物用语',
        subtitle: '学习逛街买东西的粤语',
        content: {
          words: [
            { cantonese: '幾錢', jyutping: 'gei2 cin4', meaning: '多少钱', note: '第二声+第四声' },
            { cantonese: '平啲', jyutping: 'peng4 di1', meaning: '便宜点', note: '粤语"平"=便宜' },
            { cantonese: '太貴', jyutping: 'taai3 gwai3', meaning: '太贵', note: '第三声+第三声' },
            { cantonese: '試下', jyutping: 'si3 haa5', meaning: '试一下/试试看', note: '第三声+第五声' },
            { cantonese: '碼數', jyutping: 'maa5 sou3', meaning: '尺码', note: '第五声+第三声' },
            { cantonese: '啱', jyutping: 'ngaam1', meaning: '合适/对', note: '第一声，粤语特色词' },
            { cantonese: '抵', jyutping: 'dai2', meaning: '划算/值', note: '第二声，粤语特色词' },
            { cantonese: '找錢', jyutping: 'zaau2 cin4', meaning: '找零', note: '第二声+第四声' }
          ]
        }
      },
      {
        id: 's2-u3-l2',
        type: 'dialogue',
        title: '在商店买东西',
        subtitle: '学习在商店购物的粤语对话',
        content: {
          scene: '在商店里，小明想买一件T恤',
          lines: [
            { speaker: 'A', cantonese: '呢件T恤幾錢呀？', jyutping: 'ni1 gin6 ti seot1 gei2 cin4 aa3', meaning: '这件T恤多少钱？', note: '呢件 = 这件' },
            { speaker: 'B', cantonese: '呢件百五蚊。', jyutping: 'ni1 gin6 baak3 ng5 man1', meaning: '这件一百五十块。', note: '蚊 = 块（钱），百五 = 一百五十' },
            { speaker: 'A', cantonese: '可唔可以試下？', jyutping: 'ho2 m4 ho2 ji5 si3 haa5', meaning: '可不可以试一下？' },
            { speaker: 'B', cantonese: '當然可以，試衣室喺嗰邊。', jyutping: 'dong1 jin4 ho2 ji5 si3 ji1 sat1 hai2 go2 bin1', meaning: '当然可以，试衣室在那边。', note: '喺 = 在，嗰邊 = 那边' },
            { speaker: 'A', cantonese: '好啱！我要呢件。', jyutping: 'hou2 ngaam1 ngo5 jiu3 ni1 gin6', meaning: '很合适！我要这件。', note: '啱 = 合适' }
          ]
        }
      },
      {
        id: 's2-u3-l3',
        type: 'game',
        title: '听音选物',
        subtitle: '听发音，选出正确的物品',
        content: {
          gameType: 'sound-picture',
          questions: [
            { speakText: '平啲', answer: '便宜点', options: [{ emoji: '💰', text: '便宜点' }, { emoji: '📏', text: '大一点' }, { emoji: '🎨', text: '好看点' }, { emoji: '🔄', text: '换一个' }] },
            { speakText: '太貴', answer: '太贵', options: [{ emoji: '💸', text: '太贵' }, { emoji: '👍', text: '很好' }, { emoji: '🆓', text: '免费' }, { emoji: '💰', text: '便宜' }] },
            { speakText: '幾錢', answer: '多少钱', options: [{ emoji: '🔢', text: '多少个' }, { emoji: '💰', text: '多少钱' }, { emoji: '📍', text: '在哪里' }, { emoji: '⏰', text: '什么时候' }] },
            { speakText: '試下', answer: '试一下', options: [{ emoji: '👀', text: '看一下' }, { emoji: '🤔', text: '想一想' }, { emoji: '👕', text: '试一下' }, { emoji: '🛒', text: '买下来' }] },
            { speakText: '啱', answer: '合适', options: [{ emoji: '✅', text: '合适' }, { emoji: '❌', text: '不对' }, { emoji: '🎨', text: '好看' }, { emoji: '💰', text: '便宜' }] },
            { speakText: '抵', answer: '划算', options: [{ emoji: '🏷️', text: '划算' }, { emoji: '💸', text: '很贵' }, { emoji: '🆕', text: '新的' }, { emoji: '👎', text: '很差' }] }
          ]
        }
      },
      {
        id: 's2-u3-l4',
        type: 'quiz',
        title: '购物测验',
        subtitle: '测试你的购物粤语',
        content: {
          questions: [
            { prompt: '粤语"多少钱"怎么说？', promptType: 'audio', speakText: '幾錢', options: ['几钱', '多少钱', '好贵', '什么价'], answer: '几钱' },
            { prompt: '粤语"便宜点"怎么说？', promptType: 'audio', speakText: '平啲', options: ['便宜点', '多一点', '好一点', '少一点'], answer: '便宜点' },
            { prompt: '粤语"合适"怎么说？', promptType: 'audio', speakText: '啱', options: ['合适', '不对', '好看', '便宜'], answer: '合适' },
            { prompt: '粤语"划算"怎么说？', promptType: 'audio', speakText: '抵', options: ['划算', '很贵', '免费', '很差'], answer: '划算' },
            { prompt: '粤语"找零"怎么说？', promptType: 'audio', speakText: '找錢', options: ['找钱', '找零', '还钱', '付钱'], answer: '找钱' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 2.4：交通出行 ===== */
  {
    id: 's2-u4',
    name: '交通出行',
    icon: '🚌',
    lessons: [
      {
        id: 's2-u4-l1',
        type: 'vocab',
        title: '交通工具',
        subtitle: '学习交通方式的粤语',
        content: {
          words: [
            { cantonese: '巴士', jyutping: 'baa1 si2', meaning: '公交车/巴士', note: '第一声+第二声' },
            { cantonese: '地鐵', jyutping: 'dei6 tit3', meaning: '地铁', note: '第六声+第三声' },
            { cantonese: '的士', jyutping: 'dik1 si2', meaning: '出租车', note: '粤语叫"的士"' },
            { cantonese: '小巴', jyutping: 'siu2 baa1', meaning: '小巴/小巴士', note: '第二声+第一声' },
            { cantonese: '渡輪', jyutping: 'dou6 leon4', meaning: '渡轮/船', note: '第六声+第四声' },
            { cantonese: '叮叮', jyutping: 'ding1 ding1', meaning: '电车（叮叮）', note: '香港特色交通工具' },
            { cantonese: '山頂纜車', jyutping: 'saan1 ding2 laam6 ce1', meaning: '山顶缆车', note: '香港著名景点交通' },
            { cantonese: '天星小輪', jyutping: 'tin1 sing1 siu2 leon4', meaning: '天星小轮', note: '维港经典渡轮' }
          ]
        }
      },
      {
        id: 's2-u4-l2',
        type: 'dialogue',
        title: '怎样去？',
        subtitle: '学习问路和指路的粤语',
        content: {
          scene: '在街上，小明问路人怎样去图书馆',
          lines: [
            { speaker: 'A', cantonese: '請問，圖書館點去呀？', jyutping: 'cing2 man6 syu1 bun2 gun2 dim2 heoi3 aa3', meaning: '请问，图书馆怎么走？', note: '點去 = 怎么走/怎样去' },
            { speaker: 'B', cantonese: '你可以搭地鐵去。', jyutping: 'nei5 ho2 ji5 daap3 dei6 tit3 heoi3', meaning: '你可以坐地铁去。', note: '搭 = 坐（交通工具）' },
            { speaker: 'A', cantonese: '喺邊個站落車？', jyutping: 'hai2 bin1 go3 zaam6 lok6 ce1', meaning: '在哪个站下车？', note: '邊個 = 哪个，落車 = 下车' },
            { speaker: 'B', cantonese: '喺中環站出，行五分鐘就到。', jyutping: 'hai2 zung1 waan4 zaam6 ceot1 haang4 ng5 fan1 zung1 zau6 dou3', meaning: '在中环站出，走五分钟就到。', note: '行 = 走' },
            { speaker: 'A', cantonese: '多謝你！', jyutping: 'do1 ze6 nei5', meaning: '谢谢你！' }
          ]
        }
      },
      {
        id: 's2-u4-l3',
        type: 'game',
        title: '交通排字成句',
        subtitle: '把词语排成正确的句子',
        content: {
          gameType: 'word-order',
          questions: [
            { words: ['我', '搭', '地鐵', '返學'], answer: '我搭地鐵返學', meaning: '我坐地铁上学', hint: '主语 + 搭 + 交通工具 + 去的地方' },
            { words: ['圖書館', '點', '去', '呀'], answer: '圖書館點去呀', meaning: '图书馆怎么走', hint: '目的地 + 怎么走 + 语气词' },
            { words: ['喺', '中環站', '落車'], answer: '喺中環站落車', meaning: '在中环站下车', hint: '在 + 地点 + 动作' },
            { words: ['行', '五分鐘', '就', '到'], answer: '行五分鐘就到', meaning: '走五分钟就到', hint: '动作 + 时间 + 就 + 结果' },
            { words: ['呢架', '巴士', '去', '邊度'], answer: '呢架巴士去邊度', meaning: '这辆巴士去哪里', hint: '这+量词+交通工具+去+哪里' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 2.5：交朋友 ===== */
  {
    id: 's2-u5',
    name: '交朋友',
    icon: '🤝',
    lessons: [
      {
        id: 's2-u5-l1',
        type: 'vocab',
        title: '交友用语',
        subtitle: '学习交朋友的粤语',
        content: {
          words: [
            { cantonese: '朋友', jyutping: 'pang4 jau5', meaning: '朋友', note: '第四声+第五声' },
            { cantonese: '鍾意', jyutping: 'zung1 ji3', meaning: '喜欢', note: '第一声+第三声' },
            { cantonese: '興趣', jyutping: 'hing3 ceoi3', meaning: '兴趣/爱好', note: '第三声+第三声' },
            { cantonese: '玩', jyutping: 'waan2', meaning: '玩', note: '第二声' },
            { cantonese: '一齐', jyutping: 'jat1 cai4', meaning: '一起', note: '第一声+第四声' },
            { cantonese: '得閒', jyutping: 'dak1 haan4', meaning: '有空/有时间', note: '粤语特色词' },
            { cantonese: '約', jyutping: 'joek3', meaning: '约/邀请', note: '第三声' },
            { cantonese: '好耐冇見', jyutping: 'hou2 noi6 mou5 gin3', meaning: '好久不见', note: '粤语经典用语' }
          ]
        }
      },
      {
        id: 's2-u5-l2',
        type: 'dialogue',
        title: '约朋友玩',
        subtitle: '学习约朋友出去玩的粤语对话',
        content: {
          scene: '放学后，小明约小美周末一起玩',
          lines: [
            { speaker: 'A', cantonese: '你得閒嗎？我哋星期六一齐玩啦！', jyutping: 'nei5 dak1 haan4 maa3 ngo5 dei6 sing1 kei4 luk6 jat1 cai4 waan2 laa1', meaning: '你有空吗？我们星期六一起玩吧！', note: '得閒 = 有空' },
            { speaker: 'B', cantonese: '好呀！你想去邊度玩？', jyutping: 'hou2 aa3 nei5 soeng2 heoi3 bin1 dou6 waan2', meaning: '好呀！你想去哪里玩？', note: '邊度 = 哪里' },
            { speaker: 'A', cantonese: '我哋去公園踢波啦！', jyutping: 'ngo5 dei6 heoi3 gung1 jyun4 tek1 bo1 laa1', meaning: '我们去公园踢球吧！', note: '踢波 = 踢球（粤语特色）' },
            { speaker: 'B', cantonese: '好！我叫埋其他朋友一齐嚟！', jyutping: 'hou2 ngo5 giu3 maai4 kei4 taa1 pang4 jau5 jat1 cai4 lai4', meaning: '好！我也叫上其他朋友一起来！', note: '叫埋 = 也叫上' },
            { speaker: 'A', cantonese: '好嘢！到时見！', jyutping: 'hou2 je5 dou3 si4 gin3', meaning: '太好了！到时见！', note: '好嘢 = 太好了/好棒' }
          ]
        }
      },
      {
        id: 's2-u5-l3',
        type: 'game',
        title: '交友填空',
        subtitle: '选出正确的词语完成句子',
        content: {
          gameType: 'fill-blank',
          questions: [
            { sentence: '你___嗎？（你有空吗？）', answer: '得閒', meaning: '你有空吗？', speakText: '你得閒嗎' },
            { sentence: '我哋星期六___玩啦！', answer: '一齊', meaning: '我们星期六一起玩吧！', speakText: '一齊玩' },
            { sentence: '你想去___玩？', answer: '邊度', meaning: '你想去哪里玩？', speakText: '邊度' },
            { sentence: '好___！到时見！', answer: '嘢', meaning: '太好了！到时见！', speakText: '好嘢' },
            { sentence: '好耐___見！', answer: '冇', meaning: '好久不见！', speakText: '好耐冇見' }
          ]
        }
      }
    ]
  },

  /* ===== 单元 2.6：基础级总复习 ===== */
  {
    id: 's2-u6',
    name: '基础级总复习',
    icon: '📊',
    lessons: [
      {
        id: 's2-u6-l1',
        type: 'review',
        title: '基础级综合复习',
        subtitle: '回顾基础级学过的所有内容',
        content: { reviewType: 'stage', stageId: 'stage-2' }
      }
    ]
  }
];
