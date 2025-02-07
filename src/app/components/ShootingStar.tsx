import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// import TrackballControls from 'three-trackballcontrols'; // Might not be needed
import * as dat from 'dat.gui';

// Easing functions (copied from the provided code)
function linear(t: number, b: number, c: number, d: number): number {
  return (c * t) / d + b;
}
function easeInQuad(t: number, b: number, c: number, d: number): number {
  return c * (t /= d) * t + b;
}
function easeOutQuad(t: number, b: number, c: number, d: number): number {
  return -c * (t /= d) * (t - 2) + b;
}
function easeInOutQuad(t: number, b: number, c: number, d: number): number {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
}
function easeInCubic(t: number, b: number, c: number, d: number): number {
  return c * Math.pow(t / d, 3) + b;
}
function easeOutCubic(t: number, b: number, c: number, d: number): number {
  return c * (Math.pow(t / d - 1, 3) + 1) + b;
}
function easeInOutCubic(t: number, b: number, c: number, d: number): number {
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(t, 3) + b;
  return (c / 2) * (Math.pow(t - 2, 3) + 2) + b;
}
function easeInQuart(t: number, b: number, c: number, d: number): number {
  return c * Math.pow(t / d, 4) + b;
}
function easeOutQuart(t: number, b: number, c: number, d: number): number {
  return -c * (Math.pow(t / d - 1, 4) - 1) + b;
}
function easeInOutQuart(t: number, b: number, c: number, d: number): number {
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(t, 4) + b;
  return (-c / 2) * (Math.pow(t - 2, 4) - 2) + b;
}
function easeInQuint(t: number, b: number, c: number, d: number): number {
  return c * Math.pow(t / d, 5) + b;
}
function easeOutQuint(t: number, b: number, c: number, d: number): number {
  return c * (Math.pow(t / d - 1, 5) + 1) + b;
}
function easeInOutQuint(t: number, b: number, c: number, d: number): number {
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(t, 5) + b;
  return (c / 2) * (Math.pow(t - 2, 5) + 2) + b;
}
function easeInSine(t: number, b: number, c: number, d: number): number {
  return c * (1 - Math.cos((t / d) * (Math.PI / 2))) + b;
}
function easeOutSine(t: number, b: number, c: number, d: number): number {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b;
}
function easeInOutSine(t: number, b: number, c: number, d: number): number {
  return (c / 2) * (1 - Math.cos((Math.PI * t) / d)) + b;
}
function easeInExpo(t: number, b: number, c: number, d: number): number {
  return c * Math.pow(2, 10 * (t / d - 1)) + b;
}
function easeOutExpo(t: number, b: number, c: number, d: number): number {
  return c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
}
function easeInOutExpo(t: number, b: number, c: number, d: number): number {
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
  return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
}
function easeInCirc(t: number, b: number, c: number, d: number): number {
  return c * (1 - Math.sqrt(1 - (t /= d) * t)) + b;
}
function easeOutCirc(t: number, b: number, c: number, d: number): number {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}
function easeInOutCirc(t: number, b: number, c: number, d: number): number {
  if ((t /= d / 2) < 1) return (c / 2) * (1 - Math.sqrt(1 - t * t)) + b;
  return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}
const easingList = [
  'linear',
  'easeInSine',
  'easeOutSine',
  'easeInOutSine',
  'easeInQuad',
  'easeOutQuad',
  'easeInOutQuad',
  'easeInCubic',
  'easeOutCubic',
  'easeInOutCubic',
  'easeInQuart',
  'easeOutQuart',
  'easeInOutQuart',
  'easeInQuint',
  'easeOutQuint',
  'easeInOutQuint',
  'easeInExpo',
  'easeOutExpo',
  'easeInOutExpo',
  'easeInCirc',
  'easeOutCirc',
  'easeInOutCirc',
];

