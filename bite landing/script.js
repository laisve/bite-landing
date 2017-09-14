$(document).ready(function() {

  // Orai
  
  var ltMiestai = ['Druskininkai', 'Nida', 'Palanga', 'Klaipėda'];
  var kurortuMiestai = ['Nice, FR', 'Tenerife, ES', 'Mallorca, ES', 'Madrid, ES'];
  var resortTemp = [];
  var currentLt;
  var ltMinTemp;
  var current;
  var maxTemp;

  for(i = 0; i < ltMiestai.length; i++) {
    $.simpleWeather({
      location: ltMiestai[i]+ ', LT',
      woeid: '',
      unit: 'c',
      success: function(weather) { 
        if(currentLt) {
            if(currentLt["temp"] < weather.temp) {
            }
            else {
                minTempLt = {temp: weather.temp, miestas: weather.city, icon: weather.image};
                currentLt = minTempLt;
            }
        }
        else {
            minTempLt = {temp: weather.temp, miestas: weather.city, icon: weather.image};
            currentLt = minTempLt;
        }
        
        if(weather.temp > 0) {
            html = '<p>+' + currentLt["temp"] + '</p>';
            $('#lt').html(html);
        }
        else {
            html = '<p>' + currentLt["temp"] + '</p>';
            $('#lt').html(html);
        }
        
        if(currentLt["miestas"] == "Nidden") {
            miestas = "Nida";
        }
        else if(currentLt["miestas"] == "Palanga") {
            miestas = "Palanga";
        }
        else if(currentLt["miestas"] == "Klaipeda County") {
            miestas = "Klaipėda";
        }
        else if(currentLt["miestas"] == "Druskininkai") {
            miestas = "Druskininkai";
        }
        
        html1 = '<p>' + miestas + '</p>';
        $("#lt-town").html(html1);
        icon = '<i class="icon"><img src="'+ currentLt["icon"] + '"/></i>';
        $("#lt-icon").html(icon);
      },
       
      error: function(error) {
        $("#lt").html('<p style="font-size: 14px;">'+error+'</p>');
      }
    });
  }
 

  for (i = 0; i < kurortuMiestai.length; i++) {
    $.simpleWeather({
      location: kurortuMiestai[i],
      woeid: '',
      unit: 'c',
      success: function(weather) {
        if(current) {
            if(current["temp"] > weather.temp) {
                
            }
            else {
                maxTemp = {temp: weather.temp, miestas: weather.city, icon: weather.image};
                current = maxTemp;
            }
        }
        else {
            maxTemp = {temp: weather.temp, miestas: weather.city, icon: weather.image};
            current = maxTemp;
        }
        
        if(current["miestas"] == 'Nice') {
            kurortas = "Nica";
        }
        else if(current["miestas"] == 'Santa Cruz de Tenerife') {
            kurortas = "Tenerifė";
        }
        else if(current["miestas"] == 'Balearic Islands') {
            kurortas = "Maljorka";
        }
        else if(current["miestas"] == 'Madrid') {
            kurortas = "Madridas";
        }
        
        if(weather.temp > 0) {
          html = '<p>+'+ current["temp"] +'</p>';
          $("#eu").html(html);
        }
        else {
          html = '<p>'+weather.temp+'</p>';
          $("#eu").html(html);
        }

        html1 = '<p>'+ kurortas +'</p>'
        $("#south-town").html(html1);

        icon = '<i class="icon"><img src="'+ current["icon"] + '"/></i>';
        $("#south-icon").html(icon);
      },
      error: function(error) {
        $("#eu").html('<p style="font-size: 14px;">'+error+'</p>');
      }
    });
  }

  // Pelė (puslapio čiuožimas žemyn)
  
  $("#mouse").click(function() {
      $('html, body').animate({
          scrollTop: $("#main").offset().top
      }, 800);
  });

  // Vizualo slinkimas
  
  $(window).on("scroll", function() {
  
      var halfWin = $(window).height()/2;
      var image = $("#lenovo");
      var end = image.offset().top - halfWin;
      
      if($(window).scrollTop() < end) {
        image.animate({y: -250 * (1 - $(window).scrollTop()/end)}, 0);
      }
      else {
        image.animate({y: 0}, 0);
      }
   });

  // Navigacijos burbulai

  $(window).on("scroll", function() {
    var topBubble = $(".nav li:first-child a");
    var middleBubble = $(".nav li:nth-child(2) a");
    var bottomBubble = $(".nav li:last-child a");
    var position = middleBubble.offset().top;

    if(position <= $("#main").offset().top || position <= $(".slider").offset().top) {
      middleBubble.removeClass("current");
      middleBubble.addClass("simple");
      topBubble.removeClass("simple");
      topBubble.addClass("current");
      bottomBubble.removeClass("current");
      bottomBubble.addClass("simple");
      $(".nav a").css({'background-color': 'white'});
      $(".current").css({'border': '2px solid white', 'background-color': 'transparent'});
    }
    else if(position <= $("#photo-container").offset().top)  {
      $(".nav a").css('background-color', '#008738');
      $(".current").css({'background-color': 'transparent'});
      topBubble.addClass("simple");
      topBubble.removeClass("current");
      topBubble.css({'padding-left': '0', 'border': 'none'});
      bottomBubble.removeClass("current");
      bottomBubble.addClass("simple");
      bottomBubble.css('background-color', '#008738');
      middleBubble.addClass("current");
      middleBubble.css({'background-color': 'transparent'});
    }
    else if(position >= $("#photo-container").offset().top) {
      $(".current").css({'background-color': 'transparent'});
      topBubble.removeClass("current");
      topBubble.addClass("simple");
      topBubble.css({'background-color': '#008738', 'border': 'none'});
      middleBubble.addClass("simple");
      middleBubble.css('background-color', '#008738');
      middleBubble.removeClass("current");
      bottomBubble.addClass("current");
      bottomBubble.removeClass("simple");
    }
  })


  //Slideris

  $("#lenovo-savybes").click(function() {
    $(".grid-list").hide();
    $(".slider").slideDown(300);
  });

  $(".arrow-back").click(function() {
    $(".grid-list").show();
    $(".slider").hide();
  });


  var dot = $(".dot");
  var width = $(".slider-main").width();

  dot.click(function() {
    if (dot.hasClass("dot-active")) {
      dot.removeClass("dot-active");
    }
    $(this).addClass("dot-active");
  });


  $("#dot-2").click(function() {
    $(".slides").animate({
      marginLeft: '-100%'
    });
  });

  $("#dot-1").click(function() {
    $(".slides").animate({
      marginLeft: 0
    });
  })

  $("#dot-3").click(function() {
    $(".slides").animate({
      marginLeft: '-200%'
    });
  })

  $("#dot-4").click(function() {
    $(".slides").animate({
      marginLeft: '-300%'
    });
  })

  // Slideris mygtukais ir rodyklėmis

  $(document).keydown(function(e) {
    if(e.keyCode == 39) {
      if($("#dot-4").hasClass("dot-active")) {
        dot.first().trigger("click");
      }
      else {
        $(".dot-active").next().trigger("click");
      }
    }
    else if(e.keyCode == 37) {
      if($("#dot-1").hasClass("dot-active")) {
        dot.last().trigger("click");
      }
      else {
        $(".dot-active").prev().trigger("click");
      }
    }
  })

  var arrow = $(".slide-arrows i");

  arrow.click(function() {
    if(arrow.hasClass("slide-right")) {
      if($("#dot-4").hasClass("dot-active")) {
        dot.first().trigger("click");
      }
      else {
        $(".dot-active").next().trigger("click");
      }
    }
    else if(arrow.hasClass("slide-left")) {
      if($("#dot-1").hasClass("dot-active")) {
        dot.last().trigger("click");
      }
      else {
        $(".dot-active").prev().trigger("click");
      }
    }
  })

  // Popup'ai


  $("#salygos-1-lenovo").click(function() {
    $("#lenovo-salygos").show();
  })

  $(".close-button").click(function() {
    $(".popup").hide();
  })

  $("#lenovo-register").click(function() {
    $("#lenovo-registruotis").show();
  })

});
