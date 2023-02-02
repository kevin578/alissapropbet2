export function newElementHelper() {
  let newOption = this.templateTarget.cloneNode(true);
  newOption.classList.remove('hidden');
  this.element.appendChild(newOption)
}

export function moveUpHelper() {
  const previousSibling = this.containerTarget.previousElementSibling
  if (!previousSibling || previousSibling.classList.contains('hidden')) return;
  this.containerTarget.remove()
  previousSibling.before(this.containerTarget)
}

export function moveDownHelper() {
  const nextSibling = this.containerTarget.nextSibling
  if (!nextSibling) return;
  this.containerTarget.remove()
  nextSibling.after(this.containerTarget)
}

export function removeElementHelper() {
  this.containerTarget.remove()
}
