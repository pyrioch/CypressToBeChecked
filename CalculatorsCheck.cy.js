import {
  randomGenerator,
  RandomProviderGenerator,
  getRandomNum,
  formatDate
} from './functions4HBC'

const url = 'http://localhost:3000/'
let givenString = 'Calculators'

beforeEach('Homepage and Visit Routes based on given string', () => {
  cy.visit('/')
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

})

it('Check the Form and abroad exch rate', () => {

  //Check the submission form in the bottom 

  cy.get(
    ':nth-child(8) > .page-container > .b-calculator-accordion > .b-calculator-accordion__header'
  ).should('exist')

  cy.get(
    ':nth-child(8) > .page-container > .b-calculator-accordion > .b-calculator-accordion__body > .b-loan-calculator-eligibility > .b-loan-calculator-eligibility__body > .b-loan-calculator-eligibility__main'
  )
    .scrollIntoView()
    .find('input')
    .each(($el, index) => {
      if ($el.attr('type') == 'text') {
        cy.wrap($el).type(randomGenerator(index))
      } else if ($el.attr('type') == 'email') {
        cy.wrap($el).type(RandomProviderGenerator(index))
      } else if ($el.attr('type') == 'tel') {
        cy.wrap($el).type(69 + getRandomNum(8))
      } else {
        cy.wrap($el).type(Math.floor(1000 * (Math.random() + 1)))
      }
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

//Check the abroad exchange rate Calculator

  cy.get(
    ':nth-child(1) > .page-container > .b-calculator-accordion > .b-calculator-accordion__header > .b-calculator-accordion__text > :nth-child(2) > .b-calculator-accordion__title'
  ).contains('Abroad Exchange Rates Calculator')

//Get the current date in yy//mm/dd format to be passed into the datepicker 
let date = formatDate(new Date())
//cy.log(date)

  cy.get('.b-exchange')
    .should('exist')
    .find('input')
    .each(($el, index) => {
      if ($el.attr('type') == 'text') {
        cy.wrap($el).type(randomGenerator(index))
      } else if ($el.attr('inputmode') == 'decimal') {
        cy.wrap($el).type(Math.floor(1000 * (Math.random() + 1)))
      } else {

        //Will pick the current date 
        cy.wrap($el)
        .click()
        .siblings()
        .then(($el)=>{
         
          cy.wrap($el)
          .find(`.id-${date}`+'> .vc-day-content')  
          .click()

        })
        
      }
    })

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

  //Check the Green Car loan Calculator

  cy.get(
    '#s-green-car-loan-calculator > .s-loan-calculator > .s-loan-calculator__calculator > .b-loan-calculator'
  )
    .should('exist')
    .find('input')
    .each(($input, index) => {
      if ($input.attr('inputmode') == 'decimal') {
        cy.wrap($input).type(Math.floor(1000 * (Math.random() + 1)))
        cy.log(index)
      }
    })

  const currentValue = 1000
  const targetValue = 100000
  const increment = 10000
  const steps = (targetValue - currentValue) / increment
  const arrows = '{rightarrow}'.repeat(steps)

  cy.get(
    '#s-green-car-loan-calculator  > .s-loan-calculator > .s-loan-calculator__calculator > .b-loan-calculator > .b-loan-calculator__body > .b-loan-calculator__main'
  )
    .find('.vue-slider-dot-handle')
    .each((itm, index) => {
      if (index != 2) {
        cy.wrap(itm).type(arrows)
      } else {
        cy.wrap(itm).type('{rightarrow}'.repeat(5))
      }
    })

;
})

it('Property Loan Calc', () => {
  
  // To be exported to function same code as on top block
  const currentValue = 1000
  const targetValue = 3000000
  const increment = 100000
  const steps = (targetValue - currentValue) / increment
  const arrows = '{rightarrow}'.repeat(steps)

  cy.get('#s-property-loan-calculator > .s-loan-calculator > .s-loan-calculator__calculator > .b-loan-calculator')
  .should('exist')
  .find('.vue-slider-dot-handle')
    .each((itm, index) => {
      if (index != 2) {
        cy.wrap(itm).type(arrows)
      } else {
        cy.wrap(itm).type('{rightarrow}'.repeat(25))
      }
    })
})  