'use strict'
const api = require('./api')
const store = require('../store')
const showHivesTemplate = require('../templates/hive-listing.handlebars')
const hiveCreate = require('../hiveCreate')

const signUpSuccess = (data) => {
  console.log('signUpSuccess calledd: ', data)
  // Clear the form data entered
  $('#sign-up').trigger('reset')
  $('#sign-up').hide()
}

const signUpFailure = (error) => {
  $('#sign-up').trigger('reset')
  showModalMessage('You were unable to sign-up. Please Try Again')
  console.error(error)
}

const signInSuccess = (data) => {
  console.log('Sign-in success: ', data)
  // Clear the form data entered
  $('#sign-in').trigger('reset')
  store.user = data.user
  console.log('Token: ', store.user.token)
  showUserLoggedlMessage('Welcome ' + store.user.email)
  onShowUserHives()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-out').show()
  $('#add-hives-button').submit(function (event) {
    alert('Handler for .submit() called.')
    event.preventDefault()
  })
  // $('#add-hives-button').on('click', events.onCreateHive)
  // $('#add-hives-button').on('submit', events.onCreateHive)
  $('#add-hives-button').show()
}
const onShowUserHives = function () {
  console.log('onShowUserHives called')
  api.getUserHives()
    .then(getHivesSuccess)
    .catch(getHivesFailure)
}
const getHivesSuccess = (data) => {
  console.log('getHivesSuccess success', data)
  store.hives = data.hives
  const showHivesTemplateHtml = showHivesTemplate({ hives: data.hives })
  $('.userHives').append(showHivesTemplateHtml)
}
const getHivesFailure = () => {
  // Clear the form data entered
  console.log('getHivesFailure failure')
}
const signInFailure = (error) => {
  console.log('Sign In Failure')
  showModalMessage('You were unable to sign-in. Please Try Again or Sign Up.')
  $('#sign-in').trigger('reset')
  console.error(error)
}
const signOutSuccess = () => {
  console.log('Sign Out success: ')
  // clean up the stored value
  store.user = null
  $('#sign-in').show()
  $('#sign-up').show()
  $('#sign-in').show()
  $('#sign-out').hide()
  $('#userHives').empty()
  showUserLoggedlMessage('Welcome! Please Sign In or Sign Up.')
}
const signOutFailure = (error) => {
  showModalMessage('You were unable to sign-out. Please Try Again or Sign Up.')
  console.error(error)
}
const changePasswordSuccess = () => {
  // Clear the form data entered
  console.log('Change Password success')
  $('#change-password').trigger('reset')
}
const changePasswordFailure = (error) => {
  console.log('Change Password Out Failure')
  showModalMessage('You were unable to change your password. Please Try Again.')
  $('#change-password').trigger('reset')
  console.error(error)
}
const showModalMessage = function (message) {
  $('#infoModalText').text(message)
  $('#infoModal').modal('show')
}
const showUserLoggedlMessage = function (message) {
  $('#currentUser').text(message)
}

const checkForHiveName = function () {
  console.log('checkForHiveName called')
  const name = $('#name').val()
  const queen = $('#queen').val()
  const location = $('#hive-location').val()
  if (!name) {
    $('#hiveNameRequired').text('Hive Name is required, please supply a name')
  } else {
    $('#hiveNameRequired').text('')
    console.log('checkForHiveName: ' + name)
    hiveCreate.hive.hive_name = name
    hiveCreate.hive.queen_type = queen
    hiveCreate.hive.hive_location = location
    hiveCreate.hive.honey_supers = 3
    hiveCreate.hive.brood_supers = 2
    createHive(hiveCreate)
  }
}
const createHive = function (data) {
  console.log('createHive is:', data)
  event.preventDefault()
  api.onCreateHive(data)
    .then(createHiveSuccess)
    .catch(createHiveFailure)
}
const createHiveSuccess = () => {
  console.log('createHiveSuccess')
}
const createHiveFailure = (error) => {
  console.log('createHiveFailure')
  console.error(error)
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  changePasswordFailure,
  changePasswordSuccess,
  getHivesSuccess,
  getHivesFailure,
  checkForHiveName
}
