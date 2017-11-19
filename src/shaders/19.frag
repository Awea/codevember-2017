varying float noise;

uniform sampler2D texture;
uniform float time;

void main() {
  // lookup vertically in the texture, using noise and time
  vec2 tPos = vec2( 0, (2.0 * abs(cos(time))) * noise + (1.0 * abs(sin(time))) * noise);
  vec4 color = texture2D(texture, tPos);

  gl_FragColor = vec4( color.rgb, 1.0 );
}