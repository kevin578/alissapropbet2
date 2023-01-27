import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['letter']

  connect() {
    // const numOptions = this.element.parentNode.querySelectorAll('[data-controller="option"]').length - 1 
    // this.letterTarget.innerHTML = `${letters[numOptions - 1]}. `
    this.reletter()
  }

  reletter() {
    const options = this.element.parentNode.querySelectorAll('[data-controller="option"] [data-option-target="letter"]')
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    let index = 0;
    for (const o of options) {
      o.innerHTML = `${letters[index - 1]})`
      index++;
    }
  }

}
