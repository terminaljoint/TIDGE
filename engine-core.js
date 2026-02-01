/**
 * TIGEN v2 - Core Engine
 * Advanced 3D Game Engine
 */

// ===== SCENE MANAGEMENT =====
class Scene {
  constructor(name = 'Scene') {
    this.name = name;
    this.entities = [];
    this.root = null;
  }

  createEntity(name = 'Entity') {
    const entity = new Entity(name);
    this.entities.push(entity);
    return entity;
  }

  removeEntity(entity) {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
    }
  }

  getEntityByName(name) {
    return this.entities.find(e => e.name === name);
  }

  getAllEntities() {
    return this.entities;
  }

  clear() {
    this.entities = [];
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      if (entity.update) {
        entity.update(deltaTime);
      }
    });
  }
}

// ===== ENTITY COMPONENT SYSTEM =====
class Entity {
  constructor(name = 'Entity') {
    this.name = name;
    this.components = [];
    this.transform = new Transform();
    this.active = true;
    this.uuid = this.generateUUID();
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  addComponent(ComponentClass) {
    const component = new ComponentClass(this);
    this.components.push(component);
    return component;
  }

  getComponent(ComponentClass) {
    return this.components.find(c => c instanceof ComponentClass);
  }

  removeComponent(ComponentClass) {
    const index = this.components.findIndex(c => c instanceof ComponentClass);
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }

  update(deltaTime) {
    this.components.forEach(component => {
      if (component.update) {
        component.update(deltaTime);
      }
    });
  }

  serialize() {
    return {
      name: this.name,
      uuid: this.uuid,
      transform: this.transform.serialize(),
      components: this.components.map(c => c.serialize ? c.serialize() : {})
    };
  }
}

// ===== TRANSFORM COMPONENT =====
class Transform {
  constructor() {
    this.position = { x: 0, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
  }

  setPosition(x, y, z) {
    this.position = { x, y, z };
  }

  setRotation(x, y, z) {
    this.rotation = { x, y, z };
  }

  setScale(x, y, z) {
    this.scale = { x, y, z };
  }

  translate(x, y, z) {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
  }

  rotate(x, y, z) {
    this.rotation.x += x;
    this.rotation.y += y;
    this.rotation.z += z;
  }

  serialize() {
    return {
      position: this.position,
      rotation: this.rotation,
      scale: this.scale
    };
  }
}

// ===== COMPONENT BASE CLASS =====
class Component {
  constructor(entity) {
    this.entity = entity;
    this.enabled = true;
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  serialize() {
    return { type: this.constructor.name, enabled: this.enabled };
  }
}

// ===== MESH COMPONENT =====
class Mesh extends Component {
  constructor(entity) {
    super(entity);
    this.geometry = null;
    this.material = null;
  }

  setGeometry(type, params = {}) {
    this.geometry = { type, params };
    return this;
  }

  setMaterial(type, params = {}) {
    this.material = { type, params };
    return this;
  }

  serialize() {
    return {
      ...super.serialize(),
      geometry: this.geometry,
      material: this.material
    };
  }
}

// ===== PHYSICS COMPONENT =====
class Physics extends Component {
  constructor(entity) {
    super(entity);
    this.mass = 1;
    this.velocity = { x: 0, y: 0, z: 0 };
    this.acceleration = { x: 0, y: 0, z: 0 };
    this.useGravity = true;
    this.friction = 0.1;
    this.bounciness = 0.2;
  }

  applyForce(x, y, z) {
    this.acceleration.x += x / this.mass;
    this.acceleration.y += y / this.mass;
    this.acceleration.z += z / this.mass;
  }

  serialize() {
    return {
      ...super.serialize(),
      mass: this.mass,
      velocity: this.velocity,
      useGravity: this.useGravity,
      friction: this.friction,
      bounciness: this.bounciness
    };
  }
}

// ===== LIGHT COMPONENT =====
class Light extends Component {
  constructor(entity) {
    super(entity);
    this.type = 'directional'; // directional, point, spot
    this.color = { r: 1, g: 1, b: 1 };
    this.intensity = 1;
    this.range = 100;
  }

  serialize() {
    return {
      ...super.serialize(),
      type: this.type,
      color: this.color,
      intensity: this.intensity,
      range: this.range
    };
  }
}

// ===== CAMERA COMPONENT =====
class Camera extends Component {
  constructor(entity) {
    super(entity);
    this.fov = 75;
    this.near = 0.1;
    this.far = 1000;
    this.isPrimary = false;
  }

