const Hangman = require("./assets/hangman")
module.exports = {
    name: "hangman",
    aliases: [ "hang" ],
    minArgs: 0,
    maxArgs: 0,
    description: "hangman game",
    run: async (message, args, text, client, prefix, instance) => {
        //Call a new instance of Hangman
        const game = new Hangman(client)

        //Start the game
        game.newGame(message)
    }
}