//Define número de cartas no jogo
//const numCartas = Number(prompt("Insira o número de cartas (min: 4, max: 14)")); 
let numCartas = 4;
const variacoesCarta = numCartas/2;

while(((numCartas <= 14 && numCartas < 4) || (numCartas >= 4 && numCartas > 14)) || numCartas % 2 !== 0 ){
    //numCartas = Number(prompt("Insira o número de cartas (min: 4, max: 14)"));
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
    jogo.innerHTML+=`<div class='carta'>
    <div class='frente face' onclick='viraCarta(this)'>
        <img src='/Arquivos Úteis/front.png'/>
    </div>
    <div class='verso face'  onclick='viraCarta(this)'>
        ${cartasJogo[j]}
    </div>
</div>` 
}

//Vira carta
function viraCarta(elemento){
    if(elemento.classList.contains("frente")){
        mostraVerso(elemento.parentNode);
    }else{
        mostraFrente(elemento.parentNode);
    }
}

function mostraVerso(elemento){
    elemento.querySelector(".verso").classList.add("exibeVerso");
    elemento.querySelector(".frente").classList.add("escondeFrente");
}
function mostraFrente(elemento){
    elemento.querySelector(".verso").classList.remove("exibeVerso");
    elemento.querySelector(".frente").classList.remove("escondeFrente");
}