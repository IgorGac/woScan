let output = ""
const script = "./callpy.php"

const infoContainer = document.querySelector("#infoContainer")
const warningContainer = document.querySelector("#warningContainer")


let scanData = {
    "Info": 0,
    "Warning": 2
};


function scan(){
	let url = document.querySelector("#urlInput").value
	if(url.substr(0, 4) != "http"){
		url = "http://"+url
	}
	infoContainer.innerHTML = ""
	warningContainer.innerHTML = ""
	console.log("[*] Starting scan...")
	$.get(script,{url: url}, function(data){
		if(data){
			console.log(data)
			processOutput(data)	
		}
	})
}

function processOutput(output){
	document.querySelector("#app").style.display = "flex"
	output = output.slice(1, -1)
	const result = output.split(", ")
	
	for(let i = 0; i < result.length; i++){
		let cell = document.createElement("li")
		scanData["Info"]++;
		console.log(result[i]+"\n")
		infoContainer.appendChild(cell)
		cell.innerText += output_codes[result[i]];
		cell.innerText += '\n'
			
	}
	myPiechart.draw();
}

/* CHART */

const chart = document.querySelector("#resultChart")
chart.width = 300;
chart.height = 300;
let ctx = chart.getContext("2d")




function drawLine(ctx, startX, startY, endX, endY){
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
}
function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
}
function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

let Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
 
    this.draw = function(){
        let total_value = 0;
        let color_index = 0;
        for (let categ in this.options.data){
            let val = this.options.data[categ];
            total_value += val;
        }
 
        let start_angle = 0;
        for (categ in this.options.data){
            val = this.options.data[categ];
            let slice_angle = 2 * Math.PI * val / total_value;
 
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
            );
 
            start_angle += slice_angle;
            color_index++;
        }
 
    }
}
let myPiechart = new Piechart(
    {
        canvas:chart,
        data:scanData,
        colors:["#4688e3", "#e33529"]
    }
);

			