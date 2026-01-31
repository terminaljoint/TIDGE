class TIGEN_Loop{
  constructor(editor){
    this.editor = editor;
    this.clock = new THREE.Clock();
  }

  start(){
    const tick = () => {
      requestAnimationFrame(tick);
      const dt = this.clock.getDelta();
      this.editor.update(dt);
      this.editor.render();
    };
    tick();
  }
}
