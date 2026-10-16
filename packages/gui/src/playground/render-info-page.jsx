import React from 'react';

import {IntlProvider} from 'react-intl';

const wrapInfoPage = InfoPage => {
    const InfoPageWrapper = () => (
        <IntlProvider>
            {InfoPage}
        </IntlProvider>
    );

    return <InfoPageWrapper />;
};

export default wrapInfoPage;
