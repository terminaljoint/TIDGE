# Auto-Start Experience Guide

## What Users See on Page Load

### Initial State (Automatic)
```
┌──────────────────────────────────────────────────────────────┐
│ TIGEN v2 │ 📖 Docs  |  🎮 Editor  |  🏠 Reset              │ 50px
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                                                              │
│              🌍 RUNNING 3D ENGINE 🌍                        │
│                                                              │
│              ╔═══════════════════╗                          │
│              ║  Rotating Cube    ║                          │
│              ║  with Lighting    ║                          │
│              ╚═══════════════════╝                          │
│                                                              │
│              (Engine auto-rendering)                        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ ● Engine Running                                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Key Points:**
- Engine is already running
- 3D scene visible and rendering
- Status indicator at bottom-left shows "Engine Running"
- Console message shows welcome text with quick commands
- User can immediately interact:
  - Middle-mouse drag to rotate camera
  - Scroll to zoom
  - Right-click drag to pan

---

## When User Clicks "📖 Docs" Button

```
┌──────────────────────────────────────────────────────────────┬──────────┐
│ TIGEN v2 │ 📖 Docs  |  🎮 Editor  |  🏠 Reset              │ TIGEN v2 │
├──────────────────────────────────────────────────────────────┤ Quick    │
│                                                              │ Start    │
│              🌍 RUNNING 3D ENGINE 🌍                        │ ─────    │
│                                                              │ 🚀       │
│              ╔═══════════════════╗                          │ Getting  │
│              ║  Rotating Cube    ║                          │ Started  │
│              ║  with Lighting    ║                          │          │
│              ╚═══════════════════╝                          │ ⚡       │
│                                                              │ Quick    │
│              (Engine continues)                             │ Start    │
│                                                              │          │
│              Docs panel slides   ────────────────────────→  │ 🎮       │
│              in from right                                  │ Controls │
│                                                              │          │
├──────────────────────────────────────────────────────────────┤ 💻       │
│ ● Engine Running                                             │ API      │
│                                                              │          │
└──────────────────────────────────────────────────────────────┴──────────┘
```

**Features:**
- Docs panel slides in from the right
- Engine continues rendering in background
- "📖 Docs" button now highlights (glows green)
- User can read docs while interacting with engine
- Scrollable documentation content
- Links to GitHub and external docs

---

## Documentation Panel Content

```
┌─────────────────────────────────┐
│ TIGEN v2                        │ ← Header
│ Live 3D Engine Documentation    │
├─────────────────────────────────┤
│                                 │
│ 🚀 Getting Started              │
│ Features and capabilities...    │
│                                 │
│ ⚡ Quick Start                  │
│ const cube = TIGEN              │
│   .createEntity("MyCube");       │
│ const mesh = cube               │
│   .addComponent(TIGEN.Mesh);    │
│                                 │
│ 🎮 Controls                     │
│ • Middle Mouse + Drag: Rotate   │
│ • Scroll: Zoom                  │
│ • Right Click + Drag: Pan       │
│                                 │
│ 💻 Global API                   │
│ TIGEN.scene                     │
│ TIGEN.createEntity(name)        │
│ TIGEN.loadModel(url)            │
│                                 │
│ 📁 Asset Paths                  │
│ models/      ← 3D models        │
│ textures/    ← Images           │
│                                 │
│ ❓ Help & Resources             │
│ • GitHub Repository             │
│ • Full Documentation            │
│ • API Reference                 │
│                                 │
└─────────────────────────────────┘
```

---

## When User Clicks "🏠 Reset" Button

```
┌──────────────────────────────────────────────────────────────┐
│ TIGEN v2 │ 📖 Docs  |  🎮 Editor  |  🏠 Reset              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│              🌍 RUNNING 3D ENGINE 🌍                        │
│                                                              │
│              ╔═══════════════════╗                          │
│              ║  Cube Reset       ║  ← Camera moves to       │
│              ║  to Default View  ║     (20, 20, 20)         │
│              ╚═══════════════════╝     looking at origin    │
│                                                              │
│              (Engine continues rendering)                   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ ● Engine Running                                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Action:**
- Camera position: (20, 20, 20)
- Camera looks at: (0, 0, 0)
- OrbitControls target resets
- Smooth camera transition

---

## When User Opens Console (F12)

