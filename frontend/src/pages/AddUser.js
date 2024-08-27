// src/components/MyAppBar.js
import React from 'react';
import MainAppBar from '../components/MainAppBar'
import MainSideBar from '../components/MainSideBar'
import UserForm from '../components/UserForm'

function Home() {
  return (
    <div>
    <MainAppBar/>
   <div className='Flex'>
    <MainSideBar/>
   <UserForm/>
   </div>
    
    </div>
  );
}

export default Home;
