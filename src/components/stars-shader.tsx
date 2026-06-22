import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // aspect fix
    uv.x *= u_resolution.x / u_resolution.y;

    // background color (#0b080c)
    vec3 bg = vec3(0.043, 0.031, 0.047);

    vec3 col = bg;

    // movement direction: bottom-left -> top-right
    vec2 dir = normalize(vec2(1.0, 1.0));

    float speed = 0.033;

    // make movement
    uv -= dir * u_time * speed;

    // grid spacing (controls density + spacing)
    float gridSize = 48.0;

    vec2 gv = fract(uv * gridSize);
    vec2 id = floor(uv * gridSize);

    // jitter per cell (keeps spacing but avoids uniform look)
    float rnd = hash(id);

    // star position inside cell
    vec2 offset = vec2(
        hash(id + 1.0),
        hash(id + 2.0)
    );

    vec2 starPos = gv - offset;

    float d = length(starPos - 0.5);

    // star shape (sharp core)
    float star = smoothstep(0.08, 0.0, d);

    // random brightness + size variation
    star *= mix(0.4, 0.8, rnd);

    // optional twinkle
    star *= 0.8 + 0.4 * sin(u_time * 3.0 + rnd * 10.0);

    col += star;

    gl_FragColor = vec4(col, 1.0);
}
`;

export default function StarsShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock, size }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();

      materialRef.current.uniforms.u_resolution.value.set(
        size.width,
        size.height,
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0 },
          u_resolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
        }}
      />
    </mesh>
  );
}
