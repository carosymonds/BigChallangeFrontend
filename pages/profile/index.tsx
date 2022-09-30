import { ArrowLongLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { useContext, useState } from 'react'
import { DoctorsLayout, PatientLayout } from '../../components/layouts';
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DoctorProfile, PatientProfile } from '../../components/profile';
import { AuthContext } from '../../context';
import { Roles } from '../../constants/Enums';

const ProfilePage = () => {

    const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <>
            {user?.role == Roles.Patient ? <PatientProfile />:
            <DoctorProfile /> }
        </>
       
    )
}

export default ProfilePage;