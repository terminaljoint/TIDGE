class TIGEN_Renderer{
  constructor(scene, viewport){
    this.scene = scene;

    this.camera = new THREE.PerspectiveCamera(
      70,
      viewport.clientWidth / viewport.clientHeight,
      0.1,
      2000
    );
    this.camera.position.set(20,20,20);

    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.setSize(viewport.clientWidth, viewport.clientHeight);
    viewport.appendChild(this.renderer.domElement);
  }

  draw(){
    this.renderer.render(this.scene, this.camera);
  }
}
