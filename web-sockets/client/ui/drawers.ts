const drawers = document.querySelector("#drawers") as HTMLUListElement;

export function setDrawers(drawerNames: string[]){
    drawers.innerHTML = "";

    drawerNames.forEach(drawerName => {
        const drawerListElement = document.createElement("li");
        drawerListElement.textContent = drawerName.charAt(0);
        drawerListElement.setAttribute("title", drawerName);
        drawers.appendChild(drawerListElement);
    });
}