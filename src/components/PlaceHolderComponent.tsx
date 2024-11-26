// src/components/LandingPage.tsx
import React from 'react';
import PageHeader from './PageHeader';
import { Sdk } from '../utils/sdk';
const sdk = new Sdk()

interface PlaceholderProps{
    header:string;
    paragraph:string;
}

const Placeholder: React.FC<PlaceholderProps> = ({header}) => {
  return (
    <div className='px-6'>
        <PageHeader heading='' accent={header} backToLabel='Dashboard' backToRoute={sdk.adminDashboardRoute} />
    </div>
  );
};

export default Placeholder;
