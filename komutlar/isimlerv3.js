const Discord = require("discord.js"),
client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const db = require('croxydb');
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {

if(!['891366478207656089'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${client.emojis.cache.get(ayarlar.emojiler.iptal)} ${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
  
  
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) return message.chanenl.send('`Bu işlemi gerçekleştirmek için bir üye belirtmelisin!`').then(x => x.delete({ timeout: 2000 }));

let logs = db.get(`kullanici.${member.id}.isimler`) || [];
logs = logs.reverse();
let ismleri = logs.length > 0 ? logs.map((value, index) => `\`${index + 1}.\` ${value.İsim} - ${value.Yaş} (<@&${value.Rol}>)`).join("\n") : "Kaydı Bulunamadı!";

message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`**Kullanıcının önceki kayıtları**;\n ${ismleri}`)).then(x => x.delete({ timeout: 10000 }))

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: "isimler"
};