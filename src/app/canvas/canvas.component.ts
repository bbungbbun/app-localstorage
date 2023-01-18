import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  colorOptions : any[] = [
    {
      id: '1',
      color: '#1abc9c'
    },
    {
      id: '2',
      color: '#3498db'
    },
    {
      id: '3',
      color: '#34495e'
    },
    {
      id: '4',
      color: '#27ae60'
    },
    {
      id: '5',
      color: '#8e44ad'
    },
    {
      id: '6',
      color: '#f1c40f'
    },
    {
      id: '7',
      color: '#e74c3c'
    },
    {
      id: '8',
      color: '#95a5a6'
    },
    {
      id: '9',
      color: '#2ecc71'
    },
    {
      id: '10',
      color: '#e67e22'
    },
    // {
    //   id: '1',
    //   color: '#95a5a6'
    // },
  ]

  constructor() { }

  ngOnInit(): void {

    const textInput :any = document.getElementById('text');
    const modeBtn :any = document.getElementById('mode-btn');
    const destroyBtn :any = document.getElementById('destroy-btn');
    const eraserBtn :any = document.getElementById('eraser-btn');
    const fileInput :any = document.getElementById('file');

    const colorOptions :any = Array.from(
      document.getElementsByClassName('color-option')
    );
    const color :any = document.getElementById('color');

    const lineWidth :any = document.getElementById("line-width");
    const canvas :any = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 800;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx.lineWidth = lineWidth.value;
    ctx.lineCap = "round";
    let isPainting = false;
    let isFilling = false;

    function onMove(event :any) {
      if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
      }
      ctx.moveTo(event.offsetX, event.offsetY);
    }

    function startPainting() {
      isPainting = true;
    }

    function cancelPainting() {
      isPainting = false;
      ctx.beginPath();
    }

    function onLineWidthChange(event :any){
      ctx.lineWidth = event.target.value;
    }

    function onColorChange (event :any){
      ctx.strokeStyle = event.target.value;
      ctx.fillStyle = event.target.value;
    }

    function onColorClick(event :any){
      const colorValue = event.target.dataset.color
      ctx.strokeStyle = colorValue;
      ctx.fillStyle = colorValue;
      color.value = colorValue;
    }

    function onModeClick(){
      if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
      } else{
        isFilling = true;
        modeBtn.innerText = "Draw";
      }
    }

    function onCanvasClick(){
      if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
    }

    function onDestroyClick (){
      ctx.fillStyle = 'white';
      ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    }

    function onEraserClick () {
      ctx. strokeStyle = 'white';
      isFilling = false;
      modeBtn.innerText = "Fill";
    }

    function onFileChange(event :any){
      const file = event.target.files[0];
      const url = URL.createObjectURL(file)
      const image = new Image()
      image.src = url;
      image.onload = function (){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        fileInput.value = null;
      }
    }

    function onDoubleClick(event :any){
      const text = textInput.value;
      if (text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "48px serif"
        ctx.fillText(text, event.offsetX, event.offsetY)
        // strokeText -- 글자가 겉테두리만있고 채워져 있지 않은 글자가 나옴
        ctx.restore();
      }
    }


    canvas.addEventListener("dblclick", onDoubleClick);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", cancelPainting);
    canvas.addEventListener("mouseleave", cancelPainting);
    canvas.addEventListener("click", onCanvasClick)

    lineWidth.addEventListener("change", onLineWidthChange);
    color.addEventListener("change",onColorChange);

    colorOptions.forEach((color :any) => color.addEventListener("click",onColorClick))

    modeBtn.addEventListener("click", onModeClick);
    destroyBtn.addEventListener("click", onDestroyClick);
    eraserBtn.addEventListener("click", onEraserClick);

    fileInput.addEventListener("change",onFileChange);

  }


}
