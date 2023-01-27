import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "container", 'template' ]
  connect() {
  }

  newProp(e) {
    e.preventDefault();
    let newProp = this.templateTarget.cloneNode(true);
    newProp.classList.remove('hidden');
    this.containerTarget.appendChild(newProp)
  }
}
