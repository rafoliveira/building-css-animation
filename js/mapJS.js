var level=1;
var lightsHTML="";
var lightsAre = 0;
var green;
var actualRoom;
var interval;

/*Buttons appear and floors open*/
$('.levels').on('click', function(){
    $(this).addClass('levels-open');
    $('.button-box').css({"visibility": "visible", "opacity": "1"});
    buttonsLock();
});

/*Level 1 was selected, rooms id showen*/
$('.level--1').on('click', function(){
    $('.levels').addClass('levels--selected-1');
    $('#textSVG').css({"opacity": "1"});
    $(this).addClass('level-current');
    $('.level').css('pointer-events','auto');
    level=1;
    buttonsLock();
});

/*Level 2 was selected, mouse events locked, floor unavailable*/
$('.level--2').on('click', function(){
    $('.levels').addClass('levels--selected-2');
    $(this).addClass('level-current');
    $('.level').css({"pointer-events": "none", "opacity": "0.5"});
    $('.unav2').css({"visibility": "visible", "opacity": "1"});
    level=2;
});

/*Level 3 was selected, mouse events locked, floor unavailable*/
$('.level--3').on('click', function(){
    $('.levels').addClass('levels--selected-3');
    $(this).addClass('level-current');
    $('.level').css({"pointer-events": "none", "opacity": "0.5"});
    $('.unav3').css({"visibility": "visible", "opacity": "1"});
    level=3;
    buttonsLock();
});

/*Button up was selected, change to the upper floor*/
$('#button-up').on('click', function(){
    $('.levels').removeClass('levels--selected-' + level).addClass('levels--selected-' + (level + 1));
    $('.level--' + level).removeClass('level-current')
    $('.level--' + (level + 1)).addClass('level-current');
    level+=1;
    $('.level').css({"pointer-events": "none", "opacity": "0.5"});

    /*Better i can do to hide this*/
    $('.unav'+ level).css({"visibility": "visible", "opacity": "1"});
    $('.unav'+ level-1).css({"visibility": "hidden", "opacity": "0"});
    /*Better i can do to hide this*/

    /*Make sure levels dont bug*/
    if(level>3){
        level=3;
    }

    buttonsLock();
});

/*Button level was selected, reset all tranformations with the levels and hide side bar*/
$('#button-level').on('click', function(){
    $('.levels').removeClass('levels-open');
    $('.levels').removeClass('levels--selected-' + level);
    $('.level--' + level).removeClass('level-current');

    /*Better i can do to hide this*/
    $('.unav2').css({"visibility": "hidden", "opacity": "0"});
    $('.unav3').css({"visibility": "hidden", "opacity": "0"});
    /*Better i can do to hide this*/

    $('.level').css({"pointer-events": "auto", "opacity": "1"});
    document.getElementById("infoSidenav").style.width = "0";
    $(this).css({"visibility": "hidden", "opacity": "0"});
    $('#button-up').css({"visibility": "hidden", "opacity": "0"});
    $('#button-down').css({"visibility": "hidden", "opacity": "0"});
    $('#textSVG').css({"opacity": "0"});
});

/*Button down was selected, change to the below floor*/
$('#button-down').on('click', function(){
    $('.levels').removeClass('levels--selected-' + level).addClass('levels--selected-' + (level - 1));
    $('.level--' + level).removeClass('level-current')
    $('.level--' + (level - 1)).addClass('level-current');
    level-=1;

    /*Better i can do to hide this*/
    console.log(level);
    $('.unav'+ level).css({"visibility": "visible", "opacity": "1"});
    $('.unav'+ (level+1)).css({"visibility": "hidden", "opacity": "0"});
    /*Better i can do to hide this*/

    /*Make sure levels dont bug*/
    if(level<1){
        level=1;
    }

    /*Condition to undo the locked events from upper floors*/
    if(level==1){
        $('#textSVG').css({"opacity": "1"});
        $('.level').css({"pointer-events": "auto", "opacity": "1"});
    }
    buttonsLock();
});

