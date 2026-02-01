/**
 * TIGEN v2 - Advanced 3D Graphics Engine
 * Complete AAA-Grade Game Engine with Physics, Rendering, and Logic Systems
 */

// ===== VECTOR MATH =====
class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(v) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  subtract(v) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiply(s) {
    return new Vector3(this.x * s, this.y * s, this.z * s);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v) {
    return new Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    const len = this.length();
    if (len === 0) return new Vector3(0, 0, 0);
    return new Vector3(this.x / len, this.y / len, this.z / len);
  }

  clone() {
    return new Vector3(this.x, this.y, this.z);
  }

  toArray() {
    return [this.x, this.y, this.z];
  }
}

// ===== TRANSFORM SYSTEM =====
class Transform {
  constructor() {
    this.position = new Vector3(0, 0, 0);
    this.rotation = new Vector3(0, 0, 0);
    this.scale = new Vector3(1, 1, 1);
    this.isDirty = true;
    this.matrix = this.computeMatrix();
  }

  setPosition(x, y, z) {
    this.position = new Vector3(x, y, z);
    this.isDirty = true;
  }

  setRotation(x, y, z) {
    this.rotation = new Vector3(x, y, z);
    this.isDirty = true;
  }

  setScale(x, y, z) {
    this.scale = new Vector3(x, y, z);
    this.isDirty = true;
  }

  translate(x, y, z) {
    this.position = this.position.add(new Vector3(x, y, z));
    this.isDirty = true;
  }

  rotate(x, y, z) {
    this.rotation = this.rotation.add(new Vector3(x, y, z));
    this.isDirty = true;
  }

  computeMatrix() {
    if (!this.isDirty) return this.matrix;
    
    const matrix = [
      1, 0, 0, this.position.x,
      0, 1, 0, this.position.y,
      0, 0, 1, this.position.z,
      0, 0, 0, 1
    ];
    this.isDirty = false;
    return matrix;
  }

  serialize() {
    return {
      position: this.position.toArray(),
      rotation: this.rotation.toArray(),
      scale: this.scale.toArray()
    };
  }
}

// ===== MATERIAL SYSTEM =====
class Material {
  constructor(name = 'Material') {
    this.name = name;
    this.color = { r: 1, g: 1, b: 1, a: 1 };
    this.metalness = 0.5;
    this.roughness = 0.5;
    this.emissive = { r: 0, g: 0, b: 0 };
    this.emissiveIntensity = 0;
    this.transparent = false;
    this.opacity = 1;
  }

  clone() {
    const mat = new Material(this.name);
    mat.color = { ...this.color };
    mat.metalness = this.metalness;
    mat.roughness = this.roughness;
    mat.emissive = { ...this.emissive };
    mat.emissiveIntensity = this.emissiveIntensity;
    mat.transparent = this.transparent;
    mat.opacity = this.opacity;
    return mat;
  }

  serialize() {
    return {
      name: this.name,
      color: this.color,
      metalness: this.metalness,
      roughness: this.roughness,
      emissive: this.emissive,
      emissiveIntensity: this.emissiveIntensity,
      transparent: this.transparent,
      opacity: this.opacity
    };
  }
}

// ===== GEOMETRY SYSTEM =====
class Geometry {
  constructor(type = 'box') {
    this.type = type;
    this.vertices = [];
    this.faces = [];
    this.normals = [];
    this.generateGeometry(type);
  }

  generateGeometry(type) {
    switch (type) {
      case 'box':
        this.generateBox();
        break;
      case 'sphere':
        this.generateSphere();
        break;
      case 'cylinder':
        this.generateCylinder();
        break;
      case 'plane':
        this.generatePlane();
        break;
      case 'pyramid':
        this.generatePyramid();
        break;
      case 'torus':
        this.generateTorus();
        break;
    }
  }

