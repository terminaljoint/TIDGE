class TIGEN_Editor{
  constructor(){
    this.vp = document.getElementById("vp");

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0b0d);

    this.renderer = new TIGEN_Renderer(this.scene, this.vp);
    this.entities = [];

    this.initWorld();
    this.bindUI();
  }

  initWorld(){
    this.scene.add(new THREE.GridHelper(200,100,0x222222,0x181818));
    this.scene.add(new THREE.AmbientLight(0xffffff,0.5));

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(2,2,2),
      new THREE.MeshStandardMaterial({color:0x00ff88})
    );
    this.scene.add(cube);
    this.entities.push(cube);
  }

  bindUI(){
    document.getElementById("add-box").onclick = () => this.spawnBox();
    document.getElementById("clear-btn").onclick = () => this.clear();
  }

  spawnBox(){
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshStandardMaterial({color:0x00ff88})
    );
    box.position.y = 0.5;
    this.scene.add(box);
    this.entities.push(box);
  }

  clear(){
    if(!confirm("Clear world?")) return;
    this.entities.forEach(e=>this.scene.remove(e));
    this.entities=[];
  }

  update(dt){
    // future: simulation / play mode
  }

  render(){
    this.renderer.draw();
  }
}
 