/*Lock buttons when needed*/
function buttonsLock(){
    if(level == 3){
        $('#button-up').css({"pointer-events": "none", "opacity": "0.5"});
        $('#button-down').css({"pointer-events": "auto", "opacity": "1"});
    }else if(level == 1){
        $('#button-down').css({"pointer-events": "none", "opacity": "0.5"});
        $('#button-up').css({"pointer-events": "auto", "opacity": "1"});

    }else{
        $('#button-down').css({"pointer-events": "auto", "opacity": "1"});
        $('#button-up').css({"pointer-events": "auto", "opacity": "1"});
    }
}

/*Room selected*/
$('path, text').on('click', function(event){
    if($( "#levelsid" ).hasClass( "levels-open" )){
        var iid =  $(this).attr('id').replace('text','');

        if(!(iid.includes('wc') || iid.includes('stairs'))){
            $("#roomTitle").text("Room 4." + iid + "");
            document.getElementById("infoSidenav").style.width = "450px";
            actualRoom = iid;
            getInfoFromSensors(iid);
        }
    }
});

function closeNav(){
    document.getElementById("infoSidenav").style.width = "0px";
}

jQuery(document).on('keyup',function(evt) {
    if (evt.keyCode == 27) {
        document.getElementById("infoSidenav").style.width = "0px";
    }
});

$('#toggleLight').on('click', function(){
  if(lightsAre == 0){
      document.getElementById("toggleLight").checked = true;
      $('.sucess').css({"color": "green"});        
      document.getElementById("suc1").innerHTML = "Lights turned on";
      lightsAre = 1;
  }else{
      document.getElementById("toggleLight").checked = false;
      $('.sucess').css({"color": "red"});        
      document.getElementById("suc1").innerHTML = "Lights turned off";
      lightsAre = 0;
  }
});


/*Info from the sensors put together*/
function getInfoFromSensors(roomid){
    var room = roomid.replace('.','');
    document.getElementById("suc1").innerHTML = "";
    
    var temp = Math.floor(Math.random() * 40) - 10;
    var hum = Math.floor(Math.random() * 101);
    var motion = Math.floor(Math.random() * 61);
    var sound = Math.floor(Math.random() * 61);
    var lum = Math.floor(Math.random() * 101);
    var light = Math.floor(Math.random() * 2);

    var res = {"Temperature": temp, "Humidity": hum, "Motion": motion, "Sound": sound, "Luminosity": lum, "Lights": light};
    document.getElementById("roomInfoRightTemp").innerHTML =  res['Temperature'] + '°C';
    document.getElementById("roomInfoRightHum").innerHTML =  res['Humidity'] + '%';

    var motion = res['Motion'];
    var motionHTML;
    if(motion <= 0){
        motionHTML = 'No Movement';
    }else if(motion < 20){
        motionHTML = 'Low Movement';
    }else if(motion < 40){
        motionHTML = 'Medium Movement';
    }else{
        motionHTML = 'High Movement';
    }

    var sound = res['Sound'];
    var soundHTML;
    if(sound <= 0){
        soundHTML = 'No Sound';
    }else if(sound < 20){
        soundHTML = 'Low Sound';
    }else if(sound < 40){
        soundHTML = 'Medium Sound';
    }else{
        soundHTML = 'High Sound';
    }

    document.getElementById("roomInfoRightSound").innerHTML =  soundHTML;
    document.getElementById("roomInfoRightMov").innerHTML =  motionHTML;
    document.getElementById("roomInfoRightBright").innerHTML =  res['Luminosity'] + '%';

    if(res['Lights'] == 1){
      document.getElementById("toggleLight").checked = true;
      lightsAre = 1;
    }else{
      document.getElementById("toggleLight").checked = false;
      lightsAre = 0;
    }
}
