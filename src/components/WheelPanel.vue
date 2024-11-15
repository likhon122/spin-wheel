<template>
  <div class="panel">
    <transition name="fade">
      <RecordsPanel v-if="showRecords" @close="hideRecords" />
    </transition>

    <div class="wheel-panel-content">
      <div class="wheel-header-area">
        <!-- Title and logo container -->
        <div class="title-logo-container">
          <!-- Title -->
          <div class="wheel-header-title">
            <div>Wheel of</div>
            <div class="stylish-title">Fortune</div>
          </div>

          <!-- Logo under the title -->
          <img src="@/images/logo.png" alt="Project Logo" class="project-logo" />
        </div>
      </div>

      <!-- The Wheel component -->
      <Wheel ref="wheel" @result="spinCompleted" />

      <!-- Placement for Spin and Records buttons -->
      <div class="button-container">
        <a href="#" class="spinButton" @click.prevent="startSpin">{{ spinText }}</a>
        <a href="#" class="recordButton" @click.prevent.stop="displayRecords">Records</a>
      </div>

      <div class="wheel-footer-area">
        <div class="wheel-footer">
          <div class="wheel-result" v-html="resultText"></div>
        </div>
      </div>
    </div>

    <img class="background-image" :src="background ? background : null" />
  </div>
</template>

<script>
import RecordsPanel from './RecordsPanel';
import Wheel from './Wheel';
import { mapState } from 'vuex';

export default {
  name: 'WheelPanel',
  components: {
    RecordsPanel,
    Wheel
  },
  data() {
    return {
      showRecords: false,
      spinning: false,
      spinText: 'Spin!',
      resultText: 'Ready. Get set.'
    };
  },
  computed: mapState({
    spins: state => state.spins,
    name: state => state.data.name || 'Wheel of Fortune',
    winningText: state => state.data.winningText || 'Result: <b>%s</b>',
    background: state => state.data.background || '',
    prizes: state => state.available,
    headerWidth: state => state.size
  }),
  methods: {
    displayRecords() {
      this.showRecords = true;
    },

    hideRecords() {
      this.showRecords = false;
    },

    spinCompleted(index) {
      const prize = this.prizes[index];
      this.spinning = false;
      this.spinText = 'Spin again!';
      this.resultText = this.winningText.replace('%s', prize.name);
    },

    startSpin() {
      if (!this.spinning) {
        this.$store.commit('updateAvailable');
        if (this.prizes.length === 0) return;

        this.spinning = true;
        this.spinText = 'Spinning...';
        this.resultText = '&#8203;';
        this.$refs.wheel.startSpin();
      }
    }
  }
};
</script>

<style>
.panel {
  min-height: 100%;
  height: 100vh;
  width: 100vw;
  width: 100%;
  padding: 0px 5px 0px 5px;
}
.wheel-panel-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  min-height: 100%;
  height: 100vh;
  z-index: 2;
}
.wheel-header-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
}

.title-logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.wheel-header-title {
  display: inline-block;
  border-radius: 3px;
}

/* Stylish font for the title */
.stylish-title {
  font-size: 40px;
  font-weight: bold;
  font-family: 'Cursive', sans-serif;
  color: #333;
}

/* Logo styling */
.project-logo {
  width: 80px; /* Adjust size as needed */
  margin-top: 10px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.spin-button {
  font-size: 24px;
  padding: 17px 40px;
  width: auto;
}

.wheel-footer-area {
  display: flex;
  justify-content: center;
}
.wheel-footer {
  padding: 12px;
  font-size: 18px;
  border-radius: 3px;
}
.wheel-result {
  color: black;
  margin-bottom: 6px;
}
</style>
