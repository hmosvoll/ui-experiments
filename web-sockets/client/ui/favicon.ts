export default { setConnectedFavicon }

export function setConnectedFavicon(){
    const favicon = document.querySelector("link[rel='icon']");
    
    if(favicon){
        favicon.setAttribute("href", "/favicon-connected.svg");
    }
}
