const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json")
//calabria is god bebegim ananı skm

exports.run = async (client, message, args) => {

if(!['895910408974630942'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${client.emojis.cache.get(ayarlar.emojiler.iptal)} ${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)//PROJENİN SAHİBİ KABUS
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

let rolsuztanim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

if(args[0] == "ver") {
    rolsuztanim.forEach(r => {
r.roles.add("899677540682203186") //rolsüz id
})
const ver = new Discord.MessageEmbed()
.setAuthor(" "+message.author.username +" ", message.author.avatarURL())
.setDescription("Sunucuda rolü olmayan \`"+ rolsuztanim.size +"\` kişiye kayıtsız rolü verildi!")
.setColor("BLACK")
message.channel.send(ver).then(x => x.delete({timeout: 5000}))
} else if(!args[0]) {
const kayıtsız2 = new Discord.MessageEmbed()
.setAuthor(""+message.author.username +" ", message.author.avatarURL())
.setDescription("Sunucumuzda rolü olmayan \`"+ rolsuztanim.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!")
.setColor("BLACK")
message.channel.send(kayıtsız2).then(x => x.delete({timeout: 5000}))
}


}

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["rolsuz"],
permLevel: 0
};

exports.help = {
name: "rolsüz",
description: "Rolsüz olanlara unregister verme komutu.",
usage: "rolsüz"
}; 