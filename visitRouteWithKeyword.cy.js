const url = 'http://localhost:3000/'
let givenString = 'Register'
beforeEach('Homepage', () => {
  cy.visit('/')
})

it('Visit Routes based on given string', () => {
  cy.get(':nth-child(4) > .icon > .name').click()

  let stop = false
  cy.get('#wrapper')
    .children('ul')
    .children('li')
    .children('a')
    .each((item, index) => {
      cy.then(() => {
        if (stop) {
          return
        }

        item.text().includes(givenString) ? (stop = true) : (stop = false)
        if (index != 0) {
          cy.log(index)
          cy.visit(item.attr('href'))
            .wait(7)
            .location()
            .should((loc) => {
              expect(loc.href).to.include(loc.pathname)
            })
        }
      })
    })
})
