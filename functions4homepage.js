function top() {
  cy.get('.header__top > .page-container > .header__body').each((el) => {
    if (el.attr('href')) {
      expect(el.attr('href')).includes(el.attr('href'))
    } else {
      cy.wrap(el)
        .find('a')
        .each((links) => {
          expect(links.attr('href')).includes(links.attr('href'))
        })
    }

    cy.get('.header__bottom > :nth-child(1)')
      .children('')
      .find('a')
      .each((itm, index) => {
        index > 2
          ? expect(itm.attr('href')).includes('#')
          : expect(itm.attr('href')).includes(itm.attr('href'))
      })
  })
}

function rateCalc() {
  cy.get('.b-calculator-accordion__header').should('exist').click()

  cy.get(':nth-child(1) > .col > .input-group > .multiselect')

    .children('div')
    .children('ul')
    .children('li')
    .each((firstSelection, index) => {
      cy.wrap(firstSelection).click({ force: true })
      index == 0
        ? cy
            .get(':nth-child(2) > .col > .input-group > .multiselect')
            .children('div')
            .children('ul')
            .children('li')
            .each((secondSelection) => {
              cy.wrap(secondSelection).click({ force: true })
            })
        : cy.log(firstSelection)
       
    })


    cy.get('#amount')
    .type(randAmount())
      
  function randAmount() {
    return 500 * Math.round((Math.random() + 1),3)
  }
}
export { top, rateCalc }