```
╔════════════════════════════════════════════════════════════════╗
║                    TIGEN v2 Engine Initialized                ║
╚════════════════════════════════════════════════════════════════╝

🎮 QUICK COMMANDS:
  TIGEN.createEntity(name)    - Create new entity
  TIGEN.scene.entities        - List all entities
  TIGEN.loadModel(url)        - Load 3D model
  TIGEN.Input.isKeyDown(code) - Check input

📖 DOCUMENTATION: Click "Docs" button in top-right
🎮 EDITOR CONTROLS: Middle-mouse drag to rotate camera
💡 TIPS: Open this console to run commands!

Examples:
  const cube = TIGEN.createEntity("Cube");
  const mesh = cube.addComponent(TIGEN.Mesh);
  mesh.setGeometry('box');
  mesh.setMaterial('standard', { color: 0x00ff88 });
```

---

## User Interaction Flows

### Flow 1: Exploring Engine
```
1. Page loads → Engine auto-starts ✓
2. Middle-mouse drag → Camera rotates ✓
3. Scroll → Zoom in/out ✓
4. Right-click drag → Pan ✓
5. Click "📖 Docs" → Read documentation ✓
6. F12 → Open console → See commands ✓
7. Paste command → Create entity ✓
```

### Flow 2: Understanding Docs
```
1. Page loads → Engine running ✓
2. Click "📖 Docs" → Panel slides in ✓
3. Scroll docs → Read content ✓
4. Click link → View full docs ✓
5. Close docs → Panel slides out ✓
6. Engine still rendering ✓
```

### Flow 3: Experimenting
```
1. Page loads ✓
2. F12 → Console ✓
3. Click "📖 Docs" → Read API ✓
4. Write command ✓
5. Engine updates instantly ✓
6. Adjust camera ✓
7. See results ✓
```

---

## Mobile Experience

On mobile/tablet (< 768px width):

```
┌────────────────────────────────┐
│ TIGEN v2 │ 📖 Docs 🎮 ⏠      │ 40px
├────────────────────────────────┤
│                                │
│     🌍 RUNNING 3D ENGINE 🌍   │
│                                │
│     ╔═══════════════════╗      │
│     ║  Responsive       ║      │
│     ║  Rendering        ║      │
│     ╚═══════════════════╝      │
│                                │
│     (Touch controls work)       │
│                                │
├────────────────────────────────┤
│ ● Engine                        │
│                                │
└────────────────────────────────┘

When docs opened:
┌────────────────────────────────┐
│ TIGEN v2 │ 📖 Docs 🎮 ⏠      │
├────────────────────────────────┤
│ TIGEN v2                       │
│ Documentation                  │
│─────────────────────────────── │
│ 🚀 Getting Started             │
│ Features...                    │
│                                │
│ ⚡ Quick Start                 │
│ const cube = ...               │
│                                │
│ (Full screen on mobile)        │
└────────────────────────────────┘
```

---

## Visual Design

### Color Scheme
```
Background:    #0a0b0d (very dark gray)
Primary:       #00ff88 (vibrant green - Matrix style)
Text:          #ececed (off-white)
Secondary:     #2a2d32 (dark gray for borders)
Accent:        #ff4d4d (red for stop/danger actions)
```

### Typography
```
Logo:          font-weight: 900, 20px
Buttons:       12px, semi-bold
Docs Header:   18px, bold
Docs Title:    14px, uppercase
Docs Body:     12px, readable line-height 1.6
Code:          Courier New, 11px, #00ff88
```

### Animations
```
Docs Panel:    slideIn 0.3s ease-out (translateX 100% → 0)
Status Dot:    pulse 1s infinite (opacity 1 → 0.5)
Button Hover:  0.2s transition, glow effect
```

---

## Key Achievements

✅ **Immediate Visual Feedback**
- Engine running visibly on load
- No loading screen or delay
- User sees active 3D scene

✅ **Zero Friction**
- No setup required
- No server needed
- Works on any browser

✅ **Non-Intrusive Documentation**
- Doesn't block engine view
- Slides in from side
- Can be dismissed instantly

✅ **Professional Appearance**
- Clean UI with consistent styling
- Smooth animations
- Dark hacker aesthetic

✅ **Developer Friendly**
- Quick API reference in panel
- Console access for experimentation
- Links to full documentation

✅ **Responsive Design**
- Works on desktop, tablet, mobile
- Touch-friendly buttons
- Adjustable panel width

---

## Next Steps for Users

1. **Visit the site:** https://terminaljoint.github.io/TIGEN/
2. **Watch engine run:** Immediate 3D rendering
3. **Read quick docs:** Click "📖 Docs" button
4. **Try commands:** Open F12 and experiment
5. **Create entities:** Use provided examples
6. **Explore API:** Check full documentation link
7. **Build games:** Use TIGEN in your project
