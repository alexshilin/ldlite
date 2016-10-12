$(window).load(function(){
	document.addEventListener('deviceready', init, false);
	document.addEventListener("backbutton", handleBackButtonAndroid, false);
});

/*
use for console logging to a div
<div id="con" style="position:absolute; width:100%; height:200px; top:300px; left:0; overflow-y:scroll"></div>
console.log = (function (old_function, div_log) { 
    return function (text) {
        old_function(text);
        div_log.append("<p>"+JSON.stringify(text)+"</p>");
    };
} (console.log.bind(console), $('#con')));
*/

/* 

APP VARS

*/
var full = true;
var SVGpacks = [];
var OKtoplay = [];
litefull();
function litefull(){
	if(!full){
		SVGpacks = [PACK0, PACK1, PACK2, PACK3, PACK4, PACK5];
		OKtoplay = ["true", "false", "false", "false", "false", "false"];
		$('.lite').show();
	}else{
		SVGpacks = [PACK1, PACK2, PACK3, PACK4, PACK5];
		OKtoplay = ["true", "true", "true", "true", "true"];
		$('.lite').hide();
	}
}


var difficulty_numbers = [10, 20];
var difficulty_letters = ["ab", "AB"];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

var SETTINGS = new Object();
SETTINGS.dottype = "numbers";
SETTINGS.difficulty = "hard";
SETTINGS.help = false;
SETTINGS.maxdots = 20;
SETTINGS.dotscale = {min:0.3, mid:0.6, max:1};
SETTINGS.diameter = 60;
SETTINGS.alphabet = alphabet;
SETTINGS.svgW = 800;
SETTINGS.svgH = 800;
SETTINGS.isMute = false;
SETTINGS.themes = [
	{bg:'#BA3B46', stroke:'#a6ea28'}, //red, green
	{bg:'#EF476F', stroke:'#fffc00'}, //pink, yellow
	{bg:'#34344A', stroke:'#F0F757'}, //blue, yellow
	{bg:'#61210F', stroke:'#4bf7b3'}, //brown, blue
	{bg:'#0d5a53', stroke:'#ff3cec'}, //teal, purple
];
SETTINGS.theme = 0;

var appSet = false;

var pet = 'bunny';
var petSet = {
	"bunny":{
		transition:'500ms',
		imgswitch:[175, 150]
	},
	"frog":{
		transition:'300ms',
		imgswitch:[150, 125]
	}
}
/*


APP INIT, after deviceready


*/
function init(){
	console.log('DEVICE READY');
	preloadSounds();
	getStorage();
}


/*


SOUND SHIT


*/
var s_farts = [];
var s_beeps = [];
var s_drums = [];
var s_bubbles = [];
var s_reveal, s_wrong, s_start, s_hint, s_btn, s_back;

s_reveal = "s_reveal";
s_wrong = "s_wrong";
s_start = "s_start";
s_hint = "s_hint";
s_btn = "s_btn";
s_back = "s_back";
s_shh = "s_shh";

s_beeps[0] = "s_beeps0";
s_beeps[1] = "s_beeps1";
s_beeps[2] = "s_beeps2";
s_beeps[3] = "s_beeps3";
s_beeps[4] = "s_beeps4";

s_farts[0] = "s_farts0"
s_farts[1] = "s_farts1"
s_farts[2] = "s_farts2"
s_farts[3] = "s_farts3"
s_farts[4] = "s_farts4"

s_drums[0] = "s_drums0";
s_drums[1] = "s_drums1";

var sounds = s_beeps.slice();
var usedsounds = [];

