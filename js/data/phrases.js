/* 粤语场景对话数据 - 15个场景 */
const PHRASE_DATA = {
  scenarios: [
    {
      id: 'greeting',
      name: '打招呼',
      icon: '👋',
      phrases: [
        { zh: '你好', cantonese: '你好', jp: 'nei5 hou2', meaning: '你好', note: '和普通话一样，但发音不同' },
        { zh: '早上好', cantonese: '早晨', jp: 'zou2 san4', meaning: '早上好', note: '粤语说"早晨"不说"早上好"' },
        { zh: '再见', cantonese: '拜拜', jp: 'baai1 baai3', meaning: '再见', note: '粤语常用"拜拜"（bye bye）' },
        { zh: '你叫什么名字？', cantonese: '你叫咩名呀？', jp: 'nei5 giu3 me1 meng4 aa3', meaning: '你叫什么名字？', note: '咩 = 什么' },
        { zh: '我叫小明', cantonese: '我叫小明', jp: 'ngo5 giu3 siu2 ming4', meaning: '我叫小明', note: '' },
        { zh: '你好吗？', cantonese: '你好吗？', jp: 'nei5 hou2 maa3', meaning: '你好吗？', note: '粤语加"吗"变疑问' },
        { zh: '我很好', cantonese: '我好好', jp: 'ngo5 hou2 hou2', meaning: '我很好', note: '' },
        { zh: '谢谢你', cantonese: '多謝你', jp: 'do1 ze6 nei5', meaning: '谢谢你', note: '粤语说"多谢"不说"谢谢"' }
      ]
    },
    {
      id: 'classroom',
      name: '课堂用语',
      icon: '🏫',
      phrases: [
        { zh: '老师好', cantonese: '老師好', jp: 'lou5 si1 hou2', meaning: '老师好', note: '上课打招呼' },
        { zh: '请坐下', cantonese: '坐低', jp: 'co5 dai1', meaning: '请坐下', note: '粤语说"坐低"' },
        { zh: '请站起来', cantonese: '企起身', jp: 'kei5 hei2 san1', meaning: '请站起来', note: '粤语"站"说"企"' },
        { zh: '请翻开课本', cantonese: '打開課本', jp: 'daa2 hoi1 fo3 bun2', meaning: '请翻开课本', note: '' },
        { zh: '举手', cantonese: '舉手', jp: 'geoi2 sau2', meaning: '举手', note: '' },
        { zh: '不要说话', cantonese: '唔好出聲', jp: 'm4 hou2 ceot1 seng1', meaning: '不要说话', note: '唔好 = 不要' },
        { zh: '听懂了吗？', cantonese: '聽明白未？', jp: 'teng1 ming4 baak6 mei6', meaning: '听懂了吗？', note: '未 = 了没有' },
        { zh: '我听不懂', cantonese: '我聽唔明', jp: 'ngo5 teng1 m4 ming4', meaning: '我听不懂', note: '唔明 = 不明白' },
        { zh: '请再说一次', cantonese: '請再講一次', jp: 'cing2 zoi3 gong2 jat1 ci3', meaning: '请再说一次', note: '講 = 说' },
        { zh: '请安静', cantonese: '靜啲', jp: 'zing6 di1', meaning: '请安静', note: '啲 = 一些/一点' }
      ]
    },
    {
      id: 'askhelp',
      name: '请求帮助',
      icon: '🆘',
      phrases: [
        { zh: '请问', cantonese: '請問', jp: 'cing2 man6', meaning: '请问', note: '' },
        { zh: '帮帮我', cantonese: '幫幫我', jp: 'bong1 bong1 ngo5', meaning: '帮帮我', note: '' },
        { zh: '可以吗？', cantonese: '得唔得？', jp: 'dak1 m4 dak1', meaning: '可以吗？', note: '得 = 可以/行' },
        { zh: '不可以', cantonese: '唔得', jp: 'm4 dak1', meaning: '不可以', note: '唔得 = 不行' },
        { zh: '等一下', cantonese: '等陣', jp: 'dang2 zan6', meaning: '等一下', note: '等陣 = 等一下' },
        { zh: '我不知道', cantonese: '我唔知', jp: 'ngo5 m4 zi1', meaning: '我不知道', note: '唔知 = 不知道' },
        { zh: '借我一下', cantonese: '借嚟用下', jp: 'ze3 lai4 jung6 haa5', meaning: '借我用一下', note: '' },
        { zh: '对不起', cantonese: '對唔住', jp: 'deoi3 m4 zyu6', meaning: '对不起', note: '粤语说"对唔住"' }
      ]
    },
    {
      id: 'directions',
      name: '问路指路',
      icon: '🗺️',
      phrases: [
        { zh: '在哪里？', cantonese: '喺邊度？', jp: 'hai2 bin1 dou6', meaning: '在哪里？', note: '喺 = 在，邊度 = 哪里' },
        { zh: '在这里', cantonese: '喺呢度', jp: 'hai2 ni1 dou6', meaning: '在这里', note: '呢度 = 这里' },
        { zh: '在那里', cantonese: '喺嗰度', jp: 'hai2 go2 dou6', meaning: '在那里', note: '嗰度 = 那里' },
        { zh: '去学校怎么走？', cantonese: '去學校點行？', jp: 'heoi3 hok6 haau6 dim2 haang4', meaning: '去学校怎么走？', note: '點 = 怎么' },
        { zh: '往左走', cantonese: '轉左', jp: 'zyun2 zo2', meaning: '往左走', note: '' },
        { zh: '往右走', cantonese: '轉右', jp: 'zyun2 jau5', meaning: '往右走', note: '' },
        { zh: '直走', cantonese: '直去', jp: 'zik6 heoi3', meaning: '直走', note: '' },
        { zh: '到了', cantonese: '到咗喇', jp: 'dou3 zo2 laa3', meaning: '到了', note: '咗 = 了（过去时）' }
      ]
    },
    {
      id: 'shopping',
      name: '买东西',
      icon: '🛒',
      phrases: [
        { zh: '多少钱？', cantonese: '幾錢？', jp: 'gei2 cin4', meaning: '多少钱？', note: '幾 = 几/多少' },
        { zh: '我要这个', cantonese: '我要呢個', jp: 'ngo5 jiu3 ni1 go3', meaning: '我要这个', note: '呢個 = 这个' },
        { zh: '有没有？', cantonese: '有冇？', jp: 'jau5 mou5', meaning: '有没有？', note: '冇 = 没有' },
        { zh: '太贵了', cantonese: '太貴啦', jp: 'taai3 gwai3 laa1', meaning: '太贵了', note: '啦 = 语气词' },
        { zh: '便宜一点', cantonese: '平啲啦', jp: 'peng4 di1 laa1', meaning: '便宜一点', note: '平 = 便宜' },
        { zh: '不用了，谢谢', cantonese: '唔使啦，多謝', jp: 'm4 sai2 laa1, do1 ze6', meaning: '不用了，谢谢', note: '唔使 = 不用' },
        { zh: '给你钱', cantonese: '畀錢你', jp: 'bei2 cin4 nei5', meaning: '给你钱', note: '畀 = 给' },
        { zh: '打包', cantonese: '打包', jp: 'daa2 baau1', meaning: '打包/外带', note: '' }
      ]
    },
    {
      id: 'transport',
      name: '坐车出行',
      icon: '🚌',
      phrases: [
        { zh: '坐公交车', cantonese: '搭巴士', jp: 'daap3 baa1 si6', meaning: '坐公交车', note: '搭 = 坐，巴士 = 公交' },
        { zh: '坐地铁', cantonese: '搭地鐵', jp: 'daap3 dei6 tit3', meaning: '坐地铁', note: '' },
        { zh: '下车', cantonese: '落車', jp: 'lok6 ce1', meaning: '下车', note: '落 = 下' },
        { zh: '上车', cantonese: '上車', jp: 'soeng5 ce1', meaning: '上车', note: '' },
        { zh: '去哪里？', cantonese: '去邊度？', jp: 'heoi3 bin1 dou6', meaning: '去哪里？', note: '' },
        { zh: '我要去学校', cantonese: '我要去學校', jp: 'ngo5 jiu3 heoi3 hok6 haau6', meaning: '我要去学校', note: '' },
        { zh: '到了吗？', cantonese: '到未？', jp: 'dou3 mei6', meaning: '到了吗？', note: '' },
        { zh: '还有多远？', cantonese: '仲有幾遠？', jp: 'zung6 jau5 gei2 jyun5', meaning: '还有多远？', note: '仲有 = 还有' }
      ]
    },
    {
      id: 'eating',
      name: '吃饭用餐',
      icon: '🍽️',
      phrases: [
        { zh: '吃饭', cantonese: '食飯', jp: 'sik6 faan6', meaning: '吃饭', note: '粤语说"食"不说"吃"' },
        { zh: '我饿了', cantonese: '我肚餓', jp: 'ngo5 tou5 ngo6', meaning: '我饿了', note: '肚餓 = 肚子饿' },
        { zh: '我想喝水', cantonese: '我想飲水', jp: 'ngo5 soeng2 jam2 seoi2', meaning: '我想喝水', note: '飲 = 喝' },
        { zh: '好吃！', cantonese: '好食！', jp: 'hou2 sik6', meaning: '好吃！', note: '' },
        { zh: '不好吃', cantonese: '唔好食', jp: 'm4 hou2 sik6', meaning: '不好吃', note: '' },
        { zh: '吃饱了', cantonese: '食飽咗', jp: 'sik6 baau2 zo2', meaning: '吃饱了', note: '' },
        { zh: '我要一杯奶茶', cantonese: '我要一杯奶茶', jp: 'ngo5 jiu3 jat1 bui1 naai5 caa4', meaning: '我要一杯奶茶', note: '港式奶茶很有名！' },
        { zh: '买单', cantonese: '埋單', jp: 'maai4 daan1', meaning: '买单/结账', note: '粤语说"埋单"' }
      ]
    },
    {
      id: 'time',
      name: '时间日期',
      icon: '⏰',
      phrases: [
        { zh: '今天', cantonese: '今日', jp: 'gam1 jat6', meaning: '今天', note: '粤语说"今日"' },
        { zh: '明天', cantonese: '聽日', jp: 'ting1 jat6', meaning: '明天', note: '粤语说"听日"' },
        { zh: '昨天', cantonese: '琴日', jp: 'kam4 jat6', meaning: '昨天', note: '粤语说"琴日"' },
        { zh: '现在几点了？', cantonese: '而家幾點？', jp: 'ji4 gaa1 gei2 dim2', meaning: '现在几点了？', note: '而家 = 现在' },
        { zh: '三点半', cantonese: '三點半', jp: 'saam1 dim2 bun3', meaning: '三点半', note: '' },
        { zh: '上学时间', cantonese: '返學時間', jp: 'faan1 hok6 si4 gaan1', meaning: '上学时间', note: '返學 = 上学' },
        { zh: '下课了', cantonese: '放學喇', jp: 'fong3 hok6 laa3', meaning: '下课了', note: '放學 = 下课/放学' },
        { zh: '周末', cantonese: '週末', jp: 'zau1 mut6', meaning: '周末', note: '' }
      ]
    },
    {
      id: 'weather',
      name: '天气季节',
      icon: '☀️',
      phrases: [
        { zh: '今天很热', cantonese: '今日好熱', jp: 'gam1 jat6 hou2 jit6', meaning: '今天很热', note: '' },
        { zh: '今天很冷', cantonese: '今日好凍', jp: 'gam1 jat6 hou2 dung3', meaning: '今天很冷', note: '粤语说"凍"不说"冷"' },
        { zh: '下雨了', cantonese: '落雨喇', jp: 'lok6 jyu5 laa3', meaning: '下雨了', note: '粤语说"落雨"' },
        { zh: '出太阳', cantonese: '出太陽', jp: 'ceot1 taai3 joeng4', meaning: '出太阳', note: '' },
        { zh: '刮风', cantonese: '起風', jp: 'hei2 fung1', meaning: '刮风', note: '粤语说"起风"' },
        { zh: '带把伞吧', cantonese: '帶遮啦', jp: 'daai3 ze1 laa1', meaning: '带把伞吧', note: '遮 = 伞（粤语口语）' },
        { zh: '香港夏天很长', cantonese: '香港夏天好長', jp: 'hoeng1 gong2 haa6 tin1 hou2 coeng4', meaning: '香港夏天很长', note: '' },
        { zh: '春天', cantonese: '春天', jp: 'ceon1 tin1', meaning: '春天', note: '' }
      ]
    },
    {
      id: 'makingfriends',
      name: '交朋友',
      icon: '🤝',
      phrases: [
        { zh: '我们可以做朋友吗？', cantonese: '我哋可以做朋友嗎？', jp: 'ngo5 dei6 ho2 ji5 zou6 pang4 jau5 maa3', meaning: '我们可以做朋友吗？', note: '我哋 = 我们' },
        { zh: '一起玩吧', cantonese: '一齊玩啦', jp: 'jat1 cai4 waan2 laa1', meaning: '一起玩吧', note: '一齊 = 一起' },
        { zh: '你住在哪里？', cantonese: '你住邊度？', jp: 'nei5 zyu6 bin1 dou6', meaning: '你住在哪里？', note: '' },
        { zh: '我从上海来', cantonese: '我從上海嚟', jp: 'ngo5 cung4 soeng6 hoi2 lai4', meaning: '我从上海来', note: '嚟 = 来' },
        { zh: '你喜欢什么？', cantonese: '你鍾意咩？', jp: 'nei5 zung1 ji3 me1', meaning: '你喜欢什么？', note: '鍾意 = 喜欢' },
        { zh: '我喜欢打游戏', cantonese: '我鍾意打機', jp: 'ngo5 zung1 ji3 daa2 gei1', meaning: '我喜欢打游戏', note: '打機 = 打游戏' },
        { zh: '放学一起走吧', cantonese: '放學一齊走啦', jp: 'fong3 hok6 jat1 cai4 zau2 laa1', meaning: '放学一起走吧', note: '' },
        { zh: '你的电话号码是什么？', cantonese: '你電話幾號？', jp: 'nei5 din6 waa2 gei2 hou6', meaning: '你的电话号码是什么？', note: '' }
      ]
    },
    {
      id: 'feelings',
      name: '表达感受',
      icon: '💭',
      phrases: [
        { zh: '我很开心', cantonese: '我好開心', jp: 'ngo5 hou2 hoi1 sam1', meaning: '我很开心', note: '粤语"很"说"好"' },
        { zh: '我很累', cantonese: '我好攰', jp: 'ngo5 hou2 gui6', meaning: '我很累', note: '攰 = 累（粤语口语）' },
        { zh: '我很无聊', cantonese: '我好悶', jp: 'ngo5 hou2 mun6', meaning: '我很无聊', note: '' },
        { zh: '我很害怕', cantonese: '我好驚', jp: 'ngo5 hou2 geng1', meaning: '我很害怕', note: '驚 = 怕/害怕' },
        { zh: '我想家了', cantonese: '我想屋企', jp: 'ngo5 soeng2 uk1 kei2', meaning: '我想家了', note: '屋企 = 家' },
        { zh: '我不高兴', cantonese: '我唔開心', jp: 'ngo5 m4 hoi1 sam1', meaning: '我不高兴', note: '' },
        { zh: '好无聊啊', cantonese: '好悶呀', jp: 'hou2 mun6 aa3', meaning: '好无聊啊', note: '' },
        { zh: '太棒了！', cantonese: '好勁呀！', jp: 'hou2 ging6 aa3', meaning: '太棒了！', note: '勁 = 厉害/棒' }
      ]
    },
    {
      id: 'health',
      name: '看医生',
      icon: '🏥',
      phrases: [
        { zh: '我不舒服', cantonese: '我唔舒服', jp: 'ngo5 m4 syu1 fuk6', meaning: '我不舒服', note: '' },
        { zh: '我头痛', cantonese: '我頭痛', jp: 'ngo5 tau4 tung3', meaning: '我头痛', note: '' },
        { zh: '我肚子痛', cantonese: '我肚痛', jp: 'ngo5 tou5 tung3', meaning: '我肚子痛', note: '' },
        { zh: '我发烧了', cantonese: '我發燒', jp: 'ngo5 faat3 siu1', meaning: '我发烧了', note: '' },
        { zh: '看医生', cantonese: '睇醫生', jp: 'tai2 ji1 sang1', meaning: '看医生', note: '睇 = 看' },
        { zh: '吃药', cantonese: '食藥', jp: 'sik6 joek6', meaning: '吃药', note: '粤语说"食药"' },
        { zh: '多休息', cantonese: '多啲休息', jp: 'do1 di1 jau1 sik1', meaning: '多休息', note: '' },
        { zh: '好了吗？', cantonese: '好返未？', jp: 'hou2 faan1 mei6', meaning: '好了吗？', note: '好返 = 好了' }
      ]
    },
    {
      id: 'home',
      name: '在家日常',
      icon: '🏡',
      phrases: [
        { zh: '我回来了', cantonese: '我返嚟喇', jp: 'ngo5 faan1 lai4 laa3', meaning: '我回来了', note: '返嚟 = 回来' },
        { zh: '我出门了', cantonese: '我出門喇', jp: 'ngo5 ceot1 mun4 laa3', meaning: '我出门了', note: '' },
        { zh: '做作业', cantonese: '做功課', jp: 'zou6 gung1 fo3', meaning: '做作业', note: '功課 = 作业' },
        { zh: '洗澡', cantonese: '沖涼', jp: 'cung1 loeng4', meaning: '洗澡', note: '粤语说"冲凉"' },
        { zh: '刷牙', cantonese: '刷牙', jp: 'caat3 ngaa4', meaning: '刷牙', note: '' },
        { zh: '睡觉', cantonese: '瞓覺', jp: 'fan3 gok3', meaning: '睡觉', note: '瞓 = 睡（粤语口语）' },
        { zh: '起床了', cantonese: '起身喇', jp: 'hei2 san1 laa3', meaning: '起床了', note: '起身 = 起床' },
        { zh: '看电视', cantonese: '睇電視', jp: 'tai2 din6 si6', meaning: '看电视', note: '' }
      ]
    },
    {
      id: 'phone',
      name: '打电话',
      icon: '📱',
      phrases: [
        { zh: '喂', cantonese: '喂', jp: 'wai3', meaning: '喂（电话）', note: '接电话时说' },
        { zh: '你是谁？', cantonese: '你邊位？', jp: 'nei5 bin1 wai2', meaning: '你是谁？', note: '邊位 = 哪位' },
        { zh: '等一下', cantonese: '等陣', jp: 'dang2 zan6', meaning: '等一下', note: '' },
        { zh: '他不在', cantonese: '佢唔喺度', jp: 'keoi5 m4 hai2 dou6', meaning: '他不在', note: '佢 = 他/她' },
        { zh: '挂了', cantonese: '收線喇', jp: 'sau1 sin3 laa3', meaning: '挂了', note: '收線 = 挂断' },
        { zh: '打给你', cantonese: '打畀你', jp: 'daa2 bei2 nei5', meaning: '打给你', note: '打畀 = 打给' },
        { zh: '发信息给你', cantonese: 'send message畀你', jp: 'send message bei2 nei5', meaning: '发信息给你', note: '港式粤语常用英文混用' },
        { zh: '收到', cantonese: '收到', jp: 'sau1 dou3', meaning: '收到', note: '' }
      ]
    },
    {
      id: 'school_life',
      name: '学校活动',
      icon: '⚽',
      phrases: [
        { zh: '上体育课', cantonese: '上體育堂', jp: 'soeng5 tai2 juk6 tong4', meaning: '上体育课', note: '粤语说"堂"不说"课"' },
        { zh: '做早操', cantonese: '做早操', jp: 'zou6 zou2 cou1', meaning: '做早操', note: '' },
        { zh: '排队', cantonese: '排隊', jp: 'paai4 deoi6', meaning: '排队', note: '' },
        { zh: '吃午饭', cantonese: '食午飯', jp: 'sik6 ng5 faan6', meaning: '吃午饭', note: '' },
        { zh: '去图书馆', cantonese: '去圖書館', jp: 'heoi3 tou4 syu1 gun2', meaning: '去图书馆', note: '' },
        { zh: '交作业', cantonese: '交功課', jp: 'gaau1 gung1 fo3', meaning: '交作业', note: '' },
        { zh: '考试', cantonese: '考試', jp: 'haau2 si3', meaning: '考试', note: '' },
        { zh: '放假了！', cantonese: '放假喇！', jp: 'fong3 gaa3 laa3', meaning: '放假了！', note: '' }
      ]
    }
  ]
};

