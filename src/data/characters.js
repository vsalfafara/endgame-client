const Characters = [
  {
    name: 'x',
    vision: 'x',
    image: 'zz.png',
    picked: false,
    banned: false,
    flash: false
  },
  {
    name: 'Albedo',
    vision: 'Geo',
    image: 'albedo.png',
    thumbnail: 'albedo_thumb.jpg',
    picked: 'albedo_p.wav',
    banned: 'albedo_b.wav',
    flash: 'Albedo.webp'
  },
  {
    name: 'Aloy',
    vision: 'Cryo',
    image: 'aloy.png',
    thumbnail: 'aloy_thumb.jpg',
    picked: 'aloy_p.wav',
    banned: 'aloy_b.wav',
    flash: 'Aloy.webp'
  },
  {
    name: 'Amber',
    vision: 'Pyro',
    image: 'amber.png',
    thumbnail: 'amber_thumb.jpg',
    picked: 'amber_p.wav',
    banned: 'amber_b.wav',
    flash: 'Amber.webp'
  },
  {
    name: 'Arataki Itto',
    vision: 'Geo',
    image: 'arataki-itto.png',
    thumbnail: 'arataki-itto_thumb.jpg',
    picked: 'itto_p.wav',
    banned: 'itto_b.wav',
    flash: 'Itto.webp'
  },
  {
    name: 'Barbara',
    vision: 'Hydro',
    image: 'barbara.png',
    thumbnail: 'barbara_thumb.jpg',
    picked: 'barbara_p.wav',
    banned: 'barbara_b.wav',
    flash: 'Barbara.webp'
  },
  {
    name: 'Beidou',
    vision: 'Electro',
    image: 'beidou.png',
    thumbnail: 'beidou_thumb.jpg',
    picked: 'beidou_p.wav',
    banned: 'beidou_b.wav',
    flash: 'Beidou.webp'
  },
  {
    name: 'Bennett',
    vision: 'Pyro',
    image: 'bennett.png',
    thumbnail: 'bennett_thumb.jpg',
    picked: 'bennett_p.wav',
    banned: 'bennett_b.wav',
    flash: 'Bennett.webp'
  },
  {
    name: 'Chongyun',
    vision: 'Cryo',
    image: 'chongyun.png',
    thumbnail: 'chongyun_thumb.jpg',
    picked: 'chongyun_p.wav',
    banned: 'chongyun_b.wav',
    flash: 'Chongyun.webp'
  },
  {
    name: 'Diluc',
    vision: 'Pyro',
    image: 'diluc.png',
    thumbnail: 'diluc_thumb.jpg',
    picked: 'diluc_p.wav',
    banned: 'diluc_b.wav',
    flash: 'Diluc.webp'
  },
  {
    name: 'Diona',
    vision: 'Cryo',
    image: 'diona.png',
    thumbnail: 'diona_thumb.jpg',
    picked: 'diona_p.wav',
    banned: 'diona_b.wav',
    flash: 'Diona.webp'
  },
  {
    name: 'Eula',
    vision: 'Cryo',
    image: 'eula.png',
    thumbnail: 'eula_thumb.jpg',
    picked: 'eula_p.wav',
    banned: 'eula_b.wav',
    flash: 'Eula.webp'
  },
  {
    name: 'Fischl',
    vision: 'Electro',
    image: 'fischl.png',
    thumbnail: 'fischl_thumb.jpg',
    picked: 'fischl_p.wav',
    banned: 'fischl_b.wav',
    flash: 'Fischl.webp'
  },
  {
    name: 'Ganyu',
    vision: 'Cryo',
    image: 'ganyu.png',
    thumbnail: 'ganyu_thumb.jpg',
    picked: 'ganyu_p.wav',
    banned: 'ganyu_b.wav',
    flash: 'Ganyu.webp'
  },
  {
    name: 'Gorou',
    vision: 'Geo',
    image: 'gorou.png',
    thumbnail: 'gorou_thumb.jpg',
    picked: 'gorou_p.wav',
    banned: 'gorou_b.wav',
    flash: 'Gorou.webp'
  },
  {
    name: 'Hu Tao',
    vision: 'Pyro',
    image: 'hu-tao.png',
    thumbnail: 'hu-tao_thumb.jpg',
    picked: 'hutao_p.wav',
    banned: 'hutao_b.wav',
    flash: 'Hu tao.webp'
  },
  {
    name: 'Jean',
    vision: 'Anemo',
    image: 'jean.png',
    thumbnail: 'jean_thumb.jpg',
    picked: 'jean_p.wav',
    banned: 'jean_b.wav',
    flash: 'Jean.webp'
  },
  {
    name: 'Kaedahara Kazuha',
    vision: 'Anemo',
    image: 'kaedahara-kazuha.png',
    thumbnail: 'kaedahara-kazuha_thumb.jpg',
    picked: 'kazuha_p.wav',
    banned: 'kazuha_b.wav',
    flash: 'Kazuha.webp'
  },
  {
    name: 'Kaeya',
    vision: 'Cryo',
    image: 'kaeya.png',
    thumbnail: 'kaeya_thumb.jpg',
    picked: 'kaeya_p.wav',
    banned: 'kaeya_b.wav',
    flash: 'Kaeya.webp'
  },
  {
    name: 'Kamisato Ayaka',
    vision: 'Cryo',
    image: 'kamisato-ayaka.png',
    thumbnail: 'kamisato-ayaka_thumb.jpg',
    picked: 'ayaka_p.wav',
    banned: 'ayaka_b.wav',
    flash: 'Ayaka.webp'
  },
  {
    name: 'Keqing',
    vision: 'Electro',
    image: 'keqing.png',
    thumbnail: 'keqing_thumb.jpg',
    picked: 'keqing_p.wav',
    banned: 'keqing_b.wav',
    flash: 'Keqing.webp'
  },
  {
    name: 'Klee',
    vision: 'Pyro',
    image: 'klee.png',
    thumbnail: 'klee_thumb.jpg',
    picked: 'klee_p.wav',
    banned: 'klee_b.wav',
    flash: 'Klee.webp'
  },
  {
    name: 'Kujou Sara',
    vision: 'Electro',
    image: 'kujou-sara.png',
    thumbnail: 'kujou-sara_thumb.jpg',
    picked: 'sara_p.wav',
    banned: 'sara_b.wav',
    flash: 'Sara.webp'
  },
  {
    name: 'Lisa',
    vision: 'Electro',
    image: 'lisa.png',
    thumbnail: 'lisa_thumb.jpg',
    picked: 'lisa_p.wav',
    banned: 'lisa_b.wav',
    flash: 'Lisa.webp'
  },
  {
    name: 'Mona',
    vision: 'Hydro',
    image: 'mona.png',
    thumbnail: 'mona_thumb.jpg',
    picked: 'mona_p.wav',
    banned: 'mona_b.wav',
    flash: 'Mona.webp'
  },
  {
    name: 'Ningguang',
    vision: 'Geo',
    image: 'ningguang.png',
    thumbnail: 'ningguang_thumb.jpg',
    picked: 'ningguang_p.wav',
    banned: 'ningguang_b.wav',
    flash: 'Ningguang.webp'
  },
  {
    name: 'Noelle',
    vision: 'Geo',
    image: 'noelle.png',
    thumbnail: 'noelle_thumb.jpg',
    picked: 'noelle_p.wav',
    banned: 'noelle_b.wav',
    flash: 'Noelle.webp'
  },
  {
    name: 'Qiqi',
    vision: 'Cryo',
    image: 'qiqi.png',
    thumbnail: 'qiqi_thumb.jpg',
    picked: 'qiqi_p.wav',
    banned: 'qiqi_b.wav',
    flash: 'Qiqi.webp'
  },
  {
    name: 'Raiden Shogun',
    vision: 'Electro',
    image: 'raiden-shogun.png',
    thumbnail: 'raiden_thumb.jpg',
    picked: 'raiden_p.wav',
    banned: 'raiden_b.wav',
    flash: 'Raiden.webp'
  },
  {
    name: 'Razor',
    vision: 'Electro',
    image: 'razor.png',
    thumbnail: 'razor_thumb.jpg',
    picked: 'razor_p.wav',
    banned: 'razor_b.wav',
    flash: 'Razor.webp'
  },
  {
    name: 'Rosaria',
    vision: 'Cryo',
    image: 'rosaria.png',
    thumbnail: 'rosaria_thumb.jpg',
    picked: 'rosaria_p.wav',
    banned: 'rosaria_b.wav',
    flash: 'Rosaria.webp'
  },
  {
    name: 'Sangonomiya Kokomi',
    vision: 'Hydro',
    image: 'sangonomiya-kokomi.png',
    thumbnail: 'sangonomiya-kokomi_thumb.jpg',
    picked: 'kokomi_p.wav',
    banned: 'kokomi_b.wav',
    flash: 'Kokomi.webp'
  },
  {
    name: 'Sayu',
    vision: 'Anemo',
    image: 'sayu.png',
    thumbnail: 'sayu_thumb.jpg',
    picked: 'sayu_p.wav',
    banned: 'sayu_b.wav',
    flash: 'Sayu.webp'
  },
  {
    name: 'Shenhe',
    vision: 'Cryo',
    image: 'shenhe.png',
    thumbnail: 'shenhe_thumb.jpg',
    picked: 'shenhe_p.wav',
    banned: 'shenhe_b.wav',
    flash: 'Shenhe.webp'
  },
  {
    name: 'Sucrose',
    vision: 'Anemo',
    image: 'sucrose.png',
    thumbnail: 'sucrose_thumb.jpg',
    picked: 'sucrose_p.wav',
    banned: 'sucrose_b.wav',
    flash: 'Sucrose.webp'
  },
  {
    name: 'Tartaglia',
    vision: 'Hydro',
    image: 'tartaglia.png',
    thumbnail: 'tartaglia_thumb.jpg',
    picked: 'childe_p.wav',
    banned: 'childe_b.wav',
    flash: 'Childe.webp'
  },
  {
    name: 'Thoma',
    vision: 'Pyro',
    image: 'thoma.png',
    thumbnail: 'thoma_thumb.jpg',
    picked: 'thoma_p.wav',
    banned: 'thoma_b.wav',
    flash: 'Thoma.webp'
  },
  // {
  //   name: 'Traveler',
  //   vision: 'Unknown',
  //   image: 'traveler.png'
  // },
  {
    name: 'Venti',
    vision: 'Anemo',
    image: 'venti.png',
    thumbnail: 'venti_thumb.jpg',
    picked: 'venti_p.wav',
    banned: 'venti_b.wav',
    flash: 'Venti.webp'
  },
  {
    name: 'Xiangling',
    vision: 'Pyro',
    image: 'xiangling.png',
    thumbnail: 'xiangling_thumb.jpg',
    picked: 'xiangling_p.wav',
    banned: 'xiangling_b.wav',
    flash: 'Xiangling.webp'
  },
  {
    name: 'Xiao',
    vision: 'Anemo',
    image: 'xiao.png',
    thumbnail: 'xiao_thumb.jpg',
    picked: 'xiao_p.wav',
    banned: 'xiao_b.wav',
    flash: 'Xiao.webp'
  },
  {
    name: 'Xingqiu',
    vision: 'Hydro',
    image: 'xingqiu.png',
    thumbnail: 'xingqiu_thumb.jpg',
    picked: 'xingqiu_p.wav',
    banned: 'xingqiu_b.wav',
    flash: 'Xingqiu.webp'
  },
  {
    name: 'Xinyan',
    vision: 'Pyro',
    image: 'xinyan.png',
    thumbnail: 'xinyan_thumb.jpg',
    picked: 'xinyan_p.wav',
    banned: 'xinyan_b.wav',
    flash: 'Xinyan.webp'
  },
  {
    name: 'Yae Miko',
    vision: 'Electro',
    image: 'yae-miko.png',
    thumbnail: 'yae-miko_thumb.jpg',
    picked: 'yae_p.wav',
    banned: 'yae_b.wav',
    flash: 'Yaemiko.webp'
  },
  {
    name: 'Yanfei',
    vision: 'Pyro',
    image: 'yanfei.png',
    thumbnail: 'yanfei_thumb.jpg',
    picked: 'yanfei_p.wav',
    banned: 'yanfei_b.wav',
    flash: 'Yanfei.webp'
  },
  {
    name: 'Yoimiya',
    vision: 'Pyro',
    image: 'yoimiya.png',
    thumbnail: 'yoimiya_thumb.jpg',
    picked: 'yoimiya_p.wav',
    banned: 'yoimiya_b.wav',
    flash: 'Yoimiya.webp'
  },
  {
    name: 'Yunjin',
    vision: 'Geo',
    image: 'yunjin.png',
    thumbnail: 'yunjin_thumb.jpg',
    picked: 'yunjin_p.wav',
    banned: 'yunjin_b.wav',
    flash: 'Yun jin.webp'
  },
  {
    name: 'Zhongli',
    vision: 'Geo',
    image: 'zhongli.png',
    thumbnail: 'zhongli_thumb.jpg',
    picked: 'zhongli_p.wav',
    banned: 'zhongli_b.wav',
    flash: 'Zhongli.webp'
  }
]

export default Characters
