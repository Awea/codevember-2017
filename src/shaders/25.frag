precision highp float;

varying float vDepth;

uniform float time;

vec4 pack1K ( float depth ) {
   depth /= 1000.0;
   const vec4 bitSh = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );
   const vec4 bitMsk = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );
   vec4 res = fract( depth * bitSh );
   res -= res.xxyz * bitMsk;
   return res;
}

void main() {
  gl_FragColor = pack1K(vDepth) * time;
}
