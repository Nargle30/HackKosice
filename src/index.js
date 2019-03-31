import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import User from '../Users/User';
import Map from '../components/Map/Map';

const App = () => {
    return (
        <MemoryRouter initialEntries={['/user', '/']} initialIndex={0}>
            <>
                <Route path={['/user']} component={User} exact />
                <Route path={'/'} component={Map} exact />
            </>
        </MemoryRouter>
    );
};

export default React.memo(App);