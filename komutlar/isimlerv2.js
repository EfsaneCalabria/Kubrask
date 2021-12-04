const Discord = require('discord.js');
const db = require('croxydb');
const moment = require('moment');
const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
let tag = '✰' //İsmin önüne gelecek simge,tag   
let ikinciTag = '✰'
 const permError = new MessageEmbed()
    .setColor('RED')
    .setTitle('Başarısız')
    .setAuthor(message.author.tag, message.author.avatarURL({ size:1024, dynamic:true, format: "png"}))
    .setDescription(`${client.emojis.cache.get(ayarlar.emojiler.iptal)} Bu Komutu Kullanmak İçin <@&${ayarlar.NickHammer}> Yetkisine Sahip Olmalısın!`) 
  if (!message.member.roles.cache.has(ayarlar.NickHammer)) return message.channel.send(permError).then(x => x.delete({timeout: 5000})); 
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
  if (!isim) return message.channel.send('Bir isim yazmalısın.').then(x => x.delete({timeout: 5000}));
  if (!yaş) return message.channel.send('Bir yaş yazmalısın.').then(x => x.delete({timeout: 5000}));
  if (isNaN(yaş)) return message.channel.send('Yaş sadece sayı olarak kabul edilir.').then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send((`Bu Kullanıcı Senden Üst/Aynı Pozisyonda.`)).then(tedoa => tedoa.delete({timeout : 7000})) 

  let gün = moment(message.createdAt).format("DD.");
let yıl = moment(message.createdAt).format("YYYY HH:mm:ss");
let ay = moment(message.createdAt).format("MM.")
.replace("Ocak").replace("Şubat")
.replace("Mart").replace("Nisan")
.replace("Mayıs").replace("Haziran")
.replace("Temmuz").replace("Ağustos")
.replace("Eylül").replace("Ekim")
.replace("Kasım").replace("Aralık");
  let kayıtlımı = await db.fetch(`kayıtkişi_${member}`)
  let eskikayıt = await db.fetch(`kayıtisim_${member}`)
  let toplamisim = `${gün}${ay}${yıl} tarihin de <@${message.author.id}> tarafından \`${tag} ${isim} | ${yaş}\` **(Yeni İsim)** Olarak İsim Değişikliği Yapılmış.`
  let Isim = `${member.user.username.includes(tag) ? tag : (ikinciTag ? ikinciTag : (tag || ""))} ${isim} | ${yaş}`
  member.setNickname(Isim)
  if(kayıtlımı !== 'evet') {
  db.set(`kayıtkişi_${member}`, 'evet')
  db.set(`kayıtisim_${member}`, toplamisim)
  db.push(`eskikayıt_${member.id}`, toplamisim)
  db.add(`toplamik_${member.id}`, 1)
  let embed = new Discord.MessageEmbed()
  .setColor('f5f5f5')
  .setDescription(`${member} Kişisinin İsmi "${tag} ${isim} | ${yaş}" Olarak Değiştirildi! `)
  .setTimestamp()
  message.channel.send(embed).then(x => x.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }))
  } 
  if(kayıtlımı === 'evet') {
  db.set(`kayıtisim_${member}`, toplamisim)
  db.push(`eskikayıt_${member.id}`, toplamisim)
  db.add(`toplamik_${member.id}`, 1)
    let embed = new Discord.MessageEmbed()
  .setDescription(`
<@${message.author.id}> İsmini "${tag} ${isim} | ${yaş}" Olarak Değiştirdim Fakat Eski Kayıtlar Buldum.
${toplamisim}
\`.isimler ${member.id}\` Komutuyla Üyenin Geçmiş İsimlerine Bakmanız Tavsiye Edilir.`)
.setTimestamp()
.setColor('f5f5f5')
message.channel.send(embed).then(x => x.delete({timeout: 10000}));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['i'],
  permLevel: 0
}
exports.help = {
  name: 'isim',
  description: "Kullanıcıların isimini değiştiren sistem",
  usage: 'isim @kişi isim yaş'
}