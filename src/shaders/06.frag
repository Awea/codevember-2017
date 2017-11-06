precision mediump float;

uniform vec2 u_mouse;

void main() {
  vec2 st      = gl_FragCoord.xy / u_mouse.xy;
  gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
}
