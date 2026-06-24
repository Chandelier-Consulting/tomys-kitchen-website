import "server-only";

import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function createAdminApp() {
  if (getApps().length) {
    return getApps()[0];
  }

  const inlineServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (inlineServiceAccount) {
    return initializeApp({
      credential: cert(JSON.parse(inlineServiceAccount)),
    });
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return initializeApp({
      credential: applicationDefault(),
    });
  }

  return null;
}

export function getAdminDb() {
  const app = createAdminApp();
  return app ? getFirestore(app) : null;
}

