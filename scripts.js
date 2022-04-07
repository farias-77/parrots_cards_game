//Define número de cartas no jogo
let numCartas = Number(prompt("Insira o número de cartas (min: 4, max: 14)")); 
const variacoesCarta = numCartas/2;

while(numCartas < 4 || numCartas > 14 || numCartas % 2 !== 0 ){
    numCartas = Number(prompt("Insira o número de cartas (min: 4, max: 14)"));
}

//Array com as variações de carta
let gifs = [];
gifs.push("/Arquivos Úteis/bobrossparrot.gif")
gifs.push("/Arquivos Úteis/explodyparrot.gif")
gifs.push("/Arquivos Úteis/fiestaparrot.gif")
gifs.push("/Arquivos Úteis/metalparrot.gif")
gifs.push("/Arquivos Úteis/revertitparrot.gif")
gifs.push("/Arquivos Úteis/tripletsparrot.gif")
gifs.push("/Arquivos Úteis/unicornparrot.gif")

//Array array com as cartas do jogo
let cartasJogo = []

//Insere cartas no array do jogo
let jogo = document.querySelector(".jogo");
for(let i = 0; i < variacoesCarta; i++){
    cartasJogo.push(`<img src='${gifs[i]}'/>`);
    cartasJogo.push(`<img src='${gifs[i]}'/>`);
}

//Embaralha cartas do jogo
cartasJogo.sort(comparador);
function comparador() { 
	return Math.random() - 0.5; 
}

//Exibe cartas
for(let j = 0; j < numCartas; j++){
    jogo.innerHTML+=`<div class='carta' onclick='realizaJogada(this)'>
    <div class='frente face'>
        <img src='/Arquivos Úteis/front.png'/>
    </div>
    <div class='verso face'>
        ${cartasJogo[j]}
    </div>
</div>` 
}

function realizaJogada(elemento){
    
    let cartaAnterior = document.querySelector(".verso.exibeVerso");
    if(cartaAnterior != null){
        //segunda carta da rodada
        viraCarta(elemento);
        verificaIguais();
    }else{
        //primeira carta da rodada
        viraCarta(elemento);
    }
}

function viraCarta(elemento){
    elemento.querySelector(".verso").classList.add("exibeVerso");
    elemento.querySelector(".frente").classList.add("escondeFrente");
}
function retornaCarta(elemento){
    elemento.querySelector(".verso").classList.remove("exibeVerso");
    elemento.querySelector(".frente").classList.remove("escondeFrente");
}

function verificaIguais(){

    let cartasViradas = document.querySelectorAll(".verso.exibeVerso");

    if(cartasViradas[0].innerHTML == cartasViradas[1].innerHTML){
        //trocaClasses(cartasViradas);
    }else{
        setTimeout(retornaCartas, 1000)        
    }
}

function retornaCartas(){
    let cartasViradas = document.querySelectorAll(".verso.exibeVerso");
    retornaCarta(cartasViradas[0].parentNode);
    retornaCarta(cartasViradas[1].parentNode);
}
