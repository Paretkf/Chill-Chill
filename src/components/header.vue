<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="theme">
      <div class="container">
        <router-link to="/"><a class="navbar-brand" href="">Chill-Chill Game Store</a></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" @click="userLogin">
                Login
              </a>
            </li>
            <li class="nav-item">
              <router-link to="/additem"><a class="nav-link">Add Item</a></router-link>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="#">Cart</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  data () {
    return {
      newUser: {}
    }
  },
  mounted () {
  },
  methods: {
    userLogin () {
      this.$swal.mixin({
        input: 'text',
        confirmButtonText: 'Next',
        showCancelButton: true,
        cancelButtonText: 'Register',
        progressSteps: ['1', '2']
      }).queue([
        {
          title: 'Question 1',
          text: 'Chaining swal2 modals is easy'
        },
        'Question 2'
      ]).then((result) => {
        if (result.value) {
          this.$swal({
            title: 'All done!',
            html:
              'Your answers: <pre>' +
                JSON.stringify(result.value) +
              '</pre>',
            confirmButtonText: 'Lovely!'
          })
        } else if (
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
          // this.$swal({
          //   title: 'All done!',
          //   html:
          //     'Your answers: <pre>' +
          //       JSON.stringify(result.value) +
          //     '</pre>',
          //   confirmButtonText: 'Lovely!'
          // })
          this.$router.push({path: '/adduser'})
        }
      })
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #theme {
    background-color: #1d9c73;
  }
</style>
