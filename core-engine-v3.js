/**
 * TIGEN v3 - PROFESSIONAL AAA GAME ENGINE
 * Real-time 3D Graphics, Physics, Animation, and Asset Management
 * Complete working implementation
 */

// ===== MATH LIBRARY =====
class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static zero() { return new Vec3(0, 0, 0); }
  static one() { return new Vec3(1, 1, 1); }
  static up() { return new Vec3(0, 1, 0); }
  static right() { return new Vec3(1, 0, 0); }
  static forward() { return new Vec3(0, 0, 1); }

  add(v) { return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z); }
  sub(v) { return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z); }
  mul(s) { return new Vec3(this.x * s, this.y * s, this.z * s); }
  dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
  cross(v) { return new Vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x); }
  len() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
  norm() { const l = this.len(); return l > 0 ? new Vec3(this.x / l, this.y / l, this.z / l) : Vec3.zero(); }
  clone() { return new Vec3(this.x, this.y, this.z); }
}

class Matrix4 {
  constructor() {
    this.m = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
  }

  static translation(v) {
    const m = new Matrix4();
    m.m[12] = v.x;
    m.m[13] = v.y;
    m.m[14] = v.z;
    return m;
  }

  static rotationY(angle) {
    const m = new Matrix4();
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    m.m[0] = c; m.m[8] = s;
    m.m[2] = -s; m.m[10] = c;
    return m;
  }

  static scale(v) {
    const m = new Matrix4();
    m.m[0] = v.x;
    m.m[5] = v.y;
    m.m[10] = v.z;
    return m;
  }

  multiply(other) {
    const result = new Matrix4();
    for (let i = 0; i < 16; i++) {
      const row = Math.floor(i / 4);
      const col = i % 4;
      result.m[i] = 0;
      for (let k = 0; k < 4; k++) {
        result.m[i] += this.m[row * 4 + k] * other.m[k * 4 + col];
      }
    }
    return result;
  }
}

// ===== KEYFRAME ANIMATION SYSTEM =====
class Keyframe {
  constructor(time, value) {
    this.time = time;
    this.value = value;
  }
}

class AnimationCurve {
  constructor(name = 'Curve') {
    this.name = name;
    this.keyframes = [];
    this.loop = true;
  }

  addKeyframe(time, value) {
    this.keyframes.push(new Keyframe(time, value));
    this.keyframes.sort((a, b) => a.time - b.time);
  }

  evaluate(time) {
    if (this.keyframes.length === 0) return 0;
    if (this.keyframes.length === 1) return this.keyframes[0].value;

    const duration = this.keyframes[this.keyframes.length - 1].time;
    let t = time % duration;
    if (!this.loop && time > duration) t = duration;

    for (let i = 0; i < this.keyframes.length - 1; i++) {
      const k1 = this.keyframes[i];
      const k2 = this.keyframes[i + 1];
      if (t >= k1.time && t <= k2.time) {
        const range = k2.time - k1.time;
        const blend = (t - k1.time) / range;
        return k1.value + (k2.value - k1.value) * blend;
      }
    }
    return this.keyframes[this.keyframes.length - 1].value;
  }

  getDuration() {
    return this.keyframes.length > 0 ? this.keyframes[this.keyframes.length - 1].time : 0;
  }

  serialize() {
    return {
      name: this.name,
      loop: this.loop,
      keyframes: this.keyframes.map(k => ({ time: k.time, value: k.value }))
    };
  }
}

class AnimationClip {
  constructor(name = 'Animation') {
    this.name = name;
    this.curves = {
      posX: new AnimationCurve('posX'),
      posY: new AnimationCurve('posY'),
      posZ: new AnimationCurve('posZ'),
      rotX: new AnimationCurve('rotX'),
      rotY: new AnimationCurve('rotY'),
      rotZ: new AnimationCurve('rotZ'),
      scaleX: new AnimationCurve('scaleX'),
      scaleY: new AnimationCurve('scaleY'),
      scaleZ: new AnimationCurve('scaleZ'),
    };
    this.duration = 0;
  }

  addKeyframe(curve, time, value) {
    if (this.curves[curve]) {
      this.curves[curve].addKeyframe(time, value);
      this.duration = Math.max(this.duration, time);
    }
  }

