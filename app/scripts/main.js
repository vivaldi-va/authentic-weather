var latitude, longitude, temp;
var spinnerTarget = document.getElementById('app');

var spinnerOpts = {
    lines: 13, // The number of lines to draw
    length: 5, // The length of each line
    width: 3, // The line thickness
    radius: 10, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#333', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};

var spinner = new Spinner(spinnerOpts);



function checkAppCache() {
    var appCache = window.applicationCache;

    console.log(window.applicationCache.status);
    /*switch (appCache.status) {
     case 0: // UNCACHED == 0
     return 'UNCACHED';
     break;
     case 1: // IDLE == 1
     return 'IDLE';
     break;
     case 2: // CHECKING == 2
     return 'CHECKING';
     break;
     case 3: // DOWNLOADING == 3
     return 'DOWNLOADING';
     break;
     case 4:  // UPDATEREADY == 4
     return 'UPDATEREADY';
     break;
     case 5: // OBSOLETE == 5
     return 'OBSOLETE';
     break;
     default:
     return 'UKNOWN CACHE STATUS';
     break;
     } */

    appCache.update(); // Attempt to update the user's cache.
    if (appCache.status === 4) {
        appCache.swapCache();  // The fetch was successful, swap in the new cache.
    }
}




function getConditions(city) {
    var city = city || null;

    if (city === null) {
        $.ajax({
            url: 'http://api.wunderground.com/api/4ca15b8f3c013e20/geolookup/q/' + latitude + ',' + longitude + '.json',
            type: 'get',
            dataType: 'jsonp',
            success: function (location) {
                spinner.stop();
                console.log(latitude + ', ' + longitude);
                console.log(location);
                console.log(city = location.location.city);
                city = location.location.city;
                $.ajax({
                    url: 'http://api.wunderground.com/api/4ca15b8f3c013e20/conditions/q/' + city + '.json',
                    type: 'get',
                    dataType: 'jsonp',
                    success: function (data) {
                        console.log(data);

                        setText(data.current_observation.temp_c, data.current_observation.icon, data.current_observation.display_location.city);


                    },
                    fail: function(data, error) {
                        $("#message").html("something went wrong");
                        $("#message").append('<small>restart this shit (sorry)</small>');
                    }
                });



            },
            fail: function (data, error) {
                console.log('shit done failed');
            }
        });


    }
}

function setText(temp, condition, city) {
    console.log(temp + ", " + condition + ", " + city);
    var tempMessage, conditionsMessage, conditionsDesc, conditionsIcon, cityString;

    var roasting, hot, warm, temperate, cold, freezing, siberia;

    roasting = 50;
    hot = 40;
    warm = 30;
    temperate = 20;
    cold = 10;
    freezing = -10;
    siberia = -20;

    var time = new Date().getHours();
    console.log(time);
    if (temp === null) {
        tempMessage = ')';
    }
    else if(temp > temperate) {
        $("#message").removeClass('grey');
        $("#message").removeClass('cold');
        $("#message").addClass('warm');
    }
    else if (temp <= temperate && temp > cold) {
        $("#message").removeClass('cold');
        $("#message").removeClass('warm');
        $("#message").addClass('grey');
    }
    else {
        $("#message").addClass('cold');
        $("#message").removeClass('grey');
        $("#message").removeClass('warm');
    }

    //cityString = city || 'Earth';

    if (city === undefined) {
        cityString  = 'Earth';
    }

    var conditionsMessageArrayCold = [];
    var conditionsMessageArrayWarm = [];
    var conditionsDescArrayWarm = [];
    var conditionsDescArrayCold = [];
    var conditionsMessageArray = [];
    var conditionsDescArray = [];

    var day = time < 18 || time < 6;
    var night = time > 18 || time > 6;

    function getRandMessage(){
        conditionsMessage = conditionsMessageArray[Math.floor(Math.random() * conditionsMessageArray.length)];
        conditionsDesc = conditionsDescArray[Math.floor(Math.random() * conditionsDescArray.length)];
        console.log(conditionsMessage);
        console.log(Math.floor(Math.random() * conditionsMessageArray.length));
        console.log(Math.floor(Math.random() * conditionsDescArray.length));
    }

    // Math.floor(Math.random() * messages.length)
    switch (condition) {
        case 'clear':
            console.log("it's clear, probably");

            if (temp < siberia) {
                console.log("siberia");

                if (day) {
                    /*
                        DAY
                     */
                    conditionsMessageArray = [
                        "It's clear but <em>fucking FREEZING!</em>"
                    ];

                    conditionsDescArray = [
                        "Hoth looks like a nice place to take a vacation",
                        "Where the fuck are you, Siberia?",
                        "This is why they invented vodka...",
                        "My nose is frozen shut!",
                        "Your blood will freeze",
                        "I cant stress that last part enough"
                    ];
                } else {
                    /*
                            NIGHT
                     */
                    conditionsMessageArray = [
                        "It's just dark and <em>fucking FREEZING!</em>"
                    ];

                    conditionsDescArray = [
                        "Hoth looks like a nice place to take a vacation",
                        "Where the fuck are you, Siberia?",
                        "This is why they invented vodka...",
                        "Well, at least the stars are out",
                        "Daylight will come, maybe&elip;",
                        "Got any furniture to burn?"

                    ];
                }

                console.log(conditionsMessageArray);



                conditionsIcon = 'G';
            }
            else if (temp < freezing) {
                console.log("freezimg");


                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's clear but fucking <em>cold!</em>"
                    ];
                    conditionsDescArray = [
                        "Breathing hurts",
                        "Just go back to bed",
                        "Layer up, bud"
                    ];
                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's clear, but <em>fucking cold!</em> and dark."
                    ];
                    conditionsDescArray = [
                        "Breathing hurts",
                        "Just go back to bed",
                        "Layer up, bud",
                        "Star-gaze from your bedroom",
                        "Don't bother getting up"
                    ];
                }

                conditionsIcon = 'G';
            }
            else if (temp < cold) {


                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's clear and sunny, but <em>rather cold.</em>"
                    ];

                    conditionsDescArray = [
                        "Winter is <i>still</i> here?",
                        "You don't need to go outside anyway",
                        "That sunshine is not what it seems"
                    ];


                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's clear, but dark and <em>rather cold.</em>"
                    ];
                    conditionsDescArray = [
                        "Cheer up Chuck",
                        "Winter is <i>still</i> here?",
                        "You don't need to go outside anyway"
                    ];
                }

                conditionsIcon = 'G';
            }
            else if (temp <= temperate) {

                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's clear and a bit <em>chilly.</em>"
                    ];

                    conditionsDescArray = [
                        "Could be worse",
                        "At least it's not raining",
                        "You can almost feel the sun"
                    ];
                    conditionsIcon = 'B';


                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's clear, dark and a bit <em>cold.</em>"
                    ];

                    conditionsDescArray = [
                        "Could be worse",
                        "At least it's not raining",
                        "Yeah, it's night alright."
                    ];
                    conditionsIcon = 'C';
                }



            }
            else if (temp < warm) {


                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's <em>warm</em> and clear"
                    ];

                    conditionsDescArray = [
                        "Sun is shining, enjoy",
                        "Make the most of it",
                        "It's beach weather if you imagine hard enough",
                        "What's to say",
                        "Wear a t-shirt"
                    ];
                    conditionsIcon = 'B';


                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's <em>warm</em> and clear and dark"
                    ];

                    conditionsDescArray = [
                        "Let's hope it stays this way",
                        "What more is there to say",
                        "What are you doing up at this hour"
                    ];
                    conditionsIcon = 'C';
                }
            }
            else if (temp < hot) {


                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's just <em>hot</em>"
                    ];

                    conditionsDescArray = [
                        "Catch some rays",
                        "I hope your A/C still works",
                        "It's nice, don't complain"
                    ];
                    conditionsIcon = 'C';


                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's <em>hot</em> and dark"
                    ];

                    conditionsDescArray = [
                        "I hope your A/C still works",
                        "Sleep well",
                        "You wanted summer? Wel you got it."
                    ];
                    conditionsIcon = 'B';
                }

            }
            else if (temp < roasting) {


                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's roasting and <em>sunny as fuck</em>"
                    ];

                    conditionsDescArray = [
                        "I can hear my skin crackling",
                        "The road is melting",
                        "Not the best time to be of pale complexion",
                        "Water..."
                    ];
                    conditionsIcon = 'B';


                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's dark but fucking <em>roasting</em>"
                    ];

                    conditionsDescArray = [
                        "You're not going to survive the night",
                        "the fridge might work as a bed",
                        "Water..."
                    ];
                    conditionsIcon = '\'';
                }
            }
            else {
                conditionsMessageArray = [
                    "What the hell is going on"
                ];

                conditionsDescArray = [
                    "Something went all weird",
                    "something probably melted"
                ];

            }
            getRandMessage();
            break;
        case 'cloudy':

            if (temp < siberia) {



                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's cloudy and <em>fucking FREEZING!</em>"
                    ];

                    conditionsDescArray = [
                        "Everything is fucking white",
                        "Fuck..."
                    ];


                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's cloudy, dark and <em>fucking FREEZING!</em>"
                    ];

                    conditionsDescArray = [
                        "Can't see shit captain",
                        "Fuck...",
                        "Outside = bad"
                    ];
                }

                conditionsIcon = 'Y';
            }
            else if (temp < freezing) {


                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's cloudy and <em>cold as fuck</em>!"
                    ];

                    conditionsDescArray = [
                        "Breathing hurts",
                        "You really should stay in",
                        "Layer up, bud",
                        "Fuck winter"
                    ];


                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's cloudy, dark and <em>cold as fuck</em>!"
                    ];

                    conditionsDescArray = [
                        "Just go back to bed",
                        "Layer up, bud",
                        "Fuck winter"
                    ];
                }


                conditionsIcon = 'Y';
            }
            else if (temp < cold) {

                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's cloudy and <em>cold</em>"
                    ];

                    conditionsDescArray = [
                        "Winter is <i>still</i> here?",
                        "You don't need to go outside anyway",
                        "Dull and depressing enough for you?"
                    ];


                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's cloudy, <em>cold</em> and dark"
                    ];

                    conditionsDescArray = [
                        "Winter is <i>still</i> here?",
                        "You don't need to go outside anyway",
                        "Dull and depressing enough for you?"
                    ];

                }

                conditionsIcon = 'Y';
            }
            else if (temp <= temperate) {
                if (day) {
                    /*
                     DAY
                     */

                    conditionsMessageArray = [
                        "It's <em>cloudy</em> and a bit cold"
                    ];

                    conditionsDescArray = [
                        "Could be worse",
                        "At least it's not raining"
                    ];


                } else {
                    /*
                     NIGHT
                     */

                    conditionsMessageArray = [
                        "It's <em>cloudy</em>, dark and a cold"
                    ];

                    conditionsDescArray = [
                        "There's clouds up there, take my word for it",
                        "At least it's not raining"
                    ];

                }

                conditionsIcon = 'Y';
            }
            else if (temp > temperate) {


                if (day) {
                    /*
                     DAY
                     */


                    conditionsMessageArray = [
                        "It's <em>cloudy</em> and warm"
                    ];

                    conditionsDescArray = [
                        "I can smell rain",
                        "Make the most of it",
                        "It isn't <i>that</i> bad"
                    ];


                } else {
                    /*
                     NIGHT
                     */


                    conditionsMessageArray = [
                        "It's dark, <em>cloudy</em> and warm"
                    ];

                    conditionsDescArray = [
                        "I can smell rain",
                        "You'll sleep fine",
                        "Keep the window open"
                    ];

                }

                conditionsIcon = 'Y';
            }
            else if (temp > hot) {


                if (day) {
                    /*
                     DAY
                     */

                    conditionsMessageArray = [
                        "It's <em>cloudy</em> and hot"
                    ];

                    conditionsDescArray = [
                        "It's a bit sticky",
                        "Sweat it out",
                        "Hope your A/C works"
                    ];


                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's <em>cloudy</em>, dark and hot"
                    ];

                    conditionsDescArray = [
                        "It's a bit sticky",
                        "Sweat it out",
                        "Hope your A/C works"
                    ];

                }

                conditionsIcon = 'Y';
            }
            else if (temp >= roasting) {


                if (day) {
                    /*
                     DAY
                     */

                    conditionsMessageArray = [
                        "It's <em>cloudy</em> and fucking hot as hell"
                    ];

                    conditionsDescArray = [
                        "There's a river running down my face",
                        "Has your shirt dissolved yet?",
                        "How can you stand this?"
                    ];



                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's <em>cloudy</em>, dark but fucking hot as hell"
                    ];

                    conditionsDescArray = [
                        "Your bed will rot",
                        "Has your shirt dissolved yet?",
                        "You poor bastard",
                        "Try sleeping in an ice bath"
                    ];


                }

                conditionsIcon = 'Y';
            }
            getRandMessage();
            break;

        case 'flurries':
            if (temp < siberia) {


                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's windy, snowing and <em>cold as fuck</em>"
                    ];

                    conditionsDescArray = [
                        "Say goodbye to your face",
                        "The wind is knives",
                        "Just let the cabin fever do it's thing"

                    ];


                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's dark, windy, snowing and <em>cold as FUCK</em>"
                    ];

                    conditionsDescArray = [
                        "Outside is a bad idea",
                        "It's not worth it"
                    ];

                }

                conditionsIcon = 'U';
            }
            else if (temp < freezing) {



                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's <em>freezing</em> and there's flurries"
                    ];

                    conditionsDescArray = [
                        "Just stay inside",
                        "Layer up, bud",
                        "Fuck."
                    ];



                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's dark, windy, snowing and <em>cold as FUCK</em>"
                    ];

                    conditionsDescArray = [
                        "Just go back to bed",
                        "Stay inside, be productive"
                    ];

                }

                conditionsIcon = 'U';
            }
            else if (temp < cold) {



                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "Windy, <em>cold</em> and snowing"
                    ];

                    conditionsDescArray = [
                        "Winter is <i>still</i> here?"
                    ];



                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "Windy, <em>cold</em> and snowing"
                    ];

                    conditionsDescArray = [
                        "Just go back to bed",
                        "Look outside and see, then cry yourself to sleep"
                    ];

                }

                conditionsIcon = 'U';
            }
            else if (temp < temperate) {
                conditionsMessageArray = [
                    "<em>snow</em> at this time of the year?"
                ];

                conditionsDescArray = [
                    "Go home nature, you're drunk"
                ];


                conditionsIcon = 'U';
            }
            else if (temp < warm) {

                conditionsMessageArray = [
                    "This is just getting <em>silly</em>"
                ];

                conditionsDescArray = [
                    "What is this, dust?"
                ];

                conditionsIcon = 'U';
            }

            getRandMessage();
            break;
        case 'fog':

            if (temp < siberia) {



                if (day) {
                    /*
                     DAY
                     */
                    conditionsMessageArray = [
                        "It's foggy and <em>fucking FREEZING!</em>"
                    ];

                    conditionsDescArray = [
                        "Hoth looks like a nice place to take a visit",
                        "Where the fuck are you, Siberia?",
                        "This is why they invented vodka...",
                        "It's like breathing razor blades",
                        "That wasn't a polar bear was it...?",
                        "Don't fall in a crevasse",
                        "You're fucked."
                    ];

                    conditionsIcon = 'J';

                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's foggy and <em>fucking FREEZING!</em>"
                    ];

                    conditionsDescArray = [
                        "Keep your gun handy"
                    ];


                    conditionsIcon = 'K';

                }

            }
            else if (temp < freezing) {


                if (day) {
                    /*
                     DAY
                     */

                    conditionsMessageArray = [
                        "It's foggy and <em>freezing!</em>"
                    ];

                    conditionsDescArray = [
                        "Is there something moving out there?"
                    ];

                    conditionsIcon = 'J';

                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's foggy and <em>freezing!</em>"
                    ];

                    conditionsDescArray = [
                        "Is there something moving out there?"
                    ];


                    conditionsIcon = 'K';

                }
            }
            else if (temp < cold) {



                if (day) {
                    /*
                     DAY
                     */

                    conditionsMessageArray = [
                        "It's just foggy and <em>cold</em>"
                    ];

                    conditionsDescArray = [
                        "Silent Hill didn't look like this on the brochure",
                        "Spooky",
                        "Is anybody out there?"
                    ];

                    conditionsIcon = 'J';

                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's foggy and <em>cold</em> and dark"
                    ];

                    conditionsDescArray = [
                        "Is there something moving out there?"
                    ];

                    conditionsIcon = 'K';

                }


            }
            else if (temp < temperate) {

                if (day) {
                    /*
                     DAY
                     */

                    conditionsMessageArray = [
                        "It's just foggy and <em>ok</em>"
                    ];

                    conditionsDescArray = [
                        "Watch your step",
                        "At least it's not raining",
                        "I hope you're not driving"
                    ];

                    conditionsIcon = 'J';

                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's foggy, dark and <em>ok</em>"
                    ];

                    conditionsDescArray = [
                        "Watch your step",
                        "At least it's not raining",
                        "I hope you're not driving"
                    ];

                    conditionsIcon = 'K';

                }
            }
            else if (temp < warm) {



                if (day) {
                    /*
                     DAY
                     */

                    conditionsMessageArray = [
                        "It's just foggy and <em>warm</em>"
                    ];

                    conditionsDescArray = [
                        "I cant see my hand in front of my face",
                        "This is no place for clouds"
                    ];

                    conditionsIcon = 'J';

                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's dark, foggy and <em>warm</em>"
                    ];

                    conditionsDescArray = [
                        "I cant see my hand in front of my face",
                        "Can't see shit captain"
                    ];

                    conditionsIcon = 'K';

                }
            }
            else if (temp < hot) {


                if (day) {
                    /*
                     DAY
                     */

                    conditionsMessageArray = [
                        "It's foggy and <em>hot</em>"
                    ];

                    conditionsDescArray = [
                        "Where's the sun?"
                    ];

                    conditionsIcon = 'J';

                } else {
                    /*
                     NIGHT
                     */
                    conditionsMessageArray = [
                        "It's foggy and <em>hot</em>"
                    ];

                    conditionsDescArray = [
                        "Eh"
                    ];

                    conditionsIcon = 'K';

                }
            }
            else if (temp < roasting) {

                conditionsMessageArray = [
                    "It's <em>foggy</em> and roasting"
                ];

                conditionsDescArray = [
                    "The oceans must have boiled over",
                    "Being steamed alive must feel great"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'K';
                }
                else {
                    conditionsIcon = 'J';
                }
            }
            getRandMessage();
            break;
        case 'hazy':

            if (temp < siberia) {
                conditionsMessageArray = [
                    "It's <em>hazy</em> and fucking FREEZING!"
                ];

                conditionsDescArray = [
                    "Earth has places like this?"
                ];

                conditionsIcon = 'E';
            }
            else if (temp < freezing) {

                conditionsMessageArray = [
                    "It's <em>hazy</em> and freezing!"
                ];

                conditionsDescArray = [
                    "Like being inside a freezer"
                ];

                conditionsIcon = 'E';
            }
            else if (temp < cold) {

                conditionsMessageArray = [
                    "It's <em>hazy</em> and cold"
                ];

                conditionsDescArray = [
                    "I saw a slasher movie like this once"
                ];

                conditionsIcon = 'E';
            }
            else if (temp < temperate) {
                conditionsMessageArray = [
                    "It's <em>hazy</em> and ok"
                ];

                conditionsDescArray = [
                    "Watch your step"
                ];

                conditionsIcon = 'E';
            }
            else if (temp < warm) {

                conditionsMessageArray = [
                    "It's <em>hazy</em> and warm"
                ];

                conditionsDescArray = [
                    "The mist is creeping in"
                ];

                conditionsIcon = 'E';
            }
            else if (temp < hot) {

                conditionsMessageArray = [
                    "It's <em>hazy</em> and hot"
                ];

                conditionsDescArray = [
                    "The ocean mist cometh"
                ];

                conditionsIcon = 'E';
            }
            else if (temp < roasting) {

                conditionsMessageArray = [
                    "It's <em>hazy</em> and roasting"
                ];

                conditionsDescArray = [
                    "It's like walking though soup",
                    "What's that moving around my leg?"
                ];

                conditionsIcon = 'E';
            }

            getRandMessage();

            break;
        case 'mostlycloudy':


            if (temp < siberia) {
                conditionsMessageArray = [
                    "It's <em>cloudy</em> and fucking FREEZING!"
                ];

                conditionsDescArray = [
                    "Arhhh!"
                ];

                conditionsIcon = 'N';
            }
            else if (temp < freezing) {

                conditionsMessageArray = [
                    "It's <em>cloudy</em> and freezing!"
                ];

                conditionsDescArray = [
                    "God why?!"
                ];

                conditionsIcon = 'N';
            }
            else if (temp < cold) {

                conditionsMessageArray = [
                    "It's <em>cloudy</em> and cold"
                ];

                conditionsDescArray = [
                    "Grey and depressing, great",
                    "Good doing-nothing weather"
                ];

                conditionsIcon = 'N';
            }
            else if (temp < temperate) {
                conditionsMessageArray = [
                    "It's <em>cloudy</em> and ok",
                    "Some <em>clouds</em>, but not too cold"
                ];

                conditionsDescArray = [
                    "Could be worse",
                    "It's a bit grey",
                    "About as bland as it gets"
                ];

                conditionsIcon = 'N';
            }
            else if (temp < warm) {

                conditionsMessageArray = [
                    "It's <em>cloudy</em> and warm",
                    "Warm and mostly <em>clouds</em>"
                ];

                conditionsDescArray = [
                    "I can smell rain",
                    "I can't really say much more",
                    "Will it rain? Just wait and see"
                ];

                conditionsIcon = 'N';
            }
            else if (temp < hot) {

                conditionsMessageArray = [
                    "It's <em>cloudy</em> and hot"
                ];

                conditionsDescArray = [
                    "Sticky",
                    "Gives some relief from the sun"
                ];

                conditionsIcon = 'N';
            }
            else if (temp < roasting) {

                conditionsMessageArray = [
                    "It's <em>cloudy</em> and roasting"
                ];

                conditionsDescArray = [
                    "You can swim through the air"
                ];

                conditionsIcon = 'N';
            }

            getRandMessage();


            break;
        case 'mostlysunny':

            if (temp < siberia) {
                conditionsMessageArray = [
                    "It's <em>probably sunny</em>, and fucking FREEZING!"
                ];

                conditionsDescArray = [
                    "Hoth looks like a nice place to take a vacation",
                    "Where the fuck are you, Siberia?",
                    "This is why they invented vodka...",
                    "It's like breathing razor blades",
                    "Take the penguin out for a walk"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < freezing) {

                conditionsMessageArray = [
                    "There's a lot of <em>sun</em> but it's freezing!"
                ];

                conditionsDescArray = [
                    "Breathing hurts",
                    "Just go back to bed",
                    "How did you get into this mess?",
                    "You didn't need your toes anyway",
                    "Fuck this place"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < cold) {

                conditionsMessageArray = [
                    "There's <em>sun, few clouds</em>, and it's cold"
                ];

                conditionsDescArray = [
                    "Dress up warm",
                    "Sick of winter yet?",
                    "I hope it's not windy"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < temperate) {
                conditionsMessageArray = [
                    "It's <em>mostly sunny</em> and not bad"
                ];

                conditionsDescArray = [
                    "It's pretty ok",
                    "It's a nice summer's day in England",
                    "Not quite shorts weather"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < warm) {

                conditionsMessageArray = [
                    "It's mostly <em>sunny</em> and warm"
                ];

                conditionsDescArray = [
                    "It's a rather nice day",
                    "Cheers Nature"

                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < hot) {

                conditionsMessageArray = [
                    "It's <em>sunny</em> with some clouds, and hot"
                ];

                conditionsDescArray = [
                    "Good day to go out"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < roasting) {

                conditionsMessageArray = [
                    "It's <em>sunny</em> and roasting"
                ];

                conditionsDescArray = [
                    "Did you wake up on Venus?"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }

            getRandMessage();

            break;
        case 'partlysunny':


            if (temp < siberia) {
                conditionsMessageArray = [
                    "There's a <em>bit of sun</em>, it's fucking FREEZING!"
                ];

                conditionsDescArray = [
                    "Hoth looks like a nice place to take a vacation",
                    "Where the fuck are you, Siberia?",
                    "This is why they invented vodka.",
                    "It's like breathing razor blades",
                    "I hear Alaska is nice this time of the year",
                    "Mind your extremities"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < freezing) {

                conditionsMessageArray = [
                    "It's <em>kinda sunny</em> and freezing!"
                ];

                conditionsDescArray = [
                    "Breathing hurts",
                    "Just go back to bed",
                    "How did you get into this mess?",
                    "Mind your extremities"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < cold) {

                conditionsMessageArray = [
                    "There's <em>sun, clouds</em> and it's cold"
                ];

                conditionsDescArray = [
                    "Dress up warm",
                    "That sun isn't going to help you"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < temperate) {
                conditionsMessageArray = [
                    "It's <em>mostlysunny</em>, and not bad"
                ];

                conditionsDescArray = [
                    "It's pretty ok",
                    "A nice summer's day in England"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < warm) {

                conditionsMessageArray = [
                    "It's <em>mostly sunny</em>, and warm"
                ];

                conditionsDescArray = [
                    "It's a rather nice day"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < hot) {

                conditionsMessageArray = [
                    "It's <em>sunny</em> with some clouds, and hot"
                ];

                conditionsDescArray = [
                    "Good day to go out, I guess"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < roasting) {

                conditionsMessageArray = [
                    "It's <em>sunny</em> and roasting"
                ];

                conditionsDescArray = [
                    "Did you wake up in Venus?"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }

            getRandMessage();
            break;
        case 'rain':

            if (temp < siberia) {
                conditionsMessageArray = [
                    "It's raining and <em>fucking FREEZING!</em>"
                ];

                conditionsDescArray = [
                    "What is this, liquid helium?"
                ];

                conditionsIcon = 'R';

            }
            else if (temp < freezing) {

                conditionsMessageArray = [
                    "It's raining and <em>freezing!</em>"
                ];

                conditionsDescArray = [
                    "How is rain happening?!"
                ];

                conditionsIcon = 'R';
            }
            else if (temp < cold) {

                conditionsMessageArray = [
                    "It's just <em>cold</em> and raining"
                ];

                conditionsDescArray = [
                    "It couldn't get much worse",
                    "You're going to freeze to the bone"
                ];

                conditionsIcon = 'R';
            }
            else if (temp < temperate) {
                conditionsMessageArray = [
                    "raining and <em>not warm</em>"
                ];

                conditionsDescArray = [
                    "Bring your umbrella",
                    "Hope you brought a jacket"
                ];

                conditionsIcon = 'R';
            }
            else if (temp < warm) {

                conditionsMessageArray = [
                    "<em>Warm</em> and raining"
                ];

                conditionsDescArray = [
                    "Enjoy the summer"
                ];

                conditionsIcon = 'R';
            }
            else if (temp < hot) {

                conditionsMessageArray = [
                    "It's wet, and <em>hot</em>"
                ];

                conditionsDescArray = [
                    "Summer rains are here",
                    "Monsoon season"
                ];

                conditionsIcon = 'R';
            }
            else if (temp < roasting) {

                conditionsMessageArray = [
                    "It's raining and <em>roasting hot</em>"
                ];

                conditionsDescArray = [
                    "I hope you like molten lead."
                ];

                conditionsIcon = 'R';
            }

            getRandMessage();
            break;
        case 'sleet':

            if (temp < siberia) {
                conditionsMessageArray = [
                    "<em>Freezing rain</em> and fucking arctic temperatures!"
                ];

                conditionsDescArray = [
                    "Did the atmosphere freeze too?"
                ];

                conditionsIcon = 'X';

            }
            else if (temp < freezing) {

                conditionsMessageArray = [
                    "Enjoy the <em>frozen rain</em> and freezing cold!"
                ];

                conditionsDescArray = [
                    "Fuck everything"
                ];

                conditionsIcon = 'X';
            }
            else if (temp < cold) {

                conditionsMessageArray = [
                    "It's cold with <em>freezing rain</em>"
                ];

                conditionsDescArray = [
                    "It couldn't get much worse",
                    "You're going to freeze to the bone",
                    "Fuck this"
                ];

                conditionsIcon = 'X';
            }
            else if (temp < temperate) {
                conditionsMessageArray = [
                    "<em>Wet snow</em> and kinda cold"
                ];

                conditionsDescArray = [
                    "Bleh.",
                    "Pneumonia is all the rage this time of year"
                ];

                conditionsIcon = 'X';
            }
            else if (temp < warm) {

                conditionsMessageArray = [
                    "Warm and <em>sleeting</em>"
                ];

                conditionsDescArray = [
                    "What the fuck man"
                ];

                conditionsIcon = 'X';
            }
            else if (temp < hot) {

                conditionsMessageArray = [
                    "It's <em>sleeting</em>, and hot"
                ];

                conditionsDescArray = [
                    "This is just getting fucking stuipid"
                ];

                conditionsIcon = 'X';
            }
            else if (temp < roasting) {

                conditionsMessageArray = [
                    "It's <em>sleet</em> and roasting?"
                ];

                conditionsDescArray = [
                    "???"
                ];

                conditionsIcon = 'X';
            }

            getRandMessage();

            break;
        case 'snow':

            if (temp < siberia) {
                conditionsMessageArray = [
                    "It's <em>snowing</em> out there"
                ];

                conditionsDescArray = [
                    "Just stay in, it's beyond freezing"
                ];

                conditionsIcon = 'W';

            }
            else if (temp < freezing) {

                conditionsMessageArray = [
                    "<em>Snow</em> everywhere!"
                ];

                conditionsDescArray = [
                    "Oh and it's cold as all hell"
                ];

                conditionsIcon = 'W';
            }
            else if (temp < cold) {

                conditionsMessageArray = [
                    "It's fucking <em>snowing</em>"
                ];

                conditionsDescArray = [
                    "You might need thick socks",
                    "It's not <em>that</em> cold, you pansey"
                ];

                conditionsIcon = 'W';
            }
            else if (temp < temperate) {
                conditionsMessageArray = [
                    "wet <em>Snow</em>, awesome"
                ];

                conditionsDescArray = [
                    "Bleh.",
                    "Water proof your feet, it's gonna be slush"
                ];

                conditionsIcon = 'W';
            }
            else if (temp < warm) {

                conditionsMessageArray = [
                    "Warm and <em>snowing</em>"
                ];

                conditionsDescArray = [
                    "What the fuck man"
                ];

                conditionsIcon = 'W';
            }
            else if (temp < hot) {

                conditionsMessageArray = [
                    "It's <em>snowing</em>, and hot"
                ];

                conditionsDescArray = [
                    "This is just getting fucking stuipid"
                ];

                conditionsIcon = 'W';
            }
            else if (temp < roasting) {

                conditionsMessageArray = [
                    "It's <em>snowing</em> and roasting?"
                ];

                conditionsDescArray = [
                    "???"
                ];

                conditionsIcon = 'W';
            }

            getRandMessage();

            break;
        case 'sunny':

            if (temp < siberia) {
                conditionsMessageArray = [
                    "It's <em>clear</em> and fucking FREEZING!"
                ];

                conditionsDescArray = [
                    "Hoth looks like a nice place to take a vacation",
                    "Where the fuck are you, Siberia?",
                    "This is why they invented vodka...",
                    "My nose is frozen shut!",
                    "Fuck this",
                    "I cant stress that last part enough"
                ];

                conditionsIcon = 'G';
            }
            else if (temp < freezing) {

                conditionsMessageArray = [
                    "It's <em>clear</em> and freezing!"
                ];

                conditionsDescArray = [
                    "Breathing hurts",
                    "Just go back to bed",
                    "Layer up, bud"
                ];

                conditionsIcon = 'G';
            }
            else if (temp < cold) {

                conditionsMessageArray = [
                    "It's <em>clear</em> and sunny, but cold"
                ];

                conditionsDescArray = [
                    "Winter is <i>still</i> here?",
                    "You don't need to go outside anyway",
                    "That sunshine is not what it seems"
                ];

                conditionsIcon = 'G';
            }
            else if (temp < temperate) {
                conditionsMessageArray = [
                    "It's <em>clear</em> and a bit cold"
                ];

                conditionsDescArray = [
                    "Could be worse",
                    "At least it's not raining",
                    "You can almost feel the sun"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'C';
                }
                else {
                    conditionsIcon = 'B';
                }
            }
            else if (temp < warm) {

                conditionsMessageArray = [
                    "It's <em>warm</em> and clear"
                ];

                conditionsDescArray = [
                    "Sun is shining, enjoy",
                    "Make the most of it",
                    "Not quite beach weather, unless you're a Finn"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'C';
                }
                else {
                    conditionsIcon = 'B';
                }
            }
            else if (temp < hot) {

                conditionsMessageArray = [
                    "It's <em>hot</em> and clear"
                ];

                conditionsDescArray = [
                    "Catch some rays",
                    "I hope your A/C still works",
                    "It's nice, don't complain"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'C';
                }
                else {
                    conditionsIcon = 'B';
                }
            }
            else if (temp < roasting) {

                conditionsMessageArray = [
                    "It's <em>roasting hot</em> and clear"
                ];

                conditionsDescArray = [
                    "I can hear my skin crackling",
                    "The road is melting",
                    "Not the best time to be of pale complexion",
                    "Water..."
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'C';
                }
                else {
                    conditionsIcon = '\'';
                }
            }

            getRandMessage();
            break;
        case 'tstorms':

            if (temp < siberia) {
                conditionsMessageArray = [
                    "<em>Thundering</em> and fucking beyond freezing"
                ];

                conditionsDescArray = [
                    "Someone must have declared war on Russia again"
                ];

                conditionsIcon = 'W';

            }
            else if (temp < freezing) {

                conditionsMessageArray = [
                    "<em>Thunderstorms</em> and freezing cold!"
                ];

                conditionsDescArray = [
                    "Are those bombs?!"
                ];

                conditionsIcon = 'W';
            }
            else if (temp < cold) {

                conditionsMessageArray = [
                    "It's cold and <em>thundering</em>"
                ];

                conditionsDescArray = [
                    "Weather is strange..."
                ];

                conditionsIcon = 'W';
            }
            else if (temp < temperate) {
                conditionsMessageArray = [
                    "<em>Thundering</em> and temperate"
                ];

                conditionsDescArray = [
                    "Your pets are going to love this",
                    "BOOM",
                    "Enjoy the light show"
                ];

                conditionsIcon = 'W';
            }
            else if (temp < warm) {

                conditionsMessageArray = [
                    "Warm and <em>thundering</em>"
                ];

                conditionsDescArray = [
                    "Summer storms are here"
                ];

                conditionsIcon = 'W';
            }
            else if (temp < hot) {

                conditionsMessageArray = [
                    "It's <em>thundering</em>, and hot"
                ];

                conditionsDescArray = [
                    "Living in the tropics has it's perks"
                ];

                conditionsIcon = 'W';
            }
            else if (temp < roasting) {

                conditionsMessageArray = [
                    "It's <em>thundering</em> and roasting!"
                ];

                conditionsDescArray = [
                    "Getting hit with lightning would be more pleasant"
                ];

                conditionsIcon = 'W';
            }


            getRandMessage();

            conditionsIcon = '0';
            break;
        case 'unknown':

            conditionsMessageArray = [
                "I dont know what the fuck it is"
            ];

            conditionsDescArray = [
                "Look out the window, you know more than me"
            ];


            getRandMessage();

            conditionsIcon = ')';
            break;
        case 'partlycloudy':

            if (temp < siberia) {
                conditionsMessageArray = [
                    "It's a bit sunny, but <em>fucking FREEZING!</em>"
                ];

                conditionsDescArray = [
                    "Watch your extremities"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < freezing) {

                conditionsMessageArray = [
                    "It's <em>kinda sunny</em> and freezing!"
                ];

                conditionsDescArray = [
                    "Breathing hurts",
                    "Just go back to bed",
                    "How did you get into this mess?"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < cold) {

                conditionsMessageArray = [
                    "There's <em>sun, clouds</em> and it's cold"
                ];

                conditionsDescArray = [
                    "Dress up warm"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < temperate) {
                conditionsMessageArray = [
                    "It's <em>mostly sunny</em> and not bad"
                ];

                conditionsDescArray = [
                    "It's pretty ok",
                    "It's a nice summer's day in England"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < warm) {

                conditionsMessageArray = [
                    "It's mostly <em>sunny</em> and warm"
                ];

                conditionsDescArray = [
                    "It's a rather nice day"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < hot) {

                conditionsMessageArray = [
                    "It's <em>sunny</em> with some clouds, and hot"
                ];

                conditionsDescArray = [
                    "Good day to go out"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }
            else if (temp < roasting) {

                conditionsMessageArray = [
                    "It's <em>sunny</em> and <em>roasting</em>"
                ];

                conditionsDescArray = [
                    "Did you wake up in Venus?"
                ];

                if (time > 18 || time < 6) {
                    conditionsIcon = 'I';
                }
                else {
                    conditionsIcon = 'H';
                }
            }

            getRandMessage();

            break;

    }

    console.log(conditionsMessage);

    $("#icon").html(conditionsIcon);
    $("#city").html("Somewhere near<br> <strong>" + city + "</strong>");

    $("#message").html(conditionsMessage);
    $("#message").append('<small>' + conditionsDesc + '</small>');

}

function getLocation() {
    if (navigator.geolocation) {
        var timeoutVal = 10 * 1000 * 1000;
        navigator.geolocation.getCurrentPosition(
            function (position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                getConditions();
            }
        );
    } else {
        $("#message").html("Where the fuck are you bro?");
    }
}


function swipeDown() {

    var startX, startY, endX, endY;

    function touchStart(event) {
        event.preventDefault();
        startX = event.targetTouches[0].pageX;
        startY = event.targetTouches[0].pageY;
    }

    function touchEnd(event) {
        event.preventDefault();
        endX = event.targetTouches[0].pageX;
        endY = event.targetTouches[0].pageY;
    }

    if (startY < endY || (Math.abs(startX - endX)/2 > Math.abs(startY - endY))) {
        return false;
    }
    else {
        return true;
    }
}

function openMenu() {

}




function init() {
    //MBP.hideUrlBar();
    scrollTo(0,1);
    getLocation();
    //checkAppCache();
    //setTimeout(function(){getConditions();}, 1000);
    //setTimeout(function(){getConditions();}, 1000);
    new FastClick(document.body);
}

window.addEventListener('load', function () {
    spinner.spin(spinnerTarget);
    init();
});

$('#app').click(function(){
    console.log('fdsa');
    getLocation();
});


$(window).on("click", "#app", function(){
    console.log('herp');
});



