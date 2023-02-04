# Pin npm packages by running ./bin/importmap

##{Rails.root}/node_modules/tw-elements/dist/js/index.min.js
pin "application", preload: true
pin "tw-elements", to: "https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/helpers", under: "helpers"
pin_all_from "app/javascript/controllers", under: "controllers"
