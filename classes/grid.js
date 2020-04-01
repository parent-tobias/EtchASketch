import GridCell from "./grid-cell.js";

export default class Grid{
  constructor({
    width=16, 
    height=16,
    classList=['grid-container'], 
    events = {
      mouseover: (e)=>{},
      mouseout: (e)=>{},
      click: (e)=>{}
    },
    cell={
      classList:["grid-cell"],
      backgroundColor:"white"
    }}){
      this._cell = cell;
      this._el = document.createElement("div");
      this._el.classList.add(...classList);
      Object.keys(events).forEach(event=>{
        this._el.addEventListener(event, events[event]);
      })
      this.createGrid(width, height);
    }
    
    createGrid(width, height){
      this._el.innerHTML = "";

      this._grid = new Array(height).fill(true).map(row=>new Array(width).fill(true).map(cell=>new GridCell({...this._cell})) );

console.log(JSON.parse(JSON.stringify(this._grid)) );

      this._grid.forEach(row=>{
        row.forEach(cell=>{
          this._el.appendChild(cell.domEl);
        })
      })
      document.documentElement.style.setProperty("--grid-width", width);
      document.documentElement.style.setProperty("--grid-height", height);
      return this._el;
    }
    resize(width, height){
      this.createGrid(width, height);
      return this;
    }
    toggleCellClass(className){
      this._el.childNodes.forEach(node=>node.classList.toggle(className));
    }
    get domEl(){
      return this._el;
    }

}