// Shaders (copied and adapted from the provided code)
const vertexShader = `
precision highp float;
precision highp int;
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

attribute vec4 mouse;
attribute vec2 aFront;
attribute float random;

uniform vec2 resolution;
uniform float pixelRatio;
uniform float timestamp;

uniform float size;
uniform float minSize;
uniform float speed;
uniform float far;
uniform float spread;
uniform float maxSpread;
uniform float maxZ;
uniform float maxDiff;
uniform float diffPow;

varying float vProgress;
varying float vRandom;
varying float vDiff;
varying float vSpreadLength;
varying float vPositionZ;

float cubicOut(float t) {
  float f = t - 1.0;
  return f * f * f + 1.0;
}

const float PI = 3.1415926;
const float PI2 = PI * 2.;

vec2 cartesianToPolar (vec2 p) {
  return vec2((atan(p.y, p.x) + PI) / PI2, length(p));
}

vec2 polarToCartesian (vec2 p) {
  float r = p.x * PI2 - PI;
  float l = p.y;
  return vec2(cos(r) * l, sin(r) * l);
}

void main () {
  float progress = clamp((timestamp - mouse.z) * speed, 0., 1.);
  progress *= step(0., mouse.x);

  float startX = mouse.x - resolution.x / 2.;
  float startY = mouse.y - resolution.y / 2.;
  vec3 startPosition = vec3(startX, startY, random);

  float diff = clamp(mouse.w / maxDiff, 0., 1.);
  diff = pow(diff, diffPow);

  vec3 cPosition = position * 2. - 1.;

  float radian = cPosition.x * PI2 - PI;
  vec2 xySpread = vec2(cos(radian), sin(radian)) * spread * mix(1., maxSpread, diff) * cPosition.y;

  vec3 endPosition = startPosition;
  endPosition.xy += xySpread;
  endPosition.xy -= aFront * far * random;
  endPosition.z += cPosition.z * maxZ * (pixelRatio > 1. ? 1.2 : 1.);

  float positionProgress = cubicOut(progress * random);
  vec3 currentPosition = mix(startPosition, endPosition, positionProgress);

  vProgress = progress;
  vRandom = random;
  vDiff = diff;
  vSpreadLength = cPosition.y;
  vPositionZ = position.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(currentPosition, 1.);
  gl_PointSize = max(currentPosition.z * size * diff * pixelRatio, minSize * (pixelRatio > 1. ? 1.3 : 1.));
}
`;

const fragmentShader = `
precision highp float;
precision highp int;

uniform float fadeSpeed;
uniform float shortRangeFadeSpeed;
uniform float minFlashingSpeed;
uniform float blur;

varying float vProgress;
varying float vRandom;
varying float vDiff;
varying float vSpreadLength;
varying float vPositionZ;

highp float random(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

float quadraticIn(float t) {
  return t * t;
}

#ifndef HALF_PI
#define HALF_PI 1.5707963267948966
#endif

float sineOut(float t) {
  return sin(t * HALF_PI);
}

const vec3 baseColor = vec3(170., 133., 88.) / 255.;

void main() {
	vec2 p = gl_PointCoord * 2. - 1.;
	float len = length(p);

  float cRandom = random(vec2(vProgress * mix(minFlashingSpeed, 1., vRandom)));
  cRandom = mix(0.3, 2., cRandom);

  float cBlur = blur * mix(1., 0.3, vPositionZ);
	float shape = smoothstep(1. - cBlur, 1. + cBlur, (1. - cBlur) / len);
  shape *= mix(0.5, 1., vRandom);

  if (shape == 0.) discard;

  float darkness = mix(0.1, 1., vPositionZ);

  float alphaProgress = vProgress * fadeSpeed * mix(2.5, 1., pow(vDiff, 0.6));
  alphaProgress *= mix(shortRangeFadeSpeed, 1., sineOut(vSpreadLength) * quadraticIn(vDiff));
  float alpha = 1. - min(alphaProgress, 1.);
  alpha *= cRandom * vDiff;

	gl_FragColor = vec4(baseColor * darkness * cRandom, shape * alpha);
}
`;

interface THREERootParams {
  container?: HTMLElement | string;
  fov?: number;
  zNear?: number;
  zFar?: number;
  cameraPosition?: number[];
  createCameraControls?: boolean;
  isAutoStart?: boolean;
  pixelRatio?: number;
  antialias?: boolean;
  alpha?: boolean;
  clearColor?: number;
  aspect?: number;
  canvas?: HTMLCanvasElement;
  speed?: number;
  interval?: number;
  firstTime?: number;
  isDev?: boolean;
}

class THREERoot {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    controls: any; // Type this properly if you use TrackballControls
    raycaster: THREE.Raycaster;
    pointer: THREE.Vector2;
    width: number = 0;
    height: number = 0;
    aspect: number;
    animationFrameId: number | null = null;
    startTime: number = 0;
    time: number = 0;
    firstTime: number;
    stopTime: number = 0;
    speed: number;
    interval: number | undefined;
    updateCallbacks: Function[] = [];
    resizeCallbacks: Function[] = [];
    objects: { [key: string]: THREE.Object3D } = {};


