import { Link } from 'react-router';
import React from 'react';

const MyBreadcrumb = ({routes}) => {
    return (
            // <Breadcrumb routes={routes} params={params} style={{margin: '12px 0'}} />
            <div  className="breadcrumbName">
                {
                    routes.map((item , i) => {
                        if(item.breadcrumbName)
                        return routes.length === (i+1) ? 
                        <label style={{fontWeight:'bold'}} key={i}>{` ${item.breadcrumbName} `}</label>
                        :
                        <label  key={i}><Link to={item.path}>{` ${item.breadcrumbName} ${ routes.length === 0 ? '' : '/'}`}</Link></label>
                    })
                }
            </div>
        );
};

export default MyBreadcrumb;