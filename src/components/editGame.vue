<template>
  <div class="addItem">
      <div class="container">
        <div class="row">
            <div class="col-md-6">
                <br style="clear:both">
                <div class="form-group">
                    <select class="custom-select" v-model="game">
                        <option :value="{d,index}" v-for="(d, index) in data" :key="index" v-show="index != '.key'" @input="setID(index)">{{d.name}}</option>
                    </select>
                </div>
                <div class="">
                    <div class="card h-100">
                        <a href="#"><img class="card-img-top" :src="game.d.img" alt=""></a>
                        <div class="card-body">
                            <h4 class="card-title">
                                <a href="#">{{game.d.name}}</a>
                            </h4>
                            <h5>Price {{game.d.price}} ฿</h5>
                            <p class="card-text">{{game.d.detail}}</p>

                            <p class="card-text">{{game.index}}</p>
                            <a href="#">#{{game.d.tag}}</a>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted"><h5><button @click="remove()" class="btn btn-outline-danger">Delete</button></h5></small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-area">
                    <form role="form">
                        <div class="form-group">
                        <h3 style="margin-bottom: 25px; text-align: center;">Edit Game Item</h3>
                            <input type="text" value="game.img" class="form-control"  placeholder="Image" v-model="newGame.img">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" value="game.price" placeholder="Price" v-model="newGame.price">
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
                        <button  id="submit" class="btn btn-success pull-right" @click="add">Edit Item</button>
                    </form>
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
  data () {
    return {
      newGame: {
        price: '',
        detail: '',
        tag: 'Choose Tag',
        img: ''
      },
      game: {
        d: {
          img: '',
          name: '',
          detail: '',
          tag: ''
        },
        index: ''
      },
      index: ''
    }
  },
  mounted () {
  },
  methods: {
    setID (id) {
      this.index = id
      console.log(this.index)
    },
    remove () {
      this.deleteGame(this.game.index)
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    },
    add () {
      if (this.newGame.price === '' ||
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
      this.editGame({
        data: this.newGame,
        id: this.game.index
      })

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
      this.newGame.price = ''
      this.newGame.detail = ''
      this.newGame.tag = ''
      this.newGame.img = ''
    },
    ...mapActions([
      'newItem',
      'binddataRef',
      'unbinddataRef',
      'bindtagRef',
      'unbindtagRef',
      'editGame',
      'deleteGame'
    ])
  },
  computed: {
    currentImage () {
      return this.images[Math.abs(this.currentNumber) % this.images.length]
    },
    ...mapGetters([
      'tag',
      'data'
    ])
  },
  created () {
    this.binddataRef()
    this.bindtagRef()
  },
  destroyed () {
    this.unbinddataRef()
    this.unbindtagRef()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #theme {
    background-color: #1d9c73;
  }
</style>
