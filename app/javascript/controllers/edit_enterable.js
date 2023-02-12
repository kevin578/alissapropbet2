import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['status']
  static values = {
    // contestId: Number
  }
  
  connect() {
    console.log('new message')
  }

  save(e) {
    e.preventDefault() 
    console.log(this.statusTarget)
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

