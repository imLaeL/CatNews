var article_gatos = document.getElementById("gatos-filhotes-texto");

function showMore(id) {
    var item = document.getElementById(id)
    console.log(item.classList[0].toString());
    if (item.classList[0].toString() === "close"){
        item.classList.replace("close", "open");
    
    } else if (item.classList[0].toString() === "open") {
        item.classList.replace("open", "close");
    }
}