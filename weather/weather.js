var WeatherFinder = {

getWeather(timeMillis, zone) {
   return this.weatherChances[zone](this.calculateForecastTarget(timeMillis));
},

calculateForecastTarget: function(timeMillis) { 
    // Thanks to Rogueadyn's SaintCoinach library for this calculation.
    // lDate is the current local time.

    var unixSeconds = parseInt(timeMillis / 1000);
    // Get Eorzea hour for weather start
    var bell = unixSeconds / 175;

    // Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
    var increment = (bell + 8 - (bell % 8)) % 24;

    // Take Eorzea days since unix epoch
    var totalDays = unixSeconds / 4200;
    totalDays = (totalDays << 32) >>> 0; // Convert to uint

    // 0x64 = 100
    var calcBase = totalDays * 100 + increment;

    // 0xB = 11
    var step1 = ((calcBase << 11) ^ calcBase) >>> 0;
    var step2 = ((step1 >>> 8) ^ step1) >>> 0;

    // 0x64 = 100
    return step2 % 100;
},

getEorzeaHour: function(timeMillis) {
    var unixSeconds = parseInt(timeMillis / 1000);
    // Get Eorzea hour
    var bell = (unixSeconds / 175) % 24;
    return Math.floor(bell);
},

getWeatherTimeFloor: function(date) {
    var unixSeconds = parseInt(date.getTime() / 1000);
    // Get Eorzea hour for weather start
    var bell = (unixSeconds / 175) % 24;
    var startBell = bell - (bell % 8);
    var startUnixSeconds = unixSeconds - (175 * (bell - startBell));
    return new Date(startUnixSeconds * 1000);
},

weatherChances: {
"Limsa Lominsa": function(chance) { if (chance < 20) { return "Wolkig"; } else if (chance < 50) { return "Klar"; } else if (chance < 80) { return "Heiter"; } else if (chance < 90) { return "Neblig"; } else { return "Regnerisch"; } },
"Middle La Noscea": function(chance) { if (chance < 20) { return "Wolkig"; } else if (chance < 50) { return "Klar"; } else if (chance < 70) { return "Heiter"; } else if (chance < 80) { return "Windig"; } else if (chance < 90) { return "Neblig"; } else { return "Regnerisch"; } },
"Lower La Noscea": function(chance) { if (chance < 20) { return "Wolkig"; } else if (chance < 50) { return "Klar"; } else if (chance < 70) { return "Heiter"; } else if (chance < 80) { return "Windig"; } else if (chance < 90) { return "Neblig"; } else { return "Regnerisch"; } },
"Eastern La Noscea": function(chance) { if (chance < 5) { return "Neblig"; } else if (chance < 50) { return "Klar"; } else if (chance < 80) { return "Heiter"; } else if (chance < 90) { return "Wolkig"; } else if (chance < 95) { return "Regnerisch"; } else { return "Wolkenbruch"; } },
"Western La Noscea": function(chance) { if (chance < 10) { return "Neblig"; } else if (chance < 40) { return "Klar"; } else if (chance < 60) { return "Heiter"; } else if (chance < 80) { return "Wolkig"; } else if (chance < 90) { return "Windig"; } else { return "Stürmisch"; } },
"Upper La Noscea": function(chance) { if (chance < 30) { return "Klar"; } else if (chance < 50) { return "Heiter"; } else if (chance < 70) { return "Wolkig"; } else if (chance < 80) { return "Neblig"; } else if (chance < 90) { return "Gewittrig"; } else { return "Gewitter"; } },
"Outer La Noscea": function(chance) { if (chance < 30) { return "Klar"; } else if (chance < 50) { return "Heiter"; } else if (chance < 70) { return "Wolkig"; } else if (chance < 85) { return "Neblig"; } else { return "Regnerisch"; } },
"Mist": function(chance) { if (chance < 20) { return "Wolkig"; } else if (chance < 50) { return "Klar"; } else if (chance < 70) { return "Heiter"; } else if (chance < 80) { return "Heiter"; } else if (chance < 90) { return "Neblig"; } else { return "Regnerisch"; } },
"Gridania": function(chance) { if (chance < 5) { return "Regnerisch"; } else if (chance < 20) { return "Regnerisch"; } else if (chance < 30) { return "Neblig"; } else if (chance < 40) { return "Wolkig"; } else if (chance < 55) { return "Heiter"; } else if (chance < 85) { return "Klar"; } else { return "Heiter"; } },
"Central Shroud": function(chance) { if (chance < 5) { return "Gewittrig"; } else if (chance < 20) { return "Regnerisch"; } else if (chance < 30) { return "Neblig"; } else if (chance < 40) { return "Wolkig"; } else if (chance < 55) { return "Heiter"; } else if (chance < 85) { return "Klar"; } else { return "Heiter"; } },
"East Shroud": function(chance) { if (chance < 5) { return "Gewittrig"; } else if (chance < 20) { return "Regnerisch"; } else if (chance < 30) { return "Neblig"; } else if (chance < 40) { return "Wolkig"; } else if (chance < 55) { return "Heiter"; } else if (chance < 85) { return "Klar"; } else { return "Heiter"; } },
"South Shroud": function(chance) { if (chance < 5) { return "Neblig"; } else if (chance < 10) { return "Gewitter"; } else if (chance < 25) { return "Gewittrig"; } else if (chance < 30) { return "Neblig"; } else if (chance < 40) { return "Wolkig"; } else if (chance < 70) { return "Heiter"; } else { return "Klar"; } },
"North Shroud": function(chance) { if (chance < 5) { return "Neblig"; } else if (chance < 10) { return "Wolkenbruch"; } else if (chance < 25) { return "Regnerisch"; } else if (chance < 30) { return "Neblig"; } else if (chance < 40) { return "Wolkig"; } else if (chance < 70) { return "Heiter"; } else { return "Klar"; } },
"The Lavender Beds": function(chance) { if (chance < 5) { return "Wolkig"; } else if (chance < 20) { return "Regnerisch"; } else if (chance < 30) { return "Neblig"; } else if (chance < 40) { return "Wolkig"; } else if (chance < 55) { return "Heiter"; } else if (chance < 85) { return "Klar"; } else { return "Heiter"; } },
"Ul'dah": function(chance) { if (chance < 40) { return "Klar"; } else if (chance < 60) { return "Heiter"; } else if (chance < 85) { return "Wolkig"; } else if (chance < 95) { return "Neblig"; } else { return "Regnerisch"; } },
"Western Thanalan": function(chance) { if (chance < 40) { return "Klar"; } else if (chance < 60) { return "Heiter"; } else if (chance < 85) { return "Wolkig"; } else if (chance < 95) { return "Neblig"; } else { return "Regnerisch"; } },
"Central Thanalan": function(chance) { if (chance < 15) { return "Staubig"; } else if (chance < 55) { return "Klar"; } else if (chance < 75) { return "Heiter"; } else if (chance < 85) { return "Wolkig"; } else if (chance < 95) { return "Neblig"; } else { return "Regnerisch"; } },
"Eastern Thanalan": function(chance) { if (chance < 40) { return "Klar"; } else if (chance < 60) { return "Heiter"; } else if (chance < 70) { return "Wolkig"; } else if (chance < 80) { return "Neblig"; } else if (chance < 85) { return "Regnerisch"; } else { return "Wolkenbruch"; } },
"Southern Thanalan": function(chance) { if (chance < 20) { return "Gluthitze"; } else if (chance < 60) { return "Klar"; } else if (chance < 80) { return "Heiter"; } else if (chance < 90) { return "Wolkig"; } else { return "Neblig"; } },
"Northern Thanalan": function(chance) { if (chance < 5) { return "Klar"; } else if (chance < 20) { return "Heiter"; } else if (chance < 50) { return "Wolkig"; } else { return "Neblig"; } },
"The Goblet": function(chance) { if (chance < 40) { return "Klar"; } else if (chance < 60) { return "Heiter"; } else if (chance < 85) { return "Wolkig"; } else if (chance < 95) { return "Neblig"; } else { return "Regnerisch"; } },
"Mor Dhona": function(chance) {if (chance < 15) {return "Wolkig";}  else if (chance < 30) {return "Neblig";}  else if (chance < 60) {return "Unheimlich";}  else if (chance < 75) {return "Klar";}  else {return "Heiter";}},
"Ishgard": function(chance) {if (chance < 60) {return "Schnee";}  else if (chance < 70) {return "Heiter";}  else if (chance < 75) {return "Klar";}  else if (chance < 90) {return "Wolkig";}  else {return "Neblig";}},
"Coerthas Central Highlands": function(chance) {if (chance < 20) {return "Schneesturm";}  else if (chance < 60) {return "Schnee";}  else if (chance < 70) {return "Heiter";}  else if (chance < 75) {return "Klar";}  else if (chance < 90) {return "Wolkig";}  else {return "Neblig";}},
"Coerthas Western Highlands": function(chance) {if (chance < 20) {return "Schneesturm";}  else if (chance < 60) {return "Schnee";}  else if (chance < 70) {return "Heiter";}  else if (chance < 75) {return "Klar";}  else if (chance < 90) {return "Wolkig";}  else {return "Neblig";}},
"The Sea Of Clouds": function(chance) {if (chance < 30) {return "Klar";}  else if (chance < 60) {return "Heiter";}  else if (chance < 70) {return "Wolkig";}  else if (chance < 80) {return "Neblig";}  else if (chance < 90) {return "Windig";}  else {return "Schattengewitter";}},
"Azys Lla": function(chance) {if (chance < 35) {return "Heiter";}  else if (chance < 70) {return "Wolkig";}  else {return "Gewittrig";}},
"The Dravanian Forelands": function(chance) {if (chance < 10) {return "Wolkig";}  else if (chance < 20) {return "Neblig";}  else if (chance < 30) {return "Gewittrig";}  else if (chance < 40) {return "Staubig";}  else if (chance < 70) {return "Klar";}  else {return "Heiter";}},
"The Dravanian Hinterlands": function(chance) {if (chance < 10) {return "Wolkig";}  else if (chance < 20) {return "Neblig";}  else if (chance < 30) {return "Regnerisch";}  else if (chance < 40) {return "Wolkenbruch";}  else if (chance < 70) {return "Klar";}  else {return "Heiter";}},
"The Churning Mists": function(chance) {if (chance < 10) {return "Wolkig";}  else if (chance < 20) {return "Stürmisch";}  else if (chance < 40) {return "Schattengewitter";}  else if (chance < 70) {return "Klar";}  else {return "Heiter";}},
"Idyllshire": function(chance) {if (chance < 10) {return "Wolkig";}  else if (chance < 20) {return "Neblig";}  else if (chance < 30) {return "Regnerisch";}  else if (chance < 40) {return "Wolkenbruch";}  else if (chance < 70) {return "Klar";}  else {return "Heiter";}},
// Data format changed from aggregate to marginal breakpoints
"Rhalgr's Reach": function(chance) { if ((chance -= 15) < 0) { return "Klar"; } else if ((chance -= 45) < 0) { return "Heiter"; } else if ((chance -= 20) < 0) { return "Wolkig"; } else if ((chance -= 10) < 0) { return "Neblig"; } else { return "Gewittrig"; } },
"The Fringes": function(chance) { if ((chance -= 15) < 0) { return "Klar"; } else if ((chance -= 45) < 0) { return "Heiter"; } else if ((chance -= 20) < 0) { return "Wolkig"; } else if ((chance -= 10) < 0) { return "Neblig"; } else { return "Gewittrig"; } },
"The Peaks": function(chance) { if ((chance -= 10) < 0) { return "Klar"; } else if ((chance -= 50) < 0) { return "Heiter"; } else if ((chance -= 15) < 0) { return "Wolkig"; } else if ((chance -= 10) < 0) { return "Neblig"; } else if ((chance -= 10) < 0) { return "Windig"; } else { return "Staubig"; } },
"The Lochs": function(chance) { if ((chance -= 20) < 0) { return "Klar"; } else if ((chance -= 40) < 0) { return "Heiter"; } else if ((chance -= 20) < 0) { return "Wolkig"; } else if ((chance -= 10) < 0) { return "Neblig"; } else { return "Gewitter"; } },
"Kugane": function(chance) { if ((chance -= 10) < 0) { return "Regnerisch"; } else if ((chance -= 10) < 0) { return "Neblig"; } else if ((chance -= 20) < 0) { return "Wolkig"; } else if ((chance -= 40) < 0) { return "Heiter"; } else { return "Klar"; } },
"The Ruby Sea": function(chance) { if ((chance -= 10) < 0) { return "Gewittrig"; } else if ((chance -= 10) < 0) { return "Windig"; } else if ((chance -= 15) < 0) { return "Wolkig"; } else if ((chance -= 40) < 0) { return "Heiter"; } else { return "Klar"; } },
"Yanxia": function(chance) { if ((chance -= 5) < 0) { return "Wolkenbruch"; } else if ((chance -= 10) < 0) { return "Regnerisch"; } else if ((chance -= 10) < 0) { return "Neblig"; } else if ((chance -= 15) < 0) { return "Wolkig"; } else if ((chance -= 40) < 0) { return "Heiter"; } else { return "Klar"; } },
"The Azim Steppe": function(chance) { if ((chance -= 5) < 0) { return "Stürmisch"; } else if ((chance -= 5) < 0) { return "Windig"; } else if ((chance -= 7) < 0) { return "Regnerisch"; } else if ((chance -= 8) < 0) { return "Neblig"; } else if ((chance -= 10) < 0) { return "Wolkig"; } else if ((chance -= 40) < 0) { return "Heiter"; } else { return "Klar"; } },
"Eureka": function(chance) { if ((chance -= 30) < 0) { return "Heiter"; } else if ((chance -= 30) < 0) { return "Stürmisch"; } else if ((chance -= 30) < 0) { return "Wolkenbruch"; } else { return "Schnee"; } }
},

weatherLists: {
"Limsa Lominsa": ["Wolkig","Klar","Heiter","Neblig","Regnerisch"],
"Middle La Noscea": ["Wolkig","Klar","Heiter","Windig","Neblig","Regnerisch"],
"Lower La Noscea": ["Wolkig","Klar","Heiter","Windig","Neblig","Regnerisch"],
"Eastern La Noscea": ["Neblig","Klar","Heiter","Wolkig","Regnerisch","Wolkenbruch"],
"Western La Noscea": ["Neblig","Klar","Heiter","Wolkig","Windig","Stürmisch"],
"Upper La Noscea": ["Klar","Heiter","Wolkig","Neblig","Gewittrig","Gewitter"],
"Outer La Noscea": ["Klar","Heiter","Wolkig","Neblig","Regnerisch" ],
"Mist": ["Wolkig","Klar","Heiter","Neblig","Regnerisch" ],
"Gridania": ["Regnerisch","Neblig","Wolkig","Heiter","Klar"],
"Central Shroud": ["Gewittrig","Regnerisch","Neblig","Wolkig","Heiter","Klar"],
"East Shroud": ["Gewittrig","Regnerisch","Neblig","Wolkig","Heiter","Klar"],
"South Shroud": ["Neblig","Gewitter","Gewittrig","Wolkig","Heiter","Klar"],
"North Shroud": ["Neblig","Wolkenbruch","Regnerisch","Wolkig","Heiter","Klar"],
"The Lavender Beds": ["Wolkig","Regnerisch","Neblig","Heiter","Klar"],
"Ul'dah": ["Klar","Heiter","Wolkig","Neblig","Regnerisch"],
"Western Thanalan": ["Klar","Heiter","Wolkig","Neblig","Regnerisch"],
"Central Thanalan": ["Staubig","Klar","Heiter","Wolkig","Neblig","Regnerisch"],
"Eastern Thanalan": ["Klar","Heiter","Wolkig","Neblig","Regnerisch","Wolkenbruch"],
"Southern Thanalan": ["Gluthitze","Klar","Heiter","Wolkig","Neblig"],
"Northern Thanalan": ["Klar","Heiter","Wolkig","Neblig"],
"The Goblet": ["Klar","Heiter","Wolkig","Neblig","Regnerisch"],
"Mor Dhona": ["Wolkig", "Neblig", "Unheimlich", "Klar", "Heiter"],
"Ishgard": ["Schnee", "Heiter", "Klar", "Wolkig", "Neblig"],
"Coerthas Central Highlands": ["Schneesturm", "Schnee", "Heiter", "Klar", "Wolkig", "Neblig"],
"Coerthas Western Highlands": ["Schneesturm", "Schnee", "Heiter", "Klar", "Wolkig", "Neblig"],
"The Sea of Wolkig": ["Klar", "Heiter", "Wolkig", "Neblig", "Windig", "Schattengewitter"],
"Azys Lla": ["Heiter", "Wolkig", "Gewittrig"],
"The Dravanian Forelands": ["Wolkig", "Neblig", "Gewittrig", "Staubig", "Klar", "Heiter"],
"The Dravanian Hinterlands": ["Wolkig", "Neblig", "Regnerisch", "Wolkenbruch", "Klar", "Heiter"],
"The Churning Mists": ["Wolkig", "Stürmisch", "Schattengewitter", "Klar", "Heiter"],
"Idyllshire": ["Wolkig", "Neblig", "Regnerisch", "Wolkenbruch", "Klar", "Heiter"],
"Rhalgr's Reach": ["Klar","Heiter","Wolkig","Neblig","Gewittrig"],
"The Fringes": ["Klar","Heiter","Wolkig","Neblig","Gewittrig"],
"The Peaks": ["Klar","Heiter","Wolkig","Neblig","Windig","Staubig"],
"The Lochs": ["Klar","Heiter","Wolkig","Neblig","Gewitter"],
"Kugane": ["Regnerisch","Neblig","Wolkig","Heiter","Klar"],
"The Ruby Sea": ["Gewittrig","Windig","Wolkig","Heiter","Klar"],
"Yanxia": ["Wolkenbruch","Regnerisch","Neblig","Wolkig","Heiter","Klar"],
"The Azim Steppe": ["Stürmisch","Windig","Regnerisch","Neblig","Wolkig","Heiter","Klar"],
"Eureka": ["Heiter", "Stürmisch", "Wolkenbruch", "Schnee"]
}
};
