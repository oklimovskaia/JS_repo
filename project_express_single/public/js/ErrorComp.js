Vue.component('error', {
    data(){
        return {
            textError: ''
        }
    },
    methods: {
      setError(error){
          this.textError = error
      }
    },
    computed: {
      isVisible(){
          if (this.textError !== '') {
              return true;
          }
          return false;
      }
    },
    template: `
    <div class="error-block" v-if="isVisible"> 
        <p class="error-msg">
            <button class="close-btn" @click="setError('')">&times;</button>
            {{ textError }}
        </p>
    </div>
    `
});
