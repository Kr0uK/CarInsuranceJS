$(document).ready(function () {
    $("#form").submit(function (event) {  
        var login = $('#login').val();
        var pwd = $('#pwd').val();        
        // TODO
        
        // Crée un machin pour le SHA-256
        var hashPwd = forge.md.sha256.create();
        // là on lui met le mdp
        hashPwd.update(pwd);
        
        // Output pour vérifier
        alert(pwd + " " + hashPwd.digest().toHex());
        
    });
});