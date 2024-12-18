
// oi

/* -------------- Como esse código funciona? -------------- */
// 
// São 6 variáveis que podem ser trocadas toda vez que se gera um novo encontro (sujeito, ação, local, amigo, objeto e evento)
// Essas 6 variáveis tem uma array própria, com as possíveis variações de cada
// Cada variável tem duas funções "get..." e "mostrar..."
// A "get" sorteia um número aleatório e apartir desse numero uma variação que está na array é escolhida e chama a "mostrar"
// O "mostrar" substitui o HTML do codigo principal pela variação escolhida
//
//  Fim
//
// Mas vale a pena falar que tem certas variáveis que tem casos especiais (como "role novamente e pegue duas variações" ou "criatura do elemento tal") e pra isso eu coloquei como "placeholder" nas arrays e coloquei uns ifs dentro do "get" que faz o código funcionar bunitinho
//
// Também tem as funções gerais, que eu expliquei mais pra frente

/* -------------- Funções gerais -------------- */ 

function gerarNumeroAleatorio(min, max){
    
    min = Math.ceil(min);
    max = Math.floor(max);
    //.ceil e .floor arredondam um numero (pra baixo ou pra cima) ((serve pra funcao nao ler numeros quebrados))
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getEncontro(){
    getSujeito();
    getAcao();
    getLocal();
    getAmigo();
    getObjeto();
    getEvento();
}

// pega um elemento (sangue, conhecimento, energia, morte) da array de elementos
function getElemento(){
    
    const i = gerarNumeroAleatorio(0, 3);

    return elementos[i];

}

/* -------------- Listas(arrays) -------------- */ 

const elementos = [
    "sangue",
    "conhecimento",
    "energia",
    "morte"
];

const sujeitos = [
    `inocente curioso`, 
    `criminoso`, 
    `bando cultista`, 
    `item amaldiçoado`, 
    `político`,   
    `ex-agente da Ordo Realitas`,   
    `cultista independente`,   
    `placeholder` // Tem que ser placeholder pq aqui o sujeito é "Uma criatura de <elemento>" e tem 4 elementos possiveis
];

const acoes = [
    `está assassinando inocentes`,
    `está sequestrando inocentes`,
    `está usando um ritual ou item amaldiçoado para cometer crimes mundanos`,
    `está recrutando cultistas`,
    `está pesquisando um ritual perigoso`,
    `está coletando itens amaldiçoados`,
    `matou um agente da Ordo Realitas`,
    `placeholder`, // Esse e o próximo tem que ser placeholder pq envolve elemento de criaturas
    `placeholder`,
    `placeholder` // Tem que ser placeholder pq aqui é "Role o dado novamente e pegue duas ações"
]

const locais = [
    "placeholder", // Tem que ser placeholder pq aqui é "Role o dado novamente e pegue dois  locais"
    "mata fechada",
    "becos de metrópole",
    "ilha remota",
    "esgoto",
    "antiga sede da Ordo Realitas",
    "cemitério", 
    "delegacia", // daqui pra frente os locais podem ser habitados ou inabitados (7)
    "escola",
    "hospital",
    "vilarejo",
    "fazenda",
    "arranha-céu",
    "grande loja de departamento",
    "zona industrial da cidade",
    "shopping center",
    "orfanato",
    "museu",
    "mansão",
    "navio",
    "base militar"
]

const amigos = [
    "civil alheio ao paranormal",
    "civil exposto ao paranormal",
    "amigo conhecido de um dos agentes",
    "agente aposentado da Ordo Realitas",
    "agente da Ordo Realitas"
]

const objetos = [
    `placeholder`, // role duas vezes e pá
    `ingrediente para um ritual poderoso`,
    `artefato com grande valor para a Ordem`,
    `uma arma`,
    `uma proteção`,
    `um equipamento geral ou acessório`,
]

const eventos = [
    "o aparecimento de uma/outra criatura paranormal de grande poder",
    "a chegada de reforços inimigos",
    "uma doença paranormal/maldição afetando algum aliado",
    "civis se revoltando contra eles",
    "a revelação de que algum aliado era um vilão",
    "a revelação de que as açoes de algum inimigo eram justificadas",
    "perda de sers equipamentos (roubo, furto, falha tecnológica",
    "ter que proteger um civil",
    "perda de comunicação com Ordo Realitas e acesso ao sistema de crédito",
    "agentes da leis os importunando",
    "um desastre (incêndio, tempestade, furacão, blecaute, agitação civil)",
    "o aparecimento de um antigo inimigo"
]

/* -------------- Funções -------------- */ 

function getSujeito(){

    let sujeitoSorteado;

    const novoSujeito = document.getElementById("sujeito");
    novoSujeito.innerHTML = "";

    const caso = gerarNumeroAleatorio(0, sujeitos.length - 1);

    if(caso == 7) { // Decidir o elemento da criatura
        
        sujeitoSorteado = `criatura de ${getElemento()}`;
        
    }   else {
        
        sujeitoSorteado = sujeitos[caso];
    }

    novoSujeito.innerHTML = mostrarSujeito(sujeitoSorteado);

    /* 
    Explicação dessa função:
        tem três variáveis aqui, caso, sujeitoSorteado e novoSujeito

          - Se você tivesse rolando um dado, "caso" seria o resultado do dado, e o sujeito é decidido com base nisso (caso é o index da array "sujeitos")
          - sujeitoSorteado é a mensagem (o sujeito) que vai aparecer no site
          - novoSujeito é a variavel que vai receber o conteudo de sujeitoSorteado e mandar pro html mostrar no site

        sujeitoSorteado e novoSujeito precisam ser duas variaveis diferentes porque o "getElementById" (que é armazenada na variavel novoSujeito) seria subsitituido pela mensagem da array "sujeitos" (que é armazenada na variável sujeitoSorteado)
    */
}

function getAcao(){
    
    let acaoSorteada;
    let mensagem1;
    let mensagem2;
    
    const novaAcao = document.getElementById("acao");
    novaAcao.innerHTML = "";
    
    let caso = gerarNumeroAleatorio(0, acoes.length - 1);
    
    if (caso == 9) { // "Role duas vezes e combine os resultados"
        
        caso = gerarNumeroAleatorio(0, 8);
        mensagem1 = acoes[caso];
        
        acoes.splice(caso, 1),
        
        caso = gerarNumeroAleatorio(0, 7);
        mensagem2 = acoes[caso];
        
        acoes.push(mensagem1);
        
        mensagem1 += " e ";    
        acaoSorteada = mensagem1 + mensagem2;

    } else if (caso == 8) { // Decidir o elemento da criatura

        acaoSorteada = `invocou, proprositalmente, uma criatura de ${getElemento()}`;
        
    } else if (caso == 7) { // Decidir o elemento da criatura
        
        acaoSorteada = `invocou, sem querer, uma criatura de ${getElemento()}`;
        
    } else { 
        
        acaoSorteada = acoes[caso];
        
    }
    
    novaAcao.innerHTML = mostrarAcao(acaoSorteada);
    
}

function getLocal(){

    let localSorteado;
    let mensagem1;
    let mensagem2;

    const novoLocal = document.getElementById("local");
    novoLocal.innerHTML = "";

    // Sorteia o índice inicial
    const caso = gerarNumeroAleatorio(0, locais.length - 1);

    if (caso === 0) { // Caso especial: combine dois locais

        // Sorteia dois índices diferentes
        let segundoIndice;
        let primeiroIndice;
        
        primeiroIndice = gerarNumeroAleatorio(1, locais.length - 1);

        do {
            segundoIndice = gerarNumeroAleatorio(1, locais.length - 1);
        } while (segundoIndice === primeiroIndice);

        mensagem1 = locais[primeiroIndice];
        mensagem2 = locais[segundoIndice];

        if(primeiroIndice >= 7) { // vê se um dos locais é inabitado ou não
            if(gerarNumeroAleatorio(1, 2) === 2){
                mensagem1 += ` inabitado(a)`;
            }
        }

        if(segundoIndice >= 7) { // vê se um dos locais é inabitado ou não
            if(gerarNumeroAleatorio(1, 2) === 2){
                mensagem2 += ` inabitado(a)`;
            }
        }

        localSorteado = `${mensagem1} e ${mensagem2}`;

    } else {

        // Caso padrão: sorteia apenas um local
        localSorteado = locais[caso];

        if(caso >= 7) { // vê se o local é inabitado ou não
            if(gerarNumeroAleatorio(1, 2) === 2){
                localSorteado += ` inabitado(a)`;
            }
        }
    }

    novoLocal.innerHTML = mostrarLocal(localSorteado);
}

function getAmigo(){

    let amigoSorteado;

    const novoAmigo = document.getElementById("amigo");
    novoAmigo.innerHTML = "";

    const caso = gerarNumeroAleatorio(0, amigos.length - 1);

    amigoSorteado = amigos[caso];

    novoAmigo.innerHTML = mostrarAmigo(amigoSorteado);

}

function getObjeto(){

    let objetoSorteado;

    const novoObjeto = document.getElementById("objeto");
    novoObjeto.innerHTML = "";

    const caso = gerarNumeroAleatorio(0, objetos.length - 1);
    
    if(caso === 0){ // pega dois objetos

       let segundoIndice;
       let primeiroIndice;
       
       primeiroIndice = gerarNumeroAleatorio(1, objetos.length - 1);
        
       do {
           segundoIndice = gerarNumeroAleatorio(1, objetos.length - 1);
       } while (segundoIndice === primeiroIndice);

       // se for arma/acessório/proteção checa se é normal/paranormal/com modificação
       let mensagem1 = primeiroIndice >= 3 ? getEquipamento(primeiroIndice): objetos[primeiroIndice];
       let mensagem2 = segundoIndice >= 3 ? getEquipamento(segundoIndice): objetos[segundoIndice];

       objetoSorteado = `${mensagem1} e ${mensagem2}`;

   } else if (caso >= 3) { // decide se o objeto é arma/acessório/proteção, checa normal/paranormal/com modificação

        objetoSorteado = getEquipamento(caso);
   
    } else { // resto

        objetoSorteado = objetos[caso];

   }

    novoObjeto.innerHTML = mostrarObjeto(objetoSorteado);

}

function getEvento(){
    let eventoSorteado;

    const novoEvento = document.getElementById("evento");
    novoEvento.innerHTML = "";

    const caso = gerarNumeroAleatorio(0,eventos.length - 1);

    eventoSorteado = eventos[caso];

    novoEvento.innerHTML = mostrarEvento(eventoSorteado);
}

function mostrarAcao(acao){
    
    return `<em id="acao">${acao}</em>`;
    
}

function mostrarSujeito(sujeito){

    return `<em id="sujeito">${sujeito}</em>`;

}

function mostrarLocal(local){

    return `<em id="local">${local}</em>`;

}

function mostrarAmigo(amigo){

    return `<em id="amigo">${amigo}</em>`;

}

function mostrarObjeto(objeto){

    return `<em id="objeto">${objeto}</em>`;

}

function mostrarEvento(evento){
    
    return `<em id="evento">${evento}</em>`;
    
}

function getEquipamento(caso){

    const i = gerarNumeroAleatorio(0, 5);
    
    if (caso == 3){ // Equipamento normal
    
        if(i >= 3) {return objetos[3];}
        if(i === 4) {return objetos[4];}
        if(i <= 5) {return objetos[5];}

    }

    if (caso == 4){ // Equipamento paranormal
    
        if(i >= 3) {return objetos[3] + " paranormal";}
        if(i === 4) {return objetos[4] + " paranormal";}
        if(i <= 5) {return objetos[5] + " paranormal";}

    }

    if (caso == 5){ // Equipamento com modificação
    
        if(i >= 3) {return `${objetos[3]} com ${gerarNumeroAleatorio(1, 3)} modificações`;}
        if(i === 4) {return `${objetos[4]} com ${gerarNumeroAleatorio(1, 3)} modificações`;}
        if(i <= 5) {return `${objetos[5]} com ${gerarNumeroAleatorio(1, 3)} modificações`;}

    }
}

