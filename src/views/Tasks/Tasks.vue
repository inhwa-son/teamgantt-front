<template src="./Tasks.html"/>

<script>

import axios from "axios";

const headers = {
  headers: {
    'accept': '',
    "content-type": "application/json",
    'TG-Authorization': `Bearer ${localStorage.getItem("bearer")}`,
    'TG-Api-Key': localStorage.getItem("api_key"),
    'TG-User-Token': localStorage.getItem("user_token")
  }
}

export default {
  name: 'Tasks',
  data: () => ({
    list: [],
  }),
  created() {
    if (!localStorage.getItem("bearer")) {
      return window.history.back()
    }

    setTimeout(async () => {
      await this.onClickReset()
    }, 100);

  },
  methods: {
    async onClickReset() {
      try {
        this.list = await this.getList()
        this.list = this.list.filter(e => e.resources && e.resources.length <= 0)
      } catch (e) {
        console.error(e)
      }
    },

    async getList() {
      const response = await axios.get(`https://api.teamgantt.com/v1/tasks`, headers)
      return response.data
    },

    onClickResourceToTask(taskId, index) {
      if (!confirm(`Assign Resource to Task ?`)) return

      const url = `https://api.teamgantt.com/v1/tasks/${taskId}/resources`
      const body = {type: "user", type_id: Number(localStorage.getItem("user_id"))}
      axios
          .post(url, body, headers)
          .then(response => {
            if (response.status === 200) {
              this.list.splice(index, 1)
            }
          })
          .catch(e => {
            console.error(e)
          })
    },
  }
}
</script>

<style lang="scss">

</style>