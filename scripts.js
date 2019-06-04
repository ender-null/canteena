function showCard(response) {
    console.log('showCard', response);
    var ul = document.getElementById("scanned");
    var li = document.createElement("li");
    var id = document.createElement("span");
    var name = document.createElement("span");
    var diet = document.createElement("span");

    if (response.caneat === 1) {
        li.setAttribute("class", "caneat");
    }
    id.setAttribute("class", "id");
    name.setAttribute("class", "name");
    diet.setAttribute("class", "diet");

    id.appendChild(document.createTextNode('#' + response.werkerid));
    name.appendChild(document.createTextNode(response.name));
    diet.appendChild(document.createTextNode(response.diet));
    li.appendChild(id);
    li.appendChild(name);
    li.appendChild(diet);
    ul.appendChild(li);
}

function makeRequest() {
    console.log('makeRequest');
    try {
        var Http = new XMLHttpRequest();
        var url = 'http://app.goingnowhere.org/cgi-bin/ajax/canteen.cgi?bcode=' + document.getElementById("input").value;
        Http.open("GET", url);
        Http.send();
        document.getElementById("input").value = '';

        Http.onreadystatechange = (e) => {
            if (this.readyState == 4 && this.status == 200) {
                showCard(JSON.parse(Http.responseText));
            }
        };
    } catch (ex) {
        console.error(ex);
    }
    return false;
}

window.onload = function () {
    document.getElementById('form').onsubmit = makeRequest;
};