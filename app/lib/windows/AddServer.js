/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = AvailableServers.js
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
var w = 0;
var h = 0;
if (pWidth < pHeight) {
	w = pWidth;
	h = pHeight;
} else {
	h = pWidth;
	w = pHeight;
};

Ti.Gesture.addEventListener('orientationchange', function(e) {
	// Rimisaurazione dello schermo
	pWidth = Ti.Platform.displayCaps.platformWidth;
	pHeight = Ti.Platform.displayCaps.platformHeight;
	if (pWidth < pHeight) {
		w = pWidth;
		h = pHeight;
	} else {
		h = pWidth;
		w = pHeight;
	};
});

var data = [];
//empty data array

var tblServer = Titanium.UI.createTableView({
	//height : pHeight - 20,
	//height : 'auto',
	width : pWidth - 20,
	height : 272,
	top : 120,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,
	moving : true, // solo per iPhone
	moveable : true	// solo per iPhone
});
win.add(tblServer);

//create a table row - SERVICE
var row = Titanium.UI.createTableViewRow({
	width : tblServer.width,
	height : 90,
	hasChild : false,
	className : 'server-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'SERVICE',
	text : L('AddServer_row1_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : win.service,
	font : {
		fontSize : 22,
		fontWeight : 'normal'
	},
	//color : '#2f4f4f',
	color : '#fff',
	left : 10,
	top : 35,
	height : 55,
	width : row.width
});
row.add(titleRow);
row.add(descriptionRow);
/*
var optService = {
cancel : 1,
options : ['WCS', 'WMS'],
selectedIndex : 0,
destructive : 0,
title : 'Scegli il tipo di server'
};
row.addEventListener('click', function(e) {
if (win.service === '') {
var dialog = Ti.UI.createOptionDialog(optService);
dialog.addEventListener('click', function(e) {
if (e.index ==0) {
des
Ti.API.info('AddServer.js - e.index =  ' + e.index + ' (WCS)');
} else{
Ti.API.info('AddServer.js - e.index =  ' + e.index + ' (WMS)');
};
});
dialog.show();
};
});
*/

//add the table row to our data[] object
data.push(row);

//create a table row - NAME
var row = Titanium.UI.createTableViewRow({
	width : tblServer.width,
	height : 90,
	hasChild : false,
	className : 'server-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'NAME',
	text : L('AddServer_row2_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : win.name,
	font : {
		fontSize : 22,
		fontWeight : 'normal'
	},
	//color : '#2f4f4f',
	color : '#fff',
	left : 10,
	top : 35,
	height : 55,
	width : row.width
});
row.add(titleRow);
row.add(descriptionRow);

//add the table row to our data[] object
data.push(row);

//create a table row - URL
var row = Titanium.UI.createTableViewRow({
	width : tblServer.width,
	height : 90,
	hasChild : false,
	className : 'server-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'URL',
	text : L('AddServer_row3_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : win.urlServer,
	font : {
		fontSize : 22,
		fontWeight : 'normal'
	},
	//color : '#2f4f4f',
	color : '#fff',
	left : 10,
	top : 35,
	height : 55,
	width : row.width
});
row.add(titleRow);
row.add(descriptionRow);

//add the table row to our data[] object
data.push(row);

//finally, set the data property of the tableView to our data[] object
tblServer.data = data;

//create a button to save a server to the addedServers array
//
var btnAddServer = Titanium.UI.createButton({
	//title : 'Confirm',
	title : L('AddServer_button_title'),
	font : {
		fontSize : 18,
		fontFamily : 'Helvetica Neue',
		fontWeight : 'bold'
	},
	top : 10,
	right : 10,
	//width : 190,
	//height : 88,
	width : Math.round(w / 4),
	height : Math.round(h / 12),
	backgroundImage : '/images/button.png'
});

//create event listener
btnAddServer.addEventListener('click', function(e) {
	//btnAddServer.backgroundImage = '/images/btnSettings_focused.png';
	//Verify if new server exists into addedServers
	var addedServers = [];
	if (Ti.App.Properties.hasProperty('addedServers')) {
		addedServers = Ti.App.Properties.getList('addedServers');
	};
	//Ti.API.info("AddServer - Verifica esistenza - addedServers.length: " + addedServers.length);
	var existServer = false;
	for (var i = 0; i < addedServers.length; i++) {
		Ti.API.info('AddServer.js - addedServers[' + i + '].url: ' + addedServers[i].url);
		if (addedServers[i].url == win.urlServer) {
			existServer = true;
		};
	};
	//If new server doesn't exist then we add it, otherwise nothing to do
	if (existServer == true) {
		var dialog = Ti.UI.createAlertDialog({
			//message : 'New ' + win.service + ' server added',
			message : String.format(L('AddServer_existServer_message'), win.urlServer),
			ok : 'OK',
			//title : 'Server added'
			title : L('AddServer_existServer_title')
		}).show();
	} else {
		// Send request to server and save response to xml text

		//declare the http client object to retrieve Capabilities XML
		var xhr = Titanium.Network.createHTTPClient();

		//this method will process the remote data
		xhr.onload = function() {
			var xmlText = this.responseText;
			//var xml = Ti.xml;
			//xml = this.responseXML;
			/*
			// Create and write xml to temp file
			var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, '001.tmp');
			//write file
			f.write(xmlText);
			Ti.API.info('AddServer.js - file "' + f.name + '": ' + f.read().text);
			f = null;
			*/
			var covArray = [];
			var newServer = {
				name : tblServer.data[0].rows[1].children[1].text,
				type : tblServer.data[0].rows[0].children[1].text,
				url : tblServer.data[0].rows[2].children[1].text,
				getCapabilities : xmlText,
				describeCoverageArray : covArray //resolve iOS problem
				//describeCoverageArray : null
			};

			/*
			Ti.API.info('AddServer.js - newServer.name: ' + newServer.name);
			Ti.API.info('AddServer.js - newServer.type: ' + newServer.type);
			Ti.API.info('AddServer.js - newServer.url: ' + newServer.url);
			Ti.API.info('AddServer.js - newServer.getCoverage: ' + newServer.getCapabilities);
			Ti.API.info('AddServer.js - newServer.getCoverage.lenght: ' + newServer.getCapabilities.lenght);
			*/
			//newServer.getCoverage = xmlText;
			addedServers.push(newServer);
			Ti.App.Properties.setList('addedServers', addedServers);
			/*
			 Ti.API.info('AddServer.js - newServer.getCoverage: ' + newServer.getCapabilities);
			 Ti.API.info("AddServer - addedServers: " + addedServers);
			 Ti.API.info("AddServer - addedServers.length: " + addedServers.length);
			 Ti.API.info("AddServer - hasProperty('addedServers'): " + Ti.App.Properties.hasProperty('addedServers'));
			 */

			var dialog = Ti.UI.createAlertDialog({
				//message : 'New ' + win.service + ' server added',
				message : String.format(L('AddServer_OkDialog_message'), win.service),
				ok : 'OK',
				//title : 'Server added'
				title : L('AddServer_OkDialog_title')
			});
			dialog.addEventListener('click', function(e) {
				Ti.API.info('The cancel button was clicked');
				win.close();
			});
			dialog.show(); 
		};

		//this method will fire if there's an error in accessing the remote data
		xhr.onerror = function(e) {
			/*
			var dialog = Ti.UI.createAlertDialog({
			//message : 'Error',
			message : L('AddServer_ErrorDialog_title'),
			ok : 'OK',
			//title : 'Error'
			title : L('AddServer_ErrorDialog_message')
			}).show();
			*/
			//Ti.API.info("STATUS: " + this.status);
			//Ti.API.info("TEXT:   " + this.responseText);
			//Ti.API.info("ERROR:  " + e.error);
			alert(L('AddServer_ErrorDialog_message'));
		};

		//Create the Request string for Capabilities
		var strRequest = win.urlServer + '?Service=' + win.service + '&Request=GetCapabilities';
		Ti.API.info('AddServer.js - strRequest: ' + strRequest);

		xhr.open('GET', strRequest);

		//finally, execute the call to the remote feed
		xhr.send();

	}

});
win.add(btnAddServer);

//Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
win.addEventListener('blur', removeTable);
function removeTable(e) {
	win.remove(tblServer);
}

btnAddServer.addEventListener('touchstart', function(e) {
	btnAddServer.backgroundImage = '/images/button_focused.png';
});

btnAddServer.addEventListener('touchend', function(e) {
	btnAddServer.backgroundImage = '/images/button.png';
});