  generateBox() {
    this.vertices = [
      -1, -1, 1,   1, -1, 1,   1, 1, 1,   -1, 1, 1,
      -1, -1, -1, -1, 1, -1,  1, 1, -1,  1, -1, -1,
    ];
    this.faces = [
      0, 1, 2,  0, 2, 3,
      4, 6, 5,  4, 7, 6,
      4, 0, 3,  4, 3, 5,
      1, 7, 6,  1, 6, 2,
      0, 7, 1,  0, 4, 7,
      2, 6, 3,  3, 6, 5,
    ];
  }

  generateSphere() {
    const radius = 1;
    const segments = 16;
    const rings = 16;
    
    for (let i = 0; i <= rings; i++) {
      const phi = (i / rings) * Math.PI;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        this.vertices.push(x, y, z);
      }
    }
    
    for (let i = 0; i < rings; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + j;
        const b = a + segments + 1;
        this.faces.push(a, b, a + 1);
        this.faces.push(b, b + 1, a + 1);
      }
    }
  }

  generateCylinder() {
    const radius = 1;
    const height = 2;
    const segments = 16;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      this.vertices.push(x, height / 2, z);
      this.vertices.push(x, -height / 2, z);
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = (i + 1) * 2;
      this.faces.push(a, b, a + 1);
      this.faces.push(b, b + 1, a + 1);
    }
  }

  generatePlane() {
    this.vertices = [-1, 0, 1,  1, 0, 1,  1, 0, -1,  -1, 0, -1];
    this.faces = [0, 1, 2,  0, 2, 3];
  }

  generatePyramid() {
    this.vertices = [0, 1, 0,  -1, -1, 1,  1, -1, 1,  1, -1, -1,  -1, -1, -1];
    this.faces = [0, 1, 2,  0, 2, 3,  0, 3, 4,  0, 4, 1,  1, 2, 3,  1, 3, 4];
  }

  generateTorus() {
    const radius = 1;
    const tubeRadius = 0.3;
    const radialSegments = 16;
    const tubularSegments = 16;

    for (let i = 0; i <= radialSegments; i++) {
      const theta = (i / radialSegments) * Math.PI * 2;
      for (let j = 0; j <= tubularSegments; j++) {
        const phi = (j / tubularSegments) * Math.PI * 2;
        const x = (radius + tubeRadius * Math.cos(phi)) * Math.cos(theta);
        const y = tubeRadius * Math.sin(phi);
        const z = (radius + tubeRadius * Math.cos(phi)) * Math.sin(theta);
        this.vertices.push(x, y, z);
      }
    }

    for (let i = 0; i < radialSegments; i++) {
      for (let j = 0; j < tubularSegments; j++) {
        const a = (i * (tubularSegments + 1)) + j;
        const b = a + tubularSegments + 1;
        this.faces.push(a, b, a + 1);
        this.faces.push(b, b + 1, a + 1);
      }
    }
  }

  computeNormals() {
    const normals = new Array(this.vertices.length).fill(0);
    for (let i = 0; i < this.faces.length; i += 3) {
      const a = this.faces[i] * 3;
      const b = this.faces[i + 1] * 3;
      const c = this.faces[i + 2] * 3;

      const v1 = [this.vertices[b] - this.vertices[a], this.vertices[b + 1] - this.vertices[a + 1], this.vertices[b + 2] - this.vertices[a + 2]];
      const v2 = [this.vertices[c] - this.vertices[a], this.vertices[c + 1] - this.vertices[a + 1], this.vertices[c + 2] - this.vertices[a + 2]];

      const nx = v1[1] * v2[2] - v1[2] * v2[1];
      const ny = v1[2] * v2[0] - v1[0] * v2[2];
      const nz = v1[0] * v2[1] - v1[1] * v2[0];

      const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      normals[a] += nx / len;
      normals[a + 1] += ny / len;
      normals[a + 2] += nz / len;
      normals[b] += nx / len;
      normals[b + 1] += ny / len;
      normals[b + 2] += nz / len;
      normals[c] += nx / len;
      normals[c + 1] += ny / len;
      normals[c + 2] += nz / len;
    }
    this.normals = normals;
  }

  getVertexCount() {
    return this.vertices.length / 3;
  }

  getFaceCount() {
    return this.faces.length / 3;
  }
}

