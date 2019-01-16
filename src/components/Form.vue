<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  provide() {
    return {
      // 将表单的实例传递给后代
      form: this
    };
  },
  data() {
    return {
      fields: []
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  created() {
    // 缓存需要校验的表单相
    this.fields = [];
    this.$on("formItemAdd", item => this.fields.push(item));
    console.log();
  },
  methods: {
    async validate(callback) {
      const tasks = this.fields.map(item => item.validate());
      console.log(tasks)
      const results = await Promise.all(tasks);
      let ret = true;
      results.forEach(valid => {
        if (!valid) {
          ret = false; // zhi只要一个失败就失败
        }
      });
      callback(ret);
    }
  }
};
</script>

<style scoped>
</style>