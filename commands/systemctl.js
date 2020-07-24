        
            console.log(argstring)
            switch (argstring){
                case "commie":
                    commie = !commie
                    msg.channel.send(commie)
                    break
                case "simp":
                    simp = !simp
                    msg.channel.send(simp)
                    break
                case "react":
                    react = !react
                    msg.channel.send(react)
                    break
                case "gnu":
                    interject = !interject
                    msg.channel.send(interject)
                    break
                case "anthem":
                    anthem = !anthem
                    msg.channel.send(anthem)
                    break
                case "spam":
                    spam = !spam
                    msg.channel.send(spam)
                    break
                default:
                    msg.channel.send(`Failed to enable unit, unit ${argstring}.service does not exist.`)
                    break
            }
            