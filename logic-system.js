/**
 * TIGEN Logic System - Easy Logic Feeding with Example Scripts
 */

// ===== EXAMPLE SCRIPTS FOR EASY LOGIC FEEDING =====

/**
 * Player Controller - WASD movement, mouse look
 */
class PlayerController extends Script {
  constructor() {
    super();
    this.speed = 10;
    this.rotationSpeed = 2;
  }

  onStart() {
    console.log('PlayerController initialized on', this.entity.name);
  }

  onUpdate(deltaTime) {
    if (!this.entity.components.physics) return;

    const input = window.engine.input;
    const direction = new Vector3();

    if (input.isKeyPressed('w')) direction.z -= 1;
    if (input.isKeyPressed('s')) direction.z += 1;
    if (input.isKeyPressed('a')) direction.x -= 1;
    if (input.isKeyPressed('d')) direction.x += 1;

    if (direction.length() > 0) {
      direction = direction.normalize();
      const movement = direction.multiply(this.speed * deltaTime);
      this.entity.transform.translate(movement.x, movement.y, movement.z);
    }

    if (input.isMouseDown(0)) {
      const delta = input.getMouseDelta();
      this.entity.transform.rotate(delta.y * this.rotationSpeed * deltaTime, delta.x * this.rotationSpeed * deltaTime, 0);
    }
  }
}

/**
 * Rotating Object - Continuous rotation
 */
class RotatingObject extends Script {
  constructor() {
    super();
    this.rotationSpeed = new Vector3(0, 1, 0);
  }

  onUpdate(deltaTime) {
    this.entity.transform.rotate(
      this.rotationSpeed.x * deltaTime,
      this.rotationSpeed.y * deltaTime,
      this.rotationSpeed.z * deltaTime
    );
  }
}

/**
 * Bouncing Object - Physics-based bouncing
 */
class BouncingObject extends Script {
  constructor() {
    super();
    this.bounceHeight = 5;
    this.bounceSpeed = 3;
  }

  onStart() {
    const physics = this.entity.getComponent(Physics);
    if (physics) {
      physics.mass = 1;
      physics.useGravity = true;
      physics.bounciness = 0.8;
    }
  }

  onUpdate(deltaTime) {
    const y = this.entity.transform.position.y;
    if (y < -10) {
      this.entity.transform.setPosition(
        this.entity.transform.position.x,
        this.bounceHeight,
        this.entity.transform.position.z
      );
    }
  }
}

/**
 * Particle Emitter - Emit particles on trigger
 */
class ParticleEmitter extends Script {
  constructor() {
    super();
    this.emitRate = 100;
  }

  onUpdate(deltaTime) {
    const particles = this.entity.getComponent(ParticleSystem);
    if (particles) {
      particles.emit(Math.ceil(this.emitRate * deltaTime));
    }
  }
}

/**
 * Light Pulsator - Pulsing light intensity
 */
class LightPulsator extends Script {
  constructor() {
    super();
    this.frequency = 2;
    this.minIntensity = 0.5;
    this.maxIntensity = 2;
  }

  onUpdate(deltaTime) {
    const light = this.entity.getComponent(Light);
    if (light) {
      const pulse = Math.sin(performance.now() / 1000 * this.frequency);
      light.intensity = this.minIntensity + (this.maxIntensity - this.minIntensity) * (pulse + 1) / 2;
    }
  }
}

/**
 * Movement Path - Move along predefined path
 */
class MovementPath extends Script {
  constructor() {
    super();
    this.path = [];
    this.currentPathIndex = 0;
    this.speed = 5;
    this.pathTime = 0;
  }

  addPathPoint(x, y, z) {
    this.path.push(new Vector3(x, y, z));
  }

  onUpdate(deltaTime) {
    if (this.path.length < 2) return;

    this.pathTime += deltaTime * this.speed;
    const pathLength = this.path.length - 1;
    const segment = Math.floor(this.pathTime) % pathLength;
    const t = this.pathTime % 1;

    const from = this.path[segment];
    const to = this.path[(segment + 1) % this.path.length];

    const pos = new Vector3(
      from.x + (to.x - from.x) * t,
      from.y + (to.y - from.y) * t,
      from.z + (to.z - from.z) * t
    );

    this.entity.transform.position = pos;
  }
}

/**
 * Damage Zone - Deal damage to entities in range
 */
