<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Leitura dos Arcanos</title>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    color: white;
    background:
      radial-gradient(circle at top, #5b21b6, transparent 35%),
      radial-gradient(circle at bottom, #111827, #020617 70%);
    padding: 20px;
  }

  .app {
    max-width: 480px;
    margin: auto;
  }

  .card {
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 28px;
    padding: 24px;
    box-shadow: 0 0 35px rgba(168,85,247,0.35);
    backdrop-filter: blur(12px);
  }

  h1 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 5px;
  }

  .sub {
    text-align: center;
    opacity: 0.8;
    margin-bottom: 25px;
  }

  input, button {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    margin-top: 10px;
  }

  button {
    background: linear-gradient(135deg, #facc15, #fb7185);
    font-weight: bold;
    color: #111;
    cursor: pointer;
  }

  .resultado {
    display: none;
    margin-top: 25px;
    animation: surgir .4s ease;
  }

  @keyframes surgir {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .arcano-img {
    width: 230px;
    max-width: 100%;
    border-radius: 18px;
    display: block;
    margin: 20px auto;
    box-shadow: 0 0 30px rgba(255,255,255,0.25);
  }

  .nome {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }

  .numero {
    text-align: center;
    opacity: 0.7;
    margin-bottom: 8px;
  }

  .bloco {
    background: rgba(0,0,0,0.32);
    padding: 16px;
    border-radius: 18px;
    margin-top: 14px;
    line-height: 1.5;
  }

  .bloco strong {
    color: #facc15;
  }

  .footer {
    text-align: center;
    margin-top: 18px;
    opacity: 0.6;
    font-size: 13px;
  }
</style>
</head>

<body>
<div class="app">
  <div class="card">
    <h1>🔮 Leitura do Arcano</h1>
    <p class="sub">Descubra seu arcano pessoal pela data de nascimento</p>

    <input type="date" id="data">
    <button onclick="tirarCarta()">Revelar meu arcano</button>

    <div class="resultado" id="resultado">
      <div class="numero" id="numero"></div>
      <div class="nome" id="nome"></div>
      <img class="arcano-img" id="imagem">

      <div class="bloco"><strong>Essência:</strong><br><span id="essencia"></span></div>
      <div class="bloco"><strong>Amor:</strong><br><span id="amor"></span></div>
      <div class="bloco"><strong>Trabalho:</strong><br><span id="trabalho"></span></div>
      <div class="bloco"><strong>Sombra:</strong><br><span id="sombra"></span></div>
      <div class="bloco"><strong>Conselho:</strong><br><span id="conselho"></span></div>
    </div>

    <div class="footer">Projeto feito em HTML, CSS e JavaScript</div>
  </div>
</div>

<script>
const cartas = [
{
numero: 0,
nome: "O Louco",
img: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
essencia: "Liberdade, começo, curiosidade e coragem para entrar no desconhecido.",
amor: "Pode indicar leveza, novas experiências e relações sem tanta pressão.",
trabalho: "Momento de experimentar, iniciar projetos e aprender fazendo.",
sombra: "Impulsividade, falta de responsabilidade e decisões sem pensar.",
conselho: "Arrisque, mas não vá completamente no escuro."
},
{
numero: 1,
nome: "O Mago",
img: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
essencia: "Ação, inteligência, comunicação e poder de transformar ideias em realidade.",
amor: "Mostra magnetismo, atitude e poder de conquista.",
trabalho: "Ótimo para começar algo, vender uma ideia ou usar seus talentos.",
sombra: "Manipulação, ego e promessas vazias.",
conselho: "Use o que você já tem nas mãos."
},
{
numero: 2,
nome: "A Sacerdotisa",
img: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
essencia: "Mistério, intuição, silêncio e conhecimento oculto.",
amor: "Pode indicar sentimentos escondidos ou necessidade de observar mais.",
trabalho: "Use estratégia, estudo e percepção antes de agir.",
sombra: "Frieza, passividade e guardar demais o que sente.",
conselho: "Escute sua intuição, mas procure fatos também."
},
{
numero: 3,
nome: "A Imperatriz",
img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
essencia: "Criação, beleza, crescimento, afeto e abundância.",
amor: "Energia de carinho, atração e conexão emocional.",
trabalho: "Fase fértil para projetos criativos e expansão.",
sombra: "Carência, excesso de conforto ou dependência emocional.",
conselho: "Cuide do que você quer ver crescer."
},
{
numero: 4,
nome: "O Imperador",
img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
essencia: "Ordem, autoridade, disciplina, estrutura e proteção.",
amor: "Busca segurança e relações mais estáveis.",
trabalho: "Pede liderança, planejamento e responsabilidade.",
sombra: "Controle excessivo, rigidez e orgulho.",
conselho: "Construa com firmeza, mas sem endurecer o coração."
},
{
numero: 5,
nome: "O Hierofante",
img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
essencia: "Sabedoria, tradição, estudo, fé e orientação.",
amor: "Pode indicar compromisso, valores em comum e aprendizado.",
trabalho: "Bom para estudar, ensinar ou seguir um método.",
sombra: "Dogmatismo, medo de sair do padrão e julgamento.",
conselho: "Aprenda com quem sabe, mas pense por si."
},
{
numero: 6,
nome: "Os Enamorados",
img: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
essencia: "Escolhas, desejo, união, conexão e dualidade.",
amor: "Carta forte de atração, vínculo e decisões afetivas.",
trabalho: "Pede escolher um caminho com mais consciência.",
sombra: "Indecisão, dependência e conflito entre razão e vontade.",
conselho: "Escolha o que combina com seus valores."
},
{
numero: 7,
nome: "O Carro",
img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
essencia: "Vitória, foco, direção, movimento e determinação.",
amor: "Mostra atitude, conquista e avanço.",
trabalho: "Hora de agir com disciplina e perseguir metas.",
sombra: "Pressa, teimosia e vontade de controlar tudo.",
conselho: "Escolha uma direção e vá com firmeza."
},
{
numero: 8,
nome: "A Justiça",
img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
essencia: "Equilíbrio, verdade, consequências e decisões justas.",
amor: "Pede honestidade, clareza e responsabilidade afetiva.",
trabalho: "Bom para contratos, provas, decisões e organização.",
sombra: "Frieza, cobrança exagerada e julgamento duro.",
conselho: "Seja justo consigo e com os outros."
},
{
numero: 9,
nome: "O Eremita",
img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
essencia: "Busca interior, sabedoria, silêncio e maturidade.",
amor: "Pode indicar fase de reflexão ou necessidade de espaço.",
trabalho: "Estudo profundo, análise e aperfeiçoamento.",
sombra: "Isolamento, distância emocional e excesso de solidão.",
conselho: "A resposta pode aparecer quando você desacelera."
},
{
numero: 10,
nome: "A Roda da Fortuna",
img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
essencia: "Mudanças, ciclos, destino e viradas inesperadas.",
amor: "Algo pode mudar rapidamente na dinâmica emocional.",
trabalho: "Fase de oportunidades, altos e baixos e movimento.",
sombra: "Instabilidade e depender só da sorte.",
conselho: "Adapte-se ao ciclo sem perder o centro."
},
{
numero: 11,
nome: "A Força",
img: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
essencia: "Coragem, autocontrole, intensidade e domínio interior.",
amor: "Paixão forte, mas pede paciência e cuidado.",
trabalho: "Persistência, resistência e capacidade de lidar com pressão.",
sombra: "Orgulho, explosões emocionais e tentar dominar tudo.",
conselho: "A verdadeira força é saber se controlar."
},
{
numero: 12,
nome: "O Enforcado",
img: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
essencia: "Pausa, sacrifício, nova visão e entrega.",
amor: "Pode indicar espera, dúvida ou necessidade de ver a situação diferente.",
trabalho: "Nem tudo anda agora; observe antes de forçar.",
sombra: "Estagnação, vitimismo e falta de atitude.",
conselho: "Mude a forma de olhar o problema."
},
{
numero: 13,
nome: "A Morte",
img: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
essencia: "Transformação, fim de ciclo, desapego e renascimento.",
amor: "Algo precisa mudar para a relação evoluir ou terminar bem.",
trabalho: "Encerramento de fase e abertura para algo novo.",
sombra: "Medo de mudar e apego ao que já acabou.",
conselho: "Deixe morrer o que não faz mais sentido."
},
{
numero: 14,
nome: "A Temperança",
img: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
essencia: "Equilíbrio, cura, paciência e harmonia.",
amor: "Pede calma, diálogo e construção aos poucos.",
trabalho: "Bom para ajustar planos e unir habilidades.",
sombra: "Morno demais, evitar decisões e excesso de adaptação.",
conselho: "Misture razão e emoção na medida certa."
},
{
numero: 15,
nome: "O Diabo",
img: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
essencia: "Desejo, intensidade, magnetismo e tentações.",
amor: "Atração forte, ciúme ou vínculos difíceis de soltar.",
trabalho: "Ambição e poder material, mas cuidado com excessos.",
sombra: "Dependência, obsessão, manipulação e vícios emocionais.",
conselho: "Veja onde você está preso e recupere seu controle."
},
{
numero: 16,
nome: "A Torre",
img: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
essencia: "Quebra, revelação, choque e reconstrução.",
amor: "Verdades podem vir à tona; estruturas frágeis caem.",
trabalho: "Mudança brusca, crise ou necessidade de recomeçar.",
sombra: "Resistir à verdade e tentar manter algo falso.",
conselho: "O que cai abre espaço para algo mais real."
},
{
numero: 17,
nome: "A Estrela",
img: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
essencia: "Esperança, inspiração, cura e brilho próprio.",
amor: "Afeto leve, confiança e renovação emocional.",
trabalho: "Criatividade, visibilidade e fé no futuro.",
sombra: "Ilusão, esperar demais sem agir.",
conselho: "Acredite, mas dê passos concretos."
},
{
numero: 18,
nome: "A Lua",
img: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
essencia: "Mistério, sonho, medo, imaginação e inconsciente.",
amor: "Sentimentos confusos, insegurança ou coisas não ditas.",
trabalho: "Cuidado com enganos, ansiedade e falta de clareza.",
sombra: "Paranoia, ilusão e se perder nas próprias emoções.",
conselho: "Nem tudo que você sente é fato."
},
{
numero: 19,
nome: "O Sol",
img: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
essencia: "Alegria, clareza, sucesso, vitalidade e confiança.",
amor: "Relação clara, leve e com energia positiva.",
trabalho: "Reconhecimento, crescimento e bons resultados.",
sombra: "Ego, excesso de exposição e ingenuidade.",
conselho: "Mostre sua luz sem apagar ninguém."
},
{
numero: 20,
nome: "O Julgamento",
img: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
essencia: "Despertar, chamado, decisão e renascimento.",
amor: "Conversas importantes, retorno de assuntos e decisões finais.",
trabalho: "Momento de avaliação, mudança de rota e resposta.",
sombra: "Culpa, medo de decidir e viver preso ao passado.",
conselho: "Responda ao chamado da sua própria evolução."
},
{
numero: 21,
nome: "O Mundo",
img: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
essencia: "Conclusão, realização, expansão e integração.",
amor: "Relação madura, ciclo completo ou fechamento necessário.",
trabalho: "Finalização de projetos, reconhecimento e novas possibilidades.",
sombra: "Medo de encerrar ciclos ou achar que já sabe tudo.",
conselho: "Celebre o que terminou e prepare o próximo nível."
}
];

function reduzirParaArcano(numero) {
  while (numero > 21) {
    numero = String(numero)
      .split("")
      .reduce((soma, digito) => soma + Number(digito), 0);
  }
  return numero;
}

function tirarCarta() {
  const data = document.getElementById("data").value;

  if (!data) {
    alert("Coloca uma data primeiro");
    return;
  }

  const numeros = data.replaceAll("-", "");
  let soma = 0;

  for (let n of numeros) {
    soma += Number(n);
  }

  const arcano = reduzirParaArcano(soma);
  const carta = cartas.find(c => c.numero === arcano);

  document.getElementById("resultado").style.display = "block";
  document.getElementById("numero").innerText = "Arcano " + carta.numero;
  document.getElementById("nome").innerText = carta.nome;
  document.getElementById("imagem").src = carta.img;
  document.getElementById("essencia").innerText = carta.essencia;
  document.getElementById("amor").innerText = carta.amor;
  document.getElementById("trabalho").innerText = carta.trabalho;
  document.getElementById("sombra").innerText = carta.sombra;
  document.getElementById("conselho").innerText = carta.conselho;
}
</script>
</body>
</html>
