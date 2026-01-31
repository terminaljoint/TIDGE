const TIGEN_Inspector = {
  selected:null,

  select(obj){
    this.selected = obj;
    document.getElementById("ins-none").style.display = obj ? "none" : "block";
  }
};

