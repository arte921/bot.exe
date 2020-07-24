module.exports = msg => { 
    let discordmsg = await msg.channel.send("starting...")
    setInterval(() => {
        
        discordmsg.edit(".\n" + calc(scene, camera)).catch(console.log(calc(scene, camera)))

        
        camera = [
            add(camera[0], [7.5, 5, 0],  mspf / 10000),
            add(camera[1], [0, 1], rad(100) * mspf / 10000)
        ]

    }, mspf)                     

    
}