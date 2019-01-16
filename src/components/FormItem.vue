<template>
  <div>
    <label v-if="label">{{label}}</label>
    <div>
      <slot></slot>
      <!-- 校验错误信息 -->
      <p v-if="validateStatus == 'error'" class="error">{{errMsg}}</p>
    </div>
  </div>
</template>

<script>
import schema from "async-validator";
export default {
  inject: ["form"], // 注入form
  props: ["label", "prop"],
  data() {
    return {
      validateStatus: "",
      errMsg: ""
    };
  },
  created() {
    this.$on("validate", this.validate);
  },
  mounted() {
    // 挂载到form ，派发一个时间
    if(this.prop)
    this.$parent.$emit("formItemAdd", this);
    console.log('formItem ===>',this)
  },
  methods: {
    validate() {
      return new Promise(resolve => {
        // 校验 ：依赖async-validate
        const descriptor = {
          [this.prop]: this.form.rules[this.prop]
        }; // 校验规则
        // const des  = {}
        // des[this.prop] = this.form.rules[this.prop]
        const validator = new schema(descriptor);
        validator.validate({ [this.prop]: this.form.model[this.prop] }, errors => {
          if (errors) {
            // 校验失败
            this.validateStatus = "error";
            this.errMsg = errors[0].message;
            resolve(false) //
          } else {
            this.validateStatus = "";
            this.errMsg = "";
            resolve(true)
          }
        })
      })
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>