  constructor(params: THREERootParams) {
    const {
      container = document.body,
      fov = 45,
      zNear,
      zFar,
      cameraPosition = [0, 0, 30],
      createCameraControls = false,
      isAutoStart = true,
      pixelRatio = window.devicePixelRatio,
      antialias = window.devicePixelRatio === 1,
      alpha = false,
      clearColor = 0x000000,
      aspect,
      canvas = document.createElement('canvas'),
      speed = 60 / 1000,
      interval,
      firstTime = 0,
      isDev = false,
    } = params;

    this.speed = speed;
    this.interval = interval;
    this.time = this.firstTime = firstTime;
    this.stopTime = 0;

    this.renderer = new THREE.WebGLRenderer({
      antialias,
      alpha,
      canvas,
    });
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setClearColor(clearColor, alpha ? 0 : 1);
    this.canvas = this.renderer.domElement;

    this.container =
      typeof container === 'string'
        ? document.querySelector(container) || document.body
        : container;
    if (!params.canvas) {
        this.container.appendChild(this.canvas);
    }
    this.aspect = aspect || this.container.clientWidth / this.container.clientHeight;
    this.setSize();

    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.width / this.height,
      zNear,
      zFar
    );
    this.camera.position.set(...(cameraPosition as [number, number, number]));
    this.camera.updateProjectionMatrix();

