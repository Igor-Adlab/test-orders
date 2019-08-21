require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';

// Config
import routes from './config/routes.config';

// Components
import { Root } from "./components/Root";

ReactDOM.render(<Root routes={routes} />, document.getElementById('application'));
