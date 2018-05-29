<template>
  <div class="addItem">
      <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="form-area">
                    <form role="form">
                        <br style="clear:both">
                            <h3 style="margin-bottom: 25px; text-align: center;">Add New Item</h3>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Name" v-model="newGame.name">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control"  placeholder="Image" v-model="newGame.img">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control"  placeholder="Price" v-model="newGame.price">
                            </div>
                            <div class="form-group">
                                <select class="custom-select" v-model="newGame.tag">
                                  <option selected>Choose Tag</option>
                                  <option :value="t.name" v-for="(t, index) in tag" :key="index" v-show="index != '.key'">{{t.name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                            <textarea class="form-control" type="textarea"  maxlength="140" rows="7" v-model="newGame.detail"></textarea>
                            </div>
                        <button  id="submit" class="btn btn-success pull-right" @click="add">Add New Item</button>
                    </form>
                </div>
            </div>
            <div class="col-md-6">
                <div class="" v-if="!(newGame.name === '')">
                    <div class="card h-100">
                        <a href="#"><img class="card-img-top" :src="newGame.img" alt=""></a>
                        <div class="card-body">
                        <h4 class="card-title">
                            <a href="#">{{newGame.name}}</a>
                        </h4>
                        <h5>Price {{newGame.price}} ฿</h5>
                        <p class="card-text">{{newGame.detail}}</p>
                        </div>
                        <div class="card-footer">
                        <small class="text-muted"><h5>{{newGame.tag}}</h5></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'addItem',
  data () {
    return {
      newGame: {
        name: '',
        price: '',
        detail: '',
        tag: 'Choose Tag',
        img: ''
      }
    }
  },
  methods: {
    add () {
      if (this.newGame.name === '' || this.newGame.price === '' ||
      this.newGame.tag === '' || this.newGame.detail === '' || this.newGame.img === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        return
      }
      if (!(/^[0-9]+$/.test(this.newGame.price))) {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        return
      }
      this.newItem(this.newGame)
      this.$swal({
        type: 'success',
        title: 'Data Saved',
        showConfirmButton: false,
        timer: 1800,
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif")
          center left
          no-repeat
        `
      })
      this.newGame.name = ''
      this.newGame.price = ''
      this.newGame.detail = ''
      this.newGame.tag = ''
      this.newGame.img = ''
    },
    ...mapActions([
      'bindtagRef',
      'unbindtagRef',
      'newItem'
    ])
  },
  computed: {
    currentImage () {
      return this.images[Math.abs(this.currentNumber) % this.images.length]
    },
    ...mapGetters([
      'tag',
      'loginUser'
    ])
  },
  created () {
    this.bindtagRef()
  },
  destroyed () {
    this.unbindtagRef()
  },
  mounted () {
    if (!this.loginUser) {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #theme {
    background-color: #1d9c73;
  }
</style>
