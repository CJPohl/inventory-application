#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Guitar = require('./models/guitar');
var GuitarInstance = require('./models/guitarinstance');
var Manufacturer = require('./models/manufacturer');
var Pickup = require('./models/pickup');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var manufacturers = []
var pickups = []
var guitars = []
var guitarinstances = []

function manufacturerCreate(name, description, founding, cb) {
  manufacturerdetail = {name: name, description: description, founding: founding}
  
  var manufacturer = new Manufacturer(manufacturerdetail);
       
  manufacturer.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Manufacturer: ' + manufacturer);
    manufacturers.push(manufacturer)
    cb(null, manufacturer)
  }  );
}

function pickupCreate(name, description, cb) {
  var pickup = new Pickup({name: name, description: description});
       
  pickup.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Pickup: ' + pickup);
    pickups.push(pickup)
    cb(null, pickup);
  }   );
}

function guitarCreate(model, manufacturer, description, price, pickup, cb) {
  guitardetail = { 
      model: model,
      manufacturer: manufacturer,
      description: description,
      price: price,
      pickup: pickup,
  }
    
  var guitar = new Guitar(guitardetail);    
  guitar.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Guitar: ' + guitar);
    guitars.push(guitar)
    cb(null, guitar)
  }  );
}


function guitarInstanceCreate(guitar, status, cb) {
    guitarinstancedetail = { 
        guitar: guitar,
        status: status
    }    
    
  var guitarinstance = new GuitarInstance(guitarinstancedetail);    
  guitarinstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING GuitarInstance: ' + guitarinstance);
      cb(err, null)
      return
    }
    console.log('New GuitarInstance: ' + guitarinstance);
    guitarinstances.push(guitarinstance)
    cb(null, guitarinstance)
  }  );
}

function createPickups(cb) {
    async.parallel([
        function(callback) {
            pickupCreate('Single Coil', 'A single coil pickup is a type of magnetic transducer, or pickup, for the electric guitar and the electric bass. It electromagnetically converts the vibration of the strings to an electric signal. Single coil pickups are one of the two most popular designs, along with dual-coil or "humbucking" pickups.', callback);
        },
        function(callback) {
            pickupCreate('Humbucker', 'A humbucking pickup, humbucker, or double coil, is a type of guitar pickup that uses two wire coils to cancel out the noisy interference picked up by coil pickups. In addition to electric guitar pickups, humbucking coils are sometimes used in dynamic microphones to cancel electromagnetic hum.', callback)
        },
        ],
        // optional cb
        cb);
}

