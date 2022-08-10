
const modalWrapper = document.querySelector("#modal-wrapper");
const nameInput = document.querySelector("#name-input") as HTMLInputElement;

export function getDrawerName() {
    return  nameInput.value;
}

export function hideModal(){
    modalWrapper?.classList.add("hide");
}

export function getFrom(){
    const nameForm = document.querySelector("#name-form");

    if (nameForm === null){
        throw new Error("Could not find name form.")
    }

    return nameForm;
}