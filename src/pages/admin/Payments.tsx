import React from 'react'
import { Sdk } from '../../utils/sdk'
const sdk = new Sdk()
import PageHeader from '../../components/PageHeader'
const Payments = () => {
  return (
    <PageHeader heading="" accent="Manage Inventory" backToRoute={sdk.adminDashboardRoute} backToLabel='Dashboard'/>
  )
}

export default Payments