// This file defines information about the vendors in the marketplace
// Do not modify. These are initiated on startup

/*
All players and vendors are of type Entity, a class (like OO languages).

All players and vendors have an inventory. The player's is empty, but the
vendors are filled according to the settings. Two are references, one is just
normal stuff.
*/

// Defines vendors, used names of officers of GT WebDev
let vendors = [
    new Entity('Bek', 'vendor'),
    new Entity('Stephen', 'vendor'),
    new Entity('Talia', 'vendor')
]

// This is the player object
let player = new Player('Player', 'player');

// Feel free to change these
const STANDARD_CONTENT_0 = [
    '808 Sticker',
    '808 Sticker',
    '808 Sticker',
    'Consultation',
    'Consultation',
    '808 Set',
    '808 Set',
    'Sample Pack V2'
];

const STANDARD_CONTENT_1 = [
    'Wood Carving',
    'Wood Carving',
    'Wood Carving #2',
    'Wood Carving #2',
    'Wood Carving #2',
    'Dreamcatcher',
    'Quilt',
    'Glass Sculpture'
]

const STANDARD_CONTENT_2 = [
    'Amaranthus Bouquet',
    'Amaranthus Bouquet',
    'Silver Spoon',
    'Silver Spoon',
    'Silver Spoon',
    'Custom Art',
    'Custom Art',
    'Beemo Sticker'
]

switch (sessionStorage.getItem('variant')) {
    case "standard": {
        vendors[0].setInventory([...STANDARD_CONTENT_0]);
        vendors[1].setInventory([...STANDARD_CONTENT_1]);
        vendors[2].setInventory([...STANDARD_CONTENT_2]);
        break;
    };
    default: {
        break;
    }
}

const indexedPrice = {
    'Bek': [3, 3, 3, 30, 30, 10, 10, 50],
    'Stephen': [5, 5, 10, 10, 10, 15, 15, 80],
    'Talia': [6, 6, 8, 8, 8, 10, 10, 200]
}

function hideStalls() {
    let wrapper = document.getElementById("mkt-stall-wrapper");
    wrapper.style.display = "none";
}

hideStalls();

// Load default
function loadDefault() {
    vendors[0].setInventory([...STANDARD_CONTENT_0]);
    vendors[1].setInventory([...STANDARD_CONTENT_1]);
    vendors[2].setInventory([...STANDARD_CONTENT_2]);
}
loadDefault();