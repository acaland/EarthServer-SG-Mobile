/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');


//Remove addedServers array as global variable (le Properties rimangono in memoria anche ad app chiusa)
//Ti.App.addedServers = [];
/*if (Ti.App.Properties.hasProperty('addedServers')) {
	Ti.App.Properties.removeProperty('addedServers');
}; */

/*
//Remove avalaibleServers array as global variable
if (Ti.App.Properties.hasProperty('avalaibleServers')) {
Ti.App.Properties.removeProperty('avalaibleServers');
};
 */



//Insert two servers into avalaible servers list
var avalaibleServers = [];
if (Ti.App.Properties.hasProperty('avalaibleServers')) {
	avalaibleServers = Ti.App.Properties.getList('avalaibleServers');
	} else {
	//Create an avalaibleServers array
	var availableServer1 = {
		name : 'EOxServer (OFC)',
		type : 'WMS',
		url : 'http://ows.eox.at/ofc/ows'
	};
	avalaibleServers.push(availableServer1);
	var availableServer2 = {
		name : 'EOxServer (CCI)',
		type : 'WCS',
		url : 'http://ows.eox.at/cci/ows'
	};
	avalaibleServers.push(availableServer2);
	Ti.App.Properties.setList('avalaibleServers', avalaibleServers);
};
/*
//Create an avalaibleServers array
var availableServer1 = {
	name : 'EOxServer (OFC)',
	type : 'WMS',
	url : 'http://ows.eox.at/ofc/ows'
};
avalaibleServers.push(availableServer1);
var availableServer2 = {
	name : 'EOxServer (CCI)',
	type : 'WCS',
	url : 'http://ows.eox.at/cci/ows'
};
avalaibleServers.push(availableServer2);
Ti.App.Properties.setList('avalaibleServers', avalaibleServers);
*/


/*
//Delete the ServerList.txt file
var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'servers');
if (! dir.exists()) {
dir.createDirectory();
}
var f = Ti.Filesystem.getFile(dir.resolve(), 'ServerList.txt');
if (f.exists()) {
f.deleteFile();
}
*/






//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

//Parent window = app.js
//reference the current window
var win = Titanium.UI.currentWindow;


var closeBtn = Ti.UI.createButton({
	//title: 'close'
	title: L('NavButton_close')
});

win.leftNavButton = closeBtn; 

closeBtn.addEventListener('click', function() {
	win.close();
});
//win.title= L('settings_win_title');
//Ti.API.info("settings.js - settings_win_title: " + L('settings_win_title'));

var win12 = Titanium.UI.createWindow({
	url : '/windows/WcsCoverageList2.js',
	//title : 'Coverages list',
	title : L('WcsCoverageList2_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});

var win21 = Titanium.UI.createWindow({
	url : '/windows/ServerCapabilities.js',
	//title: 'Capabilities',
	//title: L('ServerCapabilities_win_title'),
	modal : true,
	//backgroundColor: '#fff'
	backgroundImage : '/images/bgImage.png'
});

var win22 = Titanium.UI.createWindow({
	url : '/windows/AvailableServers.js',
	//title: 'All of servers',
	//title: L('AllServers_win_title'),
	modal : true,
	//backgroundColor: '#fff'
	backgroundImage : '/images/bgImage.png'
});

var win31 = Titanium.UI.createWindow({
	url : '/windows/WcsServerList.js',
	//title: 'WCS Servers',
	//title: L('WmsServerList_win_title'),
	modal : true,
	//backgroundColor: '#fff'
	backgroundImage : '/images/bgImage.png'
});

var win32 = Titanium.UI.createWindow({
	url : '/windows/WmsServerList.js',
	//title: 'WCS Servers',
	//title: L('WmsServerList_win_title'),
	modal : true,
	//backgroundColor: '#fff'
	backgroundImage : '/images/bgImage.png'
});

var table1 = Ti.UI.createTableView({
	top : 20,
	left : 10,
	width : pWidth - 20,
	height : pHeight - 110,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2
});

var sectionOverlays = Ti.UI.createTableViewSection({
	//headerTitle : 'Overlays'
	headerTitle : L('settings_section1_title')
});
//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : 90,
	hasChild : false,
	className : 'table-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Overlays settings',
	text : L('settings_row1_title'),
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
	//text : 'Set overlays order and opacity',
	text : L('settings_row1_description'),
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
row.add(titleRow);
row.add(descriptionRow);
sectionOverlays.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : 90,
	hasChild : false,
	className : 'table-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Add coverage',
	text : L('settings_row2_title'),
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
	//text : 'Add a WCS coverage to the overlays',
	text : L('settings_row2_description'),
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
row.add(titleRow);
row.add(descriptionRow);
/*
//add our little icon to the right of the row
var iconImage = Titanium.UI.createImageView({
	image : '/images/next.png',
	width : 48,
	height : 48,
	right : 10,
	top : 20
});
row.add(iconImage);
*/
row.addEventListener('click', function(e) {
	//alert("Hai cliccato!");
	//win12.open();
});
sectionOverlays.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : 90,
	hasChild : false,
	className : 'table-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Add layer',
	text : L('settings_row3_title'),
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
	//text : 'Add a WMS layer to the overlays',
	text : L('settings_row3_description'),
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
row.add(titleRow);
row.add(descriptionRow);
sectionOverlays.add(row);

var sectionServers = Ti.UI.createTableViewSection({
	//headerTitle : 'Servers'
	headerTitle : L('settings_section2_title')
});

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : 90,
	//hasChild : true,
	className : 'table-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Server capabilities',
	text : L('settings_row4_title'),
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
	//text : 'Show server capabilities',
	text : L('settings_row4_description'),
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

row.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.

	//alert("Hai cliccato \"Add server\"");
	//alert("e.row.children[1].text:\n" + e.row.children[1].text);
	//alert("e.row.children[2]:\n" + e.row.children[2].image);

	//win1.mioParametro = e.row.children[0].text
	//win1.mioOggetto = e.row.children

	win21.open();
});
sectionServers.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : 90,
	//hasChild : true,
	className : 'table-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Add server',
	text : L('settings_row5_title'),
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
	//text : 'Add a WCS or WMS server',
	text : L('settings_row5_description'),
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

row.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.

	//alert("Hai cliccato \"Add server\"");
	//alert("e.row.children[1].text:\n" + e.row.children[1].text);
	//alert("e.row.children[2]:\n" + e.row.children[2].image);
	//alert("sono qui prima");
	win22.open();
});

sectionServers.add(row);

var sectionQueries = Ti.UI.createTableViewSection({
	//headerTitle : 'Queries Metadata'
	headerTitle : L('settings_section3_title')
});

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : 90,
	hasChild : false,
	className : 'table-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Coverages description',
	text : L('settings_row6_title'),
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
	//text : 'Show WCS coverage metadata',
	text : L('settings_row6_description'),
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
row.addEventListener('click', function(e) {
	win31.open();
});
sectionQueries.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : 90,
	hasChild : false,
	className : 'table-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Layers description',
	text : L('settings_row7_title'),
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
	//text : 'Show WMS layer metadata',
	text : L('settings_row7_description'),
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
row.add(titleRow);
row.add(descriptionRow);
row.addEventListener('click', function(e) {
	win32.open();
});
sectionQueries.add(row);

table1.data = [sectionOverlays, sectionServers, sectionQueries];

win.add(table1);
