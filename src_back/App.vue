<template>
  <div id="main">
    <img id="background" :src="background" alt="">
    <img id="background_1" :src="background" alt="">
    <div id="player" ref="movingDiv" style="top: 70%">
      <img src="@/resources/player/player.png" alt="">
    </div>
    <div id="skill">

    </div>
  </div>
</template>

<script>
import background from "@/resources/64/_PNG/01/jungle01_preview-01.png"
import background_1 from "@/resources/64/_PNG/01/layers/l8_foreground.png"

export default {
  data() {
    return {
      background: background,
      background_1: background_1,
      x: 0,
      y: 0,
      gravity: 0.1,
      velocity: 0,
      isJumping: false,
      canDoubleJump: false,
      fireballs: []
    };
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    this.animationFrame = requestAnimationFrame(this.update);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    cancelAnimationFrame(this.animationFrame);
  },
  methods: {
    handleKeyDown: function (event) {
      switch (event.keyCode) {
        case 65: // A key
        case 37: // Left arrow
          this.x -= 10;
          break;
        case 68: // D key
        case 39: // Right arrow
          this.x += 10;
          break;
        case 87: // W key
        case 38: // Up arrow
          if (!this.isJumping) {
            this.isJumping = true;
            this.velocity = -6;
            this.canDoubleJump = true;
          } else if (this.canDoubleJump) {
            this.velocity = -6;
            this.canDoubleJump = false;
          }
          break;
        case 83: // S key
        case 40: // Down arrow
          this.y += 10;
          break;
        case 74: // J key
          const skillDiv = document.getElementById('skill');
          const fireball = document.createElement('div');
          fireball.classList.add('fireball');
          fireball.style.left = skillDiv.offsetLeft + 'px';
          fireball.style.top = skillDiv.offsetTop + 'px';
          this.fireballs.push(fireball);
          document.body.appendChild(fireball);
          break;
        default:
          break;
      }
    },
    handleKeyUp: function (event) {
      switch (event.keyCode) {
        case 65: // A key
        case 37: // Left arrow
          this.x -= 0;
          break;
        case 68: // D key
        case 39: // Right arrow
          this.x += 0;
          break;
        case 87: // W key
        case 38: // Up arrow
          break;
        case 83: // S key
        case 40: // Down arrow
          this.y += 0;
          break;
        default:
          break;
      }
    },
    update: function () {
      const movingDiv = this.$refs.movingDiv;
      // 移动
      movingDiv.style.transform = `translate(${this.x}px, ${this.y}px)`;
      // 跳跃
      if (this.isJumping) {
        this.velocity += this.gravity;
        this.y += this.velocity;
        if (this.y >= 0) {
          this.isJumping = false;
          this.y = 0;
          this.velocity = 0;
          this.canDoubleJump = false;
        }
        movingDiv.style.transform = `translate(${this.x}px, ${this.y}px)`;
      }
      // 火球移动
      if (this.fireballs.length > 0) {
        for (let i = 0; i < this.fireballs.length; i++) {
          const fireball = this.fireballs[i];
          fireball.style.left = parseInt(fireball.style.left) + 10 + 'px';
          if (parseInt(fireball.style.left) > window.innerWidth) {
            fireball.remove();
            this.fireballs.splice(i, 1);
          }
        }
      }
      this.animationFrame = requestAnimationFrame(this.update);
    }
  }
}
</script>


<style scoped>
#player {
  position: absolute;
  width: 50px;
  height: 50px;
  transform: translate(0, 0);
}

#skill{
  position: absolute;
  width: 500px;
  height: 500px;
}
</style>
