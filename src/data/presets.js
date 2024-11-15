'use strict';

// BNBDOGS Wheel with specified 8 options.
export const PRESET1 = {
  name: 'BNBDOGS Wheel',
  winningText: 'You won: <b>%s</b>',
  background: '',
  removeWinning: false,
  prizes: [
    { name: '200 BNBDOGS', freq: 3, bg: '#655FFF', text: '#FFFFFF', hide: false, fontMod: 1 }, // Glossy red
    { name: '500 BNBDOGS', freq: 3, bg: '#D769EE', text: '#FFFFFF', hide: false, fontMod: 1 }, // Shiny gold
    { name: '1000 BNBDOGS', freq: 3, bg: '#FF516A', text: '#FFFFFF', hide: false, fontMod: 1 }, // Glossy turquoise
    { name: '2000 BNBDOGS', freq: 3, bg: '#FFA85B', text: '#FFFFFF', hide: false, fontMod: 1 }, // Glossy blue
    { name: 'BANKRUPT', freq: 3, bg: '#878B96', text: '#FFFFFF', hide: false, fontMod: 1.2 }, // Dark red
    { name: '+1 SPIN', freq: 3, bg: '#54CA69', text: '#FFFFFF', hide: false, fontMod: 1 }, // Glossy green
    { name: '10000 BNBDOGS', freq: 3, bg: '#28C9B7', text: '#FFFFFF', hide: false, fontMod: 1.2 }, // Vibrant orange
    { name: '-1 SPIN', freq: 3, bg: '#2A9EF1', text: '#FFFFFF', hide: false, fontMod: 1 } // Glossy purple
  ]
};

// Only include this customized preset in the default list
export const DEFAULT_PRESETS = [PRESET1];
