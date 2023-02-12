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

//
// Tracery Grammar
//

var swGrammar = {
  episode: {
    "origin": ["Episode #oldones# #fraction#", "Episode #newones#", "Episode #newones# #fraction#", 
        "A Star Wars Story"],
    "oldones": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    "newones": ["X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", 
        "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX",
        "XXX", "XXXI", "XXXII", "XXXIII", "XXXIV", "XXXV", "XXXVI", "XXXVII", "XXXVIII", "XXXIX"],
    "fraction": ["¼", "½", "¾"]
  },

  title: {
    "origin": ["#the# #empire# #strikes-back#", "#return# of #the# #empire#", "The #empire# #wars#",  
        "#the# #new# #hope#", "#the# #new# #empire#",
        "#the# #rising# #hope#", 
        "The #shadow# of #the# #empire#", "#the# #shadow# of #hope#",
        "#the# #empire# #assassin#"],
    "the": ["The", "A"  ],  // later we fix A/An articles with magic regex
    "return": ["Return", "Revenge", "Strike", "Menace", "Flight", "War",
        "Revolution", "Terror", "Redemption", "Death", "Rise"],
    "strikes-back": ["Strikes Back", "Returns", "Awakens", "Fights Back", 
        "Is Redeemed", "Is Lost", "Is Found"],
    // agent
    "empire": ["Empire", "Sith", "Jedi", "Apprentice", "Force", "Rebel", "Padawan",
        "Republic", "Clone", "Enemy"],
    // shadowy adjective 
    "new": ["New", "Phantom", "Hidden", "Desperate", "Secret", "Lost", "Lethal"],
    // shadowy noun "a rising ..." 
    "hope": ["Hope", "Menace", "Struggle", "Sacrifice", "Crisis", 
        "Rescue", "Malevolence", "Mystery", "Doom", "Terror", "Dawn",
        "Temptation", "Influence"],
    "rising": ["Rising", "Coming", "Breaking", "Receeding"],
    "wars": ["Wars", "Battles", "Insurgency", "Rebellion"],
    "shadow": ["Shadow", "Cloak", "Lair", "Legacy", "Children", "Spies", "Ghosts", 
        "Plan", "Carnage", "Slaves"],
    // "The Jedi ..."
    "assassin": ["Assassin", "Trooper", "Agent", "Plans", "Cadet", "Spy", "Trap", 
        "Murders", "Rescue", "Attack", "Mission"]
  },

  intro: {
    "opening": ["#[hero:#goodguy#][friend:#goodguy#][foe:#badguy#][foe2:#badguy#][foegroup:#badgroup#][foegroup2:#badgroup#][pp:#poss-pronoun#]storylet-opening#"],
    "storylet-opening": ["#snippet-opening#"],
    "snippet-opening": [
        "It is a period of civil war.",
        "It is a dark time for #goodgroup#.",
        "#hero# has returned to #place# in an attempt to #goodsmallgoal#.",
        "Turmoil has engulfed #goodgroup#.",
        "There is unrest in #goodgroup#.",
        "War! Under attacks by #foe# #goodgroup# is crumbling.",
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
      "The taxation of trade routes to #place# is in dispute.",
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
    "good-done": [ //"the rebels have ..."
      "won their first victory against #foegroup#",
      "managed to steal secret plans to #foegroup#’s ultimate weapon, #badthing#",
      "established a new secret base on #place#",
      "secretly dispatched #smallgoodgroup# to #goodsmallgoal#",
      "sent #pp# most daring pilot on a secret mission to #place#, where an old ally has discovered a clue to #friend#’s whereabouts",
      "succeeded in a daring mission to destroy #foegroup#'s #badthing#",
      "united several #goodgroup# factions to defeat #foegroup#",
      "discovered a new ally in the fight against #foegroup#",
      "gathered intelligence that reveals #foegroup#’s #badthing#",
      "overthrown a corrupt government that was secretly working with #foegroup#",
      "negotiated a treaty with a previously neutral planet, adding them to #goodgroup#'s allies",
      "liberated a planet that was under the control of #foegroup#",
      "recruited new members to join the cause of #goodgroup#",
      "hired a team of smugglers to help #goodgroup# in their mission",
      "executed a successful sneak attack on #foegroup#'s stronghold",
      "rescued key leaders of #goodgroup# from #foegroup#'s custody",
      "captured a high-ranking #foegroup# official who was planning to betray #goodgroup#",
      "received valuable information from a defector from #foegroup#"
    ],
    "bad-done": [ // "the empire has ..." 
      "driven #goodgroup# from their hidden base and pursued them across the galaxy",
      "dispatched thousands of remote probes into the far reaches of space",
      "secretly begun construction on #badthing#",
      "stopped all shipping to #place#",
      "made it difficult for #goodgroup# to #goodbiggoal#",
      "swept into #place# and kidnapped #friend#",
      "seized control of #place# and established a tyrannical regime",
      "destroyed #place#",
      "plundered valuable resources from #place#",
      "imposed a brutal curfew on the people of #place#",
      "imposed martial law on the citizens of #place#",
      "imposed heavy taxes on the inhabitants of #place#",
      "enslaved the inhabitants of #place#",
      "invaded and occupied #place#",
      "imposed a strict trade embargo on #place#",
      "banned the practice of #goodthing# in #place#",
      "executed any who opposed them in #place#",
      "forced the people of #place# to work in inhumane conditions in their factories"
    ],
    "goodsmallgoal": [
      "rescue #pp# friend #friend# from the clutches of #foe2#",
      "vote on the critical issue of creating an army to assist #goodgroup#",
      "rescue the captive #friend#",
      "find #friend# and gain #pp# help in restoring peace and justice to the galaxy",
      "steal secret plans to #foegroup#’s ultimate weapon, #badthing#",
      "save the planet from destruction by #foegroup#'s army",
      "secure a diplomatic solution to the conflict between #goodgroup# and #foe2#",
      "protect the #goodgroup# from the threats posed by #foe2#",
      "uncover the truth behind #foe2#'s secret plans",
      "ensure that the voices of #goodgroup# are heard in the negotiations with #foe2#",
      "safeguard the lives of civilians caught in the crossfire of the conflict between #goodgroup# and #foe2#",
      "discover the source of #foe2#'s power and neutralize it",
      "prevent #foe2# from acquiring the ancient artifact that could change the balance of power in the galaxy",
      "expose #foe2#'s evil schemes to the galaxy",
      "reunite the families separated by the conflict between #goodgroup# and #foe2#",
      "find a way to communicate with the species threatened by #foe2#'s expansionist policies",
      "bring an end to the suffering of the people under the oppression of #foe2#",
      "rescue the hostages taken by #foe2#",
      "find and destroy the weapon that could annihilate the galaxy",
    ],
    "goodbiggoal": [
      "restore freedom to the galaxy", "settle the conflict",
      "maintain peace and order in the galaxy",
      "save #pp# people and restore freedom to the galaxy",
      "defeat the #foe2# and bring peace to the galaxy",
      "protect #pp# home planet from #badthing#",
      "bring justice to the galaxy and defeat the #foegroup#",
      "rescue the #friend# and end #badthing# in the galaxy",
      "unite the galaxy against #foegroup#",
      "restore balance to the Force and defeat #foegroup#",
      "find and destroy the #badthing# to save the galaxy",
      "find and protect the #friend# to defeat #foegroup#",
      "free #pp# people from the oppression of #foegroup#",
      "defend #pp# home planet from the #foegroup# invasion",
      "overthrow the #foe2# and restore democracy to the galaxy",
      "end the war and bring peace to the galaxy",
      "discover the truth behind #badthing# and defeat #foegroup#",
      "protect the galaxy from the threat of #badthing#",
      "defeat #foegroup# and their leader, #foe2#",
      "bring an end to the #badthing# plaguing the galaxy"
    ],
    "badsmallgoal": [
      "infiltrate the #goodgroup# base and steal their top-secret information",
      "kidnap the #pp# leader of #goodgroup# and hold them for ransom",
      "assassinate the key members of #goodgroup#",
      "sabotage #goodgroup#’s mission to save #friend#",
      "interfere with #goodgroup#’s plan to defeat #foe2#",
      "obstruct #goodgroup#’s mission to retrieve #badthing#",
      "steal valuable artifacts from #goodgroup#’s secret temple",
      "kidnap a member of #goodgroup# for leverage against them",
      "blackmail a member of #goodgroup# to gain access to their confidential information",
      "steal valuable resources from #goodgroup# to empower #foegroup#",
      "destroy #goodgroup#’s communication network to hinder their operations",
      "hijack a shipment of weapons destined for #goodgroup#",
      "disrupt #goodgroup#’s training exercises to weaken their army",
      "spy on #goodgroup# and report their activities to #foegroup#"
    ],
    "goodguy": [ // "... has vanished" 
      "Luke Skywalker", "General Leia Organa", "Princess Leia", "Han Solo", 
      "Senator Amidala", "Senator Amidala former Queen of Naboo", "Queen Amidala of Naboo", 
      "Chancellor Palpatine", "Chancellor Palpatine leader of the Galactic Senate",
      "Skywalker", "Skywalker the last Jedi", "Obi-Wan Kenobi",
      "Lando Calrissian", "Lando Calrissian the charming bandit", "Jedi Knight Mace Windu",
      "Jedi Knight Anakan Skywalker", "General Jar Jar Binks Representative of the Naboo Senatorial Delegation",
      "Admiral Ackbar", "Jedi Padawan Ahsoka Tano", "Jedi Biggs Darklighter", "Chewbacca",
      "former Stormtrooper Finn", "Jedi Grand Master Yoda", "Rey refugee from Jakku",
      "Padmé Amidala","R2-D2","C-3PO","Wedge Antilles","Bail Organa","Mon Mothma","General Lando Calrissian","Leia Organa Solo","Mon Mothma","Poe Dameron","BB-8","Amilyn Holdo","Lor San Tekka","Maz Kanata","K-2SO","Baze Malbus","Chirrut Îmwe","Rose Tico","Zorii Bliss","Jannah","Babu Frik","Chewbacca's son","Nien Nunb"
    ],
    "smallgoodgroup": [
      "two JEDI KNIGHTS", "REBEL spies", "Rebel droids R2-D2 and C3PO", "Rebel spaceships",
      "Han Solo and Chewbacca", "Qui-Gon Jinn and Obi Wan Kenobi", "a small group of Rebel pilots",
      "a handful of Jedi Padawans", "a squad of Rebel soldiers", "a group of Wookiee warriors",
      "a team of X-wing fighters", "a group of Ewok scouts", "a squad of Rebel Alliance commandos",
      "a team of Rebel smugglers", "a group of Bothan spies", "a small band of Resistance fighters",
      "a squad of A-wing pilots", "a team of Rebel astromech droids", "a group of Rebel fighters on the planet Hoth",
      "a small group of Rebel infiltrators"
    ],
    "badguy": [
      "the Supreme Chancellor", "the ruthless Sith Lord Count Dooku", "the evil lord Darth Vader", 
      "the vile gangster Jabba the Hutt", "the mysterious Count Dooku",
      "the fiendish droid leader General Grievous",
      "the evil Sith lord Darth Sidius", "the cunning Emperor Palpatine",
      "the mysterious Kylo Ren", "Grand Moff Tarkin", 
      "the ruthless bounty hunter Boba Fett", "Sith Lord Darth Maul", 
      "the mysterious Darth Sidious", "the unstoppable Captain Phasma",
      "the deadly bounty hunter Greedo", "the scoundrel Nute Gunray", 
      "the Sith Lord Savage Opress", "the power-hungry General Hux", 
      "the notorious criminal Dryden Vos", "the dangerous enforcer Kylo Ren",
      "the wicked Moff Gideon", "the corrupt Director Krennic",
      "the deceitful Snoke", "the bloodthirsty Darth Plagueis",
      "the savage General Grievous", "the manipulative Asajj Ventress",
      "the cunning Aurra Sing", "the brutal Commander Thire",
      "the treacherous Cad Bane",
      "the tyrannical Xizor",
      "the sadistic bounty hunter Aurra Sing",
      "the ruthless bounty hunter Jango Fett",
      "the powerful Darth Tyranus",
      "the cunning Darth Tyrant",
      "the malevolent Darth Malak",
      "the evil Darth Nihilus",
      "the brutal bounty hunter Dengar",
      "the deceitful bounty hunter Zuckuss",
      "the treacherous bounty hunter 4-LOM",
      "the dangerous bounty hunter Bossk",
      "the merciless bounty hunter IG-88",
      "the sinister bounty hunter Embo",
      "the cunning bounty hunter Cad Bane",
      "the brutal bounty hunter Latts Razzi",
      "the malevolent bounty hunter C-21 Highsinger",
      "the powerful bounty hunter Bazine Netal",
      "the merciless bounty hunter Oked"
    ],
    "goodgroup": [
      "the Galactic Republic", "the Rebellion", "the force of Rebels", 
      "the order of Jedi Knights", "a group of freedom fighters", 
      "a small band of rebels", 
      "the Jedi order guardians of peace and justice in the galaxy",
      "the Galactic Senate", "the Republic", 
      "the congress of the Republic", "the ARMY OF THE REPUBLIC", 
      "the ancient REPUBLIC", "the brave RESISTANCE", 
      "the Galactic Senate", "the overwhelmed Jedi order",
      "the heroic Alliance to Restore the Republic", "the determined Rebel Alliance",
      "the noble Republic Military", "the selfless Rebellion Fleet",
      "the courageous Rebel Pilots", "the steadfast Republic Troops",
      "the valiant Rebel Commanders", "the fearless Republic Generals",
      "the valiant Resistance Fighters", "the noble Resistance Heroes",
      "the inspiring New Republic", "the indomitable Republic Allies",
      "the gallant Republic Warriors", "the indomitable Republic Defenders"
    ],
    "badgroup": [
      "the Separatist Droid Army", "the dreaded Imperial Starfleet", 
      "the evil Galactic Empire", "the Empire’s sinister agents", 
      "the Imperial army", "the GALACTIC EMPIRE", 
      "the greedy Trade Federation", "the separatist movement", 
      "the sinister FIRST ORDER", "the Empire", "a band of Tusken Raiders", 
      "an army of Geonosian Soldiers", "the brutal Sith Warriors",
      "the tyrannical Trade Federation", "the malevolent First Order Stormtroopers",
      "the relentless Imperial Commanders", "the malevolent Sith Inquisitors",
      "the evil Trade Federation Armada", "the fearsome Imperial Navy",
      "the dark side of the Force", "the nefarious Imperial Intelligence",
      "the merciless Imperial TIE Fighter Pilots", "the brutal Imperial Troops",
      "the malicious First Order Flametroopers", "the malevolent Sith Troopers",
      "the oppressive First Order Snoke's Guard", "the villainous First Order Special Forces",
      "the treacherous Imperial Special Forces", "the malevolent Imperial High Command",
      "the sinister First Order Kylo Ren's Guard", "the evil First Order Executioners",
      "the brutal First Order TIE Pilots", "the malevolent First Order Special Forces",
      "the oppressive First Order Magma Troopers", "the malicious First Order Assault Walkers",
      "the evil First Order Heavy Artillery Walkers", "the cruel First Order Sentry Droids",
      "the sinister First Order Mega Star Destroyer", "the brutal First Order Cruiser",
      "the malevolent First Order Tie Interceptors", "the oppressive First Order Transports"
    ],
    "place": [
      "the peaceful home world of Alderan", "their hidden base",
      "the remote ice world of Hoth", "the desert planet of Tatooine",
      "the outlying star systems", "the small planet of Naboo",
      "the besieged capital", "Jakku", "the Republic capital of Coruscant",
      "the heart of the REPUBLIC, Coruscant", "the swamp planet of Dagobah",
      "Yavin IV, home of the Rebellion", "the fiery mining planet of Mustafar",
      "the industrial hub of Geonosis", "the cloud city on Bespin",
      "Dantooine, the ancient home to the Jedi", "Mandalore", "Corellia",
      "Kamino, the planet of the cloning facilities", "the desert planet of Jakku",
      "the remote jungle planet of Endor", "the gas giant of Bespin",
      "the oceanic planet of Kamino", "the desert planet of Tatooine",
      "the urban planet of Coruscant", "the Wookiee planet of Kashyyyk",
      "the remote planet of Crait", "the watery planet of Mon Cala",
      "the forest moon of Endor", "the treacherous planet of Kessel",
      "the asteroid field of Hoth", "the planet of Crait", "the lush planet of Kashyyyk",
      "the Jedi Temple on Coruscant", "the water world of Mon Cala",
      "the remote planet of Ahch-To", "the mountain planet of Crait",
      "the volcanic planet of Mustafar", "the asteroid belt of Hoth",
      "the desert planet of Jakku", "the ocean planet of Kamino",
      "the snow-covered planet of Hoth", "the swampy planet of Dagobah",
      "the forest moon of Endor", "the desert planet of Tatooine",
      "the remote planet of Crait", "the home world of the Wookiees, Kashyyyk",
      "the gas giant of Bespin", "the urban planet of Coruscant",
      "the remote planet of Ahch-To", "the treacherous planet of Kessel",
      "the asteroid belt of Hoth", "the Jedi Temple on Coruscant",
      "the remote planet of Jakku", "the forest moon of Endor"
    ],
    "badthing": [
      "the DEATH STAR, an armored space station with enough power to destroy an entire planet",
      "the DEATH STAR",
      "a new armored space station even more powerful than the first dreaded Death Star",
      "a blockade of deadly battleships",
      "#badguy#'s STAR DESTROYER",
      "an army of advanced BATTLE DROIDS units",
      "a massive WEAPONIZED LASER SATELLITE in orbit around the planet",
      "a powerful army of DARK TROOPERS",
      "a rogue AI unit controlling a huge space station",
      "an IMPERIAL SUPER-WEAPON capable of destroying entire planets",
      "a fleet of IMPERIAL-CLASS STAR DESTROYERS",
      "an IMPERIAL BATTLE CRUISER with heavy firepower",
      "a massive ARMORED ASSAULT SHIP controlled by the enemy",
      "a network of SPY DROIDSs infiltrating and gathering intelligence",
      "a secret IMPERIAL LABORATORY developing new weapons and technologies",
      "a giant IMPERIAL WAR FACTORY producing war machines and weapons",
      "a powerful IMPERIAL SHIELD GENERATOR protecting their stronghold",
      "a massive IMPERIAL BATTLE CRUISER equipped with heavy weapons",
      "an IMPERIAL BATTLE STATION capable of destroying entire planets",
      "a secret IMPERIAL WEAPONS DEPOT storing powerful weapons and technologies",
      "an IMPERIAL ENCLAVE hidden deep in the galaxy",
      "a powerful IMPERIAL WAR SHIP patrolling the galaxy",
      "a huge IMPERIAL FLEET dominating the space",
      "an IMPERIAL ARMY equipped with advanced weapons and technologies",
      "a powerful IMPERIAL NAVY controlling the space",
      "an IMPERIAL BATTLE GROUP with powerful starships",
      "a massive IMPERIAL DESTROYER equipped with heavy weapons",
      "an IMPERIAL TASK FORCE patrolling the galaxy",
      "a powerful IMPERIAL BATTLECRUISER equipped with the latest weapons and technologies"
    ],
    "poss-pronoun":
      ["his", "her"]
  }
}

String.prototype.initialCap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function fixArticles(string) {
    return string.replace(/(^| )A ([aeiou])/i, "$1An $2");
}

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

var episode, title, intro;

function createTraceryGrammar() {
  // Create tracery grammar
  episode = tracery.createGrammar(swGrammar["episode"]);
  title = tracery.createGrammar(swGrammar["title"]);
  intro = tracery.createGrammar(swGrammar["intro"]);

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
