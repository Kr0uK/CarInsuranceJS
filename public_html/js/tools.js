/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    var selectConstructeur = $("#constructeur");
    var selectModele = $("#modele");
    listConstructeurModele(selectConstructeur, selectModele);

    var $reset = $("#btnReset");
    $reset.click(function () {
        resetModele(selectModele);
    });

    $(function () {
        $("#inputDateNaissance").datepicker();
    });

    wsAds();
    chat();
});

function chat() {
    var btnChat = $("#btnChat");
    var inputChat = $("#inputChat");
    var webSocket = new WebSocket("ws://192.168.1.177:8080/CarInsurance/chat");

    webSocket.onerror = function (event) {
        console.log("error");
    };
    webSocket.onopen = function (event) {
    };
    webSocket.onclose = function (event) {
        console.log("close");
    };
    webSocket.onmessage = function (event) {
        var tableChat = $("#tableChat tr:last");
        var date = getDate(new Date());

        tableChat.after('<tr ><td class="pseudo">' + date + ' | test</td><td>' + event.data + '</td></tr>');
    };

    btnChat.click(function () {
        var pseudo = "Pseudo";
        var msg = inputChat.val();
        inputChat.attr("placeholder", "Entrez votre message...");
        inputChat.val("");
        webSocket.send(msg);
    });
}

function getDate(date) {
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function wsAds() {
    var wsAds = $("#wsAds");

    var webSocket = new WebSocket("ws://192.168.1.177:8080/CarInsurance/pub");

    webSocket.onerror = function (event) {
        console.log("error");
    };
    webSocket.onopen = function (event) {
        console.log("open");
    };
    webSocket.onclose = function (event) {
        console.log("close");
    };
    webSocket.onmessage = function (event) {
        wsAds.text(event.data);
    };
}

function listConstructeurModele(selectConstructeur, selectModele) {
    if (selectConstructeur.val() === null) {
        selectConstructeur.append($(new Option("Constructeur", "null")));
        selectModele.append($(new Option("Modele", "null")));

        $.get("home", {resultat: "constructeur"}, function (responseJson) {
            $.each(responseJson, function (index, item) {
                selectConstructeur.append($(new Option(item, index)));
            });
        });

        selectConstructeur.on("change", function () {
            var val = $(this).val();

            resetModele(selectModele);

            $.get("home", {resultat: "modele", modele: val}, function (responseJson) {
                $.each(responseJson, function (index, item) {
                    selectModele.append($(new Option(item, index)));
                });
            });

        });
    }
}

function resetModele(selectModele) {
    selectModele.empty();
    selectModele.append($(new Option("Modele", "null")));
}