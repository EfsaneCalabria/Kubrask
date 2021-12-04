const { Message, Client, MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json')

exports.run = function (client, message, args){
  if(!['895910408974630942'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.").then(x => x.delete({timeout: 5000}));

	  const mapping = {
  "0": "<a:kabus00:891366459551399976>",
  "1": "<a:kabus11:891366455440965652>",
  "2": "<a:kabus22:891366469521260619>",
  "3": "<a:kabus33:891366475439427674>",
  "4": "<a:kabus44:891366476152455228>",
  "5": "<a:kabus55:891366472847343616>",
  "6": "<a:kabus66:891366474374086687>",
  "7": "<a:kabus77:891366468250402867>",
  "8": "<a:kabus88:891366471337377814>",
  "9": "<a:kabus99:891366456762195999>",
	};

	var x_toplam = message.guild.memberCount
	var x_online = message.guild.members.cache.filter(o => o.user.presence.status !== "offline").size
	var x_sesli = message.guild.members.cache.filter(s => s.voice.channel).size
	var x_boost = message.guild.premiumSubscriptionCount
	var x_tagli = message.guild.members.cache.filter(t => t.user.username.includes(ayarlar.tag[0])).size

	var toplam =  `${x_toplam}`.split("").map(c => mapping[c] || c).join("")
	var online =  `${x_online}`.split("").map(c => mapping[c] || c).join("")
	var sesli =  `${x_sesli}`.split("").map(c => mapping[c] || c).join("")
	var tagli =  `${x_tagli}`.split("").map(c => mapping[c] || c).join("")
	var boost =  `${x_boost}`.split("").map(c => mapping[c] || c).join("")

	const embed = new MessageEmbed()
	.setDescription(`
	<a:calab:909498073401667664> Sunucuda toplam **${toplam}** kişi var.
	<a:calab:909498073401667664> Şu anda sunucuda aktif olan **${online}** kişi vardır.
	<a:calab:909498073401667664> Toplamda **${tagli}** kişi tagımızı alarak bizi desteklemiş. 
	<a:calab:909498073401667664> Şu anda toplam **${sesli}** kişi seslide.
	<a:calab:909498073401667664> Sunucumuzda aktif olarak bulunan **${boost}** boost varmış.`)
	message.channel.send(embed).then(x => x.delete({timeout: 12000}));

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say1"],
  permLevel: 0
};

exports.help = {
  name: "say1",
  usage: "Sunucudaki Online Kişileri Sayar",
  description: "say"
};