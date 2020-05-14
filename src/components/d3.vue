<template>
  <div class="d3">
    <h1>D3</h1>
    <Button type="primary" v-on:click.once="createGraphics(nodes, edges, test)"
      >绘制图形</Button
    >
    <div class="graphics-area">
      <div id="main"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "d3",
  data() {
    return {
      nodes: [
        { name: "王力宏" },
        { name: "张惠妹" },
        { name: "日正当中的星空" },
        { name: "改变自己[王力宏演唱歌曲]" },
        { name: "非常幸运" },
        { name: "恋爱通告[2010年王力宏、刘亦菲主演电影]" },
        { name: "雷霆战警[电影]" },
        { name: "无问西东" },
        { name: "王力凯" },
        { name: "骇客交锋" },
        { name: "拳神" },
        { name: "火力全开[王力宏音乐专辑]" },
        { name: "韩雪[中国内地女演员]" },
        { name: "许凤藻" },
        { name: "龙的传人[侯德健词曲歌曲]" },
        { name: "李瑶敏" },
        { name: "建党伟业" },
        { name: "唯一[王力宏音乐专辑]" },
        { name: "王嘉莉[王力宏女儿]" },
      ],
      edges: [
        { source: 0, target: 1, lineLength: 200, relation: "前女友" },
        { source: 0, target: 2, lineLength: 200, relation: "主要作品" },
        { source: 0, target: 3, lineLength: 200, relation: "代表作品" },
        { source: 0, target: 4, lineLength: 200, relation: "代表作品" },
        { source: 0, target: 5, lineLength: 200, relation: "代表作品" },
        { source: 0, target: 6, lineLength: 200, relation: "主要作品" },
        { source: 0, target: 7, lineLength: 200, relation: "代表作品" },
        { source: 0, target: 8, lineLength: 200, relation: "弟弟" },
        { source: 0, target: 9, lineLength: 200, relation: "主要作品" },
        { source: 0, target: 10, lineLength: 200, relation: "主要作品" },
        { source: 0, target: 11, lineLength: 200, relation: "专辑" },
        { source: 0, target: 12, lineLength: 200, relation: "好友" },
        { source: 0, target: 13, lineLength: 200, relation: "曾祖父" },
        { source: 0, target: 14, lineLength: 200, relation: "代表作品" },
        { source: 0, target: 15, lineLength: 200, relation: "岳母" },
        { source: 0, target: 16, lineLength: 200, relation: "主要作品" },
        { source: 0, target: 17, lineLength: 200, relation: "专辑" },
        { source: 0, target: 18, lineLength: 200, relation: "女儿" },
      ],
      test: {
        menuLeft: ["菜单1"],
        menuRight: ["菜单2"],
      },
    };
  },
  methods: {
    createGraphics(nodes, edges, test) {
      // 监听全局点击事件
      document
        .querySelector(".graphics-area")
        .addEventListener("click", function(e) {
          if (e.path.length > 11) {
            return;
          }

          menuLeft.attr("stroke-width", "0");
          menuRight.attr("stroke-width", "0");
          menuLeftText.text((d) => {
            return null;
          });
          menuRightText.text((d) => {
            return null;
          });

          return;
        });

      /**
       * @description 设置曲线上文字描述的位置
       * @param {number} targetX 终点x轴坐标
       * @param {number} targetY 终点y轴坐标
       * @param {number} sourceX 起点x轴坐标
       * @param {number} sourceY 起点x轴坐标
       */
      const getWordPosition = (targetX, targetY, sourceX, sourceY) => {
        const dx = targetX - sourceX;
        const dy = targetY - sourceY;
        const dr = Math.sqrt(dx * dx + dy * dy);

        if (targetX >= sourceX && targetY >= sourceY) {
          return {
            x: (targetX + sourceX) / 2 + 0.15 * dr,
            y: (targetY + sourceY) / 2 - 0.1 * dr,
          };
        }

        if (targetX <= sourceX && targetY <= sourceY) {
          return {
            x: (targetX + sourceX) / 2 - 0.15 * dr,
            y: (targetY + sourceY) / 2 + 0.1 * dr,
          };
        }

        if (targetX <= sourceX && targetY >= sourceY) {
          return {
            x: (targetX + sourceX) / 2 + 0.15 * dr,
            y: (targetY + sourceY) / 2 + 0.1 * dr,
          };
        }

        return {
          x: (targetX + sourceX) / 2 - 0.15 * dr,
          y: (targetY + sourceY) / 2 - 0.1 * dr,
        };
      };

      /**
       * @description 拖拽开始
       * @param {object} d 拖拽对象
       */
      const started = (d) => {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0.8).restart();
        }

        d.fx = d.x;
        d.fy = d.y;
      };

      /**
       * @description 拖拽中
       * @param {object} d 拖拽对象
       */
      const dragged = (d) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;

        if (menuLeft.attr("stroke-width") === "78") {
          setMenu(d, d.fx, d.fy);
        }
      };

      /**
       * @description 拖拽结束
       * @param {object} d 拖拽对象
       */
      const ended = () => {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0);
        }
        // d.fx = null; // 节点拖拽结束后的位置，注释掉的话，节点位置会变
        // d.fy = null; // 节点拖拽结束后的位置，注释掉的话，节点位置会变
      };

      /**
       * @description 渲染图形位置
       */
      const render = () => {
        // 线的位置
        links.attr("d", (d) => {
          const dx = d.target.x - d.source.x; //增量
          const dy = d.target.y - d.source.y;

          let dr = 0;

          if (d.shift) {
            dr = Math.sqrt(dx * dx + dy * dy);
          }

          return (
            "M" +
            d.source.x +
            "," +
            d.source.y +
            "A" +
            dr +
            "," +
            dr +
            " 0 0,1 " +
            d.target.x +
            "," +
            d.target.y
          );
        });

        // 线上的文字的位置
        linksText
          .attr("x", (d) => {
            if (d.shift) {
              return getWordPosition(
                d.target.x,
                d.target.y,
                d.source.x,
                d.source.y
              ).x;
            }

            return (d.source.x + d.target.x) / 2;
          })
          .attr("y", (d) => {
            if (d.shift) {
              return getWordPosition(
                d.target.x,
                d.target.y,
                d.source.x,
                d.source.y
              ).y;
            }

            return (d.source.y + d.target.y) / 2;
          });

        // 圆点的位置
        gs.attr("transform", (d, i) => {
          return "translate(" + d.x + "," + d.y + ")";
        });

        // 节点文字描述的位置
        nodeText
          .attr("x", (d) => {
            return d.x;
          })
          .attr("y", (d) => {
            return d.y - 20;
          });

        // if (forceSimulation.alpha() <= 0.3) {
        //   forceSimulation.stop();
        // }
      };

      /**
       * @description 缩放函数
       */
      const zoomed = () => {
        const transform = d3.event.transform;

        g.attr("transform", transform);
        nodeText.attr("transform", transform);
      };

      // 设置缩放
      const zoom = d3
        .zoom()
        .scaleExtent([0.1, 8])
        .on("zoom", zoomed);

      // 添加图例dom节点svg
      const svg = d3
        .select("#main")
        .append("svg")
        .attr(
          "width",
          document.getElementById("main") &&
            document.getElementById("main").clientWidth
        )
        .attr(
          "height",
          document.getElementById("main") &&
            document.getElementById("main").clientHeight
        )
        .call(zoom)
        .on("dblclick.zoom", null);

      // 添加svg节点
      const g = svg.append("g");

      /**
       * @description 箭头(连接线的箭头)
       * @param {string} color 箭头颜色(使用16进制写法)
       */
      const marker = (color) => {
        svg
          .append("marker")
          .attr("id", color.replace("#", ""))
          .attr("markerUnits", "userSpaceOnUse")
          .attr("viewBox", "0 -5 10 10") //坐标系的区域
          .attr("refX", 20) //箭头在线上的坐标位置 X轴
          .attr("refY", 0) // Y轴
          .attr("markerWidth", 12) //标识的大小
          .attr("markerHeight", 12)
          .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
          .attr("stroke-width", 1.5) //箭头宽度
          .append("path")
          .attr("d", "M0,-5L10,0L0,5") //箭头的路径
          .attr("fill", color); //箭头颜色

        return "url(" + color + ")";
      };

      const forceSimulation = d3
        .forceSimulation()
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody().strength(-1500)) //作用力应用在所用的节点之间，当strength为正的时候可以模拟重力，当为负的时候可以模拟电荷力。
        .force(
          "center",
          d3
            .forceCenter()
            .x(
              document.getElementById("main") &&
                document.getElementById("main").clientWidth / 2
            )
            .y(
              document.getElementById("main") &&
                document.getElementById("main").clientHeight / 2
            )
        ) // 力导向图中心位置
        .force("collision", d3.forceCollide(30)); //设置节点碰撞半径>= 点半径避免重叠

      // 图渲染
      forceSimulation.nodes(nodes).on("tick", render);

      // 生成边集
      forceSimulation
        .force("link")
        .links(edges)
        .distance((d) => {
          return d.lineLength; // 边的长度
        });

      // 边(连线)
      let links = g
        .append("g")
        .selectAll("line")
        .data(edges)
        .enter()
        .append("path")
        .attr("stroke", "#233156")
        .attr("stroke-width", "1.5")
        .attr("marker-end", marker("#233156"));

      // 箭头线上的文字
      let linksText = g
        .append("g")
        .selectAll("text")
        .data(edges)
        .enter()
        .append("text")
        .text((d, i) => {
          return d.relation; // 描述内容
        })
        .attr("fill", (d, i) => {
          return "#4682B4"; // 箭头字体颜色
        })
        .attr("font-size", 18); // 文字大小;

      // 节点上文字描述
      let nodeText = svg
        .selectAll("nodeText")
        .data(nodes)
        .enter()
        .append("text")
        .text((d, i) => {
          return d.name;
        })
        .attr("text-anchor", "middle")
        .attr("font-size", 16) // 文字大小
        .attr("fill", (d, i) => {
          return "#233156";
        });

      let menuRight = g
        .append("g")
        .selectAll("menuRight")
        .data(test.menuRight)
        .enter()
        .append("path")
        .attr("stroke", "rgba(49,69,122,0.8)")
        .attr("stroke-width", "0")
        .attr("fill", "none")
        .on("mouseover", () => {
          menuRight.attr("stroke", "rgba(49,69,122)");
        })
        .on("mouseout", () => {
          menuRight.attr("stroke", "rgba(49,69,122,0.8)");
        })
        .on("click", (d) => {
          console.log(456);
        });

      let menuRightText = g
        .append("g")
        .selectAll("text")
        .data(test.menuRight)
        .enter()
        .append("text")
        .text((d, i) => {
          return d;
        })
        .attr("fill", (d, i) => {
          return "#FFF";
        })
        .attr("font-size", 18);

      let menuLeft = g
        .append("g")
        .selectAll("menuRight")
        .data(test.menuLeft)
        .enter()
        .append("path")
        .attr("stroke", "rgba(49,69,122,0.8)")
        .attr("stroke-width", "0")
        .attr("fill", "none")
        .on("mouseover", () => {
          menuLeft.attr("stroke", "rgba(49,69,122)");
        })
        .on("mouseout", () => {
          menuLeft.attr("stroke", "rgba(49,69,122,0.8)");
        })
        .on("click", (d) => {
          console.log(456);
        });

      let menuLeftText = g
        .append("g")
        .selectAll("text")
        .data(test.menuLeft)
        .enter()
        .append("text")
        .text((d, i) => {
          return d;
        })
        .attr("fill", (d, i) => {
          return "#FFF";
        })
        .attr("font-size", 18);

      //节点
      let gs = g
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 12) // 节点大小
        .attr("fill", (d) => {
          return "#233156";
        })
        .call(
          // 拖拽设置
          d3
            .drag()
            .on("start", started)
            .on("drag", dragged)
            .on("end", ended)
        )
        .on("click", (d) => {
          setMenu(d, d.x, d.y);
        });

      const setMenu = (d, x, y) => {
        const menuLeftDistance = `M ${x} ${y + 80} A 80 80, 0, 0, 1, ${x},${y -
          80}`;
        const menuRightDistance = `M ${x} ${y - 80} A 80 80, 0, 0, 1, ${x},${y +
          80}`;

        menuLeft.attr("d", menuLeftDistance);
        menuRight.attr("d", menuRightDistance);

        menuLeftText.attr("x", x - 100).attr("y", y);
        menuRightText.attr("x", x + 60).attr("y", y);

        menuLeft.attr("stroke-width", "78");
        menuRight.attr("stroke-width", "78");
        menuLeftText.text((dsc) => {
          return dsc;
        });
        menuRightText.text((dsc) => {
          return dsc;
        });
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.d3 {
  .graphics-area {
    width: 1200px;
    height: 650px;
    margin: 20px auto;

    #main {
      margin: 0 auto;
      width: 1200px;
      height: 650px;
      background-color: darkgrey;
    }

    .menu-left {
      stroke: #000;
      stroke-width: 78;
      fill: none;
    }

    .menu-left:hover {
      stroke: red;
    }
  }
}
</style>
