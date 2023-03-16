import admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)

if(!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

const adminDb = admin.firestore();

export { adminDb }

// THIS FILE ALLOWS US TO MAKE ADMIN CALLS FROM OUR BACKEND TO MANIPULATE THE DATABASE WITHOUT THE NEED FOR ANY SPECIAL PERMISSIONS, BECAUSE WE'RE USING THE ADMIN SERVICE ACC KEY
