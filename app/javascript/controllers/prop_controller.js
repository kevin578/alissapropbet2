import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['template', 'number', 'container']

  connect() {
    const numSiblings = document.querySelectorAll('[data-controller="prop"]').length 
    this.numberTarget.innerHTML = `${numSiblings - 1}. `
  }

  new_option(e) {
    e.preventDefault();
    let newOption = this.templateTarget.cloneNode(true);
    newOption.classList.remove('hidden');
    this.element.appendChild(newOption)
  }

  move_up() {
    const previousSibling = this.containerTarget.previousElementSibling
    if (!previousSibling || previousSibling.classList.contains('hidden')) return;
    this.containerTarget.remove()
    previousSibling.before(this.containerTarget)
    setTimeout(this.renumber, 0)
  }

  move_down() {
    const nextSibling = this.containerTarget.nextSibling
    if (!nextSibling) return;
    this.containerTarget.remove()
    nextSibling.after(this.containerTarget)
    setTimeout(this.renumber, 0)
  }

  remove_prop() {
    this.containerTarget.remove()
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
