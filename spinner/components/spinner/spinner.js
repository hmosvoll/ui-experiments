class Spinner extends HTMLElement {
    constructor (){
        super();

        const $shadow = this.attachShadow({mode: "open"});

        const $ul = document.createElement("ul");
        $ul.classList.add("spinner")

        const $li = document.createElement("li");
        $ul.appendChild($li);

        const $liTwo = document.createElement("li");
        $ul.appendChild($liTwo);

        $shadow.append($ul)

        const $link = document.createElement("link");
        $link.setAttribute("rel", "stylesheet");
        $link.setAttribute("href", "components/spinner/spinner.css");

        $shadow.append($link);
    }

}

customElements.define("spinner-deluxe", Spinner);
