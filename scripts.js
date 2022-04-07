//Variáveis globais
let contadorJogadas = 0;
let numCartas; 
let variacoesCarta;

//Array com as variações de carta
let gifs = [];
gifs.push("/Arquivos Úteis/bobrossparrot.gif");
gifs.push("/Arquivos Úteis/explodyparrot.gif");
gifs.push("/Arquivos Úteis/fiestaparrot.gif");
gifs.push("/Arquivos Úteis/metalparrot.gif");
gifs.push("/Arquivos Úteis/revertitparrot.gif");
gifs.push("/Arquivos Úteis/tripletsparrot.gif");
gifs.push("/Arquivos Úteis/unicornparrot.gif");


function iniciarJogo(){

    //Esconde o botão
    document.querySelector(".botaoIniciar").classList.add("escondido");
    
    //Define o número de cartas do jogo entre 4 e 14 (recusa ímpar)
    numCartas = Number(prompt("Insira o número de cartas (min: 4, max: 14)"));
    while(numCartas < 4 || numCartas > 14 || numCartas % 2 !== 0 ){
        numCartas = Number(prompt("Insira o número de cartas (min: 4, max: 14)"));
    }
    variacoesCarta = numCartas/2;

    //Array com as cartas que serão utilizadas no jogo
    let cartasJogo = [];

    //Insere cartas no array do jogo
    let divjogo = document.querySelector(".jogo");
    for(let i = 0; i < variacoesCarta; i++){
        cartasJogo.push(`<img src='${gifs[i]}'/>`);
        cartasJogo.push(`<img src='${gifs[i]}'/>`);
    }

    //Embaralha cartas do jogo
    cartasJogo.sort(comparador);
    
    //Exibe cartas
    for(let j = 0; j < numCartas; j++){
        divjogo.innerHTML+=`<div class='carta' onclick='realizaJogada(this)'>
    <div class='frente face'>
        <img src='/Arquivos Úteis/front.png'/>
    </div>
    <div class='verso face'>
        ${cartasJogo[j]}
    </div>
</div>` 
    }


}

function realizaJogada(elemento){
    
    let cartaAnterior = document.querySelector(".verso.exibeVerso");
    if(cartaAnterior != null){
        //segunda carta da rodada
        viraCarta(elemento);
        verificaIguais();
        setTimeout(verificaFim, 1000);
    }else{
        //primeira carta da rodada
        viraCarta(elemento);
    }
}

function viraCarta(elemento){
    elemento.querySelector(".verso").classList.add("exibeVerso");
    elemento.querySelector(".frente").classList.add("escondeFrente");

    contadorJogadas++;
}

function retornaCarta(elemento){
    elemento.querySelector(".verso").classList.remove("exibeVerso");
    elemento.querySelector(".frente").classList.remove("escondeFrente");
}

function verificaIguais(){

    let cartasViradas = document.querySelectorAll(".verso.exibeVerso");   

    if(cartasViradas[0].innerHTML == cartasViradas[1].innerHTML){
        alteraClasse(cartasViradas)
    }else{
        setTimeout(retornaCartas, 1000)        
    }
}

function retornaCartas(){
    let cartasViradas = document.querySelectorAll(".verso.exibeVerso");
    retornaCarta(cartasViradas[0].parentNode);
    retornaCarta(cartasViradas[1].parentNode);
}

function alteraClasse(arrayIguais){
    arrayIguais[0].classList.add("parEncontrado");
    arrayIguais[0].classList.remove("exibeVerso");
    arrayIguais[1].classList.add("parEncontrado");
    arrayIguais[1].classList.remove("exibeVerso");
}

function verificaFim(){
    let paresEncontrados = document.querySelectorAll(".verso.parEncontrado");
    if(paresEncontrados.length === numCartas){
        alert(`Você ganhou em ${contadorJogadas} jogadas!`);
        
        let reiniciaJogo = perguntaReinicia();
        if(reiniciaJogo){
            //Reseta numero de jogadas e limpa cartas da partida anterior antes de reiniciar o jogo
            resetaJogo(false);
            iniciarJogo();
        }else{
            alert("Até a próxima!");
            resetaJogo(true);
        }

    }
}

function comparador() { 
    return Math.random() - 0.5; 
}

function perguntaReinicia(){
    let resposta = prompt("Gostaria de reiniciar o jogo?");

    if(resposta === "sim"){
        return true;
    }else if(resposta === "não"){
        return false;
    }
}

function resetaJogo(exibeBotao){
    contadorJogadas = 0;

    let cartasAnteriores = document.querySelectorAll(".parEncontrado");
    for(let i = 0; i < cartasAnteriores.length; i++){
        cartasAnteriores[i].classList.remove("parEncontrado");
        cartasAnteriores[i].parentNode.classList.add("escondido");
    }

    if(exibeBotao){
        document.querySelector(".botaoIniciar").classList.remove("escondido");
    }

}