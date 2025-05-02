function encurtarUrl() {
    //validar se o link existe
    let url = document.getElementById("input-url").value;
    if(!url) {
        alert("É preciso inserir uma URL para encurtar");
        return;
    }
}