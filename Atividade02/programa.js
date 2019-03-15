/* Variaveis globais*/

let canvas;
let gl;
let vertexShaderSource;
let fragmentShaderSource;
let vertexShader;
let fragmentShader;
let shaderProgram;
let data;
let positionAttr;
let positionBuffer;
let width;
let height;
let aspectUniform;
let aspect;

// Teste de versionamento do git

function resize(){
    if(!gl) return;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    gl.viewport(0,0,width, height);
    aspect = width / height;

    aspectUniform = gl.getUniformLocation(shaderProgram, "aspect");
    gl.uniform1f (aspectUniform, aspect); 
}

function getCanvas(){
    return document.querySelector("canvas");
}

function getGLContext(canvas){
    let gl = canvas.getContext("webgl");
    return gl;
}

function compileShader(source, type, gl){
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        console.error("ERRO NA COMPILAÇÃO", gl.getShaderInfoLog(shader));
    }
    return shader;
}

function linkProgram(vertexShader, fragmentShader, gl){
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error("ERRO NA LINKAGEM");
    }
    return program;
}

function getData(h, v){
    
    let a = [0.00,0.05];
    let b = [0.05,0.05];
    let c = [0.00,0.0001];
    
    let points = [
//       X    Y
        0.00,0.05,
        0.05,-0.05,
        0.00,0.0001,

        0.00,0.05,
        -0.05,-0.05,
        0.00,0.0001
        

    ];
    return {"points" : new Float32Array(points)};
}

async function main(){
// 1 - Carregar tela de desenho
    canvas = getCanvas();

// 2 - Carregar o contexto  (API) WebGL
    gl = getGLContext(canvas);
    //resize();

// 3 - ler os arquivos de shader
    vertexShaderSource = await fetch("vertex.glsl").then(r => r.text());
    console.log("VERTEX", vertexShaderSource);

    fragmentShaderSource = await fetch("fragment.glsl").then(r => r.text());
    console.log("FRAGMENT", fragmentShaderSource);

// 4 - Compilar arquivos de shader
    vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER, gl);
    fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER, gl);

// 5 - Linkar o programa de shader
    shaderProgram = linkProgram(vertexShader, fragmentShader, gl);
    gl.useProgram(shaderProgram);
    resize();
// 6 - Criar dados de parâmetro
    data = getData(0.0,0.0);

// 7 - Transferir os dados para GPU
    positionAttr = gl.getAttribLocation(shaderProgram, "position");
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data.points, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttr);
    gl.vertexAttribPointer(positionAttr, 2, gl.FLOAT, false, 0, 0);

// 7.1 - 
    resize();

// 8 - Chamar o loop de redesenho
    render();

}

function render(){
    // limpa a tela
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //gl.POINTS, 
    //gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
    //gl.TRIANGLES, gl.TRIANGLES_STRIP, gl.TRIANGLES_FAN
    gl.drawArrays(gl.TRIANGLES, 0, data.points.length / 2);
    window.requestAnimationFrame(render);
}

function movimenta(event){

    if (event.key == "ArrowUp"){

    }
    if (event.key == "ArrowDown"){
        
    }
    if (event.key == "ArrowLeft"){
        
    }
    if (event.key == "ArrowRight"){
        
    }

}

window.addEventListener("load", main);

window.addEventListener("resize", resize);

window.addEventListener("keydown", movimenta);