function getPlatforms(callback) {
    const request = new XMLHttpRequest()

    request.open('get', 'https://www.fakeapi.online/api/apis/jaimemathias/api/platform')

    request.onload = () => {
        const { platformsOptions } = JSON.parse(request.responseText)
        //console.log(platformsOptions);
        callback(platformsOptions)
        // Caso de algum erro lá com a FakeAPI, pq deu mó trabalhao algumas coisas
        // {"platformsOptions": [{"id":0,"value":"PS4"},{"id":1,"value":"Sinuca/PingPong"},{"id":2,"value":"Monopoly"},{"id":3,"value":"War"}]}
        // + { platformsOptions: { platformsOptions } }
        // Object Destructuring: Extracting properties from nested objects
    }

    request.send()
}

export { getPlatforms }