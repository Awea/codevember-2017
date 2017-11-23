precision highp float;

// uniform vec2 pitch;  // e.g. [50 50]

varying vec2 vUv;

void main() {
  // Grid
  // if (int(mod(gl_FragCoord.x, pitch[0])) == 0 ||
  //     int(mod(gl_FragCoord.y, pitch[1])) == 0) {
  //   gl_FragColor = vec4(0.96, 0.01, 0.97, 1.0);
  // } else {
  //   gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5);
  // }

  // kindOf parasites
  if(fract(vUv.x / 0.001) < 0.01 || 
     fract(vUv.y / 0.001) < 0.01) {
    gl_FragColor = vec4(0.96, 0.01, 0.97, 1.0);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5);
  }
}