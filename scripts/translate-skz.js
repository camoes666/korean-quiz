// Spanish translations for Stray Kids STAY trivia quiz (all 60 questions, score tiers, and affiliate)
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'quizzes', 'stray-kids-stay-trivia.json');
const quiz = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const scoreTiersEs = [
  {
    minScore: 0,
    maxScore: 1,
    titleEs: "STAY Novato 🌱",
    badgeEs: "🌱 Novato",
    descriptionEs: "¡Acabas de descubrir a Stray Kids! ¡Es hora de hacer maratón de God's Menu y SKZ CODE!",
    funQuoteEs: "¡Bienvenido a Hellevator! Próxima parada: ¡District 9!"
  },
  {
    minScore: 2,
    maxScore: 3,
    titleEs: "STAY Activo ⭐",
    badgeEs: "⭐ STAY Activo",
    descriptionEs: "¡Gran trabajo! ¡Conoces muy bien la música de 3RACHA y los personajes de SKZOO!",
    funQuoteEs: "¡Cocinando temas ardientes en el estudio con 3RACHA!"
  },
  {
    minScore: 4,
    maxScore: 4,
    titleEs: "STAY Élite 🏆",
    badgeEs: "🏆 STAY Élite",
    descriptionEs: "¡Increíble! ¡Dominio casi perfecto de la historia, récords y bromas internas de Stray Kids!",
    funQuoteEs: "Sobreviviste a Kingdom y te sabes todos los secretos de SKZOO."
  },
  {
    minScore: 5,
    maxScore: 5,
    titleEs: "STAY 5 Estrellas Michelin 👑",
    badgeEs: "👑 STAY 5 Estrellas",
    descriptionEs: "¡100% PERFECTO! ¡Eres un verdadero STAY 5 Estrellas Michelin reconocido por el mismo Stray Kids!",
    funQuoteEs: "Stray Kids everywhere all around the world! ¡Tú haces que Stray Kids se quede!"
  }
];

const affiliateEs = {
  tagEs: "Merch Oficial",
  titleEs: "Álbum Oficial 'ATE' y Lightstick Nachimbong Ver.2 de Stray Kids",
  productNameEs: "Álbumes Oficiales de Stray Kids y Nachimbong 2",
  descriptionEs: "Completa tu colección STAY con los álbumes #1 de Billboard y la mercancía oficial de Stray Kids.",
  buttonTextEs: "Ver Ofertas Oficiales de SKZ →",
  badgeTextEs: "100% Oficial"
};

