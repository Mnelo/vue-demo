<template>
  <div class="form">
    <div class="form-content">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            v-model="formInline.password"
            placeholder="Password"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')"
            >登陆</Button
          >
        </FormItem>
      </Form>
    </div>

    <div class="footer">
      2020 © Eden
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formInline: {
        user: "",
        password: "",
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur", // 触发方式
          },
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur",
          },
          // {
          //   type: "string",
          //   min: 6,
          //   message: "The password length cannot be less than 6 bits",
          //   trigger: "blur",
          // },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$cookies.set("token", 1);

          location.href = `${location.origin}/#/mainPage/hello`;
        } else {
          this.$Message.error("请输入账号密码！");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  width: 100%;
  height: 100%;

  .form-content {
    width: 100%;
    height: 95%;
    padding: 20% 0 0 0;
    ;
  }

  .footer {
    width: 100%;
    height: 5%;
  }
}
</style>
