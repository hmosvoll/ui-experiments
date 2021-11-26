class Spinner extends HTMLElement {
    constructor (){
        super();

        const $shadow = this.attachShadow({mode: "open"});

        const $link = document.createElement("link");
        $link.setAttribute("rel", "stylesheet");
        $link.setAttribute("href", "components/spinner/spinner.css");

        $shadow.append($link);

        const $ul = document.createElement("ul");
        $ul.classList.add("spinner")

        const numberOfCircles = this.getAttribute("circles");

        let i = 0;
        for(i; i < numberOfCircles; i++){
            const $li = document.createElement("li");
            $ul.appendChild($li);
        }

        $shadow.append($ul)
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log("attributeChangedCallback: ", name, oldValue, newValue);
    }
}

customElements.define("spinner-deluxe", Spinner);
