'use strict'

const config = require('../config')
const store = require('../store')

const signUp = (data) => {
  // console.log('signUp in api called')
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}
const signIn = (data) => {
  // console.log('Api:signIn called')
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}
const changePassword = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/change-password/' + store.user.id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const signOut = (data) => {
  // console.log('Api:sign OUT called')
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token}
  })
}

const getUserHives = () => {
  // console.log('getUserHives Called')
  return $.ajax({
    url: config.apiOrigin + '/my-hives',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token}
  })
}

const onCreateHive = (data) => {
  console.log('onCreateHive Called')
  return $.ajax({
    url: config.apiOrigin + '/hives',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token},
    data
  })
}
const deleteUserHive = (id) => {
  console.log('deleteUserHive Called:' + id)
  return $.ajax({
    url: config.apiOrigin + '/hives/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token}
  })
}

const updateUserHive = (data, id) => {
  console.log('updateUserHive Called:', data)
  return $.ajax({
    url: config.apiOrigin + '/hives/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token},
    data
  })
}
module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  getUserHives,
  onCreateHive,
  deleteUserHive,
  updateUserHive
}
