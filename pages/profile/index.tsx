import React, { useContext } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { DoctorProfile, PatientProfile } from '../../components/profile';
import { AuthContext } from '../../context';
import { Roles } from '../../constants/Enums';

const ProfilePage = () => {

    const { user } = useContext(AuthContext);

    return (
        <>
            {user?.role == Roles.Patient ? <PatientProfile />:
            <DoctorProfile /> }
        </>
       
    )
}

export default ProfilePage;