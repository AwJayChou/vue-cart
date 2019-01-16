<template>
  <div>
    <h3>element表单{{title}}</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="ruleForm.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
    <!-- 开课吧表单 -->
    <k-input v-model="someValue"></k-input>
    {{someValue}}
    <!-- 自定义表单 -->
    <k-form :model="ruleForm" :rules="rules1" ref="ruleForm1">
      <k-form-item label="用户名" prop="name">
        <k-input v-model="ruleForm.name"></k-input>
      </k-form-item>
      <k-form-item label="密码" prop="pwd">
        <k-input v-model="ruleForm.pwd" type="password"></k-input>
      </k-form-item>
       <k-form-item>
        <el-button type="primary" @click="submitForm2()">登录</el-button>
      </k-form-item>
    </k-form>
    {{ruleForm}}
  </div>
</template>

<script>
import KFormItem from "./FormItem.vue";
import KInput from "./input.vue";
import kForm from "./Form.vue";
export default {
  props: {
    title: { type: String, required: true, default: "111" }
  },
  components: {
    KInput,
    KFormItem,
    kForm
  },
  data() {
    return {
      // 绑定数据
      someValue: "somevalue",
      ruleForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          
          { min: 6, max: 10, message: "请输入6~10位用户名", trigger: "blur" },
          { require: true, message: "请输入名称", trigger: "blur" },
        ],
        pwd: [{ require: true, message: "请输入密码", trigger: "blur" }]
      },
      rules1: {
        name: [     
          { min: 6, max: 10, message: "请输入6~10位用户名", trigger: "blur" },
          { require: true, message: "请输入名称", trigger: "blur" },
        ],
        pwd: [{ require: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm2() {
      this.$refs.ruleForm1.validate(valid => {
        if(valid){
          alert('提交成功')
        } else {
          console.log('校验失败')
          return false
        }
      })
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        //  console.log(valid)
        if (valid) {
          alert("提交成功");
        } else {
          console.log("校验失败");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>