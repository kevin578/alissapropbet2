import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['template', 'number', 'container']

  connect() {
    const numSiblings = document.querySelectorAll('[data-controller="prop"]').length 
    this.numberTarget.innerHTML = `${numSiblings - 1}. `
  }

}
