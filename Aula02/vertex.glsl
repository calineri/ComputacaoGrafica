precision highp float;

attribute vec2 position;

void main(){
    gl_PointSize = 5.0;
    //                  X   Y   Z   W
    gl_Position = vec4(position,0.0,1.0);
}