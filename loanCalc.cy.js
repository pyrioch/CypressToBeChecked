import{loanCalculator} from './functions4HBC'

const url = 'http://localhost:3000/'
let givenString = 'Product.One.Loan'
const currentValue = 1000
const targetValue = 30000000
const increment = 100000
const steps = (targetValue - currentValue) / increment
const arrows = '{rightarrow}'.repeat(steps)

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

  //Check the loan Calc as in the calc section
  cy.get('.b-calculator-accordion__header').should('exist').click()

  cy.get(
    '#s-property-loan-calculator > .s-loan-calculator > .s-loan-calculator__calculator > .b-loan-calculator > .b-loan-calculator__body > .b-loan-calculator__main'
  )
    .find('.vue-slider-dot-handle')
    .each((itm, index) => {
      if (index != 2) {
        cy.wrap(itm).type(arrows)
      } else {
        cy.wrap(itm).type('{rightarrow}'.repeat(25))
      }
    })
    
    //Για compare οτι θα δώσουν το ίδιο αποτέλεσμα. 
  loanCalculator('#s-property-loan-calculator > .s-loan-calculator > .s-loan-calculator__calculator > .b-loan-calculator > .b-loan-calculator__body > .b-loan-calculator__main',1000,100000,1000)
})
