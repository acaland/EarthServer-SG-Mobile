
$.welcomeSwitch.value = Ti.App.Properties.getBool("welcome_screen", true);


function signIn() {
	$.WelcomeScreen.close();
}

function register() {
	Ti.Platform.openURL("https://idpopen.garr.it/register");
}

function gotoESprojectSG() {
	Ti.Platform.openURL("https://earthserver-sg.consorzio-cometa.it/");
}

function gotoESproject() {
	Ti.Platform.openURL("http://www.earthserver.eu/");
}

function dismissWelcomeScreen(e) {
		Ti.App.Properties.setBool("welcome_screen", e.value);
}