const qData = {
  1: {
    questionEs: "¿Cuál es la fecha oficial de debut de Stray Kids con su canción principal 'District 9'?",
    options: {
      A: "25 de marzo de 2018",
      B: "6 de octubre de 2017",
      C: "1 de agosto de 2018",
      D: "4 de abril de 2019"
    },
    explanationEs: "Stray Kids debutó oficialmente el 25 de marzo de 2018 con su primer mini álbum 'I am NOT' y el tema principal 'District 9'.",
    funFactEs: "¡El 6 de octubre de 2017 fue la fecha de estreno de su mixtape pre-debut 'Hellevator'!"
  },
  2: {
    questionEs: "¿Cuál es el nombre oficial del fandom de Stray Kids?",
    options: {
      A: "STAY",
      B: "STAR",
      C: "ATINY",
      D: "TREASURE"
    },
    explanationEs: "El nombre oficial del fandom es STAY (estrenado el 1 de agosto de 2018), que significa que Stray Kids hace que los fans permanezcan a su lado.",
    funFactEs: "El lema del fandom es: 'Where Stray Kids STAY, there is a reason' (Donde Stray Kids se queda, hay una razón)."
  },
  3: {
    questionEs: "¿Quién es el líder y miembro de mayor edad de Stray Kids?",
    options: {
      A: "Bang Chan",
      B: "Lee Know",
      C: "Changbin",
      D: "Seungmin"
    },
    explanationEs: "Bang Chan (nacido en octubre de 1997) es el líder, productor principal y miembro mayor del grupo.",
    funFactEs: "Bang Chan entrenó durante 7 años en JYP Entertainment antes de seleccionar personalmente a los miembros del grupo."
  },
  4: {
    questionEs: "¿Quién es el miembro más joven (Maknae) de Stray Kids?",
    options: {
      A: "I.N",
      B: "Felix",
      C: "Seungmin",
      D: "Han"
    },
    explanationEs: "I.N (Yang Jeong-in, nacido en febrero de 2001) es el querido 'Maknae on Top' de Stray Kids.",
    funFactEs: "Los integrantes compusieron una canción especial titulada 'Maknae on Top' para celebrar el estatus mimado de I.N."
  },
  5: {
    questionEs: "¿Qué canción con concepto culinario catapultó a Stray Kids al estrellato mundial en 2020?",
    options: {
      A: "God's Menu (神메뉴)",
      B: "Back Door",
      C: "Thunderous (소리꾼)",
      D: "MANIAC"
    },
    explanationEs: "'God's Menu' (del álbum GO LIVE) definió el género pionero 'Mala Taste' del grupo con su concepto de chefs y percusión electrizante.",
    funFactEs: "Felix se volvió viral internacionalmente por su verso con voz ultra profunda: 'Cookin' like a chef, I'm a 5-star Michelin'."
  },
  6: {
    questionEs: "¿Cómo se llama el trío de producción interna de Stray Kids formado por Bang Chan, Changbin y Han?",
    options: {
      A: "3RACHA (쓰리라차)",
      B: "DanceRacha",
      C: "VocalRacha",
      D: "Trilogy"
    },
    explanationEs: "3RACHA es la aclamada unidad de producción y rap que compone y produce prácticamente toda la discografía de Stray Kids.",
    funFactEs: "Los tres miembros de 3RACHA son miembros regulares de pleno derecho de la Asociación de Derechos de Autor de Música de Corea (KOMCA)."
  },
  7: {
    questionEs: "¿Qué miembro es famoso por su voz de caverna ultra profunda, pecas angelicales y deliciosos brownies?",
    options: {
      A: "Felix",
      B: "Hyunjin",
      C: "Lee Know",
      D: "Changbin"
    },
    explanationEs: "Felix es mundialmente conocido por su impactante voz grave de bajo, sus icónicas pecas y su dulce costumbre de hornear brownies para el personal.",
    funFactEs: "El nombre coreano de Felix es Lee Yong-bok (이용복), un nombre tradicional que los fans y miembros adoran con cariño."
  },
  8: {
    questionEs: "¿Cuál es el motivo de diseño oficial del lightstick de Stray Kids, 'Nachimbong'?",
    options: {
      A: "Una brújula que gira libremente",
      B: "Una garra de tigre",
      C: "Una corona con micrófono",
      D: "Un casco de astronauta"
    },
    explanationEs: "El Nachimbong (나침봉) cuenta con una brújula giratoria que simboliza que los chicos y STAY nunca perderán su rumbo juntos.",
    funFactEs: "El Nachimbong Ver.2 incluye una pantalla OLED personalizable con animaciones digitales de los miembros."
  },
  9: {
    questionEs: "¿Cuántos miembros componen actualmente el grupo Stray Kids?",
    options: {
      A: "8 miembros",
      B: "7 miembros",
      C: "9 miembros",
      D: "10 miembros"
    },
    explanationEs: "Stray Kids está compuesto por 8 miembros: Bang Chan, Lee Know, Changbin, Hyunjin, Han, Felix, Seungmin e I.N.",
    funFactEs: "En julio de 2024, los 8 miembros renovaron anticipadamente sus contratos con JYP Entertainment de forma unánime."
  },
  10: {
    questionEs: "¿Qué programa de supervivencia televisiva ganó Stray Kids en primer lugar en 2021?",
    options: {
      A: "Kingdom: Legendary War",
      B: "Road to Kingdom",
      C: "Queendom",
      D: "Show Me The Money"
    },
    explanationEs: "Stray Kids se coronó campeón absoluto del programa de competición de Mnet 'Kingdom: Legendary War' en 2021 tras actuaciones memorables.",
    funFactEs: "Su legendaria actuación de 'God's DDU-DU DDU-DU' combinó 'God's Menu' con el éxito de BLACKPINK y escenas inspiradas en Deadpool."
  },
  11: {
    questionEs: "¿Qué dos miembros forman la famosa 'Aussie Line' (Línea Australiana) de Stray Kids?",
    options: {
      A: "Bang Chan y Felix",
      B: "Han y Seungmin",
      C: "Lee Know y Hyunjin",
      D: "Changbin e I.N"
    },
    explanationEs: "Bang Chan (crecido en Sídney) y Felix (nacido en Sídney) son los dos miembros australianos célebres por su acento 'Aussie'.",
    funFactEs: "A menudo cambian a la jerga australiana diciendo frases como 'G'day mate' o 'No worries' en sus transmisiones."
  },
  12: {
    questionEs: "¿Qué tema le dio a Stray Kids su primer debut en el #1 del Billboard 200 de EE.UU. en 2022?",
    options: {
      A: "MANIAC (ODDINARY)",
      B: "District 9",
      C: "Miroh",
      D: "Levanter"
    },
    explanationEs: "El mini álbum 'ODDINARY' con el tema principal 'MANIAC' debutó en el #1 del Billboard 200 en marzo de 2022.",
    funFactEs: "Stray Kids fue apenas el tercer artista de K-pop en la historia en encabezar la lista Billboard 200."
  },
  13: {
    questionEs: "¿Cómo se llama la subunidad de baile dentro de Stray Kids formada por Lee Know, Hyunjin y Felix?",
    options: {
      A: "DANCERACHA",
      B: "3RACHA",
      C: "VOCALRACHA",
      D: "Step Out"
    },
    explanationEs: "DANCERACHA (Lee Know, Hyunjin y Felix) es la unidad responsable de la potencia y creatividad en las coreografías del grupo.",
    funFactEs: "Lee Know es el líder de baile y con frecuencia ayuda a supervisar y pulir la sincronización de todo el equipo."
  },
  14: {
    questionEs: "Antes de debutar, ¿de qué legendario grupo de K-pop fue bailarín de respaldo Lee Know?",
    options: {
      A: "BTS",
      B: "EXO",
      C: "BIGBANG",
      D: "SHINee"
    },
    explanationEs: "Lee Know fue bailarín de respaldo de BTS durante temas como 'Fire', 'Blood Sweat & Tears' y 'Not Today', acompañándolos en giras internacionales.",
    funFactEs: "J-Hope de BTS lo reconoció en los pasillos de un programa musical tras su debut y lo felicitó afectuosamente."
  },
  15: {
    questionEs: "¿Cuál es el lema oficial de saludo en equipo de Stray Kids?",
    options: {
      A: "Step Out! We are Stray Kids!",
      B: "To the World! Stray Kids!",
      C: "Show Time! Stray Kids!",
      D: "All in Your Area! Stray Kids!"
    },
    explanationEs: "'Step Out!' simboliza romper con las normas impuestas y abrir nuevos caminos fuera de los marcos convencionales.",
    funFactEs: "Al inicio de cada año, publican un video especial titulado 'STEP OUT' donde revelan sus proyectos anuales a STAY."
  },
  16: {
    questionEs: "¿Qué taquillera película de Marvel incluyó la canción original 'SLASH' de Stray Kids en su banda sonora en 2024?",
    options: {
      A: "Deadpool & Wolverine",
      B: "Spider-Man: Beyond the Spider-Verse",
      C: "Avengers: Secret Wars",
      D: "Captain America"
    },
    explanationEs: "'SLASH' fue creada exclusivamente para la banda sonora oficial de 'Deadpool & Wolverine' (2024).",
    funFactEs: "Ryan Reynolds y Hugh Jackman protagonizaron un cameo especial en el video musical de 'Chk Chk Boom' de Stray Kids."
  },
  17: {
    questionEs: "¿Qué dos miembros integran la subunidad vocal 'VOCALRACHA'?",
    options: {
      A: "Seungmin e I.N",
      B: "Bang Chan y Han",
      C: "Lee Know y Felix",
      D: "Changbin y Hyunjin"
    },
    explanationEs: "VOCALRACHA está compuesta por Seungmin e I.N, reconocidos por sus voces conmovedoras y técnica vocal distintiva.",
    funFactEs: "Ambos han lanzado exitosas baladas en solitario y bandas sonoras (OST) para populares K-Dramas."
  },
  18: {
    questionEs: "En mayo de 2024, ¿a qué icónico evento de alta moda asistió Stray Kids haciendo historia como el primer grupo completo de K-pop?",
    options: {
      A: "La Met Gala",
      B: "Semana de la Moda de París",
      C: "Festival de Cine de Cannes",
      D: "Alfombra Roja de los Grammy"
    },
    explanationEs: "Stray Kids asistió a la prestigiosa Met Gala 2024 en Nueva York vestidos con trajes a medida diseñados por Tommy Hilfiger.",
    funFactEs: "Fueron el primer grupo completo de K-pop masculino en la historia en subir juntos las famosas escaleras del Museo Metropolitano."
  },
  19: {
    questionEs: "¿En qué importante festival de música europeo en París (2023) fue Stray Kids el primer grupo de K-pop en ser cabeza de cartel (headliner)?",
    options: {
      A: "Lollapalooza Paris",
      B: "Glastonbury",
      C: "Coachella",
      D: "Tomorrowland"
    },
    explanationEs: "Stray Kids encabezó Lollapalooza París en julio de 2023 ante una multitud multitudinaria de más de 60,000 personas.",
    funFactEs: "Más adelante en 2024 también encabezaron I-Days en Milán, BST Hyde Park en Londres y Lollapalooza Chicago."
  },
  20: {
    questionEs: "¿Cómo se llama la línea oficial de personajes animados de animales de Stray Kids?",
    options: {
      A: "SKZOO",
      B: "BT21",
      C: "TRUZ",
      D: "ZOOTOPIA"
    },
    explanationEs: "SKZOO es el universo de personajes animales donde cada integrante tiene su avatar animado oficial.",
    funFactEs: "Los muñecos de peluche de SKZOO son de los artículos más codiciados del K-pop y se agotan en minutos en cada lanzamiento."
  },
  21: {
    questionEs: "¿Cuáles son los nombres artísticos de productores de 3RACHA: Bang Chan, Changbin y Han?",
    options: {
      A: "CB97, SPEARB, J.ONE",
      B: "B-Chan, Binnie, Peter",
      C: "Chris, Spear, Hani",
      D: "Alpha, Bravo, Charlie"
    },
    explanationEs: "CB97 (Chan Bang 1997), SPEARB (Changbin = Spear B) y J.ONE (Han Ji-sung = J.ONE) son sus alias de productores desde sus mixtapes underground.",
    funFactEs: "Subieron sus primeros temas a SoundCloud a principios de 2017 antes de que el grupo debutara oficialmente."
  },
  22: {
    questionEs: "¿En qué programa musical y fecha consiguió Stray Kids su emotivo primer premio (1st Win)?",
    options: {
      A: "4 de abril de 2019 en M Countdown con 'MIROH'",
      B: "25 de marzo de 2018 en Music Bank con 'District 9'",
      C: "20 de junio de 2020 en Inkigayo con 'God's Menu'",
      D: "1 de septiembre de 2021 en Show Champion con 'Thunderous'"
    },
    explanationEs: "Stray Kids ganó su primer trofeo musical en Mnet M Countdown el 4 de abril de 2019 con 'MIROH', justo un año después de debutar.",
    funFactEs: "Los integrantes rompieron en llanto en el escenario mientras se abrazaban en un momento inolvidable para STAY."
  },
  23: {
    questionEs: "¿Qué singular criatura híbrida es el personaje oficial de SKZOO de Changbin, 'Dwaekki'?",
    options: {
      A: "Cerdo + Conejo (돼지 + 토끼)",
      B: "Oso + Perro (곰 + 강아지)",
      C: "Gato + Tigre (고양이 + 호랑이)",
      D: "Hámster + Zorro (햄스터 + 여우)"
    },
    explanationEs: "Dwaekki (돼끼) combina 'Dwaeji' (cerdo en coreano) y 'Tokki' (conejo), reflejando su musculoso pero tierno aspecto.",
    funFactEs: "Changbin hizo una escultura de arcilla de Dwaekki en un reality show que inspiró el diseño oficial final."
  },
  24: {
    questionEs: "¿Cuáles son los nombres de los tres queridos gatos rescatados y adoptados por Lee Know?",
    options: {
      A: "Sooni, Doongi, Dori",
      B: "Kkami, Choco, Berry",
      C: "Nabi, Yangi, Kiki",
      D: "Milo, Leo, Simba"
    },
    explanationEs: "Sooni (adoptado de un refugio veterinario), Doongi (de un amigo) y Dori (rescatado de un sitio abandonado) son sus adoradas mascotas.",
    funFactEs: "Lee Know frecuentemente viste ropa con fotos de sus gatos y dona a causas de protección animal."
  },
  25: {
    questionEs: "¿Qué miembro corresponde al personaje de SKZOO 'Jiniret' (un elegante hurón blanco)?",
    options: {
      A: "Hyunjin",
      B: "Lee Know",
      C: "Han",
      D: "Felix"
    },
    explanationEs: "Jiniret representa a Hyunjin, conocido por sus rasgos refinados y elegantes que recuerdan a un hurón.",
    funFactEs: "Hyunjin también tiene un perro de mascota muy querido por el fandom llamado Kkami."
  },
  26: {
    questionEs: "¿En qué animal está basado el personaje oficial de SKZOO de Han, 'HAN QUOKKA'?",
    options: {
      A: "Quokka (쿼카)",
      B: "Hámster (햄스터)",
      C: "Ardilla (다람쥐)",
      D: "Nutria (수달)"
    },
    explanationEs: "HAN QUOKKA está basado en el sonriente marsupial australiano quokka, famoso por sus mejillas adorables idénticas a las de Han.",
    funFactEs: "El quokka es conocido como 'el animal más feliz del mundo', igual que la energía alegre de Han en el escenario."
  },
  27: {
    questionEs: "¿Cómo se llama el personaje de SKZOO de Felix, el tierno pollito con pecas?",
    options: {
      A: "BbokAri",
      B: "PuppyM",
      C: "Wolf Chan",
      D: "Leebit"
    },
    explanationEs: "BbokAri (뽀 Ari) combina su apodo 'Yongbok' y 'Byeongari' (pollito en coreano), con pecas bordadas en las mejillas.",
    funFactEs: "El peluche de BbokAri a menudo agota inventario primero en las tiendas oficiales de JYP Shop."
  },
  28: {
    questionEs: "¿Qué miembro está representado por el personaje de SKZOO en forma de cachorrito 'PuppyM'?",
    options: {
      A: "Seungmin",
      B: "I.N",
      C: "Lee Know",
      D: "Bang Chan"
    },
    explanationEs: "PuppyM representa a Seungmin, apodado el cachorrito del grupo por su carácter leal y su tierna sonrisa canina.",
    funFactEs: "Seungmin suele imitar ladridos de perro en conciertos para saludar a los fans."
  },
  29: {
    questionEs: "¿En qué animal está basado el personaje de SKZOO de I.N, 'FoxI.Ny'?",
    options: {
      A: "Zorro Fénec (Zorro del desierto)",
      B: "Zorro Rojo",
      C: "Leopardo de las nieves",
      D: "Ciervo"
    },
    explanationEs: "FoxI.Ny está inspirado en un zorro del desierto (fénec), reflejando los ojos felinos y encantadores de I.N.",
    funFactEs: "El apodo de I.N entre los miembros es 'Desert Fox' (사막여우)."
  },
  30: {
    questionEs: "¿El lema de qué miembro se volvió un meme viral: '¿Tienes jutdae (principios)?' llevándolo a protagonizar un comercial de Samsung Galaxy?",
    options: {
      A: "Changbin",
      B: "Bang Chan",
      C: "Lee Know",
      D: "Han"
    },
    explanationEs: "Changbin pronunció en un vlog: 'Lo importante es tener tus propios principios (jutdae)', lo que se convirtió en una sensación nacional y un anuncio oficial de Samsung.",
    funFactEs: "La frase 'Jutdae' fue votada como una de las palabras del año de moda en la juventud coreana en 2021."
  },
  31: {
    questionEs: "¿Qué instrumentos tradicionales coreanos se destacan prominentemente en el tema 'Thunderous' (소리꾼)?",
    options: {
      A: "Kkwaenggwari, Buk y Taepyeongso",
      B: "Solo de Gayageum únicamente",
      C: "Solo Geomungo y Haegeum",
      D: "Solo Piri"
    },
    explanationEs: "'Thunderous' fusiona el hip-hop moderno con música folclórica coreana (Pungmul / Gugak), usando el gong kkwaenggwari, tambor buk y el viento taepyeongso.",
    funFactEs: "La palabra 'Sorikkun' (소리꾼) hace referencia a los narradores y cantantes tradicionales de pansori coreano."
  },
  32: {
    questionEs: "¿Qué significa el título 'S-Class' (특) del exitoso álbum '5-STAR'?",
    options: {
      A: "La estrella más singular y brillante entre todas las estrellas",
      B: "Viajes en primera clase de avión",
      C: "Rango de agente secreto",
      D: "Entrenamiento de súper velocidad"
    },
    explanationEs: "El carácter '특' (Teuk) significa especial y único: 'el más excéntrico entre los especiales, y el más brillante entre las estrellas'.",
    funFactEs: "El video musical de 'S-Class' contó con un gigantesco monstruo marino filmado en el emblemático río Han de Seúl."
  },
  33: {
    questionEs: "¿Cuál es el significado secreto detrás de los números en el tema principal 'CASE 143'?",
    options: {
      A: "I (1) Love (4) You (3)",
      B: "143 días hasta el comeback",
      C: "Habitación 143 en su dormitorio",
      D: "143 millones de reproducciones en Spotify"
    },
    explanationEs: "143 es el código numérico clásico donde el número de letras en cada palabra forma: I (1) Love (4) You (3).",
    funFactEs: "Fue la primera canción principal de Stray Kids en tener como tema central directo el sentimiento del amor."
  },
  34: {
    questionEs: "¿Cuál es el ingenioso doble significado detrás del título de su segundo álbum de estudio 'NOEASY'?",
    options: {
      A: "NOISY (ruidoso) + NO EASY (nada fácil)",
      B: "Sin descanso + Relajado",
      C: "Nunca terminado + Siempre fácil",
      D: "Nueva era + Canción fácil"
    },
    explanationEs: "Convierte las críticas sobre hacer 'música ruidosa' (noisy) en un juego de palabras que afirma que su camino 'no es fácil' (no easy).",
    funFactEs: "'NOEASY' se convirtió en el primer álbum de Stray Kids en superar el millón de copias vendidas."
  },
  35: {
    questionEs: "¿Qué mini álbum lanzado en julio de 2024 presenta el tema con ritmos latinos 'Chk Chk Boom'?",
    options: {
      A: "ATE",
      B: "ROCK-STAR",
      C: "5-STAR",
      D: "MAXIDENT"
    },
    explanationEs: "El mini álbum 'ATE' presentó 'Chk Chk Boom', mezclando hip-hop con reguetón latino y versos en español.",
    funFactEs: "En la letra de 'Chk Chk Boom', cantan frases en español como 'vamos, aprieta' y 'la vida loca'."
  },
  36: {
    questionEs: "Antes de convertirse en aprendiz, ¿en qué país vivió el miembro Han durante varios años?",
    options: {
      A: "Malasia",
      B: "Nueva Zelanda",
      C: "Canadá",
      D: "Filipinas"
    },
    explanationEs: "Han vivió y estudió en Malasia durante su infancia antes de regresar a Corea para perseguir su sueño de ser rapero.",
    funFactEs: "Hizo una promesa con sus padres de que si no entraba a una agencia en un año, regresaría a Malasia a estudiar."
  },
  37: {
    questionEs: "Seungmin es reconocido en la comunidad de K-pop como el fanático #1 de qué banda de JYP?",
    options: {
      A: "DAY6",
      B: "2PM",
      C: "CNBLUE",
      D: "FTISLAND"
    },
    explanationEs: "Seungmin es un 'My Day' (fan de DAY6) devoto, asistiendo a sus conciertos, cantando sus temas y compartiendo covers con frecuencia.",
    funFactEs: "Fue presentador especial del programa de radio 'Kiss the Radio' de Young K de DAY6."
  },
  38: {
    questionEs: "¿Qué enérgico himno de rock del álbum 'ROCK-STAR' fue el primer tema de Stray Kids en entrar al Billboard Hot 100?",
    options: {
      A: "LALALALA (락 樂)",
      B: "MEGAVERSE",
      C: "Social Path",
      D: "TOPLINE"
    },
    explanationEs: "'LALALALA' (락) debutó en el Billboard Hot 100 en noviembre de 2023, convirtiéndolos en el segundo grupo masculino de K-pop en la historia en ingresar a la lista.",
    funFactEs: "El título coreano '락' (Rak) juega con el significado de música rock y alegría (樂)."
  },
  39: {
    questionEs: "¿Qué legendario pionero del hip-hop coreano colaboró en el tema 'TOPLINE' del álbum 5-STAR?",
    options: {
      A: "Tiger JK",
      B: "Dynamic Duo",
      C: "Epik High",
      D: "Zico"
    },
    explanationEs: "Tiger JK (leyenda de Drunken Tiger) participó con un verso histórico elogiando a 3RACHA por su autenticidad y energía.",
    funFactEs: "3RACHA ya había colaborado previamente con Tiger JK en Mnet Asian Music Awards (MAMA)."
  },
  40: {
    questionEs: "¿Cómo se llama la serie semanal de variedades en YouTube de Stray Kids amada por su caos espontáneo?",
    options: {
      A: "SKZ CODE",
      B: "Going Stray",
      C: "Run SKZ",
      D: "Real SKZ"
    },
    explanationEs: "'SKZ CODE' (스키즈 코드) es su emblemático programa de entretenimiento propio donde realizan juegos, campamentos y dinámicas cómicas.",
    funFactEs: "Varios episodios han superado decenas de millones de visualizaciones debido a las hilarantes ocurrencias de los chicos."
  },
  41: {
    questionEs: "Durante el show de supervivencia de 2017, ¿qué canción escribieron 3RACHA inspirada en su viaje en metro hacia la sala de ensayos?",
    options: {
      A: "School Life",
      B: "GLOW",
      C: "4419",
      D: "YAYAYA"
    },
    explanationEs: "'4419' lleva el número de la línea de autobús y rutas de metro que Bang Chan y sus compañeros tomaban a diario de regreso a casa tras entrenar de noche.",
    funFactEs: "La letra expresa nostalgia y gratitud por los amigos con los que compartió los duros años de entrenamiento."
  },
  42: {
    questionEs: "¿Cómo se llamaba la querida transmisión en vivo semanal en solitario de Bang Chan donde charló y dio consejos durante más de 200 episodios?",
    options: {
      A: "Chan's Room (찬이의 '방')",
      B: "Chan's Studio",
      C: "Leader's Lounge",
      D: "Midnight with Chris"
    },
    explanationEs: "'Chan's Room' (찬이의 '방') fue un espacio semanal íntimo donde Bang Chan escuchaba música de otros artistas y reconfortaba a STAY.",
    funFactEs: "Finalizaba cada episodio con un emotivo y reconfortante 'Big Hug' virtual para los fans de todo el mundo."
  },
  43: {
    questionEs: "En julio de 2023, ¿para qué casa de lujo italiana fue nombrado Hyunjin el primer Embajador Global de Marca coreano?",
    options: {
      A: "Versace (베르사체)",
      B: "Gucci",
      C: "Prada",
      D: "Fendi"
    },
    explanationEs: "Donatella Versace nombró personalmente a Hyunjin como Embajador Global de Versace elogiando su magnética confianza y estilo visual.",
    funFactEs: "Protagonizó las campañas mundiales de Versace Holiday y fue invitado de honor en el Festival de Cannes."
  },
  44: {
    questionEs: "En marzo de 2024, ¿para qué legendaria casa de lujo francesa debutó Felix como modelo de pasarela en la Semana de la Moda de París?",
    options: {
      A: "Louis Vuitton",
      B: "Dior",
      C: "Saint Laurent",
      D: "Balenciaga"
    },
    explanationEs: "Felix desfiló en la pasarela de otoño-invierno 2024 de Louis Vuitton en París por invitación del director artístico Nicolas Ghesquière.",
    funFactEs: "Caminó de la mano con la actriz de Squid Game Jung Ho-yeon en el cierre del desfile en el Museo del Louvre."
  },
  45: {
    questionEs: "¿A qué temperatura y en qué electrodoméstico bromea Lee Know con meter a los miembros que no se portan bien?",
    options: {
      A: "Freidora de aire a 180 grados (에어프라이어 180도)",
      B: "Microondas por 3 minutos",
      C: "Congelador a -20 grados",
      D: "Tostadora a máxima potencia"
    },
    explanationEs: "La famosa amenaza cómica de Lee Know es: 'Te voy a meter a la freidora de aire a 180 grados' (에어프라이어에 180도로 돌려버린다).",
    funFactEs: "Es uno de los memes más queridos del fandom y los propios miembros suelen reírse cada vez que lo menciona."
  },
  46: {
    questionEs: "Durante el show de supervivencia de 2017, ¿qué dos miembros fueron eliminados inicialmente pero reincorporados para la final?",
    options: {
      A: "Lee Know y Felix",
      B: "Hyunjin y Han",
      C: "Seungmin e I.N",
      D: "Changbin y Bang Chan"
    },
    explanationEs: "Lee Know y Felix fueron eliminados en episodios intermedios, pero J.Y. Park les dio una segunda oportunidad en la emisión final en vivo.",
    funFactEs: "El 96% de la audiencia en vivo votó a favor de que el grupo debutara como alineación completa de 9 integrantes."
  },
  47: {
    questionEs: "¿Qué deporte practicaba Seungmin apasionadamente en su niñez soñando con ser lanzador antes de dedicarse a la música?",
    options: {
      A: "Béisbol (야구)",
      B: "Fútbol (축구)",
      C: "Natación (수영)",
      D: "Baloncesto (농구)"
    },
    explanationEs: "Seungmin fue un talentoso lanzador de béisbol en la escuela primaria e incluso realizó el primer lanzamiento ceremonial en partidos profesionales de la KBO.",
    funFactEs: "Lanzó un strike perfecto en el estadio Gocheok Sky Dome vistiendo el uniforme de los Lotte Giants."
  },
  48: {
    questionEs: "¿Cuál es el título del sensual dueto dramático compuesto e interpretado por Bang Chan y Hyunjin en el álbum NOEASY?",
    options: {
      A: "Red Lights (강박)",
      B: "Drive",
      C: "Taste",
      D: "Surfin'"
    },
    explanationEs: "'Red Lights' (título coreano '강박' / Compulsión) aborda la obsesión artística y el perfeccionismo que no te deja dormir.",
    funFactEs: "El video musical y las coreografías en concierto se convirtieron en una de las presentaciones más icónicas y comentadas de Stray Kids."
  },
  49: {
    questionEs: "Antes de que 3RACHA compusiera 'God's Menu', ¿qué otra canción estaba prevista originalmente para ser el tema principal de GO LIVE?",
    options: {
      A: "Easy",
      B: "Pacemaker",
      C: "TA",
      D: "Phobia"
    },
    explanationEs: "'Easy' estaba programada como la canción principal original, pero cuando 3RACHA compuso 'God's Menu', convencieron a la directiva de cambiarla.",
    funFactEs: "Cambiar el tema principal a última hora retrasó el comeback, pero resultó ser la mejor decisión en la historia del grupo."
  },
  50: {
    questionEs: "¿Cuál es el concepto y título del apoteósico tema con el que Stray Kids cerró y ganó 'Kingdom: Legendary War'?",
    options: {
      A: "WOLFGANG",
      B: "Victory Song",
      C: "Double Knot",
      D: "Boxer"
    },
    explanationEs: "'WOLFGANG' recrea una manada de lobos salvajes inspirada en Wolfgang Amadeus Mozart, mostrando su ferocidad y liderazgo musical.",
    funFactEs: "La canción alcanzó altos puestos en las listas globales de iTunes inmediatamente después de la transmisión en vivo."
  },
  51: {
    questionEs: "Antes de entrenar en JYP, ¿qué género vocal tradicional coreano cantaba apasionadamente I.N de niño en Busan?",
    options: {
      A: "Trot (트로트)",
      B: "Pansori",
      C: "Ópera",
      D: "Jazz"
    },
    explanationEs: "I.N era conocido en Busan como el 'niño prodigio del trot', cantando temas folclóricos y clásicos ante los ancianos con gran carisma.",
    funFactEs: "Participó en el programa 'Favorite Entertainment' de MBC demostrando sus impecables habilidades para el trot."
  },
  52: {
    questionEs: "¿La enérgica coreografía del himno de 2019 'MIROH' estuvo inspirada en qué famosa danza guerrera cultural?",
    options: {
      A: "El Haka maorí (하카)",
      B: "Flamenco",
      C: "Capoeira",
      D: "Samba"
    },
    explanationEs: "La coreografía de 'MIROH' incorpora los movimientos de pisadas firmes, golpes de pecho y cantos tribales del Haka tradicional de Nueva Zelanda.",
    funFactEs: "'MIROH' significa laberinto (미로) en coreano, representando su valentía para conquistar la jungla del mundo moderno."
  },
  53: {
    questionEs: "¿A qué escuela secundaria de artes asistió Bang Chan en Sídney antes de mudarse a Corea para entrenar en JYP?",
    options: {
      A: "Newtown High School of the Performing Arts",
      B: "Sydney Grammar School",
      C: "Melbourne High School",
      D: "Brisbane State High"
    },
    explanationEs: "Bang Chan asistió a la prestigiosa Newtown High School of the Performing Arts en Sídney, famosa por formar a talentos artísticos australianos.",
    funFactEs: "Pasó las audiciones globales de JYP en Australia en 2010 entre más de 800 aspirantes."
  },
  54: {
    questionEs: "¿Cómo se llama la profunda canción en solitario de Han donde comparó sentirse incomprendido y diferente con un 'extraterrestre'?",
    options: {
      A: "Alien (외계인)",
      B: "Close",
      C: "Wish You Back",
      D: "HaPpy"
    },
    explanationEs: "'Alien' (외계인) es una pieza de SKZ-RECORD donde Han reflexiona sobre la soledad y la ansiedad, reconfortando a muchos oyentes que se sienten fuera de lugar.",
    funFactEs: "Muchos fans han calificado a 'Alien' como una de las letras más sanadoras y poéticas del rap coreano."
  },
  55: {
    questionEs: "Seungmin conmovió al público con su banda sonora en solitario 'Here Always' para qué exitoso drama de tvN protagonizado por Kim Seon-ho y Shin Min-a?",
    options: {
      A: "Hometown Cha-Cha-Cha (갯마을 차차차)",
      B: "Crash Landing on You",
      C: "Start-Up",
      D: "Our Blues"
    },
    explanationEs: "'Here Always' fue la emotiva balada romántica principal del drama 'Hometown Cha-Cha-Cha', posicionando a Seungmin como vocalista de élite de OST.",
    funFactEs: "La canción debutó en el #1 de iTunes en decenas de países y acumuló millones de reproducciones globales."
  },
  56: {
    questionEs: "¿Qué legendario comentarista coreano de deportes electrónicos (esports) tuvo un electrizante cameo en la intro del video de 'MEGAVERSE'?",
    options: {
      A: "Jun Yong-jun (전용준 캐스터)",
      B: "Bae Sung-jae",
      C: "Sung Seung-heon",
      D: "Kim Dong-jun"
    },
    explanationEs: "El emblemático comentarista Jun Yong-jun, famoso por gritar con máxima pasión en las finales de League of Legends (LCK), abrió el video cinematográfico.",
    funFactEs: "Su voz inconfundible y enérgica le dio al video musical una atmósfera épica de torneo intergaláctico."
  },
  57: {
    questionEs: "¿Qué canción pre-debut de 3RACHA fue presentada en la recordada batalla de aprendices contra los trainees de YG Entertainment en Mnet?",
    options: {
      A: "Matryoshka",
      B: "Runner's High",
      C: "Zone",
      D: "Subway"
    },
    explanationEs: "'Matryoshka' fue interpretada por Changbin y Han en una memorable batalla de rap que dejó atónito al fundador de YG Yang Hyun-suk.",
    funFactEs: "El video de esa batalla de aprendices supera los 50 millones de reproducciones en YouTube."
  },
  58: {
    questionEs: "¿Cuál es el título del tema principal japonés lanzado en 2022 con un dinámico concepto de carpa de circo y coreografía mágica?",
    options: {
      A: "CIRCUS",
      B: "ALL IN",
      C: "FAM",
      D: "Scars"
    },
    explanationEs: "'CIRCUS' capturó al público japonés e internacional con su puesta en escena circense, trucos de magia y percusión deslumbrante.",
    funFactEs: "El álbum 'CIRCUS' fue certificado Platino en Japón por la RIAJ tras vender cientos de miles de copias."
  },
  59: {
    questionEs: "¿Qué integrante de Stray Kids participó como concursante en 'Show Me The Money 9' de Mnet en 2020 para poner a prueba sus habilidades de rap crudo?",
    options: {
      A: "Changbin",
      B: "Han",
      C: "Hyunjin",
      D: "Bang Chan"
    },
    explanationEs: "Changbin participó audazmente en SMTM9 recibiendo grandes elogios de los productores por su poderosa dicción, tono potente y ritmo implacable.",
    funFactEs: "Superó la ronda clasificatoria preliminar con el productor JUSTHIS entregándole personalmente la cadena del programa."
  },
  60: {
    questionEs: "Stray Kids hizo historia en la lista Billboard 200 al convertirse en el PRIMER artista musical del mundo en lograr qué hito?",
    options: {
      A: "Debutar 5 álbumes consecutivos en el #1 del Billboard 200",
      B: "Mantenerse en el #1 durante 100 semanas seguidas",
      C: "Vender 10 millones de discos en EE.UU. en una sola semana",
      D: "Lanzar 10 álbumes en un solo mes calendario"
    },
    explanationEs: "Stray Kids es el primer artista en toda la historia de Billboard mundial en debutar sus primeros 5 álbumes que ingresaron al chart directamente en el puesto #1 (ODDINARY, MAXIDENT, 5-STAR, ROCK-STAR y ATE).",
    funFactEs: "Este récord histórico superó marcas de grandes leyendas de la música global en los más de 65 años de historia de Billboard."
  }
};

