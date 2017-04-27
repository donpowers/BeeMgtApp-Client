'use strict'
//  const api = require('./api')
const store = require('../store')

const signUpSuccess = (data) => {
  console.log('signUpSuccess calledd: ', data)
  // Clear the form data entered
  $('#sign-up').trigger('reset')
}

const signUpFailure = (error) => {
  $('#sign-up').trigger('reset')
  console.error(error)
}

const signInSuccess = (data) => {
  console.log('Sign-in success: ', data)
  // Clear the form data entered
  $('#sign-in').trigger('reset')
  store.user = data.user
}

const signInFailure = (error) => {
  console.log('Sign In Failure')
  $('#sign-in').trigger('reset')
  console.error(error)
}
const signOutSuccess = () => {
  console.log('Sign Out success: ')
  // clean up the stored value
  store.user = null
}
const signOutFailure = (error) => {
  console.log('Sign Out Failure')
  console.error(error)
}
const changePasswordSuccess = () => {
  // Clear the form data entered
  console.log('Change Password success')
  $('#change-password').trigger('reset')
}
const changePasswordFailure = (error) => {
  console.log('Change Password Out Failure')
  $('#change-password').trigger('reset')
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
  changePasswordSuccess
}
