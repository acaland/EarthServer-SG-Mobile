/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('/images/bgImage.png');

//Parent windows = WcsServer.js, WcsCoverageMetadata.js
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

var xml = Ti.XML;
xml = win.xml;

var sectionCoverageId = Ti.UI.createTableViewSection({
	//headerTitle : 'Coverage ID and Type'
	headerTitle : L('CoverageInfo_section1_title')
});

//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'coverageId-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Id',
	text : L('CoverageInfo_row1_title'),
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
	text : win.xml.documentElement.getElementsByTagName("wcs:CoverageSummary").item(win.rowID).getElementsByTagName("wcs:CoverageId").item(0).textContent,
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
sectionCoverageId.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'coverageId-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Type',
	text : L('CoverageInfo_row2_title'),
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
	text : win.xml.documentElement.getElementsByTagName("wcs:CoverageSummary").item(win.rowID).getElementsByTagName("wcs:CoverageSubtype").item(0).textContent,
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
sectionCoverageId.add(row);


//**************	ATTENZIONE	*********************************************
//Da implementare la sezione bounding box
var sectionBoundingBox = Ti.UI.createTableViewSection({
	//headerTitle : 'Bounding box'
	headerTitle : L('CoverageInfo_section2_title')
});
//***************************************************************************

//finally, set the data property of the tableView to our sections
var tblCoverageInfo = Titanium.UI.createTableView({
	width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,
	data : [sectionCoverageId, sectionBoundingBox]
});
win.add(tblCoverageInfo);

//Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
win.addEventListener('blur', removeTable);
function removeTable(e) {
    win.remove(tblCoverageInfo);
}

/*
//Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
win.addEventListener('blur', clearWindow);
function clearWindow(e) {
    Ti.API.info('window event> evt:' + e.type + ' window:' + e.source.name);
    
    win.remove(tblCoverageInfo);
}
*/