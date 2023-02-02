import { Controller } from "@hotwired/stimulus"
import {newElementHelper, moveUpHelper, moveDownHelper, removeElementHelper} from 'helpers/form_helpers'

export default class extends Controller {
  static targets = ['template', 'number', 'container']

  connect() {
    const numSiblings = document.querySelectorAll('[data-controller="prop"]').length 
    this.numberTarget.innerHTML = `${numSiblings - 1}. `
    this.containerTarget.id = crypto.randomUUID()
    this.renumber()
  }

  new_option(e) {
    e.preventDefault();
    newElementHelper.bind(this)()
  }

  move_up() {
    moveUpHelper.bind(this)()
    setTimeout(this.renumber, 0)
  }

  move_down() {
    moveDownHelper.bind(this)()
    setTimeout(this.renumber, 0)
  }

  remove_prop() {
    removeElementHelper.bind(this)()
    setTimeout(this.renumber, 0)
  }

  renumber() {
    const props = document.querySelectorAll('[data-edit-contest-target="container"] [data-prop-target="number"]')
    let index = 0;
    for (const p of props) {
      p.innerHTML = `${index}.` 
      index++;
    }
  }
}
