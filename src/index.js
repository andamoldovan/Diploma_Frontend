import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor } from './store';

import App from './App';
import Login from './components/registration/Login'
import Register from './components/registration/Register';
import ArticleContent from "./components/dashboard/top-headlines/ArticleContent";
import Preferences from './components/registration/Preferences';
import MainPage from './components/main-page/MainPage';
import Dashboard from './components/dashboard/Dashboard';
import UserSettings from './components/user-profile/UserSettings';
import AdvancedSearch from './components/advanced-search/AdvancedSearch';

const Root = ({store}) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                        <Route path={'/test'} component={App} />
                        <Route path={"/"} component={MainPage} exact />
                        <Route path={'/login'} component={Login} />
                        <Route path={'/register'} component={Register} exact/>
                        <Route path={'/register/preferences'} component={Preferences} />
                        <Route path={'/main-page'} component={Dashboard} exact/>
                        <Route path={'/main-page/content'} component={ArticleContent} />
                        <Route path={'/user-settings'} component={UserSettings} />
                        <Route path={'/advanced-search'} component={AdvancedSearch} />
                </BrowserRouter>
        </PersistGate>
    </Provider>
);


ReactDOM.render(<Root store={store} />, document.getElementById('root'));

serviceWorker.unregister();
