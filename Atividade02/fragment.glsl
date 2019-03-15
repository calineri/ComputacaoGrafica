precision highp float;

varying vec2 vertexPos;

void main(){
    float c = (vertexPos.x + 1.0) / 2.0;
    //                   R   G   B   A
    gl_FragColor = vec4(0.0,c,0.0,1.0);
}