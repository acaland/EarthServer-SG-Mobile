/**
 * @author Francesco
 */
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = WcsCoverageList.js
//reference the current window
var win = Titanium.UI.currentWindow;

var btnBack = Ti.UI.createButton({
	//title: 'back'
	title: L('NavButton_back')
});
win.leftNavButton = btnBack; 
btnBack.addEventListener('click', function() {
	win.close();
});

//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.createWindow({
	url : '/windows/CoverageInfo.js',
	//title : 'Coverage metadata',
	title : L('WcsCoverageMetadata_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win1.xml = win.xml;
win1.rowID = win.rowID;

var win2 = Titanium.UI.createWindow({
	url : '/windows/WcsDescribeCoverage.js',
	//title : 'Describe Coverage',
	title : L('WcsDescribeCoverage_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});

//Create a choice table
var tblChoice = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : 182,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2
});

//Empty data array
var data = [];

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : tblChoice.width,
	height : 90,
	hasChild : false,
	className : 'CoverageInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'From getCapabilities'
	text : L('WcsCoverageMetadata_row1_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	width : row.width - 70,
	height : 30
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : 'Show coverage metadata included in getCapabilities contents section',
	text : L('WcsCoverageMetadata_row1_description'),
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 70,
	height : 'auto'
});
//add our little icon to the right of the row
var iconImage = Titanium.UI.createImageView({
	image : '/images/next.png',
	width : 48,
	height : 48,
	right : 10,
	top : 20
});
row.add(titleRow);
row.add(descriptionRow);
row.add(iconImage);
data.push(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : tblChoice.width,
	height : 90,
	hasChild : false,
	className : 'CoverageInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'From describeCoverage'
	text : L('WcsCoverageMetadata_row2_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	width : row.width - 70,
	height : 30
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : 'Show coverage metadata returned by describeCoverage operation',
	text : L('WcsCoverageMetadata_row2_description'),
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 70,
	height : 'auto'
});
//add our little icon to the right of the row
var iconImage = Titanium.UI.createImageView({
	image : '/images/next.png',
	width : 48,
	height : 48,
	right : 10,
	top : 20
});
row.add(titleRow);
row.add(descriptionRow);
row.add(iconImage);
data.push(row);

tblChoice.data = data;
win.add(tblChoice);

tblChoice.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.

	Ti.API.info('WcsCoverageMetadata.js - win.serverIndex: ' + win.serverIndex);

	if (e.index == 0) {
		win1.open();
	} else {
		retrieveDescribeCoverage(win.serverIndex, win.rowID)
		//Ti.API.info('WcsCoverageMetadata.js - describeCoverageError: ' + describeCoverageError);
	};
});

//Creare una funzione che controlli se esiste già la risposta alla describeCoverage,
//altrimenti invia la richiesta describeCoverage,
//assegna la risposta all'oggetto server a cui si riferisce,
//aggiorna la lista degli addedServer

/**
 * Retrieve the describeCoverage response from remote or local server
 */
function retrieveDescribeCoverage(serverIndex, coverageIndex) {
	Ti.API.info('WcsCoverageMetadata.js - serverIndex: ' + serverIndex);
	Ti.API.info('WcsCoverageMetadata.js - coverageIndex: ' + coverageIndex);

	//Verify if describeCoverage response is null for the server with index choosen
	var addedServers = [];
	if (Ti.App.Properties.hasProperty('addedServers')) {
		addedServers = Ti.App.Properties.getList('addedServers');
	};
	
	for (var i = 0; i < addedServers.length; i++) {
		//Ti.API.info("WcsCoverageMetadata.js - addedServers[0].describeCoverage: " + addedServers[i].describeCoverageArray[coverageIndex]);
	};
	Ti.API.info("WcsCoverageMetadata.js - addedServers[serverIndex].describeCoverageArray[coverageIndex]: " + addedServers[serverIndex].describeCoverageArray[coverageIndex]);

	if (addedServers[serverIndex].describeCoverageArray[coverageIndex] == null) {
		//Inoltriamo la richiesta
		getDescribeCoverage(addedServers, serverIndex, function(xmlText) {
			//var xmlText = returnedData;
			//now we have to use the variable `returnedData` any any other normal returned variable
			Ti.API.info("WcsCoverageMetadata.js - xmlText: " + xmlText);

			if (xmlText == null) {
				alert("error");
			} else {
				//Update the addedArray and then the property
				addedServers[serverIndex].describeCoverageArray[coverageIndex] = xmlText;
				Ti.App.Properties.setList('addedServers', addedServers);

				//Ti.API.info("WcsCoverageMetadata.js - addedServers.length: " + addedServers.length);			
				//Ti.API.info("WcsCoverageMetadata.js - addedServers[serverIndex].describeCoverageArray[coverageIndex]: " + addedServers[serverIndex].describeCoverageArray[coverageIndex]);
				win2.xmlText = addedServers[serverIndex].describeCoverageArray[coverageIndex];
				//return true;
				win2.open();
			};

		});
	} else {
		Ti.API.info("WcsCoverageMetadata.js - Xml già presente");
		//alert("Xml già presente");
		//Set the xmlText win2 property
		win2.xmlText = addedServers[serverIndex].describeCoverageArray[coverageIndex];
		win2.open();
	};
};

/**
 * Get describeCoverage response
 */
function getDescribeCoverage(addedServers, serverIndex, callback) {
	//Output data
	var xmlText = null;


	try {
		//declare the http client object
		var xhr = Titanium.Network.createHTTPClient();
		//this method will process the remote data
		xhr.onload = function() {
			var xmlText = this.responseText;
			//var xmlData = Ti.xml;
			//xmlData = this.responseXML;

			/*
			var dialog = Ti.UI.createAlertDialog({
			//message : 'New ' + win.service + ' server added',
			message : L('WcsCoverageMetadata_OkDialog_message'),
			ok : 'OK',
			//title : 'DescribeCoverage response'
			title : L('WcsCoverageMetadata_OkDialog_title')
			});
			dialog.addEventListener('click', function(e) {
			Ti.API.info('The cancel button was clicked');
			//win.close();
			});

			dialog.show();
			*/

			//Return xmlText
			//No need to return. This will work and sends your data to your calling function
			callback(xmlText);
		};

		//this method will fire if there's an error in accessing the remote data
		xhr.onerror = function() {
			//log the error to our titanium developer console
			Ti.API.error(this.status + ' - ' + this.statusText);
			callback(null);
		};

		//Set timeout in milliseconds
		xhr.timeout = 10000;

		var coverageIdArray = win.coverageIdArray;
		//Create the request string for describeCoverage
		var strRequest = addedServers[serverIndex].url;
		strRequest += '?service=' + addedServers[serverIndex].type;
		strRequest += '&version=' + win.ServiceTypeVersion;
		strRequest += '&request=DescribeCoverage';
		strRequest += '&coverageId=' + win.coverageId;
		
		Ti.API.info("WcsCoverageMetadata.js - HTTP Request: " + strRequest);
		//alert(strRequest);

		xhr.open('GET', strRequest);
		//Send request
		xhr.send();
	} catch(e) {
		//alert(e);
		callback(null);
	}
};
