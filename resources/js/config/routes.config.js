import React from 'react';
import { Redirect } from 'react-router-dom';

import { ItemsPage } from "../components/items/ItemsPage";
import { OrdersPage } from "../components/orders/OrdersPage";
import { CustomersPage } from "../components/customers/CustomersPage";

export default [
    { path: '/', exact: true, component: () => <Redirect to="/orders" />  },

    { path: '/items', component: ItemsPage },
    { path: '/orders', component: OrdersPage },
    { path: '/customers', component: CustomersPage },
];
