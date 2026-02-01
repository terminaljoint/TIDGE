# TIGEN v2 - Standalone Browser Version

## Quick Start (No Server Required!)

Simply open `index-standalone.html` in any modern web browser. That's it!

```
✓ No local server needed
✓ No CLI tools required
✓ No npm install needed
✓ Works with file:// protocol
✓ All features included
```

## How to Use

### Option 1: Direct File (Easiest)
```bash
# Just open in your browser - no installation needed!
open index-standalone.html
# or
firefox index-standalone.html
```

### Option 2: Simple HTTP Server (Optional - for better asset loading)
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server
```

Then open: `http://localhost:8000/index-standalone.html`

---

## What's Included

The bundled engine includes:

- ✓ **ECS System** - Entity, Component, Transform
- ✓ **3D Renderer** - PBR materials, shadows, lighting
- ✓ **Physics Engine** - Gravity, collisions, rigid bodies
- ✓ **Scene Graph** - Hierarchy, parenting, organization
- ✓ **Asset Manager** - Load models, textures, animations
- ✓ **Input System** - Keyboard, mouse, gamepad
- ✓ **Inspector UI** - Edit entities in real-time
- ✓ **Outliner** - Scene tree view
- ✓ **Three.js Integration** - Full WebGL support

---

## Using the Global TIGEN API

Everything is exposed on the `window.TIGEN` namespace:

### Creating Entities

```javascript
// Create a new entity
const cube = TIGEN.createEntity("MyCube");

// Add a mesh component
const mesh = cube.addComponent(TIGEN.Mesh);
mesh.setGeometry('box', { width: 2, height: 2, depth: 2 });
mesh.setMaterial('standard', { color: 0x00ff88, metalness: 0.5 });

// Add physics
const physics = cube.addComponent(TIGEN.Physics);
physics.mass = 1;
physics.useGravity = true;

// Position it
cube.transform.setPosition(0, 2, 0);
```

### Loading Models with Animations

```javascript
// Load a glTF/GLB model with animations
TIGEN.loadModel('models/character.glb').then(gltf => {
  const model = gltf.scene;
  
  // Add to scene
  TIGEN.scene.add(model);
  
  // Access animations
  const animations = gltf.animations; // Array of animations
  
  // Create an AnimationMixer to control animations
  const mixer = new THREE.AnimationMixer(model);
  
  // Play first animation
  if (animations.length > 0) {
    const action = mixer.clipAction(animations[0]);
    action.play();
  }
  
  // Update mixer in your game loop
  TIGEN.loop.originalRender = TIGEN.loop.render;
  TIGEN.loop.render = () => {
    mixer.update(0.016); // ~60fps delta
    TIGEN.loop.originalRender();
  };
});
```

### Accessing Core Classes

```javascript
// Use directly from TIGEN namespace
const entity = new TIGEN.Entity("MyEntity");
const mesh = new TIGEN.Mesh(entity);
const physics = new TIGEN.Physics(entity);

// Access Three.js
const scene = new TIGEN.Scene();
const vector = new TIGEN.THREE.Vector3(1, 2, 3);
```

### Input Handling

```javascript
// Check key state
TIGEN.Input.isKeyDown('KeyW')    // Forward
TIGEN.Input.isKeyDown('KeyA')    // Left
TIGEN.Input.isKeyDown('KeyS')    // Back
TIGEN.Input.isKeyDown('KeyD')    // Right
TIGEN.Input.isKeyDown('Space')   // Jump

// Get mouse position
const { x, y } = TIGEN.Input.getMousePosition();

// Check if mouse is down
if (TIGEN.Input.mouse.down) {
  console.log("Mouse clicked!");
}
```

### Scene Management

```javascript
// Get the active scene
const scene = TIGEN.scene;

// Find entities
const entities = scene.findEntitiesByName("Cube");
const entity = scene.getEntity(entityId);

// Remove entity
scene.removeEntity(entity);

// Clear all
scene.clear();
```

### Asset Loading

```javascript
// Load textures
TIGEN.loadTexture('textures/metal.png').then(texture => {
  const material = new TIGEN.THREE.MeshStandardMaterial({ map: texture });
});

// Load models
TIGEN.loadModel('models/house.glb').then(gltf => {
  TIGEN.scene.add(gltf.scene);
});

// Direct access to asset manager
const asset = TIGEN.assetManager.getAsset('textures/metal.png');
```

---

## Editor Controls

### In-Game

