const Discord = require('discord.js');
const { MessageEmbed, Client, Message } = require("discord.js");
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');;
exports.run = (client, message, args) => {
if (message.channel.id !== "891366478207656089") return message.channel.send("Bu Komutu Sadece Kayıt Chatte Kullanabilirsin <#891366478207656089>").then(x => x.delete({timeout: 10000})); 
if(!['895910408974630942'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));  

let üye = message.mentions.users.first() || message.author
let toplam = db.fetch(`yetkili.${üye.id}.toplam`)
let erkek = db.fetch(`erkekteyit.${üye.id}`)
let kız = db.fetch(`kizteyit_${üye.id}`)
if(toplam === null) toplam = 0
if(erkek === null) erkek = 0
if(kız === null) kız = 0
let baba = new Discord.MessageEmbed()
.setAuthor(`${üye.username} Adlı Kullanıcının Teyit Bilgileri`)
.setThumbnail(üye.avatarURL())
.setDescription(`
<a:calab:909498073401667664> Kaydedilen toplam erkek üye sayısı : **${erkek}**
<a:calab:909498073401667664> Kaydedilen toplam kadın üye sayısı : **${kız}**
<a:calab:909498073401667664> Kaydedilen toplam üye sayısı : **${toplam}**`)
.setFooter(message.author.username+` Tarafından İstendi`) 
.setTimestamp()
message.channel.send(baba).then(x => x.delete({timeout: 20000}))}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kb","rank","info","information"],
    permLevel: 0
}
exports.help = {
    name: 'kb',
    description: 'İsmini yazdığınız emoji hakkında bilgi verir',
    usage: 'profil'
}