function preloadSounds(){
	if( window.plugins && window.plugins.NativeAudio ) {
		window.plugins.NativeAudio.preloadSimple( 's_start', "sounds/music_vibelong_note_lo.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_btn', "sounds/click_enter2.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_back', "sounds/digi_ping_up.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_drums0', "sounds/etc_drum_flam.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_drums1', "sounds/etc_drum_timpani_lite.mp3", function(){}, function(){});
	}
}

function preloadSounds2(){
	if( window.plugins && window.plugins.NativeAudio ) {
		window.plugins.NativeAudio.preloadSimple( 's_wrong', "sounds/music_piano_warning.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_hint', "sounds/music_glass_new.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_shh', "sounds/shh.mp3", function(){}, function(){});
		
		window.plugins.NativeAudio.preloadSimple( 's_beeps0', "sounds/beep_basic_c.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_beeps1', "sounds/beep_basic_f.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_beeps2', "sounds/beep_basic_g.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_beeps3', "sounds/beep_basic_lo_g.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_beeps4', "sounds/beep_basic_lo_c.mp3", function(){}, function(){});
		
		window.plugins.NativeAudio.preloadSimple( 's_farts0', "sounds/fart1.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_farts1', "sounds/fart2.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_farts2', "sounds/fart3.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_farts3', "sounds/fart4.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_farts4', "sounds/fart5.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_reveal', "sounds/chime_reveal.mp3", function(){}, function(){});
		window.plugins.NativeAudio.preloadSimple( 's_reveal2', "sounds/farttrumpet.mp3", function(){}, function(){});
	}
}

function unloadSounds(){
	if( window.plugins && window.plugins.NativeAudio ) {
		window.plugins.NativeAudio.unload( 's_reveal');
		window.plugins.NativeAudio.unload( 's_reveal2');
		
		window.plugins.NativeAudio.unload( 's_wrong');
		window.plugins.NativeAudio.unload( 's_start');
		window.plugins.NativeAudio.unload( 's_hint');
		window.plugins.NativeAudio.unload( 's_btn');
		window.plugins.NativeAudio.unload( 's_back');
		window.plugins.NativeAudio.unload( 's_shh');
		
		window.plugins.NativeAudio.unload( 's_beeps0');
		window.plugins.NativeAudio.unload( 's_beeps1');
		window.plugins.NativeAudio.unload( 's_beeps2');
		window.plugins.NativeAudio.unload( 's_beeps3');
		window.plugins.NativeAudio.unload( 's_beeps4');
		
		window.plugins.NativeAudio.unload( 's_farts0');
		window.plugins.NativeAudio.unload( 's_farts1');
		window.plugins.NativeAudio.unload( 's_farts2');
		window.plugins.NativeAudio.unload( 's_farts3');
		window.plugins.NativeAudio.unload( 's_farts4');
		
		window.plugins.NativeAudio.unload( 's_drums0');
		window.plugins.NativeAudio.unload( 's_drums1');	
		
		SETTINGS.isMute = true;
	}
}

function playRandomSound(){
	console.log(sounds);
	console.log(usedsounds);
	var r = Math.floor(Math.random()*sounds.length);
	console.log(sounds.length+" "+r+" "+sounds[r]);
	playS(sounds[r]);
	usedsounds.push(sounds[r]);
	sounds.splice(r, 1);
	if(sounds.length==0){
		sounds = usedsounds;
		usedsounds = [];
	}
}

function playS(sound){
	console.log(sound);
	if(!SETTINGS.isMute){
		window.plugins.NativeAudio.play( sound );
	}
}

/*


ANDROID BACK BUTTON


*/
//home <- game
//home <- settings <- pack
var currNav = "home";

function handleBackButtonAndroid(e){
	if(currNav=="home") navigator.app.exitApp(); //exit app
	if(currNav=="game") $('#home').trigger('click'); //back to home
	if(currNav=="settings") $('#options-back .btn').trigger('click'); //back to home
	if(currNav=="purchase") $('#purchase-back .btn').trigger('click'); //back to home
	if(currNav=="pack") $('#gallery-back .btn').trigger('click'); //back to settings
}

/*


HELPERS


*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var usedthemes = [];
function getTheme(){
	var r = Math.floor(Math.random()*SETTINGS.themes.length);
	var pick = SETTINGS.themes[r];
	usedthemes.push(SETTINGS.themes[r]);
	SETTINGS.themes.splice(r, 1);
	if(SETTINGS.themes.length==0){
		SETTINGS.themes = usedthemes;
		usedthemes = [];
	}
	return pick
}


/*


LOCAL STORAGE


*/
var tmpDATA;
var sKEY = 'lebored.ld.data';

function compareDataObjects(a, b){
	var aKeys = Object.keys(a).sort();
	var bKeys = Object.keys(b).sort();
	var equal = JSON.stringify(aKeys) === JSON.stringify(bKeys);
	if(!equal){
		console.log("new data, updating storage...");
		var tmp = appData;
		for (var i in a) {
			if (b.hasOwnProperty(i)) tmp[i]=b[i];
		}
		return tmp;
	}else{
		return b;
	}
}

function getStorage(){
	console.log('checking storage for: '+sKEY)
	localforage.getItem(sKEY)
		.then(function(value){
			if(value){
				console.log('exists!')
				tmpDATA = value;
				tmpDATA = compareDataObjects(appData, tmpDATA);
				updateData();
			}else{
				console.log('doesnt exist...');
				setStorage(appData);
			}
		})
}
function setStorage(v){
	console.log('updating storage');
	localforage
		.setItem(sKEY, v)
		.then(function(){
			return localforage.getItem(sKEY, function(err, value){
				console.log('saving...');
			})
		})
		.then(function(value){
			console.log('saved!')
			updateData(value);
		})
		.catch(function(err){
			console.log('error!')
			console.log(err)
		})
}
function updateData(v){
	console.log('latest: ');
	console.log(JSON.stringify( tmpDATA ));
	if(!appSet){
		appSet = true;
		setApp();
		preloadSounds2();
	}
}
function setApp(){
	//update audio settings
	$('.audio div').removeClass('selected');
	if(tmpDATA.audioSetting==0){
		$('.audio .off').addClass('selected');
		SETTINGS.isMute = true;
	}else if(tmpDATA.audioSetting==1){
		$('.audio .one').addClass('selected');
		SETTINGS.isMute = false;
		s_reveal = "s_reveal";
		sounds = s_beeps.slice();
		usedsounds = [];
	}else if(tmpDATA.audioSetting==2){
		$('.audio .two').addClass('selected');
		SETTINGS.isMute = false;
		s_reveal = "s_reveal2";
		sounds = s_farts.slice();
		usedsounds = [];
	}
	
	//update pet
	$('.pets div').removeClass('selected');
	if(tmpDATA.petSetting==0){
		$('.pets .bunny').addClass('selected');
		pet = 'bunny';
	}else if(tmpDATA.petSetting==1){
		$('.pets .frog').addClass('selected');
		pet = 'frog';
	}
	
	$('.numbers div').removeClass('selected');
	if(tmpDATA.numberSetting==10){
		$('.numbers .ten').addClass('selected');
	}else if(tmpDATA.numberSetting==15){
		$('.numbers .fifteen').addClass('selected');
	}else if(tmpDATA.numberSetting==20){
		$('.numbers .twenty').addClass('selected');
	}
	
	//create packs
	$('.getsome').empty();
	for(var i=0; i<SVGpacks.length; i++){
		$('.getsome')
			.append("<div class='pack noSelect' data-pack='"+i+"' data-purchased='"+OKtoplay[i]+"' data-pack-id='"+SVGpacks[i].id+"'>"+
						"<div class='pack-img'><div class='icon ion-images'></div></div>"+
						"<div class='pack-name'>"+SVGpacks[i].name+"</div>"+
					"</div>");
	}

	main();
}


/*

MAIN APP

*/
function main(){
	//removes click delay on ios
	var attachFastClick = Origami.fastclick;
	attachFastClick(document.body);
	
	var curr = 1;
	var ds = 0;
	var nums = 0;
	var wrongs = 0;
	var scalediff = 1;
	
	document.addEventListener("dotSetup", startDots);
	document.addEventListener("dotReady", nextDot);
	document.addEventListener("dotsDone", function(){$('#next').show();});
	
	////////// CLICK LOGO 5 TIMES TO CLEAR LOCAL STORAGE ////////
	var clickcnt = 0;
	$('.logo').click(function(){
		if(clickcnt<5){clickcnt++;}
		if(clickcnt==5){
			console.log("FORCE CLEAR");
			clickcnt=0;
			localforage.clear(function(err) {
				console.log('CLEARED');
				appSet=false;
				getStorage();
			});
		}
		setTimeout(function(){clickcnt=0}, 1000);
	})
	//////////
	
	$('.dottype div').on('click', function(){
		$('.dottype div').removeClass('selected');
		$(this).addClass('selected');
		if($(this).hasClass('numbers')){
			setDotType('numbers');
			playS(s_drums[0]);
			tmpDATA.typeSetting=0;
			setStorage(tmpDATA);
		}
		if($(this).hasClass('letters')){
			setDotType('letters');
			playS(s_drums[1]);
			tmpDATA.typeSetting=1;
			setStorage(tmpDATA);
		}
		setDotPattern();
	});
	
	$('.saveset').on('click', start);
	
	function start(){
		gateCheck();
	}
	
	function gateCheck(goNext){
		if(goNext){
			if(tmpDATA.lastItemPlayed<SVGpacks[tmpDATA.lastPackPlayed].items.length-1) {
				//yes, go to next one
				tmpDATA.lastItemPlayed++;
				setStorage(tmpDATA);
			}else{
				//no, check remaining packs
				//loop through packs starting at the next pack and loop back around if need be
				var offset = tmpDATA.lastPackPlayed+1;
				for( var i=0; i < OKtoplay.length; i++) {
				    var pointer = (i + offset) % OKtoplay.length;
					if(OKtoplay[pointer]==="true") {
						//whichever upcoming pack has been purchased, go to that one
						tmpDATA.lastPackPlayed = pointer;
						tmpDATA.lastItemPlayed = 0;
						setStorage(tmpDATA);
						break;
					}
				}
			}
		}
			
		SETTINGS.theme = getTheme();
		
		$('body').css('background-color',SETTINGS.theme.bg);
		$('.ball2').css('background',SETTINGS.theme.stroke);
		$('.level').css('color',SETTINGS.theme.stroke);
		
		$('#next').removeClass('blink').css({'top':'0px'});
		$('#nextbig').css({'bottom':'-100px'})
		$('#settings, #options, #gallery, #dots').hide();
		
		$('#gate').fadeIn();
		
		currNav = "game";
		
		playS(s_start);
		setTimeout(newDots.bind(null, tmpDATA.lastItemPlayed), 1000);
	}
	
	/*
	
	OPTIONS
	
	*/
	
	$('.options-btn').click(function(){
		currNav = "settings";
		playS(s_btn);
		$('#options').fadeIn('fast');
	})
	$('#options-back .btn').click(function(){
		currNav = "home";
		playS(s_back);
		$('#options').fadeOut('fast');
	})
	
	$('.audio div').click(function(){
		$('.audio div').removeClass('selected');
		$(this).addClass('selected');
		console.log("muted? "+SETTINGS.isMute);
		if($(this).hasClass('one')){
			console.log(' do beeps');
			//set beep sound pack
			SETTINGS.isMute = false;
			s_reveal = "s_reveal";
			sounds = s_beeps.slice();
			usedsounds = [];
			playRandomSound();
			$('.audio-header .selection').html("BEEP BOOPS");
			tmpDATA.audioSetting=1;
			setStorage(tmpDATA);
		}
		if($(this).hasClass('two')){
			console.log(' do farts');
			//set fart sound pack
			SETTINGS.isMute = false;
			s_reveal = "s_reveal2";
			sounds = s_farts.slice();
			usedsounds = [];
			playRandomSound();
			$('.audio-header .selection').html("TOOT TOOTS");
			tmpDATA.audioSetting=2;
			setStorage(tmpDATA);
		}
		if($(this).hasClass('off')){
			console.log(' do mute');
			//turn off sound
			playS(s_shh);
			SETTINGS.isMute = true;
			$('.audio-header .selection').html("MUTE");
			tmpDATA.audioSetting=0;
			setStorage(tmpDATA);
		}
	})
	
	$('.pets div').click(function(){
		$('.pets div').removeClass('selected');
		$(this).addClass('selected');
		if($(this).hasClass('bunny')){
			console.log(' bunny');
			playS(s_btn);
			$('.pets-header .selection').html("BUNNY");
			pet = 'bunny';
			tmpDATA.petSetting=0;
			setStorage(tmpDATA);
		}
		if($(this).hasClass('frog')){
			console.log(' frog');
			playS(s_btn);
			$('.pets-header .selection').html("FROG");
			pet = 'frog';
			tmpDATA.petSetting=1;
			setStorage(tmpDATA);
		}
	})
	
	$('.numbers div').click(function(){
		$('.numbers div').removeClass('selected');
		$(this).addClass('selected');
		if($(this).hasClass('ten')){
			console.log(' ten');
			$('.numbers-header .selection').html("TEN");
			playS(s_btn);
			tmpDATA.numberSetting=10;
			setStorage(tmpDATA);
		}
		if($(this).hasClass('fifteen')){
			console.log(' fifteen');
			$('.numbers-header .selection').html("FIFTEEN");
			playS(s_btn);
			tmpDATA.numberSetting=15;
			setStorage(tmpDATA);
		}
		if($(this).hasClass('twenty')){
			console.log(' twenty');
			$('.numbers-header .selection').html("TWENTY");
			playS(s_btn);
			tmpDATA.numberSetting=20;
			setStorage(tmpDATA);
		}
	})
	
	/*
	
	GALLERY
	
	*/
	packPreviews();
	
	$('.purchase-btn').click(function(){
		currNav = "purchase";
		playS(s_btn);
		$('#purchase').fadeIn('fast');
	})
	$('#purchase-back .btn').click(function(){
		currNav = "home";
		playS(s_back);
		$('#purchase').fadeOut('fast');
		/*$('#purchase').fadeOut('fast', function(){
			$('#purchase .samples').empty();
		});*/
	})
	
	function packPreviews(){
		for(var i=0; i<SVGpacks.length; i++){
			var s = SVGpacks[i].items || null;
			if(s!=null){
				var allow = OKtoplay[i] == "true" ? "unlocked" : "";
				var $packbox = $("<div>", {"class":"row", "style":"width:100%; background:#d21566; padding: 10px 0; margin:0 0 10px 0"})
				$(".samples").append($packbox);
				var $pack = $("<div>", {"class": "row", "style":"margin:0 auto; width:100%; max-width:600px;"});
				$packbox.append($pack);
				var txt = OKtoplay[i] == "true" ? "" : "color:#37cd82";
				var $header = $("<div>", {"class":"row", "style":"color:white; font-size:14px; font-weight:bold; "+txt});
				$header.html(SVGpacks[i].name);
				$pack.append($header);
				for(var k=0; k<s.length; k++){
					var $sample = $("<div>", {"class": "sample noSelect "+allow, "data-drawing":k});
					$pack.append($sample);
					var $svg = _makeSVGElement('0 0 ' + s[k].hello.dimensions.width + ' ' + s[k].hello.dimensions.height);
					//makes just the first path (the main outline)
					_makePathElement($svg, s[k].hello.strokepath[0]);
					
					$sample.append($svg);
					$sample.append("<div class='icon ion-locked'></div>");
				
					$sample.click({pack:i,drawing:k},gotoDrawing)
				}
			}
		}
	}
    function _makeSVGElement(viewBox) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, 'viewBox', viewBox);
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        return $(svg);
    };
    function _makePathElement(svg, p) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var $path = $(path);
        svg.append($path);
        $path.attr({
            'd': p.path, 'fill': '#ffffff', 'fill-opacity': 1,
            'stroke': '#ffffff','stroke-opacity': 0, 'stroke-width': 0,
            'stroke-linecap': 'round', 'stroke-linejoin': 'round'
        });
    };
	
	function gotoDrawing(e){
		if($(this).hasClass('unlocked')){
			tmpDATA.lastPackPlayed = parseInt(e.data.pack);
			tmpDATA.lastItemPlayed = parseInt(e.data.drawing);
			setStorage(tmpDATA);
		
			$('#purchase').hide();
		
			var css = ' translateX(0px) translateY(0) scale(1, 1)';
			setCss($('#hello'), css);
			if(SETTINGS.help) SETTINGS.help=false, wrongs = 0, $('#hint i').removeClass('ion-android-happy').addClass('ion-android-sad');
		
			gateCheck();
		}
	}
	
	/*
	
	GAME BUTTONS
	
	*/
	$('#hint').on('click', function(){
		if(SETTINGS.help){
			for(var i=0, l=$('.tracking').length; i<l; i++){
				var $d = $('.dot'+i+" .tracking__scale");
				if(!$d.hasClass('used')){
					setDotScale($('.dot'+i), SETTINGS.dotscale.max, SETTINGS.diameter);
					$d.removeClass('blink').addClass('on')
				}
			}
			$('#hint i').removeClass('ion-android-happy').addClass('ion-android-sad');
			wrongs = 0;
			SETTINGS.help = false;
		}else{
			for(var i=0, l=$('.tracking').length; i<l; i++){
				var $d = $('.dot'+i+" .tracking__scale");
				if(!$d.hasClass('used')){
					setDotScale($('.dot'+i), SETTINGS.dotscale.mid, SETTINGS.diameter);
					$d.removeClass('on')
				}
			}
			$('.dot' + curr + ' .tracking__scale').addClass('on blink').css('opacity',1);
			setDotScale($('.dot' + curr), SETTINGS.dotscale.max, SETTINGS.diameter);
			$('#hint i').removeClass('ion-android-sad').addClass('ion-android-happy');
			playS(s_hint);
			SETTINGS.help = true;
		}
	});
	
	$('#next, #nextbig').click(function(){
		$('#hello').lazylinepainter('pause');
		$('#hello').lazylinepainter('destroy');
		$('#hello').empty();
		var css = ' translateX(0px) translateY(0) scale(1, 1)';
		setCss($('#hello'), css);
		if(SETTINGS.help) SETTINGS.help=false, wrongs = 0, $('#hint i').removeClass('ion-android-happy').addClass('ion-android-sad');
		
		gateCheck(true);
	})
	
	$('#home').click(function(){
		currNav = "home";
		endLine();
		playS(s_back);
		
		$('#dots, #gallery, #options, #gate').hide();
		
		$('#hello').lazylinepainter('pause');
		$('#hello').lazylinepainter('destroy');
		$('#hello').empty();
		
		$('body').css({'background':'#ffd807'});
		
		$('#settings').fadeIn();
	});

	function setDotType(type){
		if(type=="numbers"){
			$('.easy').html(difficulty_numbers[0]);
			$('.hard').html(difficulty_numbers[1]);
		}
		if(type=="letters"){
			$('.easy').html(difficulty_letters[0]);
			$('.hard').html(difficulty_letters[1]);
		}
		SETTINGS.dottype = type;
	}
	
	function setDotPattern(){
		if(SETTINGS.dottype=="numbers"){
			if(SETTINGS.difficulty=="easy") SETTINGS.maxdots = difficulty_numbers[0];
			if(SETTINGS.difficulty=="hard") SETTINGS.maxdots = difficulty_numbers[1];
			$('.hd1').html(1); $('.hd2').html(2);
		}
		if(SETTINGS.dottype=="letters"){
			SETTINGS.maxdots = 26;
			if(SETTINGS.difficulty=="easy"){ 
				SETTINGS.alphabet = alphabet;
				$('.hd1').html('a'); $('.hd2').html('b');
			}	
			if(SETTINGS.difficulty=="hard"){ 
				SETTINGS.alphabet = alphabet.map(function(x){ return x.toUpperCase() });
				$('.hd1').html('A'); $('.hd2').html('B');
			}	
		}
	}
	
	/*
	
	DOTS
	
	*/
	
	function newDots(_dots){
		activedot = 1;
		curr = 1;
		pathObj = SVGpacks[tmpDATA.lastPackPlayed].items[_dots];
		//nums = SETTINGS.dottype=="numbers" ? getRandomInt(10,20)+1 : SETTINGS.maxdots+1;
		nums = SETTINGS.dottype=="numbers" ? tmpDATA.numberSetting+1 : SETTINGS.maxdots+1;
		ds = nums;
		wrongs = 0;

		
		$('body').css('background-color',SETTINGS.theme.bg);
		$('#hint, #home').css('color',SETTINGS.theme.stroke);
		$('#next i, #nextbig i').css('color',SETTINGS.theme.stroke);
	
		var progs = 1/nums;
		var stops = [];
		for(var i=0; i<nums; i++){
			stops.push(progs*i);
		}
		
		$("#hello").lazylinepainter({
			'svgData': pathObj,
			'strokeWidth': 4,
			'strokeColor': SETTINGS.theme.stroke,
			'stops': stops
		})
	}
	
	var ps = [];
	function startDots(){
			
		$("#hello svg").css({'width':SETTINGS.svgW, 'height':SETTINGS.svgH});
		$("#hello").css({'width':SETTINGS.svgW, 'height':SETTINGS.svgH});
		$("#line svg").css({'width':SETTINGS.svgW, 'height':SETTINGS.svgH});
		$("#line").css({'width':SETTINGS.svgW, 'height':SETTINGS.svgH});

		var data = $("#hello").lazylinepainter('get');
		
		//console.log(data.paths)
		var $pth = $('#hello svg path:first-child')[0];
		var positions = data.paths[0].length
		var jump = Math.ceil(positions/nums);
		ps = [];
		for(var i=0; i<nums; i++){
			var pt = $pth.getPointAtLength(i*jump);
			ps.push({x:pt.x,y:pt.y})
		}

		for (var i = 0; i < ps.length; i++) {
			var n = '';
			if(SETTINGS.dottype=="numbers" && i!=0) n=i;
			if(SETTINGS.dottype=="letters" && i!=0) n=SETTINGS.alphabet[i-1];
			$("#hello").append(
				"<div class='tracking noSelect dot" + i + "' data-dot='" + i + "' style='z-index:"+(100-i)+"'>"+
					"<div class='tracking__hitbox'></div>"+
					"<div class='tracking__scale noBlur'>" + n + "</div>"+
				"</div>");
			//setPosition($('.dot' + i), ps[i].x, ps[i].y);
			$('.dot' + i).css({'left':ps[i].x, 'top':ps[i].y})
			if(i==0){
				setDotScale($(".dot"+i), SETTINGS.dotscale.min, SETTINGS.diameter);
				$(".dot"+i+" .tracking__scale").addClass('used').css('border', SETTINGS.theme.stroke+' solid 10px');
			}else{
				$('.dot' + i).css('cursor', 'pointer').on('click', clickDot);
				if(SETTINGS.help){
					setDotScale($(".dot"+i), SETTINGS.dotscale.mid, SETTINGS.diameter);
				}else{
					$(".dot"+i+" .tracking__scale").addClass('on');
					setDotScale($(".dot"+i), SETTINGS.dotscale.max, SETTINGS.diameter);
				}
	
			}

			$(".dot"+i+" .tracking__scale").css({'line-height':SETTINGS.diameter+"px"})
		};
		
		$('#hello').append("<div class='petbox'><div class='pet-shadow noBlur'></div><div class='pet'></div></div>");
		$('.petbox, .petshadow').addClass('transition-'+petSet[pet].transition);
		lastdeg = 0;
		dist = 0;
		directBunny(1);

		$('#hint').show();
		$('#gate').fadeOut('fast', function(){
			$('#dots').fadeIn('slow');
			$("#hello").lazylinepainter('paint');
		});
		
		$('.dot0 .tracking__scale').addClass('on');
		if(SETTINGS.help){
			$('.dot1 .tracking__scale').addClass('on blink');
			setDotScale($('.dot1'), SETTINGS.dotscale.max, SETTINGS.diameter);
		}
		
		resize();
		
		startLine();
	}
	
	function clickDot(e){
		var $this = $(this);
		
		//was clicked dot, correct dot?
		if($this.attr('data-dot')==activedot){
			//sound
			playRandomSound();
			
			//update previous dot
			if (curr < nums - 1) {
				$('#hello').lazylinepainter('setStop', curr);
				
				curr++;
				
				directBunny(curr);
				
				$('.dot' + (curr-1) + ' .tracking__scale').removeClass('blink').addClass('used').css('border', SETTINGS.theme.stroke+' solid 10px');
				$('.dot' + (curr-1)).css({'cursor': 'default', 'z-index':curr-1}).off('click', clickDot);
				$('.dot' + (curr-1) + ' .tracking__scale').html('');
				$('.dot' + (curr-1) + ' .tracking__hitbox').hide();
				setDotScale($('.dot' + (curr-1)), SETTINGS.dotscale.min, SETTINGS.diameter);
				
				//$('.dot' + (curr-2) + ' .tracking__scale').css('border', 'none');
				//setDotScale($('.dot' + (curr-2) + ' .tracking__scale'), SETTINGS.dotscale.min, SETTINGS.diameter);
			
				$("#hello").lazylinepainter('resume');
			}else{
				directBunny(curr+1, true);
				endLine();
				hideDots();
				$('#hint').hide();
				//$('#next').addClass('blink');
				$('#next').delay(2500).animate({'top':'-50px'}, 400, function(){
					$('#nextbig').animate({'bottom':'20px'}, 500)
				})
				$("#hello").lazylinepainter('resume');	
			}
		}else{
			//show hint if 3 wrong clicks
			if(!SETTINGS.help){
				wrongs++;
				if(wrongs==3){
					$('#hint').trigger('click');
					playS(s_hint);
				}else{
					playS(s_wrong);
				}
			}
		}
	}
	
	function nextDot(e){
		//console.log('activated: '+e.detail)
		activedot = e.detail;
		
		if(SETTINGS.help){
			$('.dot' + e.detail + ' .tracking__scale').addClass('on blink');
			setDotScale($('.dot' + e.detail), SETTINGS.dotscale.max, SETTINGS.diameter);
		}
	}
	
	function hideDot(d){
		$('.dot'+d).hide();
		if(ds>0){
			ds--;
			setTimeout(hideDot.bind(null, ds), 30);
		}else{
			playS(s_reveal);
		}
	}
	
	function hideDots(){
		setTimeout(hideDot.bind(null, ds), 30);
	}

	function setPosition(el, x, y) {
		var css = 'translate3d(' + x + 'px, ' + y + 'px,0)';
		setCss(el, css);
	};

	function setScale(el, scale) {
		var css = ' scale(' + scale + ', ' + scale + ')';
		setCss(el, css);
	};
	
	function setDotScale(el, scale, diameter){
		var radius = diameter * 0.5;
		el.css({
			'width': diameter,
			'height': diameter
		});
		//var css = ' translate3d(' + -radius + 'px, ' + -radius + 'px,0) scale(' + scale + ', ' + scale + ')';
		var css = ' scale(' + scale + ', ' + scale + ')';
		setCss(el, css);
	}

	function setCss(el, css) {
		el[0].style.MozTransform = css;
		el[0].style.msTransform = css;
		el[0].style.OTransform = css;
		el[0].style.webkitTransform = css;
		el[0].style.transform = css;
	}
	
	/*
	
	PET MOVEMENT
	
	*/
	var lastdeg = 0;
	var goto = 0;
	var dist = 0;
	function directBunny(n, last){
		$('.pet, .pet-shadow').css({'transform' : 'rotate('+ goto +'deg)'});
		if(!last){
			var rad = Math.atan2(ps[n-1].x-ps[n].x, ps[n-1].y-ps[n].y);
			var deg = -(rad * 180 / Math.PI);
			var dis = Math.sqrt( (ps[n-1].x-ps[n].x)*(ps[n-1].x-ps[n].x) + (ps[n-1].y-ps[n].y)*(ps[n-1].y-ps[n].y) );
			if(deg<0) { deg=360+deg; }
			var nR = deg, 
		    	rot = lastdeg || 0;
		    	aR = rot % 360;
		    if ( aR < 0 ) { aR += 360; }
		    if ( aR < 180 && (nR > (aR + 180)) ) { rot -= 360; }
		    if ( aR >= 180 && (nR <= (aR - 180)) ) { rot += 360; }
		    rot += (nR - aR);
			goto = rot;
		}
		
		var petimg;
		var hopt;
		if(dist>150){
			petimg = 'img/'+pet+'_hop.png';
			hopt = petSet[pet].imgswitch[0];
		}else{
			petimg = 'img/'+pet+'_hop_short.png';
			hopt = petSet[pet].imgswitch[1];
		}
		
		$('.petbox').css({'left':ps[n-1].x,'top':ps[n-1].y})
		$('.pet').css('background-image',"url("+petimg+")");
		setTimeout(function(){
			$('.pet').css('background-image',"url('img/"+pet+"_sit.png')");
		}, hopt)
		$('.pet').removeClass('pet-animation').outerWidth($('.pet').outerWidth).addClass('pet-animation animation-'+petSet[pet].transition);
		$('.pet-shadow').removeClass('pet-shadow-animation').outerWidth($('.pet-shadow').outerWidth).addClass('pet-shadow-animation animation-'+petSet[pet].transition);
		
		lastdeg = rot;
		dist = dis;
	}
	
	/*
	
	DOT to DOT touch drag
	
	*/
	var drawLine = false;
	var startPos = new Object();
	var finalPos = new Object();
	var offsetPos = new Object();
	var theCanvas, ctx;
	var currscale;
	function endLine(){
		drawLine = false;
		$("#hello").off('touchstart', ldown);
		$('#hello').off('touchmove', lmove)
		$('#hello').off('touchend', lup);
	}
	function startLine(){
		theCanvas = $("#particles .lines").get(0);
		ctx = theCanvas.getContext('2d');
		$("#hello").on('touchstart', ldown);
		$('#hello').on('touchmove', lmove)
		$('#hello').on('touchend', lup);
	}
	function ldown(e){
		drawLine = false;
		//console.log('touchdown');
		offsetPos = {x:($("#hello").offset().left), y:($("#hello").offset().top)}
		var px = e.pageX || e.originalEvent.touches[0].pageX;
		var py = e.pageY || e.originalEvent.touches[0].pageY;
		startPos = {x:(px-offsetPos.x)/currscale, y:(py-offsetPos.y)/currscale};
		//console.log(px+", "+py+" | "+offsetPos.x+", "+offsetPos.y+" | "+currscale);
		//console.log(startPos.x+", "+startPos.y);
		if(startPos.x>ps[activedot-1].x-50 && startPos.x<ps[activedot-1].x+50 && startPos.y>ps[activedot-1].y-50 && startPos.y<ps[activedot-1].y+50){
			startPos = {x:ps[activedot-1].x, y:ps[activedot-1].y}
			drawLine = true;
		}
		ctx.strokeStyle = SETTINGS.theme.stroke;
		ctx.lineWidth = 4;
		ctx.lineCap = 'round';
	}
	function lmove(e){
		//console.log('touchmove');
		if (drawLine === true) {
			var px = e.pageX || e.originalEvent.touches[0].pageX;
			var py = e.pageY || e.originalEvent.touches[0].pageY;
	        finalPos = {x:(px-offsetPos.x)/currscale, y:(py-offsetPos.y)/currscale};
			//console.log(px+", "+py+" | "+offsetPos.x+", "+offsetPos.y+" | "+currscale);
			//console.log(finalPos.x+", "+finalPos.y);
	        clearCanvas();
	        line();
			if(finalPos.x>ps[activedot].x-30 && finalPos.x<ps[activedot].x+30 && finalPos.y>ps[activedot].y-30 && finalPos.y<ps[activedot].y+30){
				clearCanvas();
				startPos = {x:ps[activedot].x, y:ps[activedot].y}
				$('.dot' + activedot).trigger('click');
			}
		}
	}
	function lup(){
		//console.log('touchup');
		drawline = false;
		line();
		clearCanvas();
        finalPos = {x:0, y:0};
        startPos = {x:0, y:0};
	}
	function line() {
		//console.log(startPos.x+", "+startPos.y+" >> "+finalPos.x+", "+finalPos.y);
		ctx.beginPath();
		ctx.setLineDash([5,10]);
		ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(finalPos.x, finalPos.y);
        ctx.stroke();
    }
	function clearCanvas()
    {
       ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    }
	
	/*
	
	RESIZE
	
	*/
	
	function resize(){
		var dW = document.documentElement.clientWidth,
			dH = document.documentElement.clientHeight,
			iW = $('#hello').width(),
			iH = $('#hello').height();
			
			$('.sketch').css({'width':dW, 'height':dH})
		
		var css, scale, d;
		
		if(dW>dH){
			scale = dH/iH;
		}else if(dH>dW){
			scale = dW/iW;
		}
		
		currscale = scale;
		
		scalediff = scale > 1 ? scale : 1;
		
		if(dW>dH){
			var cW = iW*scale;
			d = (dW-cW)/2;
			css = ' translateX(' + d + 'px) scale(' + scale + ', ' + scale + ')';
		}else if(dH>dW){
			var cH = iH*scale;
			d = (dH-cH)/2;
			css = ' translateY(' + d + 'px) scale(' + scale + ', ' + scale + ')';
		}
		
		if(dW>SETTINGS.svgW && dH>SETTINGS.svgH){
			var cW = iW*scale;
			var cH = iH*scale;
			dw = (dW-cW)/2;
			dh = (dH-cH)/2;
			css = ' translateX(' + dw + 'px) translateY(' + dh + 'px) scale(' + scale + ', ' + scale + ')';
		}
		
		setCss($('#hello'), css);
		setCss($('.lines'), css);
		
	}
	
	$(window).resize(resize);
	window.addEventListener("orientationchange", resize, false);
	
	
};