export {
  footerCheck,
  baseFooter,
  socialFooter,
  randomGenerator,
  RandomProviderGenerator,
  getRandomNum,
  loanCalculator,
  formatDate,
}
//Functions to be imported to HBC Tests
function footerCheck() {
  //Το cypress βλέπει μόνο rgb values

  cy.get('.s-footer')
    .should('exist')
    .should('have.css', 'background-color')
    .and('eq', 'rgb(15, 53, 87)')

  cy.get('.s-footer__menu >')
    .children('ul')
    .children('li')
    .children('a')
    .should('exist')

    //Δεν έχω καταλάβει γιατί δεν λειτουργεί.
    /*  .each(($element,index,$list)=>{

       cy.log($element.text(),$list[index])
        expect($element).to.have.text($list[index])
        //.should('contain',)
    })  */

    .each(($element) => {
      expect($element.attr('href')).to.contain('#')
      $element.text().replaceAll('#', $element.text())
      expect($element.html()).to.contain($element.text())
    })

  //Θέλω έναν τρόπο να δώσω μέσα στην each loop εξωτερικό πίνακα με strings to element.text() που να χρησιμοποιηεί το κοινό index για assertions.
}
function baseFooter() {
  cy.get('.s-footer__bottom-menu')
    .should('exist')
    .children()
    .children()
    .children()
    .each((item) => {
      cy.wrap(item).should('contain', item.html())
    })
}
function socialFooter() {
  cy.get('.s-footer__social')
    .should('exist')
    .children()
    .children()
    .children('a')
    .each(($item) => {
      cy.wrap($item.attr('href')).should('contain', '#')
    })
}
function randomGenerator(num) {
  let specials = ['!', '@', '#', '$', '%', '*', '&', '(', ')']
  let chars = ['a,', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm']
  let nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  //Create Random index
  var ri = Math.floor(num * Math.random() + 1)
  return specials[ri] + chars[ri] + nums[ri]
}

function RandomProviderGenerator(noOfCahrs) {
  const array = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]
  let randstr = ''
  const providers = ['gmail', 'yahoo', 'outlook', 'icloud']
  const suffix = ['.com', '.gr']

  //Creating a random string with the selected number of chars

  for (var i = 0; i <= noOfCahrs; i++) {
    randstr = randstr + array[Math.floor(25 * Math.random()) + 1]
  }

  randstr =
    randstr +
    '@' +
    providers[Math.floor(providers.length * Math.random())] +
    suffix[Math.floor(suffix.length * Math.random())]

  console.log(randstr)
  return randstr
}

function getRandomNum(length) {
  var randomNum = (
    Math.pow(10, length)
      .toString()
      .slice(length - 1) +
    Math.floor(Math.random() * Math.pow(10, length) + 1).toString()
  ).slice(-length)
  return randomNum
}

//To be called inside an it block

function loanCalculator(element_id, sliderstart, sliderend, increment) {
  var steps = (sliderend - sliderstart) / increment
  var arrows = '{rightarrow}'.repeat(steps)

  cy.get(element_id)
    .find('.vue-slider-dot-handle')
    .each((itm, index) => {
      if (index != 2) {
        cy.wrap(itm).type(arrows)
      } else {
        cy.wrap(itm).type('{rightarrow}'.repeat(25))
      }
    })
}

//Για datepicker

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-')
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0')
  }
}
