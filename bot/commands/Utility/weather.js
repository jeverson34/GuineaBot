const Discord = require("discord.js")
const weather = require("weather-js")
module.exports = {
    name: 'weather',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<city>",
    description: "dc",
    run: async (message, args, text, client, prefix, instance) => {
        let city = args.join(" ")
        let degreetype = "C"

        await weather.find({
            search: city,
            degreeType: degreetype
        }, function (err, result) {
            if (!city) return message.channel.send("Please insert the city.");
            if (err || result === undefined || result.length === 0) return message.channel.send("Unknown city. Please try again.");

            let current = result[0].current;
            let location = result[0].location;

            const embed = new Discord.MessageEmbed()
                .setAuthor(current.observationpoint)
                .setDescription(`> ${current.skytext}`)
                .setThumbnail(current.imageUrl)
                .setTimestamp()
                .setColor(0x7289DA)

            embed.addField("Latitude", location.lat, true)
                .addField("Longitude", location.long, true)
                .addField("Feels Like", `${current.feelslike}° Degrees`, true)
                .addField("Degree Type", location.degreetype, true)
                .addField("Winds", current.winddisplay, true)
                .addField("Humidity", `${current.humidity}%`, true)
                .addField("Timezone", `GMT ${location.timezone}`, true)
                .addField("Temperature", `${current.temperature}° Degrees`, true)
                .addField("Observation Time", current.observationtime, true)

            return message.channel.send(embed);
        })
    }
}