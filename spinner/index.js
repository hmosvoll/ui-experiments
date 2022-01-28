const spinnerApp = {
    data(){
        return {
            circles: 1,
            chillItKylo: false
        }
    },
    methods: {
        addCircle(){
            if(this.circles < 6){
                this.circles++;
            } else {
                this.chillItKylo = true;
            }
        }, 
        removeCircle(){
            if(this.circles > 0){
                this.circles--;
                this.chillItKylo = false;
            }
        }
    }
}

const app = Vue.createApp(spinnerApp);

app.config.compilerOptions.isCustomElement = (tag) => {
    return tag === "spinner-deluxe" ? true : false
};

app.mount("#app");