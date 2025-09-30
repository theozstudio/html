/*
 * data.js
 * Contiene los casos de estudio utilizados en la evaluación.
 * Cada caso incluye el enunciado, la respuesta correcta, las explicaciones
 * específicas para cada opción incorrecta y la explicación final correcta.
 */

const CASES = [
  {
    id: 1,
    prompt: 'El Banco de México reportó que la inflación anual en septiembre de 2024 fue de 4.58%, según datos oficiales publicados en su sitio web.',
    correctOption: 1,
    correctExplanation:
      'Esta es información objetiva y comprobable directamente en fuentes oficiales. Los datos de inflación del Banco de México son mediciones estadísticas verificables.',
    incorrectExplanations: {
      2: 'Los datos oficiales no son opiniones, son mediciones objetivas.',
      3: 'No es una opinión, es un dato estadístico oficial.',
      default: 'Se trata de un hecho verificable en fuentes oficiales, no de una interpretación o creencia.'
    }
  },
  {
    id: 2,
    prompt: 'Según el Dr. López Gatell, epidemiólogo y ex-subsecretario de Salud, es probable que veamos un repunte de casos de COVID-19 en invierno debido a los patrones históricos de enfermedades respiratorias.',
    correctOption: 2,
    correctExplanation:
      'Es una predicción basada en conocimiento especializado y evidencia científica previa, emitida por un experto reconocido en el campo.',
    incorrectExplanations: {
      1: 'Es una predicción informada, no un hecho que ya ocurrió.',
      3: 'Aunque está fundamentada, proviene de un experto reconocido, lo que la ubica en la categoría 2.',
      default: 'Cuenta con respaldo científico y proviene de una fuente experta, por eso es nivel 2.'
    }
  },
  {
    id: 3,
    prompt: 'Considero que México debería invertir más en energías renovables porque los reportes del IPCC muestran que el cambio climático requiere acciones urgentes y tenemos excelente potencial solar y eólico.',
    correctOption: 3,
    correctExplanation:
      'Es un punto de vista personal respaldado por datos científicos (reportes del IPCC) y argumentos lógicos sobre el potencial energético de México.',
    incorrectExplanations: {
      2: 'No proviene de un experto certificado, sino de una persona que usa datos para fundamentar su opinión.',
      1: 'Es una opinión sobre qué se debería hacer, no un hecho consumado.',
      default: 'Está respaldada por evidencia reconocida, por eso es una opinión fundamentada.'
    }
  },
  {
    id: 4,
    prompt: 'Prefiero los tacos de pastor que los de carnitas porque me gusta más el sabor del adobo y la piña.',
    correctOption: 4,
    correctExplanation:
      'Es una preferencia puramente personal basada en gustos individuales, sin pretensión de objetividad o fundamentación externa.',
    incorrectExplanations: {
      3: 'Las preferencias de sabor son subjetivas, no se pueden fundamentar objetivamente.',
      1: 'Los gustos personales no son hechos verificables universalmente.',
      default: 'Se trata de una preferencia personal sin implicaciones objetivas.'
    }
  },
  {
    id: 5,
    prompt: 'María, ama de casa de 45 años, publica en su Facebook: \'Siento que Claudia Sheinbaum será una buena presidenta porque me da buena vibra, parece honesta y además me cae bien porque es mujer. Ya era hora de que una mujer gobernara México.\' El post recibió 127 likes y 43 comentarios de apoyo de sus amigas.',
    correctOption: 5,
    correctExplanation:
      'Se basa únicamente en intuición personal ("buena vibra"), simpatía de género y percepciones subjetivas, sin análisis de propuestas, trayectoria o capacidades gubernamentales.',
    incorrectExplanations: {
      4: 'Aunque es personal, aquí no hay argumentos racionales; se clasifica como opinión sin fundamento.',
      3: 'No presenta datos sobre gestión o propuestas concretas.',
      default: 'Es una intuición pura basada en simpatía personal y de género, sin respaldo factual.'
    }
  },
  {
    id: 6,
    prompt: 'Las vacunas COVID-19 causan autismo en niños, como lo demostró el Dr. Andrew Wakefield en su estudio publicado en The Lancet.',
    correctOption: 6,
    correctExplanation:
      'El estudio de Wakefield fue desacreditado y retirado por The Lancet. La conclusión es lógica pero parte de información falsa.',
    incorrectExplanations: {
      8: 'La afirmación no describe una fabricación intencional personal, sino una creencia basada en datos falsos.',
      7: 'Aunque puede volverse dogmática, se cita un "estudio" específico como base.',
      default: 'Hay una referencia concreta a datos erróneos, lo cual corresponde al nivel 6.'
    }
  },
  {
    id: 7,
    prompt: 'La Tierra es plana y todas las fotos de la NASA son falsas. No importa qué evidencia me muestren, nunca cambiaré de opinión porque sé la verdad.',
    correctOption: 7,
    correctExplanation:
      'La declaración rechaza cualquier evidencia contraria y afirma la inmutabilidad de la creencia, rasgos característicos del dogmatismo.',
    incorrectExplanations: {
      8: 'La persona realmente cree en su postura; no está intentando engañar deliberadamente.',
      5: 'Aunque no tiene fundamento, lo central es la negativa a cambiar ante la evidencia.',
      default: 'Describe una creencia inamovible, por eso se clasifica como dogmática.'
    }
  },
  {
    id: 8,
    prompt: 'Audio viral donde supuestamente AMLO dice "voy a robar todo lo que pueda antes de irme", pero análisis forense demuestra que es una manipulación digital creada con inteligencia artificial.',
    correctOption: 8,
    correctExplanation:
      'Es contenido fabricado intencionalmente para engañar, usando tecnología para crear evidencia falsa.',
    incorrectExplanations: {
      6: 'No es una opinión errónea; es material creado deliberadamente para engañar.',
      1: 'El análisis forense confirma que es falso, no verificable.',
      default: 'La creación intencional de contenido falso corresponde a desinformación deliberada.'
    }
  },
  {
    id: 9,
    prompt: 'El peso mexicano se ha fortalecido 8% frente al dólar en los últimos seis meses, según datos del Banco de México y se puede verificar en plataformas financieras como Yahoo Finance y Bloomberg.',
    correctOption: 1,
    correctExplanation:
      'Son datos financieros objetivos que pueden verificarse en múltiples fuentes oficiales y plataformas reconocidas.',
    incorrectExplanations: {
      2: 'Se trata de una medición objetiva, no de una interpretación experta.',
      default: 'Los datos de tipo de cambio son hechos verificables en tiempo real.'
    }
  },
  {
    id: 10,
    prompt: 'Video viral en TikTok muestra supuestamente a militares mexicanos repartiendo droga en Sinaloa con el uniforme del Ejército Nacional. El video tiene 2.3 millones de vistas y miles de comentarios indignados. Sin embargo, expertos en video forense confirmaron que los uniformes son falsos (tienen insignias incorrectas) y que el video fue grabado en Colombia, no en México.',
    correctOption: 8,
    correctExplanation:
      'Es contenido fabricado intencionalmente para dañar la reputación de las fuerzas armadas mexicanas usando material falso.',
    incorrectExplanations: {
      7: 'No es una creencia dogmática, sino un montaje deliberado.',
      6: 'No hay datos erróneos mal interpretados; el contenido fue fabricado.',
      default: 'La intención de engañar con evidencia falsa la ubica en desinformación deliberada.'
    }
  },
  {
    id: 11,
    prompt: 'Andrea, estudiante universitaria de 22 años, publica en Twitter: "CUIDADO CHICAS! Este tipo me acosó en el metro línea 3 ayer en la noche. Se llama Roberto Martínez, trabaja en una oficina del centro. ¡COMPARTAN PARA QUE TODAS LO CONOZCAN! #AcosadorDelMetro". El tweet se volvió viral con 15,000 retweets. Días después, las autoridades del metro revisaron las cámaras y confirmaron que Roberto nunca estuvo en esa línea ese día, pero la Fiscalía aún investiga por presión social.',
    correctOption: 8,
    correctExplanation:
      'Es una acusación falsa que busca dañar intencionalmente la reputación de una persona específica creando un evento inexistente.',
    incorrectExplanations: {
      5: 'No es una opinión; acusa directamente a una persona de un delito.',
      6: 'No hay datos erróneos interpretados; se inventa un suceso inexistente.',
      default: 'Implica desinformación deliberada dirigida contra una persona específica.'
    }
  },
  {
    id: 12,
    prompt: 'Carlos, taxista de 38 años, recibe un mensaje de WhatsApp en el grupo familiar: "URGENTE: Están secuestrando niños en Walmart para vender órganos. Mi comadre vio como se llevaron a una niña ayer. ¡¡¡COMPARTAN!!! No lleven a sus hijos solos." Carlos inmediatamente reenvía el mensaje a sus 8 grupos de WhatsApp sin verificar, diciendo: "Mejor prevenir que lamentar, yo ya no voy a llevar a mis hijos al Walmart."',
    correctOption: 6,
    correctExplanation:
      'Carlos toma una decisión lógica para proteger a su familia, pero lo hace basándose en información falsa que cree verdadera.',
    incorrectExplanations: {
      8: 'Carlos realmente cree en el mensaje; no fabrica la información.',
      5: 'Existe una supuesta "fuente" (el mensaje reenviado), aunque sea falsa.',
      default: 'Es una conclusión lógica asentada en datos erróneos, categoría 6.'
    }
  },
  {
    id: 13,
    prompt: 'En el grupo de WhatsApp "Mamás de la Escuela Benito Juárez", Lupita, madre de familia de 35 años, escribe: "Yo prefiero que mis hijos tomen clases presenciales porque siento que aprenden mejor viendo a la maestra en persona. Mis vecinas también piensan igual y todas hemos visto que nuestros hijos están más contentos así." El mensaje recibe múltiples emojis de aprobación del grupo.',
    correctOption: 4,
    correctExplanation:
      'Es una preferencia educativa basada en experiencia personal y observación directa de sus hijos, sin pretender universalidad.',
    incorrectExplanations: {
      3: 'No cita estudios o datos pedagógicos; se sustenta en su experiencia familiar.',
      5: 'Tiene fundamento en observaciones personales, no es intuición pura.',
      default: 'Describe una preferencia subjetiva basada en vivencias propias.'
    }
  }
];

