const wsUri = "wss://echo-ws-service.herokuapp.com";
function pageLoaded() {
    const infoOutput = document.querySelector('.info_output')// блок информационный. Например, соединение установлено или не установлено
    const chatOutput = document.querySelector('.chat_output')
    const input = document.querySelector('input')
    const sendButton = document.querySelector('.btn_send')
    const geoLocationButton = document.querySelector('.btn_geo')


    let socket = new WebSocket(wsUri);

    socket.onopen = () => {  
        infoOutput.innerText = 'Connect' // когда сокет откроется, пишем в инфоОутпут что соединение установлено
        

    }
     socket.onmessage = (event) => {
        writeToChat(event.data, true)
    }
    sendButton.addEventListener('click', sendMessage)
    function sendMessage() {
        if(!input.value) return; { // если строка пустая, то выходим из функции
            socket.send(input.value)
            writeToChat(input.value, false) //соощение не полученное а отправленое( поэтому false)
            input.value === "";
            
        }
    }
    const error = () => {
        writeToChat(`Не возможно получить ваше местоположение`)
    }
    const success = (position) => {
        let geoUrl = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
        writeToChat(`<a href=${geoUrl} target="_black">Гео-локация</a>`,'sent') 
    } 
    geoLocationButton.addEventListener('click', () => {
        if(!navigator.geolocation) {
            writeToChat('Геолокация не поддерживается вашим браузером')
        }else {
            navigator.geolocation.getCurrentPosition(success, error)
        }
    })
    function writeToChat(message, isRecieved) { //если соощение получено то один класс, если оно отправлено то другой
        let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`
        chatOutput.innerHTML += messageHTML; // к текущему содержимому добавляем новое содержимое
       
    }
}


document.addEventListener('DOMContentLoaded', pageLoaded)