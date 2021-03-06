const {
    canModifyQueue
} = require("../../util/util")

module.exports = {
    name: "stop",
    minArgs: 0,
    maxArgs: 0,
    description: "Clear the queue",
    category: "Music",
    run: async ({ message, args, text, client, prefix, instance }) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.reply("There is no song playing right now.")
        if (!canModifyQueue(message.member, message.channel)) return

        queue.songs = []
        queue.connection.dispatcher.end()
        queue.textChannel.send(`${message.author} ⏹ stopped the music.`)
    }
}