<template>
  <div class="hello">
    <h1>{{ greeting }}</h1>
    <Input v-model="value" placeholder="请输入..." style="width: 300px" />
    <Button type="primary" v-on:click="add">add</Button>
    <Button type="primary" v-on:click="delete1">delete</Button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      value: 1,
      greeting: "hello",
    };
  },
  methods: {
    add() {
      this.value++;
    },
    delete1() {
      this.value--;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
