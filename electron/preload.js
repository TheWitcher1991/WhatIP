'use strict'

const { remote }  = require('electron')

const {
    getCurrentWindow,
    minimizeWindow,
    closeWindow
} = require("./menu-functions")

window.addEventListener('DOMContentLoaded', () => {
    window.getCurrentWindow = getCurrentWindow
    window.minimizeWindow = minimizeWindow
    window.closeWindow = closeWindow
})