    this.scene = new THREE.Scene();

    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });

    if (isAutoStart) {
      this.start();
    }

    if (createCameraControls) {
      this.createOrbitControls();
    }

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    if (isDev) {
      document.addEventListener('keydown', ({ key }) => {
        if (key === 'Escape') {
          this.toggle();
        }
      });
    }
  }

  setSize() {
    if (this.aspect) {
      if (
        this.container.clientWidth / this.container.clientHeight >
        this.aspect
      ) {
        this.width = this.container.clientHeight * this.aspect;
        this.height = this.container.clientHeight;
      } else {
        this.width = this.container.clientWidth;
        this.height = this.container.clientWidth / this.aspect;
      }
    } else {
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight;
    }
  }

    createOrbitControls() {
        // if (!THREE.TrackballControls) { // Check if TrackballControls is available
        //     console.error('TrackballControls.js file is not loaded.');
        //     return;
        // }

        // this.controls = new THREE.TrackballControls(this.camera, this.canvas);
        // this.addUpdateCallback(() => {
        //     this.controls.update();
        // });
        console.warn("TrackballControls are not being used")
    }

  start() {
    const startTime = this.stopTime || this.firstTime;
    requestAnimationFrame((timestamp) => {
      this.startTime = timestamp - startTime;
      this.time = timestamp - this.startTime;
    });
    this.tick();
  }

  tick() {
    this.update();
    this.render();
    this.animationFrameId = requestAnimationFrame((timestamp) => {
      this.time = timestamp - this.startTime;
      this.tick();
    });
  }

  update() {
    const time = this.time * this.speed;
    const adjustedTime = this.interval ? time % this.interval : time;
    this.updateCallbacks.forEach((fn) => {
      fn(adjustedTime);
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  draw() {
    this.update();
    this.render();
  }

  stop() {
    if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
    }
    this.stopTime = this.time;
  }

  reset() {
    this.stop();
    this.stopTime = 0;
  }

  toggle() {
    this.animationFrameId ? this.stop() : this.start();
  }

  addUpdateCallback(callback: Function) {
    this.updateCallbacks.push(callback);
  }

  addResizeCallback(callback: Function) {
    this.resizeCallbacks.push(callback);
  }

  add(object: THREE.Object3D, key?: string) {
    key && (this.objects[key] = object);
    this.scene.add(object);
  }

  addTo(object: THREE.Object3D, parentKey: string, key?: string) {
    key && (this.objects[key] = object);
    this.get(parentKey).add(object);
  }

  get(key: string): THREE.Object3D {
    return this.objects[key];
  }

  remove(o: string | THREE.Object3D) {
    let object: THREE.Object3D | undefined;

    if (typeof o === 'string') {
      object = this.objects[o];
    } else {
      object = o;
    }

    if (object) {
      object.parent?.remove(object);
      delete this.objects[o as string];
    }
  }

  resize() {
    this.container.style.width = '';
    this.container.style.height = '';

    if (this.aspect) {
      this.aspect =
        this.container.clientWidth / this.container.clientHeight;
    }

    this.setSize();
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.resizeCallbacks.forEach((callback) => {
      callback();
    });
  }

    initPostProcessing(passes: any) {
        // const size = this.renderer.getSize();
        // const pixelRatio = this.renderer.getPixelRatio();
        // size.width *= pixelRatio;
        // size.height *= pixelRatio;

        // const composer = this.composer = new THREE.EffectComposer(this.renderer, new THREE.WebGLRenderTarget(size.width, size.height, {
        //     minFilter: THREE.LinearFilter,
        //     magFilter: THREE.LinearFilter,
        //     format: THREE.RGBAFormat,
        //     stencilBuffer: false
        // }));

        // const renderPass = new THREE.RenderPass(this.scene, this.camera);
        // composer.addPass(renderPass);

        // for (let i = 0; i < passes.length; i++) {
        //     const pass = passes[i];
        //     pass.renderToScreen = i === passes.length - 1;
        //     composer.addPass(pass);
        // }

        // this.renderer.autoClear = false;
        // this.render = () => {
        //     this.renderer.clear();
        //     composer.render();
        // };

        // this.addResizeCallback(() => {
        //     composer.setSize(this.canvas.clientWidth * pixelRatio, this.canvas.clientHeight * pixelRatio);
        // });

        console.warn("Post processing is not being used");
    }

  checkPointer(
    coords: { x: number; y: number },
    meshs: THREE.Mesh[],
    handler: Function,
    nohandler?: Function
  ) {
    this.pointer.x = (coords.x / this.canvas.clientWidth) * 2 - 1;
    this.pointer.y = -(coords.y / this.canvas.clientHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(meshs);

    if (intersects.length > 0) {
      handler(intersects[0].object);
      return true;
    } else {
      nohandler && nohandler();
      return false;
    }
  }
}

interface ControllerOptions {
    closed?: boolean;
}

class Controller {
    gui: dat.GUI;

    constructor(options: ControllerOptions = {}) {
        const closed = options.closed;
        this.gui = new dat.GUI({ closed: closed ?? false });
    }

  addData(data: any, options: any = {}) {
    const { folder = this.gui, callback = () => {}, isUniform } = options;
    const dataKeys = Object.keys(data);
    const datData: any = {};

    dataKeys.forEach((key) => {
      datData[key] = data[key].value;
    });

    dataKeys.forEach((key) => {
      const { isColor, value, range, onChange, listen } = data[key];
      let type;

      if (isUniform) {
        switch (typeof value) {
          case 'boolean':
            type = '1i';
            break;
          case 'object':
            if (Array.isArray(value)) {
              type = value.length + 'f';
            } else {
              type = 't';
            }
            break;
          default:
            type = '1f';
            break;
        }
      }

      let controller;

      if (isColor) {
        controller = folder.addColor(datData, key);
      } else {
        let guiRange: any[] = [];

        if (range) {
          guiRange = range;
        } else if (key === 'frame') {
          guiRange = [0, 1];
        } else if (typeof value === 'number') {
          if (value < 1 && value >= 0) {
            guiRange = [0, 1];
          } else {
            const diff =
              Math.pow(10, String(Math.floor(value)).length - 1) * 2;
            guiRange = [value - diff, value + diff];
          }
        }

        controller = folder.add(datData, key, ...guiRange);
      }

      onChange && controller.onChange((value: any) => {
        onChange(value);
      });
      listen && controller.listen();
      callback(key, { type, value });
    });

    return datData;
  }

    addUniformData(data: any, uniforms: any = {}, options: any = {}) {
        return this.addData(data, {
            callback: (key: string, obj: any) => {
                uniforms[key] = obj;
            },
            folder: options.folder,
            isUniform: true,
        });
    }

    addFolder(name: string, isClosed?: boolean) {
        const folder = this.gui.addFolder(name);
        !isClosed && folder.open();
        return folder;
    }
}

interface Uniforms {
  [key: string]: { value: any };
}

const ShootingStar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<THREERoot | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const root = (rootRef.current = new THREERoot({
      canvas: canvasRef.current,
      isDev: true, // Enable developer mode
      fov: 45,
      cameraPosition: [0, 0, 100],
      alpha: true,
      clearColor: 0x000000,
    }));

    const controller = new Controller({ closed: true });
    const PER_MOUSE = 800;
    const COUNT = PER_MOUSE * 400;
    const MOUSE_ATTRIBUTE_COUNT = 4;
    const FRONT_ATTRIBUTE_COUNT = 2;

    const data = {
      visible: { value: true },
    };

    const uniformData = {
      size: { value: 0.05, range: [0, 1] },
      minSize: { value: 1, range: [0, 5] },
      speed: { value: 0.012, range: [0, 0.05] },
      fadeSpeed: { value: 1.1, range: [1, 2] },
      shortRangeFadeSpeed: { value: 1.3, range: [1, 5] },
      minFlashingSpeed: { value: 0.1, range: [0, 1] },
      spread: { value: 7, range: [0, 20] },
      maxSpread: { value: 5, range: [1, 20] },
      maxZ: { value: 100, range: [0, 500] },
      blur: { value: 1, range: [0, 1] },
      far: { value: 10, range: [0, 100] },
      maxDiff: { value: 100, range: [0, 1000] },
      diffPow: { value: 0.24, range: [0, 10] },
    };

    const dataKeys = Object.keys(uniformData);
    const folder = controller.addFolder('Shooting Star');
    const datData = controller.addData(data, { folder });

    const front = new THREE.Vector2();
    const uniforms: Uniforms = {
      resolution: { value: new THREE.Vector2(root.width, root.height) },
      pixelRatio: { value: root.renderer.getPixelRatio() },
      timestamp: { value: 0 },
      size: { value: uniformData.size.value },
      minSize: { value: uniformData.minSize.value },
      speed: { value: uniformData.speed.value },
      fadeSpeed: { value: uniformData.fadeSpeed.value },
      shortRangeFadeSpeed: { value: uniformData.shortRangeFadeSpeed.value },
      minFlashingSpeed: { value: uniformData.minFlashingSpeed.value },
      spread: { value: uniformData.spread.value },
      maxSpread: { value: uniformData.maxSpread.value },
      maxZ: { value: uniformData.maxZ.value },
      blur: { value: uniformData.blur.value },
      far: { value: uniformData.far.value },
      maxDiff: { value: uniformData.maxDiff.value },
      diffPow: { value: uniformData.diffPow.value },
    };

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const mouse = [];
    const aFront = [];
    const random = [];

    for (let i = 0; i < COUNT; i++) {
      positions.push(Math.random(), Math.random(), Math.random());
      mouse.push(-1, -1, 0, 0);
      aFront.push(front.x, front.y);
      random.push(Math.random());
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      'mouse',
      new THREE.Float32BufferAttribute(mouse, MOUSE_ATTRIBUTE_COUNT)
    );
    geometry.setAttribute(
      'aFront',
      new THREE.Float32BufferAttribute(aFront, FRONT_ATTRIBUTE_COUNT)
    );
    geometry.setAttribute('random', new THREE.Float32BufferAttribute(random, 1));

    const material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const mesh = new THREE.Points(geometry, material);
    mesh.frustumCulled = false;
    mesh.visible = datData.visible;
    root.add(mesh);

    let mouseI = 0;
    let lineCoordinateList: { clientX: number; clientY: number }[] = [];
    let enableSaveCoordinate = false; // Not used in this version
    let oldPosition: THREE.Vector2 | null = null;

    const draw = ({
      clientX,
      clientY,
    }: {
      clientX: number;
      clientY: number;
    }) => {
      enableSaveCoordinate &&
        lineCoordinateList.push({ clientX, clientY });

      const x = clientX * 1 + root.width / 2;
      const y = root.height - (clientY * 1 + root.height / 2);
      const newPosition = new THREE.Vector2(x, y);
      const diff = oldPosition
        ? newPosition.clone().sub(oldPosition)
        : new THREE.Vector2();
      const length = diff.length();
      const front = diff.clone().normalize();

      for (let i = 0; i < PER_MOUSE; i++) {
        const ci =
          (mouseI % (COUNT * MOUSE_ATTRIBUTE_COUNT)) +
          i * MOUSE_ATTRIBUTE_COUNT;
        const position = oldPosition
          ? oldPosition.clone().add(diff.clone().multiplyScalar(i / PER_MOUSE))
          : newPosition;
        geometry.attributes['mouse'].array[ci] = position.x;
        geometry.attributes['mouse'].array[ci + 1] = position.y;
        geometry.attributes['mouse'].array[ci + 2] = root.time;
        geometry.attributes['mouse'].array[ci + 3] = length;
        geometry.attributes['aFront'].array[ci] = front.x;
        geometry.attributes['aFront'].array[ci + 1] = front.y;
      }

      oldPosition = newPosition;
      geometry.attributes['mouse'].needsUpdate = true;
      geometry.attributes['aFront'].needsUpdate = true;
      mouseI += MOUSE_ATTRIBUTE_COUNT * PER_MOUSE;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      draw({
        clientX: clientX - root.width / 2,
        clientY: clientY - root.height / 2,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { clientX, clientY } = e.touches[0];
      draw({
        clientX: clientX - root.width / 2,
        clientY: clientY - root.height / 2,
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove);

    root.addResizeCallback(() => {
      material.uniforms['resolution'].value = new THREE.Vector2(
        root.width,
        root.height
      );
    });

    root.addUpdateCallback((timestamp: number) => {
      material.uniforms['timestamp'].value = timestamp;
    });
  }, []);

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
  );
};

export default ShootingStar;
