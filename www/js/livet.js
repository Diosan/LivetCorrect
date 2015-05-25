
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
var readingsArray = [];
var readings = [];
var reading = {};

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

 	// device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }


// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
      var profileImage = document.getElementById('profileimage');
      var profileImage = document.getElementById('profileimage2');

      // Unhide image elements
      //
      smallImage.style.display = 'block';
      //profileImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
      profileImage.src = "data:image/jpeg;base64," + imageData;
      profileImage2.src = "data:image/jpeg;base64," + imageData;
      
	  $.mobile.changePage('#profile', 'none');

}





// device APIs are available
//
// A button will call this function
function capturePhoto() {
   //alert('Capturing Photos');
   // Take picture using device camera and retrieve image as base64-encoded string
   navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL });
}


// Called if something bad happens.
//
function onFail(message) {
   alert('Failed because: ' + message);
}



//localStorage.removeItem('name');

if (localStorage.getItem("readings") == null) {

	//alert('Reading Empty');

	//readingsArray = [ { 'summary' : 'Test event <img src=\"img/emoticons/PNG/icontexto-emoticons-03-032x032.png\">', 'begin' : new Date(), 'end' : new Date() } ]; 
 
	reading = { 'summary' : '<center><b>Today<b></center>', 'begin' : new Date(y, m, d), 'end' : new Date(y, m, d) };
	readingsArray.push(reading);
	reading = { 'summary' : '<center><b>Yesterday<b></center>', 'begin' : new Date(y, m, d - 1), 'end' : new Date(y, m, d - 1) };
	readingsArray.push(reading);
	reading = { 'summary' : '<center><b>Tomorrow<b></center>', 'begin' : new Date(y, m, d + 1), 'end' : new Date(y, m, d + 1) };
	readingsArray.push(reading);
  
} else {
	
	//alert('Reading NOT Empty');
	
	//localStorage.removeItem('name');
	
	reading = { 'summary' : '<center><b>Today<b></center>', 'begin' : new Date(y, m, d), 'end' : new Date(y, m, d) };
	readingsArray.push(reading);
	reading = { 'summary' : '<center><b>Yesterday<b></center>', 'begin' : new Date(y, m, d - 1), 'end' : new Date(y, m, d - 1) };
	readingsArray.push(reading);
	reading = { 'summary' : '<center><b>Tomorrow<b></center>', 'begin' : new Date(y, m, d + 1), 'end' : new Date(y, m, d + 1) };
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
	
	//alert('There are ' + parseInt(readings.length) + ' readings');
	
	//alert(y);
	//alert(m);
	//alert(d);  
  
    for (i = 0; i < readings.length; i++) {
    	
      reading = JSON.parse(readings[i]);
      
      //alert(reading.begin.substring(0, 4));
      //alert(reading.begin.substring(5, 7));
      //alert(reading.begin.substring(8, 10));
        
      by = parseInt(reading.begin.substring(0, 4));
	  bm = parseInt(reading.begin.substring(5, 7));
	  bd = parseInt(reading.begin.substring(8, 10));
	  ey = parseInt(reading.end.substring(0, 4));
	  em = parseInt(reading.end.substring(5, 7));
	  ed = parseInt(reading.end.substring(8, 10));
	        
      readingsArray.push( { 'summary' : reading.summary, 'begin' : new Date(by, bm, bd), 'end' : new Date(ey, em, ed) } );
      
    }
        
    //alert(readings[readings.length - 1]);
   
}

function cm2inches(cm) {
	
	var inches = 0;
	var feetHeight = 0;
	var inchesHeight = 0;
	var height = '';
	
	//alert(cm);
	
	inches = parseFloat('0.393700787') * parseFloat(cm);
	feetHeight = Math.floor(Math.round( inches )/12);
	inchesHeight = Math.round( inches ) % 12;
	height = feetHeight.toString() + ' feet ';
	
	if(inchesHeight != 0) {
		height += inchesHeight + ' inches';
	}	
	
	return height;
	
}


// Create an array that will contain the events
var events = [];


