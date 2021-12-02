import { hasOperationName } from '../utils/graphqlTestUtils'
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('interceptGraphql', (operationName, callback) => {
    return cy.intercept('POST', Cypress.env('REACT_APP_API_URL'), (req) => {
        if (hasOperationName(req, operationName)) {
            callback(req)
        }
    })
})
