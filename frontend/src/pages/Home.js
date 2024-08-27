// frontend/src/pages/Home.js
import React from 'react';
import MainAppBar from '../components/MainAppBar'
import MainSideBar from '../components/MainSideBar'
import UserList from '../components/UserList'

function Home() {
  return (
    <div>
    <MainAppBar/>
   <div className='Flex'>
    <MainSideBar/>
    {/* <LoginStatus></LoginStatus> */}
   <UserList/>
   </div>
    
    </div>
  );
}

export default Home;
