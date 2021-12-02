import { hasOperationName } from '../../utils/graphqlTestUtils'

context('User Management Integration Tests', () => {
    beforeEach(() => {
        cy.visit('/user-management')
    })

    it('Given api return users When user visit /users Should show cards', () => {
        cy.interceptGraphql((req) => {
            if (hasOperationName(req, 'listUsers')) {
                req.fixture('users.json')
            }
        }).as('listUsersQuery')

        cy.wait('@listUsersQuery')

        cy.get('[data-testid=card]').should('have.length', 6)
    })
})
