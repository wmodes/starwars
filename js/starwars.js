/*
 * Star Wars opening crawl
 * Author: Wes Modes (wmodes@gmail.com)
 * Created: 8 Jan 2017
 * 
 * Using Tracery by Kate Compton
 * https://github.com/galaxykate/tracery
 *
 * Adabted from work by Tim Pietrusky
 * timpietrusky.com
 * http://timpietrusky.com/star-wars-opening-crawl-from-1977
 *
 * Previously adapted from work by Craig Buckler 
 * http://www.sitepoint.com/css3-starwars-scrolling-text/ 
 *
 * Sound copyright by The Walt Disney Company.
 * 
 */

var soundurl = "../audio/Star_Wars_original_opening_crawl_1977.mp3";


String.prototype.initialCap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function fixArticles(string) {
    return string.replace(/(^| )A ([aeiou])/i, "$1An $2");
}

function createTraceryGrammar() {
  // Create tracery grammar
  // assumes tracery grammar is already loaded
  episode = tracery.createGrammar(grammar["episode"]);
  title = tracery.createGrammar(grammar["title"]);
  intro = tracery.createGrammar(grammar["intro"]);

  // Change Title
  titleText = fixArticles(title.flatten('#origin#')).trim().toUpperCase();
  episodeText = episode.flatten('#origin#');
  if (episodeText.includes("Story")) {
    fullTitleText = titleText + "</br>" + episodeText;
  } else {
    fullTitleText = episodeText + "</br>" + titleText;
  }
  
  $('#episode-title').html(fullTitleText);
  console.log(fullTitleText)
}

function setupElements() {
  $("#long-time-ago").hide();
  $("#star-wars").hide();
  $("#crawl").hide();
  setTimeout(showLongTimeAgo, 3000);
}

function showLongTimeAgo() {
  $("#long-time-ago").fadeIn("slow");
}

function hideLongTimeAgo() {
  $("#long-time-ago").fadeOut("slow");
}

function startMusic() {
  $("#player")[0].play();
}

function scrollStarWars() {
  $("#star-wars").show();
  setTimeout(function(){
    $("#star-wars").hide();
  }, 8500);
}

function scrollTitles() {
  $('#crawl').show();
  // generate paragraphs
  $('#crawl-text').html("");
  my_para = intro.flatten('#opening#').initialCap();
  $('#crawl-text').append("<p>" + my_para + "</p>");
  console.log(my_para)
  for (i = 0; i < 4; i++) { 
    my_para = intro.flatten('#story#').initialCap();
    $('#crawl-text').append("<p>" + my_para + "</p>");
    console.log(my_para)
  }
}

function waitForTracery() {
  if (typeof tracery !== 'undefined') {
      // tracery is loaded, you can use it here
      main();
  } else {
      // tracery is not available yet, wait a bit and try again
      setTimeout(waitForTracery, 100);
  }
}

function main() {
  console.log("Tracery is loaded");

  // some globals
  var episode, title, intro;

  //setup everything
  setupElements();
  createTraceryGrammar();

  // activate everyting when visitor clicks on a-long-time-ago
  $("#long-time-ago").click(function(){

    // hide a-long-time-ago
    hideLongTimeAgo();

    // scroll star wars logo
    setTimeout(function(){
      scrollStarWars();
      startMusic();
    }, 2500)

    // scroll titles
    setTimeout(function(){
      scrollTitles();
    }, 2500 + 5000)
    
    // Start the animation
    //this.start = this.el.find('.start');
  })
}

$(document).ready(function() {
  waitForTracery();
});
