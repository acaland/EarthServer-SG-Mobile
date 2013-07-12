/**
 * @author Francesco
 */
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('/images/bgImage.png');

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

Ti.API.info("WcsDescribeCoverage.js - xmlText: " + win.xmlText);
/*
//Verify if describeCoverage response is null for the server with index choosen
var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
	for (var i = 0; i < addedServers.length; i++) {
		//Ti.API.info("WcsDescribeCoverage.js - addedServers[0].describeCoverage: " + addedServers[i].describeCoverage);
	};
};
*/
var xmlData = Ti.XML;
xmlData = Titanium.XML.parseString(win.xmlText);

var win1 = Titanium.UI.createWindow({
	url : '/windows/WcsCoverageEnvelope.js',
	title : 'Envelope',
	//title : L('WcsCoverageEnvelope_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
	//xmlData : xmlData
});
var win2 = Titanium.UI.createWindow({
	url : '/windows/WcsCoverageDomain.js',
	//title : 'Domain set',
	title : L('WcsCoverageDomain_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
var win3 = Titanium.UI.createWindow({
	url : '/windows/WcsCoverageRange.js',
	//title : 'Range type',
	title : L('WcsCoverageRange_win_title'),
	modal : true,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});

win1.xmlData = xmlData;
win2.xmlData = xmlData;
win3.xmlData = xmlData;

//create the tableView
var tblCoverageInfo = Titanium.UI.createTableView({
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

var sectionCoverageId = Ti.UI.createTableViewSection({
	//headerTitle : 'Coverage ID and Type'
	headerTitle : L('WcsDescribeCoverage_section1_title')
});
//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'coverageId-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Id',
	text : L('WcsDescribeCoverage_row1_title'),
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
	text : xmlData.documentElement.getElementsByTagName("wcs:CoverageId").item(0).textContent,
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
	text : L('WcsDescribeCoverage_row2_title'),
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
	text : xmlData.documentElement.getElementsByTagName("wcs:CoverageSubtype").item(0).textContent,
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

var sectionEnvelope = Ti.UI.createTableViewSection({
	//headerTitle : 'Envelope'
	headerTitle : L('WcsDescribeCoverage_section2_title')
});
//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'Envelope-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Envelope',
	text : L('WcsDescribeCoverage_row3_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 25,
		width : 'auto',
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
row.add(iconImage);
sectionEnvelope.add(row);

var sectionDomain = Ti.UI.createTableViewSection({
	//headerTitle : 'Envelope'
	headerTitle : L('WcsDescribeCoverage_section3_title')
});
//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'Domain-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Coverage Domain',
	text : L('WcsDescribeCoverage_row4_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 25,
		width : 'auto',
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
row.add(iconImage);
sectionDomain.add(row);

var sectionRange = Ti.UI.createTableViewSection({
	//headerTitle : 'Coverage Range'
	headerTitle : L('WcsDescribeCoverage_section4_title')
});
//create a table row
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'Range-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Coverage Range',
	text : L('WcsDescribeCoverage_row5_title'),
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		},
		color : '#000',
		left : 10,
		top : 25,
		width : 'auto',
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
row.add(iconImage);
sectionRange.add(row);

//finally, set the data property of the tableView to our sections
tblCoverageInfo.data = [sectionCoverageId, sectionEnvelope, sectionDomain, sectionRange];

win.add(tblCoverageInfo);

tblCoverageInfo.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.

	if (e.index == 2) {	
		//win1.xmlData = xmlData;
		//Ti.API.info("WcsDescribeCoverage.js - win1.xmlData: " + win1.xmlData);
		win1.open();
	} else if (e.index == 3) {
		win2.open();
	} else if (e.index == 4) {
		win3.open();
	};
});
/*
//Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
win.addEventListener('blur', removeTable);
function removeTable(e) {
    win.remove(tblCoverageInfo);
};
*/

