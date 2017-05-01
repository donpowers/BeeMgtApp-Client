'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  const data = getFormFields(this)
  // console.log('Data is:', data)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('onSignIn data: ', data)
  api.signIn(data)
  .done(ui.signInSuccess)
  .fail(ui.signInFailure)
}
const onSignOut = (data) => {
  event.preventDefault()
  if (store.user == null) {
    // console.log('No One to Sign Out')
    return
  }
  // console.log('Api:sign OUT called')
  api.signOut()
  .then(ui.signOutSuccess)
  .catch(ui.signOutFailure)
}
const onChangePassword = function (event) {
  // console.log('onChangePassword called')
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('onChangePassword called', data)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
// const onShowHives = function (event) {
//   // console.log('onShowHives called')
//   event.preventDefault()
//   api.getHives()
//     .then(ui.getHivesSuccess)
//     .catch(ui.getHivesFailure)
// }
const onCreateHive = function (event) {
  console.log('onCreateHive called')
  event.preventDefault()
  $('#createHiveModal').modal('show')
}
const createHiveBackend = function (event) {
  console.log('createHiveBackend called')
  ui.checkForHiveName()
  event.preventDefault()
}
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#add-hives-button').hide()
  // $('#add-hives-button').on('submit', onCreateHive)
  $('#add-hives-button').on('click', onCreateHive)
  $('#create_hive').on('click', createHiveBackend)
}
module.exports = {
  addHandlers
}
