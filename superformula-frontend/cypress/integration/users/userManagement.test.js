describe('Given api return users', () => {
    it('When user visit /user-management Should show cards', () => {
        cy.interceptGraphql('ListUsers', (req) => {
            req.reply({
                fixture: 'users/page-1.json',
            })
        }).as('ListFirstPage')

        cy.visit('/user-management')

        cy.wait('@ListFirstPage')

        cy.findAllByTestId('card').should('have.length', 6)
    })

    it('When user click on load more Should show more 6 cards', () => {
        cy.interceptGraphql('ListUsers', (req) => {
            req.reply({
                fixture: 'users/page-1.json',
            })
        }).as('ListFirstPage')

        cy.visit('/user-management')

        cy.wait('@ListFirstPage')

        cy.interceptGraphql('ListUsers', (req) => {
            req.reply({
                fixture: 'users/page-2.json',
            })
        }).as('ListSecondPage')

        cy.findByRole('button', { name: 'Load More' }).click()

        cy.wait('@ListSecondPage')

        cy.findAllByTestId('card').should('have.length', 12)
    })

    it('When user search for an user Should filter this user', () => {
        cy.interceptGraphql('ListUsers', (req) => {
            req.reply({
                fixture: 'users/page-1.json',
            })
        }).as('ListFirstPage')

        cy.visit('/user-management')

        cy.wait('@ListFirstPage')

        cy.interceptGraphql('ListUsers', (req) => {
            if (req.body.variables.filter.name.contains === 'Miss Bruce') {
                req.reply({
                    fixture: 'users/searched-user.json',
                })
            }
        }).as('SearchUser')

        cy.findByPlaceholderText('Search...').click().type('Miss Bruce')

        cy.wait('@SearchUser')
    })

    it('When user visit /user-management?page=1 Should show page 1 and page 2', () => {
        cy.interceptGraphql('ListUsers', (req) => {
            if (req.body.variables.limit === 12) {
                req.reply({
                    fixture: 'users/page-1-and-2.json',
                })
            }
        }).as('ListFirstPage')

        cy.visit('/user-management?page=1')

        cy.wait('@ListFirstPage')

        cy.findAllByTestId('card').should('have.length', 12)
    })

    it('When user click to edit an user Should show a modal with user data', () => {
        cy.interceptGraphql('ListUsers', (req) => {
            req.reply({
                fixture: 'users/simple-user.json',
            })
        }).as('ListFirstPage')

        cy.interceptGraphql('GetLocation', (req) => {
            req.reply({
                data: {
                    getLocation: { latitude: 28.377034648234925, longitude: -81.57069708661061 },
                },
            })
        }).as('GetLocation')

        cy.visit('/user-management')

        cy.findByTitle('Edit User').click()

        cy.wait('@GetLocation')

        cy.findByText('Edit user').should('exist')

        cy.findByLabelText('Name').should('have.value', 'Miss Bruce Spencer')
        cy.findByLabelText('Location').should('have.value', 'West Melba Utah 23937-4479')
        cy.findByLabelText('Description').should(
            'have.value',
            'Et itaque non velit illo ullam non consectetur ut sed.'
        )
    })

    it('When user click to close the modal Should return to user list', () => {
        cy.interceptGraphql('ListUsers', (req) => {
            req.reply({
                fixture: 'users/simple-user.json',
            })
        }).as('ListFirstPage')

        cy.interceptGraphql('GetLocation', (req) => {
            req.reply({
                data: {
                    getLocation: { latitude: 28.377034648234925, longitude: -81.57069708661061 },
                },
            })
        }).as('GetLocation')

        cy.visit('/user-management')

        cy.findByTitle('Edit User').click()

        cy.wait('@GetLocation')

        cy.findByRole('button', { name: 'Cancel' }).click()

        cy.findByText('Edit user').should('not.exist')
    })

    it('When user click to save the edition Should save and return to list', () => {
        const expectedParams = {
            name: 'Edited: Miss Bruce Spencer',
            address: 'Edited: West Melba Utah 23937-4479',
            description: 'Edited: Et itaque non velit illo ullam non consectetur ut sed.',
        }

        cy.interceptGraphql('ListUsers', (req) => {
            req.reply({
                fixture: 'users/simple-user.json',
            })
        }).as('ListFirstPage')

        cy.interceptGraphql('GetLocation', (req) => {
            req.reply({
                data: {
                    getLocation: { latitude: 28.377034648234925, longitude: -81.57069708661061 },
                },
            })
        }).as('GetLocation')

        cy.interceptGraphql('UpdateUser', (req) => {
            const { name, address, description } = req.body.variables.input

            if (
                name === expectedParams.name &&
                address === expectedParams.address &&
                description === expectedParams.description
            ) {
                req.reply({
                    data: {},
                })
            }
        }).as('UpdateUser')

        cy.visit('/user-management')

        cy.wait('@GetLocation')

        cy.findByTitle('Edit User').click()

        cy.findByLabelText('Name').clear().type(expectedParams.name)
        cy.findByLabelText('Location').clear().type(expectedParams.address)
        cy.findByLabelText('Description').clear().type(expectedParams.description)

        cy.findByRole('button', { name: 'Save' }).click()

        cy.wait('@UpdateUser')

        cy.findByText('Edit user').should('not.exist')
    })
})