const CLASSIFICATION = [
  {
    range: [33, 39],
    title: 'Experto en Detección de Desinformación',
    message:
      'Tu dominio del espectro informativo es sobresaliente. Puedes identificar con precisión la intencionalidad y confiabilidad de casi cualquier contenido.'
  },
  {
    range: [26, 32],
    title: 'Buen Ojo Crítico',
    message:
      'Tienes un criterio sólido para evaluar información. Mantén la práctica y seguirás refinando tu capacidad analítica.'
  },
  {
    range: [20, 25],
    title: 'En Desarrollo',
    message:
      'Vas por buen camino, pero aún hay espacio para fortalecer tu análisis crítico. Repasa las explicaciones para consolidar aprendizajes.'
  },
  {
    range: [13, 19],
    title: 'Necesita Práctica',
    message:
      'Identificas algunas señales de alerta, pero la desinformación todavía puede confundirte. Sigue practicando con nuevos casos.'
  },
  {
    range: [0, 12],
    title: 'Vulnerable a Desinformación',
    message:
      'La desinformación representa un riesgo real. Te recomendamos repasar las explicaciones y profundizar en el espectro para reforzar tu criterio.'
  }
];

const TOTAL_QUESTIONS = CASES.length;
const MAX_SCORE = TOTAL_QUESTIONS * 3;
