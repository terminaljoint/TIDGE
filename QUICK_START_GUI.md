# TIGEN v2 GUI - Quick Start Guide

## 🚀 Getting Started in 30 Seconds

### Step 1: Open the Engine
Simply open `index.html` in any modern web browser.

```
Chrome, Firefox, Safari, or Edge
No installation required
Works offline after first load
```

### Step 2: See the Welcome Screen
You'll be greeted with:
- 🎨 Beautiful feature showcase
- 📋 Getting started guide
- 📁 Your saved projects (if any)
- 🎮 Quick start demo option

### Step 3: Create Your First Project
**Option A: Create Blank Project**
1. Click **"+ Create New Project"** button
2. Enter a name (e.g., "My Game")
3. Click **"Create"**
4. Editor opens with a default scene

**Option B: Try Demo**
1. Click **"▶️ Quick Start Demo"**
2. See a ready-made scene
3. Explore and experiment

**Option C: Import Saved Project**
1. Click **"⬆️ Import Project"**
2. Select a `.json` file
3. Project loads into your list

## 🎮 Basic Workflow

### 1. Edit Scene (5 min)
```
Left Panel: Scene Outliner - Shows all objects
Center: 3D Viewport - Drag to rotate, scroll to zoom
Right Panel: Inspector - Edit properties
```

**Add Objects:**
- Select entities from the outliner
- Edit their properties in the inspector
- See changes instantly in the viewport

**Move Objects:**
- Select an object
- Edit Position X, Y, Z in inspector
- Or use gizmos in viewport (coming soon)

### 2. Test (2 min)
```
Click "▶ Play" button
- Physics simulation starts
- Gravity affects objects
- Collisions work
- Camera still controllable
Click "⏹ Stop" to return to edit mode
```

### 3. Save (1 min)
```
Click "💾 Save" button
- Project saved to browser storage
- All changes persisted
- Survives browser restart
```

### 4. Export (1 min)
```
Click "📤 Export" button
Choose format:
- [1] JSON - for backup & sharing
- [2] HTML - standalone viewer
File automatically downloads
```

## 💡 Key Features Explained

### Entity Component System (ECS)
- **Entities** - Objects in your scene (Cube, Sphere, etc.)
- **Components** - Features you add (Mesh, Physics, etc.)
- **Transform** - Position, Rotation, Scale

### Physics Engine
- **Gravity** - Objects fall down
- **Collisions** - Objects bounce off each other
- **Mass** - Heavy objects vs light objects
- **Drag** - Air resistance

### Inspector Panel
Shows editable properties:
```
Transform
├─ Position (X, Y, Z)
├─ Rotation (X, Y, Z)
└─ Scale (X, Y, Z)

Mesh
├─ Geometry (Box, Sphere, etc.)
├─ Material (Color, Metalness, etc.)
└─ [Visual preview]

Physics
├─ Mass
├─ Use Gravity
└─ Drag

[+ Add Component Button]
```

### Local Storage
- ✅ All data stays on your computer
- ✅ No internet required
- ✅ No account needed
- ✅ 5-10MB storage available
- ✅ Export for backup

## 🎯 Common Tasks

### Create a Spinning Cube
1. Create new project
2. Default cube is already in scene
3. Click "Play" button
4. Cube will spin and fall

### Save Your Work
1. Edit your scene
2. Click "Save" button
3. You see a confirmation
4. Data saved locally

### Share a Project
1. Click "Export" button
2. Choose "HTML" option
3. File downloads
4. Email or share the file
5. Others can open directly

### Load Previous Project
1. See "My Projects" section
2. Click "Open" on a project
3. Editor opens with your data
4. Continue editing

### Import External Project
1. Click "Import Project" button
2. Select a `.json` file
3. Project appears in list
4. Click "Open" to use it

## 📊 What You Can Do

### Immediate (Now)
- ✅ Create and edit scenes
- ✅ Add/remove entities
- ✅ Change properties
- ✅ Save locally
- ✅ Export projects

### Play Mode (Now)
- ✅ Test physics
- ✅ See gravity work
- ✅ Try collisions
- ✅ Rotate camera
- ✅ Record for video