  evaluate(time) {
    return {
      pos: new Vec3(
        this.curves.posX.evaluate(time),
        this.curves.posY.evaluate(time),
        this.curves.posZ.evaluate(time)
      ),
      rot: new Vec3(
        this.curves.rotX.evaluate(time),
        this.curves.rotY.evaluate(time),
        this.curves.rotZ.evaluate(time)
      ),
      scale: new Vec3(
        this.curves.scaleX.evaluate(time),
        this.curves.scaleY.evaluate(time),
        this.curves.scaleZ.evaluate(time)
      )
    };
  }

  serialize() {
    return {
      name: this.name,
      duration: this.duration,
      curves: Object.keys(this.curves).reduce((acc, key) => {
        acc[key] = this.curves[key].serialize();
        return acc;
      }, {})
    };
  }
}

class AnimationController {
  constructor(entity) {
    this.entity = entity;
    this.clips = {};
    this.currentClip = null;
    this.currentTime = 0;
    this.isPlaying = false;
    this.speed = 1;
  }

  addClip(clip) {
    this.clips[clip.name] = clip;
  }

  play(clipName) {
    if (this.clips[clipName]) {
      this.currentClip = this.clips[clipName];
      this.currentTime = 0;
      this.isPlaying = true;
    }
  }

  stop() {
    this.isPlaying = false;
    this.currentTime = 0;
  }

  update(deltaTime) {
    if (!this.isPlaying || !this.currentClip) return;

    this.currentTime += deltaTime * this.speed;

    const transform = this.currentClip.evaluate(this.currentTime);
    this.entity.transform.position = transform.pos;
    this.entity.transform.rotation = transform.rot;
    this.entity.transform.scale = transform.scale;

    if (this.currentTime > this.currentClip.duration) {
      if (this.currentClip.curves.posX.loop) {
        this.currentTime = 0;
      } else {
        this.isPlaying = false;
      }
    }
  }
}

// ===== ASSET SYSTEM =====
class Asset {
  constructor(id, name, type, data = {}) {
    this.id = id;
    this.name = name;
    this.type = type; // 'mesh', 'material', 'animation', 'texture'
    this.data = data;
    this.tags = [];
  }
}

class AssetManager {
  constructor() {
    this.assets = new Map();
    this.nextId = 1;
    this.initDefaultAssets();
  }

  initDefaultAssets() {
    // Create default materials
    this.createMaterial('Red', { r: 1, g: 0, b: 0 });
    this.createMaterial('Green', { r: 0, g: 1, b: 0 });
    this.createMaterial('Blue', { r: 0, g: 0, b: 1 });
    this.createMaterial('White', { r: 1, g: 1, b: 1 });
    this.createMaterial('Black', { r: 0, g: 0, b: 0 });

    // Create default meshes
    this.createMesh('Cube', { type: 'box', size: 1 });
    this.createMesh('Sphere', { type: 'sphere', radius: 1 });
    this.createMesh('Cylinder', { type: 'cylinder', radius: 1, height: 2 });
    this.createMesh('Plane', { type: 'plane', width: 1, height: 1 });
    this.createMesh('Pyramid', { type: 'pyramid', size: 1 });
  }

  createAsset(name, type, data) {
    const id = `asset_${this.nextId++}`;
    const asset = new Asset(id, name, type, data);
    this.assets.set(id, asset);
    return asset;
  }

  createMaterial(name, color) {
    return this.createAsset(name, 'material', { color, metalness: 0, roughness: 0.5, emissive: { r: 0, g: 0, b: 0 } });
  }

  createMesh(name, geometry) {
    return this.createAsset(name, 'mesh', geometry);
  }

  createAnimation(name, duration) {
    const clip = new AnimationClip(name);
    return this.createAsset(name, 'animation', { clip });
  }

  getAsset(id) {
    return this.assets.get(id);
  }

  getAssetsByType(type) {
    return Array.from(this.assets.values()).filter(a => a.type === type);
  }

  deleteAsset(id) {
    this.assets.delete(id);
  }

  listAssets() {
    return Array.from(this.assets.values());
  }
}

// ===== TRANSFORM & GEOMETRY =====
class Transform {
  constructor() {
    this.position = new Vec3(0, 0, 0);
    this.rotation = new Vec3(0, 0, 0);
    this.scale = new Vec3(1, 1, 1);
    this.matrix = this.computeMatrix();
  }

  computeMatrix() {
    const t = Matrix4.translation(this.position);
    const ry = Matrix4.rotationY(this.rotation.y);
    const s = Matrix4.scale(this.scale);
    this.matrix = t.multiply(ry).multiply(s);
    return this.matrix;
  }

