let output = ""
const script = "./callpy.php"

const infoContainer = document.querySelector("#infoContainer")
const warningContainer = document.querySelector("#warningContainer")

function scan(){
	const url = document.querySelector("#urlInput").value
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

	output = output.slice(1, -1)
	const result = output.split(", ")
	
	for(let i = 0; i < result.length; i++){
		let cell = document.createElement("li")
		console.log(result[i]+"\n")
		
		if(result[i][0] == 2){
			infoContainer.appendChild(cell)
			cell.innerText += output_codes[result[i]];
			cell.innerText += '\n'
			
		}
		else{
			warningContainer.appendChild(cell)
			cell.innerText += result[i];
			cell.innerText += output_codes[result[i]];
			cell.innerText += '\n'
		}
	}
}

			