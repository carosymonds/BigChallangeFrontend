import { useState, useContext } from 'react';
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ISubmission } from '../../interfaces/submission';
import { DoctorsLayout } from '../../components/layouts';

interface Props {
    submission: ISubmission
}


const ProductPage:NextPage<Props> = ({ submission }) => {




  return (
    <DoctorsLayout title="Submission" pageDescription="Submission">
        <h1>sum</h1>
    
    </DoctorsLayout>
  )
}







export default ProductPage