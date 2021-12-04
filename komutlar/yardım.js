const Discord = require ("discord.js");
const { MessageEmbed } = require("discord.js");
exports.run = (client, message) => {
if (message.channel.id !== "896043785925058670") return message.channel.send("Bu Komutu Sadece Yetkili Odasında Kullanabilirsin <#896043785925058670>").then(x => x.delete({timeout: 5500})); 
if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
const zort = new Discord.MessageEmbed()

.setColor("RANDOM")
.setTitle("-")
.setDescription(`
**• Komutlar**
>  \`•\` **.e**:[Erkek]
>  \`•\` **.k**:[Kız]
>  \`•\` **.kb**:[Teyit Listesi]
>  \`•\` **.isimler**:[Kullanıcının Eski İsimlerini Listeler]
>  \`•\` **.sıfırla**:[Teyit Bilgilerini Sıfırlar]
>  \`•\` **.kayıtsız**:[Kullanıcıyı Kayıtsıza Atar]
>  \`•\` **.tagtara**:[Tagı Olanlara Rol Verir]
>  \`•\` **.vip**:[Verilecek Kişi]
>  \`•\` **.rolsüz ver**:[Rolsüzlere Unregister Verir]
>  \`•\` **.taglı**:[Taglı Kişileri Sayar]
>  \`•\` **.ping**:[Bot Pingi]
>  \`•\` **.say**:[Sunucu Toplam Liste]
>  \`•\` **.say1**:[Sunucu Toplam Liste]
`)

 

return message.channel.send(zort)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'yardım',
    description: 'Botun Komut Listesini Gösterir!',
    usage: '-koruma'
};