function createManufacturers(cb) {
    async.parallel([
        function(callback) {
            manufacturerCreate('Gibson', "Gibson Brands, Inc. (formerly Gibson Guitar Corporation) is an American manufacturer of guitars, other musical instruments, and professional audio equipment from Kalamazoo, Michigan, and now based in Nashville, Tennessee. The company was formerly known as Gibson Guitar Corporation and renamed Gibson Brands, Inc. on June 11, 2013.[5][6] Orville Gibson started making instruments in 1894 and founded the company in 1902 as the Gibson Mandolin-Guitar Mfg. Co. Ltd. in Kalamazoo, Michigan, to make mandolin-family instruments.[1] Gibson invented archtop guitars by constructing the same type of carved, arched tops used on violins. By the 1930s, the company was also making flattop acoustic guitars, as well as one of the first commercially available hollow-body electric guitars, used and popularized by Charlie Christian. In 1944, Gibson was bought by Chicago Musical Instruments (CMI), which was acquired in 1969 by Panama-based conglomerate Ecuadorian Company Limited (ECL), that changed its name in the same year to Norlin Corporation. Gibson was owned by Norlin Corporation from 1969 to 1986. In 1986, the company was acquired by a group led by Henry Juszkiewicz and David H. Berryman. In November 2018, the company was acquired by a group of investors led by private equity firm Kohlberg Kravis Roberts.Gibson sells guitars under a variety of brand names[7] and builds one of the world's best-known guitars, the Gibson Les Paul. Gibson was at the forefront of innovation in acoustic guitars, especially in the big band era of the 1930s; the Gibson Super 400 was widely imitated. In 1952, Gibson introduced its first solid-body electric guitar, the Les Paul, which became its most popular guitar to date—designed by a team led by Ted McCarty.In addition to guitars, Gibson offers consumer electronics through the Gibson Pro Audio division, which includes KRK.On May 1, 2018, the company filed for Chapter 11 bankruptcy protection,[8] and announced a restructuring plan to return to profitability by closing down unprofitable consumer electronics divisions such as Gibson Innovations.[9][10] The company exited Chapter 11 bankruptcy in November 2018.[11][12]In January 2020, the company launched Gibson TV, an online television network focused on guitars and music culture.[13][14]", '1902-1-1', callback);
        },
        function(callback) {
            manufacturerCreate('Fender', "The Fender Musical Instruments Corporation (FMIC, or simply Fender) is an American manufacturer of stringed instruments and amplifiers. Fender produces acoustic guitars, bass amplifiers and public address equipment, but is best known for its solid-body electric guitars and bass guitars, particularly the Stratocaster, Telecaster, Jazzmaster, Precision Bass, and the Jazz Bass. The company was founded in Fullerton, California by Clarence Leonidas 'Leo' Fender in 1946.[6] Its headquarters are in Los Angeles, California.The FMIC is a privately held corporation, with Andy Mooney serving as the Chief Executive Officer (CEO). The company filed for an initial public offering in March 2012,[7] but this was withdrawn[8][9] five months later. In addition to its Los Angeles headquarters, Fender has manufacturing facilities in Corona, California (US) and Ensenada, Baja California (Mexico).[10]As of July 10, 2012, the majority shareholders of Fender were the private equity firm of Weston Presidio (43%), Japanese music distributors Yamano Music (14%) and Kanda Shokai (13%), and Servco Pacific (5%).[11][12] In December 2012, TPG Growth (the middle market and growth equity investment platform of TPG Capital) and Servco Pacific took control of the company after acquiring the shares held by Weston Presidio.[13] In January 2020, Servco Pacific became the majority owner after acquiring the shares of TPG Growth.[14]", '1946-1-1', callback);
        },
        function(callback) {
            manufacturerCreate('Ibanez', "Ibanez (アイバニーズ, Aibanīzu) is a Japanese guitar brand owned by Hoshino Gakki.[1] Based in Nagoya, Aichi, Japan, Hoshino Gakki were one of the first Japanese musical instrument companies to gain a significant foothold in import guitar sales in the United States and Europe, as well as the first brand of guitars to mass-produce the seven-string guitar and eight-string guitar. Ibanez manufactures effects, accessories, amps, and instruments in Japan, China, Indonesia and in the United States (at a Los Angeles-based custom shop). As of 2017 they marketed nearly 165 models of bass guitar, 130 acoustic guitars, and more than 300 electric guitars. After Gibson and Fender, Ibanez is considered the third biggest guitar brand.[2]", '1957-1-1', callback);
        },
        function(callback) {
            manufacturerCreate('Paul Reed Smith Guitars', "Paul Reed Smith Guitars, also known as PRS Guitars, is an American guitar and amplifier manufacturer located in Stevensville, Maryland. The company was founded in 1985 in Annapolis, Maryland by Paul Reed Smith. Products manufactured by PRS include electric & acoustic guitars, basses, and amplifiers.", '1985-1-1', callback);
        },
        ],
        cb);
}
function createGuitars(cb) {
    async.parallel([
        function(callback) {
            guitarCreate('Stratocaster', manufacturers[1], "The Fender Stratocaster, colloquially known as the Strat, is a model of electric guitar designed from 1952 into 1954 by Leo Fender, Bill Carson, George Fullerton and Freddie Tavares. The Fender Musical Instruments Corporation has continuously manufactured the Stratocaster since 1954. It is a double-cutaway guitar, with an extended top 'horn' shape for balance. Along with the Gibson Les Paul, Gibson SG and Fender Telecaster, it is one of the most-often emulated electric guitar shapes.[1][2] 'Stratocaster' and 'Strat' are trademark terms belonging to Fender. Guitars that duplicate the Stratocaster by other manufacturers are sometimes called S-Type or ST-type guitars.", 1999.99, pickups[0], callback);
        },
        function(callback) {
            guitarCreate('Les Paul', manufacturers[0], "The Gibson Les Paul is a solid body electric guitar that was first sold by the Gibson Guitar Corporation in 1952.[1] The guitar was designed by factory manager John Huis and his team with input from and endorsement by guitarist Les Paul. Its typical design features a solid mahogany body with a carved maple top and a single cutaway, a mahogany set-in neck with a rosewood fretboard, two pickups with independent volume and tone controls, and a stoptail bridge, although variants exist.", 2699.99, pickups[1], callback);
        },
        function(callback) {
            guitarCreate('RG550 Genesis Collection', manufacturers[2], "The Ibanez RG is a series of electric guitars produced by Hoshino Gakki and one of the best-selling superstrat-style guitars ever made. The first model in the series, the RG550, was originally released in 1987 and advertised as part of the Roadstar series. That series was renamed 'RG' in 1992 and all models since are simply known as RGs.It rose in popularity throughout the 1980s and had the features that musicians in the rising shred and thrash metal movements of that time were looking for: a fast neck, comfortable body, powerful pickups, and a reliable tremolo system.The RG series has the most subtypes of any Ibanez model[1] and is the most popular series of Ibanez electric guitars produced by Hoshino Gakki. The RG's deep cutaway, flatter fingerboard and extended fret range (24 frets as standard) has made it one of the most popular guitars for rock and heavy metal music.", 999.99, pickups[1], callback);
        },
        function(callback) {
            guitarCreate('Custom 24', manufacturers[3], "The Vox Custom 24 was one of a group of guitars produced in Japan by the Matsumoku company between 1980–85, which included the Custom and Standard 24 and Custom and Standard 25 guitars.[1] Custom and Standard bass guitars were also included in the range.[2] Matsumoku had already produced guitars for Aria and other brands such as Westbury. These were recognised as leaders in performance, innovation and quality.[3] The electronics in these guitars were designed by Adrian Legg. The guitars are passive but the complex switching allows for a wide variety of sounds, making them extremely versatile instruments.", 849.99, pickups[1], callback);
        }
        ],
        // optional callback
        cb);
}


function createGuitarInstances(cb) {
    async.parallel([
        function(callback) {
            guitarInstanceCreate(guitars[0], 'New', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[0], 'New', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[0], 'New', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[0], 'Refurbished', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[0], 'Refurbished', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[0], 'Refurbished', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[0], 'Used', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[0], 'New', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[1], 'New', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[1], 'New', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[1], 'New', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[2], 'New', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[2], 'New', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[2], 'Used', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[2], 'Used', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[2], 'Used', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[2], 'Used', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[2], 'Used', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[2], 'Refurbished', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[3], 'New', callback);
        },
        function(callback) {
            guitarInstanceCreate(guitars[3], 'Refurbished', callback);
        },
        ],
        // Optional callback
        cb);
}

async.series([
    createPickups,
    createManufacturers,
    createGuitars,
    createGuitarInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('GUITARInstances: '+guitarinstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});