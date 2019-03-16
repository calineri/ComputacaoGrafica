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
let colorUniformLocation;
let aspectUniform;
let aspect;
let points = [0.00,-0.8899, 0.05,-0.9900,0.00,-0.9398,
              0.00,-0.8899,-0.05,-0.9900,0.00,-0.9398
            
            ];
let fundo;
let fundoPoints = [-1.0,-1.0,-1.0,1,1.0,1,
                  -1.0,-1.0,+1.0,-1,1.0,1
            ];
let estrela;
let estrelaPoints = [ 0.0,-0.02,-0.03,0.03,0.03,0.03,
                     -0.03,0.0,0.0,0.05,0.03,0.0
            ]

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

function getData(x, y){
    points[0] = points[0] + x;
    points[2] = points[2] + x;
    points[4] = points[4] + x;
    points[6] = points[6] + x;
    points[8] = points[8] + x;
    points[10] = points[10] + x;
    
    points[1] = points[1] + y;
    points[3] = points[3] + y;
    points[5] = points[5] + y;
    points[7] = points[7] + y;
    points[9] = points[9] + y;
    points[11] = points[11] + y;
    
    return {"points" : new Float32Array(points)};
}

function getFundo(){
    return {"points" : new Float32Array(fundoPoints)}
}

function getEstrela(){
    return {"points" : new Float32Array(estrelaPoints)}
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
    
// 6 - Criar dados de parâmetro
    data = getData(0.0,0.0);
    fundo = getFundo();
    estrela = getEstrela();

// 7 - Transferir os dados para GPU
    positionAttr = gl.getAttribLocation(shaderProgram, "position");
    colorUniformLocation = gl.getUniformLocation(shaderProgram, "u_color");
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionAttr);
    gl.vertexAttribPointer(positionAttr, 2, gl.FLOAT, false, 0, 0);

// 7.1 - ASPECT UNIFORM
    resize();
    window.addEventListener("resize", resize);

// 8 - Chamar o loop de redesenho
    render();

}

function render(){
    // limpa a tela
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //gl.POINTS, 
    //gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
    //gl.TRIANGLES, gl.TRIANGLES_STRIP, gl.TRIANGLES_FAN
    //gl.drawArrays(gl.TRIANGLES, 0, data.points.length / 2);
    desenhaFundo();
    desenhaEstrela();
    desenhaNave();
    window.requestAnimationFrame(render);
}

function movimenta(event){
    if (event.key == "ArrowUp"){
        data = getData(0.0,0.02);
    }
    if (event.key == "ArrowDown"){
        data = getData(0.0,-0.02);
    }
    if (event.key == "ArrowLeft"){
        data = getData(-0.02,0.0);
    }
    if (event.key == "ArrowRight"){
        data = getData(0.02,0.0);
    }
    
}

function desenhaNave(){
    gl.uniform4f(colorUniformLocation,0.0,0.0,0.0,1.0);
    gl.bufferData(gl.ARRAY_BUFFER, data.points, gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, data.points.length / 2);
    
}

function desenhaFundo(){
    gl.uniform4f(colorUniformLocation,0.0,0.0,1.0,1.0);
    gl.bufferData(gl.ARRAY_BUFFER, fundo.points, gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, fundo.points.length / 2);
}

function desenhaEstrela(){
    gl.uniform4f(colorUniformLocation,1.0,1.0,1.0,1.0);
    gl.bufferData(gl.ARRAY_BUFFER, estrela.points, gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, estrela.points.length / 2);
}

window.addEventListener("load", main);

window.addEventListener("keydown", movimenta);