  serialize() {
    return {
      ...super.serialize(),
      fov: this.fov,
      near: this.near,
      far: this.far,
      isPrimary: this.isPrimary
    };
  }
}

// ===== PARTICLE SYSTEM COMPONENT =====
class ParticleSystem extends Component {
  constructor(entity) {
    super(entity);
    this.maxParticles = 100;
    this.emissionRate = 10;
    this.lifetime = 2;
    this.speed = 5;
    this.particles = [];
  }

  emit(count = 1) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        age: 0,
        lifetime: this.lifetime,
        position: { ...this.entity.transform.position },
        velocity: { x: Math.random() - 0.5, y: Math.random(), z: Math.random() - 0.5 }
      });
    }
  }

  update(deltaTime) {
    if (!this.enabled) return;
    this.particles = this.particles.filter(p => {
      p.age += deltaTime;
      return p.age < p.lifetime;
    });
  }

  serialize() {
    return {
      ...super.serialize(),
      maxParticles: this.maxParticles,
      emissionRate: this.emissionRate,
      lifetime: this.lifetime,
      speed: this.speed
    };
  }
}

// ===== AUDIO COMPONENT =====
class AudioSource extends Component {
  constructor(entity) {
    super(entity);
    this.clip = null;
    this.volume = 1;
    this.pitch = 1;
    this.loop = false;
    this.is3D = true;
  }

  play() {
    if (!this.enabled) return;
    // Audio playback would be implemented here
  }

  stop() {
    // Audio stop would be implemented here
  }

  serialize() {
    return {
      ...super.serialize(),
      clip: this.clip,
      volume: this.volume,
      pitch: this.pitch,
      loop: this.loop,
      is3D: this.is3D
    };
  }
}

// ===== RENDERER =====
class Renderer {
  constructor(container) {
    this.container = container;
    this.scenes = [];
    this.activeScene = null;
    this.cameras = [];
  }

  createScene(name) {
    const scene = new Scene(name);
    this.scenes.push(scene);
    this.activeScene = scene;
    return scene;
  }

  removeScene(scene) {
    const index = this.scenes.indexOf(scene);
    if (index > -1) {
      this.scenes.splice(index, 1);
    }
  }

  render(deltaTime) {
    if (!this.activeScene) return;
    this.activeScene.update(deltaTime);
    // Rendering logic would be implemented here
  }
}

// ===== GAME LOOP =====
class GameLoop {
  constructor(fps = 60) {
    this.fps = fps;
    this.running = false;
    this.deltaTime = 0;
    this.lastFrameTime = 0;
    this.callback = null;
  }

  setCallback(callback) {
    this.callback = callback;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastFrameTime = Date.now();
    this.loop();
  }

  stop() {
    this.running = false;
  }

  loop = () => {
    if (!this.running) return;

    const now = Date.now();
    this.deltaTime = (now - this.lastFrameTime) / 1000;
    this.lastFrameTime = now;

    if (this.callback) {
      this.callback(this.deltaTime);
    }

    requestAnimationFrame(this.loop);
  };
}

// ===== INPUT MANAGER =====
class InputManager {
  constructor() {
    this.keys = {};
    this.mousePosition = { x: 0, y: 0 };
    this.mouseDown = false;

    document.addEventListener('keydown', e => this.keys[e.key] = true);
    document.addEventListener('keyup', e => this.keys[e.key] = false);
    document.addEventListener('mousemove', e => {
      this.mousePosition = { x: e.clientX, y: e.clientY };
    });
    document.addEventListener('mousedown', () => this.mouseDown = true);
    document.addEventListener('mouseup', () => this.mouseDown = false);
  }

  isKeyDown(key) {
    return this.keys[key] || false;
  }

  getMousePosition() {
    return this.mousePosition;
  }

  isMouseDown() {
    return this.mouseDown;
  }
}

// ===== ASSET MANAGER =====
class AssetManager {
  constructor() {
    this.assets = new Map();
    this.loadedAssets = new Map();
  }

  registerAsset(name, data) {
    this.assets.set(name, data);
  }

  getAsset(name) {
    return this.assets.get(name);
  }

  loadAsset(name) {
    return this.loadedAssets.get(name);
  }

  clear() {
    this.assets.clear();
    this.loadedAssets.clear();
  }
}

// ===== EXPORT =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Scene,
    Entity,
    Transform,
    Component,
    Mesh,
    Physics,
    Light,
    Camera,
    ParticleSystem,
    AudioSource,
    Renderer,
    GameLoop,
    InputManager,
    AssetManager
  };
}
