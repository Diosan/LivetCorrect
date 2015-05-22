
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
var readingsArray = [];
var readings = [];
var reading = {};

if (localStorage.getItem("readings") == null) {

	//alert('Reading Empty');

	//readingsArray = [ { 'summary' : 'Test event <img src=\"img/emoticons/PNG/icontexto-emoticons-03-032x032.png\">', 'begin' : new Date(), 'end' : new Date() } ]; 
  
} else {
	
	//alert('Reading NOT Empty');
	
	//localStorage.removeItem('readings');
	
	reading = { 'summary' : '<center><b>Today<b></center>', 'begin' : new Date(y, m, d), 'end' : new Date(y, m, d) };
	
	readingsArray.push(reading);
	// = [ { "summary" : "Test event", "begin" : new Date(), "end" : new Date() } ];
		
	readings = JSON.parse(localStorage.getItem("readings"));
	
	
	var bdate = date.getDate();
	var edate = date.getDate();
	var bd = date.getDate();
	var bm = date.getMonth();
	var by = date.getFullYear();
	var ed = date.getDate();
	var em = date.getMonth();
	var ey = date.getFullYear();  
  
    for (i = 0; i < readings.length; i++) {
    	
      reading = JSON.parse(readings[i]);
        
      bd = parseInt(reading.begin.substring(0, 4));
	  bm = parseInt(reading.begin.substring(5, 7));
	  by = parseInt(reading.begin.substring(8, 10));
	  ed = parseInt(reading.end.substring(0, 4));
	  em = parseInt(reading.end.substring(5, 7));
	  ey = parseInt(reading.end.substring(8, 10));
	        
      readingsArray.push( { 'summary' : reading.summary, 'begin' : new Date(y, m, d), 'end' : new Date(y, m, d) } );
      
    }
        
    //alert(readings[readings.length - 1]);
   
}





// Create an array that will contain the events
var events = [];


$(function() {
	
	setProfile();
	setupCalendar();
    
	$('#profile_save').click( function() {
		
		// Store
		saveProfile();
		setProfile();	
	});
	
	$('#reading_save').click( function() {
		//var today = new Date();
		//alert(today.getUTCMonth());
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		var type = $('#reading_type').val();
		var value = $('#reading_value').val();
		var units = '';
		
	   switch (type) {
		    case "Weight":
        		units = "lbs";
        		break;		
		}
		
		date = new Date();
		d = date.getDate();
		m = date.getMonth();
 		y = date.getFullYear();
 		
		reading = { "summary" : type + ":" + value + " " + units, "begin" : new Date(y, m, d), "end": new Date(y, m, d) };
		readingsArray.push(reading);
		$('#calendar').trigger('refresh');
		readings.push(JSON.stringify(reading));
		localStorage.setItem('readings', JSON.stringify(readings));
		//localStorage.setItem("readings", JSON.stringify(readingsArray));
		
		$('.ui-li-static').each(function() {
		//alert('decoding HTML');
    		$( this ).decHTML();
  			//alert($(this).html());
    	});

		$('#calendar .ui-btn').click(function() {
    	$('.ui-li-static').each(function() {
    		$( this ).decHTML();
  			//alert($(this).html());
    	});	
    });		
		
	});
	
	
	$('#journal_save').click( function() {
		//var today = new Date();
		//alert(today.getUTCMonth());
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		var mood = $('#journal_mood').val();
		var note = $('#journal_note').val();
		var icon = '';
		
	   switch (mood) {
		    case "Happy":
        		icon = "img/emoticons/PNG/icontexto-emoticons-03-032x032.png";
        		//alert(icon);
        		break;
        	case "Sad":
        		icon = "img/emoticons/PNG/icontexto-emoticons-13-032x032.png";
        		//alert(icon);
        		break;
        	case "Sick":
        		icon = "img/emoticons/PNG/icontexto-emoticons-11-032x032.png";
        		//alert(icon);
        		break;        				
		}
		
		date = new Date();
		d = date.getDate();
		m = date.getMonth();
 		y = date.getFullYear();
 		
		reading = { 'summary' : mood + '<img src="' + icon + '" > :' + note, 'begin' : new Date(y, m, d), 'end': new Date(y, m, d) };
		readingsArray.push(reading);
		$('#calendar').trigger('refresh');
		readings.push(JSON.stringify(reading));
		localStorage.setItem('readings', JSON.stringify(readings));
		//localStorage.setItem("readings", JSON.stringify(readingsArray));
		
		$('.ui-li-static').each(function() {
			//alert('decoding html');
    		$( this ).decHTML();
  			//alert($(this).html());
    	});		
		
	});

	
	$('#calendar .ui-btn').click(function() {
	
    	$('.ui-li-static').each(function() {
    		$( this ).decHTML();
  			//alert($(this).html());
    	});	
    });
			

});

