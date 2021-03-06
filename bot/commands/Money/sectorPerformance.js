const stocksjs = require("stocks.js");
const stocks = new stocksjs(`${process.env.STOCKS_API_KEY}`)
const Discord = require("discord.js");

module.exports = {
    name: "sectorperformance",
    aliases: ["sector"],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<symbol> <timespan>",
    description: "See how a stock is performing in a specific field, documentation: <https://www.alphavantage.co/documentation/>",
    category: "Utility",
    run: async ({ message, args, text, client, prefix, instance }) => {
        message.channel.send("If no data is given to you, it probably means that you provided invalid data.\n\nHere is the documentation for the stocks API: <https://www.alphavantage.co/documentation/>").then(emsg => emsg.delete({
            timeout: 30000
        }))

        let symbol = args[0].toUpperCase()
        let timespan = args[1]

        let options = {
            symbol: symbol,
            timespan: timespan
        }

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Showing sector performance for stock ${options.symbol.toUpperCase()}`)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')

        try {
            let results = await stocks.sectorPerformance(options)

            let str = ""

            for (let i = 0; i < Object.keys(results).length; i++) {
                str += `**${Object.keys(results)[i]}:** ${Object.values(results)[i]}\n`
            }

            embed.setDescription(str)
            
            message.channel.send(embed)
        } catch (err) {
            console.log(err)
            message.channel.send(`An error occurred: \`${err.message}\``)
        }
    }
}