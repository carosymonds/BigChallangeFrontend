import type { NextPage } from 'next'
import { DoctorsLayout } from '../components/layouts'
import { SubmissionsList } from '../components/submissions/SubmissionsList'

const Home: NextPage = () => {

  return (
    <DoctorsLayout title={`Doctor's Manager`} pageDescription={`Manage your patient's data`}>
      <SubmissionsList />
    </DoctorsLayout>
  )
}

export default Home