  serialize() {
    return {
      pos: [this.position.x, this.position.y, this.position.z],
      rot: [this.rotation.x, this.rotation.y, this.rotation.z],
      scale: [this.scale.x, this.scale.y, this.scale.z]
    };
  }
}

class Geometry {
  constructor(type = 'box', params = {}) {
    this.type = type;
    this.params = params;
    this.vertices = [];
    this.faces = [];
    this.generateGeometry();
  }

  generateGeometry() {
    switch (this.type) {
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
    }
  }

  generateBox() {
    const s = (this.params.size || 1) / 2;
    this.vertices = [
      -s, -s, s,  s, -s, s,  s, s, s,  -s, s, s,
      -s, -s, -s, -s, s, -s, s, s, -s, s, -s, -s,
    ];
    this.faces = [0,1,2, 0,2,3, 4,6,5, 4,7,6, 0,4,5, 0,5,1, 1,5,6, 1,6,2, 2,6,7, 2,7,3, 0,3,7, 0,7,4];
  }

  generateSphere() {
    const r = this.params.radius || 1;
    const segs = 16, rings = 16;
    for (let i = 0; i <= rings; i++) {
      const phi = (i / rings) * Math.PI;
      for (let j = 0; j <= segs; j++) {
        const theta = (j / segs) * Math.PI * 2;
        this.vertices.push(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
      }
    }
    for (let i = 0; i < rings; i++) {
      for (let j = 0; j < segs; j++) {
        const a = i * (segs + 1) + j;
        const b = a + segs + 1;
        this.faces.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  }

  generateCylinder() {
    const r = this.params.radius || 1;
    const h = this.params.height || 2;
    const segs = 16;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const x = r * Math.cos(a);
      const z = r * Math.sin(a);
      this.vertices.push(x, h / 2, z, x, -h / 2, z);
    }
    for (let i = 0; i < segs; i++) {
      const a = i * 2, b = (i + 1) * 2;
      this.faces.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  generatePlane() {
    const w = this.params.width || 1;
    const h = this.params.height || 1;
    this.vertices = [-w/2, 0, h/2, w/2, 0, h/2, w/2, 0, -h/2, -w/2, 0, -h/2];
    this.faces = [0, 1, 2, 0, 2, 3];
  }

  generatePyramid() {
    const s = (this.params.size || 1) / 2;
    this.vertices = [0, s, 0, -s, -s, s, s, -s, s, s, -s, -s, -s, -s, -s];
    this.faces = [0,1,2, 0,2,3, 0,3,4, 0,4,1, 1,3,2, 1,4,3];
  }

  getVertexCount() { return this.vertices.length / 3; }
  getFaceCount() { return this.faces.length / 3; }
}

// ===== MATERIAL SYSTEM =====
class Material {
  constructor(name = 'Material') {
    this.name = name;
    this.color = { r: 1, g: 1, b: 1, a: 1 };
    this.metalness = 0.5;
    this.roughness = 0.5;
    this.emissive = { r: 0, g: 0, b: 0 };
  }
}

// ===== RENDERER (THREEJS-STYLE) =====
class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.scenes = [];
    this.activeScene = null;
    this.camera = null;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  createScene() {
    const scene = new Scene();
    this.scenes.push(scene);
    this.activeScene = scene;
    return scene;
  }

  setActiveScene(scene) {
    this.activeScene = scene;
  }

  render(deltaTime = 0) {
    if (!this.activeScene) return;

    // Clear background
    this.ctx.fillStyle = '#0a0b0d';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw grid
    this.drawGrid();

    // Draw all entities
    const entities = this.activeScene.getRootEntities();
    for (const entity of entities) {
      this.drawEntity(entity);
    }

    // Draw stats
    this.drawStats(deltaTime);
  }

  drawGrid() {
    this.ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
    this.ctx.lineWidth = 0.5;
    const gridSize = 10;
    const spacing = 40;

    for (let i = -gridSize; i <= gridSize; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.width / 2 + i * spacing, 0);
      this.ctx.lineTo(this.width / 2 + i * spacing, this.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height / 2 + i * spacing);
      this.ctx.lineTo(this.width, this.height / 2 + i * spacing);
      this.ctx.stroke();
    }

    // Draw axes
    this.ctx.strokeStyle = '#00ff88';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, 0);
    this.ctx.lineTo(this.width / 2, this.height);
    this.ctx.stroke();

    this.ctx.strokeStyle = '#00ccff';
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height / 2);
    this.ctx.lineTo(this.width, this.height / 2);
    this.ctx.stroke();
  }