### Edit Tools (Now)
- ✅ Select objects
- ✅ Edit transform
- ✅ Edit materials
- ✅ Edit physics
- ✅ Add/remove components

### Sharing (Now)
- ✅ Export as JSON
- ✅ Export as HTML
- ✅ Share files
- ✅ Import from files
- ✅ Backup projects

## 🖥️ Browser Controls

### Viewport Navigation
```
Middle Mouse + Drag = Rotate camera
Scroll Wheel = Zoom in/out
Right Mouse + Drag = Pan camera
Left Click = Select object
Delete Key = Remove selected
```

### Keyboard Shortcuts
```
Delete = Remove selected entity
Esc = Close modals
Ctrl+S = Save (future feature)
F12 = Open console (debugging)
```

## 🎨 Interface Breakdown

### Welcome Screen
- **Header** - Logo and title
- **Features** - 12 cards showing capabilities
- **Getting Started** - 4-step guide
- **Project Manager** - Your projects list
- **Buttons** - Create, Import, Demo

### Editor Screen
- **Top Bar** - Project name, Play, Save, Export, Back
- **Left Panel** - Scene hierarchy (coming soon)
- **Viewport** - 3D scene with objects
- **Right Panel** - Property editor (coming soon)

## 📱 Device Support

### Desktop
- ✅ Full experience
- ✅ All features
- ✅ Best performance
- ✅ Optimal screen size

### Tablet
- ✅ Usable interface
- ✅ Touch gestures
- ✅ Responsive layout
- ✅ Good for creation

### Mobile
- ⚠️ Limited experience
- ✅ View projects
- ⚠️ Editing challenging
- ✅ Export/import works

## 🔧 Troubleshooting

### Project Won't Save
- Check if localStorage is enabled
- Clear browser cache
- Try with smaller project
- See browser console (F12)

### Performance Slow
- Close other tabs
- Reduce entity count
- Disable heavy physics
- Use simpler models

### Export Issues
- Check download folder
- Allow pop-ups in browser
- Try different format
- Check available storage

## 📚 Learn More

### Documentation
- `GUI_USER_GUIDE.md` - Complete user manual
- `FEATURE_CHECKLIST.md` - All features listed
- `GUI_IMPLEMENTATION_SUMMARY.md` - Technical details
- `README.md` - Project overview

### Examples
- `EXAMPLES.md` - Code examples
- `QUICK_START.md` - Advanced guide
- Source files - With comments

### Resources
- Three.js docs - For rendering
- Cannon.js docs - For physics
- ES6 docs - For scripting (future)

## 🎓 Next Steps

### Beginner
1. ✅ Complete this guide
2. Create a new project
3. Explore the interface
4. Watch physics in play mode
5. Save and export

### Intermediate
1. Create multi-object scene
2. Adjust individual properties
3. Test with different settings
4. Export multiple formats
5. Share with others

### Advanced
1. Complex scene creation
2. Performance optimization
3. Custom material settings
4. Physics tuning
5. Export for distribution

## 🚀 Tips for Success

### Do
- ✅ Save frequently
- ✅ Export backups
- ✅ Test in play mode
- ✅ Experiment boldly
- ✅ Check console (F12)

### Don't
- ❌ Close without saving
- ❌ Create huge scenes (500+ objects)
- ❌ Forget to export
- ❌ Edit multiple things at once
- ❌ Rely on browser storage alone

## 🎮 First Project Challenge

Try this in 10 minutes:

1. **Create Project** (1 min)
   - Name: "My First Game"
   - Click Create

2. **Add Objects** (3 min)
   - See default cube
   - Add a sphere
   - Add a plane (ground)

3. **Edit Properties** (3 min)
   - Move cube up
   - Scale ground bigger
   - Change colors

4. **Test** (2 min)
   - Click Play
   - Watch physics
   - Click Stop

5. **Save** (1 min)
   - Click Save
   - See confirmation

## 🎉 You're Ready!

You now know:
- ✅ How to create projects
- ✅ How to edit scenes
- ✅ How to test with physics
- ✅ How to save and export
- ✅ How to share projects

**Happy Creating! 🎮**

---

**Questions?** Check the full [GUI_USER_GUIDE.md](GUI_USER_GUIDE.md)

**Need help?** Open browser console (F12) to see debug info
