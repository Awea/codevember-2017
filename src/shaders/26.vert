// uniform are per-primitive parameters (constant during an entire draw call) ;
uniform float amplitude;

// attribute are per-vertex parameters (typically : positions, normals, colors, UVs, ...) ;
attribute float displacement;

void main(){
  vec3 newPosition = position + amplitude * normal * vec3( displacement );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}