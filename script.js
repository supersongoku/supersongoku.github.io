function String SubmitAnswer(pQuestionID, pAnswerID){
	var result = "";
	// check answer
	return result;
}

function LoadQuestion(){
	var noofquestions = 0;
	/* Get question from xml  */
    $(document).ready(function(){
	    $.ajax({
	      type: "GET",
	      url: "./Questions.xml",
		  cache:false,
	      dataType: "xml",
	      success: function(xml) {
			 // count no. of questions
			 $(xml).find('QData').each(function(){
				noofquestions = 0;
				$(xml).find('Question').each(function(){
					noofquestions++;
				);}
			);}
			
			// randomly select a question:
			var selectedQID = Math.floor(Math.random() * noofquestions) + 1;

			
			alert(selectedQID);
			// get selected question, answer and options
			$(xml).find('QData').each(function(){
				$(xml).find('Question').each(function(){
					var questionID = $(this).find('QuestionID').text();
					if (questionID = selectedQID){
						var wQuestionText = $(this).find('QuestionText').text();
						var wOption1 = $(this).find('Option1').text();
						var wOption2 = $(this).find('Option2').text();
						var wOption3 = $(this).find('Option3').text();
						var wOption4 = $(this).find('Option4').text();
						var wAnswer = $(this).find('Answer').text();
						break;
					}
					
				);}
			);} 
			
			//Display Question and Answer
			$('#Question').html(wQuestionText);
			$('#Option1').html(wOption1);
			 
		});
	});
	}
}