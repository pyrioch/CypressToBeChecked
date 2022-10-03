import { top, rateCalc } from './functions4homepage'
import { randomGenerator } from './functions4HBC'
const url = 'http://localhost:3000/html'

beforeEach('Homepage', () => {
  cy.visit('/')
})

it('navtoHomePage', () => {
  cy.get('#files')
    .find('li')
    .children('a')
    .contains('a', 'html')
    .should('exist')
    .click()

  cy.location().should((loc) => {
    expect(loc.href).to.include('html')
  })

  cy.get(':nth-child(3) > .icon > .name').should('exist').click()

  cy.location().should((loc) => {
    expect(loc.href).to.include(loc.pathname)
  })
  //Check the Nav-bar
  top()
})

/* if(!el.attr('href')){

      cy.wrap(el).siblings()

      .then((sibs)=>{

        sibs.children()

        if(!sibs.children().attr('href')){

          cy.log('it is not a link')
        }

        else{

          sibs.children().attr('href').includes('#')
        }
      })
    }
 */

/* Πέφτει σε inf loop ωστόσο δεν μου είναι σαφές το γιατί εφόσον loopaαρει κάθε 
  element(link)

  let flag = false;

  while(!flag){

    el.children()

    if(el.attr('href') && index!=0){

      cy.log(el)
      expect(elment.attr('href')).includes('#')
      flag=true;

    }
  } */

/*    .children()
  .each((elment,index)=>{

    if(elment.attr('href') && index!=0){
      cy.log("it's a link",elment.html())
      expect(elment.attr('href')).includes('#')
    }
  }) */

/*  cy.get('.header__bottom > :nth-child(1) > .header__body')
  .children()
  .each((el)=>{
    cy.wrap(el).children('a')
    .then((el,a)=>{
      cy.log(el)
      cy.log(el)
    })
  }) */

it('Carreers', () => {
  cy.visit(url + '/17.Careers.html')

  //Expect the correct path

  cy.location().should((loc) => {
    expect(loc.href).to.include(loc.pathname)
  })

  cy.get('.s-accordions__items')
    .should('exist')
    .children()
    .each((it, index) => {
      cy.wrap(it).click().wait(25).click()
      index % 2 !== 0
        ? cy.wrap(it).click()
        : index == 0
        ? cy.wrap(it).click()
        : cy.wrap(it).wait(1)
    })
})
it('Services', () => {
  cy.get(':nth-child(4) > .icon > .name').click()
  cy.get(':nth-child(16) > .icon > .name').click()

  cy.location().should((loc) => {
    expect(loc.href).to.include(loc.pathname)
  })

  rateCalc()
})
it('ForgotPassword', () => {
  cy.visit(url + '/28.Forgot.Password.html')
  cy.location().should((loc) => {
    expect(loc.href).to.include(loc.pathname)
  })
  cy.get('form > .btn').should('exist').click().wait(35)

  //Assertion ότι εμφανίζεται το div alert με το κόκκινο πλαίσιο.

  cy.get('.alert').then(($div) => {
    const text = $div.children().html()
    expect(text).includes('Error')
  })

  cy.get('.alert')
    .should('have.css', 'background-color')
    .and('eq', 'rgb(248, 215, 218)')

  //Assertion οτι εμφανίζεται το alert της JS

  cy.on('window:alert', (str) => {
    expect(str).to.include(`Error`)
  })
})
it('Visit all routes one by one', () => {
  cy.get(':nth-child(4) > .icon > .name').click()

  //Assertions οτι δεν υπάρχει κάποιο σπασμενο link σε όλα τα routes του site θα σταματησει
  //την επανάληψη στο προτελευταίο list item

  //let flag = false
  cy.get('#wrapper')
    .children('ul')
    .children('li')
    .children('a')
    .each((item, index) => {
      if (index != 0 && index != 28) {
        cy.visit(item.attr('href'))
          .wait(7)
          .location()
          .should((loc) => {
            expect(loc.href).to.include(loc.pathname)
          })
      }
    })
})

it('Visit only the routes that contain lOgin form elements and type random text into them', () => {
  cy.get(':nth-child(4) > .icon > .name').click()
  cy.get('#wrapper')
    .children('ul')
    .children('li')
    .children('a')
    .each((item) => {
      cy.wrap(item.text()).then(() => {
        if (item.text().includes('Login') || item.text().includes('Register')) {
          cy.log(`got ${item}`)
          cy.visit(item.attr('href'))
          cy.get('input').each((input, index) => {
            if (
              input.attr('type') == 'text' ||
              input.attr('type') == 'password'
            )
              cy.wrap(input).scrollIntoView().type(randomGenerator(index))
          })
        }
      })
    })
})
