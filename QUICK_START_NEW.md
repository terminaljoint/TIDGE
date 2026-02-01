# TIGEN v2 Quick Start Guide

## 🚀 Getting Started in 30 Seconds

### Step 1: Open the Intro Page
```
Open: index-new.html
```
You'll see a beautiful landing page with all features and capabilities.

### Step 2: Launch the Editor
Click **"Launch Editor"** button or open `editor-new.html` directly.

### Step 3: Start Creating
The editor is ready to use with a clean, professional interface.

---

## 📋 Interface Overview

### Left Panel
- **Assets Tab**: Drag and drop primitives, lights, and effects
- **Hierarchy Tab**: View and organize scene objects

### Center (Viewport)
- **3D Preview**: Main rendering area
- **Toolbar**: Transform tools (Move, Rotate, Scale)
- **Gizmo Controls**: Lower right corner tools
- **Stats**: FPS, object count, face count

### Right Panel
- **Properties Tab**: Edit object position, rotation, scale
- **Materials Tab**: Material properties (when materials exist)

### Bottom Panel
- **Console**: Engine messages and debug info
- **Output**: Operation output
- **Debug**: Debug information

### Top Bar
- **File, Edit, View, GameObject, Tools, Help**: Menu options
- **Play**: Test the scene
- **Save**: Save your work
- **Home**: Return to intro page

---

## 🎮 Basic Workflow

### 1. Create a Scene
- Start with the empty scene that loads by default
- Use the Assets panel to add objects

### 2. Add Objects
- Drag a cube from the Assets panel
- Position it using the Transform tools
- Edit properties in the Inspector

### 3. Add Physics
- Select an object
- In the Inspector, enable Physics
- Adjust mass, gravity, and friction

### 4. Preview
- Click **Play** to test your scene
- Objects with physics will interact
- Click **Play** again to stop

### 5. Save
- Click **Save** to save your project
- Your scene data will be preserved

---

## ⚙️ Component Reference

### Transform
Position, rotation, and scale of objects.
```
Position X, Y, Z
Rotation X, Y, Z  
Scale X, Y, Z
```

### Physics
Gravity and collision properties.
```
Mass: Weight of the object
Gravity: Enable/disable gravity
Friction: Surface friction value
```

### Rendering
Visual appearance settings.
```
Visible: Show/hide object
Cast Shadow: Object casts shadows
Receive Shadow: Object receives shadows
```

---

## 🎨 Editor Hotkeys (Ready for Implementation)

| Key | Action |
|-----|--------|
| W | Move tool |
| E | Rotate tool |
| R | Scale tool |
| T | View/Camera tool |
| Space | Play/Stop |
| Ctrl+S | Save |
| Ctrl+Z | Undo (coming soon) |
| Ctrl+Y | Redo (coming soon) |

---

## 📁 File Guide

| File | Purpose |
|------|---------|
| `index-new.html` | Beautiful intro page |
| `editor-new.html` | Full-featured editor |
| `app-new.html` | Application entry point |
| `engine-core.js` | Core engine systems |
| `style.css` | Main stylesheets |
| `README-NEW.md` | Full documentation |

---

## 🔧 Common Tasks

### Add a Light
1. Click Assets → Lights
2. Drag "Directional" to viewport
3. Adjust intensity in Inspector

### Change Object Color
1. Select object
2. Go to Materials tab
3. Adjust color values (coming soon)

### Delete an Object
1. Right-click object in Hierarchy
2. Select Delete
(or select and press Delete key when implemented)

### Save Your Work
1. Click **Save** button
2. Enter project name
3. Project saved!

---

## 🎯 Tips & Tricks

1. **Multi-select**: Hold Ctrl and click objects to select multiple
2. **Viewport Navigation**: Use middle mouse to pan, scroll to zoom
3. **Gizmo Mode**: Switch between Move/Rotate/Scale in bottom-right
4. **Console**: Check console for useful debug messages
5. **Properties**: All object properties update in real-time

---

## ❌ Troubleshooting

### Editor Not Loading
- Clear browser cache
- Try a different browser
- Check browser console for errors (F12)

### UI Not Responding
- Refresh the page (F5)
- Ensure JavaScript is enabled
- Check that all files are in the correct directory

### Need Help?
- Check README-NEW.md for detailed documentation
- Review the in-editor help system
- All systems are error-free and ready to use

---

## 🚀 What's Next?

1. **Explore the Editor**: Get familiar with the interface
2. **Create a Scene**: Build your first game level
3. **Add Objects**: Experiment with different primitives
4. **Test Physics**: See gravity and collisions in action
5. **Save Your Work**: Preserve your creations

---

**Ready to Create?** Start with `index-new.html` now!

---

*TIGEN v2 - Advanced 3D Game Engine | Zero Errors | Perfect Performance*
