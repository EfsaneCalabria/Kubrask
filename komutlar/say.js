const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const mapping = {
  " ": "   ",
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
  "?": "❔",
  "#": "#️⃣",
  "*": "*️⃣"
};

let tags = ayarlar.tag;
"abcdefghijklmnopqr".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});
exports.run = function(client, message, args) {
if(!['895910408974630942'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply('Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.').then(x => x.delete({timeout: 5000}));
  let selam = message.guild.members.cache.filter(
    m => m.user.presence.status === "offline"
  ).size;
  let offlinee = `${selam}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");
  let canım = message.guild.memberCount;
  let sunucu = `${canım}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");
  let ben = message.guild.members.cache.filter(
    m => !m.user.bot && m.user.presence.status !== "online"
  ).size;
  let onlinee = `${ben}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");

  let bacınım = message.guild.members.cache.filter(m =>
    m.user.username.includes(tags)
  ).size;
  let tagg = `${bacınım}`
      .split("")
      .map(c => mapping[c] || c)
      .join("");
  
  let legacy = message.guild.members.cache.filter(
    m => m.user.presence.status === "idle"
  ).size;
  let idlee = `${legacy}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");

  let burdanKendimeSelam = message.guild.members.cache.filter(
    m => m.user.presence.status === "dnd"
  ).size;
  let dndd = `${burdanKendimeSelam}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");

  const CuguliyiSeverim = message.guild.channels.cache
    .filter(channel => channel.type == "voice")
    .map(channel => channel.members.size)
    .reduce((a, b) => a + b);
  let sess = `${CuguliyiSeverim}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");

  const boyum158 = message.guild.roles.cache.get("904785681954517044").members.size;
  let kizz = `${boyum158}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");

  const Hayırsızlar = message.guild.roles.cache.get("904784615389147206")
    .members.size;
  let erkekk = `${Hayırsızlar}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");

  const boost = message.guild.premiumSubscriptionCount
let boostt = `${boost}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");

  const kayitsiz = message.guild.roles.cache.get("899677540682203186")
    .members.size;
  let kayitsizz = `${kayitsiz}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");
  
const legacyy = new Discord.MessageEmbed()
.setTitle(`Sunucu İstatikleri`)
.setDescription(`**Sunucuda Toplam ${sunucu} Kişi Var
Sunucumuzda Toplam ${kizz} Kadın Kullanıcı ve ${erkekk} Erkek Kullanıcı Var
Toplam ${offlinee} Offline Kişi Var
Toplam ${onlinee} Online Kişi Var
Boşta Toplam ${idlee} Kişi Var
Rahatsız Etmeyinde Toplam ${dndd} Kişi Var
Ses Kanallarından ${sess} Kişi Bulunuyor.
✭ - Tagını Alan ${tagg} Kişi Var.
Sunucuda Toplam ${boostt} Boost Bulunuyor
**`
    )
    .setColor("GREEN")
//yukardakindende bakabilirsin mevcut degiskenlere
  // ben norsunkine benzesin diye onlari koymadim
  
const sj = new Discord.MessageEmbed()
.setAuthor(`${client.user.username}`, client.user.avatarURL({ dynamic: true }))
.setColor("BLACK")
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setFooter("Komutu Kullanan Kişi: "+message.author.tag+"" , message.author.avatarURL({ dynamic: true }))
.setDescription(`
<a:calab:909498073401667664> Sunucumuzda toplam ${sunucu} üye bulunmakta.
<a:calab:909498073401667664> Sunucumuzda toplam ${erkekk} erkek  ${kizz} kız ve ${kayitsizz} kayıtsız üye bulunmakta. 
<a:calab:909498073401667664> Ses kanallarında toplam ${sess} üye bulunmakta.
<a:calab:909498073401667664> \`✰\` Tagını Alan ${tagg} Kişi Var.
<a:calab:909498073401667664> Sunucuda toplam ${boostt} boost bulunuyor.`)
message.channel.send(sj).then(x => x.delete({timeout: 12000}));
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say"],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "Sunucudaki Online Kişileri Sayar",
  description: "say"
};
