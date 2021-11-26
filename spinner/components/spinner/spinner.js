class Spinner extends HTMLElement {
    constructor (){
        super();
        console.log("Running connectedCallback");

        const $shadow = this.attachShadow({mode: "open"});

        const $link = document.createElement("link");
        $link.setAttribute("rel", "stylesheet");
        $link.setAttribute("href", "components/spinner/spinner.css");

        $shadow.append($link);
    }
    connectedCallback (item) {
        const $ul = document.createElement("ul");
        $ul.classList.add("spinner")

        const numberOfCircles = this.getAttribute("circles");

        console.log("Number of circles: ", numberOfCircles);

        let i = 0;
        for(i; i < numberOfCircles; i++){
            const $li = document.createElement("li");
            $ul.appendChild($li);
        }

        this.shadowRoot.append($ul)
    }
    static get observedAttributes() { 
        return ["circles"]; 
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "circles"){
            const $ul = this.shadowRoot.querySelector(".spinner");
            
            if($ul){
                $ul.innerHTML = "";
                let numberOfCircles = newValue;

                if(numberOfCircles > 6){
                    numberOfCircles = 6;
                    console.warn("Max 6 circles")
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
        }
    }
    // set circles(value){
    //     this.setAttribute("circles", value);
    // }
    // get circles() {
    //     return this.getAttribute("circles");
    // }
}

customElements.define("spinner-deluxe", Spinner);
