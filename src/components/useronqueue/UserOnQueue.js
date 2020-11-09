export function getUserQueuePosition(url, userId, callback) {
    
    const request = new XMLHttpRequest()

    request.open('get', url + '/' + userId)

    request.onload = () => {
        callback(JSON.parse(request.responseText))
        /*callback(
            {
                position: 5
            }
        )*/
    }

    request.send()
}