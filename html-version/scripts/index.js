// Here you will implement the main functionality
/*
Functionality of this game will include the following
- Set up before starting
- Start the game
- Market interactions
*/

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
    let settings = {
        variant: variants.filter(v => v.checked)[0].value,
        theme: themes.filter(v => v.checked)[0].value,
        mode: modes.filter(v => v.checked)[0].value
    };
    updateSettings(settings);
}

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
    let settings = document.getElementById("mkt-settings");
    settings.style.display = "none";

    // This line will not exist in the file.
    // In fact, this entire function will be empty
    startTimer();
}