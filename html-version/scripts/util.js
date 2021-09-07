/*
This is the utilities file for the workshop. You will these functions to save time when
computing the marketplace operations.

You do not need to modify anything in this file. Actually, YOU SHOULD NOT EDIT THIS FILE.
*/

// Fixed base rate for a trader to reject your barter
const REJECT_RATE = 0.05;

// The marketplace will have 3 different modes which will activate different settings
const MARKET_SETTINGS = {
    variant: {
        standard: 1,
        food: 1.2,
        barter: 0.6
    },
    theme: {
        standard: 1,
        night: 1.1,
    },
    mode: {
        standard: 1,
        night: 1.5,
        rush: 0.5,
    }
}

// Base currency for a fully standard game
const STANDARD_CURRENCY = 100;

// Base time for game interaction
const STANDARD_TIME = 90;

/**
 * Updates the game's settings using user-chosen values.
 * 
 * Settings are stored in sessionStorage as individual keymaps.
 * 
 * - variant: "standard" | "food" | "barter"
 * - theme: "day" | "night"
 * - mode: "standard" | "night" | "rush"
 * 
 * @param {{variant: string, theme: string, mode: string}} settings Form data-like object
 * dictating the settings of the game.
 */
function updateSettings(settings) {
    let theme = (settings.theme === 1.1) ? "night" : "day";
    sessionStorage.setItem("variant", settings.variant);
    sessionStorage.setItem("theme", theme);
    sessionStorage.setItem("mode", settings.mode);
    updateGameUI();
}

/**
 * Updates the layout of the game in the browser before the user
 * starts the game. This function will be called every time the settings update.
 */
function updateGameUI() {
    let timer = document.getElementById('mkt-timer');
    let background = document.getElementById('mkt-theme-provider');
    let currency = document.getElementById('mkt-currency');
    
    // Set timer in the top left
    timer.innerHTML = `${STANDARD_TIME * parseFloat(MARKET_SETTINGS.mode[sessionStorage.getItem("mode")])}`;

    // Set currency amount in the top right
    currency.innerHTML = `$${STANDARD_CURRENCY
        * MARKET_SETTINGS.theme[(sessionStorage.getItem('theme') === "day") ? "standard" : "night"]
        * MARKET_SETTINGS.variant[sessionStorage.getItem('variant')]
        * MARKET_SETTINGS.mode[sessionStorage.getItem('mode')]
    }`;

    // Set elements in the theme provider to the appropriate theme
    let children = [...background.children];
    children.forEach(v => {
        v.className = `${sessionStorage.getItem("theme")}-theme`;
    });
}

/**
 * Starts the game timer
 */
let timer;
function startTimer() {
    timer = setInterval(tick, 1000);
}

function tick() {
    let timer = document.getElementById("mkt-timer");
    let currTime = parseInt(timer.innerHTML);
    if (currTime === 0) {
        clearInterval();
        return;
    }
    timer.innerHTML = currTime - 1;
}

/**
 * Calls a function n times. Stores the result of the executions
 * in a list. 
 * @param {(any) => any} method The function to call
 * @param {number} n Number of times to call the function
 */
function repeat(method, n) {
    let results = [];
    for (let i = 0; i < n; i++) {
        results.push(method());
    }
    return results;
}

class Inventory {
    constructor() {
        this.content = [];
    }
    get items() {
        return this.content;
    }

    set items(content) {
        this.content = content;
    }

    add(...products) {
        this.content.push(...products);
    }

    remove(product) {
        this.content.splice(this.content.indexOf(product), 1);
    }
}

class Entity {
    constructor(name, role) {
        this.name = name;
        this.role = role;

        this.inventory = new Inventory();
    }

    getInventory() {
        return this.inventory;
    }
}

class Player extends Entity {
    constructor(name, role) {
        super(name, role);

        this.balance = 0;
    }

    get currentBalance() {
        return this.balance;
    }

    set currentBalance(balance) {
        this.balance = balance;
    }
}