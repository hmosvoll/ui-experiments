class Spinner extends HTMLElement {
    constructor (){
        super();
        const $shadow = this.attachShadow({mode: "open"});

        const $link = document.createElement("link");
        $link.setAttribute("rel", "stylesheet");
        $link.setAttribute("href", "components/spinner/spinner.css");

        $shadow.append($link);
    }
    connectedCallback (item) {
        const $ul = document.createElement("ul");
        $ul.classList.add("spinner")
       
        this.shadowRoot.append($ul);

        this.renderCircles(this.circles);
    }
    static get observedAttributes() { 
        return ["circles"]; 
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "circles"){
            const $ul = this.shadowRoot.querySelector(".spinner");
            
            if($ul){
                this.renderCircles(newValue);
            }
        }
    }
    renderCircles(numberOfCircles){
        const $ul = this.shadowRoot.querySelector(".spinner");

        $ul.innerHTML = "";

        if(numberOfCircles > 6){
            numberOfCircles = 6;
            console.warn("Max number of circles is 6.")
        } else if (numberOfCircles < 0){
            numberOfCircles = 0;
            console.warn("Minimum number of circles is 0. What you doing?")
        }

        let i = 0;
        for(i; i < numberOfCircles; i++){
            const $li = document.createElement("li");
            $ul.appendChild($li);
        }
    }
    get circles() {
        return this.getAttribute("circles");
    }
    set circles(value) {
        this.setAttribute("circles", value);
    }
}

customElements.define("spinner-deluxe", Spinner);
