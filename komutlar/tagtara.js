const { MessageEmbed } = require("discord.js");
const kabus = require("../ayarlar.json");
exports.run = async(client, message, args) => {
if(!['895910408974630942'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.").then(x => x.delete({timeout: 5000}));
   let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter("Calabria🖤")
    let tag = kabus.tag
    let tagrol = kabus.tagrol
    let taglılar = message.guild.members.cache.filter(s => s.user.username.includes(tag) && !s.roles.cache.has(tagrol))
    let tagsızlar = message.guild.members.cache.filter(s => !s.user.username.includes(tag) && s.roles.cache.has(tagrol))

    taglılar.array().forEach((kabus, index) => {
        setTimeout(async() => {
            kabus.roles.add(tagrol)
        }, index * 1000)
    })
    tagsızlar.array().forEach((kabus, index) => {
        setTimeout(async() => {
            kabus.roles.remove(tagrol)
        }, index * 1000)
    })
    message.channel.send(embed.setDescription(`**${taglılar.size}** Kullanıcıya Taglı Rolü Verilecek.\n **${tagsızlar.size}** Kullanıcıdan Taglı Rolü Alınacak.`).setFooter("Kabus")).then(x => x.delete({ timeout: 16000 }) && message.delete({ timeout: 16000 }));
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["tagtara"],
    permLevel: 0,
    name: "tagtara"
  }
  
  exports.help = {
    name: "tagtara"
  };