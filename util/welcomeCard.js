const { AttachmentBuilder, GuildMember, Attachment, Guild } = require('discord.js')
const Canvas = require('canvas')

const dim = {
    width: 1920,
    height: 1080,
    margin: 50
};

const av = {
    size: 256,
    x: 824,
    y: 438
};

/**
 * Make a welcome card
 * @param {GuildMember} member 
 * @param {Guild} guild
 * @returns {Attachment}
 */

module.exports = async (member, guild) => {
    let username = member.user.username
    let discrim = member.user.discriminator

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "#414549"
    ctx.fillRect(0, 0, dim.width, dim.height)

    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.fillRect(75, 75, dim.width - 3 * dim.margin, dim.height - 3 * dim.margin)

    const avimg = await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'png', dynamic: false, size: av.size }))
    ctx.save()
    
    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(
        avimg, 
        av.x,
        av.y, 
        av.size,
        av.size
    );

    ctx.restore()

    ctx.textAlign = "center"

    ctx.fillStyle = "white"
    ctx.font = "100px Arial"
    ctx.fillText(`Welcome to ${guild.name}`, dim.width/2, dim.height - dim.margin - 800)

    ctx.font = "80px Arial"
    ctx.fillText(`${username}#${discrim}`, dim.width/2, dim.height - dim.margin - 650)

    ctx.fillStyle = "gray"
    ctx.font = "75px Arial"
    ctx.fillText(`${guild.memberCount}th member`, dim.width/2, dim.height - dim.margin - 250)

    return canvas.toBuffer()
}