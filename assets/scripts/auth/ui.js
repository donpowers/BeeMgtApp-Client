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
  $('.add-hive-button').show()
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
  $('#userHives').empty()
  // Sort hives by ID so they are always in the same order
  data.hives.sort(function (a, b) {
    return a.id - b.id
  })
  const showHivesTemplateHtml = showHivesTemplate({ hives: data.hives })
  $('.userHives').append(showHivesTemplateHtml)
  addDeleteEventHandlers(data)
  addUpdateEventHandlers(data)
}
const addDeleteEventHandlers = function (data) {
  data.hives.forEach(function (item) {
    $('#button-delete-' + item.id).on('click', deleteHive)
  })
}
const deleteHive = function (event) {
  console.log('deleteHive: ', event)
  console.log('target_id: ', event.target.id)
  const data = event.target.id.split('-')
  console.log('id: ', data[2])
  api.deleteUserHive(data[2])
      .then(deleteHiveSuccess)
      .catch(deleteHiveFailure)
}
const deleteHiveSuccess = () => {
  // Clear the form data entered
  console.log('deleteHiveSuccess success')
  onShowUserHives()
}
const deleteHiveFailure = () => {
  // Clear the form data entered
  console.log('deleteHiveFailure failure')
}
const addUpdateEventHandlers = function (data) {
  data.hives.forEach(function (item) {
    $('#button-update-' + item.id).on('click', updateHive)
  })
}
const updateHive = function (event) {
  event.preventDefault()
  console.log('updateHive: ', event)
  console.log('target_id: ', event.target.id)
  const data = event.target.id.split('-')
  store.hive_to_update = data[2]
  // Prepopulate Modal with current values

  populateUpdateHiveModal(data[2])
  $('#updateHiveModal').modal('show')
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
  $('.add-hive-button').hide()
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
  const location = $('#location').val()
  const brood = $('#brood_supers').val()
  const honey = $('#honey_supers').val()
  if (!name) {
    $('#hiveNameRequired').text('Hive Name is required, please supply a name')
  } else {
    $('#hiveNameRequired').text('')
    console.log('checkForHiveName: ' + name)
    hiveCreate.hive.hive_name = name
    hiveCreate.hive.queen_type = queen
    hiveCreate.hive.hive_location = location
    hiveCreate.hive.honey_supers = honey
    hiveCreate.hive.brood_supers = brood
    createHive(hiveCreate)
  }
}
const checkForHiveUpdates = function () {
  console.log('checkForHiveUpdates called')
  const name = $('#new-name').val()
  const queen = $('#new-queen').val()
  const location = $('#new-location').val()
  if (!name && !queen && !location) {
    $('#noUpdatesFound').text('No updates found')
  } else {
    $('#noUpdatesFound').text('')
    hiveCreate.hive.hive_name = name
    hiveCreate.hive.queen_type = queen
    hiveCreate.hive.hive_location = location
    hiveCreate.hive.honey_supers = 3
    hiveCreate.hive.brood_supers = 2
    console.log('checkForHiveUpdates changes: ', hiveCreate.hive)
    updateUserHive(hiveCreate)
  }
}
const createHive = function (data) {
  console.log('createHive is:', data)
  event.preventDefault()
  api.onCreateHive(data)
    .then(createHiveSuccess)
    .catch(createHiveFailure)
}
const updateUserHive = function (data) {
  console.log('updateHive is:', data)
  event.preventDefault()
  api.updateUserHive(data, store.hive_to_update)
    .then(updateUserHiveSuccess)
    .catch(updateUserHiveFailure)
}
const createHiveSuccess = () => {
  console.log('createHiveSuccess')
  // update current list of hives
  onShowUserHives()
  // let user know hive was created
  $('#hiveNameRequired').text('New Hive Created!')
}
const createHiveFailure = (error) => {
  console.log('createHiveFailure')
  console.error(error)
}
const updateUserHiveSuccess = () => {
  console.log('updateHiveSuccess')
  // update current list of hives
  onShowUserHives()
}
const updateUserHiveFailure = (error) => {
  console.log('updateHiveFailure')
  console.error(error)
}
const populateUpdateHiveModal = function (id) {
  const hive = findHiveByID(id)
  console.log('Current Hive to Update: ' + id, hive)
  if (hive) {
    $('#new-name').val(hive.hive_name)
    $('#new-queen').val(hive.queen_type)
    $('#new-location').val(hive.hive_location)
  }
}
const findHiveByID = function (idMatch) {
  let result
  let i
  for (i in store.hives) {
    const id = store.hives[i].id
    if (id == idMatch) {
      return store.hives[i]
    }
  }
  result
}
const clearCreateHiveModalParameters = function () {
  $('#hiveNameRequired').text('')
  $('#name').val('')
  $('#queen').val('')
  $('#location').val('')
  $('#brood_supers').val('')
  $('#honey_supers').val('')
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
  checkForHiveName,
  checkForHiveUpdates,
  clearCreateHiveModalParameters
}
