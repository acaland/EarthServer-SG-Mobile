/**
 * @author Francesco
 */
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = WcsCoverageMetadata.js
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

//Ti.API.info("WcsGetCoverage.js - win.xmlText: " + win.xmlText);
var xmlData = Ti.XML;
xmlData = Titanium.XML.parseString(win.xmlText);

//create a button to save a server to the addedServers array
//
var btnSend = Titanium.UI.createButton({
	//title : 'Send',
	title : L('WcsGetCoverage_button_title'),
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
win.add(btnSend);

btnSend.addEventListener('touchstart', function(e) {
	btnSend.backgroundImage = '/images/button_focused.png';
});

btnSend.addEventListener('touchend', function(e) {
	btnSend.backgroundImage = '/images/button.png';
});

//create the tableView
var tblGetCoverage = Titanium.UI.createTableView({
	width : w - 20,
	height : h - btnSend.height - 120,
	//top : 20,
	top : btnSend.top + btnSend.height + 10,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,
	minRowHeight : 90
});

var sectionBoundingBox = Ti.UI.createTableViewSection({
	//headerTitle : 'BoundingBox'
	headerTitle : L('WcsGetCoverage_section1_title')
});
//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'boundingBox-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'CRS',
	text : L('WcsGetCoverage_row1_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	width : 'auto',
	height : 30
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("srsName"),
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	//color : '#2f4f4f',
	color : '#fff',
	left : 10,
	top : 35,
	width : 'auto',
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionBoundingBox.add(row);

//Retrieve latitude and longitude measures
var minLat = 0;
var maxLat = 0;
var minLon = 0;
var maxLon = 0;
var str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("axisLabels");
var data = [];
data = str.split(" ");
if (data[0] === "lat") {
	str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:lowerCorner").item(0).textContent;
	var numbersArray = [];
	numbersArray = str.split(" ");
	minLat = parseFloat(numbersArray[0]).toFixed(6);
	minLon = parseFloat(numbersArray[1]).toFixed(6);

	str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:upperCorner").item(0).textContent;
	numbersArray = [];
	numbersArray = str.split(" ");
	maxLat = parseFloat(numbersArray[0]).toFixed(6);
	maxLon = parseFloat(numbersArray[1]).toFixed(6);
} else {
	str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:lowerCorner").item(0).textContent;
	var numbersArray = [];
	numbersArray = str.split(" ");
	minLon = parseFloat(numbersArray[0]).toFixed(6);
	minLat = parseFloat(numbersArray[1]).toFixed(6);

	str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:upperCorner").item(0).textContent;
	numbersArray = [];
	numbersArray = str.split(" ");
	maxLon = parseFloat(numbersArray[0]).toFixed(6);
	maxLat = parseFloat(numbersArray[1]).toFixed(6);
};

//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'boundingBox-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Min latitude',
	text : L('WcsGetCoverage_row2_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	width : 'auto',
	height : 30
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : minLat,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	//color : '#2f4f4f',
	color : '#fff',
	left : 10,
	top : 35,
	width : 'auto',
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionBoundingBox.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'boundingBox-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Min longitude',
	text : L('WcsGetCoverage_row3_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	width : 'auto',
	height : 30
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : minLon,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	//color : '#2f4f4f',
	color : '#fff',
	left : 10,
	top : 35,
	width : 'auto',
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionBoundingBox.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'boundingBox-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Max latitude',
	text : L('WcsGetCoverage_row4_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	width : 'auto',
	height : 30
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : maxLat,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	//color : '#2f4f4f',
	color : '#fff',
	left : 10,
	top : 35,
	width : 'auto',
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionBoundingBox.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'boundingBox-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Max longitude',
	text : L('WcsGetCoverage_row5_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	width : 'auto',
	height : 30
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : maxLon,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	//color : '#2f4f4f',
	color : '#fff',
	left : 10,
	top : 35,
	width : 'auto',
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionBoundingBox.add(row);

var sectionRangeSubsetting = Ti.UI.createTableViewSection({
	//headerTitle : 'BoundingBox'
	headerTitle : L('WcsGetCoverage_section2_title')
});
var rangeType = Ti.XML.Element;
rangeType = xmlData.documentElement.getElementsByTagName("gmlcov:rangeType").item(0);
if (rangeType.getElementsByTagName("swe:field") != null) {
	//loop each offset in the domain set
	for (var i = 0; i < rangeType.getElementsByTagName("swe:field").length; i++) {
		//create a table row
		var row = Titanium.UI.createTableViewRow({
			hasChild : false,
			className : 'bands-row'
		});
		//title row
		var titleRow = Titanium.UI.createLabel({
			text : rangeType.getElementsByTagName("swe:field").item(i).getAttribute("name"),
			font : {
				fontSize : 22,
				fontWeight : 'bold'
			},
			color : '#000',
			left : 10,
			top : 30,
			width : 'auto',
			height : 30
		});
		//add our little icon to the right of the row
		var iconImage = Titanium.UI.createImageView({
			image : '/images/check.png',
			width : 48,
			height : 48,
			right : 10,
			top : 20,
			visible : true
		});
		row.add(titleRow);
		row.add(iconImage);
		row.addEventListener('click', function(e) {
			e.row.children[1].visible = !e.row.children[1].visible;
		});
		sectionRangeSubsetting.add(row);
	};
};

var sectionImageSize = Ti.UI.createTableViewSection({
	//headerTitle : 'Coverage image'
	headerTitle : L('WcsGetCoverage_section3_title')
});
//create a table row - Width
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'imageSize-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Width',
	text : L('WcsGetCoverage_row6_title'),
	font : {
		fontSize : 24,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var txtWidth = Ti.UI.createTextField({
	//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	//borderStyle : 'none',
	//borderColor : 'red',
	//borderWidth : 1,
	keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	//color : '#336699',
	color : '#fff',
	backgroundColor : '#B0C4DE',
	left : 0,
	top : 35,
	//width : Ti.UI.SIZE,
	//height : Ti.UI.SIZE,
	width : row.width,
	//width : 'auto',
	height : 55,
	//minimumFontSize : 14,
	//paddingLeft : 0,
	hintText : L('WcsGetCoverage_row6_hintText')
});

row.add(titleRow);
row.add(txtWidth);
sectionImageSize.add(row);

//create a table row - Width
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'imageSize-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Height',
	text : L('WcsGetCoverage_row7_title'),
	font : {
		fontSize : 24,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var txtHeight = Ti.UI.createTextField({
	//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	//borderStyle : 'none',
	//borderColor : 'red',
	//borderWidth : 1,
	keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	//color : '#336699',
	color : '#fff',
	backgroundColor : '#B0C4DE',
	left : 0,
	top : 35,
	//width : Ti.UI.SIZE,
	//height : Ti.UI.SIZE,
	width : row.width,
	//width : 'auto',
	height : 55,
	//minimumFontSize : 14,
	//paddingLeft : 0,
	hintText : L('WcsGetCoverage_row7_hintText')
});

row.add(titleRow);
row.add(txtHeight);
sectionImageSize.add(row);

//finally, set the data property of the tableView to our sections
tblGetCoverage.data = [sectionBoundingBox, sectionRangeSubsetting, sectionImageSize];

win.add(tblGetCoverage);

/*
 //Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
 win.addEventListener('blur', removeTable);
 function removeTable(e) {
 win.remove(tblGetCoverage);
 };
 */
