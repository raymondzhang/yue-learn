// 在浏览器控制台运行此脚本，或访问调试页面
(function() {
  const synth = window.speechSynthesis;

  function dumpVoices() {
    const voices = synth.getVoices();
    console.log('=== 总语音数:', voices.length, '===');

    // 所有中文相关语音
    const zhVoices = voices.filter(v =>
      v.lang && (v.lang.startsWith('zh') || v.lang.includes('CN') || v.lang.includes('TW') || v.lang.includes('HK'))
    );

    console.log('\n=== 中文语音 (' + zhVoices.length + '个) ===');
    zhVoices.forEach((v, i) => {
      console.log(`  [${i}] name: "${v.name}" | lang: "${v.lang}" | local: ${v.localService} | default: ${v.default}`);
    });

    console.log('\n=== 全部语音 ===');
    voices.forEach((v, i) => {
      console.log(`  [${i}] name: "${v.name}" | lang: "${v.lang}" | local: ${v.localService}`);
    });

    // 测试朗读
    console.log('\n=== 朗读测试 ===');
    const testText = '你好早晨食飯';

    // 用每个中文语音试读
    zhVoices.forEach((v, i) => {
      console.log(`  试读 [${i}]: "${v.name}" (${v.lang})`);
    });

    return { all: voices, chinese: zhVoices };
  }

  function testSpeak(voiceIndex) {
    const voices = synth.getVoices();
    const zhVoices = voices.filter(v =>
      v.lang && (v.lang.startsWith('zh') || v.lang.includes('CN') || v.lang.includes('TW') || v.lang.includes('HK'))
    );
    const voice = zhVoices[voiceIndex];
    if (!voice) {
      console.log('无效的语音索引');
      return;
    }
    synth.cancel();
    const u = new SpeechSynthesisUtterance('你好早晨食飯多謝');
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = 0.8;
    console.log('正在朗读:', voice.name, voice.lang);
    synth.speak(u);
  }

  // 暴露到全局
  window.dumpVoices = dumpVoices;
  window.testSpeak = testSpeak;

  // 立即执行
  if (synth.getVoices().length > 0) {
    dumpVoices();
  } else {
    synth.onvoiceschanged = dumpVoices;
    setTimeout(dumpVoices, 3000);
  }
})();
