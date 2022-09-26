import { ArrowLongLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { useContext, useState } from 'react'
import { DoctorsLayout, PatientLayout } from '../../components/layouts';
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DoctorProfile, PatientProfile } from '../../components/profile';
import { AuthContext } from '../../context';

const ProfilePage = () => {

    const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <>
            {user?.role == 'patient' ? <PatientProfile />:
            <DoctorProfile /> }
        </>
       
    )
}

export default ProfilePage;