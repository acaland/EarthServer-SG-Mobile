/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = Settings.js
//reference the current window
var win = Titanium.UI.currentWindow;
win.backgroundColor = "white";
//alert("sono qui");
win.title = L('AvailableServers_win_title');

var btnBack = Ti.UI.createButton({
	//title: 'back'
	title: L('NavButton_back')
});
win.leftNavButton = btnBack; 
btnBack.addEventListener('click', function() {
	win.close();
});

var win1 = Titanium.UI.createWindow({
	url : '/windows/AddServer.js',
	//title : 'Add server',
	title : L('AddServer_win_title'),
	modal : true,
	//backgroundColor : '#fff'
	backgroundImage : '/images/bgImage.png',
	orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	//orientationModes : [Ti.UI.PORTRAIT]
});

var win2 = Titanium.UI.createWindow({
	url : '/windows/AddNewServer.js',
	//title : 'Add new server',
	title : L('AddNewServer_win_title'),
	//modal : true,
	//backgroundColor : '#fff'
	backgroundImage : '/images/bgImage.png',
	orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	//orientationModes : [Ti.UI.PORTRAIT]
});

//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

// Creiamo una view che conterrà la tabella
//var viewTable = Titanium.UI.createView({
//});

var tblServers = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : pHeight - 110,
	//height : 100,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2
});
win.add(tblServers);


//Read server list from "avalaibleServers" property
//Empty array
var avalaibleServers = [];

if (Ti.App.Properties.hasProperty('avalaibleServers')) {
	avalaibleServers = Ti.App.Properties.getList('avalaibleServers');
};

//empty data array
var data = [];

