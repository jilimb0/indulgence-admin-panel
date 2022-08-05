import axios from "axios"

export default class ApiService {
  static _apiBase = "https://api.indulgence.ml:9005/"

  static authLogin(email, password) {
    const authorization = "aW5kdWxnM25jZTpIaDlGZVlBUXFtaXU0"
    return new Promise((resolve) => {
      axios
        .post(
          `${this._apiBase}oauth/token?grant_type=password&username=${email}&password=${password}`,
          { email, password },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Basic ${authorization}`,
            },
          }
        )
        .then((res) => {
          resolve(res.data)
          sessionStorage.setItem("token", res.data.access_token)
        })
        .catch((error, res) => {
          // reject(error)
          resolve(res)
        })
    })
  }

  static passRepair(email) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this._apiBase}users/password-recovery?email=${email}`,
          { email },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static putUser(id, data) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .put(`${this._apiBase}admin/users/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static putRemoveRole(data) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .put(`${this._apiBase}admin/removeRole`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static putGrantRole(data) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .put(`${this._apiBase}admin/grantRole`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static putUnblockUser(id) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${this._apiBase}admin/unblockUser?id=${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static putBlockUser(id, delete_comments) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${this._apiBase}admin/blockUser?id=${id}&delete_comments=${
            delete_comments ? delete_comments : false
          }`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static putStory(id, data) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .put(`${this._apiBase}admin/story/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static putSelfPassword(oldPass, newPass) {
    const token = sessionStorage.getItem("token")
    return new Promise((reject) => {
      axios
        .put(
          `${this._apiBase}users/self/password`,
          { newPassword: newPass, oldPassword: oldPass },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        )
        .catch((error) => {
          reject(error)
        })
    })
  }

  static postStory(data) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .post(`${this._apiBase}admin/story`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static postNewUser(user) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .post(`${this._apiBase}admin/users`, user, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static postApproveMessage(id) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this._apiBase}admin/message/${id}/approve`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static deleteMessage(id) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this._apiBase}admin/message/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static deletePublication(id) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this._apiBase}admin/story/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static deleteComment(id) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this._apiBase}admin/story/comment/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static deleteAdmin(id) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this._apiBase}admin/users/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static getCommentsPublication(id, limit = "100", offset = "") {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this._apiBase}comments?story_id=${id}&limit=${limit}&offset=${offset}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static getCommentsReplies(id, parent_id) {
    const token = sessionStorage.getItem("token")
    return new Promise((resolve, reject) => {
      axios
        .get(`${this._apiBase}comments?story_id=${id}&parent_id=${parent_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static getSelf = async () => {
    const token = sessionStorage.getItem("token")
    const res = await fetch(`${this._apiBase}users/self`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok && res.status !== 401) {
      throw new Error(`Could not fetch auth, received ${res.status}`)
    }
    return await res.json()
  }

  static getUsers = async (
    limit = 10000000,
    offset = "",
    type = [],
    search = ""
  ) => {
    const token = sessionStorage.getItem("token")

    if (type === "administration") {
      type = ["admin", "content"]
    } else {
      type = ["user"]
    }

    const res = await fetch(
      `${this._apiBase}admin/users?limit=${limit}&offset=${offset}&with_roles=${type}&search_term=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!res.ok && res.status !== 401) {
      throw new Error(`Could not fetch auth, received ${res.status}`)
    }
    return await res.json()
  }

  static getMessage = async (limit = 10000000, offset = "", search = "") => {
    const token = sessionStorage.getItem("token")
    const res = await fetch(
      `${this._apiBase}admin/message?limit=${limit}&offset=${offset}&search_term=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!res.ok && res.status !== 401) {
      throw new Error(`Could not fetch auth, received ${res.status}`)
    }
    return await res.json()
  }

  static getPublications = async (
    limit = 10000000,
    offset = "",
    search = ""
  ) => {
    const token = sessionStorage.getItem("token")
    const res = await fetch(
      `${this._apiBase}admin/story?limit=${limit}&offset=${offset}&search_term=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!res.ok && res.status !== 401) {
      throw new Error(`Could not fetch auth, received ${res.status}`)
    }
    return await res.json()
  }

  static checkEmailExist(email) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this._apiBase}users/check-email-exist`,
          // { email },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            value: email,
          }
        )
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
