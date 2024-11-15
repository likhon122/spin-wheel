import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';

import { getAvailable, getInitialPreset } from '../data';
import { PRESET1 } from '../data/presets';
// import { loadOptions, loadPresets } from '../data/storage'; // Comment this out
import { deepClone, getParameterByName } from '../util';

Vue.use(Vuex);

// let options = loadOptions(); // Remove or comment this line
// const presets = loadPresets(); // Remove or comment this line
let options = deepClone(PRESET1); // Use PRESET1 directly
const presets = [PRESET1]; // Set presets to use only PRESET1

// Use the preset specified by the parameter, if any.
const initial = getInitialPreset(getParameterByName('preset'), presets);
const data = initial ? deepClone(initial) : deepClone(options || PRESET1);

// If there is no stored options, use the initial data as options.
if (!options) {
  options = deepClone(data);
}

const state = {
  totalSpins: 0,
  spins: 0,
  lastResult: -1,
  showOptions: false,
  size: 0,
  options,
  data,
  available: deepClone(getAvailable(data.prizes)),
  records: [],
  presets
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

if (module.hot) {
  module.hot.accept(['./getters', './actions', './mutations'], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    });
  });
}

export default store;
