import React from 'react'
import { DoctorsLayout } from '../../components/layouts';
import { SubmissionsList } from '../../components/submissions'

const HistoryPage = () => {
  return (
    <DoctorsLayout title={`Doctor's Manager`} pageDescription={`Manage your patient's data`}>
    <SubmissionsList showfilters={false}/>
  </DoctorsLayout>    )
}

export default HistoryPage;
