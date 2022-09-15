import { ArrowLongLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
import { DoctorsLayout, PatientLayout } from '../../components/layouts';
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DoctorProfile, PatientProfile } from '../../components/profile';

const ProfilePage = () => {
    
    return (
        <>
            {false ? <PatientProfile />:
            <DoctorProfile /> }
        </>
       
    )
}

export default ProfilePage;