//Put data from array to table
// The array "serverArray" goes until length-1 because the last row is empty
for (var i = 0; i < avalaibleServers.length; i++) {
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		width : tblServers.width,
		height : 90,
		hasChild : false,
		className : 'server-row'
	});
	//name
	var lblName = Titanium.UI.createLabel({
		text : avalaibleServers[i].name,
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
	//service
	var lblService = Titanium.UI.createLabel({
		text : avalaibleServers[i].type,
		font : {
			fontSize : 22,
			fontWeight : 'normal'
		},
		//color : '#000',
		color : '#2f4f4f',
		//color : '#fff',
		right : 10,
		top : 10,
		width : 60,
		height : 40
	});
	//url
	var lblUrl = Titanium.UI.createLabel({
		text : avalaibleServers[i].url,
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
	row.add(lblName);
	row.add(lblService);
	row.add(lblUrl);
	//add the table row to our data[] object
	data.push(row);
};

// Insert the last row (Other)
//create a table row
var row = Titanium.UI.createTableViewRow({
	width : tblServers.width,
	height : 90,
	hasChild : false,
	className : 'server-row'
});
//name
var lblName = Titanium.UI.createLabel({
	text : L('AvailableServers_last_row_title'),
	font : {
		fontFamily: 'Helvetica',
		fontSize : 24,
		fontWeight : 'bold'
	},
	color : '#00CD00',
	left : 10,
	top : 10,
	width : row.width - 70,
	height : 70
});
//add our little icon to the right of the row
var iconImage = Titanium.UI.createImageView({
	image : '/images/addServer.png',
	width : 48,
	height : 48,
	right : 20,
	top : 20
});
row.add(iconImage);

/*
 //service
 var lblService = Titanium.UI.createLabel({
 text : '',
 font : {
 fontSize : 20,
 fontWeight : 'normal'
 },
 color : '#000',
 right : 10,
 top : 5,
 width : 50,
 height : 28
 });
 //url
 var lblUrl = Titanium.UI.createLabel({
 text : '',
 font : {
 fontSize : 16,
 fontWeight : 'normal'
 },
 color : '#2f4f4f',
 left : 10,
 top : 33,
 width : 'auto',
 height : 25
 });
 row.add(lblService);
 row.add(lblUrl);
 */
row.add(lblName);

//add the table row to our data[] object
data.push(row);

tblServers.data = data;

tblServers.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	if (e.index == tblServers.data[0].rowCount - 1) {
		//alert('clicked add new server');
		win2.open({modal:true});
		//win.close(); //resolving iOS problem
	} else {
		win1.name = e.row.children[0].text;
		win1.service = e.row.children[1].text;
		win1.urlServer = e.row.children[2].text;
		win1.open();
		//win.close(); //resolving iOS problem
	};
});

/*
 //create a table row
 var row = Titanium.UI.createTableViewRow({
 hasChild : false,
 className : 'server-row'
 });
 //title row
 var titleRow = Titanium.UI.createLabel({
 text : 'EOX WCS Server',
 font : {
 fontSize : 20,
 fontWeight : 'bold'
 },
 color : '#000',
 left : 10,
 top : 5,
 width : 'auto',
 height : 28
 });
 var typeRow = Titanium.UI.createLabel({
 text : 'WCS',
 font : {
 fontSize : 20,
 fontWeight : 'normal'
 },
 color : '#000',
 right : 10,
 top : 5,
 width : 50,
 height : 28
 });
 //description row
 var descriptionRow = Titanium.UI.createLabel({
 text : 'http://ows.eox.at/cci/ows',
 font : {
 fontSize : 16,
 fontWeight : 'normal'
 },
 color : '#2f4f4f',
 left : 10,
 top : 33,
 width : 'auto',
 height : 25
 });
 row.add(titleRow);
 row.add(descriptionRow);
 row.add(typeRow);
 //add the table row to our data[] object
 data.push(row);

 //create a table row
 var row = Titanium.UI.createTableViewRow({
 hasChild : false,
 className : 'server-row'
 });
 //title row
 var titleRow = Titanium.UI.createLabel({
 text : 'EOX WCS Mapserver',
 font : {
 fontSize : 20,
 fontWeight : 'bold'
 },
 color : '#000',
 left : 10,
 top : 5,
 width : 'auto',
 height : 28
 });
 //description row
 var descriptionRow = Titanium.UI.createLabel({
 text : 'http://kalyke.eox.at/opendata/ows',
 font : {
 fontSize : 16,
 fontWeight : 'normal'
 },
 color : '#2f4f4f',
 left : 10,
 top : 33,
 width : 'auto',
 height : 25
 });
 row.add(titleRow);
 row.add(descriptionRow);

 //add the table row to our data[] object
 data.push(row);

 //create a table row
 var row = Titanium.UI.createTableViewRow({
 hasChild : false,
 className : 'server-row'
 });
 //title row
 var titleRow = Titanium.UI.createLabel({
 text : 'EarthServer EOX WMS Server',
 font : {
 fontSize : 20,
 fontWeight : 'bold'
 },
 color : '#000',
 left : 10,
 top : 5,
 width : 'auto',
 height : 28
 });
 //description row
 var typeRow = Titanium.UI.createLabel({
 text : 'WMS',
 font : {
 fontSize : 20,
 fontWeight : 'normal'
 },
 color : '#000',
 right : 10,
 top : 5,
 width : 50,
 height : 28
 });
 var descriptionRow = Titanium.UI.createLabel({
 text : 'http://earthserver.eox.at/open/ows',
 font : {
 fontSize : 16,
 fontWeight : 'normal'
 },
 color : '#2f4f4f',
 left : 10,
 top : 33,
 width : 'auto',
 height : 25
 });
 row.add(titleRow);
 row.add(descriptionRow);

 //add the table row to our data[] object
 data.push(row);

 //create a table row
 var row = Titanium.UI.createTableViewRow({
 hasChild : false,
 className : 'server-row'
 });
 //title row
 var titleRow = Titanium.UI.createLabel({
 text : 'EOX WMS Server',
 font : {
 fontSize : 20,
 fontWeight : 'bold'
 },
 color : '#000',
 left : 10,
 top : 5,
 width : 'auto',
 height : 28
 });
 //description row
 var descriptionRow = Titanium.UI.createLabel({
 text : 'http://ows.eox.at/ofc/ows',
 font : {
 fontSize : 16,
 fontWeight : 'normal'
 },
 color : '#2f4f4f',
 left : 10,
 top : 33,
 width : 'auto',
 height : 25
 });
 row.add(titleRow);
 row.add(descriptionRow);

 //add the table row to our data[] object
 data.push(row);

 //finally, set the data property of the tableView to our data[] object
 tblServers.data = data;
 */

