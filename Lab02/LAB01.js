const prompt = require("prompt");

// start the prompt system
prompt.start();

prompt.get(["userSelection"], function (err, result) {
  if (err) throw err;

  const userSelection = result.userSelection.toUpperCase();
  console.log("User chose: " + userSelection);

  // Generate computer selection
  let random = Math.random();
  let computerSelection;

  if (random <= 0.34) {
    computerSelection = "PAPER";
  } else if (random <= 0.67) {
    computerSelection = "SCISSORS";
  } else {
    computerSelection = "ROCK";
  }

  console.log("Computer chose: " + computerSelection);

  // Determine winner
  if (userSelection === computerSelection) {
    console.log("It's a tie!");
  } else if (
    (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (userSelection === "PAPER" && computerSelection === "ROCK") ||
    (userSelection === "SCISSORS" && computerSelection === "PAPER")
  ) {
    console.log("User Wins!");
  } else {
    console.log("Computer Wins!");
  }
});
