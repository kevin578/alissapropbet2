import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['status']
  static values = {
    url: String
  }
  
  save(e) {
    e.preventDefault() 
    const status = this.statusTarget.checked ? 'live' : 'enterable'
    this.request(this.urlValue, { status })
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
        window.location.reload()
      } else {
        alert(res.msg)
      }
    })
  }
}