$(function() {
	
	//$( "#tour" ).popup( "open" );
	if (localStorage.getItem('name') === null) {
    
    	alert('Should show tour');
    	//$( "#tour" ).popup();
    	$( "#tour" ).popup( "open" );    	
    	
	} else {
		
		alert('Should show tips');
		
		//$.get( 'tips.csv', function( data ) {
    	//	var lines = data.split('\n');
  		//	$('#dtip').html( lines[(Math.random() * lines.length -2 | 0) + 1] );
  			$('#dtip').html( "Something" );
  			//$( "#tips" ).popup();
  			$( "#tips" ).popup( "open" );
		//}, "text");
		
		$('#profilename2').html('Hi ' + localStorage.getItem('name'));
	
	}
	
	setProfile();
	setupCalendar();
	
	$('#load_mood_chart').click( function() {
		//alert('loading chart');
		drawMoodChart();
	});
	
	$('#load_craving_chart').click( function() {
		//alert('loading craving chart');
		drawCravingChart();
	});
	
	$('#load_glucose_chart').click( function() {
		//alert('loading chart');
		drawGlucoseChart();
	});
	
	$('#load_bp_chart').click( function() {
		//alert('loading BP chart');
		drawBpChart();
	});
	
	
	//$( '#profile_height' ).change( function() {
	//	alert('value changing');
		//$('#profile_height_inches').html( cm2inches( $('this').val() ) );
	//});
	
	$( '#profile_height' ).slider({
    	create: function (event, ui) {
        	$(this).bind( 'change', function () {
        		//alert($( '#profile_height' ).val());
				$('#profile_height_inches').html( cm2inches( $( '#profile_height' ).val() ) );
        	});
    	}
	});
	
    
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
 		
 		
 		
		reading = { 'summary' : type + ':' + value + ' ' + units, 'begin' : new Date(y, m, d), 'end' : new Date(y, m, d), 'type' : type, 'value' : value };
		readingsArray.push(reading);
		reading = { 'summary' : type + ':' + value + ' ' + units, 'begin' : new Date(y, m - 1, d), 'end' : new Date(y, m - 1, d), 'type' : type, 'value' : value };
		readings.push(JSON.stringify(reading));
		
		
		//alert('Month is ' + m);
		
		$('#calendar').trigger('refresh');
		//readings.push(JSON.stringify(reading));
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
	
	$('#craving_type').change( function() {
		
		var values = $(this).val();
		var arrayLength = values.length;
		$('#craving_tip').html('');
		
		for (var i = 0; i < arrayLength; i++) {
			
			switch (values[i]) {
			    case 'Bready':
			        $('#craving_tip').append('<strong>Sugary:</strong> Insecurity, soothes dissatisfaction. <br><br>');
        		break;
			    case 'Chewy':
			        $('#craving_tip').append('<strong>Chewy:</strong> Relieves Tension stress, slowdown so you can unwind. <br><br>');
		        break;
			    case 'Creamy':
			        $('#craving_tip').append('<strong>Creamy:</strong> Helps satisfy need to be nurtured and to receive comfort. <br><br>');
		        break;
			    case 'Crunchy':
			        $('#craving_tip').append('<strong>Crunchy:</strong> Helps release anxiety pressure. <br><br>');
		        break;
			    case 'Salty':
			        $('#craving_tip').append('<strong>Salty:</strong> Redirects anger, frustration and violence. <br><br>');
		        break;
			    case 'Sugary':
			        $('#craving_tip').append('<strong>Sugary:</strong> Substitutes for missing Love, affection ability to give and receive love. <br><br>');
		        break;
			}
			
    		//alert(myStringArray[i]);
    		//Do something
		}	
		//var values = $(this).val().split(',');
		//alert('The first value in the array is ' + values[0]);
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
		    case "Anger":
        		icon = "img/emoticons/PNG/icontexto-emoticons-14-032x032.png";
        		//alert(icon);
        		break;
        	case "Anxiety":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Cramps/Pain":
        		icon = "img/emoticons/PNG/icontexto-emoticons-13-032x032.png";
        		//alert(icon);
        		break;
        	case "Cheerful":
        		icon = "img/emoticons/PNG/icontexto-emoticons-05-032x032.png";
        		//alert(icon);
        		break;
        	case "Depressed":
        		icon = "img/emoticons/PNG/icontexto-emoticons-13-032x032.png";
        		//alert(icon);
        		break;
        	case "Energetic":
        		icon = "img/emoticons/PNG/icontexto-emoticons-02-032x032.png";
        		//alert(icon);
        		break;
        	case "Food or Snack Craving":
        		icon = "img/emoticons/PNG/icontexto-emoticons-10-032x032.png";
        		//alert(icon);
        		break;
        	case "Forgetful":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Headache":
        		icon = "img/emoticons/PNG/icontexto-emoticons-11-032x032.png";
        		//alert(icon);
        		break;
        	case "Hopelessness":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Impatient":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Insecure":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Irritability":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Lonely":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Worried":
        		icon = "img/emoticons/PNG/icontexto-emoticons-10-032x032.png";
        		//alert(icon);
        		break;
        	case "Want to Sleep":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Mistrustful":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Talkative":
        		icon = "img/emoticons/PNG/icontexto-emoticons-06-032x032.png";
        		//alert(icon);
        		break;
        	case "Menstration":
        		icon = "img/emoticons/PNG/icontexto-emoticons-10-032x032.png";
        		//alert(icon);
        		break;
        	case "Back Pain":
        		icon = "img/emoticons/PNG/icontexto-emoticons-11-032x032.png";
        		//alert(icon);
        		break;
        	case "Swelling":
        		icon = "img/emoticons/PNG/icontexto-emoticons-11-032x032.png";
        		//alert(icon);
        		break;
        	case "Tenderness":
        		icon = "img/emoticons/PNG/icontexto-emoticons-11-032x032.png";
        		//alert(icon);
        		break;
        	case "Water Gain/Retention":
        		icon = "img/emoticons/PNG/icontexto-emoticons-11-032x032.png";
        		//alert(icon);
        		break;
        	case "Weight Gain":
        		icon = "img/emoticons/PNG/icontexto-emoticons-11-032x032.png";
        		//alert(icon);
        		break;
        	case "Lack Energy":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Moody":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Jealousy":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Tend to cry":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        	case "Stressed":
        		icon = "img/emoticons/PNG/icontexto-emoticons-12-032x032.png";
        		//alert(icon);
        		break;
        					
		}
		
		date = new Date();
		d = date.getDate();
		m = date.getMonth();
 		y = date.getFullYear();
 		
		reading = { 'summary' : mood + '<img src="' + icon + '" > :' + note, 'begin' : new Date(y, m, d), 'end': new Date(y, m, d), 'type' : 'journal', 'value' : mood };
		readingsArray.push(reading);
		reading = { 'summary' : mood + '<img src="' + icon + '" > :' + note, 'begin' : new Date(y, m -1, d), 'end': new Date(y, m - 1, d), 'type' : 'journal', 'value' : mood };
		readings.push(JSON.stringify(reading));
		
		
		//readingsArray.push(reading);
		$('#calendar').trigger('refresh');
		//readings.push(JSON.stringify(reading));
		localStorage.setItem('readings', JSON.stringify(readings));
		//localStorage.setItem("readings", JSON.stringify(readingsArray));
		
		$('.ui-li-static').each(function() {
			//alert('decoding html');
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
	
	$('#craving_save').click( function() {
		//var today = new Date();
		//alert(today.getUTCMonth());
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		var craving = $('#craving_type').val().toString();
		
		date = new Date();
		d = date.getDate();
		m = date.getMonth();
 		y = date.getFullYear();
 		
		reading = { 'summary' : craving, 'begin' : new Date(y, m, d), 'end': new Date(y, m, d), 'type' : 'craving' };
		readingsArray.push(reading);
		reading = { 'summary' : craving, 'begin' : new Date(y, m -1, d), 'end': new Date(y, m - 1, d), 'type' : 'craving' };
		readings.push(JSON.stringify(reading));
		
		
		//readingsArray.push(reading);
		$('#calendar').trigger('refresh');
		//readings.push(JSON.stringify(reading));
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
    
    //alert(JSON.stringify($.get('tips.csv')));
    
    
    
    
 
	
	

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
	//alert($('#profile_breakfast').val());
	localStorage.setItem("name", $('#profile_name').val());
	localStorage.setItem("age", $('#profile_age').val() + " years");
	localStorage.setItem("gender", $('#profile_gender').val());
	localStorage.setItem("breakfast", $('#profile_breakfast').val());
	localStorage.setItem("lunch", $('#profile_lunch').val());
	localStorage.setItem("dinner", $('#profile_dinner').val());
	localStorage.setItem("meetime", $('#profile_meetime').val());
	localStorage.setItem("meeactivity", $('#profile_meeactivity').val());
	//alert('User set MeeActivity to ' + $('#profile_meeactivity').val());
	calendar_events();
	
}

function setProfile() {

	//alert('Setting profile field');
	
	setProfilefield('name');
	setProfilefield('age');
	setProfilefield('gender');
	setProfilefield('breakfast');
	setProfilefield('lunch');
	setProfilefield('dinner');
	setProfilefield('meetime');
	setProfilefield('meeactivity');
	//alert(localStorage.getItem('meeactivity'));
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

	var theDate=new Date();

	if (Math.abs(theDate.getHours())==breakHour&&Math.abs(theDate.getMinutes())==breakMinute) {
		this.focus();
		clearInterval(breakInt);
		alert(breakMessage);
	}

	var breakInt=setInterval("breakTime()",58000);

}

function calendar_events() {
	
	alert('adding calendar events');
	create_breakfast();
	create_lunch();
	create_dinner();
	create_meetime();	
	
}

function create_lunch() {
  	
  var startDate = new Date();  
  startDate.setHours(parseInt($('#profile_lunch').val().substring(0, 2)));
  startDate.setMinutes(parseInt($('#profile_lunch').val().substring(3, 5)));
  
  
  var endDate = new Date;
  endDate.setHours(parseInt($('#profile_lunch').val().substring(0, 2)));
  endDate.setMinutes(parseInt($('#profile_lunch').val().substring(3, 5)) + 30);
  
  var afterDate = new Date();  
  afterDate.setHours(parseInt($('#profile_lunch').val().substring(0, 2)) + 2);
  afterDate.setMinutes(parseInt($('#profile_lunch').val().substring(3, 5)));
  
  
  
  var aftereDate = new Date;
  aftereDate.setHours(parseInt($('#profile_lunch').val().substring(0, 2)) + 2);
  aftereDate.setMinutes(parseInt($('#profile_lunch').val().substring(3, 5)) + 30);
  
  
  //alert(startDate.toString());
  //alert(endDate.toString());
  
  var title = "Lunch Time";
  var location = "Unknown";
  var notes = 'Please enter your craving';
  var success = function(message) { alert("Lunch events created"); };
  var error = function(message) { alert("Error: " + message); };
  

  var calOptions = window.plugins.calendar.getCalendarOptions();
  
  var deviceOSVersion = device.version;
  var deviceOS;
  
  if(deviceOS = 'Android') {
  	
  	 //alert('Device OS is Android');
  
  	 if( parseInt( deviceOSVersion, 10 ) >= 4 )
  	 {
    	if( parseFloat( deviceOSVersion.substring(2, 5) ) >= 2.4 ) {
    		
    		//alert('Automatically creating events');
    		calOptions.recurrence = "daily"; // supported are: daily, weekly, monthly, yearly
		    eventEnd = new Date();
		    eventEnd.setFullYear(eventEnd.getFullYear() + 1);
		    calOptions.recurrenceEndDate = eventEnd;
		    
		    if( parseFloat( deviceOSVersion.substring(2, 5) ) >= 3.2 ) {
		    	calOptions.url = "meetime://craving";	
		    }
		    
		    window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);

			if( parseFloat( deviceOSVersion.substring(2, 5) ) >= 3.2 ) {
		    	calOptions.url = "meetime://mood";	
		    }
		    		    
		    window.plugins.calendar.createEventWithOptions('After Lunch Mood',location,'Please enter your mood in MeeTime',afterDate,aftereDate,calOptions,success,error);
			

    	} else {
    		
    		//alert('Manually creating events');
    		   		
    		for (var i = 0; i < 5; i++) {
    			
    			startDate.setDate(startDate.getDate() + 1);
    			endDate.setDate(endDate.getDate() + 1);
    			afterDate.setDate(afterDate.getDate() + 1);
    			aftereDate.setDate(aftereDate.getDate() + 1);
    			
    			if (i < 4) {
    				success = function(message) { $('body').append(''); };
    				//alert('Iterator i is ' + parseInt(i));
    			} else {
    				success = function(message) { alert("Lunch events created"); };
    			}
    				
    			window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);
    			
    			success = function(message) { $('body').append(''); };
    			
    			window.plugins.calendar.createEventWithOptions('After Lunch Mood',location,'Please enter your mood in MeeTime',afterDate,aftereDate,calOptions,success,error);
			
			}
			
    	}
  	  }
  	  
   } else {
   	
   	  //alert('Automatically creating events');
      calOptions.recurrence = "daily"; // supported are: daily, weekly, monthly, yearly
	  eventEnd = new Date();
	  eventEnd.setFullYear(eventEnd.getFullYear() + 1);
	  calOptions.recurrenceEndDate = eventEnd;
	  calOptions.url = "meetime://craving";
	  window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);
	  calOptions.url = "meetime://mood";
	  window.plugins.calendar.createEventWithOptions('After Lunch Mood',location,'Please enter your mood in MeeTime',afterDate,aftereDate,calOptions,success,error);

   } 
  
}


function create_breakfast() {
  	
  var startDate = new Date();  
  startDate.setHours(parseInt($('#profile_breakfast').val().substring(0, 2)));
  startDate.setMinutes(parseInt($('#profile_breakfast').val().substring(3, 5)));
  
  
  var endDate = new Date;
  endDate.setHours(parseInt($('#profile_breakfast').val().substring(0, 2)));
  endDate.setMinutes(parseInt($('#profile_breakfast').val().substring(3, 5)) + 30);
  
  var afterDate = new Date();  
  afterDate.setHours(parseInt($('#profile_breakfast').val().substring(0, 2)) + 2);
  afterDate.setMinutes(parseInt($('#profile_breakfast').val().substring(3, 5)));
  
  
  var aftereDate = new Date;
  aftereDate.setHours(parseInt($('#profile_breakfast').val().substring(0, 2)) + 2);
  aftereDate.setMinutes(parseInt($('#profile_breakfast').val().substring(3, 5)) + 30);
  
  //alert(startDate.toString());
  //alert(endDate.toString());
  
  var title = "Breakfast Time";
  var location = "Unknown";
  var notes = 'What are your food cravings? Please enter in MeeTime';
  var success = function(message) { alert("Lunch events created"); };
  var error = function(message) { alert("Error: " + message); };
  

  var calOptions = window.plugins.calendar.getCalendarOptions();
  
  var deviceOSVersion = device.version;
  var deviceOS;
  
  if(deviceOS = 'Android') {
  	
  	 //alert('Device OS is Android');
  
  	 if( parseInt( deviceOSVersion, 10 ) >= 4 )
  	 {
    	if( parseFloat( deviceOSVersion.substring(2, 5) ) >= 2.4 ) {
    		
    		//alert('Automatically creating events');
    		calOptions.recurrence = "daily"; // supported are: daily, weekly, monthly, yearly
		    eventEnd = new Date();
		    eventEnd.setFullYear(eventEnd.getFullYear() + 1);
		    calOptions.recurrenceEndDate = eventEnd;
		    
		    if( parseFloat( deviceOSVersion.substring(2, 5) ) >= 3.2 ) {
		    	calOptions.url = "meetime://craving";	
		    }
		    
		    window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);

			if( parseFloat( deviceOSVersion.substring(2, 5) ) >= 3.2 ) {
		    	calOptions.url = "meetime://mood";	
		    }

			window.plugins.calendar.createEventWithOptions('After Breakfast Mood',location,'Please enter your mood in MeeTime',afterDate,aftereDate,calOptions,success,error);

    	} else {
    		
    		//alert('Manually creating events');
    		   		
    		for (var i = 0; i < 5; i++) {
    			
    			startDate.setDate(startDate.getDate() + 1);
    			endDate.setDate(endDate.getDate() + 1);
    			afterDate.setDate(afterDate.getDate() + 1);
    			aftereDate.setDate(aftereDate.getDate() + 1);
    			
    			if (i < 4) {
    				success = function(message) { $('body').append(''); };
    				//alert('Iterator i is ' + parseInt(i));
    			} else {
    				success = function(message) { alert("Breakfast events created"); };
    			}
    				
    			window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);
    			
    			success = function(message) { $('body').append(''); };
    			
    			window.plugins.calendar.createEventWithOptions('After Breakfast Mood',location,'Please enter your mood in MeeTime',afterDate,aftereDate,calOptions,success,error);
			
			}
			
    	}
  	  }
  	  
   } else {
   	
   	  //alert('Automatically creating events');
      calOptions.recurrence = "daily"; // supported are: daily, weekly, monthly, yearly
	  eventEnd = new Date();
	  eventEnd.setFullYear(eventEnd.getFullYear() + 1);
	  calOptions.recurrenceEndDate = eventEnd;
	  calOptions.url = "meetime://craving";
	  window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);
	  calOptions.url = "meetime://mood";
	  window.plugins.calendar.createEventWithOptions('After Breakfast Mood',location,'Please enter your mood in MeeTime',afterDate,aftereDate,calOptions,success,error);
   } 
  
}

