// Here you will implement the main functionality
/*
Functionality of this game will include the following
- Set up before starting
- Start the game
- Market interactions

Helper functions and details for each of the functions
can be found in the following files:
- scripts/util.js
- scripts/market.js
*/
// Initial loading
setTheme("day");
updateSettings({
    variant: "standard",
    mode: "standard",
    theme: "day"
})

// Global to track shop open
let shop = undefined;

/**
 * Implement the rest of the function body
 * 
 * The button from the game settings window must call this function in order
 * to set the data. Use the already written util.js functions to reduce the
 * amount of code to write.
 * 
 * If you are using any IDE or VSCode, I have provided JSDocs for every
 * utility functions so the type of the parameters are known.
 */
function setGameSettings() {
    // Get radio buttons from the form
    let variants = Array.from(document.getElementsByName("variant"));
    let themes = Array.from(document.getElementsByName("theme"));
    let modes = Array.from(document.getElementsByName("mode"));

    /* IMPLEMENT: Find the element with the property "checked" */
    /* Don't forget to update the theme! */
    /* END OF IMPLEMENTATION */
}

/**
 * Implement the body of this function.
 * 
 * What we would like to do is have the ability to swap between
 * the play and settings menu options. This can be handled in many
 * different ways, but in our case, this will be done with a single
 * function that takes the name of each as its input.
 * 
 * The settings page should display as "grid" while the play page
 * should display as "flex"
 * @param {boolean} visible If true, show the settings. If not, show the play
 * menu.
 */
function showSettings(visible) {
    /* START OF IMPLEMENTATION */
    /* END OF IMPLEMENTATION */
}
// You will need to implement this function
showSettings(false);

/**
 * Implement the body of the function.
 * 
 * After the user clicks on the play button, start the user's game.
 * There is a timer and money left in the top corners. The score is
 * in the lower left.
 * 
 * Starting the game starts the timer and hides the settings.
 * You can attempt to write it yourself or use a pre-written
 * function from the util.js file.
 */
function startGame() {
    /* START OF IMPLEMENTATION */
    // You will need to load the player's balance
    /* END OF IMPLEMENTATION */
}

/**
 * Implement the body of this function
 * 
 * Sends a trade request to the trader. The cost input should always be
 * less than or equal to the amount requested.
 * 
 * There is always a 5% chance the transaction will be rejected by the vendor.
 * The chance of rejection is based on the positive difference between the
 * offered price (offer) and the actual price (cost) over the actual cost.
 * 
 * For example, say you are trying to buy an item that costs $5. If you offer
 * $5, there is a 5% chance of rejection. If you offer more than the cost,
 * generally it will pass. However, if the offer is low enough, it can still fail.
 * 
 * If you offer $2 for the $5 item, then the rejection rate would be 45%. Use
 * this to calculate how you might find the rejection rate.
 * 
 * @param {Entity} vendor One of the three defined street vendors on the page.
 * @param {string} item The item's name in which to purchase from the vendor.
 * @param {number} cost The item's initial cost.
 * @param {number} offer The amount of money offered to pay for the item.
 * 
 * @returns {{status: "success" | "failure", reason?: string}}
 */
function makeTransaction(vendor, item, cost, offer) {
    /* START OF IMPLEMENTATION */
    // The player should have a random chance to get the item
    // NOTE: Be sure to follow the return type
    /* END OF IMPLEMENTATION */
}

/**
 * Calls the function makeTransaction against the items being sold.
 * If there is a failure, the textbox is emptied and fades from red
 * to white.
 * @param {number} index 
 */
function pay(index) {
    let textbox = document.getElementById(`payment-${index}`);
    let value = textbox.value;

    if (!value) {
        return;
    }
    
    if (shop) {
        let vendor = shop.name;
        let item = shop.inventory.content[index];
        let price = parseInt(indexedPrice[vendor][index], 10);
        // Call transaction function
        let response = makeTransaction(shop, item, price, value);
        if (response.status === "failure") {
            textbox.value = "";
            textbox.style.backgroundColor = "rgb(255, 30, 30)";
            fadeToWhite(textbox, 125);
        }
    } else {
        return;
    }
}

