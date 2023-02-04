import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "container", 'template', 'name', 'status' ]
  static values = {
    url: String
  }

  getProps() {
    return document.querySelectorAll('[data-controller="prop"]')
  }

  getOptions(prop) {
    return prop.querySelectorAll(('[data-controller="option"]'))
  }

  onBeforeUnload() {
    window.onbeforeunload = ()=> true;
  }

  newProp(e) {
    e.preventDefault();
    this.onBeforeUnload()
    let newProp = this.templateTarget.cloneNode(true);
    newProp.classList.remove('hidden');
    this.containerTarget.appendChild(newProp)
  }

  save(e) {
    e.preventDefault()
    const props = this.getProps()

    const savedObj = {name: this.nameTarget.value, status: this.statusTarget.value, props: []}
    for (let p of props) {
      if (p.classList.contains('hidden')) continue;
      const propValue = p.querySelector('.prop_value').value
      const retObj = {prop: propValue, options: []}
      const options = this.getOptions(p);
      for (const option of options) {
        if (option.classList.contains('hidden')) continue;
        const optionValue = option.querySelector('.option_value').value
        const pointValue = option.querySelector('.point_value').value
        retObj.options.push({option: optionValue, points: pointValue})
      }
      savedObj.props.push(retObj)
    }
    this.saveRequest(savedObj)
  }
  
  saveRequest(savedObj) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch(this.urlValue, {
      method: 'PATCH',
      headers: {
        "X-CSRF-Token": csrfToken 
      },
      body: JSON.stringify(savedObj)
    })
    .then(()=> {
      window.onbeforeunload = null;
      window.location = '/user/profile'
    })
  }


}
