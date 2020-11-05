function getPlatforms(url, callback) {
    const request = new XMLHttpRequest()

    request.open('get', url)

    request.onload = () => {
        callback(JSON.parse(request.responseText).platformsOptions)
        
        // Caso de algum erro lá com a FakeAPI, pq deu mó trabalhao algumas coisas
        // {"platformsOptions": [{"id":0,"value":"PS4"},{"id":1,"value":"Sinuca/PingPong"},{"id":2,"value":"Monopoly"},{"id":3,"value":"War"}]}
        // + { platformsOptions: { platformsOptions } }
        // Object Destructuring: Extracting properties from nested objects

        //const { platformsOptions } = JSON.parse(request.responseText)
    }

    request.send()
}

function enterPlatformQueue(url, user, callback) {
    const request = new XMLHttpRequest()

    request.open('post', url)

    request.onload = () => {
        callback(JSON.parse(request.responseText))
    }

    request.send(JSON.stringify(user))

}

export { getPlatforms, enterPlatformQueue }