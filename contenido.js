/* =========================================================================
   contenido.js — Base de conocimiento de la web app
   Cada módulo responde SIEMPRE a tres preguntas explícitas:
   ¿QUÉ ES?  ·  ¿POR QUÉ HABLAMOS DE ESTO?  ·  ¿PARA QUÉ SE MIDE?
   ========================================================================= */

const MODULOS = [

/* ---------------------------------------------------------------- 1 ----- */
{
  id: "origen",
  num: 1,
  grupo: "Fundamentos",
  icono: "🪨",
  titulo: "De la roca al suelo",
  subtitulo: "La litosfera como punto de partida",
  imagen: "assets/portada.jpg",
  queEs: [
    "La litosfera es la capa rocosa y rígida más externa del planeta. Sobre ella vivimos, y de ella salen todos los materiales que con el tiempo forman el suelo.",
    "El suelo no aparece de golpe. Se produce por dos procesos que actúan juntos durante muchísimo tiempo: la <b>meteorización</b> (la roca se rompe y se transforma) y la <b>acción de los seres vivos</b> (raíces, hongos, bacterias, lombrices, insectos), que colonizan esos fragmentos y los reorganizan."
  ],
  porQue: [
    "Hablamos de esto porque sin entender de dónde viene el suelo, el suelo parece simplemente «tierra». No lo es: es el producto de un proceso físico, químico y biológico que puede tardar siglos.",
    "Saber cómo se forma también explica por qué el suelo es tan distinto de un lugar a otro: no es lo mismo un suelo originado sobre roca caliza que uno sobre arenisca, ni uno formado en una ladera que uno en un valle."
  ],
  paraQue: [
    "Se estudia el origen del suelo para saber qué esperar de él: su textura, su acidez, qué nutrientes puede tener y cuáles le faltan, y qué tan rápido se erosiona.",
    "En obras civiles, agricultura y restauración ambiental, conocer el material parental permite predecir problemas antes de que aparezcan.",
    "También se estudia porque el suelo es un recurso que, en la escala de una vida humana, se comporta como <b>no renovable</b>: se forma muy lentamente y se pierde muy rápido."
  ],
  analogia: "Piensa en una pared de concreto vieja. Con los años el agua se mete en las grietas, el hielo la ensancha, el sol la calienta y la enfría, y el viento le arranca polvo. Ese polvo, mezclado con hojas podridas, raíces y animales diminutos, es el comienzo de un suelo. La pared se destruye; el suelo se construye.",
  datos: [
    ["Velocidad típica de formación", "1 cm de suelo cada 100 a 1 000 años (muy variable)"],
    ["Meteorización física", "hielo-deshielo, cambios de temperatura, raíces, abrasión"],
    ["Meteorización química", "hidrólisis, oxidación, disolución, acción de ácidos orgánicos"],
    ["Factores de formación del suelo", "clima, organismos, relieve, material parental y tiempo"],
    ["Erosión acelerada", "puede arrastrar en un año lo que tardó siglos en formarse"]
  ],
  interaccion: { tipo: "meteorizacion" },
  quiz: {
    pregunta: "Una roca se parte por la acción repetida del hielo y el deshielo. ¿Qué tipo de proceso es?",
    opciones: [
      { texto: "Meteorización física", correcta: true,
        feedback: "Exacto. El agua se congela dentro de las grietas, aumenta de volumen y empuja la roca hasta fracturarla. No cambia la composición química, solo el tamaño." },
      { texto: "Meteorización química", correcta: false,
        feedback: "Eso también fragmenta la roca, pero por otra vía: aquí los minerales reaccionan y se transforman (por ejemplo, se oxidan o se hidrolizan). En el hielo-deshielo no hay reacción química, solo fuerza mecánica." },
      { texto: "No es meteorización, es erosión", correcta: false,
        feedback: "Es una confusión muy común. La meteorización rompe la roca <i>en el sitio</i>; la erosión es el transporte de esos fragmentos por agua, viento o gravedad. Primero se rompe, después se mueve." }
    ]
  },
  audio: "La litosfera es la capa rocosa más externa del planeta. El suelo no aparece de golpe: se produce cuando la roca se rompe por meteorización física y química, y cuando los seres vivos colonizan esos fragmentos. La meteorización física incluye el hielo y deshielo, los cambios de temperatura y las raíces. La meteorización química incluye la hidrólisis, la oxidación y la disolución. Formar un centímetro de suelo puede tardar entre cien y mil años. Por eso el suelo se considera un recurso no renovable en la escala de una vida humana."
},

/* ---------------------------------------------------------------- 2 ----- */
{
  id: "que-es-suelo",
  num: 2,
  grupo: "Fundamentos",
  icono: "🌱",
  titulo: "¿Qué es exactamente el suelo?",
  subtitulo: "Un sistema vivo, no un montón de tierra",
  imagen: "assets/portada.jpg",
  queEs: [
    "El suelo es un <b>cuerpo natural</b> que se encuentra en la superficie de la tierra firme, en la zona donde se tocan la roca, el aire, el agua y los seres vivos. Está formado por cuatro componentes que siempre están mezclados:",
    "• <b>Minerales</b>: fragmentos de roca de distintos tamaños.<br>• <b>Materia orgánica</b>: restos de plantas y animales en distintos grados de descomposición, más los organismos vivos.<br>• <b>Agua</b>: con sales y nutrientes disueltos.<br>• <b>Aire</b>: en los espacios que el agua no ocupa.",
    "La proporción entre esos cuatro componentes decide casi todo: si el suelo retiene agua o la deja ir, si las raíces pueden respirar, si hay vida, si puede sostener cultivos."
  ],
  porQue: [
    "Hablamos de esto porque mucha gente usa «suelo», «tierra» y «tierra de jardín» como si fueran lo mismo, y no lo son. El suelo es una estructura organizada, con capas, poros y vida propia. Una bolsa de tierra comprada en una tienda no es un suelo: es un material.",
    "También importa porque el suelo presta servicios que usamos todos los días sin darnos cuenta: sostiene los cultivos, filtra el agua que llega a los acuíferos, almacena carbono, sostiene edificios y carreteras, y alberga una parte enorme de la biodiversidad del planeta."
  ],
  paraQue: [
    "Se estudia la composición del suelo para diagnosticar su estado. Si la fracción de aire es muy baja, el suelo está compactado o encharcado y las raíces se asfixian. Si la materia orgánica es muy baja, el suelo pierde estructura y fertilidad.",
    "En ingeniería, la composición define cuánto peso soporta el terreno y cómo se comporta con la lluvia.",
    "En ciencias ambientales, la composición define cuánto contaminante puede retener el suelo antes de dejarlo pasar al agua subterránea."
  ],
  analogia: "Un suelo sano es como una casa bien ventilada: tiene paredes (los minerales), muebles y alfombras (la materia orgánica), agua corriente (el agua) y aire que circula entre las habitaciones (los poros). Si tapas la ventilación, la casa se vuelve húmeda y todo se enferma. Eso es un suelo compactado.",
  datos: [
    ["Composición típica de un suelo mineral fértil", "≈45 % minerales · ≈5 % materia orgánica · ≈25 % agua · ≈25 % aire"],
    ["Fase sólida", "minerales + materia orgánica"],
    ["Fase líquida", "solución del suelo (agua + sales disueltas)"],
    ["Fase gaseosa", "aire del suelo, con más CO₂ que la atmósfera"],
    ["Funciones", "sostén de plantas, almacén de agua, filtro, hábitat, reserva de carbono"]
  ],
  interaccion: { tipo: "composicion" },
  quiz: {
    pregunta: "Dos suelos tienen los mismos minerales y la misma materia orgánica, pero uno tiene 10 % de aire y el otro 25 %. ¿Qué diferencia esperas encontrar?",
    opciones: [
      { texto: "El de 10 % de aire tendrá raíces con menos oxígeno disponible", correcta: true,
        feedback: "Correcto. Las raíces respiran: necesitan oxígeno en los poros. Con poco aire, el suelo se vuelve anóxico, la actividad biológica cambia y muchas plantas se afectan." },
      { texto: "No habrá ninguna diferencia, el aire no cuenta", correcta: false,
        feedback: "Es tentador pensar eso porque el aire no se ve ni pesa. Pero el aire del suelo es lo que permite que las raíces y los microorganismos respiren. Sin él, el suelo se comporta como un suelo encharcado." },
      { texto: "El de 10 % de aire tendrá más agua retenida y eso siempre es mejor", correcta: false,
        feedback: "Más agua no es sinónimo de mejor. Si el agua ocupa el espacio del aire, las raíces no respiran. Lo deseable es un equilibrio entre agua y aire." }
    ]
  },
  audio: "El suelo es un cuerpo natural que se encuentra en la superficie de la tierra firme, donde se tocan la roca, el aire, el agua y los seres vivos. Está formado por minerales, materia orgánica, agua y aire. En un suelo mineral fértil, cerca del cuarenta y cinco por ciento del volumen son minerales, cinco por ciento materia orgánica, veinticinco por ciento agua y veinticinco por ciento aire. Esa proporción decide si el suelo retiene agua, si las raíces pueden respirar y si puede sostener vida."
},

/* ---------------------------------------------------------------- 3 ----- */
{
  id: "suelo-vs-sedimento",
  num: 3,
  grupo: "Fundamentos",
  icono: "🏞️",
  titulo: "Suelo y sedimento de río no son lo mismo",
  subtitulo: "Dos materiales parecidos que se estudian y se regulan distinto",
  imagen: "assets/suelo_vs_sedimento.jpg",
  queEs: [
    "<b>Suelo</b>: material que se forma <i>en el lugar</i> donde está, a partir de la roca de abajo, con aporte de materia orgánica en la superficie y con actividad biológica. Desarrolla capas llamadas horizontes y tiene una estructura propia (agregados y poros conectados).",
    "<b>Sedimento</b>: material que fue arrancado de otro lugar y <b>transportado</b> por agua, viento o hielo hasta depositarse. En un río lo encontramos en el lecho, en las barras de arena y grava y en las llanuras de inundación.",
    "La diferencia clave es el <b>origen</b>: el suelo se forma donde está (autóctono), el sedimento llega desde otro sitio (alóctono)."
  ],
  porQue: [
    "Hablamos de esto porque en la práctica se confunden todo el tiempo, y esa confusión tiene consecuencias reales: se aplican criterios de calidad de suelo a un sedimento, o al revés, y se toman decisiones equivocadas sobre dragados, rellenos o restauración de riberas.",
    "Además, los dos almacenan contaminantes de forma distinta. Por eso una norma ambiental puede declarar peligroso un sedimento que, con los criterios del suelo, parecería aceptable."
  ],
  paraQue: [
    "Se distingue uno de otro para saber <b>cómo muestrear</b>: en el suelo se muestrea por horizontes y por profundidad; en el sedimento se muestrea por estratos depositados en el tiempo.",
    "Para interpretar correctamente los resultados de laboratorio: un sedimento con 3 % de materia orgánica no tiene las mismas propiedades que un suelo con 3 %.",
    "Para elegir la norma que aplica, el tipo de tratamiento y el destino del material removido.",
    "Y para entender el paisaje: el sedimento es el archivo de lo que pasó aguas arriba; el suelo es el registro de lo que pasa donde está."
  ],
  analogia: "El suelo es como un mueble construido en la casa: hecho ahí, con las piezas del lugar, ensamblado y con su propia estructura. El sedimento es como la arena que el río arrastra hasta la playa: viene de otra parte, fue pulida por el viaje y quedó apilada en capas según su tamaño. Se ven parecidos, pero uno se construyó y el otro llegó.",
  datos: [
    ["Origen del suelo", "en el sitio, a partir del material parental"],
    ["Origen del sedimento", "transportado por agua, viento o hielo"],
    ["Horizontes", "el suelo los desarrolla; el sedimento forma estratos"],
    ["Forma de los granos", "suelo: angulosos y diversos · sedimento: redondeados y seleccionados por tamaño"],
    ["Materia orgánica", "suelo: concentrada en superficie · sedimento: baja y dispersa (salvo turberas)"],
    ["Actividad biológica", "suelo: alta y estructurante · sedimento: menor, condicionada por el agua"],
    ["Norma aplicable", "suelo: calidad de suelo y uso del terreno · sedimento: calidad de sedimento y ecosistema acuático"]
  ],
  interaccion: { tipo: "comparar" },
  quiz: {
    pregunta: "En el lecho de un río encuentras arena y grava redondeada, depositada en capas horizontales, con muy poca materia orgánica. ¿Qué es?",
    opciones: [
      { texto: "Sedimento fluvial", correcta: true,
        feedback: "Correcto. Granos redondeados, seleccionados por tamaño y depositados en capas horizontales son la firma del transporte por agua. La poca materia orgánica también encaja." },
      { texto: "Suelo formado en el lecho del río", correcta: false,
        feedback: "Podría parecerlo porque está en el suelo del río, pero un suelo se forma en el sitio y desarrolla horizontes y estructura. Aquí el material llegó de otra parte y se depositó por capas: eso es transporte, no formación." },
      { texto: "Roca madre", correcta: false,
        feedback: "La roca madre es el material consolidado del que se origina un suelo. La grava y la arena sueltas no están consolidadas y, además, fueron transportadas." }
    ]
  },
  audio: "El suelo y el sedimento de río se parecen, pero no son lo mismo. El suelo se forma en el lugar donde está, a partir de la roca de abajo, con materia orgánica en la superficie y actividad biológica. Desarrolla horizontes y estructura. El sedimento fue arrancado de otro lugar y transportado por agua, viento o hielo hasta depositarse. Sus granos suelen ser redondeados y estar seleccionados por tamaño, y se acumula en estratos. Esta diferencia importa porque cambia cómo se muestrea, cómo se interpretan los análisis y qué norma ambiental se aplica."
},

/* ---------------------------------------------------------------- 4 ----- */
{
  id: "horizontes",
  num: 4,
  grupo: "Fundamentos",
  icono: "🧱",
  titulo: "Los horizontes del suelo",
  subtitulo: "Las capas que cuentan la historia del terreno",
  imagen: "assets/horizontes.jpg",
  queEs: [
    "Si haces un corte vertical en el suelo, ves capas más o menos paralelas a la superficie. Esas capas se llaman <b>horizontes</b> y el conjunto se llama <b>perfil del suelo</b>.",
    "Cada horizonte se distingue por su color, su textura, su contenido de materia orgánica y su estructura. No todos los suelos tienen todos los horizontes, y el espesor de cada uno varía mucho.",
    "• <b>O</b> — capa orgánica: hojas, ramas y restos poco descompuestos. Muy oscura y esponjosa.<br>• <b>A</b> — capa mineral superficial, mezclada con humus. Es donde se concentran las raíces y la vida; suele ser la más fértil.<br>• <b>E</b> — capa de lavado (<i>eluvial</i>): el agua se llevó de aquí arcilla, hierro y materia orgánica. Se ve más clara.<br>• <b>B</b> — capa de acumulación (<i>iluvial</i>): recibe lo que baja de arriba. Suele ser más rojiza o más arcillosa y con estructura en bloques.<br>• <b>C</b> — material parental fragmentado: roca meteorizada, pero sin estructura de suelo.<br>• <b>D</b> (o <b>R</b>) — roca madre continua, dura, sin alterar."
  ],
  porQue: [
    "Hablamos de los horizontes porque el suelo no es homogéneo: lo que hay a 10 cm de profundidad no es lo que hay a 80 cm. Ignorarlo lleva a errores graves, como fertilizar la capa superficial cuando el problema está en la compactación de abajo, o tomar una muestra de la capa equivocada.",
    "También explican el paisaje que vemos: por qué un suelo es oscuro en la superficie y rojizo abajo, por qué se encharca, por qué una ladera se desliza."
  ],
  paraQue: [
    "Se describen los horizontes para <b>muestrear correctamente</b>: la muestra se toma por horizonte, no al azar, y se anota de qué profundidad viene.",
    "Para <b>clasificar el suelo</b> y compararlo con otros (existen sistemas internacionales de clasificación basados en los horizontes).",
    "Para <b>diagnosticar limitaciones</b>: un horizonte B muy arcilloso y poco permeable genera encharcamiento; un horizonte E muy lavado indica pérdida de nutrientes; un horizonte C poco profundo limita el desarrollo de raíces.",
    "Para <b>decidir obras</b>: la profundidad del horizonte rocoso define si se puede excavar, sembrar o construir."
  ],
  analogia: "El perfil del suelo es como la historia clínica de un paciente escrita en capas. La capa de hojas es lo que acaba de llegar. La capa oscura de arriba es lo que se ha procesado y está activo. La capa clara es lo que se perdió por lavado. La capa rojiza es donde se acumuló todo lo que bajó. Y al fondo está el esqueleto: la roca. Leyendo de arriba abajo se entiende qué le ha pasado a ese terreno.",
  datos: [
    ["O — orgánico", "restos vegetales; muy oscuro, esponjoso, alta porosidad"],
    ["A — mineral superficial", "humus + minerales; zona de raíces; la más fértil"],
    ["E — eluvial", "pérdida de arcilla, hierro y materia orgánica; color claro"],
    ["B — iluvial", "acumulación de arcilla, hierro o carbonatos; estructura en bloques"],
    ["C — material parental", "roca meteorizada sin estructura de suelo"],
    ["D / R — roca madre", "roca continua sin alterar"],
    ["Subíndices frecuentes", "t = arcilla · h = humus · g = gleización · k = carbonatos"]
  ],
  interaccion: { tipo: "capas" },
  quiz: {
    pregunta: "Un horizonte es mucho más claro que los de arriba y ha perdido arcilla y hierro. ¿Cuál es?",
    opciones: [
      { texto: "Horizonte E (eluvial)", correcta: true,
        feedback: "Correcto. La «E» viene de <i>eluvial</i>: el agua percoló y se llevó hacia abajo las partículas finas y los óxidos, dejando un color pálido." },
      { texto: "Horizonte B (iluvial)", correcta: false,
        feedback: "Es justo el contrario. El horizonte B es donde <i>se acumula</i> lo que baja: por eso suele ser más oscuro, más rojizo o más arcilloso. La pérdida define al E; la ganancia define al B." },
      { texto: "Horizonte C", correcta: false,
        feedback: "El horizonte C es roca meteorizada, con fragmentos y sin estructura de suelo. Puede ser claro, pero su rasgo distintivo es que es material parental poco alterado, no una zona de lavado." }
    ]
  },
  audio: "Cuando se hace un corte vertical en el suelo se ven capas llamadas horizontes, y el conjunto se llama perfil. El horizonte O es la capa orgánica de hojas y restos. El horizonte A es la capa mineral superficial mezclada con humus, donde están las raíces y la mayor fertilidad. El horizonte E es la capa de lavado, más clara, de la que el agua se llevó arcilla y hierro. El horizonte B es la capa de acumulación, donde se deposita lo que baja. El horizonte C es material parental fragmentado y el D o R es la roca madre. Describir los horizontes sirve para muestrear bien, clasificar el suelo y detectar limitaciones como compactación o encharcamiento."
},

/* ---------------------------------------------------------------- 5 ----- */
{
  id: "textura",
  num: 5,
  grupo: "Composición",
  icono: "🪣",
  titulo: "Textura: el tamaño de las partículas",
  subtitulo: "Por qué un suelo se encharca y otro se seca",
  imagen: "assets/textura.jpg",
  queEs: [
    "La textura es la <b>proporción</b> de tres tamaños de partícula mineral en el suelo:",
    "• <b>Arena</b>: de 2 mm a 0,05 mm. Se ve a simple vista y se siente áspera.<br>• <b>Limo</b>: de 0,05 mm a 0,002 mm. Se siente como harina cuando está seco.<br>• <b>Arcilla</b>: menor de 0,002 mm. Es tan fina que no se ve; mojada se siente pegajosa y se moldea.",
    "Las proporciones se representan en un <b>triángulo textural</b>, que traduce porcentajes a un nombre: arenosa, franco-arenosa, franca, franco-arcillosa, arcillosa, limosa, etc.",
    "Es importante no confundir textura con estructura: la <b>textura</b> es el tamaño de las partículas y prácticamente no cambia; la <b>estructura</b> es cómo se agrupan y sí se puede modificar."
  ],
  porQue: [
    "Hablamos de textura porque es el parámetro que mejor predice el comportamiento del suelo con el agua. La arena deja pasar el agua rápido y retiene poco; la arcilla retiene mucha agua pero la suelta con dificultad y deja poco aire.",
    "Por eso dos suelos con el mismo clima, la misma pendiente y el mismo manejo pueden tener resultados completamente distintos: uno se seca en dos días y el otro se queda encharcado una semana."
  ],
  paraQue: [
    "Se mide para <b>decidir el riego</b>: cuánta agua aplicar y con qué frecuencia. Regar una arena igual que una arcilla desperdicia agua o ahoga el cultivo.",
    "Para <b>elegir cultivos y manejo</b>: hay plantas que toleran suelos arenosos y otras que necesitan suelos francos.",
    "Para <b>predecir drenaje, erosión y compactación</b>, y para diseñar drenajes, zanjas, filtros y obras civiles.",
    "Para <b>interpretar la fertilidad</b>: la arcilla es el principal almacén de nutrientes, así que la textura condiciona la CIC (lo veremos más adelante)."
  ],
  analogia: "Imagina tres recipientes: uno lleno de canicas, uno de harina y uno de plastilina. Al echar agua, las canicas la dejan pasar de inmediato; la harina la retiene un rato y forma una pasta; la plastilina casi no deja entrar el agua. La arena, el limo y la arcilla hacen exactamente eso, porque el tamaño de las partículas controla cuántos huecos hay y qué tan finos son.",
  datos: [
    ["Arena", "2 – 0,05 mm · drena rápido · poca retención"],
    ["Limo", "0,05 – 0,002 mm · retención intermedia · se sella con facilidad"],
    ["Arcilla", "< 0,002 mm · alta retención · alta CIC · poca aireación"],
    ["Superficie específica de la arcilla", "puede superar los 800 m² por gramo"],
    ["Textura franca", "mezcla equilibrada: buena retención, buen drenaje, buena aireación"],
    ["Métodos de laboratorio", "hidrómetro (Bouyoucos), pipeta, tamizado"],
    ["En campo", "estimación al tacto, con patrones de referencia"]
  ],
  interaccion: { tipo: "textura" },
  quiz: {
    pregunta: "Un agricultor riega dos parcelas igual durante un mes. Una se seca en un día y la otra queda encharcada tres días. ¿Qué explicación es más probable?",
    opciones: [
      { texto: "La primera tiene más arena y la segunda más arcilla", correcta: true,
        feedback: "Correcto. La arena forma poros grandes que dejan escapar el agua rápido; la arcilla forma poros muy finos que la retienen con fuerza. La textura explica la diferencia sin necesidad de suponer un error de riego." },
      { texto: "La segunda parcela recibe más agua aunque se riegue igual", correcta: false,
        feedback: "Esa sería la explicación si el riego fuera distinto, pero el enunciado dice que es igual. Cuando el aporte es el mismo, la diferencia está en cómo el suelo maneja el agua: eso es textura y estructura." },
      { texto: "La primera está más compactada", correcta: false,
        feedback: "La compactación también reduce la infiltración, pero produce el efecto contrario: un suelo compactado se encharca, no se seca rápido. Aquí la parcela que se seca rápido tiene el problema opuesto." }
    ]
  },
  audio: "La textura es la proporción de arena, limo y arcilla en el suelo. La arena mide entre dos milímetros y cero coma cero cinco milímetros, se ve a simple vista y se siente áspera. El limo mide entre cero coma cero cinco y cero coma cero cero dos milímetros y se siente como harina. La arcilla mide menos de cero coma cero cero dos milímetros, es pegajosa cuando está mojada y tiene una superficie específica enorme. La textura predice el comportamiento del suelo con el agua: la arena drena rápido y retiene poco, la arcilla retiene mucho pero deja poco aire. Se mide para decidir el riego, elegir cultivos y predecir drenaje y erosión."
},

/* ---------------------------------------------------------------- 6 ----- */
{
  id: "estructura",
  num: 6,
  grupo: "Composición",
  icono: "🧩",
  titulo: "Estructura: cómo se agrupan las partículas",
  subtitulo: "Lo que sí podemos cambiar",
  imagen: "assets/estructura.jpg",
  queEs: [
    "La estructura es la forma en que las partículas del suelo se unen formando <b>agregados</b> (también llamados <i>peds</i>), y cómo esos agregados dejan espacios entre sí.",
    "Los tipos principales son:<br>• <b>Granular o migajón</b>: pequeños grumos redondeados, típicos de la capa superficial fértil.<br>• <b>Laminar</b>: capas delgadas horizontales, frecuentes en suelos compactados o en el horizonte E.<br>• <b>En bloques o angular</b>: terrones con caras planas, típicos del horizonte B.<br>• <b>Prismática o columnar</b>: columnas verticales; la forma columnar suele indicar exceso de sodio.<br>• <b>Masiva</b>: sin agregados visibles, el material se ve como un bloque único.",
    "La estructura depende de la materia orgánica, la arcilla, los cationes presentes, las raíces, la actividad de lombrices y microorganismos, y de los ciclos de humedad y sequía."
  ],
  porQue: [
    "Hablamos de estructura porque, a diferencia de la textura, <b>sí se puede mejorar o degradar</b> en pocos años. Es el parámetro que responde al manejo.",
    "Un suelo con buena estructura tiene poros de varios tamaños: grandes que drenan y pequeños que retienen. Eso permite que entre agua y aire al mismo tiempo. Un suelo sin estructura se vuelve un bloque: el agua no entra, el aire no circula y las raíces no penetran."
  ],
  paraQue: [
    "Se evalúa para saber si el suelo está <b>compactado o degradado</b>, y para decidir cómo recuperarlo (aportar materia orgánica, reducir labranza, mantener cobertura vegetal, evitar el pastoreo excesivo).",
    "Para predecir <b>infiltración y erosión</b>: los agregados estables resisten el impacto de la lluvia; los inestables se deshacen y sellan la superficie.",
    "Para entender problemas de <b>sodio</b>: cuando el sodio ocupa demasiadas posiciones de intercambio, los agregados se dispersan y el suelo pierde estructura por completo."
  ],
  analogia: "Piensa en una caja de galletas: si las galletas están enteras y apiladas, quedan huecos entre ellas y el aire circula. Si las aplastas todas hasta hacer una masa, ya no hay huecos. Un suelo granular es la caja de galletas; un suelo compactado es la masa aplastada.",
  datos: [
    ["Granular / migajón", "grumos redondeados · horizonte A · alta fertilidad"],
    ["Laminar", "capas horizontales finas · compactación o laboreo"],
    ["En bloques", "terrones angulares · horizonte B"],
    ["Prismática / columnar", "columnas verticales · la columnar sugiere sodio"],
    ["Masiva", "sin agregados · suelos muy alterados o material parental"],
    ["Estabilidad de agregados", "indicador de salud del suelo frente al agua"],
    ["Qué la mejora", "materia orgánica, raíces, lombrices, cobertura, menos labranza"],
    ["Qué la degrada", "labranza excesiva, pastoreo intenso, sodio, compactación"]
  ],
  interaccion: { tipo: "estructura" },
  quiz: {
    pregunta: "Un suelo tiene muchos agregados redondeados pequeños y poros de varios tamaños. ¿Qué ventaja le da eso?",
    opciones: [
      { texto: "Puede retener agua y dejar entrar aire al mismo tiempo", correcta: true,
        feedback: "Correcto. Los poros grandes drenan y permiten el paso de aire; los pequeños retienen agua. Tener ambos tamaños es lo que hace que un suelo funcione bien." },
      { texto: "Pesa menos, así que las plantas crecen más rápido", correcta: false,
        feedback: "El peso no es el factor determinante. Lo que importa es la arquitectura interna: qué tan conectados están los poros y si permiten el paso simultáneo de agua y aire." },
      { texto: "No tiene ninguna ventaja, la estructura solo cambia el color", correcta: false,
        feedback: "La estructura no cambia el color: cambia el movimiento del agua y del aire, la resistencia a la erosión y la facilidad con que las raíces crecen. Es uno de los parámetros más importantes del suelo." }
    ]
  },
  audio: "La estructura es la forma en que las partículas del suelo se agrupan en agregados. Los tipos principales son granular o migajón, laminar, en bloques, prismática o columnar, y masiva. La estructura depende de la materia orgánica, la arcilla, los cationes presentes, las raíces y la actividad biológica. A diferencia de la textura, la estructura se puede mejorar o degradar en pocos años. Se evalúa para detectar compactación, predecir infiltración y erosión, y entender problemas de sodio. Un suelo con agregados estables y poros de varios tamaños retiene agua y deja entrar aire al mismo tiempo."
},

/* ---------------------------------------------------------------- 7 ----- */
{
  id: "fisicos",
  num: 7,
  grupo: "Parámetros físicos",
  icono: "⚖️",
  titulo: "Porosidad, densidad y retención de agua",
  subtitulo: "Los números que describen cómo se comporta el suelo",
  imagen: "assets/porosidad.jpg",
  queEs: [
    "Los <b>parámetros físicos</b> son medidas numéricas de la arquitectura del suelo. Los cuatro más usados son:",
    "• <b>Densidad aparente (Da)</b>: masa de suelo seco dividida por el volumen total, incluyendo los poros. Se mide en g/cm³. Un suelo franco sano suele estar entre 1,0 y 1,4; por encima de 1,6 hay señales de compactación.<br>• <b>Densidad real (Dr)</b>: masa dividida solo por el volumen de las partículas sólidas. Ronda 2,6 a 2,7 g/cm³ y casi no cambia.<br>• <b>Porosidad</b>: porcentaje del volumen que no está ocupado por sólidos. Se calcula como <b>1 − (Da ÷ Dr)</b>. Un suelo típico tiene entre 40 % y 60 %.<br>• <b>Retención de agua</b>: cuánta agua queda en el suelo después de drenar. Se describen dos límites: la <b>capacidad de campo</b> (agua que el suelo retiene tras un riego abundante) y el <b>punto de marchitez permanente</b> (agua que las plantas ya no pueden extraer). La diferencia entre ambos es el <b>agua disponible</b>.",
    "También se mide la <b>infiltración</b>: la velocidad con que el agua entra en la superficie, en milímetros por hora."
  ],
  porQue: [
    "Hablamos de estos parámetros porque son los que convierten una descripción («este suelo está apretado») en un dato comparable y verificable («este suelo tiene densidad aparente de 1,72 g/cm³, por encima del umbral para un franco»).",
    "La porosidad explica directamente por qué un suelo encharcado no produce: sin poros con aire, las raíces se asfixian aunque haya agua de sobra."
  ],
  paraQue: [
    "Se miden para <b>diagnosticar compactación</b> causada por maquinaria, ganado o tráfico, y para decidir si hace falta subsolar o descompactar.",
    "Para <b>diseñar el riego</b>: conocer la capacidad de campo y el agua disponible permite calcular cuánta agua aplicar sin desperdiciar ni lixiviar nutrientes.",
    "Para <b>evaluar riesgo de inundación y escorrentía</b>: una infiltración baja hace que el agua corra por la superficie y arrastre suelo.",
    "Para <b>obras civiles</b>: la densidad y la porosidad definen cuánto se asienta un terreno y cómo drena."
  ],
  analogia: "La densidad aparente es como pesar una caja llena de pelotas: si las pelotas están sueltas, la caja pesa poco para su tamaño; si las aplastas y las aprietas, la misma caja pesa más. El volumen no cambió, pero hay menos huecos. Eso es exactamente lo que pasa cuando un suelo se compacta.",
  datos: [
    ["Densidad aparente (Da)", "g/cm³ · incluye poros · franco sano: 1,0 – 1,4 · compactado: > 1,6"],
    ["Densidad real (Dr)", "g/cm³ · solo sólidos · ≈ 2,6 – 2,7"],
    ["Porosidad", "1 − (Da ÷ Dr) · típica 40 % – 60 %"],
    ["Capacidad de campo (CC)", "agua retenida tras drenaje libre"],
    ["Punto de marchitez permanente (PMP)", "agua que la planta ya no puede extraer"],
    ["Agua disponible", "CC − PMP"],
    ["Infiltración", "mm/h · cae mucho con compactación o sellado superficial"]
  ],
  interaccion: { tipo: "fisicos" },
  quiz: {
    pregunta: "Un suelo tiene densidad aparente de 1,8 g/cm³ y densidad real de 2,7 g/cm³. ¿Qué concluyes?",
    opciones: [
      { texto: "Está compactado y su porosidad es baja (≈33 %)", correcta: true,
        feedback: "Correcto. 1 − (1,8 ÷ 2,7) = 0,33, es decir 33 % de porosidad, muy por debajo del 40–60 % esperable. Una densidad aparente de 1,8 en un suelo franco indica compactación." },
      { texto: "Está bien, porque la densidad real es normal", correcta: false,
        feedback: "La densidad real es una propiedad de los minerales y casi no cambia; por eso no sirve para diagnosticar. La que informa sobre el estado del suelo es la densidad aparente, y 1,8 es alta." },
      { texto: "Tiene mucha porosidad porque 1,8 es mayor que 1,0", correcta: false,
        feedback: "Es al contrario. Cuanto mayor es la densidad aparente, más masa hay en el mismo volumen y menos espacio queda para poros. La relación es inversa." }
    ]
  },
  audio: "Los parámetros físicos describen la arquitectura del suelo. La densidad aparente es la masa de suelo seco dividida por el volumen total, incluyendo los poros. La densidad real es la masa dividida solo por el volumen de los sólidos y ronda dos coma seis a dos coma siete gramos por centímetro cúbico. La porosidad se calcula como uno menos la densidad aparente dividida por la densidad real, y en un suelo típico está entre cuarenta y sesenta por ciento. La retención de agua se describe con la capacidad de campo y el punto de marchitez permanente, y su diferencia es el agua disponible. También se mide la infiltración, en milímetros por hora."
},

/* ---------------------------------------------------------------- 8 ----- */
{
  id: "ph",
  num: 8,
  grupo: "Parámetros químicos",
  icono: "🧪",
  titulo: "pH del suelo",
  subtitulo: "Acidez, alcalinidad y disponibilidad de nutrientes",
  imagen: "assets/ph.jpg",
  queEs: [
    "El pH mide la concentración de iones hidrógeno en la solución del suelo. Se expresa en una escala de 0 a 14: por debajo de 7 es <b>ácido</b>, en 7 es <b>neutro</b> y por encima de 7 es <b>básico</b> o alcalino.",
    "La escala es logarítmica: un pH 5 tiene diez veces más iones hidrógeno que un pH 6, y cien veces más que un pH 7. Por eso una diferencia de una unidad es mucho más grande de lo que parece.",
    "Los suelos naturales van aproximadamente de pH 3,5 a pH 10. La mayoría de los suelos agrícolas están entre 5 y 8."
  ],
  porQue: [
    "Hablamos de pH porque controla la <b>disponibilidad de los nutrientes</b>. Un nutriente puede estar presente en el suelo y aun así no estar disponible para la planta si el pH no es el adecuado. El fósforo, por ejemplo, se fija con hierro y aluminio en suelos muy ácidos y con calcio en suelos muy alcalinos: en ambos extremos la planta no puede tomarlo.",
    "También controla la actividad de los microorganismos, la solubilidad de metales potencialmente tóxicos (como el aluminio, que se vuelve tóxico por debajo de pH 5,5) y la estabilidad de la estructura."
  ],
  paraQue: [
    "Se mide para <b>decidir si hay que encalar</b> (aplicar cal para subir el pH) o acidificar, y en qué dosis.",
    "Para <b>elegir el cultivo adecuado</b>: cada especie tiene su rango. Los arándanos prosperan en pH 4,5–5,5; la alfalfa prefiere 6,5–7,5.",
    "Para <b>interpretar correctamente un análisis de fertilidad</b>: sin pH, los valores de fósforo y micronutrientes se leen mal.",
    "Para <b>evaluar riesgo de contaminación</b>: al bajar el pH, metales como el cadmio o el plomo se vuelven más móviles y pueden pasar al agua o a las plantas."
  ],
  analogia: "El pH es como el volumen de una radio. Muy bajito (muy ácido) y la planta no escucha nada de lo que el suelo le ofrece. Muy alto (muy alcalino) y todo suena distorsionado. Hay un punto medio en el que la música se escucha bien: para la mayoría de los cultivos, entre 6 y 7.",
  datos: [
    ["Escala", "0 a 14 · < 7 ácido · = 7 neutro · > 7 básico"],
    ["Naturaleza de la escala", "logarítmica: cada unidad es un factor de 10"],
    ["Rango óptimo general", "6,0 – 7,0 para la mayoría de cultivos"],
    ["Fósforo", "máxima disponibilidad cerca de pH 6,5"],
    ["Aluminio tóxico", "aparece por debajo de pH 5,5"],
    ["Micronutrientes (Fe, Mn, Zn)", "más disponibles en medio ácido"],
    ["Medición", "potenciómetro en agua 1:2,5 o en KCl (acidez intercambiable)"],
    ["Diferencia agua / KCl", "puede ser de 0,5 a 1,5 unidades"]
  ],
  interaccion: { tipo: "ph" },
  quiz: {
    pregunta: "Un suelo tiene pH 5,2 y se quiere sembrar un cultivo que necesita pH 6,5. ¿Qué se hace y por qué?",
    opciones: [
      { texto: "Aplicar cal para elevar el pH y liberar fósforo", correcta: true,
        feedback: "Correcto. La cal neutraliza la acidez. Al subir el pH hacia 6,5 el fósforo deja de fijarse con hierro y aluminio y vuelve a estar disponible, y además baja el aluminio tóxico." },
      { texto: "Aplicar yeso, que siempre sube el pH", correcta: false,
        feedback: "El yeso se usa sobre todo para desplazar sodio en suelos sódicos, no para neutralizar acidez. Para subir el pH de un suelo ácido se usa material encalante, como carbonato de calcio." },
      { texto: "No hacer nada, las plantas se adaptan solas", correcta: false,
        feedback: "Algunas plantas toleran la acidez, pero si el cultivo requiere pH 6,5 no se adaptará solo. Además, en pH bajo hay aluminio tóxico y el fósforo queda fijado." }
    ]
  },
  audio: "El pH mide la concentración de iones hidrógeno en la solución del suelo, en una escala de cero a catorce. Por debajo de siete es ácido, en siete es neutro y por encima de siete es básico. La escala es logarítmica, así que cada unidad representa un factor de diez. El pH controla la disponibilidad de nutrientes: el fósforo se fija con hierro y aluminio en suelos muy ácidos y con calcio en suelos muy alcalinos. Por debajo de pH cinco coma cinco aparece aluminio tóxico. Se mide para decidir encalado, elegir cultivos e interpretar análisis de fertilidad."
},

/* ---------------------------------------------------------------- 9 ----- */
{
  id: "cic",
  num: 9,
  grupo: "Parámetros químicos",
  icono: "🔗",
  titulo: "CIC y saturación de bases",
  subtitulo: "El almacén de nutrientes del suelo",
  imagen: "assets/cic.jpg",
  queEs: [
    "La <b>Capacidad de Intercambio Catiónico (CIC)</b> es la cantidad de cargas negativas que tiene el suelo y que pueden retener cationes, es decir, iones con carga positiva como calcio (Ca²⁺), magnesio (Mg²⁺), potasio (K⁺), sodio (Na⁺), aluminio (Al³⁺) e hidrógeno (H⁺).",
    "Se expresa en <b>cmol(+)/kg</b> (antes se usaba meq/100 g). Cuanto mayor es la CIC, más nutrientes puede almacenar el suelo y más resistencia tiene a perderlos por lavado.",
    "La arcilla y la materia orgánica son los principales responsables de la CIC. Por eso un suelo arcilloso y con materia orgánica retiene mucho más que uno arenoso y pobre en materia orgánica.",
    "La <b>saturación de bases</b> es el porcentaje de esas posiciones ocupadas por bases (Ca, Mg, K, Na). Si el resto está ocupado por aluminio e hidrógeno, el suelo es ácido."
  ],
  porQue: [
    "Hablamos de CIC porque explica por qué un suelo «guarda» el fertilizante y otro lo pierde con la primera lluvia. En un suelo arenoso de CIC baja, el potasio aplicado se lava hacia el agua subterránea; en un suelo arcilloso se queda disponible para la planta.",
    "También es la razón por la que los suelos con alta CIC amortiguan mejor la contaminación: retienen metales y evitan que pasen al agua."
  ],
  paraQue: [
    "Se mide para <b>calcular la dosis de fertilizante</b>: no se aplica lo mismo en un suelo con CIC de 4 que en uno con CIC de 30.",
    "Para <b>decidir encalado</b>: la cantidad de cal necesaria depende de la acidez intercambiable y de la CIC.",
    "Para <b>detectar sodicidad</b>: el porcentaje de sodio intercambiable (PSI) se calcula sobre la CIC; por encima de 15 % el suelo se dispersa y pierde estructura.",
    "Para <b>evaluar la vulnerabilidad a la contaminación</b>: una CIC alta retiene metales; una CIC baja los deja pasar."
  ],
  analogia: "Imagina una pared con muchos ganchos. Cada gancho puede sostener una bolsa de nutrientes. La CIC es la cantidad de ganchos que tiene la pared. Un suelo arenoso tiene pocos ganchos: las bolsas se caen y se las lleva el agua. Un suelo arcilloso con materia orgánica tiene miles de ganchos: guarda las bolsas y las entrega poco a poco.",
  datos: [
    ["Unidad", "cmol(+)/kg"],
    ["Arena", "CIC muy baja (< 5)"],
    ["Franco", "CIC media (10 – 20)"],
    ["Arcilla", "CIC alta (25 – 40)"],
    ["Materia orgánica", "CIC muy alta por unidad de masa (150 – 400)"],
    ["Saturación de bases", "(Ca + Mg + K + Na) ÷ CIC × 100"],
    ["Suelo fértil", "saturación de bases > 50 – 60 %"],
    ["PSI", "Na ÷ CIC × 100 · > 15 % indica suelo sódico"]
  ],
  interaccion: { tipo: "cic" },
  quiz: {
    pregunta: "Aplicas la misma cantidad de potasio a un suelo arenoso (CIC 4) y a uno arcilloso (CIC 30). ¿Qué esperas?",
    opciones: [
      { texto: "En el arenoso el potasio se pierde por lavado; en el arcilloso queda retenido", correcta: true,
        feedback: "Correcto. La CIC baja significa pocas posiciones de intercambio, así que el potasio queda disuelto y el agua lo arrastra. En el arcilloso hay muchas posiciones y el nutriente se retiene." },
      { texto: "En los dos queda igual porque se aplicó lo mismo", correcta: false,
        feedback: "La cantidad aplicada no es lo que determina la retención: lo que determina es cuántas posiciones de intercambio tiene el suelo. Con la misma dosis, el destino del nutriente puede ser opuesto." },
      { texto: "En el arenoso queda más tiempo porque drena menos", correcta: false,
        feedback: "El suelo arenoso drena <i>más</i>, no menos. Y justamente por eso el potasio se lava con más facilidad." }
    ]
  },
  audio: "La capacidad de intercambio catiónico, o CIC, es la cantidad de cargas negativas del suelo que pueden retener cationes como calcio, magnesio, potasio, sodio, aluminio e hidrógeno. Se expresa en centimoles de carga por kilogramo. La arcilla y la materia orgánica son los principales responsables. Un suelo arenoso tiene CIC menor a cinco, un franco entre diez y veinte, una arcilla entre veinticinco y cuarenta, y la materia orgánica puede superar ciento cincuenta. La saturación de bases es el porcentaje de posiciones ocupadas por bases. Se mide para calcular la dosis de fertilizante, decidir encalado, detectar sodicidad y evaluar la vulnerabilidad a la contaminación."
},

/* --------------------------------------------------------------- 10 ----- */
{
  id: "salinidad",
  num: 10,
  grupo: "Parámetros químicos",
  icono: "🧂",
  titulo: "Salinidad y sodicidad",
  subtitulo: "Cuando el suelo compite con la planta por el agua",
  imagen: "assets/ph.jpg",
  queEs: [
    "La <b>salinidad</b> es la cantidad de sales solubles en el suelo. Se mide con la <b>conductividad eléctrica (CE)</b> del extracto de saturación, en dS/m (decisiemens por metro). Cuanta más sal, más fácil conduce la electricidad.",
    "La <b>sodicidad</b> es otra cosa: es la proporción de sodio intercambiable respecto a la CIC, y se expresa como <b>PSI</b> (porcentaje de sodio intercambiable).",
    "Un suelo puede ser salino sin ser sódico, sódico sin ser salino, o ambas cosas. Confundirlos lleva a aplicar la enmienda equivocada: el yeso corrige sodicidad, pero no reduce la salinidad; para bajar sales hay que lavar con agua y tener drenaje."
  ],
  porQue: [
    "Hablamos de salinidad porque las sales disueltas aumentan la presión osmótica: aunque haya agua en el suelo, la planta no puede absorberla. Es como beber agua de mar: hay agua, pero el cuerpo no puede usarla.",
    "La sodicidad, en cambio, destruye la estructura: el sodio separa los agregados, el suelo se sella, pierde infiltración y se vuelve duro y alcalino."
  ],
  paraQue: [
    "Se mide para <b>decidir si se puede regar con un agua determinada</b> y para elegir cultivos tolerantes.",
    "Para <b>diseñar el lavado de sales</b> y verificar que existe drenaje suficiente (lavar sin drenar solo mueve el problema).",
    "Para <b>detectar suelos sódicos</b> y aplicar yeso en la dosis correcta.",
    "Para <b>monitorear zonas costeras</b> con intrusión marina y zonas áridas con riego intensivo."
  ],
  analogia: "Un suelo salino es como una sopa demasiado salada: hay líquido, pero nadie puede tomarla. Un suelo sódico es como una pared de ladrillos a la que le quitan el cemento: los ladrillos se sueltan, la pared se desmorona y ya no sostiene nada. Son dos problemas distintos, con soluciones distintas.",
  datos: [
    ["CE del extracto de saturación", "dS/m"],
    ["0 – 2 dS/m", "normal"],
    ["2 – 4 dS/m", "ligeramente salino"],
    ["4 – 8 dS/m", "moderadamente salino"],
    ["> 8 dS/m", "fuertemente salino"],
    ["PSI > 15 %", "suelo sódico"],
    ["Efecto de la salinidad", "estrés osmótico y toxicidad iónica"],
    ["Efecto de la sodicidad", "dispersión de arcilla, sellado, pérdida de estructura"],
    ["Corrección de sodicidad", "yeso (aporta calcio que desplaza el sodio) + lavado + drenaje"]
  ],
  interaccion: { tipo: "salinidad" },
  quiz: {
    pregunta: "Un suelo tiene CE de 1,2 dS/m y PSI de 22 %. ¿Qué problema tiene y cómo se corrige?",
    opciones: [
      { texto: "Es sódico, no salino; se corrige con yeso, lavado y drenaje", correcta: true,
        feedback: "Correcto. La CE de 1,2 está en rango normal, así que no hay exceso de sales. Pero un PSI de 22 % supera el 15 % y define un suelo sódico: el yeso aporta calcio, desplaza el sodio y el lavado lo retira, siempre con drenaje." },
      { texto: "Es salino; se corrige solo lavando con mucha agua", correcta: false,
        feedback: "La CE de 1,2 es normal, así que no es salino. Y lavar un suelo sódico sin aportar calcio puede empeorar la dispersión, porque el sodio sigue ocupando las posiciones de intercambio." },
      { texto: "No tiene ningún problema, los dos valores son bajos", correcta: false,
        feedback: "El PSI de 22 % no es bajo: el umbral de sodicidad es 15 %. Un suelo con ese valor pierde estructura, se sella y reduce la infiltración." }
    ]
  },
  audio: "La salinidad es la cantidad de sales solubles en el suelo y se mide con la conductividad eléctrica del extracto de saturación, en decisiemens por metro. La sodicidad es la proporción de sodio intercambiable respecto a la capacidad de intercambio catiónico, y se expresa como porcentaje de sodio intercambiable. Un suelo puede ser salino sin ser sódico, o sódico sin ser salino. La salinidad produce estrés osmótico: hay agua, pero la planta no puede absorberla. La sodicidad dispersa la arcilla, sella la superficie y destruye la estructura. La sodicidad se corrige con yeso, lavado y drenaje; la salinidad se corrige lavando con agua y asegurando drenaje."
},

/* --------------------------------------------------------------- 11 ----- */
{
  id: "materia-organica",
  num: 11,
  grupo: "Parámetros químicos",
  icono: "🍂",
  titulo: "Materia orgánica y carbono orgánico",
  subtitulo: "El componente que sostiene casi todo",
  imagen: "assets/ciclo.jpg",
  queEs: [
    "La <b>materia orgánica del suelo (MOS)</b> es todo el material de origen vegetal y animal que está en el suelo, en cualquier grado de descomposición: desde una hoja recién caída hasta el humus ya estabilizado. Incluye también los organismos vivos.",
    "El <b>carbono orgánico total (COT)</b> es la cantidad de carbono contenida en esa materia orgánica. Se relacionan con un factor aproximado: <b>MOS ≈ COT × 1,724</b>.",
    "En suelos agrícolas lo habitual es encontrar entre 1 % y 5 % de materia orgánica. Por encima de 20 % se habla de suelos orgánicos, y en turberas puede superar el 50 %."
  ],
  porQue: [
    "Hablamos de materia orgánica porque es el componente que más funciones cumple a la vez: retiene agua, aporta CIC, estabiliza la estructura, alimenta a los microorganismos, suministra nitrógeno, fósforo y azufre, y almacena carbono que de otro modo estaría en la atmósfera.",
    "Es también el parámetro que más rápido responde al manejo: puede perderse en pocos años por labranza intensiva, erosión o incendios, y recuperarse con prácticas adecuadas."
  ],
  paraQue: [
    "Se mide para <b>estimar la fertilidad nitrogenada</b>: buena parte del nitrógeno disponible proviene de la mineralización de la materia orgánica.",
    "Para <b>calcular la CIC efectiva</b> de suelos arenosos, donde la materia orgánica es el principal almacén de nutrientes.",
    "Para <b>monitorear degradación o recuperación</b> del suelo a lo largo del tiempo.",
    "Para <b>balances de carbono</b> y para reportar captura de carbono en proyectos ambientales."
  ],
  analogia: "La materia orgánica es como el colchón de una cama. Amortigua los golpes, guarda humedad, deja pasar el aire y hace que todo funcione con menos esfuerzo. Cuando se acaba, el suelo queda como dormir en el suelo duro: cada impacto se siente y nada se conserva.",
  datos: [
    ["Relación", "MOS ≈ COT × 1,724"],
    ["Rango agrícola habitual", "1 % – 5 %"],
    ["Suelos orgánicos", "> 20 % de materia orgánica"],
    ["Aporte a la CIC", "muy alto por unidad de masa (150 – 400 cmol/kg)"],
    ["Retención de agua", "puede retener varias veces su propio peso"],
    ["Métodos de laboratorio", "Walkley-Black (oxidación con dicromato) · combustión seca"],
    ["Qué la disminuye", "labranza intensiva, erosión, incendios, monocultivo"],
    ["Qué la aumenta", "aportes orgánicos, cobertura, rotación, menos labranza"]
  ],
  interaccion: { tipo: "materia-organica" },
  quiz: {
    pregunta: "Un análisis reporta 1,8 % de carbono orgánico. ¿Cuánta materia orgánica representa aproximadamente?",
    opciones: [
      { texto: "Alrededor de 3,1 %", correcta: true,
        feedback: "Correcto. Se multiplica por 1,724: 1,8 × 1,724 ≈ 3,1 %. Es un valor razonable para un suelo agrícola." },
      { texto: "Exactamente 1,8 %, porque son lo mismo", correcta: false,
        feedback: "No son lo mismo. El carbono orgánico es un componente de la materia orgánica; la materia orgánica contiene además oxígeno, hidrógeno, nitrógeno y otros elementos. Por eso el valor de MOS es mayor." },
      { texto: "Alrededor de 0,18 %", correcta: false,
        feedback: "Eso sería dividir en lugar de multiplicar. La materia orgánica pesa más que el carbono que contiene, así que el resultado debe ser mayor que el COT." }
    ]
  },
  audio: "La materia orgánica del suelo es todo el material de origen vegetal y animal en cualquier grado de descomposición, incluidos los organismos vivos. El carbono orgánico total es el carbono contenido en esa materia orgánica, y se relacionan con un factor aproximado de uno coma setecientos veinticuatro. En suelos agrícolas es habitual encontrar entre uno y cinco por ciento. La materia orgánica retiene agua, aporta capacidad de intercambio catiónico, estabiliza la estructura, alimenta a los microorganismos y suministra nitrógeno, fósforo y azufre. Es el parámetro que más rápido responde al manejo, tanto para degradarse como para recuperarse."
},

/* --------------------------------------------------------------- 12 ----- */
{
  id: "nutrientes",
  num: 12,
  grupo: "Parámetros químicos",
  icono: "🌿",
  titulo: "Nutrientes del suelo",
  subtitulo: "Qué necesita la planta y cómo lo obtiene",
  imagen: "assets/ciclo.jpg",
  queEs: [
    "Las plantas necesitan 17 elementos esenciales. Los <b>macronutrientes</b> se requieren en mayor cantidad: nitrógeno (N), fósforo (P), potasio (K), calcio (Ca), magnesio (Mg) y azufre (S). Los <b>micronutrientes</b> se necesitan en cantidades muy pequeñas pero son igual de indispensables: hierro (Fe), manganeso (Mn), zinc (Zn), cobre (Cu), boro (B), molibdeno (Mo), cloro (Cl) y níquel (Ni).",
    "La planta no absorbe elementos sólidos: los absorbe <b>disueltos en la solución del suelo</b>, como iones. Por eso un nutriente puede estar en el suelo y no estar disponible.",
    "Cada nutriente tiene un comportamiento distinto:<br>• El <b>nitrato</b> es muy móvil y se lava con facilidad.<br>• El <b>amonio</b> y el <b>potasio</b> quedan retenidos en las posiciones de intercambio.<br>• El <b>fósforo</b> es poco móvil y se fija con hierro y aluminio en medio ácido, o con calcio en medio alcalino."
  ],
  porQue: [
    "Hablamos de nutrientes porque la fertilidad del suelo se define por su capacidad de entregarlos en forma disponible, no por la cantidad total presente.",
    "También porque el exceso es tan problemático como la falta: el nitrógeno y el fósforo que se pierden del suelo terminan en ríos y lagos, donde provocan eutrofización (crecimiento excesivo de algas y pérdida de oxígeno)."
  ],
  paraQue: [
    "Se miden para <b>fertilizar de forma racional</b>: aplicar lo que falta, en la cantidad que falta y en el momento en que la planta lo necesita.",
    "Para <b>diagnosticar deficiencias</b> combinando análisis de suelo con análisis foliar y con la observación de síntomas.",
    "Para <b>prevenir contaminación difusa</b> por exceso de fertilizantes.",
    "Para aplicar la <b>ley del mínimo</b>: el rendimiento está limitado por el nutriente más escaso, aunque los demás estén de sobra."
  ],
  analogia: "Una planta es como una fábrica que necesita varias materias primas. Si falta una sola, la producción se detiene aunque las demás estén acumuladas en el almacén. Eso es la ley del mínimo: el nutriente más escaso fija el techo de crecimiento.",
  datos: [
    ["Macronutrientes", "N, P, K, Ca, Mg, S"],
    ["Micronutrientes", "Fe, Mn, Zn, Cu, B, Mo, Cl, Ni"],
    ["Nitrógeno", "forma nitrato (móvil, se lava) y amonio (retenido)"],
    ["Fósforo", "poco móvil; se fija con Fe y Al en ácido, con Ca en alcalino"],
    ["Potasio", "retenido en arcillas; poco lixiviado"],
    ["Ley del mínimo", "el nutriente más escaso limita el rendimiento"],
    ["Exceso de N y P", "eutrofización de ríos y lagos"],
    ["Diagnóstico", "análisis de suelo + análisis foliar + síntomas visuales"]
  ],
  interaccion: { tipo: "nutrientes" },
  quiz: {
    pregunta: "Las hojas nuevas salen amarillas entre las nervaduras, que permanecen verdes, y el síntoma aparece en las hojas jóvenes. ¿Qué deficiencia es más probable?",
    opciones: [
      { texto: "Hierro (Fe)", correcta: true,
        feedback: "Correcto. El hierro no se mueve dentro de la planta, así que los síntomas aparecen primero en las hojas nuevas: clorosis entre nervaduras que siguen verdes. Se agrava en suelos alcalinos, donde el hierro se vuelve insoluble." },
      { texto: "Nitrógeno (N)", correcta: false,
        feedback: "El nitrógeno es móvil dentro de la planta: cuando falta, la planta lo traslada de las hojas viejas a las nuevas. Por eso el amarilleo general aparece primero en las hojas viejas, no en las jóvenes." },
      { texto: "Potasio (K)", correcta: false,
        feedback: "La falta de potasio suele mostrar bordes y puntas de hojas quemadas, no clorosis entre nervaduras. Y también empieza en hojas maduras." }
    ]
  },
  audio: "Las plantas necesitan diecisiete elementos esenciales. Los macronutrientes son nitrógeno, fósforo, potasio, calcio, magnesio y azufre. Los micronutrientes son hierro, manganeso, zinc, cobre, boro, molibdeno, cloro y níquel. La planta absorbe los nutrientes disueltos en la solución del suelo, como iones. El nitrato es muy móvil y se lava, el amonio y el potasio quedan retenidos, y el fósforo es poco móvil. La ley del mínimo dice que el nutriente más escaso limita el rendimiento. Se miden para fertilizar de forma racional y para prevenir la contaminación por exceso de nitrógeno y fósforo."
},

/* --------------------------------------------------------------- 13 ----- */
{
  id: "contaminacion",
  num: 13,
  grupo: "Contaminación y remediación",
  icono: "⚠️",
  titulo: "Contaminación del suelo",
  subtitulo: "Cómo llega, cómo se mueve y por qué importa",
  imagen: "assets/contaminacion.jpg",
  queEs: [
    "La contaminación del suelo es la presencia de una sustancia o un organismo en concentración tal que produce efectos negativos sobre la salud humana, los ecosistemas o el uso del terreno.",
    "Las fuentes más frecuentes son: actividad industrial, minería, agroquímicos, derrames de hidrocarburos, residuos sólidos, lodos y aguas residuales, y deposición atmosférica.",
    "Hay dos grandes familias de contaminantes:<br>• <b>Inorgánicos</b>: metales y metaloides como plomo, cadmio, arsénico, mercurio, cobre y zinc. No se degradan: se transforman de forma, pero permanecen.<br>• <b>Orgánicos</b>: hidrocarburos, plaguicidas, disolventes. Muchos pueden degradarse por acción biológica si las condiciones lo permiten."
  ],
  porQue: [
    "Hablamos de contaminación porque el suelo es el primer receptor y también el principal filtro. Lo que retiene puede quedar décadas; lo que no retiene pasa al agua subterránea, que es difícil y costosa de recuperar.",
    "Además, el contaminante no siempre está disponible para los seres vivos: la <b>concentración total</b> dice cuánto hay, pero la <b>biodisponibilidad</b> dice cuánto puede entrar al organismo. Esa diferencia es central para evaluar el riesgo real."
  ],
  paraQue: [
    "Se estudia para <b>evaluar el riesgo</b>: qué contaminante, en qué concentración, en qué forma química, con qué vías de exposición y con qué población expuesta.",
    "Para <b>decidir si el sitio requiere intervención</b> y con qué urgencia, comparando con los valores de referencia de la normativa aplicable.",
    "Para <b>diseñar la remediación</b>: el comportamiento del contaminante (movilidad, solubilidad, persistencia) determina qué técnica funciona y cuál no.",
    "Para <b>vigilar el sedimento de los ríos</b>, que actúa como archivo histórico de la contaminación de una cuenca."
  ],
  analogia: "Un suelo contaminado es como una esponja que absorbió tinta. Si la esponja es densa y con muchos ganchos, retiene la tinta y no la suelta: el problema queda contenido. Si la esponja es suelta y el agua corre, la tinta se dispersa y llega a todo lo que esté abajo. La textura, la materia orgánica y el pH deciden cuál de los dos casos ocurre.",
  datos: [
    ["Contaminantes inorgánicos", "Pb, Cd, As, Hg, Cu, Zn, Cr · no se degradan"],
    ["Contaminantes orgánicos", "hidrocarburos, plaguicidas, disolventes · pueden biodegradarse"],
    ["Movilidad depende de", "pH, CIC, textura, materia orgánica, potencial redox, solubilidad"],
    ["pH bajo", "aumenta la movilidad de muchos metales"],
    ["CIC y materia orgánica altas", "retienen metales y reducen su movilidad"],
    ["Vías de exposición", "ingestión, inhalación, contacto dérmico, cadena alimentaria"],
    ["Concepto clave", "biodisponibilidad ≠ concentración total"],
    ["Sedimento", "acumula contaminantes en la fracción fina y en la materia orgánica"]
  ],
  interaccion: { tipo: "contaminacion" },
  quiz: {
    pregunta: "En un suelo ácido y arenoso se derrama un contaminante metálico. En un suelo calcáreo y arcilloso se derrama el mismo. ¿Cuál representa mayor riesgo para el agua subterránea?",
    opciones: [
      { texto: "El ácido y arenoso, porque retiene poco y el metal es más móvil", correcta: true,
        feedback: "Correcto. En pH bajo muchos metales se solubilizan, y una CIC baja con textura gruesa deja pocas posiciones de retención. El resultado es mayor lixiviación hacia el agua subterránea." },
      { texto: "El calcáreo y arcilloso, porque tiene más material", correcta: false,
        feedback: "Más material significa más capacidad de retención, no más riesgo. En un suelo calcáreo y arcilloso el metal tiende a precipitar y a quedar adsorbido, reduciendo su movilidad." },
      { texto: "Los dos igual, el metal es el mismo", correcta: false,
        feedback: "El contaminante es el mismo, pero el comportamiento depende del suelo. El pH, la textura y la CIC cambian por completo su movilidad y su riesgo." }
    ]
  },
  audio: "La contaminación del suelo es la presencia de una sustancia en concentración tal que produce efectos negativos sobre la salud, los ecosistemas o el uso del terreno. Las fuentes más frecuentes son la industria, la minería, los agroquímicos, los derrames de hidrocarburos y los residuos. Los contaminantes inorgánicos, como los metales, no se degradan. Los orgánicos, como los hidrocarburos, pueden biodegradarse. La movilidad depende del pH, la capacidad de intercambio catiónico, la textura y la materia orgánica. En pH bajo muchos metales se vuelven más móviles. La concentración total no es lo mismo que la biodisponibilidad, y el sedimento de los ríos acumula contaminantes en la fracción fina."
},

/* --------------------------------------------------------------- 14 ----- */
{
  id: "remediacion",
  num: 14,
  grupo: "Contaminación y remediación",
  icono: "🌻",
  titulo: "Remediación de suelos",
  subtitulo: "Técnicas para devolverle función al suelo",
  imagen: "assets/remediacion.jpg",
  queEs: [
    "La remediación es el conjunto de técnicas que buscan reducir la concentración, la movilidad o la toxicidad de un contaminante hasta niveles aceptables para el uso previsto del terreno.",
    "Se agrupan en tres enfoques:<br>• <b>Contención</b>: impedir que el contaminante se mueva (barreras, coberturas, estabilización).<br>• <b>Tratamiento</b>: transformar o extraer el contaminante (biológico, químico, térmico, físico).<br>• <b>Atenuación natural</b>: dejar que los procesos del propio suelo lo degraden o inmovilicen, con monitoreo.",
    "Y según dónde se aplican: <b>in situ</b> (en el sitio, sin excavar) o <b>ex situ</b> (extrayendo el material y tratándolo aparte)."
  ],
  porQue: [
    "Hablamos de remediación porque un suelo contaminado no es un caso perdido, pero tampoco existe una técnica universal. La elección depende del contaminante, del suelo, del plazo, del presupuesto y del uso futuro del terreno.",
    "También porque cada técnica tiene límites reales: la fitorremediación es económica y amable con el entorno, pero lenta y limitada a la profundidad de las raíces; la excavación es rápida pero costosa y destructiva."
  ],
  paraQue: [
    "Se estudia para <b>elegir la técnica adecuada</b> con criterios técnicos y no por moda o por costo inicial.",
    "Para <b>estimar plazos y costos</b> con realismo antes de comprometer recursos.",
    "Para <b>definir el criterio de cierre</b>: qué concentración residual se considera aceptable y cómo se verifica.",
    "Para <b>evitar daños colaterales</b>: una técnica mal elegida puede dispersar el contaminante o destruir la biología del suelo."
  ],
  analogia: "Remediar un suelo es como limpiar una esponja empapada de aceite. Puedes apretarla (extraer), puedes dejarla al sol para que se evapore (degradar), puedes sembrar plantas que lo absorban (fitorremediación) o puedes sellarla en un recipiente para que no ensucie nada más (contención). Cada opción sirve para un caso distinto, y ninguna es gratis.",
  datos: [
    ["Fitoextracción", "las plantas acumulan el metal y se cosechan · lenta · superficial"],
    ["Fitoestabilización", "las raíces inmovilizan el contaminante · evita dispersión"],
    ["Rizodegradación", "microorganismos de la rizosfera degradan orgánicos · in situ"],
    ["Biorremediación", "microorganismos + condiciones óptimas (O₂, nutrientes, humedad)"],
    ["Estabilización química", "enmiendas como cal, fosfatos o biochar reducen movilidad"],
    ["Lavado de suelo", "extracción con solución · ex situ · costoso"],
    ["Solidificación / estabilización", "inmoviliza el contaminante en una matriz sólida"],
    ["Criterio de cierre", "concentración residual frente al objetivo del uso del suelo"]
  ],
  interaccion: { tipo: "remediacion" },
  quiz: {
    pregunta: "Se necesita reducir plomo en un huerto urbano en el plazo de un año, sin excavar. ¿Qué opción es más razonable?",
    opciones: [
      { texto: "Estabilización con enmiendas (fosfatos, compost, cal) y control de exposición", correcta: true,
        feedback: "Correcto. En un año, la fitoextracción no alcanza a reducir el plomo de forma significativa. La estabilización reduce la biodisponibilidad y la movilidad rápido, y se combina con medidas de exposición (cobertura, lavado de hortalizas, uso de camas elevadas)." },
      { texto: "Sembrar plantas hiperacumuladoras y esperar", correcta: false,
        feedback: "La fitoextracción funciona, pero es lenta: suele requerir varios ciclos de cultivo y años. En un plazo de doce meses no alcanza a bajar el plomo de forma apreciable." },
      { texto: "Lavar el suelo con agua abundante", correcta: false,
        feedback: "El lavado con agua no remueve el plomo, que es poco soluble. Además puede movilizar otros elementos y generar un efluente que hay que tratar." }
    ]
  },
  audio: "La remediación busca reducir la concentración, la movilidad o la toxicidad de un contaminante hasta niveles aceptables para el uso del terreno. Se agrupa en contención, tratamiento y atenuación natural, y puede aplicarse in situ o ex situ. Entre las técnicas están la fitoextracción, la fitoestabilización, la rizodegradación, la biorremediación, la estabilización química, el lavado de suelo y la solidificación. La elección depende del contaminante, del tipo de suelo, del plazo, del presupuesto y del uso futuro del terreno. La fitorremediación es económica pero lenta; la excavación es rápida pero costosa y destructiva."
},

/* --------------------------------------------------------------- 15 ----- */
{
  id: "cierre",
  num: 15,
  grupo: "Contaminación y remediación",
  icono: "🎯",
  titulo: "Fertilidad y vulnerabilidad",
  subtitulo: "Cómo se integran todos los parámetros",
  imagen: "assets/portada.jpg",
  queEs: [
    "La <b>fertilidad</b> es la capacidad del suelo de suministrar nutrientes y agua en formas disponibles para las plantas. No es lo mismo que productividad: la productividad también depende del clima, la variedad cultivada y el manejo.",
    "La <b>vulnerabilidad</b> es la sensibilidad del suelo a degradarse: a erosionarse, compactarse, acidificarse, salinizarse, perder materia orgánica o dejar pasar contaminantes.",
    "Los dos conceptos se conectan: un suelo puede ser fértil y a la vez muy vulnerable. Un suelo arcilloso con alta CIC retiene nutrientes, pero también es propenso a compactarse y a encharcarse."
  ],
  porQue: [
    "Hablamos de esto al final porque es el punto donde todos los parámetros dejan de ser datos aislados y empiezan a contar una historia. El pH, la textura, la CIC, la materia orgánica y la densidad no se interpretan por separado: se leen juntos.",
    "Y porque la decisión correcta casi nunca es «mejorar un número», sino encontrar el equilibrio para el uso que se le va a dar al terreno."
  ],
  paraQue: [
    "Se integra para <b>decidir el uso del suelo</b>: agrícola, forestal, urbano, conservación o restauración.",
    "Para <b>priorizar intervenciones</b> cuando hay recursos limitados: atacar primero el factor más limitante.",
    "Para <b>anticipar problemas</b>: un suelo arenoso con fertilización intensiva es una amenaza para el agua subterránea aunque hoy produzca bien.",
    "Para <b>monitorear</b> con indicadores y detectar tendencias antes de que el daño sea irreversible."
  ],
  analogia: "El suelo es como una cuenta bancaria. La CIC y la materia orgánica son el saldo disponible. Los nutrientes son los ingresos y los retiros. El pH es la comisión que cobra el banco: si es muy alta, cada operación cuesta más. Y la vulnerabilidad es la facilidad con que alguien puede sacarte el dinero sin que lo notes.",
  datos: [
    ["Fertilidad", "capacidad de entregar nutrientes y agua disponibles"],
    ["Vulnerabilidad", "sensibilidad a erosión, compactación, acidificación, salinización, contaminación"],
    ["Suelo arcilloso", "alta CIC y retención · riesgo de compactación y anoxia"],
    ["Suelo arenoso", "buen drenaje · riesgo de lixiviación de nitratos"],
    ["Indicadores integrados", "materia orgánica, CIC, pH, CE, densidad aparente, profundidad efectiva"],
    ["Regla práctica", "primero el factor más limitante, no el número más llamativo"],
    ["Escala temporal", "el suelo cambia en años; la roca, en millones de años"],
    ["Idea central", "el suelo es un sistema con memoria"]
  ],
  interaccion: { tipo: "integrador" },
  quiz: {
    pregunta: "Un suelo arenoso, con 1 % de materia orgánica, pH 6,0 y CIC 4, recibe altas dosis de nitrato cada año. ¿Cuál es el riesgo principal?",
    opciones: [
      { texto: "Que el nitrato se lave y contamine el agua subterránea", correcta: true,
        feedback: "Correcto. La textura gruesa, la CIC baja y la materia orgánica escasa dejan el nitrato disuelto y sin retención. Con riego o lluvia, el nitrato baja hacia el acuífero. Es un suelo fértil en apariencia y muy vulnerable en la práctica." },
      { texto: "Que el suelo se compacte y se encharque", correcta: false,
        feedback: "La compactación es un riesgo típico de suelos arcillosos o con tráfico pesado. En un suelo arenoso el problema va en la dirección opuesta: el agua drena demasiado y arrastra lo que hay disuelto." },
      { texto: "Que suba el pH por el nitrato", correcta: false,
        feedback: "El pH no sube de forma relevante por aplicar nitrato. El riesgo dominante en este caso es la lixiviación, no un cambio de pH." }
    ]
  },
  audio: "La fertilidad es la capacidad del suelo de suministrar nutrientes y agua en formas disponibles para las plantas, y no es lo mismo que productividad. La vulnerabilidad es la sensibilidad del suelo a degradarse: a erosionarse, compactarse, acidificarse, salinizarse, perder materia orgánica o dejar pasar contaminantes. Los dos conceptos se conectan: un suelo puede ser fértil y a la vez muy vulnerable. Al final, los parámetros no se interpretan por separado, sino juntos. La decisión correcta no es mejorar un número, sino encontrar el equilibrio para el uso que se le va a dar al terreno."
}
];

const GRUPOS = ["Fundamentos", "Composición", "Parámetros físicos", "Parámetros químicos", "Contaminación y remediación"];