class DamageZone extends Script {
  constructor() {
    super();
    this.damage = 10;
    this.range = 5;
    this.damageInterval = 1;
    this.lastDamageTime = 0;
  }

  onUpdate(deltaTime) {
    this.lastDamageTime += deltaTime;

    if (this.lastDamageTime >= this.damageInterval) {
      this.lastDamageTime = 0;
      // Deal damage to nearby entities
      const scene = window.engine.renderer.activeScene;
      for (const entity of scene.entities) {
        const distance = this.entity.transform.position.subtract(entity.transform.position).length();
        if (distance < this.range && entity !== this.entity) {
          console.log(`Damage zone hit ${entity.name} for ${this.damage} damage`);
        }
      }
    }
  }
}

/**
 * Follow Target - Follow another entity
 */
class FollowTarget extends Script {
  constructor() {
    super();
    this.targetName = '';
    this.followDistance = 3;
    this.speed = 5;
  }

  onUpdate(deltaTime) {
    const scene = window.engine.renderer.activeScene;
    const target = scene.entities.find(e => e.name === this.targetName);

    if (!target) return;

    const direction = target.transform.position.subtract(this.entity.transform.position);
    const distance = direction.length();

    if (distance > this.followDistance) {
      const normalized = direction.normalize();
      const movement = normalized.multiply(this.speed * deltaTime);
      this.entity.transform.translate(movement.x, movement.y, movement.z);
    }
  }
}

/**
 * Timer - Execute action after delay
 */
class Timer extends Script {
  constructor() {
    super();
    this.duration = 1;
    this.timeRemaining = 0;
    this.onComplete = () => {};
    this.loop = false;
    this.isRunning = false;
  }

  start() {
    this.timeRemaining = this.duration;
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  onUpdate(deltaTime) {
    if (!this.isRunning) return;

    this.timeRemaining -= deltaTime;
    if (this.timeRemaining <= 0) {
      this.onComplete();
      if (this.loop) {
        this.start();
      } else {
        this.isRunning = false;
      }
    }
  }
}

/**
 * Health System - Entity health and damage
 */
class Health extends Script {
  constructor() {
    super();
    this.maxHealth = 100;
    this.currentHealth = 100;
    this.onDeath = () => {};
    this.onHurt = (damage) => {};
  }

  takeDamage(amount) {
    this.currentHealth -= amount;
    this.onHurt(amount);

    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      this.onDeath();
    }
  }

  heal(amount) {
    this.currentHealth = Math.min(this.currentHealth + amount, this.maxHealth);
  }

  getHealthPercent() {
    return this.currentHealth / this.maxHealth;
  }
}

/**
 * Collision Detector - Simple distance-based collision
 */
class CollisionDetector extends Script {
  constructor() {
    super();
    this.collisionRadius = 1;
    this.onCollisionEnter = () => {};
    this.collisions = [];
  }

  onUpdate(deltaTime) {
    const scene = window.engine.renderer.activeScene;
    const newCollisions = [];

    for (const entity of scene.entities) {
      if (entity === this.entity) continue;

      const distance = this.entity.transform.position.subtract(entity.transform.position).length();
      if (distance < this.collisionRadius) {
        if (!this.collisions.includes(entity)) {
          this.onCollisionEnter(entity);
        }
        newCollisions.push(entity);
      }
    }

    this.collisions = newCollisions;
  }
}

/**
 * Audio Trigger - Play audio on event
 */
class AudioTrigger extends Script {
  constructor() {
    super();
    this.soundName = '';
    this.volume = 1;
  }

  playSound() {
    const audio = this.entity.getComponent(AudioSource);
    if (audio) {
      audio.volume = this.volume;
      audio.play();
      console.log('Playing audio:', this.soundName);
    }
  }
}

/**
 * Event Dispatcher - Fire events to other entities
 */
class EventDispatcher extends Script {
  constructor() {
    super();
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }
}

// ===== LOGIC FEEDING EXAMPLES =====

/**
 * Configure a player entity with movement
 */
function createPlayer(scene) {
  const player = scene.createEntity('Player');
  
  // Add mesh
  const mesh = player.addComponent(Mesh);
  mesh.setGeometry('box');
  mesh.setColor(0, 1, 0);

  // Add physics
  const physics = player.addComponent(Physics);
  physics.mass = 80;
  physics.useGravity = true;

  // Add camera
  const camera = player.addComponent(Camera);
  camera.isPrimary = true;

  // Add script (LOGIC FEEDING)
  player.addScript(PlayerController);

  return player;
}

