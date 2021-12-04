//////komutlar/////
const Discord = require('discord.js');
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');;
exports.run = async (client, message, args) => {
  
let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

let yetkilirol = "895910408974630942"
let kayıtsız = "899677540682203186"
let nick  = "Kayıtsız"

if(!message.member.roles.cache.has(yetkilirol)) return message.channel.send("\`Maalesef Yetkin Yok!\`")
let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (user.id === message.author.id) return message.channel.send('Kendini Kayıtsıza Atamazsın').then(x => x.delete({timeout: 5000}));
if (user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(("Kendinden üst/eşit yetkide birisine ceza uygulayamazsın!")).then(x => x.delete({timeout: 5000}))
let data = db.fetch("limit_"+message.author.id)

if(data >= 10) {// Günde 20 Kişiyi Kayıtsız  Attıysa İşlem Görmez

message.channel.send("Günlük Limite Ulaşmışsın").then(x => x.delete({timeout: 5000}));

} else {

message.channel.send("Üye Başarıyla Kayıtsıza Atıldı!").then(x => x.delete({timeout: 5000}))
message.react('<a:kabusonay:891366477603680318>')          


user.roles.set(['899677540682203186'])
user.setNickname(nick)

db.add("limit_"+message.author.id, 1)  
}
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  }

  exports.help = {
    name: 'kayıtsız',
    description: "<prefix>kayıtsız @üye",
    usage: '<prefix>kayıtsız @üye'
  }