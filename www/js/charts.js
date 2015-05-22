      // Load the Visualization API and the piechart package.
      google.load('visualization', '1', {packages: ['corechart', 'bar']});
      google.load('visualization', '1', {packages: ['corechart', 'line']});

      
function drawMoodChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Mood');
        data.addColumn('number', 'Readings');
        
        if (localStorage.getItem("readings") == null) {
        	
        	data.addRows([
          		['Happy', 10],
          		['Sad', 3],
          		['Sick', 4]
        	]);
        		
        } else {
        	
        	readings = JSON.parse(localStorage.getItem("readings"));
        	
        	var happy = 0;
        	var sad = 0;
        	var sick = 0;
        	
        	for (i = 0; i < readings.length; i++) {
        		
        		reading = JSON.parse(readings[i]);
        		
        		if (reading.type == 'journal') {
        			//alert(reading.value);
        			switch (reading.value) {
			    		case 'Happy':
			        		happy++;
        					break;
			    		case 'Sad':
			    			sad++;
			        		break;
			    		case 'Sick':
			        		sick++;
		        			break;
					}
        		} 
       
        	}
        	
        	data.addRows([
          		['Happy', happy],
          		['Sad', sad],
          		['Sick', sick]
        	]);
        	
        	
        }

        // Set chart options
        var options = {'title':'My mood for the last 30 days',
                       'width':700,
                       'height':350};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('moodchart_div'));
        chart.draw(data, options);
        
}
      
      
      
function drawCravingChart() {
      	
      	//alert('Reaching Function');
      	//google.load('visualization', '1', {packages: ['corechart', 'bar']});

        // Create the data table.
        var data2 = new google.visualization.DataTable();
        data2.addColumn('string', 'Craving');
        data2.addColumn('number', 'Readings');
        

        
        if (localStorage.getItem("readings") == null) {
        	
        	//alert('No Readings');
        	
        	data2.addRows([
          		['Bready', 0],
          		['Chewy', 0],
          		['Creamy', 0],
          		['Crunchy', 0],
          		['Salty', 0],
          		['Sugary', 0]
        	]);
        		
        } else {
        	
        	readings = JSON.parse(localStorage.getItem("readings"));
        	
        	var bready = 0;
        	var chewy = 0;
        	var creamy = 0;
        	var crunchy = 0;
        	var salty = 0;
        	var sugary = 0;
        	
        	for (i = 0; i < readings.length; i++) {
        		
        		reading = JSON.parse(readings[i]);
        		
   		
        		if (reading.type == 'craving') {
        			
        			//alert('Reading value is ' + reading.value);
        			
        			//alert(reading.value);
        			switch (reading.value) {
			    		case 'Bready':
			        		bready++;
        					break;
			    		case 'Chewy':
			    			chewy++;
			        		break;
			    		case 'Creamy':
			        		creamy++;
		        			break;
		        		case 'Crunchy':
			        		crunchy++;
		        			break;
		        		case 'Salty':
			        		salty++;
		        			break;
		        		case 'Sugary':
			        		sugary++;
		        			break;
		        		
					}
					

					
        		} 
       
        	}
        	
        	data2.addRows([
          		['Bready', bready],
          		['Chewy', chewy],
          		['Creamy', creamy],
          		['Crunchy', crunchy],
          		['Salty', salty],
          		['Sugary', sugary]
        	]);
        	
        	
        }

        // Set chart options
        var options2 = {'title':'My cravings for the last 30 days',
                       'width':700,
                       'height':350};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('cravingchart_div'));
        chart.draw(data2, options2);
        
        
}
      
      
      
function drawGlucoseChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Sugar');
            
      
      if (localStorage.getItem("readings") == null) {

      	data.addRows([
        	[0, 0]
        ]);
        
      } else {
      	
      	readings = JSON.parse(localStorage.getItem("readings"));
        	
        var by = new Date();
        var bm = new Date();
        var bd = new Date();        
        var rows = [];
        
        
                	
        for (i = 0; i < readings.length; i++) {
        	
        		reading = JSON.parse(readings[i]);
        		 
        		if(reading.type == 'Blood Sugar') {       	
        			by = parseInt(reading.begin.substring(0, 4));
	   				bm = parseInt(reading.begin.substring(5, 7));
	   				bd = parseInt(reading.begin.substring(8, 10));
	   			
	   				//alert(reading.value);
	  			
	  				//alert(Date.daysBetween(new Date(by, bm, bd), new Date()));
	  			
	  				rows.push([30 - Date.daysBetween(new Date(by, bm, bd), new Date()), reading.value]);
	  				//rows.push([12, 80]);
	  				//rows.push([28, 100]);
	  			}
	  				  			
        }
        
        data.addRows(rows);
      	
      };

      var options = {
      	'title':'My Glucose for the last 30 days',
      	'width':700,
        'height':350,
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Value'
        },
        backgroundColor: '#f1f8e9'
      };

      var chart = new google.visualization.LineChart(document.getElementById('glucosechart_div'));
      chart.draw(data, options);
        
}
      

function drawBpChart() {
	
	  

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'BP Value');
      
      //alert('Reaching Function');
      
      if (localStorage.getItem("readings") == null) {

      	data.addRows([
        	[0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        	[6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        	[12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        	[18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        	[24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        	[30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        	[36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        	[42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        	[48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        	[54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        	[60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        	[66, 70], [67, 72], [68, 75], [69, 80]
        ]);
        
      } else {
      	
      	readings = JSON.parse(localStorage.getItem("readings"));
        	
        var by = new Date();
        var bm = new Date();
        var bd = new Date();        
        var rows = [];
        
        
                	
        for (i = 0; i < readings.length; i++) {
        	
        		reading = JSON.parse(readings[i]);
        		
        		 
        		if(reading.type == 'Blood Pressure') {       	
        			by = parseInt(reading.begin.substring(0, 4));
	   				bm = parseInt(reading.begin.substring(5, 7));
	   				bd = parseInt(reading.begin.substring(8, 10));
	   			
	  				rows.push([Date.daysBetween(new Date(by, bm, bd), new Date()), parseInt(reading.value)]);
	  				
	  				
	  			}
	  				  			
        }
        
        data.addRows(rows);
      	
      };

      var options = {
      	'title':'My blood pressure for the last 30 days',
      	'width':750,
        'height':350,
        hAxis: {
          title: 'Days'
        },
        vAxis: {
          title: 'Value'
        },
        backgroundColor: '#f1f8e9'
      };

      var chart = new google.visualization.LineChart(document.getElementById('bpchart_div'));
      chart.draw(data, options);
        
}


      

Date.daysBetween = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
};