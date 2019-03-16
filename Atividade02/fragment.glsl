precision highp float;

varying vec2 vertexPos;
uniform vec4 u_color;

void main(){
    //float c = (vertexPos.x + 1.0) / 2.0;
    //                   R   G   B   A
    //gl_FragColor = vec4(0.0,0.0,c,1.0);
    gl_FragColor = u_color;
}