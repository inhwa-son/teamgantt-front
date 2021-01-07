<template src="./SignIn.html"/>

<script>

import axios from "axios";

export default {
  name: 'SignIn',
  data: () => ({
    item: {
      token: null,
      id: null,
      password: null
    }
  }),
  created() {
  },
  methods: {
    onClickSignIn() {
      if (!this.verification(this.item)) return

      const url = `https://api.teamgantt.com/v1/authenticate`
      const body = {user: this.item.id, pass: this.item.password}
      const headers = {
        headers: {'TG-Authorization': `Bearer ${this.item.token}`}
      }
      axios
          .post(url, body, headers)
          .then(response => {
            if (response.status === 200) {
              const data = response.data
              localStorage.setItem("bearer", this.item.token)
              localStorage.setItem("api_key", data.api_key)
              localStorage.setItem("user_token", data.user_token)
              localStorage.setItem("user_id", data.user_id)

              return Promise.resolve()
            }
          })
          .then(() => {
            this.$router.push('/tasks')
          })
          .catch(e => {
            console.error(e)
          })
    },
    verification(item) {
      if (!item.token) {
        alert('token 입력해 주세요.')
        return false
      }
      if (!item.id) {
        alert('id 입력해 주세요.')
        return false
      }
      if (!item.password) {
        alert('password 입력해 주세요.')
        return false
      }
      return true
    },

  }
}
</script>

<style lang="scss">

</style>