$(document).on("pagecreate", function(){    
    var opts = $("#journal_mood option");
    $( "#journal_mood-listbox-popup" ).on( "popupafteropen", function( event, ui ) {
        $("#journal_mood-menu li").each(function(index){
            if ($(this).find("img").length == 0){
                var imageURL = opts.eq(index).data("image");
                var imgElem = '<img src=' + imageURL + ' width="32px" height="32px" />';
                $(this).find("a").prepend(imgElem);
            }
        });
    });
});



function saveProfile() {
	alert($('#profile_breakfast').val());
	localStorage.setItem("name", $('#profile_name').val());
	localStorage.setItem("age", $('#profile_age').val() + " years");
	localStorage.setItem("weight", $('#profile_weight').val());
	localStorage.setItem("breakfast", $('#profile_breakfast').val());
	localStorage.setItem("lunch", $('#profile_lunch').val());
	localStorage.setItem("dinner", $('#profile_dinner').val());
	localStorage.setItem("sugar", $('#profile_sugar').val());
	localStorage.setItem("sugar_fasting", $('#profile_sugar_fasting').val());
}

function setProfile() {

	//alert('Setting profile field');
	
	setProfilefield('name');
	setProfilefield('age');
	setProfilefield('breakfast');
	setProfilefield('lunch');
	setProfilefield('dinner');
	//setProfilefield('weight');
	//setProfilefield('sugar');
	//setProfilefield('sugar_fasting');
	
}

function setProfilefield(fieldName) {
	
	if (localStorage.getItem(fieldName) === null) {
		//alert('field IS empty');
		$('#profile' + fieldName).html('');
		//$('#profile_' + fieldName).val('');
	} else {
		//alert(fieldName + ' field is NOT empty');
		$('#profile' + fieldName).html(localStorage.getItem(fieldName));
		$('#profile_' + fieldName).val(localStorage.getItem(fieldName));
		//if ($('#profile_' + fieldName).attr('type') == 'range') {
			//$('#profile_' + fieldName).val(localStorage.getItem(fieldName)).slider('disabled', true).slider('refresh');
			//$('#profile_' + fieldName).val(localStorage.getItem(fieldName)).slider("refresh");
		//}
	}
	
}



function setupCalendar() {
	
	//alert(JSON.stringify(readingsArray[readingsArray.length - 1]));
        
    $("#calendar").jqmCalendar({
        events: readingsArray,
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        days: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        startOfWeek: 0        
    });
    
    $('#calendar').trigger('refresh');
    
    //alert('setting up calendar');
    
    $('.ui-li-static').each(function() {
    	$( this ).decHTML();
  		//alert($(this).html());
    });
    
    $('#calendar .ui-btn').click(function() {
    	$('.ui-li-static').each(function() {
    		$( this ).decHTML();
  			//alert($(this).html());
    	});	
    });    
}



function createNotifications() {

	/* Set Break Hour in 24hr Notation */
	var breakHour=9;
	/* Set Break Minute */
	var breakMinute=5;
	/* Set Break Message */
	var breakMessage="Reports! Take Your Break!";

	var theDate=new Date()

	if (Math.abs(theDate.getHours())==breakHour&&Math.abs(theDate.getMinutes())==breakMinute) {
		this.focus();
		clearInterval(breakInt);
		alert(breakMessage);
	}

	var breakInt=setInterval("breakTime()",58000);

}

	
