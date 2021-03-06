/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
///Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent window = WcsDescribeCoverage.js
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

var xmlData = Ti.XML;
xmlData = win.xmlData;

//create the tableView
var tblCoverageEnvelope = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,
	minRowHeight : 90
});

var str = "";

var sectionSpatialEnvelope = Ti.UI.createTableViewSection({
	//headerTitle : 'Spatial Envelope'
	headerTitle : L('WcsCoverageEnvelope_section1_title')
});
//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'spatialEnvelope-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'SrsName',
	text : L('WcsCoverageEnvelope_row1_title'),
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
sectionSpatialEnvelope.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'spatialEnvelope-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'SrsDimension',
	text : L('WcsCoverageEnvelope_row2_title'),
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
	text : xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("srsDimension"),
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : 'auto',
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionSpatialEnvelope.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'spatialEnvelope-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Axis labels',
	text : L('WcsCoverageEnvelope_row3_title'),
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
str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("axisLabels");
str = str.replace(" ", "\n");
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : 'auto',
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionSpatialEnvelope.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'spatialEnvelope-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Axis UOMs',
	text : L('WcsCoverageEnvelope_row4_title'),
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
str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("uomLabels");
str = str.replace(" ", "\n");
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : 'auto',
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionSpatialEnvelope.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'spatialEnvelope-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Lower corner',
	text : L('WcsCoverageEnvelope_row5_title'),
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
str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:lowerCorner").item(0).textContent;
var numbersArray = [];
numbersArray = str.split(" ");
str = "";
for (var i = 0; i < numbersArray.length; i++) {
	str += parseFloat(numbersArray[i]).toFixed(6) + "\n";
};
str = str.substr(0, str.length - 1);
//str = str.replace(" ","\n");
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : 'auto',
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionSpatialEnvelope.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'spatialEnvelope-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Upper corner',
	text : L('WcsCoverageEnvelope_row6_title'),
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
str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:upperCorner").item(0).textContent;
//str = str.replace(" ", "\n");
var numbersArray = [];
numbersArray = str.split(" ");
str = "";
for (var i = 0; i < numbersArray.length; i++) {
	str += parseFloat(numbersArray[i]).toFixed(6) + "\n";
};
str = str.substr(0, str.length - 1);

//description row
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : 'auto',
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionSpatialEnvelope.add(row);

//finally, set the data property of the tableView to our sections
tblCoverageEnvelope.data = [sectionSpatialEnvelope];

win.add(tblCoverageEnvelope);

//Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
win.addEventListener('blur', removeTable);
function removeTable(e) {
	win.remove(tblCoverageEnvelope);
};