/**
 * Create a rotating ornament
 */
function createRotatingCube(scene, x, y, z, color) {
  const cube = scene.createEntity(`RotatingCube_${Math.random()}`);
  cube.transform.setPosition(x, y, z);

  const mesh = cube.addComponent(Mesh);
  mesh.setGeometry('box');
  const [r, g, b] = color;
  mesh.setColor(r, g, b);

  // Add rotation script (LOGIC FEEDING)
  const rotator = cube.addScript(RotatingObject);
  rotator.rotationSpeed = new Vector3(0.5, 1, 0.3);

  return cube;
}

/**
 * Create a light source with pulsing
 */
function createPulsingLight(scene, x, y, z) {
  const lightEntity = scene.createEntity('PulsingLight');
  lightEntity.transform.setPosition(x, y, z);

  const light = lightEntity.addComponent(Light);
  light.type = 'point';
  light.color = { r: 0, g: 1, b: 0.8 };
  light.intensity = 1;
  light.range = 20;

  // Add pulsing script (LOGIC FEEDING)
  const pulsator = lightEntity.addScript(LightPulsator);
  pulsator.frequency = 2;
  pulsator.minIntensity = 0.5;
  pulsator.maxIntensity = 2;

  return lightEntity;
}

/**
 * Create a bouncing sphere
 */
function createBouncingSphere(scene, x, y, z) {
  const sphere = scene.createEntity('BouncingSphere');
  sphere.transform.setPosition(x, y, z);

  const mesh = sphere.addComponent(Mesh);
  mesh.setGeometry('sphere');
  mesh.setColor(1, 0.5, 0);

  const physics = sphere.addComponent(Physics);
  physics.mass = 1;
  physics.useGravity = true;
  physics.bounciness = 0.9;

  // Add bouncing script (LOGIC FEEDING)
  sphere.addScript(BouncingObject);

  return sphere;
}

/**
 * Create a particle effect
 */
function createParticleEffect(scene, x, y, z) {
  const emitter = scene.createEntity('ParticleEmitter');
  emitter.transform.setPosition(x, y, z);

  const particles = emitter.addComponent(ParticleSystem);
  particles.maxParticles = 5000;
  particles.emissionRate = 200;
  particles.lifetime = 3;
  particles.speed = 10;

  // Add emitter script (LOGIC FEEDING)
  emitter.addScript(ParticleEmitter);

  return emitter;
}

/**
 * Create a health system entity
 */
function createHealthyEntity(scene, name, x, y, z) {
  const entity = scene.createEntity(name);
  entity.transform.setPosition(x, y, z);

  const mesh = entity.addComponent(Mesh);
  mesh.setGeometry('sphere');
  mesh.setColor(1, 0, 0);

  // Add health script (LOGIC FEEDING)
  const health = entity.addScript(Health);
  health.maxHealth = 100;
  health.currentHealth = 100;
  
  health.onDeath = () => {
    console.log(`${name} died!`);
    entity.active = false;
  };

  health.onHurt = (damage) => {
    console.log(`${name} took ${damage} damage. Health: ${health.currentHealth}/${health.maxHealth}`);
  };

  return entity;
}

/**
 * Create a following NPC
 */
function createFollower(scene, targetName, x, y, z) {
  const npc = scene.createEntity('Follower');
  npc.transform.setPosition(x, y, z);

  const mesh = npc.addComponent(Mesh);
  mesh.setGeometry('box');
  mesh.setColor(0.5, 0.5, 1);

  // Add follow script (LOGIC FEEDING)
  const follower = npc.addScript(FollowTarget);
  follower.targetName = targetName;
  follower.speed = 5;

  return npc;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PlayerController,
    RotatingObject,
    BouncingObject,
    ParticleEmitter,
    LightPulsator,
    MovementPath,
    DamageZone,
    FollowTarget,
    Timer,
    Health,
    CollisionDetector,
    AudioTrigger,
    EventDispatcher,
    createPlayer,
    createRotatingCube,
    createPulsingLight,
    createBouncingSphere,
    createParticleEffect,
    createHealthyEntity,
    createFollower
  };
}
