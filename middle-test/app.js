var template  = function(a,b) { 
    
    return(a+'').replace(
            
            /\{\{([^{}]+)}}/g,
            function(c,d) { 
                
                return d in (b||{})
                        
                        ? (/^f/.test(typeof b[d]) ? b[d]() :b[d] )
                        
                        
                        : c;
            }
    );
};

function callAjax(url, callback){
	var xmlhttp;
	// compatible with IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			callback(xmlhttp.responseText);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function getDom(id){
	return document.getElementById(id);
}

function callbackStudentAjax(responseText){

	// string 을 json 으로 변환
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
	var studentList = JSON.parse(responseText);
	var templateString = getDom('boxTemplate').innerHTML;
	var parseString = [];
	var student = '';

	for(var i=0; i<studentList.length; i++ ){
		student = studentList[i];
		parseString.push( template(templateString, {name: student[0], github_id:student[1]}  ) );
	}

	getDom('container').innerHTML = parseString.join("");

}

function start(){
	callAjax('student.js', callbackStudentAjax);
}


//시작 
start();