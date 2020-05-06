<template>
  <div class="web-worker">
    <h1>{{ title }}</h1>
    <div>
      <InputNumber v-model="value" style="width: 200px"></InputNumber>
      <Button type="primary" v-on:click="webWork">开始启用多线程</Button>
    </div>
    <div class="result">{{ res }}</div>
  </div>
</template>

<script>
import Worker from "../webWorker/add.worker";

export default {
  name: "webWorker",
  data() {
    return {
      value: 0,
      title: "测试web worker",
      res: "测试质数，等待结果",
    };
  },
  methods: {
    webWork() {
      const worker = new Worker();

      //向worker发送数据
      worker.postMessage(this.value);

      //接收worker传过来的数据函数
      worker.onmessage = (e) => {
        this.res = e.data;
        worker.terminate(); // 关闭work线程
      };
    },
  },
};
</script>

<style lang="less" scoped>
.web-worker {
  .result {
    margin: 10px 0 0 0;
    font-size: 16px;
  }
}
</style>
