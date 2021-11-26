class Spinner extends HTMLElement {
    constructor (){
        super();
        console.log("Hello");
    }

}

customElements.define("spinner-deluxe", Spinner);
