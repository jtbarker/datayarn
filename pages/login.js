// pages/login.js

import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { elements } = event.target;

    // Add the Magic code here

    // Once we have the token from magic,
    // update our own database

    // const authRequest = await fetch()

    // if (authRequest.ok) {
    // We successfully logged in, our API
    // set authorization cookies and now we
    // can redirect to the dashboard!
    // router.push('/dashboard')
    // } else { /* handle errors */ }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input name="email" type="email" />
      <button>Log in</button>
    </form>
  );
}

// pages/login.js

const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { elements } = event.target;
  
    // the magic code
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY,
    ).auth.loginWithMagicLink({ email: elements.email.value });
  
    // Once we have the did from magic, login with our own API
    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` },
    });
  
    if (authRequest.ok) {
      // We successfully logged in, our API
      // set authorization cookies and now we
      // can redirect to the dashboard!
      router.push('/dashboard');
    } else {
      /* handle errors */
    }
  };
  
  // pages/api/login

import { Magic } from '@magic-sdk/admin';

let magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  // exchange the DID from Magic for some user data
  const did = magic.utils.parseAuthorizationHeader(req.headers.authorization);
  const user = await magic.users.getMetadataByToken(did);

  // Author a couple of cookies to persist a users session
  // TODO

  res.end();
};
