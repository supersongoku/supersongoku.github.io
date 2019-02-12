function verifyResult(pOptionID, pAnswerID, pAnswerText){
	var result = "";
	// check answer
	switch (pOptionID){
	case 1:
		if (pOptionID == pAnswerID){
			document.getElementById('Option1').style.backgroundColor = "green";
		}else{
			document.getElementById('Option1').style.backgroundColor = "red";
		}
		break;
	case 2:
		if (pOptionID == pAnswerID){
			document.getElementById('Option2').style.backgroundColor = "green";
		}else{
			document.getElementById('Option2').style.backgroundColor = "red";
		}
		break;
	case 3:
		if (pOptionID == pAnswerID){
			document.getElementById('Option3').style.backgroundColor = "green";
		}else{
			document.getElementById('Option3').style.backgroundColor = "red";
		}
		break;
	case 4:
		if (pOptionID == pAnswerID){
			document.getElementById('Option4').style.backgroundColor = "green";
		}else{
			document.getElementById('Option4').style.backgroundColor = "red";
		}
		break;
	}
	
	if (pOptionID == pAnswerID){
		$('#ResultText').html("<span style='color:yellow'>&#x7B54;&#x5C0D;&#x4E86;</span>");
		document.getElementById('content').style.display = 'block';
		document.getElementById('Option1').onclick = null;
		document.getElementById('Option2').onclick = null;
		document.getElementById('Option3').onclick = null;
		document.getElementById('Option4').onclick = null;
		 setTimeout(function () {
			 location.reload();
			}, 1000);
	}else{
		$('#ResultText').html("<span style='color:#FF0000'>&#x7B54;&#x932F;&#x4E86;&#xFF0C;&#x6B63;&#x78BA;&#x7B54;&#x6848;&#x662F;     " + pAnswerText + " </span>");
		document.getElementById('content').style.display = 'block';
		document.getElementById('Option1').onclick = null;
		document.getElementById('Option2').onclick = null;
		document.getElementById('Option3').onclick = null;
		document.getElementById('Option4').onclick = null;
		setTimeout(function () {
			location.reload();
		}, 2000);
	}
	
		
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
			if(window.mobilecheck){
				wContent = "<table style='width:100%;background-color:#000000; color:#FFFFFF' border='1'>"
			}else{
				wContent = "<table style='max-width:600px;width:100%;background-color:#000000; color:#FFFFFF' border='1'>"
			}
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

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
