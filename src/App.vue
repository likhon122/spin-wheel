<template>
  <div id="app">
    <transition name="fade-in" mode="out-in" appear>
      <OptionsPanel v-if="showOptions" />
      <WheelPanel v-else />
    </transition>
  </div>
</template>

<script>
import OptionsPanel from './components/OptionsPanel';
import WheelPanel from './components/WheelPanel';

export default {
  name: 'App',
  components: {
    OptionsPanel,
    WheelPanel
  },
  computed: {
    showOptions() {
      return this.$store.state.showOptions;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500&display=swap');

/* Applying a soft, warm background color that matches the logo's tones */
html,
body {
  font-family: 'Quicksand', sans-serif; /* Friendly and clean font choice */
  font-size: 15px;
  margin: 0;
  height: 100vh;
  color: #4a4a4a;
  position: relative;
  background: linear-gradient(to right, #7babdb, #9cd7c1, #98d48e);
  overflow-x: hidden;
}

#app {
  text-align: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

div {
  margin: 0;
  padding: 0;
}

/* Input fields with subtle colors that blend with the warm theme */
input[type='text'],
input[type='number'] {
  font-family: 'Quicksand', sans-serif;
  font-size: 15px;
  padding: 5px;
  background: none;
  color: #4a4a4a;
  border: none;
  border-bottom: 1px solid #d3b8a5; /* Muted brown for input border */
  transform-origin: left;
  transition: border-color 0.25s;
}

input[type='text']:focus,
input[type='number']:focus {
  outline: none;
  border-bottom-color: #b39068; /* Darker warm tone for focused input */
}

/* Button styles updated for a cohesive theme with warm and earthy tones */
.spinButton {
  background-color: #006a67;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  width: 300px;
  height: 43px;
  font-weight: 500;
  border: 1px solid #006a67;
  transition: background-color 0.2s, color 0.2s;
}

.spinButton:hover {
  background-color: #098b87;
}
.recordButton {
  color: #fdf3e6; /* Light cream text color */
  /* Warm brown color for button */
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  width: 170px;
  height: 40px;
  font-weight: 500;
  background-color: white;
  transition: background-color 0.2s, color 0.2s;
  border: 1px solid #006a67;
  color: #006a67;
}

.recordButton:hover {
  background-color: #006a67;
  color: white;
}

/* Main panel for a clean layout */
.main-panel {
  position: relative;
  min-height: 100%;
  height: 100vh;
}

/* Transition effects for smooth appearance */
.fade-enter-active,
.fade-leave-active,
.fade-in-enter-active {
  transition: opacity 0.15s;
}

.fade-in-enter-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to,
.fade-in-enter {
  opacity: 0;
}
</style>
