import React from 'react';
import { Helmet } from 'react-helmet';
import { RouteChildrenProps } from 'react-router-dom';

const GoldSeach: React.FC<RouteChildrenProps> = props => {

  return (
    <main className="user_gold_search">
      <Helmet>
        <title>金币查询 - { window.originTitle }</title>
      </Helmet>
    </main>
  )
}

export default GoldSeach;