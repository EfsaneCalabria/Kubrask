const { MessageEmbed } = require('discord.js')
const db = require('croxydb');
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");
const ayarlar = require("../ayarlar.json");

exports.run =  async (client, message, args) => {
if (message.channel.id !== "891366478207656089") return message.channel.send("Bu Komutu Sadece Kayıt Chatte Kullanabilirsin <#891366478207656089>").then(x => x.delete({timeout: 10000})); 
  
if(!['895910408974630942'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${client.emojis.cache.get(ayarlar.emojiler.iptal)} ${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)//PROJENİN SAHİBİ KABUS
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
  
const tag = '✰'   
const kadınrol = message.guild.roles.cache.find(r => r.id == '891366464802680873')
const kadınrol1 = message.guild.roles.cache.find(r => r.id == '891366464802680873')

const erkekrol = message.guild.roles.cache.find(r => r.id === '891366464802680873') //erkek rol id
const erkekrol1 = message.guild.roles.cache.find(r => r.id === '891366464802680873') //erkek rol id

const kayıtsız = message.guild.roles.cache.find(r => r.id === '891366484096462930')//kayıtsız id
const genelchat = message.guild.channels.cache.find(c => c.id === '891366478207656089')//genelchat id
const savelog = message.guild.channels.cache.find(c => c.id === '891366478207656089')//savelog id

if(!kadınrol) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`1. Kadın rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
  
if(!kayıtsız) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Kayıtsız rolü ayarlanmamış/yanlış id girilmiş kayıt işlemine devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bir kullanıcı belirt.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

let Name = args[1]
let age = Number(args[2])

if(!Name) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir İsim Belirtmelisin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(!age) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir Yaş Belirtmelisin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Kendini Kayıt Edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.id === client.user.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bot Kayıt Edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Sunucu Sahibini Kayıt Edemezsin.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Belirtilen Kullanıcı Senden Üst/Aynı Pozisyonda İşleme Devam Edilemez.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
  
if (age < 14) return message.channel.send(`Kayıt ettiğin üyenin yaşı 14'ten küçük olamaz.`).then(x => x.delete({timeout: 5000}));
if(member.roles.cache.has(ayarlar.kadınrol)) return message.channel.send('Bu kullanıcı zaten kayıtlı!').then(x => x.delete({timeout: 5000}));
if(member.roles.cache.has(ayarlar.kadınrol1)) return message.channel.send('Bu kullanıcı zaten kayıtlı!').then(x => x.delete({timeout: 5000}));
if(member.roles.cache.has(ayarlar.erkekrol)) return message.channel.send('Bu kullanıcı zaten kayıtlı!').then(x => x.delete({timeout: 5000}));
if(member.roles.cache.has(ayarlar.erkekrol1)) return message.channel.send('Bu kullanıcı zaten kayıtlı!').then(x => x.delete({timeout: 5000}));
  
let atılmaay = moment(Date.now()+10800000).format("MM")  
let atılmagün = moment(Date.now()+10800000).format("DD")
let atılmasaat = moment(Date.now()+10800000).format("HH:mm:ss")
let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\`` 
moment.locale("tr")
  
let kizteyit = db.add(`kizteyit_${message.author.id}`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)

let logs = db.get(`kullanici.${member.id}.isimler`) || [];
logs = logs.reverse();
let ismleri = logs.length > 0 ? logs.map((value, index) => `\`${index + 1}.\` ${value.İsim} - ${value.Yaş} (<@&${value.Rol}>)`).join("\n") : "\`•\` **Kaydı Bulunamadı!**";
 
db.push(`kullanici.${member.id}.isimler`, {
İsim: Name,
Yaş: age,
Rol: ayarlar.kadınrol
});

let alldata = db.fetch(`yetkili.${message.author.id}.toplam`)


await member.roles.add(kadınrol),
await member.roles.add(kadınrol1),
await member.roles.remove(kayıtsız),
await member.setNickname(`${tag} ${Name.charAt(0).toUpperCase() + Name.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}`).catch(e => { });
   
message.channel.send(new MessageEmbed()
.setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setDescription(`
<a:gooo:914128539303940166> **${member} Kişisi (<@&${ayarlar.kadınrol}> <@&${ayarlar.kadınrol1}>)Kayıt Edildi**
${message.author} **Toplam** \`${alldata}\` **Kayıta Sahip.**\n
**Kullanıcının Önceki Kayıtları**\n ${ismleri}`)
.setColor('PURPLE')).then(x => x.delete({timeout: 35000}));
message.react('<a:kabusonay:891366477603680318>')      

  
genelchat.send(`
<a:cacam:897919585381142599> **Sunucumuza Hoş Geldin** ${member}
<a:cacam:897919585381142599> **Seninle Birlikte ${message.guild.memberCount} Kişiyiz**`)
  
 const dmlog = new MessageEmbed()
.setDescription(`
${member} Tebrikler, \`${message.guild.name}\` Sunucusunda \`Kadın\` Olarak Kaydedildin.
İsmin \`${Name} | ${age}\` Olarak Değiştirildi.`)
.setFooter(`Eğer Kaydında Bir Yanlışlık Varsa \`Bot Commands\` Rolündekilerine Bildir.`)
.setColor('PURPLE')
 member.send(dmlog)   
  
savelog.send(new MessageEmbed()
.setTitle ("Bir Kadın Kullanıcı Aramıza Katıldı")
.setThumbnail(message.author.avatarURL)
.setDescription(`
\`˃\` Kayıt Eden Yetkili: ${message.author}
\`˃\` Kayıt Olan Kullanıcının Adı:${Name}
\`˃\` Kayıt Olan Kullanıcının Yaşı:${age}
\`˃\` Kayıt Tarihi:\`${kayıttarihi}\``)
.setColor('PURPLE'))


db.push(`isim.${message.guild.id}`, {userID: member.id, isim: Name, role: kadınrol.id})}
exports.conf = {enabled: true, guildOnly: true, aliases: ['kadın', 'k', 'girl', 'woman', 'kız'], permLevel: 0}
exports.help = {name: 'kadın', description: "Etiketlenen kişiyi kadın rolleriyle kayıt eder.", usage: '.kadın @etiket/id İsim Yaş'}
