let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
var currentSentence = 0;
var currentLetter = 0;
var mistakes = 0;
let start = new Date();

$(document).ready(function() {
    let keyboardUpper = $("#keyboard-upper-container");
    let keyboardLower = $("#keyboard-lower-container");
    keyboardUpper.hide();
    $("#sentence").text(sentences[currentSentence]);
    $("#target-letter").text(sentences[currentSentence][currentLetter]);

    $(document).keydown(function(event) {
        // highlight keys
        if (event.which === 16) { //shift down
            keyboardLower.hide();
            keyboardUpper.show();
        } else {
            $("#" + event.which).css("background-color", "yellow");
            $("#" + (event.which+32)).css("background-color", "yellow"); //lowercase
        }
    });
    $(document).keyup(function(event) {
        if (event.which === 16) { //shift down
            keyboardUpper.hide();
            keyboardLower.show();
        } else {
            $("#" + event.which).css("background-color", "");
            $("#" + (event.which+32)).css("background-color", ""); //lowercase
        }
    });
    $(document).keypress(function(event) {
        // show feedback
        if (String.fromCharCode(event.which) === sentences[currentSentence][currentLetter]) {
            // correct key
            $("#feedback").append($('<span class="glyphicon glyphicon-ok"></span>'));
        } else {
            // incorrect key
            $("#feedback").append($('<span class="glyphicon glyphicon-remove"></span>'));
            mistakes++;
        }
        $("#yellow-block").css("left", ((currentLetter + 1) * 17.5 + 12) + "px");

        // check if finished
        if (currentLetter === sentences[currentSentence].length - 1) {
            if (currentSentence === sentences.length - 1) {
                // game over
                let end = new Date();
                let minutes = Math.floor(((Math.abs(end - start))/1000)/60);
                var wpm = 54 / minutes - 2 * mistakes;
                $("#target-letter").text("Words Per Minute: " + wpm)
                setTimeout(function() {
                    if (confirm("Would you like to play again?")) {
                        location.reload();
                    }
                }, 5000);
            }
            currentSentence++;
            currentLetter = 0;
            $("#sentence").text(sentences[currentSentence]);
            $("#feedback").empty();
            $("#yellow-block").css("left", "");
        } else {
            currentLetter++;
        }
        $("#target-letter").text(sentences[currentSentence][currentLetter]);
    });
});