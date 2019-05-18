precision highp float;

// Posi��o do V�rtice
attribute vec3 position;

// Normal do V�rtice
attribute vec3 normal;

// Posi��o do V�rtice em rela��o � Camera
varying vec4 vertexPos;

// Posi��o da Normal
varying vec4 vertexNormal;

// fovy, aspect, near, far 
uniform mat4 projection;

// eye, up, certer/lookAt
uniform mat4 view;

// posi��o, rota��o, escala do modelo (world)
uniform mat4 model;

void main() {
    vertexPos = view * model * vec4(position, 1.0);
    vertexNormal = view * model * vec4(normal, 0.0);
    gl_Position = projection * vertexPos;
}