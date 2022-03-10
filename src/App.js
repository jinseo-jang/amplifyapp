import React, {useEffect, useState} from 'react';
import { Amplify, Auth } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
       getUserInfo(setUserInfo)
     },[]);


  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {JSON.stringify(userInfo.attributes.email)}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

async function getUserInfo(setUserInfo) {
  const userInfo = await Auth.currentUserInfo();
  console.log('userInfo', userInfo.attributes.email);
  setUserInfo(userInfo);
}

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

// function App() {
//   return (
//     <div className="App">
//       <header>
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1>We now have Auth!</h1>
//       </header>
//       <AmplifySignOut />
//     </div>
//   );
// }

// export default withAuthenticator(App);
