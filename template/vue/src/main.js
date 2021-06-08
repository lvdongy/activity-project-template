import init from './js/init'
init();

import Vue from 'vue'

import './css/public.css'
import './css/index.scss'

let vm;
document.addEventListener('DOMContentLoaded', initVue, false);

function initVue() {
    vm = new Vue({
        el: document.getElementById('app'),

        data () {
            return {
               title: 'Hello Webpack'
            }
        },

        methods: {
           
        }
    })
}

