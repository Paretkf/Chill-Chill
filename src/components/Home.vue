<template>
  <div class="hello">
    <!-- Page Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <h1 class="my-4">Category</h1>
          <div class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center" >
               <a href="#" @click="showTag('All')">All</a>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(t, index) in tag"
            :key="index" v-show="!(index === '.key')">
              <a href="#" @click="showTag(t.name)">{{t.name}}</a>
              <!-- <span class="badge badge-primary badge-pill">{{t.count}}</span> -->
            </li>
          </div>

        </div>
        <!-- /.col-lg-3 -->

        <div class="col-lg-9">

          <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block img-fluid" :src="currentImage"  v-on:mouseover="stopRotation"
                  v-on:mouseout="startRotation">
              </div>
            </div>
            <a class="carousel-control-prev" role="button" data-slide="prev" @click="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" role="button" data-slide="next" @click="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4" v-for="(d, index) in filteredList" :key="index" v-show="index != '.key'" v-if="d.tag === search">
              <div class="card h-100">
                <img class="card-img-top" :src="d.img" alt="">
                <div class="card-body">
                  <h4 class="card-title">
                    {{d.name}}
                  </h4>
                  <h5>Price {{d.price}} ฿</h5>
                  <p class="card-text">{{d.detail}}</p>
                 <a href="#">#{{d.tag}}</a>
                </div>
                <div class="card-footer">
                  <small class="text-muted"><h5 v-if="!d.stock && loginUser.name"><button  class="btn btn-outline-danger" disabled>สินค้าหมด</button></h5></small>
                  <small class="text-muted"><h5 v-if="loginUser.name && d.stock"><button @click="buying(d, index)" class="btn btn-outline-primary">สั่งซื้อ</button></h5></small>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="(d, index) in filteredList" :key="index" v-show="index != '.key'" v-if="search === 'All'">
              <div class="card h-100">
                <img class="card-img-top" :src="d.img" alt="">
                <div class="card-body">
                  <h4 class="card-title">
                    {{d.name}}
                  </h4>
                  <h5>Price {{d.price}} ฿</h5>
                  <p class="card-text">{{d.detail}}</p>
                 <a href="#">#{{d.tag}}</a>
                </div>
                <div class="card-footer">
                  <small class="text-muted"><h5 v-if="loginUser.name && d.stock"><button @click="buying(d, index)" class="btn btn-outline-primary">สั่งซื้อ</button></h5></small>
                  <small class="text-muted"><h5 v-if="!d.stock && loginUser.name"><button  class="btn btn-outline-danger" disabled>สินค้าหมด</button></h5></small>
                </div>
              </div>
            </div>
          </div>
          <!-- /.row -->

        </div>
        <!-- /.col-lg-9 -->

      </div>
      <!-- /.row -->

    </div>
    <!-- /.container -->

    <!-- Footer -->
    <footer class="py-5" id="theme">
      <div class="container">
        <p class="m-0 text-center text-white">www.Chill-Chill.in.th</p>
      </div>
      <!-- /.container -->
    </footer>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      images: ['https://www.img.in.th/images/8a49d4cf9cf0d9ec982bf06a351d1423.png', 'https://www.img.in.th/images/2b51c55de678adaa5e95de2c4b982a59.png', 'https://www.img.in.th/images/00edf0ca588b40400a502dcfa42bf470.png'],
      currentNumber: 0,
      search: 'All'
    }
  },
  mounted () {
    this.binddataRef()
    this.bindtagRef()
    this.startRotation()
  },
  methods: {
    showTag (tag) {
      this.search = tag
    },
    startRotation () {
      this.timer = setInterval(this.next, 3000)
    },
    stopRotation () {
      clearTimeout(this.timer)
      this.timer = null
    },
    next () {
      this.currentNumber += 1
    },
    prev () {
      this.currentNumber -= 1
    },
    ...mapActions([
      'binddataRef',
      'unbinddataRef',
      'bindtagRef',
      'unbindtagRef',
      'updateMoney'
    ]),
    buying (item, index) {
      var arr = {
        price: item.price,
        name: item.name,
        tag: item.tag,
        detail: item.detail,
        img: item.img,
        id: index

      }
      this.$swal({
        title: 'Are you sure?',
        text: 'คุณต้องการซื้อสินค้าหรือไม่!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Buy it!'
      }).then((result) => {
        if (result.value) {
          this.$swal(
            'สั่งซื้อสำเร็จ!',
            'รับสินค้าที่ประวัติสั่งซื้อ.',
            'success'
          )
          if (this.loginUser.money >= item.price) {
            this.updateMoney(arr)
          } else {
            this.$swal({
              title: 'เงินไม่เพียงพอ!',
              animation: false,
              customClass: 'animated tada'
            })
          }
        }
      })
    }
  },
  computed: {
    currentImage () {
      return this.images[Math.abs(this.currentNumber) % this.images.length]
    },
    ...mapGetters([
      'data',
      'tag',
      'user',
      'loginUser'
    ]),
    filteredList () {
      return this.data
    }
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