// Apply scoreTiers
quiz.scoreTiers = quiz.scoreTiers.map((tier, idx) => {
  const tEs = scoreTiersEs[idx] || {};
  return {
    ...tier,
    titleEs: tEs.titleEs || tier.title,
    badgeEs: tEs.badgeEs || tier.badge,
    descriptionEs: tEs.descriptionEs || tier.description,
    funQuoteEs: tEs.funQuoteEs || tier.funQuote
  };
});

// Apply affiliate
if (quiz.affiliateSuggestion) {
  quiz.affiliateSuggestion = {
    ...quiz.affiliateSuggestion,
    ...affiliateEs
  };
}

// Apply questions
quiz.questions = quiz.questions.map((q) => {
  const trans = qData[q.id];
  if (!trans) {
    console.warn('Missing translation for question ID', q.id);
    return q;
  }

  const updatedOptions = q.options.map((opt) => {
    const textEs = trans.options[opt.id] || opt.text;
    return {
      ...opt,
      textEs: textEs
    };
  });

  return {
    ...q,
    questionEs: trans.questionEs,
    options: updatedOptions,
    explanationEs: trans.explanationEs,
    funFactEs: trans.funFactEs
  };
});

fs.writeFileSync(filePath, JSON.stringify(quiz, null, 2), 'utf-8');
console.log('Successfully updated all 60 questions, score tiers, and affiliate in', filePath);
