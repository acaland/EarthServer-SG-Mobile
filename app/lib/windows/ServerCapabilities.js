/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = Settings.js
//reference the current window
var win = Titanium.UI.currentWindow;
win.title = L('ServerCapabilities_win_title');

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
	url : '/windows/WcsServer.js',
	//title : e.row.children[0].text,
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});

var win2 = Titanium.UI.createWindow({
	url : '/windows/WmsServer.js',
	//title : e.row.children[0].text,
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});

var tblCapabilities = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2
	//data : [sectionWCS, sectionWMS]
});

tblCapabilities.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.

	Ti.API.info("ServerCapabilities - e.index: " + e.index);

	if (addedServers[e.row.children[2].text].type === 'WCS') {
		win1.title = e.row.children[0].text;
		//win1.xmlText = addedServers[e.index].getCapabilities
		win1.xmlText = addedServers[e.row.children[2].text].getCapabilities

		Ti.API.info("ServerCapabilities - win1.xmlText: " + win1.xmlText);
		//activityIndicator.show();

		//alert('Number row: ' + e.index + '\nServer: ' + addedServers[e.row.children[2].text].name);
		win1.open();
	} else {
		win2.title = e.row.children[0].text;
		//win1.xmlText = addedServers[e.index].getCapabilities
		win2.xmlText = addedServers[e.row.children[2].text].getCapabilities

		Ti.API.info("ServerCapabilities - win2.xmlText: " + win2.xmlText);
		//activityIndicator.show();

		//alert('Number row: ' + e.index + '\nServer: ' + addedServers[e.row.children[2].text].name);
		win2.open();

	};

});

win.add(tblCapabilities);

//Create table sections
var sectionWCS = Ti.UI.createTableViewSection({
	//headerTitle : 'WCS Servers'
	headerTitle : L('ServerCapabilities_section1_title')
});
var sectionWMS = Ti.UI.createTableViewSection({
	//headerTitle : 'WMS Servers'
	headerTitle : L('ServerCapabilities_section2_title')
});

//Read added servers from Properties
 Ti.API.info("ServerCapabilities - hasProperty('addedServers'): " + Ti.App.Properties.hasProperty('addedServers'));
/*
 Ti.API.info("ServerCapabilities - hasProperty('prova'): " + Ti.App.Properties.hasProperty('prova'));
 Ti.API.info("AddNewServer - hasProperty('oggettoServer'): " + Ti.App.Properties.hasProperty('oggettoServer'));
 */
var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
	Ti.API.info("ServerCapabilities - addedServers: " + addedServers);
	Ti.API.info("ServerCapabilities - addedServers.lenght: " + addedServers.length);
};

//Put data from array to table
for (var i = 0; i < addedServers.length; i++) {
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		width : tblCapabilities.width,
		height : 90,
		//hasChild : true,
		className : addedServers[i].type + '-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		text : addedServers[i].name,
		font : {
			fontSize : 24,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 10,
		height : 40,
		width : row.width - 70
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : addedServers[i].url,
		font : {
			fontSize : 20,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 50,
		width : row.width,
		height : 30
	});

	//server number
	var serverNumber = Titanium.UI.createLabel({
		text : i,
		font : {
			fontSize : 12,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : '#fff',
		left : 10,
		top : 50,
		width : 20,
		height : 20,
		visible : false
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
	row.add(serverNumber);
	row.add(iconImage);

	//L'operatore === compara sia il tipo che il valore, == compara solo il valore
	if (addedServers[i].type === 'WCS') {
		sectionWCS.add(row);
	} else {
		sectionWMS.add(row);
	};
}

tblCapabilities.data = [sectionWCS, sectionWMS];