// ===== MESH COMPONENT =====
class Mesh {
  constructor() {
    this.geometry = null;
    this.material = new Material();
    this.castShadow = true;
    this.receiveShadow = true;
    this.visible = true;
  }

  setGeometry(type) {
    this.geometry = new Geometry(type);
    this.geometry.computeNormals();
  }

  setColor(r, g, b, a = 1) {
    this.material.color = { r, g, b, a };
  }

  serialize() {
    return {
      type: 'Mesh',
      geometry: this.geometry ? this.geometry.type : null,
      material: this.material.serialize(),
      castShadow: this.castShadow,
      receiveShadow: this.receiveShadow,
      visible: this.visible
    };
  }
}

// ===== PHYSICS COMPONENT =====
class Physics {
  constructor() {
    this.mass = 1;
    this.velocity = new Vector3(0, 0, 0);
    this.acceleration = new Vector3(0, 0, 0);
    this.useGravity = true;
    this.gravity = new Vector3(0, -9.8, 0);
    this.friction = 0.1;
    this.bounciness = 0.2;
    this.drag = 0.01;
    this.isKinematic = false;
  }

  applyForce(force) {
    if (this.mass === 0) return;
    this.acceleration = this.acceleration.add(force.multiply(1 / this.mass));
  }

  update(deltaTime) {
    if (this.mass === 0 || this.isKinematic) return;

    if (this.useGravity) {
      this.applyForce(this.gravity.multiply(this.mass));
    }

    this.velocity = this.velocity.add(this.acceleration.multiply(deltaTime));
    this.velocity = this.velocity.multiply(1 - this.drag);
    this.acceleration = new Vector3(0, 0, 0);

    return this.velocity.multiply(deltaTime);
  }

  serialize() {
    return {
      type: 'Physics',
      mass: this.mass,
      useGravity: this.useGravity,
      friction: this.friction,
      bounciness: this.bounciness,
      drag: this.drag,
      isKinematic: this.isKinematic
    };
  }
}

// ===== LIGHT COMPONENT =====
class Light {
  constructor(type = 'directional') {
    this.type = type;
    this.color = { r: 1, g: 1, b: 1 };
    this.intensity = 1;
    this.range = 100;
    this.angle = Math.PI / 3;
    this.penumbra = 0;
    this.decay = 1;
    this.castShadow = true;
    this.shadowMapSize = 1024;
  }

  serialize() {
    return {
      type: 'Light',
      lightType: this.type,
      color: this.color,
      intensity: this.intensity,
      range: this.range,
      angle: this.angle,
      penumbra: this.penumbra,
      decay: this.decay,
      castShadow: this.castShadow,
      shadowMapSize: this.shadowMapSize
    };
  }
}

// ===== CAMERA COMPONENT =====
class Camera {
  constructor() {
    this.fov = 75;
    this.near = 0.1;
    this.far = 1000;
    this.aspect = 16 / 9;
    this.isPrimary = false;
  }

  getProjectionMatrix() {
    const f = 1 / Math.tan(this.fov * Math.PI / 360);
    const nf = 1 / (this.near - this.far);
    return [
      f / this.aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (this.far + this.near) * nf, -1,
      0, 0, (2 * this.far * this.near) * nf, 0
    ];
  }

  serialize() {
    return {
      type: 'Camera',
      fov: this.fov,
      near: this.near,
      far: this.far,
      aspect: this.aspect,
      isPrimary: this.isPrimary
    };
  }
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
  constructor() {
    this.maxParticles = 1000;
    this.emissionRate = 50;
    this.lifetime = 2;
    this.speed = 5;
    this.particles = [];
    this.emitting = true;
  }

