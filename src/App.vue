<template>
  <div id="app">
    <formTest :title="mytitle"></formTest>
    <input type="text" v-model="item">
    <el-button type="primary">el-button</el-button>
    <ul>
      <li v-for="(a,index) in list" :key="a.id">
        <span>{{a.text}}</span>
        <span>¥{{a.price}}</span>
        <button @click="add(index)">加入购物车</button>
      </li>
    </ul>
    <cart :name="name"></cart>
    <win>
      <template slot="head">
          <h3>title</h3>
      </template>
      content...
    </win>
  </div>
</template>

<script>
import win from './components/win.vue';
import formTest from './components/formTest.vue'
import HelloWorld from './components/HelloWorld.vue'
import cart from './components/cart.vue'
import axios from 'axios'
export default {
  name: 'app',
  provide () {
    return {
      someValue: '来自祖先的神秘遗产'
    }
  },
  components: {
    HelloWorld,
    cart,
    formTest,
    win
  },
  data() {
    return {
      item: '',
      id: 1,
      list: [],
      name:'开课吧购物车',
      cart: [],
      mytitle: '11111'
    }
  },
  async created () {
    try {
        const ret = await axios.get('/api/goods')
        console.log(ret)
        this.list = ret.data.list
    } catch (error) {
        console.log('数据列表请求失败',error)
    }
  
  },
  methods: {
    add (i) {
      let good = this.list[i]
      this.$bus.$emit('addCart', good)
      // console.log(this)
      // console.log('按钮被点击了')
      // this.list.push({name:this.item,id:this.id++})
      // this.item = ''
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
