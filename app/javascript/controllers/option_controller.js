import { Controller } from "@hotwired/stimulus"
import {newElementHelper, moveUpHelper, moveDownHelper, removeElementHelper} from '../form_helpers'

export default class extends Controller {
  static targets = ['template', 'letter', 'container']
  

  connect() {
    // this.parentId = this.element.parentNode.id;
    // this.containerTarget.id = `option-${crypto.randomUUID()}`
    // this.renumber()
  }

  new_option(e) {
    e.preventDefault();
    newElementHelper.bind(this)()
  }

  move_up() {
    moveUpHelper.bind(this)()
  }

  move_down() {
    moveDownHelper.bind(this)()
  }

  remove_option() {
    removeElementHelper.bind(this)()
  }

  renumber() {
    const parent = document.getElementById(this.parentId)
    const options = parent.querySelectorAll('[data-option-target="letter"]')
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    let index = 0;
    for (const o of options) {
      o.innerHTML = `${letters[index - 1]})`
      index++;
    }
  }

}
