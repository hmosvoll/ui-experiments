export default (model) => {
    // for (const [key, value] of Object.entries(model)) {
    //     console.log(`${key}: ${value}`);

    //     if(typeof value === "string"){
            
    //     }
    // }

    return new Proxy(model, {
        get(target, prop, receiver) {
            console.log(target, prop, receiver);
        },
        set(obj, prop, value) {
            console.log(obj, prop, value);

            const element = document.querySelector(`#${prop}`);

            if(typeof value === "string"){
                element.textContent = value;
            }

            if(Array.isArray(value)){
                const template = element.querySelector("template");

                value.forEach(() => {
                    templateClone = template.content.cloneNode(true);
                });
            }

            return true;
        }
    });
}