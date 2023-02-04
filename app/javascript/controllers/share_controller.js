import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['email']
  static values = { contestId: Number }
  

  connect() {
    console.log()
  }

  remove_user(e) {
    this.request('/contest/remove-user', {id: e.target.getAttribute('data-user-id'), contestId: this.contestIdValue})
  }

  add_user() {
    this.request('/contest/add-user', {email: this.emailTarget.value, contestId: this.contestIdValue})
  }

  request(url, body) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch(url, {
      method: 'POST',
      headers: {
        "X-CSRF-Token": csrfToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        location.reload()
      } else {
        alert(res.msg)
      }
    })
  }
}

