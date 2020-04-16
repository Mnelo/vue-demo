<template>
  <div class="web-worker">
    <h1>{{ title }}</h1>
    <div>
      <Button type="primary" v-on:click="webWork">开始启用多线程</Button>
    </div>
    <div class="result">多线程处理累加十亿次 :{{ res }}</div>
  </div>
</template>

<script>
import Worker from "../webWorker/add.worker";

export default {
  name: "webWorker",
  data() {
    return {
      title: "测试web worker",
      res: " 等待结果",
    };
  },
  methods: {
    webWork() {
      const worker = new Worker();

      //向worker发送数据
      worker.postMessage(0);

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
