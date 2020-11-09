function getPlatforms(url, callback) {
    const request = new XMLHttpRequest()

    request.open('get', url)

    request.onload = () => {
        callback(JSON.parse(request.responseText).platformsOptions)
        /*callback([
            {
                id:0,
                value:"PS4"
            },
            {
                id:1,
                value:"Sinuca/PingPong"
            },
            {
                id:2,
                value:"Monopoly"
            },
            {
                id:3,
                value:"War"
            }
        ])*/
    }

    request.send()
}

function enterPlatformQueue(url, user, callback) {
    const request = new XMLHttpRequest()

    request.open('post', url)

    request.onload = () => {
        callback(JSON.parse(request.responseText).userInfo)
    }

    request.send(JSON.stringify(user))

}

function getPlatformsQueue(url, callback) {
    const request = new XMLHttpRequest()

    request.open('get', url)

    request.onload = () => {
        callback(JSON.parse(request.responseText).platformQueue)
        /*callback([
            {
                id: 0, 
                queueCount: 10
            },
            {
                id: 1, 
                queueCount: 4
            },
            {
                id: 2, 
                queueCount: 5
            },
            {
                id: 3, 
                queueCount: 7
            }
        ])*/
        
    }

    request.send()
}

export { getPlatforms, enterPlatformQueue, getPlatformsQueue }