function create_dinner() {
  	
  var startDate = new Date();  
  startDate.setHours(parseInt($('#profile_dinner').val().substring(0, 2)));
  startDate.setMinutes(parseInt($('#profile_dinner').val().substring(3, 5)));
  
  
  var endDate = new Date;
  endDate.setHours(parseInt($('#profile_dinner').val().substring(0, 2)));
  endDate.setMinutes(parseInt($('#profile_dinner').val().substring(3, 5)) + 30);
  
  var afterDate = new Date();  
  afterDate.setHours(parseInt($('#profile_dinner').val().substring(0, 2)) + 2);
  afterDate.setMinutes(parseInt($('#profile_dinner').val().substring(3, 5)));
  
  
  var aftereDate = new Date;
  aftereDate.setHours(parseInt($('#profile_dinner').val().substring(0, 2)) + 2);
  aftereDate.setMinutes(parseInt($('#profile_dinner').val().substring(3, 5)) + 30);
  
  //alert(startDate.toString());
  //alert(endDate.toString());
  
  var title = "Dinner Time";
  var location = "Unknown";
  var notes = 'Please enter your craving';
  var success = function(message) { alert("Lunch events created"); };
  var error = function(message) { alert("Error: " + message); };
  

  var calOptions = window.plugins.calendar.getCalendarOptions();
  
  var deviceOSVersion = device.version;
  var deviceOS;
  
  if(deviceOS = 'Android') {
  	
  	 //alert('Device OS is Android');
  
  	 if( parseInt( deviceOSVersion, 10 ) >= 4 )
  	 {
    	if( parseFloat( deviceOSVersion.substring(2, 5) ) >= 2.4 ) {
    		
    		//alert('Automatically creating events');
    		calOptions.recurrence = "daily"; // supported are: daily, weekly, monthly, yearly
		    eventEnd = new Date();
		    eventEnd.setFullYear(eventEnd.getFullYear() + 1);
		    calOptions.recurrenceEndDate = eventEnd;
		    
		    if( parseFloat( deviceOSVersion.substring(2, 5) ) >= 3.2 ) {
		    	calOptions.url = "meetime://craving";	
		    }
		    
		    window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);
		    
		    if( parseFloat( deviceOSVersion.substring(2, 5) ) >= 3.2 ) {
		    	calOptions.url = "meetime://mood";	
		    }
		    
		    window.plugins.calendar.createEventWithOptions('After Dinner Mood',location,'Please enter your mood in MeeTime',afterDate,aftereDate,calOptions,success,error);

    	} else {
    		
    		//alert('Manually creating events');
    		   		
    		for (var i = 0; i < 5; i++) {
    			
    			startDate.setDate(startDate.getDate() + 1);
    			endDate.setDate(endDate.getDate() + 1);
    			afterDate.setDate(afterDate.getDate() + 1);
    			aftereDate.setDate(aftereDate.getDate() + 1);
    			
    			if (i < 4) {
    				success = function(message) { $('body').append(''); };
    				//alert('Iterator i is ' + parseInt(i));
    			} else {
    				success = function(message) { alert("Dinner events created"); };
    			}
    				
    			window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);
    			
    			success = function(message) { $('body').append(''); };
    			
    			window.plugins.calendar.createEventWithOptions('After Dinner Mood',location,'Please enter your mood in MeeTime',afterDate,aftereDate,calOptions,success,error);
			}
			
    	}
  	  }
  	  
   } else {
   	
   	  //alert('Automatically creating events');
      calOptions.recurrence = "daily"; // supported are: daily, weekly, monthly, yearly
	  eventEnd = new Date();
	  eventEnd.setFullYear(eventEnd.getFullYear() + 1);
	  calOptions.recurrenceEndDate = eventEnd;
	  calOptions.url = "meetime://craving";
	  window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);
	  calOptions.url = "meetime://mood";
	  window.plugins.calendar.createEventWithOptions('After Dinner Mood',location,'Please enter your mood in MeeTime',afterDate,aftereDate,calOptions,success,error);
   } 
  
}

