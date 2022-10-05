import {
  randomGenerator,
  RandomProviderGenerator,
  getRandomNum,
} from './functions4HBC'
const url = 'http://localhost:3000/'
let givenString = 'Calculators'
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
        if (index != 0 && item.text().includes(givenString)) {
          cy.log(index)
          cy.visit(item.attr('href'))
            .wait(7)
            .location()
            .should((loc) => {
              expect(loc.pathname).to.include(givenString)
            })
        }
      })
    })

  //Check bottom form

  cy.get(
    ':nth-child(8) > .page-container > .b-calculator-accordion > .b-calculator-accordion__header'
  ).should('exist')

  cy.get(
    ':nth-child(8) > .page-container > .b-calculator-accordion > .b-calculator-accordion__body > .b-loan-calculator-eligibility > .b-loan-calculator-eligibility__body > .b-loan-calculator-eligibility__main'
  )
    .scrollIntoView()
    .find('input')
    .each(($el, index) => {
      $el.attr('type') == 'text'
        ? cy.wrap($el).type(randomGenerator(index))
        : cy.wrap($el).type(RandomProviderGenerator(index))
      cy.log($el, index)
    })

  //Πέφτει σε inf loop , επειδή πρέπει να γίνει κλήση της μεθόδου children() τουλάχιστον δύο φορές.

  /* each(($el) => {
      cy.then(($chld) => {
        if (finish) {
          return
        }
        cy.wrap($chld).children().attr('type') == 'text'
          ? (fnish = true)
          : (finish = false)
      })
    })
 */

  //Check the exchange rate Calculator
  cy.get(
    ':nth-child(1) > .page-container > .b-calculator-accordion > .b-calculator-accordion__header > .b-calculator-accordion__text > :nth-child(2) > .b-calculator-accordion__title'
  ).contains('Abroad Exchange Rates Calculator')

  cy.get('.b-exchange')
    .should('exist')
    .find('input')
    .each(($el, index) => {
      if ($el.attr('type') == 'text') {
        cy.wrap($el).type(randomGenerator(index))
      } else if ($el.attr('type') == 'e-mail') {
        cy.wrap($el).type(RandomProviderGenerator(index))
      } else {
        cy.wrap($el).type(index * (Math.random() + 1))
      }
    })

  //Τις επιλογές για currency

  cy.get('.b-exchange')
    .find('li')
    .each((itm) => {
      cy.wrap(itm).click({ force: true })
    })

  cy.get('.b-iban-calculator__body')
    .find('input')
    .each(($el) => {
      cy.wrap($el).type(getRandomNum($el.attr('maxlength')))
    })

  cy.get('.d-flex > .btn').should('exist').click({ force: true }).wait(15)

  cy.location().should((loc) => {
    expect(loc.href).to.include(loc.pathname)
  })
})
