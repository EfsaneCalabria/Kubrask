const { MessageEmbed } = require("discord.js");
const ayarlar = require("../ayarlar.json");
exports.run = async(client, message, args) => {
if(!message.member.permissions.has("MANAGE_ROLES")) return;
const embed = new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL()).setTimestamp().setColor("00f1ff")
        var member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription("Ne yazık ki komutu kullanan kişide yetki yok"))
        if (!member) return message.channel.send(embed.setDescription("Lütfen bir kullanıcıyı etiketle."))
        await message.guild.members.cache.get(member.id).roles.add("895910412728557608")
        message.channel.send(embed.setDescription(`${member} kullanıcısına başarıyla <@&${"895910412728557608"}> rolü verildi!`)).then(x => x.delete({timeout: 12000})); 
        message.react('<a:kabusonay:891366477603680318>')} 


exports.conf = {
aliases: [],
permLevel: 0
};
exports.help = {
name: "vip"
};