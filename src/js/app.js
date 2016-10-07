var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var API_KEY = 'd41d8cd98f00b204e9800998ecf8427e';


// var main = new UI.Card({
//   title: 'Pebble.js',
//   icon: 'images/icon.png',
//   subtitle: 'Hello World!',
//   body: 'Press any button.',
//   subtitleColor: 'indigo', // Named colors
//   bodyColor: '#9a0036' // Hex colors
// });

var main = new UI.Menu({
    sections: [{
      items: [
		  {title: 'C', subtitle: 'C'},
		  {title: 'C# / Db', subtitle: 'Bb'},
		  {title: 'D', subtitle: 'D'},
		  {title: 'D# / Eb', subtitle: 'Eb'},
		  {title: 'E', subtitle: 'E'},
		  {title: 'F', subtitle: 'F'},
		  {title: 'F# / Gb', subtitle: 'Gb'},
		  {title: 'G', subtitle: 'G'},
		  {title: 'G# / Ab', subtitle: 'Ab'},
		  {title: 'A', subtitle: 'A'},
		  {title: 'A# / Bb', subtitle: 'Bb'},
		  {title: 'B', subtitle: 'B'}]
    }], // end sections
	titleColor: 'blue'
  });

var chord_types = [
	"major",
	"minor",
// 	"aug",
// 	"dim",
	"7",
// 	"m7",
	"maj7",
// 	"m7b5",
// 	"sus2",
// 	"sus4",
// 	"7sus4",
// 	"6",
// 	"m6",
// 	"add9",
// 	"m9",
// 	"9",
// 	"11",
// 	"13"
];

main.show();


/*
 * Main chord window
 */

function update_card(card, note, api_note, type) {
	console.log('updating ' + card.title() + ' with note ' + note + ' - ' + api_note + ', chord ' + type);
	
	// fetch with api_note and type
	var url = 'http://www.ukulele-chords.com/get?ak='+API_KEY+'&r='+api_note+'&typ='+type;
	ajax({ 'url': url}, function(data) {
		card.banner(null);
		console.log('Fetched data for url' + url);
		var match = /<chord_diag_mini>(.*)<\/chord_diag_mini>/.exec(data);
		console.log(match[1]);
		card.banner(match[1]);
	});
	
	card.title(note + ' ' + type);
	
}


main.on('select', function(e) {
	console.log(e.item.title);
	var note_name = e.item.title;
	var api_note = e.item.subtitle;
	var type_index = 0;
	console.log('note = ' + note_name);
	var card = new UI.Card({
		//title: e.item.title + ' ' + chord_types[type_index],
		style: 'small',
		titleColor: 'indigo',
		subtitleColor: 'lightBlue'
	});
	update_card(card, note_name, api_note, chord_types[type_index]);
	
	card.on('click', 'up', function(e){
		console.log('prev type');
		if (type_index > 0) {
			type_index = type_index - 1;
		}
		update_card(card, note_name, api_note, chord_types[type_index]);
	});	
	
	card.on('click', 'down', function(e){
		console.log('next type');
		console.log(chord_types.length);
		if (type_index < chord_types.length - 1) {
			type_index = type_index + 1;
		}
		update_card(card, note_name, api_note, chord_types[type_index]);
	});

	card.show();
});


// function fetch_image_url(note, type) {
	
// }


// main.on('click', 'up', function(e) {
//   var menu = 
//   menu.on('select', function(e) {
//     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
//     console.log('The item is titled "' + e.item.title + '"');
//   });
//   menu.show();
// });

// main.on('click', 'select', function(e) {
//   var wind = new UI.Window({
//     backgroundColor: 'black'
//   });
//   var radial = new UI.Radial({
//     size: new Vector2(140, 140),
//     angle: 0,
//     angle2: 300,
//     radius: 20,
//     backgroundColor: 'cyan',
//     borderColor: 'celeste',
//     borderWidth: 1,
//   });
//   var textfield = new UI.Text({
//     size: new Vector2(140, 60),
//     font: 'gothic-24-bold',
//     text: 'Dynamic\nWindow',
//     textAlign: 'center'
//   });
//   var windSize = wind.size();
//   // Center the radial in the window
//   var radialPos = radial.position()
//       .addSelf(windSize)
//       .subSelf(radial.size())
//       .multiplyScalar(0.5);
//   radial.position(radialPos);
//   // Center the textfield in the window
//   var textfieldPos = textfield.position()
//       .addSelf(windSize)
//       .subSelf(textfield.size())
//       .multiplyScalar(0.5);
//   textfield.position(textfieldPos);
//   wind.add(radial);
//   wind.add(textfield);
//   wind.show();
// });

// main.on('click', 'down', function(e) {
//   var card = new UI.Card();
//   card.title('A Card');
//   card.subtitle('Is a Window');
//   card.body('The simplest window type in Pebble.js.');
//   card.show();
// });
