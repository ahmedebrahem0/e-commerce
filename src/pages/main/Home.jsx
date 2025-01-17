import React, { useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';

export default function Home() {
  const { x } = useContext(AuthContext);

  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
}
