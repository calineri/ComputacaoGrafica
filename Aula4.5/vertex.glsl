precision highp float;

attribute vec2 position;

varying vec2 vertexPos;

uniform float aspect;

uniform vec2 loc;

void main(){
    vertexPos = loc + position;
    gl_Position = vec4(vertexPos.x / aspect, vertexPos.y, 0.0, 1.0);
}