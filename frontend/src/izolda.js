const script = document.createElement("script");
script.type = "text/javascript";


function register(fn, call=false) {
	if (!script.innerHTML.includes(`function ${fn.name}`)) {
		script.innerHTML += fn.toString();
		if (call) {
			script.innerHTML += `\n${fn.name}();`;
		}
	}
}

export {register, script};
