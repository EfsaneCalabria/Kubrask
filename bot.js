const Discord = require('discord.js');//PROJENİN SAHİBİ Kabus
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
const { MessageEmbed } = require('discord.js')
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');//
//
var prefix = ayarlar.prefix;
//
const log = message => {
    console.log(`${message}`);//
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});



//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\     
client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
  "0": "<a:kabus00:891366459551399976>",
  "1": "<a:kabus11:891366455440965652>",
  "2": "<a:kabus22:891366469521260619>",
  "3": "<a:kabus33:891366475439427674>",
  "4": "<a:kabus44:891366476152455228>",
  "5": "<a:kabus55:891366472847343616>",
  "6": "<a:kabus66:891366474374086687>",
  "7": "<a:kabus77:891366468250402867>"
  "8": "<a:kabus88:891366471337377814>",
  "9": "<a:kabus99:891366456762195999>",}[d];})}

      const kanal = member.guild.channels.cache.find(r => r.id === "895910491011022908");//mesaj atılcak kanal id
      let register = '895910408974630942'
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol ='<a:kabusred:870965542968754207> **Hesap Durumu**:\`Güvenilir Değil\`'
  if (kurulus > 1296000000) kontrol ='<a:kabusonay:870965631888031766> **Hesap Durumu**:\`Güvenilir\`'
    moment.locale("tr");
kanal.send(`
<a:cacam:897919585381142599> Sunucumuza Hoş Geldin <@`+ member + `>
  
<a:cacam1:897927325704941628> Seninle Beraber **`+üyesayısı+`** Kişiye Ulaştık.

<a:cacam1:897927325704941628> Sunucu Odalarını Görebilmek İçin <#895910492307070978> Odalarında Yetkililerimize İsim Yaş Belirtmelisin
  
<a:cacam:897919585381142599> Hesabın \``+gecen+`\` Önce Açılmış 

<a:cacam:897919585381142599> Unutma ki <#895910495939338280> Toplumun Düzenini Sağlamak İçin Var.Kurallarımıza Göz Atmayı İhmal Etme!

<a:cacam1:897927325704941628> Birazdan <@&${register}> Sizinle ilgilenecektir.`)
  
})


//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\     

//------------------------ŞÜPHELİ-HESAP-----------------------\\     

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "899677540682203186") 
     var rol = member.guild.roles.cache.get("895910453434281985") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get("899677540682203186") // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)
  member.user.send('Hesabın 1 Haftadan Daha Önce Açıldığı İçin **Fake** Hesap Kategorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç.')
  setTimeout(() => {
  }, 1000)
     }
      else {
          }
      });

//-----------------------giriş-durum----------------------\\    
 client.login("token")
////-------------------kayıtsız----------------////

 client.on('guildMemberAdd', async (member, guild, message) => {

     let kayıtsız = await db.fetch(`kayitkayıtsızrol.${member.guild.id}`)
     if (!kayıtsız || kayıtsız.toLowerCase() === 'yok') return;
    else {
     try {
            member.roles.add(member.guild.roles.cache.get(kayıtsız))
                          } catch (e) {
     console.log(e)
    }
    }
    });
////////////////////////////////////////////////////////////////////////////////////////////////
client.on("guildMemberAdd", member => {
const meftun2 = require("quick.db").fetch(`tagisimayar_${member.guild.id}`)
var tag = require('quick.db').fetch(`isimtag_${member.guild.id}`)
  
  if (member.bot) return;
  if(!meftun2) return;
  setTimeout(() => {
    member.guild
      .member(member)
      .setNickname(`${tag} ${member.user.username.replace(/[^a-züıöşğç0-9]/gi, " ")}`);
  }, 3000);
});

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = '✰'
  const sunucu = '887782119168946236'
  const log = '896001323764424734'
  const rol = '899677537603563560'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`**${newUser} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim**`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**${newUser.username}, Sunucumuzda Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!**`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("RED").setDescription(`**${newUser} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım**`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**${newUser.username}, Sunucumuzda Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!**`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});



 client.on("guildMemberAdd", member => {       
    let otorol = '899677540682203186' 
      member.roles.add(otorol) 
    });


client.on("guildMemberAdd", async member => {
   let guild = member.guild;
   if(guild.id !== '887782119168946236') return;
   let otorol = '899677540682203186' 
   member.roles.add(otorol) 
    });


/////main/////
 client.on('ready', () => {
setInterval (() => {
let server = client.guilds.cache.get("887782119168946236")
server.members.cache.filter(u => db.get("limit_"+u.user.id)).map(m => {
db.delete("limit_"+m.user.id)

})
    }, 1800000);
}); 



client.on('message', async msg => {
  let prefix = ayarlar.prefix 
  if(msg.content == `<@!901226576836956240>`) return msg.channel.send(`**Biri Beni mi Çağırdı? Prefixim (.)**`);
});

client.on("message", message => {
    if(message.content.toLowerCase() == "tag") 
    return message.channel.send(`\`✰\``)
});


client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "Zort" }, status: "online" });
  });




client.on("guildMemberAdd", member => {
  let tag = ayarlar.sunucutagı
  let log2 = ayarlar.taglog
  let rol = ayarlar.tagrolü
if(member.user.username.includes(tag)){
member.roles.add(rol)
client.channels.cache.get(log2).send(` ${member} \` Sunucuya taglı olarak giriş yaptı.\``);
}
})