function create_meetime() {
  	
  var startDate = new Date();  
  startDate.setHours(parseInt($('#profile_meetime').val().substring(0, 2)));
  startDate.setMinutes(parseInt($('#profile_meetime').val().substring(3, 5)));
  
  
  var endDate = new Date;
  endDate.setHours(parseInt($('#profile_meetime').val().substring(0, 2)));
  endDate.setMinutes(parseInt($('#profile_meetime').val().substring(3, 5)) + 30);
  
  
  //alert(startDate.toString());
  //alert(endDate.toString());
  
  var title = "MeeTime: " + $('#profile_meeactivity').val();
  var location = "Unknown";
  var notes = 'Time for MeeTime ';
  var success = function(message) { alert("MeeTime events created"); };
  var error = function(message) { alert("Error: " + message); };
  

  var calOptions = window.plugins.calendar.getCalendarOptions();
  
  var deviceOSVersion = device.version;
  var deviceOS;
  
  if(deviceOS = 'Android') {
  	
  	 //alert('Device OS is Android');
  
  	 if( parseInt( deviceOSVersion, 10 ) >= 4 )
  	 {
    	if( parseFloat( deviceOSVersion.substring(2, 5) ) >= 2.4 ) {
    		
    		//alert('Automatically creating events');
    		calOptions.recurrence = "daily"; // supported are: daily, weekly, monthly, yearly
		    eventEnd = new Date();
		    eventEnd.setFullYear(eventEnd.getFullYear() + 1);
		    calOptions.recurrenceEndDate = eventEnd;
		    
		    if( parseFloat( deviceOSVersion.substring(2, 5) ) >= 3.2 ) {
		    	calOptions.url = "meetime://meeactivity";	
		    }
		    
		    window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);

    	} else {
    		
    		//alert('Manually creating events');
    		   		
    		for (var i = 0; i < 5; i++) {
    			
    			startDate.setDate(startDate.getDate() + 1);
    			endDate.setDate(endDate.getDate() + 1);
    			
    			if (i < 4) {
    				success = function(message) { $('body').append(''); };
    				//alert('Iterator i is ' + parseInt(i));
    			} else {
    				success = function(message) { alert("Dinner events created"); };
    			}
    				
    			window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);
			}
			
    	}
  	  }
  	  
   } else {
   	
   	  //alert('Automatically creating events');
      calOptions.recurrence = "daily"; // supported are: daily, weekly, monthly, yearly
	  eventEnd = new Date();
	  eventEnd.setFullYear(eventEnd.getFullYear() + 1);
	  calOptions.recurrenceEndDate = eventEnd;
	  calOptions.url = "meetime://craving";
	  window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);

   }
   
   alert('MeeTime events created'); 
  
}

	
