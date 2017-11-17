import { Link } from 'react-router';
import React from 'react';
import {Breadcrumb} from 'antd';

const MyBreadcrumb = ({routes}) => {

  return (
    <div style={{ paddingLeft: 20, paddingTop: 20 }}>
      <Breadcrumb>
        {
          routes.map((item , i) => {
            if(i < routes.length - 1) {
              return <Breadcrumb.Item key={i}><a href={"#" + item.path}>{item.breadcrumbName}</a></Breadcrumb.Item>
            } else {
              return <Breadcrumb.Item key={i}>{item.breadcrumbName}</Breadcrumb.Item>
            }
          })
        }
      </Breadcrumb>
    </div>
  );
};

export default MyBreadcrumb;
