uniform sampler2D colourTexture;
uniform float mode;
uniform float time;

in vec2 texCoord;

void main() {

  // TODO use this after modifying animation
  float frame = 0.0; //mod(floor(time*5.0), 8.0);

  vec2 uv = texCoord;
  uv.x = (uv.x) * 0.125 + (frame * 0.125);
  uv.y = uv.y * 0.167 + (mode*0.167);

  // sample UV
  vec4 sampleUV = texture(colourTexture, uv);
  
  gl_FragColor = vec4(sampleUV);
}