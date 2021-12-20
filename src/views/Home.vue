<template>
  <div>
    <div class="box" v-show="this.billboard.flag">
      <div class="level">
        🔔{{billboard.content}}
        <a @click="billboard.flag = false">
          <span>
            <i class="el-icon-close right"/>
          </span>
        </a>
      </div>
    </div>
    <div class="columns">
      <div class="column is-three-quarters">
        <TopicList></TopicList>
      </div>
      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
  import {getBillBoard} from "../api/billboard";
  import CardBar from "./card/CardBar";
  import PostList from "./post/Index";

  export default {
  name: 'Home',
    components:{CardBar,TopicList: PostList},
  data(){
    return{
      billboard: {
        flag: false,
        content: ''
      }
    }
  },
    created() {
    this.fetchBillboard()
      //首次访问会有弹窗
      sessionStorage.setItem('FirstVisit','1')
    },
    methods: {
    async fetchBillboard(){
      getBillBoard().then((value) => {
        const {data} = value
        this.billboard = data
        if(sessionStorage.getItem('FirstVisit') == '1'){
          this.$notify({
            title: '提示',
            message: '🔔' + this.billboard.content,
            offset: 45,
            duration: 1500
            // position: 'top-left'
          })
          // alert(sessionStorage.getItem('FirstVisit'))
          sessionStorage.setItem('FirstVisit','0')
        }
      })
    }
  }
}
</script>
