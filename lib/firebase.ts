import admin, { ServiceAccount } from 'firebase-admin';

import serviceAccount from '@src/secrets/beatport-spotify-sync-firebase-adminsdk-ag3lx-d080a895dd.json';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
      databaseURL: 'https://beatport-spotify-sync.firebaseio.com',
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error);
  }
}

export default admin.database();