/* 粤语常用语气词 */
const PARTICLES = [
  { char: '啦', jp: 'laa1', usage: '表示请求、催促', example: '快啲啦！= 快点吧！' },
  { char: '喇', jp: 'laa3', usage: '表示变化、完成', example: '落雨喇 = 下雨了' },
  { char: '喎', jp: 'wo3', usage: '表示提醒、告知', example: '好靚喎 = 好漂亮哦' },
  { char: '啫', jp: 'ze1', usage: '表示"而已"、轻描淡写', example: '小意思啫 = 小意思而已' },
  { char: '嘅', jp: 'ge3', usage: '的（粤语的"的"）', example: '我嘅書 = 我的书' },
  { char: '啲', jp: 'di1', usage: '一些、一点', example: '多啲 = 多一些' },
  { char: '咗', jp: 'zo2', usage: '了（过去时标记）', example: '食咗 = 吃了' },
  { char: '緊', jp: 'gan2', usage: '正在（进行时标记）', example: '食緊 = 正在吃' }
];

/* 粤语 vs 普通话用词对比 */
const WORD_COMPARISON = [
  { mandarin: '吃', cantonese: '食', jp: 'sik6' },
  { mandarin: '喝', cantonese: '飲', jp: 'jam2' },
  { mandarin: '看', cantonese: '睇', jp: 'tai2' },
  { mandarin: '说', cantonese: '講', jp: 'gong2' },
  { mandarin: '走', cantonese: '行', jp: 'haang4' },
  { mandarin: '跑', cantonese: '跑', jp: 'paau2' },
  { mandarin: '站', cantonese: '企', jp: 'kei5' },
  { mandarin: '睡觉', cantonese: '瞓覺', jp: 'fan3 gok3' },
  { mandarin: '洗澡', cantonese: '沖涼', jp: 'cung1 loeng4' },
  { mandarin: '很', cantonese: '好', jp: 'hou2' },
  { mandarin: '什么', cantonese: '咩', jp: 'me1' },
  { mandarin: '在哪里', cantonese: '喺邊度', jp: 'hai2 bin1 dou6' },
  { mandarin: '不要', cantonese: '唔好', jp: 'm4 hou2' },
  { mandarin: '不知道', cantonese: '唔知', jp: 'm4 zi1' },
  { mandarin: '可以', cantonese: '得', jp: 'dak1' },
  { mandarin: '不可以', cantonese: '唔得', jp: 'm4 dak1' },
  { mandarin: '没有', cantonese: '冇', jp: 'mou5' },
  { mandarin: '给', cantonese: '畀', jp: 'bei2' },
  { mandarin: '回来', cantonese: '返嚟', jp: 'faan1 lai4' },
  { mandarin: '去', cantonese: '去', jp: 'heoi3' },
  { mandarin: '来', cantonese: '嚟', jp: 'lai4' },
  { mandarin: '上学', cantonese: '返學', jp: 'faan1 hok6' },
  { mandarin: '放学', cantonese: '放學', jp: 'fong3 hok6' },
  { mandarin: '今天', cantonese: '今日', jp: 'gam1 jat6' },
  { mandarin: '明天', cantonese: '聽日', jp: 'ting1 jat6' },
  { mandarin: '昨天', cantonese: '琴日', jp: 'kam4 jat6' },
  { mandarin: '现在', cantonese: '而家', jp: 'ji4 gaa1' },
  { mandarin: '朋友', cantonese: '朋友', jp: 'pang4 jau5' },
  { mandarin: '喜欢', cantonese: '鍾意', jp: 'zung1 ji3' },
  { mandarin: '厉害', cantonese: '勁', jp: 'ging6' }
];
