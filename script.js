let parkingSize = 10;
let pozitieMasina;// numar lot parcare

let arraylocuri = [];
class Client {

    static id = 0;
    constructor(owner, licensePlate, entryTime, occupiedLot, timeSummary) {
        this.id = Client.id;
        this.total = 0;
        this.counter = 0;
        this.owner = owner;
        this.licensePlate = licensePlate;
        this.entryTime = '<input type="button" data-client="' + Client.id + '" value="Start count!" onclick="doTimer(this)" />';
        this.occupiedLot = occupiedLot;
        this.timeSummary = '<input  type="text" id="txt-' + Client.id + '" />'
        this.pay = '<input type="button" value="Leave parking and pay now" onclick="stopCount(' + Client.id + '); " />'
        Client.id++;
    }
    static login() {
        let owner = document.getElementById('owner').value
        let licensePlate = document.getElementById('licensePlate').value
        let entryTime;
        let occupiedLot = arraylocuri.length;
        let timeSummary;
        let pay;

        const user = new Client(owner, licensePlate, entryTime, occupiedLot, timeSummary, pay);

        console.log(user)
        if (arraylocuri.length == 10) {
            alert('No free parking lots available')
            return
        }

        arraylocuri.push(user)
        pozitieMasina = occupiedLot;//L-am alocat si ca id pe user

        console.log(arraylocuri)
        display()
        document.getElementById('total-occupied').innerHTML = arraylocuri.length;
    }

}

function display() {
    let lista = document.getElementById('parkingList');
    lista.innerHTML = ""
    for (i = 0; i < arraylocuri.length; i++) {

        lista.innerHTML += `<td id="${pozitieMasina}">${arraylocuri[i].owner}</td>
    <td>${arraylocuri[i].licensePlate}</td>
    <td>${arraylocuri[i].entryTime}</td>
    <td>${arraylocuri[i].occupiedLot}</td>
    <td>${arraylocuri[i].timeSummary}</td>
    <td>${arraylocuri[i].pay}</td>`


    }

}
const user = new Client();
const login = user.login
var t;
var timer_is_on = 0;

let timers = {};
function timedCount(clientId) {

    let clientParked = null;

    for (let client of arraylocuri) {
        if (client.id == clientId) {
            clientParked = client;
            break;
        }
    }
    document.getElementById('txt-' + clientId).value = clientParked.counter;
    clientParked.counter++;
    if (!timers[clientId]) {
        timers[clientId] = setInterval(`timedCount(${clientId})`, 100);//Am lasat la 100 ca sa fie usor de testat, dar in real time ar fi fost 1000 pentru secunde
    }


}

function doTimer(button) {
    let clientId = button.getAttribute('data-client');
    timedCount(clientId);

}

function stopCount(clientId) {
    clearTimeout(timers[clientId]);
    let clientParked = null;

    for (let client of arraylocuri) {
        if (client.id == clientId) {
            clientParked = client;
            break;
        }
    }

    let totalPrice = 10;
    let copyCounter = clientParked.counter;
    copyCounter -= 60;
    while (copyCounter > 0) {
        totalPrice += 5;
        copyCounter -= 60;
    }

    clientParked.total += totalPrice;
    console.log('total price client: ', totalPrice);
    // MyArray.splice(index, 1);
    arraylocuri.splice(arraylocuri.indexOf(clientParked), 1);
    console.log('after leaving: ', arraylocuri);

    document.getElementById('total-occupied').innerHTML = arraylocuri.length;
    document.getElementById('amount-to-pay').innerHTML = 'You need to pay ' + clientLoggedIn.total + ' RON'
    document.getElementById('time').innerHTML = 'You have stayed ' + clientLoggedIn.counter + ' Minutes'
}


let clientLoggedIn = null;

document.getElementById('sign-in').addEventListener('click', function () {
    let username = document.getElementById('username').value;
    console.log('getting status for user: ', username);

    for (let client of arraylocuri) {
        if (client.owner == username) {
            clientLoggedIn = client;
            break;
        }
    }
    if (!clientLoggedIn) {
        console.log('Login failed, there is no such user that used the parking');
        return;
    }
    console.log('Your status is: ', clientLoggedIn);
    
    hide()
});
function hide() {
    var x = document.getElementById("leave-parking");
    if (x.style.display === "none") {
      x.style.display = "inline";
    } else {
      x.style.display = "none";
    }
  }
// TODO: show leave parking only if the user is logged in

document.getElementById('leave-parking').addEventListener('click', function () {
    
    console.log('clientLoggedIn: ', clientLoggedIn);
    stopCount(clientLoggedIn.id);
    hide()
});