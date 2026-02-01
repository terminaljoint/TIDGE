/**
 * TIGEN Application Bootstrap
 * Main application controller for welcome screen and editor
 */

class TIGENApplication {
  constructor() {
    this.projectManager = window.TIGENProjectManager;
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.editorScreen = document.getElementById('editor-screen');
    this.editor = null;
    
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.loadProjectsList();
    console.log('✓ TIGEN Application initialized');
  }

  /**
   * Attach event listeners to welcome screen
   */
  attachEventListeners() {
    // Create new project button
    document.getElementById('new-project-btn').addEventListener('click', () => {
      this.showProjectModal();
    });

    // Import project button
    document.getElementById('import-project-btn').addEventListener('click', () => {
      this.importProject();
    });

    // Quick start demo button
    document.getElementById('quick-start-btn').addEventListener('click', () => {
      this.startQuickDemo();
    });

    // Modal controls
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-cancel').addEventListener('click', () => {
      modal.classList.remove('active');
    });

    document.getElementById('modal-confirm').addEventListener('click', () => {
      this.createProjectFromModal();
    });

    // Close modal on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.classList.remove('active');
      }
    });

    // Editor controls (only attached when editor is active)
    this.editorControls = {
      save: () => this.saveProject(),
      export: () => this.showExportOptions(),
      play: () => this.togglePlayMode(),
      back: () => this.backToWelcome()
    };
  }

  /**
   * Load and display projects list
   */
  loadProjectsList() {
    const projects = this.projectManager.getAllProjects();
    const projectsList = document.getElementById('projects-list');

    if (projects.length === 0) {
      projectsList.innerHTML = '<div class="empty-projects">No projects yet. Create a new one to get started!</div>';
      return;
    }

    projectsList.innerHTML = projects.map(project => {
      const date = new Date(project.updatedAt).toLocaleDateString();
      return `
        <div class="project-item">
          <div class="project-name">${project.name}</div>
          <div class="project-date">Updated: ${date}</div>
          <div class="project-actions">
            <button class="project-btn" onclick="app.openProject('${project.id}')">Open</button>
            <button class="project-btn" onclick="app.deleteProject('${project.id}')">Delete</button>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Show project creation modal
   */
  showProjectModal() {
    const modal = document.getElementById('project-modal');
    document.getElementById('project-name-input').value = '';
    document.getElementById('project-desc-input').value = '';
    document.getElementById('project-name-input').focus();
    modal.classList.add('active');
  }

  /**
   * Create project from modal
   */
  createProjectFromModal() {
    const name = document.getElementById('project-name-input').value.trim();
    const desc = document.getElementById('project-desc-input').value.trim();

    if (!name) {
      alert('Please enter a project name');
      return;
    }

    const project = this.projectManager.createProject(name, desc);
    document.getElementById('project-modal').classList.remove('active');
    this.loadProjectsList();
    this.openProject(project.id);
  }

  /**
   * Open a project in the editor
   */
  openProject(projectId) {
    const project = this.projectManager.loadProject(projectId);
    if (!project) {
      alert('Failed to load project');
      return;
    }

    this.switchToEditor(project);
  }

  /**
   * Switch to editor screen
   */
  switchToEditor(project) {
    // Hide welcome, show editor
    this.welcomeScreen.classList.add('hidden');
    this.editorScreen.classList.add('active');

    // Update project name display
    document.getElementById('project-name-display').value = project.name;

    // Attach editor control events
    document.getElementById('play-btn').onclick = () => this.togglePlayMode();
    document.getElementById('save-btn').onclick = () => this.saveProject();
    document.getElementById('export-btn').onclick = () => this.showExportOptions();
    document.getElementById('back-btn').onclick = () => this.backToWelcome();

    // Initialize engine editor
    if (!this.editor) {
      this.initializeEditor();
    }

    console.log('✓ Switched to editor:', project.name);
  }

  /**
   * Initialize the game engine editor
   */
  initializeEditor() {
    // Initialize TIGEN engine
    window.TIGEN = {};
    
    // Create main game scene
    TIGEN.scene = new TIGEN_Scene();
    
    // Create editor
    TIGEN.editor = new TIGEN_Editor();
    
    // Create main loop
    TIGEN.loop = new TIGEN_Loop(TIGEN.scene);
    TIGEN.loop.render = () => TIGEN.editor.render();
    
    // Start the game loop
    TIGEN.loop.start();

    this.editor = TIGEN.editor;
    console.log('✓ Editor initialized');
  }

  /**
   * Toggle play mode
   */
  togglePlayMode() {
    if (!this.editor) return;
    
    this.editor.togglePlayMode();
    const playBtn = document.getElementById('play-btn');
    
    if (this.editor.playMode) {
      playBtn.textContent = '⏹ Stop';
      playBtn.style.background = '#ff4d4d';
    } else {
      playBtn.textContent = '▶ Play';
      playBtn.style.background = '#00ff88';
    }
  }

  /**
   * Save current project
   */
  saveProject() {
    if (!this.projectManager.currentProject) return;

    // Save any unsaved editor state
    if (this.editor) {
      // Add editor state to project
      this.projectManager.currentProject.entities = this.editor.scene.entities.map(entity => ({
        id: entity.id || this.projectManager.generateId(),
        name: entity.name,
        position: entity.transform?.position || { x: 0, y: 0, z: 0 },
        rotation: entity.transform?.rotation || { x: 0, y: 0, z: 0 },
        scale: entity.transform?.scale || { x: 1, y: 1, z: 1 }
      }));
    }

    this.projectManager.saveCurrentProject();
    alert('✓ Project saved successfully');
  }

  /**
   * Show export options
   */
  showExportOptions() {
    if (!this.projectManager.currentProject) return;

    const projectId = this.projectManager.currentProject.id;
    const format = prompt('Export format:\n[1] JSON (for backup)\n[2] HTML (standalone)\n\nEnter 1 or 2:', '1');

    if (format === '1') {
      this.projectManager.exportProjectJSON(projectId);
    } else if (format === '2') {
      this.projectManager.exportProjectHTML(projectId);
    }
  }

  /**
   * Import project from file
   */
  importProject() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          const project = this.projectManager.importProjectJSON(jsonData);
          if (project) {
            this.loadProjectsList();
            alert(`✓ Project imported: ${project.name}`);
          } else {
            alert('Failed to import project');
          }
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  /**
   * Delete a project
   */
  deleteProject(projectId) {
    const project = this.projectManager.getProject(projectId);
    if (!project) return;

    if (confirm(`Delete "${project.name}"? This cannot be undone.`)) {
      this.projectManager.deleteProject(projectId);
      this.loadProjectsList();
    }
  }

  /**
   * Start quick demo
   */
  startQuickDemo() {
    const demoProject = this.projectManager.createProject('Demo Scene', 'Quick start demo');
    this.openProject(demoProject.id);
  }

  /**
   * Back to welcome screen
   */
  backToWelcome() {
    // Save current project state
    this.saveProject();

    // Hide editor, show welcome
    this.editorScreen.classList.remove('active');
    this.welcomeScreen.classList.remove('hidden');

    // Reload projects list
    this.loadProjectsList();

    console.log('✓ Returned to welcome screen');
  }
}

// Initialize application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new TIGENApplication();
  console.log(`
╔═══════════════════════════════════════════════════════╗
║          TIGEN v2 - Game Engine Loaded              ║
║  Terminal Joint Intelligence Game Engine Network    ║
╚═══════════════════════════════════════════════════════╝

✓ Features:
  • Entity Component System (ECS)
  • Physics Engine with gravity
  • Advanced Rendering & PBR Materials
  • Audio System
  • Particle Effects
  • Animation System
  • Local Project Storage
  • Real-time Inspector
  • Scene Outliner
  • Play Mode Testing
  • JSON & HTML Export

🎮 Get started: Create or import a project!
📖 Learn more: Check the welcome screen
  `);
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.app?.editor) {
    const vp = document.getElementById('vp');
    window.app.editor.renderer.renderer.setSize(vp.clientWidth, vp.clientHeight);
    window.app.editor.renderer.camera.aspect = vp.clientWidth / vp.clientHeight;
    window.app.editor.renderer.camera.updateProjectionMatrix();
  }
});