  emit(count = 1) {
    for (let i = 0; i < count && this.particles.length < this.maxParticles; i++) {
      this.particles.push({
        age: 0,
        lifetime: this.lifetime,
        position: new Vector3(0, 0, 0),
        velocity: new Vector3(
          (Math.random() - 0.5) * this.speed,
          Math.random() * this.speed,
          (Math.random() - 0.5) * this.speed
        ),
        size: 1
      });
    }
  }

  update(deltaTime) {
    if (this.emitting) {
      this.emit(Math.ceil(this.emissionRate * deltaTime));
    }

    this.particles = this.particles.filter(p => {
      p.age += deltaTime;
      if (p.age < p.lifetime) {
        p.position = p.position.add(p.velocity.multiply(deltaTime));
        p.size = 1 - (p.age / p.lifetime);
        return true;
      }
      return false;
    });
  }

  serialize() {
    return {
      type: 'ParticleSystem',
      maxParticles: this.maxParticles,
      emissionRate: this.emissionRate,
      lifetime: this.lifetime,
      speed: this.speed
    };
  }
}

// ===== AUDIO SOURCE =====
class AudioSource {
  constructor() {
    this.clip = null;
    this.volume = 1;
    this.pitch = 1;
    this.loop = false;
    this.is3D = true;
    this.isPlaying = false;
  }

  play() {
    this.isPlaying = true;
  }

  stop() {
    this.isPlaying = false;
  }

  serialize() {
    return {
      type: 'AudioSource',
      volume: this.volume,
      pitch: this.pitch,
      loop: this.loop,
      is3D: this.is3D
    };
  }
}

// ===== SCRIPT COMPONENT (Logic System) =====
class Script {
  constructor() {
    this.enabled = true;
    this.entity = null;
  }

  onAwake() {}
  onStart() {}
  onUpdate(deltaTime) {}
  onFixedUpdate(deltaTime) {}
  onDestroy() {}
}

// ===== ENTITY =====
class Entity {
  constructor(name = 'Entity') {
    this.name = name;
    this.uuid = this.generateUUID();
    this.active = true;
    this.transform = new Transform();
    this.components = {
      mesh: null,
      physics: null,
      light: null,
      camera: null,
      particleSystem: null,
      audioSource: null,
      script: null
    };
    this.children = [];
    this.parent = null;
    this.layer = 0;
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  addComponent(componentType) {
    const component = new componentType();
    component.entity = this;

    if (componentType === Mesh) this.components.mesh = component;
    else if (componentType === Physics) this.components.physics = component;
    else if (componentType === Light) this.components.light = component;
    else if (componentType === Camera) this.components.camera = component;
    else if (componentType === ParticleSystem) this.components.particleSystem = component;
    else if (componentType === AudioSource) this.components.audioSource = component;

    return component;
  }

  addScript(scriptClass) {
    const script = new scriptClass();
    script.entity = this;
    this.components.script = script;
    script.onAwake();
    return script;
  }

  getComponent(componentType) {
    if (componentType === Mesh) return this.components.mesh;
    if (componentType === Physics) return this.components.physics;
    if (componentType === Light) return this.components.light;
    if (componentType === Camera) return this.components.camera;
    if (componentType === ParticleSystem) return this.components.particleSystem;
    if (componentType === AudioSource) return this.components.audioSource;
    return null;
  }

  update(deltaTime) {
    if (!this.active) return;

    if (this.components.physics) {
      const displacement = this.components.physics.update(deltaTime);
      if (displacement) {
        this.transform.translate(displacement.x, displacement.y, displacement.z);
      }
    }

    if (this.components.particleSystem) {
      this.components.particleSystem.update(deltaTime);
    }

    if (this.components.script) {
      this.components.script.onUpdate(deltaTime);
    }

    for (const child of this.children) {
      child.update(deltaTime);
    }
  }

  serialize() {
    return {
      name: this.name,
      uuid: this.uuid,
      active: this.active,
      transform: this.transform.serialize(),
      components: {
        mesh: this.components.mesh ? this.components.mesh.serialize() : null,
        physics: this.components.physics ? this.components.physics.serialize() : null,
        light: this.components.light ? this.components.light.serialize() : null,
        camera: this.components.camera ? this.components.camera.serialize() : null,
        particleSystem: this.components.particleSystem ? this.components.particleSystem.serialize() : null,
        audioSource: this.components.audioSource ? this.components.audioSource.serialize() : null
      },
      children: this.children.map(c => c.serialize())
    };
  }
}

// ===== SCENE =====
class Scene {
  constructor(name = 'Scene') {
    this.name = name;
    this.entities = [];
    this.rootEntities = [];
    this.lights = [];
    this.cameras = [];
    this.ambientLight = { r: 0.5, g: 0.5, b: 0.5 };
    this.backgroundColor = { r: 0.1, g: 0.1, b: 0.1 };
    this.fog = { enabled: false, near: 0, far: 100, color: { r: 1, g: 1, b: 1 } };
  }

