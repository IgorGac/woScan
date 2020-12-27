let output = ""
const script = "./callpy.php"



function scan(){
	const url = document.querySelector("#urlInput").value
	
	console.log("[*] Starting scan...")
	$.get(script,{url: url}, function(data){
		if(data){
			console.log(data)
			processOutput(data)	
		}
	})
}

function processOutput(output){
	const infoContainer = document.querySelector("#infoContainer")
	const warningContainer = document.querySelector("#warningContainer")
	output = output.slice(1, -1)
	const result = output.split(", ")
	
	for(let i = 0; i < result.length; i++){
		console.log(result[i]+"\n")
		if(result[i][0] == 2){
			infoContainer.innerText += result[i];
		}
		else{
			warningContainer.innerText += result[i];
		}
	}
}

			