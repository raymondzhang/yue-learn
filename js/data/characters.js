/* 繁体字学习数据 - 200个常用字，10个分类 */
const CHARACTER_DATA = {
  categories: [
    {
      id: 'school',
      name: '学校生活',
      icon: '📚',
      chars: [
        { s: '学', t: '學', py: 'xué', jp: 'hok6', en: 'learn' },
        { s: '习', t: '習', py: 'xí', jp: 'zaap6', en: 'practice' },
        { s: '书', t: '書', py: 'shū', jp: 'syu1', en: 'book' },
        { s: '笔', t: '筆', py: 'bǐ', jp: 'bat1', en: 'pen' },
        { s: '课', t: '課', py: 'kè', jp: 'fo3', en: 'lesson' },
        { s: '教', t: '教', py: 'jiāo', jp: 'gaau3', en: 'teach' },
        { s: '师', t: '師', py: 'shī', jp: 'si1', en: 'teacher' },
        { s: '问', t: '問', py: 'wèn', jp: 'man6', en: 'ask' },
        { s: '答', t: '答', py: 'dá', jp: 'daap3', en: 'answer' },
        { s: '考', t: '考', py: 'kǎo', jp: 'haau2', en: 'exam' },
        { s: '试', t: '試', py: 'shì', jp: 'si3', en: 'test' },
        { s: '题', t: '題', py: 'tí', jp: 'tai4', en: 'question' },
        { s: '业', t: '業', py: 'yè', jp: 'jip6', en: 'work/homework' },
        { s: '纸', t: '紙', py: 'zhǐ', jp: 'zi2', en: 'paper' },
        { s: '读', t: '讀', py: 'dú', jp: 'duk6', en: 'read' },
        { s: '写', t: '寫', py: 'xiě', jp: 'se2', en: 'write' },
        { s: '画', t: '畫', py: 'huà', jp: 'waa6', en: 'draw' },
        { s: '班', t: '班', py: 'bān', jp: 'baan1', en: 'class' },
        { s: '级', t: '級', py: 'jí', jp: 'kap1', en: 'grade' },
        { s: '操', t: '操', py: 'cāo', jp: 'cou1', en: 'playground' }
      ]
    },
    {
      id: 'daily',
      name: '日常生活',
      icon: '🏠',
      chars: [
        { s: '买', t: '買', py: 'mǎi', jp: 'maai5', en: 'buy' },
        { s: '卖', t: '賣', py: 'mài', jp: 'maai6', en: 'sell' },
        { s: '钱', t: '錢', py: 'qián', jp: 'cin4', en: 'money' },
        { s: '电', t: '電', py: 'diàn', jp: 'din6', en: 'electricity' },
        { s: '话', t: '話', py: 'huà', jp: 'waa6', en: 'speech/words' },
        { s: '车', t: '車', py: 'chē', jp: 'ce1', en: 'car' },
        { s: '门', t: '門', py: 'mén', jp: 'mun4', en: 'door' },
        { s: '开', t: '開', py: 'kāi', jp: 'hoi1', en: 'open' },
        { s: '关', t: '關', py: 'guān', jp: 'gwaan1', en: 'close' },
        { s: '进', t: '進', py: 'jìn', jp: 'zeon3', en: 'enter' },
        { s: '远', t: '遠', py: 'yuǎn', jp: 'jyun5', en: 'far' },
        { s: '近', t: '近', py: 'jìn', jp: 'kan5', en: 'near' },
        { s: '时', t: '時', py: 'shí', jp: 'si4', en: 'time' },
        { s: '间', t: '間', py: 'jiān', jp: 'gaan1', en: 'room/between' },
        { s: '点', t: '點', py: 'diǎn', jp: 'dim2', en: 'dot/o\'clock' },
        { s: '现', t: '現', py: 'xiàn', jp: 'jin6', en: 'now/appear' },
        { s: '认', t: '認', py: 'rèn', jp: 'jing6', en: 'recognize' },
        { s: '识', t: '識', py: 'shí', jp: 'sik1', en: 'know' },
        { s: '见', t: '見', py: 'jiàn', jp: 'gin3', en: 'see' },
        { s: '觉', t: '覺', py: 'jué', jp: 'gok3', en: 'feel' }
      ]
    },
    {
      id: 'family',
      name: '家庭人物',
      icon: '👨‍👩‍👧‍👦',
      chars: [
        { s: '爷', t: '爺', py: 'yé', jp: 'je4', en: 'grandpa' },
        { s: '奶', t: '奶', py: 'nǎi', jp: 'naai5', en: 'grandma/milk' },
        { s: '妈', t: '媽', py: 'mā', jp: 'maa1', en: 'mom' },
        { s: '爸', t: '爸', py: 'bà', jp: 'baa4', en: 'dad' },
        { s: '姐', t: '姐', py: 'jiě', jp: 'ze2', en: 'older sister' },
        { s: '妹', t: '妹', py: 'mèi', jp: 'mui6', en: 'younger sister' },
        { s: '哥', t: '哥', py: 'gē', jp: 'go1', en: 'older brother' },
        { s: '弟', t: '弟', py: 'dì', jp: 'dai6', en: 'younger brother' },
        { s: '亲', t: '親', py: 'qīn', jp: 'can1', en: 'relative/dear' },
        { s: '爱', t: '愛', py: 'ài', jp: 'oi3', en: 'love' },
        { s: '友', t: '友', py: 'yǒu', jp: 'jau5', en: 'friend' },
        { s: '人', t: '人', py: 'rén', jp: 'jan4', en: 'person' },
        { s: '们', t: '們', py: 'men', jp: 'mun4', en: 'plural marker' },
        { s: '你', t: '你', py: 'nǐ', jp: 'nei5', en: 'you' },
        { s: '他', t: '他', py: 'tā', jp: 'taa1', en: 'he' },
        { s: '她', t: '她', py: 'tā', jp: 'taa1', en: 'she' },
        { s: '我', t: '我', py: 'wǒ', jp: 'ngo5', en: 'I/me' },
        { s: '的', t: '的', py: 'de', jp: 'dik1', en: 'possessive' },
        { s: '家', t: '家', py: 'jiā', jp: 'gaa1', en: 'home/family' },
        { s: '姓', t: '姓', py: 'xìng', jp: 'sing3', en: 'surname' }
      ]
    },
    {
      id: 'body',
      name: '身体动作',
      icon: '🏃',
      chars: [
        { s: '头', t: '頭', py: 'tóu', jp: 'tau4', en: 'head' },
        { s: '手', t: '手', py: 'shǒu', jp: 'sau2', en: 'hand' },
        { s: '脚', t: '腳', py: 'jiǎo', jp: 'goek3', en: 'foot' },
        { s: '眼', t: '眼', py: 'yǎn', jp: 'ngaan5', en: 'eye' },
        { s: '耳', t: '耳', py: 'ěr', jp: 'ji5', en: 'ear' },
        { s: '口', t: '口', py: 'kǒu', jp: 'hau2', en: 'mouth' },
        { s: '说', t: '說', py: 'shuō', jp: 'syut3', en: 'speak' },
        { s: '听', t: '聽', py: 'tīng', jp: 'teng1', en: 'listen' },
        { s: '走', t: '走', py: 'zǒu', jp: 'zau2', en: 'walk' },
        { s: '跑', t: '跑', py: 'pǎo', jp: 'paau2', en: 'run' },
        { s: '食', t: '食', py: 'shí', jp: 'sik6', en: 'eat' },
        { s: '饮', t: '飲', py: 'yǐn', jp: 'jam2', en: 'drink' },
        { s: '睇', t: '睇', py: 'dì', jp: 'tai2', en: 'look (Cantonese)' },
        { s: '玩', t: '玩', py: 'wán', jp: 'waan2', en: 'play' },
        { s: '睡', t: '睡', py: 'shuì', jp: 'seoi6', en: 'sleep' },
        { s: '坐', t: '坐', py: 'zuò', jp: 'co5', en: 'sit' },
        { s: '站', t: '站', py: 'zhàn', jp: 'zaam6', en: 'stand' },
        { s: '飞', t: '飛', py: 'fēi', jp: 'fei1', en: 'fly' },
        { s: '拿', t: '拿', py: 'ná', jp: 'naa4', en: 'take/hold' },
        { s: '打', t: '打', py: 'dǎ', jp: 'daa2', en: 'hit/play' }
      ]
    },
    {
      id: 'food',
      name: '食物饮品',
      icon: '🍜',
      chars: [
        { s: '饭', t: '飯', py: 'fàn', jp: 'faan6', en: 'rice/meal' },
        { s: '面', t: '麵', py: 'miàn', jp: 'min6', en: 'noodles' },
        { s: '鱼', t: '魚', py: 'yú', jp: 'jyu4', en: 'fish' },
        { s: '鸡', t: '雞', py: 'jī', jp: 'gai1', en: 'chicken' },
        { s: '蛋', t: '蛋', py: 'dàn', jp: 'daan2', en: 'egg' },
        { s: '果', t: '果', py: 'guǒ', jp: 'gwo2', en: 'fruit' },
        { s: '菜', t: '菜', py: 'cài', jp: 'coi3', en: 'vegetable' },
        { s: '茶', t: '茶', py: 'chá', jp: 'caa4', en: 'tea' },
        { s: '奶', t: '奶', py: 'nǎi', jp: 'naai5', en: 'milk' },
        { s: '水', t: '水', py: 'shuǐ', jp: 'seoi2', en: 'water' },
        { s: '糖', t: '糖', py: 'táng', jp: 'tong4', en: 'sugar/candy' },
        { s: '盐', t: '鹽', py: 'yán', jp: 'jim4', en: 'salt' },
        { s: '米', t: '米', py: 'mǐ', jp: 'mai5', en: 'rice (uncooked)' },
        { s: '汤', t: '湯', py: 'tāng', jp: 'tong1', en: 'soup' },
        { s: '包', t: '包', py: 'bāo', jp: 'baau1', en: 'bun/bread' },
        { s: '饼', t: '餅', py: 'bǐng', jp: 'beng2', en: 'cake/biscuit' },
        { s: '肉', t: '肉', py: 'ròu', jp: 'juk6', en: 'meat' },
        { s: '瓜', t: '瓜', py: 'guā', jp: 'gwaa1', en: 'melon/gourd' },
        { s: '粥', t: '粥', py: 'zhōu', jp: 'zuk1', en: 'congee' },
        { s: '肠', t: '腸', py: 'cháng', jp: 'coeng4', en: 'sausage/intestine' }
      ]
    },
    {
      id: 'animal',
      name: '动物世界',
      icon: '🐾',
      chars: [
        { s: '猫', t: '貓', py: 'māo', jp: 'maau1', en: 'cat' },
        { s: '狗', t: '狗', py: 'gǒu', jp: 'gau2', en: 'dog' },
        { s: '鸟', t: '鳥', py: 'niǎo', jp: 'niu5', en: 'bird' },
        { s: '马', t: '馬', py: 'mǎ', jp: 'maa5', en: 'horse' },
        { s: '牛', t: '牛', py: 'niú', jp: 'ngau4', en: 'cow' },
        { s: '羊', t: '羊', py: 'yáng', jp: 'joeng4', en: 'sheep' },
        { s: '猪', t: '豬', py: 'zhū', jp: 'zyu1', en: 'pig' },
        { s: '龙', t: '龍', py: 'lóng', jp: 'lung4', en: 'dragon' },
        { s: '虫', t: '蟲', py: 'chóng', jp: 'cung4', en: 'insect' },
        { s: '蚊', t: '蚊', py: 'wén', jp: 'man1', en: 'mosquito' },
        { s: '蚁', t: '蟻', py: 'yǐ', jp: 'ngai5', en: 'ant' },
        { s: '蛇', t: '蛇', py: 'shé', jp: 'se4', en: 'snake' },
        { s: '兔', t: '兔', py: 'tù', jp: 'tou3', en: 'rabbit' },
        { s: '虎', t: '虎', py: 'hǔ', jp: 'fu2', en: 'tiger' },
        { s: '狮', t: '獅', py: 'shī', jp: 'si1', en: 'lion' },
        { s: '熊', t: '熊', py: 'xióng', jp: 'hung4', en: 'bear' },
        { s: '象', t: '象', py: 'xiàng', jp: 'zoeng6', en: 'elephant' },
        { s: '猴', t: '猴', py: 'hóu', jp: 'hau4', en: 'monkey' },
        { s: '鸭', t: '鴨', py: 'yā', jp: 'aap3', en: 'duck' },
        { s: '鹅', t: '鵝', py: 'é', jp: 'ngo4', en: 'goose' }
      ]
    },
    {
      id: 'place',
      name: '地点场所',
      icon: '🏙️',
      chars: [
        { s: '学', t: '學', py: 'xué', jp: 'hok6', en: 'school' },
        { s: '园', t: '園', py: 'yuán', jp: 'jyun4', en: 'garden' },
        { s: '场', t: '場', py: 'chǎng', jp: 'coeng4', en: 'field/place' },
        { s: '馆', t: '館', py: 'guǎn', jp: 'gun2', en: 'building/hall' },
        { s: '楼', t: '樓', py: 'lóu', jp: 'lau4', en: 'building/floor' },
        { s: '房', t: '房', py: 'fáng', jp: 'fong4', en: 'room' },
        { s: '厅', t: '廳', py: 'tīng', jp: 'teng1', en: 'hall/living room' },
        { s: '厕', t: '廁', py: 'cè', jp: 'ci3', en: 'toilet' },
        { s: '医', t: '醫', py: 'yī', jp: 'ji1', en: 'doctor/medical' },
        { s: '院', t: '院', py: 'yuàn', jp: 'jyun6', en: 'courtyard/hospital' },
        { s: '铺', t: '鋪', py: 'pù', jp: 'pou1', en: 'shop' },
        { s: '街', t: '街', py: 'jiē', jp: 'gaai1', en: 'street' },
        { s: '路', t: '路', py: 'lù', jp: 'lou6', en: 'road' },
        { s: '站', t: '站', py: 'zhàn', jp: 'zaam6', en: 'station' },
        { s: '港', t: '港', py: 'gǎng', jp: 'gong2', en: 'harbor/HK' },
        { s: '市', t: '市', py: 'shì', jp: 'si5', en: 'city/market' },
        { s: '店', t: '店', py: 'diàn', jp: 'dim3', en: 'shop/store' },
        { s: '公', t: '公', py: 'gōng', jp: 'gung1', en: 'public' },
        { s: '图', t: '圖', py: 'tú', jp: 'tou4', en: 'picture/map' },
        { s: '图书馆', t: '圖書館', py: 'túshūguǎn', jp: 'tou4 syu1 gun2', en: 'library' }
      ]
    },
    {
      id: 'feeling',
      name: '心情感受',
      icon: '😊',
      chars: [
        { s: '开', t: '開心', py: 'kāixīn', jp: 'hoi1 sam1', en: 'happy' },
        { s: '难', t: '難過', py: 'nánguò', jp: 'naan4 gwo3', en: 'sad' },
        { s: '累', t: '累', py: 'lèi', jp: 'leoi6', en: 'tired' },
        { s: '饿', t: '餓', py: 'è', jp: 'ngo6', en: 'hungry' },
        { s: '怕', t: '怕', py: 'pà', jp: 'paa3', en: 'afraid' },
        { s: '忙', t: '忙', py: 'máng', jp: 'mong4', en: 'busy' },
        { s: '急', t: '急', py: 'jí', jp: 'gap1', en: 'urgent' },
        { s: '闷', t: '悶', py: 'mèn', jp: 'mun6', en: 'bored' },
        { s: '痛', t: '痛', py: 'tòng', jp: 'tung3', en: 'pain' },
        { s: '病', t: '病', py: 'bìng', jp: 'beng6', en: 'sick' },
        { s: '聪', t: '聰明', py: 'cōngmíng', jp: 'cung1 ming4', en: 'clever' },
        { s: '高', t: '高興', py: 'gāoxìng', jp: 'gou1 hing3', en: 'glad' },
        { s: '喜', t: '喜歡', py: 'xǐhuān', jp: 'hei2 fun1', en: 'like' },
        { s: '乐', t: '快樂', py: 'kuàilè', jp: 'faai3 lok6', en: 'joy' },
        { s: '好', t: '好', py: 'hǎo', jp: 'hou2', en: 'good' },
        { s: '坏', t: '壞', py: 'huài', jp: 'waai6', en: 'bad' },
        { s: '新', t: '新', py: 'xīn', jp: 'san1', en: 'new' },
        { s: '旧', t: '舊', py: 'jiù', jp: 'gau6', en: 'old (things)' },
        { s: '长', t: '長', py: 'cháng', jp: 'coeng4', en: 'long' },
        { s: '大', t: '大', py: 'dà', jp: 'daai6', en: 'big' }
      ]
    },
    {
      id: 'nature',
      name: '颜色自然',
      icon: '🌈',
      chars: [
        { s: '红', t: '紅', py: 'hóng', jp: 'hung4', en: 'red' },
        { s: '白', t: '白', py: 'bái', jp: 'baak6', en: 'white' },
        { s: '黄', t: '黃', py: 'huáng', jp: 'wong4', en: 'yellow' },
        { s: '蓝', t: '藍', py: 'lán', jp: 'laam4', en: 'blue' },
        { s: '绿', t: '綠', py: 'lǜ', jp: 'luk6', en: 'green' },
        { s: '黑', t: '黑', py: 'hēi', jp: 'hak1', en: 'black' },
        { s: '天', t: '天', py: 'tiān', jp: 'tin1', en: 'sky/day' },
        { s: '地', t: '地', py: 'dì', jp: 'dei6', en: 'ground' },
        { s: '日', t: '日', py: 'rì', jp: 'jat6', en: 'sun/day' },
        { s: '月', t: '月', py: 'yuè', jp: 'jyut6', en: 'moon/month' },
        { s: '星', t: '星', py: 'xīng', jp: 'sing1', en: 'star' },
        { s: '风', t: '風', py: 'fēng', jp: 'fung1', en: 'wind' },
        { s: '雨', t: '雨', py: 'yǔ', jp: 'jyu5', en: 'rain' },
        { s: '云', t: '雲', py: 'yún', jp: 'wan4', en: 'cloud' },
        { s: '花', t: '花', py: 'huā', jp: 'faa1', en: 'flower' },
        { s: '树', t: '樹', py: 'shù', jp: 'syu6', en: 'tree' },
        { s: '叶', t: '葉', py: 'yè', jp: 'jip6', en: 'leaf' },
        { s: '山', t: '山', py: 'shān', jp: 'saan1', en: 'mountain' },
        { s: '海', t: '海', py: 'hǎi', jp: 'hoi2', en: 'sea' },
        { s: '河', t: '河', py: 'hé', jp: 'ho4', en: 'river' }
      ]
    },
    {
      id: 'radical',
      name: '常见变化规律',
      icon: '🔑',
      rules: [
        { s_radical: '讠', t_radical: '言', desc: '言字旁', examples: [
          { s: '语', t: '語', py: 'yǔ', jp: 'jyu5', en: 'language' },
          { s: '话', t: '話', py: 'huà', jp: 'waa6', en: 'speech' },
          { s: '说', t: '說', py: 'shuō', jp: 'syut3', en: 'speak' },
          { s: '认', t: '認', py: 'rèn', jp: 'jing6', en: 'recognize' },
          { s: '识', t: '識', py: 'shí', jp: 'sik1', en: 'know' },
          { s: '读', t: '讀', py: 'dú', jp: 'duk6', en: 'read' },
          { s: '记', t: '記', py: 'jì', jp: 'gei3', en: 'remember' },
          { s: '请', t: '請', py: 'qǐng', jp: 'cing2', en: 'please/invite' }
        ]},
        { s_radical: '门', t_radical: '門', desc: '门字框', examples: [
          { s: '门', t: '門', py: 'mén', jp: 'mun4', en: 'door' },
          { s: '间', t: '間', py: 'jiān', jp: 'gaan1', en: 'between' },
          { s: '问', t: '問', py: 'wèn', jp: 'man6', en: 'ask' },
          { s: '关', t: '關', py: 'guān', jp: 'gwaan1', en: 'close' },
          { s: '开', t: '開', py: 'kāi', jp: 'hoi1', en: 'open' }
        ]},
        { s_radical: '车', t_radical: '車', desc: '车字旁', examples: [
          { s: '车', t: '車', py: 'chē', jp: 'ce1', en: 'car' },
          { s: '轮', t: '輪', py: 'lún', jp: 'leon4', en: 'wheel' },
          { s: '转', t: '轉', py: 'zhuǎn', jp: 'zyun2', en: 'turn' },
          { s: '软', t: '軟', py: 'ruǎn', jp: 'jyun5', en: 'soft' }
        ]},
        { s_radical: '贝', t_radical: '貝', desc: '贝字旁（与钱有关）', examples: [
          { s: '贝', t: '貝', py: 'bèi', jp: 'bui3', en: 'shell' },
          { s: '买', t: '買', py: 'mǎi', jp: 'maai5', en: 'buy' },
          { s: '卖', t: '賣', py: 'mài', jp: 'maai6', en: 'sell' },
          { s: '贵', t: '貴', py: 'guì', jp: 'gwai3', en: 'expensive' },
          { s: '贫', t: '貧', py: 'pín', jp: 'pan4', en: 'poor' }
        ]},
        { s_radical: '钅', t_radical: '金', desc: '金字旁（与金属有关）', examples: [
          { s: '钱', t: '錢', py: 'qián', jp: 'cin4', en: 'money' },
          { s: '银', t: '銀', py: 'yín', jp: 'ngan4', en: 'silver' },
          { s: '钟', t: '鐘', py: 'zhōng', jp: 'zung1', en: 'clock' },
          { s: '铁', t: '鐵', py: 'tiě', jp: 'tit3', en: 'iron' }
        ]},
        { s_radical: '纟', t_radical: '糸', desc: '绞丝旁（与线有关）', examples: [
          { s: '线', t: '線', py: 'xiàn', jp: 'sin3', en: 'line/thread' },
          { s: '红', t: '紅', py: 'hóng', jp: 'hung4', en: 'red' },
          { s: '绿', t: '綠', py: 'lǜ', jp: 'luk6', en: 'green' },
          { s: '经', t: '經', py: 'jīng', jp: 'ging1', en: 'pass through' },
          { s: '给', t: '給', py: 'gěi', jp: 'kap1', en: 'give' }
        ]},
        { s_radical: '鸟', t_radical: '鳥', desc: '鸟字旁', examples: [
          { s: '鸟', t: '鳥', py: 'niǎo', jp: 'niu5', en: 'bird' },
          { s: '鸡', t: '雞', py: 'jī', jp: 'gai1', en: 'chicken' },
          { s: '鸭', t: '鴨', py: 'yā', jp: 'aap3', en: 'duck' },
          { s: '鹅', t: '鵝', py: 'é', jp: 'ngo4', en: 'goose' }
        ]},
        { s_radical: '马', t_radical: '馬', desc: '马字旁', examples: [
          { s: '马', t: '馬', py: 'mǎ', jp: 'maa5', en: 'horse' },
          { s: '骑', t: '騎', py: 'qí', jp: 'ke4', en: 'ride' },
          { s: '驾', t: '駕', py: 'jià', jp: 'gaa3', en: 'drive' }
        ]}
      ]
    }
  ]
};

/* 获取所有字符的扁平数组 */
function getAllChars() {
  const chars = [];
  CHARACTER_DATA.categories.forEach(cat => {
    if (cat.chars) {
      cat.chars.forEach(c => chars.push({ ...c, category: cat.name, categoryId: cat.id }));
    }
    if (cat.rules) {
      cat.rules.forEach(rule => {
        rule.examples.forEach(c => chars.push({ ...c, category: cat.name, categoryId: cat.id }));
      });
    }
  });
  // 去重（按繁体字）
  const seen = new Set();
  return chars.filter(c => {
    if (seen.has(c.t)) return false;
    seen.add(c.t);
    return true;
  });
}
