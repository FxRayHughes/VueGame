<template>
  <div id="main">
    <img id="background" :src="background" alt="">
    <div id="board">
      <h1 id="main_title">点击修仙</h1>
      <div id="player">
        <img id="dazuo" src="@/resources/dazuo.png" alt="" style="width: 300px;height: 300px">
      </div>
      <el-button id="xiuLian" type="success" circle @click="xiuLian">修炼</el-button>
      <div v-for="item in tips" v-show="item.active" class="tips">
        {{ item.text }}
      </div>
      <div id="info">
        <h3>当前道行 {{ player.year }} 年</h3>
      </div>
    </div>
  </div>
</template>

<script>
import background from "@/resources/background.png"
import uuid from "@/api/uuid"
import axios from "axios";

export default {
  data() {
    return {
      player: {},
      uuid: uuid,
      background: background,
      tips: [],
      isDisabled: false,

      updateTimer: null

    };
  },
  mounted() {
    this.getData(1)
    this.updateTimer = setInterval(() => {
      this.updateData()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.updateTimer)
  },
  methods: {
    async getData(id) {
      axios.get(
          "http://localhost:8088/api/player/" + id
      ).then(res => {
        this.player = res.data
      })
    },
    async updateData() {
      axios.put(
          "http://localhost:8088/api/player/" + this.player.id,
          {
            "name": this.player.name,
            "year": this.player.year
          }
      ).then(res => {
      })
    },
    xiuLian: function () {
      if (this.isDisabled) {
        return
      }
      this.isDisabled = true
      setTimeout(() => {
        this.isDisabled = false
      }, 100)
      const uuid = this.uuid.buildUUID()
      this.tips.push(
          {
            text: "道行 +1",
            active: true,
            uuid: uuid
          }
      )
      this.player.year++
      setTimeout(() => {
        const index = this.tips.findIndex(div => div.uuid === uuid)
        this.tips[index].active = false
        this.tips.splice(index, 1)
      }, 1000)
    }
  }
}
</script>


<style scoped>
/**
让board 居中 白色透明圆角阴影
 */
#background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

#board {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 80%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
}

#main_title {
  font-size: 2em;
  font-weight: bold;
  float: left;
  margin: 10px;
}

#player {
  position: absolute;
  top: 15%;
}

#xiuLian {
  position: absolute;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  font-size: 1em;
}

#info {
  position: absolute;
  top: 70%;
  left: 11%;
  transform: translate(-50%, -50%);
}

.tips {
  position: absolute;
  top: 20%;
  left: 12%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  color: #fdfb43;
  animation: textMove 1.25s;
  text-shadow: 0 0 5px #000;
  z-index: 5;
}

@keyframes textMove {
  from {
    top: 20%;
    opacity: 1;
  }
  to {
    top: 15%;
    opacity: 0;
  }
}
</style>
