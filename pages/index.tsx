import { Dialog, Menu, RadioGroup, Tab, Transition } from '@headlessui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { BeakerIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { Fragment, useState } from 'react'
import SideMenu from '../components/ui/SideMenu'
import { DoctorsLayout } from '../components/layouts'
import { SubmissionsList } from '../components/submissions/SubmissionsList'

const links = [
  { href: '/account-settings', label: 'Account settings' },
  { href: '/support', label: 'Support' },
  { href: '/license', label: 'License' },
  { href: '/sign-out', label: 'Sign out' },
]

const plans = [
  {
    name: 'Startup',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '160 GB SSD disk',
  },
  {
    name: 'Business',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk',
  },
  {
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk',
  },
]


const Home: NextPage = () => {

  return (
    <DoctorsLayout title={`Doctor's Manager`} pageDescription={`Manage your patient's data`}>
      <SubmissionsList />
    </DoctorsLayout>
  )
}

export default Home
