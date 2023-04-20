const article_gatos = document.querySelector('#gatos-filhotes-texto');

function showMore() {
    if (article_gatos.className == "open") {
        article_gatos.className = "";

    } else {
        article_gatos.className == "open";        
    }
}