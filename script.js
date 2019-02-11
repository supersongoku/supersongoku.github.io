function verifyResult(pOptionID, pAnswerID, pAnswerText){
	var result = "";
	// check answer
	if (pOptionID == pAnswerID){
		$('#ResultText').html("<span style='color:yellow'>&#x7B54;&#x5C0D;&#x4E86;</span>");
	}else{
		$('#ResultText').html("<span style='color:#FF5555'>&#x7B54;&#x932F;&#x4E86;&#xFF0C;&#x6B63;&#x78BA;&#x7B54;&#x6848;&#x662F;     " + pAnswerText + " </span>");
	}
	
	 setTimeout(function () {
		 location.reload();
		}, 1000);
		
}

function LoadQuestion(){
	var noofquestions = 0;
	/* Get question from xml  */
	//alert(noofquestions);
    $(document).ready(function(){
	    $.ajax({
	      type: "GET",
	      url: "questions.xml",
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
			// get selected question, answer and options
			$(xml).find('QData').each(function(){
				$(xml).find('Question').each(function(){
					var questionID = $(this).find('QuestionID').text();
					if (Number(questionID) == selectedQID){
						wQuestionText = $(this).find('QuestionText').text();
						wOption1 = "1." + $(this).find('Option1').text();
						wOption2 = "2." + $(this).find('Option2').text();
						wOption3 = "3." + $(this).find('Option3').text();
						wOption4 = "4." + $(this).find('Option4').text();
						
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
			
			wContent = "<table style='max-width:500px;width:100%;background-color:#000000; color:#FFFFFF' border='1'>"
			wContent = wContent + "<tr>"
			wContent = wContent + "<td colspan='2'>" + wQuestionText + "</td>"
			wContent = wContent + "</tr>"
			wContent = wContent + "<tr>"
			wContent = wContent + "<td id='Option1' onclick='verifyResult(1," + wAnswer + ", \&quot;" + wAnswerText + "\&quot;)'><div>" + wOption1 + "</div></td>"
			wContent = wContent + "<td id='Option2' onclick='verifyResult(2," + wAnswer + ", \&quot;" + wAnswerText + "\&quot;)'><div>" + wOption2 + "</div></td>"
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

			
			
			
		  },
		  error:function(){
				alert("Error");
		  }
	
		});
	});
};

