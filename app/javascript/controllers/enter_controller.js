import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['name']
  static values = {
    contestId: Number
  }
  

  connect() {
  }

  sumbit() {
    const inputs = document.querySelectorAll('.form-check-input:checked');
    const questions = document.querySelectorAll('.prop-question')
    let checkedIds = []
    for (const input of inputs) {
      checkedIds.push(input.id)
    }
    if(inputs.length != questions.length) {
      alert("You didn't answer all the questions")
    }
    if (!this.nameTarget.value) {
      alert("Please enter a name")
    }
    this.request('/entries', {name: this.nameTarget.value, contestId: this.contestIdValue, checkedIds})
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
        window.location = `/contest/${this.contestIdValue}/live`
      } else {
        alert(res.msg)
      }
    })
  }
}

