import React, { useEffect, useRef } from 'react';
import GUI from 'lil-gui';

export const GooeyOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const params = {
      scrollProgress: 0,
      colWidth: 0.7,
      speed: 0.2,
      scale: 0.25,
      seed: 0.231,
      color: [0.48, 0.23, 0.93], // Default vibrant liquid violet
      pageColor: '#090a0f',
    };

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_scroll_progr;
      uniform float u_col_width;
      uniform float u_speed;
      uniform float u_scale;
      uniform float u_seed;
      uniform vec3 u_color;
      varying vec2 v_uv;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.0005 * u_speed;
        vec2 p = st * (1.0 / max(u_scale, 0.01)) + vec2(u_seed * 10.0, t);

        float col = floor(st.x / max(u_col_width, 0.1));
        float wave = fbm(p + vec2(col * 2.5, u_scroll_progr * 2.0));

        float threshold = mix(0.15, 0.75, u_scroll_progr);
        float alpha = smoothstep(threshold - 0.2, threshold + 0.2, wave);

        vec3 colorA = u_color;
        vec3 colorB = vec3(0.65, 0.35, 0.95);
        vec3 finalColor = mix(colorA, colorB, wave);

        gl_FragColor = vec4(finalColor, alpha * 0.45);
      }
    `;

    const gl = canvasEl.getContext('webgl') || (canvasEl.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) {
      console.warn('WebGL not supported for Gooey Overlay.');
      return;
    }

    function createShader(glCtx: WebGLRenderingContext, source: string, type: number) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error('An error occurred compiling shader:', glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Unable to initialize shader program:', gl.getProgramInfoLog(shaderProgram));
      return;
    }

    const uniforms: Record<string, WebGLUniformLocation | null> = {
      u_col_width: gl.getUniformLocation(shaderProgram, 'u_col_width'),
      u_speed: gl.getUniformLocation(shaderProgram, 'u_speed'),
      u_scale: gl.getUniformLocation(shaderProgram, 'u_scale'),
      u_seed: gl.getUniformLocation(shaderProgram, 'u_seed'),
      u_color: gl.getUniformLocation(shaderProgram, 'u_color'),
      u_time: gl.getUniformLocation(shaderProgram, 'u_time'),
      u_scroll_progr: gl.getUniformLocation(shaderProgram, 'u_scroll_progr'),
      u_resolution: gl.getUniformLocation(shaderProgram, 'u_resolution'),
    };

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(shaderProgram);

    const positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    if (uniforms.u_col_width) gl.uniform1f(uniforms.u_col_width, params.colWidth);
    if (uniforms.u_speed) gl.uniform1f(uniforms.u_speed, params.speed);
    if (uniforms.u_scale) gl.uniform1f(uniforms.u_scale, params.scale);
    if (uniforms.u_seed) gl.uniform1f(uniforms.u_seed, params.seed);
    if (uniforms.u_color) gl.uniform3f(uniforms.u_color, params.color[0], params.color[1], params.color[2]);

    const resizeCanvas = () => {
      canvasEl.width = window.innerWidth * devicePixelRatio;
      canvasEl.height = window.innerHeight * devicePixelRatio;
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
      if (uniforms.u_resolution) gl.uniform2f(uniforms.u_resolution, canvasEl.width, canvasEl.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animationFrameId: number;

    const render = () => {
      const scrollY = window.scrollY || 0;
      const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      params.scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      const currentTime = performance.now();
      if (uniforms.u_time) gl.uniform1f(uniforms.u_time, currentTime);
      if (uniforms.u_scroll_progr) gl.uniform1f(uniforms.u_scroll_progr, params.scrollProgress);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Create Lil-GUI controls interface
    const gui = new GUI({ title: 'Gooey WebGL Controls' });
    gui.close(); // Collapsed by default

    gui
      .add(params, 'colWidth', 0.2, 1.5)
      .onChange((v: number) => {
        if (uniforms.u_col_width) gl.uniform1f(uniforms.u_col_width, v);
      })
      .name('column width');

    gui
      .add(params, 'scale', 0.15, 0.35)
      .onChange((v: number) => {
        if (uniforms.u_scale) gl.uniform1f(uniforms.u_scale, v);
      });

    gui
      .add(params, 'speed', 0, 1)
      .onChange((v: number) => {
        if (uniforms.u_speed) gl.uniform1f(uniforms.u_speed, v);
      });

    gui
      .add(params, 'seed', 0, 1)
      .onChange((v: number) => {
        if (uniforms.u_seed) gl.uniform1f(uniforms.u_seed, v);
      });

    gui
      .addColor(params, 'color')
      .onChange((v: number[]) => {
        if (uniforms.u_color) gl.uniform3f(uniforms.u_color, v[0], v[1], v[2]);
      });

    gui
      .addColor(params, 'pageColor')
      .onChange((v: string) => {
        document.body.style.backgroundColor = v;
      });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      gui.destroy();
    };
  }, []);

  return (
    <canvas
      id="gooey-overlay"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] mix-blend-screen opacity-70"
    />
  );
};