  createEntity(name = 'Entity') {
    const entity = new Entity(name);
    this.entities.push(entity);
    this.rootEntities.push(entity);

    if (entity.components.light) {
      this.lights.push(entity);
    }
    if (entity.components.camera) {
      this.cameras.push(entity);
    }

    return entity;
  }

  removeEntity(entity) {
    const idx = this.entities.indexOf(entity);
    if (idx > -1) this.entities.splice(idx, 1);

    const ridx = this.rootEntities.indexOf(entity);
    if (ridx > -1) this.rootEntities.splice(ridx, 1);

    const lidx = this.lights.indexOf(entity);
    if (lidx > -1) this.lights.splice(lidx, 1);

    const cidx = this.cameras.indexOf(entity);
    if (cidx > -1) this.cameras.splice(cidx, 1);
  }

  update(deltaTime) {
    for (const entity of this.rootEntities) {
      entity.update(deltaTime);
    }
  }

  getPrimaryCamera() {
    return this.cameras.find(c => c.components.camera.isPrimary) || this.cameras[0];
  }

  serialize() {
    return {
      name: this.name,
      ambientLight: this.ambientLight,
      backgroundColor: this.backgroundColor,
      fog: this.fog,
      entities: this.rootEntities.map(e => e.serialize())
    };
  }
}

// ===== GAME LOOP =====
class GameLoop {
  constructor(targetFPS = 60) {
    this.targetFPS = targetFPS;
    this.frameTime = 1 / targetFPS;
    this.running = false;
    this.deltaTime = 0;
    this.lastTime = 0;
    this.fps = 0;
    this.frameCount = 0;
    this.callback = null;
  }

  setCallback(callback) {
    this.callback = callback;
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    this.tick();
  }

  stop() {
    this.running = false;
  }

  tick = () => {
    if (!this.running) return;

    const now = performance.now();
    this.deltaTime = (now - this.lastTime) / 1000;
    this.lastTime = now;

    this.frameCount++;
    if (this.frameCount % 10 === 0) {
      this.fps = Math.round(1 / this.deltaTime);
    }

    if (this.callback) {
      this.callback(this.deltaTime);
    }

    requestAnimationFrame(this.tick);
  };
}

// ===== INPUT MANAGER =====
class InputManager {
  constructor() {
    this.keys = {};
    this.mousePos = { x: 0, y: 0 };
    this.mouseDelta = { x: 0, y: 0 };
    this.mouseDown = {};
    this.lastMousePos = { x: 0, y: 0 };

    document.addEventListener('keydown', (e) => this.keys[e.key.toLowerCase()] = true);
    document.addEventListener('keyup', (e) => this.keys[e.key.toLowerCase()] = false);
    document.addEventListener('mousemove', (e) => {
      this.mouseDelta.x = e.clientX - this.lastMousePos.x;
      this.mouseDelta.y = e.clientY - this.lastMousePos.y;
      this.lastMousePos = { x: e.clientX, y: e.clientY };
      this.mousePos = { x: e.clientX, y: e.clientY };
    });
    document.addEventListener('mousedown', (e) => this.mouseDown[e.button] = true);
    document.addEventListener('mouseup', (e) => this.mouseDown[e.button] = false);
  }

