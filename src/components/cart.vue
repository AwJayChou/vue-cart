<template>
  <div>
    {{name}}
    <table>
      <tr>
        <th>*</th>
        <th>课程名</th>
        <th>单价</th>
        <th>数量</th>
        <th>价格</th>
      </tr>
      <tr v-for="(c,i) in cart" :key="i" :class="{active:c.active}">
        <td>
          <input type="checkbox" v-model="c.active">
        </td>
        <td>{{c.text}}</td>
        <td>¥{{c.price}}</td>
        <td>
          <button @click="minus(i)">-</button>
          {{c.count}}
          <button @click="add(i)">+</button>
        </td>
        <td>¥{{c.price * c.count}}</td>
      </tr>
      <tr>
        <td></td>
        <td colspan="2">{{activeCount}}/{{count}}</td>
        <td colspan="2">¥{{sum}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart")) || []
    };
  },
  watch: {
    //   cart () {
    //     this.setLocal()
    //   }
    cart: {
      handler(n, o) {
        localStorage.setItem("cart", JSON.stringify(n));
      },
      deep: true
    }
  },
  computed: {
    activeCount() {
      return this.cart.filter(v => v.active == true).length;
    },
    count() {
      return this.cart.length;
    },
    sum() {
      let sum = 0;
      this.cart.forEach(el => {
        if (el.active) {
          sum += el.price * el.count;
        }
      });
      return sum;
    }
  },
  methods: {
    setLocal() {
      window.localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    minus(i) {
      let count = this.cart[i].count;
      //  console.log(count)
      if (count > 1) {
        this.cart[i].count -= 1;
      } else {
        this.remove(i);
      }
    },
    add(i) {
      this.cart[i].count++;
    },
    remove(i) {
      if (window.confirm("确定删除？")) this.cart.splice(i, 1);
    }
  },
  created() {
    let _this = this;
    this.$bus.$on("addCart", function(good) {
      console.log(good);
      let isExist = _this.cart.find(v => v.id === good.id);
      if (isExist) {
        isExist.count++;
      } else {
        _this.cart.push({
          ...good,
          count: 1,
          active: true
        });
      }
    });
  }
};
</script>

<style scoped>
.active {
  color: green;
}
</style>