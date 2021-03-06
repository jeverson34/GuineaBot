const Discord = require("discord.js")
module.exports= {
    name: 'connect',
    aliases: [ 'join'],
    minArgs: 0,
    maxArgs: 0,
    description: "Connect to your current voice channel",
    category: "Music",
    run: async({ message, args, text, client, prefix, instance }) => {
        const channel = message.member.voice.channel
        if (!channel) return message.channel.send("You need to be in a voice channel first!").catch(console.error);
        if (message.guild.me.voice.channel) return message.channel.send("I'm already connected to a voice channel.")
        message.member.voice.channel.join()
        message.channel.send(`Successfully joined **${message.member.voice.channel.name}**`)
    }
}