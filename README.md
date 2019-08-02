1. Install Node.JS
1. `cd website && npm start` to startup a dev server that auto-refreshes your browser.


# TO DO

1. QR code to join the game
1. Showcase features of AppSync, like subscriptions: read appsync docs, decide which can be shown here
1. Quiz main board with categories and money amounts
1. Attendees connect
1. MC clicks a question, main board shows it and unlocks the players buzzers
1. Each player's browser shows the question and has a "Bzzz!" Button
1. Main board shows leader board with the order in which people buzzed in
1. From top down, the head person has "Correct!" And "Nope" buttons.
1. MC clicks one.  If correct, clears people on the leaderboard and awards prize money
1. MC clicks "Nope" pops the top person and moves to next person.
1. MC has a "clear the board" button that removes all answered people on the leader board
1. Websockets and AppSync subscribe
1. Create Quiz Game screen: Paste YAML description of the questions, answers, and categories.
1. Mobile version too!
1. As the MC, I'm a separate web connection from a mobile device, laptop + screen is the Main Board with no user interaction possible.
1. MC mobile app: click buttons to make the game progress.  It's more of an intelligent TV remote: it doesn't display the whole board all the time, no animations, setup to allow MC to easily run the game.
1. MC app shows the ANSWER too for reference.
1. All based on creating/logging-in as a user.  If lose admin connection, just launch browser/phone, login, and it shows the other games you created that are still running.  Connect to one and control it.
1. "Final Jeopardy": asks a question, people write their answer on their screens, emcee steps through each once they are all submitted.  Awards money based on their wager.
1. Handle offline automatically via appsync
1. Conflict resolution?
1. Security: only the owner of a quiz show can see the answer field.
1. How can this call more than one data source to demonstrate field-level different sources?
