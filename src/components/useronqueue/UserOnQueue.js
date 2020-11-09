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

export function leavePlatformQueue(url, userId, callback) {

    const request = new XMLHttpRequest()

    request.open('post', url + '/' + userId)
    // Made it temporarily a post method for testing because FakeAPI has CORS enabbled,
    // so from localhost the delete method doesnt work

    request.onload = () => {
        callback()
    }

    request.send()
}

export function leavePlatformGame(url, userId, callback) {

    const request = new XMLHttpRequest()

    request.open('post', url + '/' + userId)
    // Made it temporarily a post method for testing because FakeAPI has CORS enabbled,
    // so from localhost the delete method doesnt work

    request.onload = () => {
        callback()
    }

    request.send()
}