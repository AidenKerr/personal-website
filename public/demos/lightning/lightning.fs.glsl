uniform sampler2D colourTexture;

in vec2 texCoord;
uniform float noise_speed;
uniform float time;
uniform float time_offset;
uniform float start_time;
uniform float threshold_speed;
uniform float threshold_initial_t;
uniform vec2 threshold_offset;

#define FRACTAL 1
#define DISTORT_SCALE 32.0
#define DISTORT_STRENGTH 0.1
#define GLOW_COLOUR vec3(0.5, 0.5, 1.0)

float noise(in vec2 p);
vec2 getDistortion();

void main() {
  vec2 uv = getDistortion();

  // sample UV
  vec4 sampleUV = texture(colourTexture, uv);
  float bolt = sampleUV.r;
  float glow = sampleUV.g;
  float threshold = sampleUV.b;

  // time
  float t = mod(threshold_initial_t + (time - start_time) * threshold_speed, 1.0);
  if (threshold < t - threshold_offset.x || threshold > t + threshold_offset.y)
    discard;

  gl_FragColor = vec4(GLOW_COLOUR + bolt, glow);
}

// HELPERS
// TODO should we replace the hash function as suggested below?

// taken from https://www.shadertoy.com/view/lsf3WH

float getNoiseFloat(vec2 uv, float offset)
{
    float f = 0.0f;
#if FRACTAL
    //vec2 uv2 = (uv + time * noise_speed) * 8.0;
    uv += (time + offset) * noise_speed;
    uv *= 8.0f;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    f = 0.5000 * noise(uv); uv = m * uv;
    f += 0.2500 * noise(uv); uv = m * uv;
    f += 0.1250 * noise(uv); uv = m * uv;
    f += 0.0625 * noise(uv); uv = m * uv;
#else
    f = noise(distort_scale * (uv + time * noise_speed));
    f = 0.5 + 0.5 * f;
#endif
    return f;
}

vec2 getDistortion()
{
  vec2 uv = texCoord;
  vec2 f1 = getNoiseFloat(uv, time_offset) * vec2(1.0) ;
  vec2 f2 = getNoiseFloat(uv, time_offset * 2.0) * vec2(1.0, -1.0);
  vec2 f = (f1 + f2);// / 2.0;
  // TODO fiddle with how f1 and f2 are combined to get desired distortion results.
  uv += DISTORT_STRENGTH * f;
  return clamp(uv, 0.0, 1.0);
}

// The MIT License
// Copyright © 2013 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// https://www.youtube.com/c/InigoQuilez
// https://iquilezles.org/

// Value Noise (http://en.wikipedia.org/wiki/Value_noise), not to be confused with Perlin's
// Noise, is probably the simplest way to generate noise (a random smooth signal with 
// mostly all its energy in the low frequencies) suitable for procedural texturing/shading,
// modeling and animation.
//
// It produces lowe quality noise than Gradient Noise (https://www.shadertoy.com/view/XdXGW8)
// but it is slightly faster to compute. When used in a fractal construction, the blockyness
// of Value Noise gets qcuikly hidden, making it a very popular alternative to Gradient Noise.
//
// The principle is to create a virtual grid/latice all over the plane, and assign one
// random value to every vertex in the grid. When querying/requesting a noise value at
// an arbitrary point in the plane, the grid cell in which the query is performed is
// determined, the four vertices of the grid are determined and their random
// value fetched and then bilinearly interpolated with a smooth interpolant.

// All noise functions here:
//
// https://www.shadertoy.com/playlist/fXlXzf&from=0&num=12


// 0: integer hash
// 1: float hash (aliasing based) (don't do this unless you live in the year 2013)
#define METHOD 0

// 0: cubic
// 1: quintic
#define INTERPOLANT 0

#if METHOD==0
float hash( in ivec2 p )  // this hash is not production ready, please
{                         // replace this by something better

  // 2D -> 1D
  int n = p.x*3 + p.y*113;

  // 1D hash by Hugo Elias
	n = (n << 13) ^ n;
  n = n * (n * n * 15731 + 789221) + 1376312589;
  return -1.0+2.0*float( n & 0x0fffffff)/float(0x0fffffff);
}
#else
float hash(vec2 p)  // replace this by something better
{
  p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
  return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
}
#endif

float noise(in vec2 p)
{
#if METHOD ==0
  ivec2 i = ivec2(floor( p ));
#else
  vec2 i = floor(p);
#endif
  vec2 f = fract(p);

#if INTERPOLANT ==1
  // quintic interpolant
  vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
#else
  // cubic interpolant
  vec2 u = f * f * (3.0 - 2.0 * f);
#endif

#if METHOD ==0
  return mix( mix(hash( i + ivec2(0,0) ), 
                  hash( i + ivec2(1,0) ), u.x),
              mix(hash( i + ivec2(0,1) ), 
                  hash( i + ivec2(1,1) ), u.x), u.y);
#else
  return mix( mix(hash(i + vec2(0.0, 0.0)),
                  hash(i + vec2(1.0, 0.0)), u.x),
              mix(hash(i + vec2(0.0, 1.0)),
                  hash(i + vec2(1.0, 1.0)), u.x), u.y);
#endif
}

// -----------------------------------------------
