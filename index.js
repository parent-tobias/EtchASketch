import Grid from "./classes/grid.js";

const gridContainer = document.querySelector(".etch-grid");
const widthEl = document.querySelector("input[name='width']");
const heightEl = document.querySelector("input[name='height']");
const resizeBtn = document.querySelector(".resize-grid");
const roundToggle = document.querySelector(".round-toggle");
const paletteBtns = document.querySelectorAll("[name='palette']");

const greyscaleHues = ['rgb(255, 255, 255)','rgb(223, 223, 223)','rgb(191, 191, 191)','rgb(159, 159, 159)','rgb(127, 127, 127)','rgb(96, 96, 96)','rgb(64, 64, 64)','rgb(32, 32, 32)','rgb(0, 0, 0)']
const randHue = ()=>Math.floor(Math.random()*256);

const blackAndWhite = (current) => "#000";
const randomColor = (current) => `rgb(${randHue()}, ${randHue()}, ${randHue()})`;
const greyscale = (current) => {
  console.log(current);
  return greyscaleHues.includes(current)
     ? greyscaleHues[(greyscaleHues.indexOf(current)+1)%greyscaleHues.length] 
     : greyscaleHues[0];}

let colorFn=blackAndWhite;

const myGrid = new Grid({
  width:16,
  height:16,
  events:{
    mouseover: (event)=>{
      if(event.target.classList.contains("grid-cell")){
        event.target.style.backgroundColor=colorFn(event.target.style.backgroundColor);
        console.log(event.target.style.backgroundColor);
      }
    }
  }
});

resizeBtn.addEventListener("click", evt=>{
  const width=Number(widthEl.value);
  const height = Number(widthEl.value);

  myGrid.resize(width, height);
  roundToggle.checked=false;
})

roundToggle.addEventListener("click", evt=>{
  myGrid.toggleCellClass("round");
})

paletteBtns.forEach(button=>{
  button.addEventListener("click", evt =>{
    switch(evt.target.value){
      case "bw":
        colorFn=blackAndWhite;
        break;
      case "random":
        colorFn=randomColor;
        break;
      case "greyscale":
        colorFn=greyscale;
        break;
    }
  })
})
gridContainer.appendChild(myGrid.domEl);