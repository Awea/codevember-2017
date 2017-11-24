// include chunks src/shaders/chunks/noise.glsl
$noise

varying float noise;

uniform float time;

float turbulence( vec3 p ) {
  float w = 100.0;
  float t = -.5;

  for (float f = 1.0 ; f <= 10.0 ; f++ ){
    float power = pow( 2.0, f );
    t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
  }

  return t;
}

void main() {
  noise = 10.0 *  -.10 * turbulence( .5 * normal + time );

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
}