- **WASD** - Move camera
- **Q/E** - Up/Down
- **Mouse Drag** - Rotate camera
- **Click** - Select entity
- **Delete** - Remove selected entity
- **F12** - Debug console

### UI Buttons

- **ENTER GAMEWORLD** - Toggle play mode
- **+ (Add)** - Spawn a random cube
- **Clear World** - Delete all entities

---

## File Structure

```
TIGEN/
├── index-standalone.html       ← Open this file! (NO SERVER NEEDED)
├── tigen-bundle.js             ← Complete bundled engine
├── index.html                  ← Original module-based version (needs server)
├── docs/                       ← Documentation site
├── models/                     ← Your 3D assets
├── textures/                   ← Texture files
└── scripts/                    ← Custom scripts
```

---

## Creating Custom Scripts

You can create external JavaScript files and reference them:

```html
<!-- Add after tigen-bundle.js in your HTML -->
<script src="my-game.js"></script>
```

Then in `my-game.js`:

```javascript
window.addEventListener('DOMContentLoaded', () => {
  // Wait for TIGEN to initialize
  setTimeout(() => {
    console.log("TIGEN initialized:", TIGEN.VERSION);
    
    // Your game code here
    const player = TIGEN.createEntity("Player");
    const mesh = player.addComponent(TIGEN.Mesh);
    mesh.setGeometry('box');
    mesh.setMaterial('standard', { color: 0xff0000 });
    
    player.transform.setPosition(0, 1, 0);
  }, 100);
});
```

---

## Importing Assets with Animations

The bundle includes `AssetManager` for loading complex assets:

```javascript
// In your game code (e.g., my-game.js)
TIGEN.loadModel('models/animated-character.glb').then(gltf => {
  const character = gltf.scene;
  
  // Traverse and find bones/armature
  character.traverse(node => {
    if (node.isBone) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  
  // Add to scene
  TIGEN.scene.add(character);
  
  // Create animation mixer
  const mixer = new THREE.AnimationMixer(character);
  const actions = [];
  
  // Load all animations
  gltf.animations.forEach((clip, index) => {
    console.log(`Animation ${index}: ${clip.name}`);
    const action = mixer.clipAction(clip);
    actions.push(action);
  });
  
  // Play idle animation (usually first)
  if (actions.length > 0) {
    actions[0].play();
  }
  
  // Update mixer in game loop
  const originalRender = TIGEN.loop.render;
  const deltaTime = 1/60;
  
  TIGEN.loop.render = () => {
    mixer.update(deltaTime);
    originalRender();
  };
});
```

---

## Browser Compatibility

✓ Chrome 90+
✓ Firefox 88+
✓ Safari 14+
✓ Edge 90+

All modern browsers with WebGL 2 support.

---

## Troubleshooting

### "TIGEN is undefined"
- Make sure `tigen-bundle.js` loads before your custom code
- Check browser console for errors (F12)

### Models don't load
- For file:// protocol, use simple geometry instead
- For best results, use a local HTTP server: `python3 -m http.server 8000`
- Check console for CORS errors

### Assets missing when opening file://
- Some browsers restrict loading files from file:// due to CORS
- Solution: Run a local server instead
  ```bash
  python3 -m http.server 8000
  # Then open http://localhost:8000/index-standalone.html
  ```

### Performance issues
- Reduce mesh complexity
- Limit number of physics bodies
- Use lower resolution textures

---

## Deployment

To deploy this to production:

1. **Self-Hosted:**
   ```bash
   # Copy TIGEN directory to your server
   scp -r TIGEN/ user@server.com:/var/www/
   ```

2. **GitHub Pages:**
   ```bash
   # Copy to docs/ folder (as already done)
   # Push to GitHub and enable Pages in settings
   ```

3. **Vercel/Netlify:**
   - Just push to GitHub, auto-deploys
   - Works out of the box!

---

## What's Different from the Original?

| Feature | Original | Standalone |
|---------|----------|-----------|
| ES Modules | ✓ | ✗ |
| Local Server Required | ✓ | ✗ |
| Single File Bundle | ✗ | ✓ |
| Global TIGEN namespace | Partial | ✓ Complete |
| file:// Protocol | ✗ | ✓ (mostly) |
| Size | Modular | ~40KB bundle |

---

## License

MIT - Use freely in commercial projects!

---

## Questions?

- Check the GitHub repository: https://github.com/terminaljoint/TIGEN
- Read the full docs: https://terminaljoint.github.io/TIGEN/docs-getting-started.html
- API Reference: https://terminaljoint.github.io/TIGEN/docs-api.html
