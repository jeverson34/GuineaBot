const discordXP = require('discord-xp')
const Discord = require("discord.js")
module.exports = {
    name: 'addlevel',
    aliases: [ "+lvl"],
    minArgs: 1,
    maxArgs: 2,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <mention member> <amount>` or `{PREFIX}{COMMAND} <amount>`",
    description: "Adds levels",
    run: async (message, args, client, prefix, command) => {
        let target = message.mentions.members.first()

        if (target) {
            let amountToAdd = parseInt(args[1])
            if (isNaN(amountToAdd)) return message.channel.send("Specify a **number** please.")

            discordXP.appendLevel(target.id, message.guild.id, amountToAdd)
            setTimeout(async () => {
                let XPuser = await discordXP.fetch(target.id, message.guild.id)

                message.channel.send(`${message.author} has given **${amountToAdd}** levels to ${target}, they are now at level **${XPuser.level}**.`)
            }, 1000)
        } else if (!target) {
            let amountToAdd = parseInt(args[0])
            if (isNaN(amountToAdd)) return message.channel.send("Specify a **number** please.")

            discordXP.appendLevel(message.author.id, message.guild.id, amountToAdd)
            setTimeout(async () => {
                let XPuser = await discordXP.fetch(message.author.id, message.guild.id)

                message.reply(`I have given you **${amountToAdd}** levels, you are now at level **${XPuser.level}**.`)
            }, 1000)
        }
    }
}