
import link from "./lib.js";

const model = link({
    foo: "Hello",
    shoppingCartRows: [
        {
            name: "Product 1",
            quantity: 3,
            price: 123
        }
    ],
    totalPrice: {
        dependent: "shoppingCartRows",
        value: () => {
            
        }
    }
});

setTimeout(() => {
    model.foo = "Hello world";
}, 3000);
