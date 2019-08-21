import _ from 'lodash';
import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';

import { Layout } from './Layout.jsx';
import { CustomersPage } from "./customers/CustomersPage";

export function Root({ routes }) {
    return (
        <Router>
            <Layout>
                <Switch>
                    {_.map(routes, route => <Route {...route} />)}
                </Switch>
            </Layout>
        </Router>
    );
}
