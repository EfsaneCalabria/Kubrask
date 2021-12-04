const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const db = require('croxydb');
exports.run = async (client, message, args) => {
  
if(!["900058728303329421"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))//PROJENİN SAHİBİ KABUS
.setDescription(`Bir kullanıcı belirt.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Belirtilen Kullanıcı Senden Üst/Aynı Pozisyonda İşleme Devam Edilemez.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

let bilgi = db.get(`yetkili.${member.id}`);  //PROJENİN SAHİBİ KABUS
db.delete(`yetkili.${message.author.id}.erkek`)
db.delete(`yetkili.${message.author.id}.toplam`)  
db.delete(`yetkili.${message.author.id}.kadin`)
let toplami = db.fetch(`yetkili.${message.author.id}.toplam`)  
message.react('<a:kabusonay:891366477603680318>')          

message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setColor("AQUA")
.setDescription(`${member} Adlı Kullanıcının Kayıt Verileri, <@${message.author.id}> Tarafından Sıfırlandı.`)).then(x => x.delete({timeout: 5000}))
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sıfırla", "kayıt-sıfırla",],
    permLevel: 0
};
exports.help = {
    name: "sıfırla"
}

