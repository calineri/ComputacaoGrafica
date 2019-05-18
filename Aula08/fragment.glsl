precision highp float;

varying vec4 vertexPos;

varying vec4 vertexNormal;

uniform vec3 color;

void main() {

    // POSI��O DA LUZ
    vec4 light = vec4(10.0, 10.0, 10.0, 1.0);

    // VETOR DE INCID�NCIA
    vec4 L = normalize(light - vertexPos);

    // NORMAL (RENORMALIZADA)
    vec4 N = normalize(vertexNormal);

    // C�LCULO DE LAMBERT
    float Lambert = max(dot(L,N), 0.0);
    
    // NOVA COR TONALIZADA
    vec3 shade = color * Lambert; 

    gl_FragColor = vec4(shade, 1.0);
}