  isKeyPressed(key) {
    return this.keys[key.toLowerCase()] || false;
  }

  isMouseDown(button = 0) {
    return this.mouseDown[button] || false;
  }

  getMousePosition() {
    return this.mousePos;
  }

  getMouseDelta() {
    return this.mouseDelta;
  }
}

// ===== RENDERER (Canvas-based Graphics) =====
class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.scenes = [];
    this.activeScene = null;
    this.projection = [];
    this.drawDistance = 1000;
  }

  createScene(name) {
    const scene = new Scene(name);
    this.scenes.push(scene);
    this.activeScene = scene;
    return scene;
  }

  render(deltaTime) {
    if (!this.activeScene) return;

    const { width, height } = this.canvas;
    this.ctx.fillStyle = `rgb(${Math.floor(this.activeScene.backgroundColor.r * 255)}, ${Math.floor(this.activeScene.backgroundColor.g * 255)}, ${Math.floor(this.activeScene.backgroundColor.b * 255)})`;
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = '12px monospace';
    this.ctx.fillText(`FPS: ${Math.round(1 / deltaTime)}`, 10, 20);
    this.ctx.fillText(`Entities: ${this.activeScene.entities.length}`, 10, 35);
    this.ctx.fillText(`Objects rendered: ${this.getVisibleObjectCount()}`, 10, 50);

    this.drawScene(this.activeScene);
  }

  drawScene(scene) {
    const { width, height } = this.canvas;

    for (const entity of scene.rootEntities) {
      this.drawEntity(entity, width, height);
    }
  }

  drawEntity(entity, width, height) {
    if (!entity.active || !entity.components.mesh) return;

    const mesh = entity.components.mesh;
    if (!mesh.visible || !mesh.geometry) return;

    const x = entity.transform.position.x * 50 + width / 2;
    const y = entity.transform.position.y * 50 + height / 2;
    const scale = entity.transform.scale.x * 30;

    this.ctx.save();
    this.ctx.translate(x, y);

    const rotation = entity.transform.rotation.z;
    this.ctx.rotate(rotation);

    const mat = mesh.material;
    this.ctx.fillStyle = `rgba(${Math.floor(mat.color.r * 255)}, ${Math.floor(mat.color.g * 255)}, ${Math.floor(mat.color.b * 255)}, ${mat.opacity})`;
    this.ctx.strokeStyle = '#00ff88';
    this.ctx.lineWidth = 1;

    if (mesh.geometry.type === 'box') {
      this.ctx.fillRect(-scale / 2, -scale / 2, scale, scale);
      this.ctx.strokeRect(-scale / 2, -scale / 2, scale, scale);
    } else if (mesh.geometry.type === 'sphere') {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, scale / 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    } else if (mesh.geometry.type === 'pyramid') {
      this.ctx.beginPath();
      this.ctx.moveTo(0, -scale / 2);
      this.ctx.lineTo(scale / 2, scale / 2);
      this.ctx.lineTo(-scale / 2, scale / 2);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    } else if (mesh.geometry.type === 'plane') {
      this.ctx.fillRect(-scale, -2, scale * 2, 4);
    }

    this.ctx.restore();

    for (const child of entity.children) {
      this.drawEntity(child, width, height);
    }
  }

  getVisibleObjectCount() {
    if (!this.activeScene) return 0;
    return this.activeScene.entities.filter(e => e.components.mesh && e.components.mesh.visible).length;
  }
}

// ===== EXPORTS =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Vector3,
    Transform,
    Material,
    Geometry,
    Mesh,
    Physics,
    Light,
    Camera,
    ParticleSystem,
    AudioSource,
    Script,
    Entity,
    Scene,
    GameLoop,
    InputManager,
    Renderer
  };
}
