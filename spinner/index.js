const spinnerApp = {
    data(){
        return {
            circles: 1
        }
    },
    methods: {
        addCircle(){
            this.circles++;
            console.log("More circles");
        }, 
        removeCircle(){
            this.circles--;
            console.log("Less circles");
        }
    }
}

const app = Vue.createApp(spinnerApp);

app.config.compilerOptions.isCustomElement = (tag) => {
    console.log("IsCustomElement,", tag, tag === "spinner-deluxe" ? true : false);
    return tag === "spinner-deluxe" ? true : false
};

app.mount("#app");