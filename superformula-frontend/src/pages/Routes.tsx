import React, { ReactElement } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import UserManagement from 'domains/users/pages/UserManagement/UserManagement'
import NotFound from './NotFound/NotFound'

function Routes(): ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/user-management">
                    <UserManagement />
                </Route>
                <Route path="/not-found">
                    <NotFound />
                </Route>
                <Redirect from="/" exact to="/user-management" />
                <Redirect from="*" to="/not-found" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
