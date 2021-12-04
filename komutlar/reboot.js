const Discord = require('discord.js');
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json") // eğer ayarlar.json değilse değiştirin burayı

module.exports.run = async (bot, message, args) => {
    if(message.author.id !== "id") return message.channel.send("bunu sadece sahibim kullanabilir")
    
    message.channel.send(`zort?`).then(msg => {
    console.log(`Konsol: Yeniden başlatılıyor...`);
    process.exit(0);
  })
    
          
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r","reboot","yenile","yeniden başlat"],
  permLevel: 4
};

module.exports.help = {
  name: 'reboot',
  description: 'Şşş!',
  usage: 'reboot'
};
