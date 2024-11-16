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

    <!-- Background Image -->
    <img class="background-image" :src="background ? background : null" />

    <!-- Popup for winning prize -->
    <div v-if="showPopup" class="popup wow-popup">
      <div class="popup-content">
        <div class="popup-icon">🎉</div>
        <div class="popup-message">{{ popupMessage }}</div>
      </div>
    </div>
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
      resultText: 'Ready. Get set.',
      popupMessage: '', // Holds the message for the popup
      showPopup: false // Controls the popup visibility
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

      // Display popup message
      this.popupMessage = `Congratulations! You won ${prize.name}`;
      this.showPopup = true;

      // Hide popup automatically after 1 second
      setTimeout(() => {
        this.showPopup = false;
      }, 2000);
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
  padding: 0px 10px 0px 0px;
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
  width: 80px;
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

/* Popup Styling */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 15px 30px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
  font-size: 18px;
}

/* Popup */

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: linear-gradient(135deg, #006a67, #03c2bb);
  color: white;
  padding: 20px 40px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  text-align: center;
  font-size: 22px;
  animation: popup-show 0.8s ease forwards, popup-glow 1s infinite alternate;
}

/* Popup entrance animation */
@keyframes popup-show {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  70% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Inner content for the popup */
.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

/* Emoji or Icon styling */
.popup-icon {
  font-size: 50px;
  animation: icon-bounce 0.5s ease-in-out infinite;
}

/* Message styling */
.popup-message {
  font-size: 20px;
  font-weight: bold;
}

/* Icon bounce animation */
@keyframes icon-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
