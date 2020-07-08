function clearAllTimeout(){
	var id = window.setTimeout(function() {}, 0);

	while (id--) {
		window.clearTimeout(id); // will do nothing if no timeout with id is present
	}
}
function verifyResult(pOptionID, pAnswerID, pAnswerText){
	var result = "";
	// check answer
	clearAllTimeout();
	if (pOptionID == pAnswerID){
		document.getElementById('Option' + pOptionID).style.backgroundColor = "green";
	}else{
		document.getElementById('Option' + pOptionID).style.backgroundColor = "darkred";
		document.getElementById('Option' + pAnswerID).style.backgroundColor = "limegreen";
		document.getElementById('Option' + pAnswerID).style.color = "white";
	}
	
	if (pOptionID == pAnswerID){
		$('#ResultText').html("<span style='color:yellow'>&#x7B54;&#x5C0D;&#x4E86;</span>");
		document.getElementById('content').style.display = 'block';
		// disable click 
		document.getElementById('Option1').onclick = null;
		document.getElementById('Option2').onclick = null;
		document.getElementById('Option3').onclick = null;
		document.getElementById('Option4').onclick = null;
		 setTimeout(function () {
			 //location.reload();
			 LoadQuestion();
			}, 200);
	}else{
		$('#ResultText').html("<span style='color:#FF0000'>&#x7B54;&#x932F;&#x4E86;&#xFF0C;&#x6B63;&#x78BA;&#x7B54;&#x6848;&#x662F;     " + pAnswerText + " </span>");
		document.getElementById('content').style.display = 'block';
		document.getElementById('Option1').onclick = null;
		document.getElementById('Option2').onclick = null;
		document.getElementById('Option3').onclick = null;
		document.getElementById('Option4').onclick = null;
		setTimeout(function () {
			//location.reload();
			LoadQuestion();
		}, 1000);
	}
	
		
}

function LoadQuestion(){
	var noofquestions = 0;
	/* Get question from xml  */
	//alert(noofquestions);
	var timeOut1;
	var timeOut2;
	var timeOut3;
    $(document).ready(function(){
	    $.ajax({
	      type: "GET",
	      url: "questionsTypeII.xml",
		  cache:false,
	      dataType: "xml",
	      success: function(xml){
			 // count no. of questions
			 $(xml).find('QData').each(function(){
				noofquestions = 0;
				$(xml).find('Question').each(function(){
					noofquestions++;
				});
			 });
			// randomly select a question:
			var selectedQID = Math.floor(Math.random() * noofquestions) + 1;

			
			var wQuestionText = "";
			var wOption1 = "";
			var wOption2 = "";
			var wOption3 = "";
			var wOption4 = "";
			var wAnswerText = "";
			var wQuestionType = "1";
			var wHint1 = "";
			var wHint2 = "";
			var wHint3 = "";
			
			// get selected question, answer and options
			$(xml).find('QData').each(function(){
				$(xml).find('Question').each(function(){
					var questionID = $(this).find('QuestionID').text();
					if (Number(questionID) == selectedQID){
						wQuestionText = $(this).find('QuestionText').text();
						wQuestionType = $(this).find('QuestionType').text();
						if (wQuestionType=="2"){
							wHint1 = $(this).find('Hint1').text();
							wHint2 = $(this).find('Hint2').text();
							wHint3 = $(this).find('Hint3').text();
						}
						wOption1 = $(this).find('Option1').text();
						wOption2 = $(this).find('Option2').text();
						wOption3 = $(this).find('Option3').text();
						wOption4 = $(this).find('Option4').text();
						
						wAnswer = $(this).find('Answer').text();
						switch(wAnswer){
							case "1":
								wAnswerText = wOption1;
								break;
							case "2":
								wAnswerText = wOption2;
								break;
							case "3":
								wAnswerText = wOption3;
								break;
							case "4":
								wAnswerText = wOption4;
								break;
							default:
								wAnswerText = "";
						}
						
					}
					
				});
			});
			
			//Display Question and Answer content
			wContent = "<table style='width:100%;background-color:#000000; color:#FFFFFF' border='1'>"
			//wContent = "<table style='max-width:600px;width:100%;background-color:#000000; color:#FFFFFF' border='1'>"
			wContent = wContent + "<tr>"
			wContent = wContent + "<td colspan='2'>" + wQuestionText + "</td>"
			wContent = wContent + "</tr>"
			if (wQuestionType=="2"){
				wContent = wContent + "<tr><td style='text-align:left;' class='H1' colspan='2'></td></tr>"
			}
			
			wContent = wContent + "<tr>"
			wContent = wContent + "<td width=50% id='Option1' onclick='verifyResult(1," + wAnswer + ", \&quot;" + wAnswerText + "\&quot;)'><div>" + wOption1 + "</div></td>"
			wContent = wContent + "<td width=50% id='Option2' onclick='verifyResult(2," + wAnswer + ", \&quot;" + wAnswerText + "\&quot;)'><div>" + wOption2 + "</div></td>"
			wContent = wContent + "</tr>"
			wContent = wContent + "<tr>"
			wContent = wContent + "<td id='Option3' onclick='verifyResult(3," + wAnswer + ", \&quot;" + wAnswerText + "\&quot;)'><div>" + wOption3 + "</div></td>"
			wContent = wContent + "<td id='Option4' onclick='verifyResult(4," + wAnswer + ", \&quot;" + wAnswerText + "\&quot;)'><div>" + wOption4 + "</div></td>"
			wContent = wContent + "</tr>"
			wContent = wContent + "<tr>"
			wContent = wContent + "<td colspan='2' id='ResultText'></td>"
			wContent = wContent + "</tr>"
			wContent = wContent + "</table>"

		$('#content').html(wContent);
			//$('.H1').html = "";
			timeOut1 = setTimeout(function(){ $('.H1').append('提示一:  ' + wHint1); }, 1000);
			timeOut2 = setTimeout(function(){ $('.H1').append("<br>" + '提示二:  ' + wHint2 ); }, 3000);
			timeOut3 = setTimeout(function(){ $('.H1').append("<br>" + '提示三:  ' + wHint3); }, 5000);
			
			
			
		  },
		  error:function(){
				alert("Error");
		  }
	
		});
	});
};
