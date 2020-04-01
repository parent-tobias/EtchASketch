
export default class GridCell {
  constructor({
    width='100vw',
    height='100vh', 
    startColor='white', 
    classList=["cell"], 
    events = {
    onClick:()=>{},
    onMouseover:()=>{}, 
    onMouseout:()=>{} 
  }}){
    this._width=width;
    this._height=height;
    this._el = document.createElement("div");
    if(classList.length>0)
      this._el.classList.add(...classList);
    this._el.style.backgroundColor = startColor;
    Object.keys(events).forEach(eventHandler =>{
      this._el.addEventListener(eventHandler.substring(2), events[eventHandler]);
    })
  } // End of constructor.
  get domEl(){
    return this._el;
  }
  set bgColor(val){
    this._el.style.backgroundColor = val;
    return this._el;
  }
}