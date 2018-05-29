<template>
  <div class="addItem">
      <div class="container">
        <center>
          <div>
            <div class="col-md-6">
              <div class="form-area">
                <form role="form">
                  <br style="clear:both">
                  <h3 style="margin-bottom: 25px; text-align: center;">Tag</h3>
                  <div class="col-md-12 table-responsive">
                    <table class="table table-bordered table-hover table-sortable" id="tab_logic">
                    <thead>
                        <tr>
                            <th class="text-center">
                                ชื่อ Tag ที่ต้องการเพิ่ม
                            </th>
                            <th class="text-center">
                                เพิ่ม Tag
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id='addr0' data-id="0" class="hidden text-center" >
                            <td>
                                <input type="text" v-model="newtag" class="form-control">
                            </td>
                            <td data-name="del">
                                <button  id="submit" class="btn btn-outline-info pull-right" @click="Tag">เพิ่ม Tag ใหม่</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
              </form>
            </div>
          </div>
        </div>
      </center>
      <center>
          <div>
            <div class="col-md-6">
              <div class="form-area">
                <form role="form">
                  <br style="clear:both">
                  <h3 style="margin-bottom: 25px; text-align: center;">Tag ที่มีอยู่</h3>
                  <div class="col-md-12 table-responsive">
                    <table class="table table-bordered table-hover table-sortable" id="tab_logic">
                    <thead>
                        <tr>
                            <th class="text-center">
                                Firebase ID
                            </th>
                            <th class="text-center">
                                Tag
                            </th>
                             <th class="text-center">
                                ลบ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id='addr0' data-id="0" class="hidden text-center" v-for="(t, index) in tag" :key="index" v-show="!(index === '.key')">
                            <td>
                                {{index}}
                            </td>
                            <td data-name="del">
                                {{t.name}}
                            </td>
                            <td data-name="del">
                                <button @click="remove(index)" class="btn btn-outline-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
              </form>
            </div>
          </div>
        </div>
      </center>
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
      newtag: ''
    }
  },
  methods: {
    remove (index) {
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
          this.removeTag(index)
          this.bindtagRef()
          this.$swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    },
    Tag () {
      if (this.newtag === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'ใส่ชื่อ Tag ใหม่ด้วย'
        })
        return
      }
      this.addTag(this.newtag)
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
      this.newtag = ''
      this.bindtagRef()
    },
    ...mapActions([
      'bindtagRef',
      'unbindtagRef',
      'addTag',
      'removeTag'
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
