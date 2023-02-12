import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['status']
  static values = {
    url: String
  }

  save(e) {
    e.preventDefault()
    const inputs = document.querySelectorAll('.form-check-input:checked');
    let results = []
    for (const input of inputs) {
      results.push(input.id)
    }
    // const status = this.statusTarget.checked ? 'finished' : 'live'
    const status = 'live'
    this.request(this.urlValue, { status, results })
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
        window.location.reload();
      } else {
        alert(res.msg)
      }
    })
  }
}

