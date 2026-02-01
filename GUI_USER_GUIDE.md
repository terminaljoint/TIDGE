# TIGEN v2 GUI - User Guide

## Welcome!

TIGEN v2 is a professional 3D game engine running entirely in your browser. This guide will help you get started.

## 🚀 Getting Started

### 1. **Welcome Screen**
When you first open TIGEN, you'll see the welcome screen featuring:
- **Core Features** - Entity Component System, Physics, Rendering, Audio, Particles, Animation
- **Editor Features** - Real-time Inspector, Scene Outliner, Transform Gizmos, Play Mode, Auto-Save, Export
- **Getting Started Guide** - Step-by-step instructions
- **Project Manager** - Create, load, or import projects

### 2. **Creating a Project**
- Click **"+ Create New Project"** button
- Enter a project name (required)
- Enter an optional description
- Click **"Create"** to open the editor

### 3. **Quick Start Demo**
- Click **"▶️ Quick Start Demo"** to instantly load a demo scene
- Perfect for exploring features and getting familiar with the editor

### 4. **Importing Projects**
- Click **"⬆️ Import Project"** to load a previously exported project
- Select a `.json` file to import
- The project will be added to your projects list

## 🎮 Editor Interface

### Top Bar
- **Project Name** - Shows your current project
- **▶ Play** - Enter play mode to test physics and gameplay
- **💾 Save** - Save your project to local storage
- **📤 Export** - Export as JSON or HTML
- **← Back** - Return to the welcome screen

### Left Panel: Scene Outliner
- Displays all entities in your scene
- Click to select entities
- Expand/collapse hierarchies
- Right-click for context menu (coming soon)

### Center: 3D Viewport
- **Middle Mouse + Drag** - Rotate camera
- **Scroll Wheel** - Zoom in/out
- **Right Mouse + Drag** - Pan camera
- **Click** - Select objects
- **Delete Key** - Remove selected object

### Right Panel: Inspector
- Edit selected entity properties
- View and modify components
- Add new components to entities
- Real-time property changes

## 📁 Project Management

### Your Projects
All projects are stored locally in your browser's storage.

**Project Actions:**
- **Open** - Load project into editor
- **Delete** - Permanently remove project

### Data Storage
- All projects stored in browser's localStorage
- Automatic saving when you click the Save button
- Each project can hold unlimited entities
- Projects survive browser restarts

## 💾 Save & Export

### Saving Projects
- Click **"Save"** button to save current state
- Projects auto-save key changes
- All data stored locally (no cloud upload)

### Export Options
Click **"Export"** to choose:

**1. JSON Export** (Backup)
- Saves complete project as `.json` file
- Can be imported later
- Good for backup and sharing with other users

**2. HTML Export** (Standalone)
- Creates a standalone `.html` file
- Can be opened in any browser
- Includes embedded viewer
- Great for sharing creations

## 🎨 Creating & Editing

### Adding Entities
1. Click anywhere in the scene outliner
2. Select "Add Entity"
3. Choose entity type:
   - **Cube** - 3D box primitive
   - **Sphere** - 3D sphere primitive
   - **Plane** - Flat 2D surface
   - **Cylinder** - 3D cylinder
   - **Custom** - Load custom model

### Editing Properties
With an entity selected, the Inspector panel shows:

**Transform**
- Position (X, Y, Z)
- Rotation (X, Y, Z) in degrees
- Scale (X, Y, Z)

**Mesh**
- Geometry type
- Material properties
- Color
- Metalness
- Roughness

**Physics**
- Mass
- Use Gravity (toggle)
- Drag
- Angular Drag

**Collider**
- Size
- Shape type
- Is Trigger

### Adding Components
1. Select an entity
2. Scroll to bottom of inspector
3. Click **"+ Add Component"**
4. Choose component type:
   - Mesh
   - Physics
   - Collider
   - Light
   - Audio Source
   - Animator
   - Particle Emitter

## ▶️ Play Mode

### Testing Your Scene
1. Click **"▶ Play"** button
2. Physics simulations start
3. Gravity affects objects
4. Collisions are active
5. Animations play
6. Camera still controllable

### Stopping Play Mode
- Click **"⏹ Stop"** button
- Scene reverts to saved state
- No unsaved changes are lost

## 📊 Tips & Tricks

### Performance
- Limit entities: 100-500 for smooth 60 FPS
- Use simpler physics on mobile
- Reduce particle counts for performance

### Workflow
1. **Create** multiple entities
2. **Edit** properties in real-time
3. **Test** with play mode
4. **Save** frequently
5. **Export** when satisfied

### Best Practices
- Give entities meaningful names
- Use descriptive project names
- Save before exporting
- Test before sharing
- Backup important projects

## 🐛 Troubleshooting

### Project Won't Load
- Check browser console (F12) for errors
- Ensure localStorage is enabled
- Try a fresh import

### Performance Issues
- Reduce number of entities
- Disable physics on static objects
- Lower particle counts
- Close other browser tabs

### Export Issues
- Ensure browser allows downloads
- Check available disk space
- Try a different format

## 🎯 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Delete** | Remove selected entity |
| **Esc** | Close modals/deselect |
| **Ctrl+S** | Save project |
| **F12** | Open browser console |

## 🚀 Advanced Features

### Custom Models
(Feature coming soon)
- Import .glTF models
- Use custom geometries
- Apply custom materials

### Scripting
(Feature coming soon)
- Attach scripts to entities
- Behavior trees
- Event system

### Multiplayer
(Feature coming soon)
- Share projects
- Collaborate in real-time

## 📖 Documentation

- **Full API Docs** - Available in GitHub repository
- **Examples** - Check the EXAMPLES.md file
- **Source Code** - Review individual engine files

## 🎓 Learning Resources

1. Start with Quick Demo
2. Read the getting started guide
3. Explore example projects
4. Experiment with properties
5. Export and share your creations

## 💡 Feature Overview

### Core Engine
- ✅ ECS Architecture
- ✅ 3D Rendering
- ✅ Physics Engine
- ✅ Audio System
- ✅ Particles
- ✅ Animation
- ✅ Asset Management

### Editor
- ✅ Real-time Viewport
- ✅ Scene Outliner
- ✅ Property Inspector
- ✅ Play Mode
- ✅ Local Storage
- ✅ Import/Export
- ✅ GUI Controls

### Coming Soon
- 🔄 Custom Scripts
- 🔄 Advanced Physics
- 🔄 Multiplayer
- 🔄 Mobile Optimization
- 🔄 Plugin System

## Support

For issues, feature requests, or questions:
- Check the GitHub repository
- Review the API reference
- Check the FAQ section
- Open an issue on GitHub

## License

TIGEN v2 is released under the MIT License.
Free for personal and commercial use.

---

**Happy Creating! 🎮**

For more information, visit the TIGEN GitHub repository.
