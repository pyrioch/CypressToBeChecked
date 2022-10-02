import {
  footerCheck,
  baseFooter,
  socialFooter,
  randomGenerator,
  RandomProviderGenerator,
} from './functions4HBC'

const baseUrl = 'http://localhost:3000/html'
const url = '/'

beforeEach(() => {
  cy.visit(url + '/html')
})

it('FE/UI check', () => {
  //Nav to DigiPin route

  cy.get(':nth-child(32) > .icon > .name').should('exist').click().wait(120)

  cy.location().should((loc) => {
    //Alternative: baseUrl + loc.pathname

    expect(loc.href).to.include(baseUrl + '/18.Digital.Banking.digiPIN.html')
  })
  //Check the Top navBar

  cy.get('.s-article__title').then((itm) => {
    cy.wrap(itm.text()).should('contain', 'Activate your digiPIN')
  })
  //Check that "hero" img appears

  cy.get('.s-article__picture > img').then((babs) => {
    cy.wrap(babs)
      //.screenshot()
      .should('have.attr', 'src')
      .and('include', '/static/imgs/b-article/3.png')
  })

  //Check the main-footer links, function's relative path: ./functions4HBC

  footerCheck()
  baseFooter()
  socialFooter()
})

it('InterestformCheck', () => {
  cy.get(':nth-child(54) > .icon > .name').should('exist').click().wait(120)

  cy.location().should((loc) => {
    expect(loc.href).to.include(baseUrl.replace('/html', '') + loc.pathname)
  })

  cy.get(
    ':nth-child(3) > .page-container > .s-interest-form > .s-interest-form__body > .s-interest-form__main > .form-panel'
  )
    .should('exist')
    .find('#title')
    .should('exist')
    .select('Ms')
    .select('Mrs')

  //Case αφήνω κάποια random πεδία κενά.
  cy.get(
    ':nth-child(3) > .page-container > .s-interest-form > .s-interest-form__body > .s-interest-form__main > .form-panel'
  )
    .children()
    .children()
    .children()
    .children()
    .children('input')

    .each((itm, index) => {
      cy.wrap(itm.attr('Placeholder').toUpperCase()).should(
        'contain',
        itm.siblings().text()
      )
      //Συνθήκη ανα case
      if (index % 2 != 0) {
        cy.wrap(itm).type(randomGenerator(index))
      }
    })

  cy.get('.col > .btn').should('exist').click().wait(120)

  //Check the form Submission : Χρειάζεται βάση για κάποιο περεταιρω τσεκ ?

  cy.location().should((loc) => {
    expect(loc.href).to.eq(baseUrl.replace('/html', '') + loc.pathname + '?')
  })

  //Case keno e-mail

  cy.get(
    ':nth-child(3) > .page-container > .s-interest-form > .s-interest-form__body > .s-interest-form__main > .form-panel'
  )
    .children()
    .children()
    .children()
    .children()
    .children('input')

    .each((itm, index) => {
      if (itm.attr('type') != 'email') {
        cy.wrap(itm).type(randomGenerator(index))
      }
    })

  cy.get('.col > .btn').should('exist').click().wait(120)

  //Case lathos e-mail

  cy.get(
    ':nth-child(3) > .page-container > .s-interest-form > .s-interest-form__body > .s-interest-form__main > .form-panel'
  )
    .children()
    .children()
    .children()
    .children()
    .children('input')

    .each((itm, index) => {
      if (itm.attr('type') == 'email') {
        cy.wrap(itm).type(RandomProviderGenerator(index))
        //Για λάθος e-mail input switch την RandomProviderGenerator με την randomGenerator
      }
    })

  //Filled Form Submission

  cy.get('.col > .btn').should('exist').click().wait(12)

  cy.location().should((loc) => {
    expect(loc.href).to.eq(baseUrl.replace('/html', '') + loc.pathname + '?')
  })
})
