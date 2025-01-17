import React from 'react'
import { GridLoader } from 'react-spinners';

export default function Loading() {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <GridLoader color="#0aad0a" speedMultiplier={2} size={25} />
        </div>
      </>
    );
}

