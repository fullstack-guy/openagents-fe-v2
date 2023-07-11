import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';

const PageContainer = ({title, description, children}) => (
    <div style={{
        height: '100%',
        paddingLeft: '30px',
        paddingRight: '30px',
    }}>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
        </Helmet>
        {children}
    </div>
);

PageContainer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
};

export default PageContainer;
