describe('Index Page', () => {
  before(() => {
    cy.visit('/')
  })

  beforeEach(() => {
    cy.get('#control-reset').click()
  })

  it('Load with correct early expression and result', () => {
    cy.get('#expression').should('text', '0')
    cy.get('#result').should('text', '= 0')
  })

  it('Show "26" on 5 * 5 + 3 / 3', () => {
    const tokens = [5, '*', 5, '+', 3, '/', 3]

    tokens.map(token => cy.get(`[data-value="${token}"]`).click())
    cy.get('#expression').should('text', '5 * 5 + 3 / 3')
    cy.get('#result').should('text', '= 26')
  })

  it('Show "100" on 50 + 50', () => {
    const tokens = [5, 0, '+', 5, 0]

    tokens.map(token => cy.get(`[data-value="${token}"]`).click())
    cy.get('#expression').should('text', '50 + 50')
    cy.get('#result').should('text', '= 100')
  })

  it('Show "25" if expression is only "25"', () => {
    const tokens = [2, 5]

    tokens.map(token => cy.get(`[data-value="${token}"]`).click())
    cy.get('#expression').should('text', '25')
    cy.get('#result').should('text', '= 25')
  })

  it('Show "NaN" if expression is not complete', () => {
    const tokens = [2, '+']

    tokens.map(token => cy.get(`[data-value="${token}"]`).click())
    cy.get('#expression').should('text', '2 +')
    cy.get('#result').should('text', '= NaN')
  })

  it('Correctly remove last token from expression', () => {
    const tokens = [2, '+']

    tokens.map(token => cy.get(`[data-value="${token}"]`).click())
    cy.get('#control-delete').click()
    cy.get('#expression').should('text', '2')
    cy.get('#result').should('text', '= 2')
  })

  it('Reset expression when reset button is clicked', () => {
    const tokens = [5, '*', 5, '+', 3, '/', 3]

    tokens.map(token => cy.get(`[data-value="${token}"]`).click())
    cy.get('#control-reset').click()
    cy.get('#expression').should('text', '0')
    cy.get('#result').should('text', '= 0')
  })
})
