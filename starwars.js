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

//
// Tracery Grammar
//

var swGrammar = {
  episode: {
    "origin": ["I #fraction#", "II #fraction#", "III #fraction#", "IV #fraction#", 
        "V #fraction#", "VI #fraction#", "VII #fraction#", "VIII", "IX", 
        "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", 
        "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX",
        "XXX", "XXXI", "XXXII", "XXXIII", "XXXIV", 
        "XXXV", "XXXVI", "XXXVII", "XXXVIII", "XXXIX"],
    "fraction": ["¼", "½", "¾"]
  },

  title: {
    "origin": ["The #agent# #doesthis#", "#nounaction# of the #agent#", 
        "The #agent# Wars", "#shadowytitle#", "#shadowytitle#"],
    "nounaction": ["Return", "Revenge", "Strike", "Menace", "Flight", "War",
        "Revolution", "Terror", "Redemption", "Death", "Rise"],
    "doesthis": ["Strikes Back", "Returns", "Awakens", "Fights Back", 
        "Is Redeemed", "Is Lost", "Is Found"],
    "agent": ["Sith", "Jedi", "Apprentice", "Force", "Empire", "Rebel", "Padawan",
        "Republic", "Clone"],
    "shadowytitle": ["A #shadowyadjective# #shadowynoun#", 
        "The #shadowyadjective# #shadowynoun#", "A #shadowyadjective# #agent#"],
    "shadowyadjective": ["New", "Phantom", "Hidden", "Desperate", "Secret", "Lost"],
    "shadowynoun": ["Hope", "Menace", "Struggle", "Plan", "Sacrifice", "Crisis", 
        "Rescue"]
  },

  intro: {
    "opening": ["#[hero:#goodguy#][friend:#goodguy#][foe:#badguy#][foe2:#badguy#][foegroup:#badgroup#][foegroup2:#badgroup#][pp:#poss-pronoun#]storylet-opening#"],
    "storylet-opening": ["#snippet-opening#"],
    "snippet-opening": [
        "It is a period of civil war.",
        "It is a dark time for #goodgroup#.",
        "#hero# has returned to #place# in an attempt to #goodsmallgoal#.",
        "The taxation of trade routes to #place# is in dispute.",
        "Turmoil has engulfed #goodgroup#.",
        "There is unrest in #goodgroup#.",
        "War! Under attacks by #foe#Desperately, #goodgroup# is crumbling.",
        "#friend# has vanished. In #pp# absence, #foegroup# has risen from the ashes of #foegroup2# and will not rest until #friend# has been destroyed."
    ],
    "story": ["#[hero:#goodguy#][friend:#goodguy#][foe:#badguy#][foe2:#badguy#][foegroup:#badgroup#][foegroup2:#badgroup#][pp:#poss-pronoun#]storylet#"],
    "storylet": ["#snippet#"],
    "snippet": [
        "#goodgroup#, striking from a hidden base, have #good-done#.",
        "During the battle, #smallgoodgroup# #good-done#.",
        "Pursued by #foegroup#’s sinister agents, #hero# races home aboard #pp# starship, custodian of the stolen plans that can help #goodbiggoal#.",
        "Although #badthing# has been destroyed, #foegroup# have #bad-done#.",
        "Evading #foegroup#, #goodgroup# led by #hero# has #good-done#.",
        "Meanwhile, #foe#, obsessed with finding #friend#, has #bad-done#.",
        "Little does #hero# know that #foegroup# has #bad-done#.",
        "When completed, this ultimate weapon will spell certain doom for #goodgroup# struggling to #goodbiggoal#.",
        "Hoping to force the matter with #badthing#, #foegroup# has #bad-done#.",
        "While #goodgroup# endlessly debates this alarming chain of events, #hero# has #good-done#.",
        "Several thousand solar systems have declared their intentions to leave #goodgroup#.",
        "#foegroup#, under the leadership of #foe#, has #bad-done#.",
        "#hero# is returning to #place# to #goodsmallgoal#.",
        "There are heroes on both sides. Evil is everywhere.",
        "In a stunning move #foe# has #bad-done#.",
        "As #foegroup# attempts to flee #place# with their valuable hostage, #goodgroup# leads a desperate mission to #goodsmallgoal#.",
        "With the support of #goodgroup#, #hero# leads a brave RESISTANCE.",
        "#hero# is desperate to #goodsmallgoal#.",
        "#hero# has #good-done#."
        ],
    "good-done": //"the rebels have ..."
      ["won their first victory against #foegroup#",
        "managed to steal secret plans to #foegroup#’s ultimate weapon, #badthing#",
        "established a new secret base on #place#",
        "secretly dispatched #smallgoodgroup# to #goodsmallgoal#",
        "sent #pp# most daring pilot on a secret mission to #place#, where an old ally has discovered a clue to #friend#’s whereabouts"
      ],
    "bad-done": // "the empire has ..."
      ["driven #goodgroup# from their hidden base and pursued them across the galaxy",
        "dispatched thousands of remote probes into the far reaches of space",
        "secretly begun construction on #badthing#",
        "stopped all shipping to #place#",
        "made it difficult for #goodgroup# to #goodbiggoal#",
        "swept into #place# and kidnapped #friend#"
      ],
    "goodsmallgoal":
      ["rescue #pp# friend #friend# from the clutches of #foe2#",
        "vote on the critical issue of creating an army to assist #goodgroup#",
        "rescue the captive #friend#",
        "find #friend# and gain #pp# help in restoring peace and justice to the galaxy"
      ],
    "goodbiggoal":
      ["restore freedom to the galaxy", "settle the conflict",
        "maintain peace and order in the galaxy",
        "save #pp# people and restore freedom to the galaxy"
      ],
    "badsmallgoal":
      ["steal secret plans to #foegroup#’s ultimate weapon, #badthing#",
        "rescue #pp# friend #friend# from the clutches of #foe2#",
        "vote on the critical issue of creating an army to assist #goodgroup#",
        "rescue the captive #friend#",
        "find #friend# and gain #pp# help in restoring peace and justice to the galaxy"
      ],
    "goodguy": // "... has vanished"
        ["Luke Skywalker", "General Leia Organa", "Princess Leia", "Han Solo", 
          "Senator Amidala", "Senator Amidala former Queen of Naboo", "Queen Amidala of Naboo", 
          "Chancellor Palpatine", "Chancellor Palpatine leader of the Galactic Senate",
          "Skywalker", "Skywalker the last Jedi", 
          "Lando Calrissian", "Lando Calrissian the charming bandit",
          "Jedi Knight Anikan Skywalker", "General Jar Jar Binks Representative of the Naboo Senatorial Delegation",
          "Admiral Ackbar", "Jedi padawan Ahsoka Tano", "Jedi Biggs Darklighter", "Chewbacca",
          "former Stormtrouper Finn", "Jedi Grand Master Yoda", "Rey refugee from Jakku"
        ],
    "smallgoodgroup": // "... managed"
        ["two JEDI KNIGHTS", "REBEL spies", "Rebel droids R2-D2 and C3PO", "Rebel spaceships", 
          "Han Solo and Chewbacca", "Qui-Gon Jinn and Obi Wan Kenobi"
        ],
    "badguy": // "rescue his friend from the clutches of.."
        [
          "the Supreme Chancellor", "the ruthless Sith Lord Count Dooku", "the evil lord Darth Vader", 
          "the vile gangster Jabba the Hutt", "the mysterious Count Dooku",
          "the ruthless bountyhunter Boba Fett", 
          "the fiendish droid leader General Grievous",
          "the evil Sith lord Darth Sidius", "the cunning Emperor Palpatine",
          "the mysterious Kylo Ren", "Grand Moff Tarkin", "Jedi Knight Mace Windu",
          "the ruthless Bountyhunter Boba Fett", "Sith Lord Darth Maul", 
          "the mysterious Darth Sidious", "the unstopable Captain Phasma",
          "the deadly bountyhunter Greedo", "the scoundrel Nute Gunray", 
          "the Sith Lord Savage Opress"
        ],
    "goodgroup": // "... is crumbling"
        ["the Galactic Republic", "the Rebellion", "the force of Rebels", 
          "the order of Jedi Knights", "a group of freedom fighters", 
          "a small band of rebels", 
          "the Jedi order guardians of peace and justice in the galaxy",
          "the Galactic Senate", "the Republic", 
          "the congress of the Republic", "the ARMY OF THE REPUBLIC", 
          "the ancient REPUBLIC", "the brave RESISTANCE", 
          "the Galactic Senate", "the overwhelmed Jedi order"
        ],
    "badgroup": // "Evading ..."
        ["the Separatist Droid Army", "the dreaded Imperial Starfleet", 
          "the evil Galactic Empire", "Empire’s sinister agents", 
          "the Imperial army", "the GALACTIC EMPIRE", 
          "the greedy Trade Federation", "the separatist movement", 
          "the sinister FIRST ORDER", "Empire", "a band of Tusken Raiders", 
          "an army of Geonosian Soldiers"
        ],
    "place": // "stopped all shipping to..."
        ["the peaceful home world of Alderan", "their hidden base",
          "the remote ice world of Hoth", "the desert planet of Tatooine", 
          "the outlying star systems", "the small planet of Naboo",
          "the besieged capital", "Jakku", "the Republic capital",
          "Corouscant the heart of the REBUBLIC", 
          "the swamp planet of Dagoba", "Yavin IV, home of the Rebellion", 
          "the molten planet of Mustafar", "the industrial hub of Geonosis", 
          "the cloud city on Bespin", "Dantooine ancient home to the Jedi",
          "Mandalore", "Correlia"
        ],
    "badthing":
      ["the DEATH STAR, an armored space station with enough power to destroy an entire planet",
        "the DEATH STAR",
        "a new armored space station even more powerful than the first dreaded Death Star",
        "a blockade of deadly battleships",
        "#badguy#'s STAR DESTROYER"
      ],
    "poss-pronoun":
      ["his", "her"]
  }
}

String.prototype.initialCap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$(document).ready(function() {

    window.setTimeout(function() {

      el = $(".starwars");

      // Create tracery grammar
      var episode = tracery.createGrammar(swGrammar["episode"]);
      var title = tracery.createGrammar(swGrammar["title"]);
      var intro = tracery.createGrammar(swGrammar["intro"]);

      var animationEl = $('.animation');

      // Change Title
      fullTitle = "Episode " + episode.flatten('#origin#') + 
          "</br>" + title.flatten('#origin#');
      $('#episode-title').html(fullTitle);
      console.log(fullTitle)
      
      // Audio to play the opening crawl
      $('audio').get(0).play();
      
      // Start the animation
      //this.start = this.el.find('.start');
      
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

    }, 100);

});
