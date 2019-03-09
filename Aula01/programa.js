//alert("Funcionou!!")

//function pintar(evt, hue=60){
//    //document.body.style.background = "rgb(0,255,120)";
//    //document.body.style.background = "hsl(120deg,100%,50%)";
//    document.body.style.background = `hsl(${hue}deg,100%,50%)`;
//
//}

function pintar(hue=60, light=50){
    //document.body.style.background = "rgb(0,255,120)";
    //document.body.style.background = "hsl(120deg,100%,50%)";
    document.body.style.background = `hsl(${hue}deg,100%,${light}%)`;
    
}

function clickHandler(event){
    //let cor = 270;
    //console.log(event);

    let w = window.innerWidth;
    let h = window.innerHeight;

    let x = Math.round(event.x/(w/360));
    let y = Math.round((h-event.y)/(h/100));

    //let y = (1- event.y/h)*100;

    //console.log("POS",event.x," :: ",event.y);
    console.log("POS",Math.round(event.x/(w/360))," :: ",Math.round((h-event.y)/(h/100)));
    //let cor = Math.random()*360;
    let cor = x;
    let luz = y;
    pintar(cor, luz);
}

//window.addEventListener("load",pintar);
//window.addEventListener("click",pintar);
//window.addEventListener("click",clickHandler);
window.addEventListener("mousemove",clickHandler);