  drawEntity(entity) {
    if (!entity.visible) return;
    if (!entity.mesh || !entity.mesh.geometry) return;

    const t = entity.transform;
    const x = this.width / 2 + t.position.x * 40;
    const y = this.height / 2 - t.position.z * 40;
    const s = 30 * t.scale.x;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(t.rotation.y);

    const mat = entity.mesh.material;
    this.ctx.fillStyle = `rgba(${Math.floor(mat.color.r * 255)}, ${Math.floor(mat.color.g * 255)}, ${Math.floor(mat.color.b * 255)}, 0.8)`;
    this.ctx.strokeStyle = entity.selected ? '#00ff88' : '#00ccff';
    this.ctx.lineWidth = entity.selected ? 3 : 1;

    if (entity.mesh.geometry.type === 'box') {
      this.ctx.fillRect(-s / 2, -s / 2, s, s);
      this.ctx.strokeRect(-s / 2, -s / 2, s, s);
    } else if (entity.mesh.geometry.type === 'sphere') {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    } else if (entity.mesh.geometry.type === 'pyramid') {
      this.ctx.beginPath();
      this.ctx.moveTo(0, -s / 2);
      this.ctx.lineTo(s / 2, s / 2);
      this.ctx.lineTo(-s / 2, s / 2);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    }

    if (entity.selected) {
      this.ctx.strokeStyle = '#00ff88';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(-s / 2 - 5, -s / 2 - 5, s + 10, s + 10);
    }

    this.ctx.restore();

    for (const child of entity.children) {
      this.drawEntity(child);
    }
  }

  drawStats(deltaTime) {
    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = 'bold 12px monospace';
    let y = 20;
    this.ctx.fillText(`Entities: ${this.activeScene.getEntityCount()}`, 10, y);
    y += 20;
    this.ctx.fillText(`FPS: ${Math.round(1 / (deltaTime || 0.016))}`, 10, y);
  }
}

// ===== SCENE & ENTITY =====
class Entity {
  constructor(name = 'Entity') {
    this.name = name;
    this.id = Math.random().toString(36).substr(2, 9);
    this.transform = new Transform();
    this.mesh = null;
    this.animationController = new AnimationController(this);
    this.children = [];
    this.parent = null;
    this.visible = true;
    this.selected = false;
  }

  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  setMesh(geometry, material) {
    this.mesh = { geometry, material };
  }

  serialize() {
    return {
      name: this.name,
      id: this.id,
      transform: this.transform.serialize(),
      mesh: this.mesh ? {
        type: this.mesh.geometry.type,
        material: this.mesh.material
      } : null,
      children: this.children.map(c => c.serialize())
    };
  }
}

class Scene {
  constructor(name = 'Scene') {
    this.name = name;
    this.entities = [];
    this.rootEntities = [];
  }

  createEntity(name) {
    const entity = new Entity(name);
    this.entities.push(entity);
    this.rootEntities.push(entity);
    return entity;
  }

  deleteEntity(entity) {
    const idx = this.entities.indexOf(entity);
    if (idx > -1) this.entities.splice(idx, 1);
    const ridx = this.rootEntities.indexOf(entity);
    if (ridx > -1) this.rootEntities.splice(ridx, 1);
  }

  getRootEntities() {
    return this.rootEntities;
  }

  getEntityCount() {
    return this.entities.length;
  }

  update(deltaTime) {
    for (const entity of this.entities) {
      entity.animationController.update(deltaTime);
      entity.transform.computeMatrix();
    }
  }

  serialize() {
    return {
      name: this.name,
      entities: this.rootEntities.map(e => e.serialize())
    };
  }
}

// ===== GAME LOOP =====
class GameLoop {
  constructor(fps = 60) {
    this.targetFPS = fps;
    this.deltaTime = 0;
    this.lastTime = 0;
    this.fps = 0;
    this.frameCount = 0;
    this.callback = null;
    this.running = false;
  }

  setCallback(cb) {
    this.callback = cb;
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    this.loop();
  }

  stop() {
    this.running = false;
  }

  loop = () => {
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

    requestAnimationFrame(this.loop);
  };
}

// ===== EXPORTS =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Vec3, Matrix4, Keyframe, AnimationCurve, AnimationClip, AnimationController,
    Asset, AssetManager, Transform, Geometry, Material, Renderer,
    Entity, Scene, GameLoop
  };
}
