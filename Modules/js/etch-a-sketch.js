//#region Initialise Variables

//DOM Elements
const gridContainer = document.querySelector(".gridContainer");
const sizeText = document.querySelector(".sizeText");
const sizeSlider = document.querySelector(".sizeSlider");
const colourPicker = document.querySelector(".colourPicker");
const eraseBtn = document.querySelector(".eraseBtn");
const rainbowBtn = document.querySelector(".rainbowBtn");
const clearBtn = document.querySelector(".clearBtn");
const resetBtn = document.querySelector(".resetBtn");

//Constants
const DEFAULT_SIZE = 16;
const BACKGROUND_COLOUR = "#2e2e2e80";
const DEFAULT_COLOUR = "#000000";
const ERASE_COLOUR = "#ffffff";

//Global Variables
let colour = DEFAULT_COLOUR;
let mouseDown = false;
let rainbowMode = false;
let eraseMode = false;
let rainbowModeArray = []
let rainbowArrIndex = 0;

//Event Listeners
gridContainer.addEventListener("mouseover", e => Draw(e, colour));
sizeSlider.addEventListener("input", () => SetGridSize());
colourPicker.addEventListener("input", () => SetCurrentColour(colourPicker.value, false));
clearBtn.addEventListener("click", () => ClearSketch());
resetBtn.addEventListener("click", () => ResetPage());
eraseBtn.addEventListener("click", () => EraseBtnClick());
rainbowBtn.addEventListener("click", () => RainbowBtnClick());
    
//#endregion

//Start
LoadDocument();

function LoadDocument() 
{
  SetSizePicker(DEFAULT_SIZE);
  SetRainbowModeArray()
  
  document.body.onmousedown = () => (mouseDown = true);
  document.body.onmouseup = () => (mouseDown = false);
  document.body.ondragstart = () => { return false; };
  document.body.ondrop = () => { return false; };
  document.body.onload = BuildGrid(DEFAULT_SIZE, false);
}

function BuildGrid(gridSize, rebuild) 
{
  if(rebuild){ gridContainer.textContent = ""; }

  let boxSize = `${600 / gridSize}px`;
  for (let i = 0; i < gridSize; i++) {
    let row = document.createElement("div");
    row.className = "row";
    row.style.height = boxSize;

    for (let j = 0; j < gridSize; j++) {
      let box = document.createElement("div");
      SetBoxStyle(box, boxSize);
      row.appendChild(box);
    }

    gridContainer.appendChild(row);
  }
}

function Draw(e, colourToUse) 
{
  if (!mouseDown) return;

  let targetBox = e.target.closest(".box");
  if (!targetBox) return;

  if (rainbowMode) 
  { 
    SetBoxColour(targetBox, SetRainbowColour());
  } else { 
    SetBoxColour(targetBox, colourToUse); 
  }
}

function ClearSketch() 
{
  const allBoxes = document.querySelectorAll(".box");

  allBoxes.forEach(box => SetBoxColour(box, ERASE_COLOUR));
}

function ResetPage()
{
  rainbowMode = false;
  SwitchButton(rainbowBtn, rainbowMode);
  SetSizePicker(DEFAULT_SIZE);
  BuildGrid(DEFAULT_SIZE, true);
  colourPicker.value = DEFAULT_COLOUR;
  SetCurrentColour(DEFAULT_COLOUR, false)
}

function EraseBtnClick()
{
  if(!eraseMode)
  {
    eraseMode = true;
    SetCurrentColour(ERASE_COLOUR, false);
  } else {
    eraseMode = false;
    SetCurrentColour(DEFAULT_COLOUR, false);
  }

  SwitchButton(eraseBtn, eraseMode);
}

function RainbowBtnClick()
{
  if (!rainbowMode) {
    rainbowMode = true;
    rainbowArrIndex = 0;
  } else {
    rainbowMode = false;
  }

  SwitchButton(rainbowBtn, rainbowMode);
}

function SwitchButton(button, toggleOn) 
{
  if (toggleOn) {
    button.style.color = DEFAULT_COLOUR;
    button.style.backgroundColor = ERASE_COLOUR;
  } else {
    button.style.color = ERASE_COLOUR;
    button.style.backgroundColor = BACKGROUND_COLOUR;
  }
}



function SetCurrentColour(newColour, isRainbowMode) 
{  
  colour = newColour;
  rainbowMode = isRainbowMode;
}

function SetBoxColour(box, colourToUse) 
{
  box.style.backgroundColor = colourToUse;
}

function SetGridSize() 
{
  ClearSketch();
  BuildGrid(sizeSlider.value, true);
  sizeText.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
}

function SetSizePicker(size) 
{
  sizeSlider.value = size;
  sizeText.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
}

function SetBoxStyle(box, boxSize) 
{
  box.className = "box";
  box.style.display = "inline-block";
  box.style.width = boxSize;
  box.style.height = boxSize;
}

function SetRainbowColour() 
{
  let red = rainbowModeArray[rainbowArrIndex][0];
  let green = rainbowModeArray[rainbowArrIndex][1];
  let blue = rainbowModeArray[rainbowArrIndex][2];

  if (rainbowArrIndex >= 29) {
    rainbowArrIndex = 0;
  }

  rainbowArrIndex++;

  return `rgb(${red}, ${green}, ${blue})`;
}

function SetRainbowModeArray()
{
  rainbowModeArray = [
    [255, 0, 0],
    [225, 0, 25],
    [200, 0, 50],
    [175, 0, 75],
    [150, 0, 100],
    [125, 0, 125],
    [100, 0, 150],
    [75, 0, 175],
    [50, 0, 200],
    [25, 0, 225],
    [0, 0, 255],
    [0, 25, 225],
    [0, 50, 200],
    [0, 75, 175],
    [0, 100, 150],
    [0, 125, 125],
    [0, 150, 100],
    [0, 175, 75],
    [0, 200, 50],
    [0, 225, 25],
    [0, 255, 0],
    [25, 225, 0],
    [50, 200, 0],
    [75, 175, 0],
    [100, 150, 0],
    [125, 125, 0],
    [150, 100, 0],
    [175, 75, 0],
    [200, 50, 0],
    [225, 25, 0]
  ];
}