// Color helper
function fadeToWhite(text, base, rounds = 10) {
    let curr = 1;
    baseColor = 255 - base;
    text.style.backgroundColor = `rgb(255, ${base + curr * baseColor / rounds}, ${base + curr * baseColor / rounds})`
    if (curr <= rounds) {
        setTimeout(() => {
            fadeToWhite(text, base, rounds - 1);
        }, 50)
    }
}

/**
 * Implement the body of this function.
 * 
 * Sets the theme of game based on the form input.
 * 
 * Called when settings are to be updated. There are two
 * possible parameters: standard | night
 * @param {string} theme The theme of the game, either one in the daytime or nighttime
 * 
 */
function setTheme(theme) {
    let paths = document.querySelectorAll('path');
    /* START OF IMPLEMENTATION */
    /* END OF IMPLEMENTATION */
}

/**
 * Implement this function.
 * 
 * Ends the game when the timer hits 0.
 */
function endGame() {
    /* START OF IMPLEMENTATION */
    // Hide the stalls
    // Hide any active shop modals
    // Show endscreen modal - Notice what the CSS says for how it is to be displayed
    /* END OF IMPLEMENTATION */
    
    // Populate the inventory
    let inventory = document.getElementById("mkt-player-inventory");
    player.getInventory().content.forEach(v => {
        inventory.innerHTML += `<p>${v}</p>`
    })
}

/**
 * Opens up the modal with the items of the specified vendor
 * @param {string} vendor The name of a vendor.
 */
function shopWith(vendor) {
    // Gets the vendor from the global array
    shop = vendors.filter(v => v.name === vendor)[0];

    // Unhide modal
    let backdrop = document.getElementById("mkt-interact-backdrop");
    backdrop.style.display = "block";

    // Show vendor's name
    let modal = document.getElementById("mkt-interact-modal");
    let currHTML = modal.innerHTML;
    modal.innerHTML = `<h3>${vendor}</h3>` + currHTML;

    let modalList = document.getElementById("mkt-inventory");
    shop.inventory.content.forEach((v, i) => {
        modalList.innerHTML += `<li>${v}<input type="text" id="payment-${i}"/><button onclick="pay(${i})">Offer!</button></li>`
    })
}

/**
 * Renders the GUIs again after a successful payment
 * @param {string} vendor The name of the vendor to reload
 */
function rerender() {
    // Shop modal
    let modalList = document.getElementById("mkt-inventory");
    modalList.innerHTML = "";
    shop.inventory.content.forEach((v, i) => {
        modalList.innerHTML += `<li>${v}<input type="text" id="payment-${i}"/><button onclick="pay(${i})">Offer!</button></li>`
    });

    // Currency
    let currency = document.getElementById('mkt-currency');
    currency.innerHTML = `$${player.balance}`;
}

/**
 * Shows the stalls after play has been pressed.
 */
function showStalls() {
    let wrapper = document.getElementById("mkt-stall-wrapper");
    wrapper.style.display = "flex";
}

/**
 * Closes the shop window and resets the shared modal's content
 */
function closeShop() {
    let wrapper = document.getElementById("mkt-interact-backdrop");
    wrapper.style.display = "none";

    let modal = document.getElementById("mkt-interact-modal");
    modal.innerHTML = modal.innerHTML.substring(modal.innerHTML.lastIndexOf('</h3>') + 5);

    let modalList = document.getElementById("mkt-inventory");
    modalList.innerHTML = "";
    shop = undefined;
}

/**
 * Starts the game timer
 */
let timer;
function startTimer() {
    timer = setInterval(tick, 1000);
}

/**
 * Ticks the timer GUI every second
 */
function tick() {
    let timerEl = document.getElementById("mkt-timer");
    let currTime = parseInt(timerEl.innerHTML);
    if (currTime === 0) {
        clearInterval(timer);
        endGame();
        return;
    }
    timerEl.innerHTML = currTime - 1;
}

/**
 * Returns player to play/settings menu and resets the game
 */
function playAgain() {
    setTheme("day");
    player = new Player('Player', 'player');
    updateSettings({
        variant: "standard",
        mode: "standard",
        theme: "day"
    });
    loadDefault();
    let settings = document.getElementById("mkt-settings");
    let end = document.getElementById("mkt-endscreen");
    end.style.display = "none";
    settings.style.display = "block";
}