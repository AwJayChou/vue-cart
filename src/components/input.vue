<template>
<div>
  <!-- {{someValue}} -->
  <input :type="type" :value="inputValue" @input="inputHandler">
</div>

</template>

<script>
export default {
  // inject: ['someValue'],

  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  // props:['someValue'],
  data() {
    return {
  
      // 单项数据流的原则：组件内不能修改props的值
      inputValue: this.value
    };
  },
  methods: {
    inputHandler(e) {
      this.inputValue = e.target.value;
      // 通知父组件值得更新
      this.$emit("input", this.inputValue)
      // 通知 formItem 做校验 
      this.$parent.$emit('validate', this.inputValue)
    }
  },
  created() {
   console.log(this.value);
  }
};
</script>

<style scoped>
</style>