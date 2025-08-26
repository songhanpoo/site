---
title: How to Securely Persist User Data in Zustand with Encrypted Storage
description: Learn how to protect sensitive user data in your Zustand state management using a secure, encrypted storage solution. This tutorial demonstrates step-by-step how to integrate CryptoJS encryption with Zustand's persistence middleware for enhanced security.
publishedDate: November 23, 2024
poster: https://www.reversinglabs.com/hs-fs/hubfs/lock-down-appsec-secure-by-default.jpg?width=2800&height=1464&name=lock-down-appsec-secure-by-default.jpg
---

When building applications, ensuring the security of sensitive user data is crucial. If you're using Zustand for state management and need to persist user data, you might worry about storing this data in plain text. This guide shows you how to combine Zustand's **_persist_** middleware with encryption to securely store data in the browser using **_localStorage_**.

## Why Secure Storage Matters

Browsers localStorage is often used for client-side data persistence. However, data stored in localStorage is not encrypted, making it vulnerable to theft if a malicious actor gains access to the client device. By adding encryption, we can ensure that even if data is accessed, it remains unreadable without the decryption key.

In this guide, we'll:

- Set up a secure storage mechanism using CryptoJS.
- Integrate this mechanism with Zustand's persistence middleware.
- Protect sensitive user data like authentication details or personal preferences.

## Prerequisites

To follow along, you should:

- Have a basic understanding of Zustand and React.
- Have Node.js installed in your development environment.

## Setting Up Secure Storage

First, let's create a secure storage implementation using CryptoJS.

### Step 1: Install CryptoJS

Start by installing CryptoJS in your project:

```bash
npm install crypto-js
```

### Step 2: Implement Secure Storage

Create a utility to encrypt and decrypt data before saving it to **_localStorage_**. Here's how it works:

```ts
import CryptoJS from 'crypto-js';

const CRYPTO_KEY = 'your-secure-encryption-key'; // Use an environment variable in production!

export const secureStorage = {
	getItem: (name: string): string | null => {
		const data = localStorage.getItem(name);
		if (!data) return null;
		try {
			const decrypted = CryptoJS.AES.decrypt(data, CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
			return decrypted || null;
		} catch {
			return null;
		}
	},
	setItem: (name: string, value: string): void => {
		const encrypted = CryptoJS.AES.encrypt(value, CRYPTO_KEY).toString();
		localStorage.setItem(name, encrypted);
	},
	removeItem: (name: string): void => {
		localStorage.removeItem(name);
	}
};
```

This utility ensures that:

- Data is encrypted before being saved.
- Data is decrypted when retrieved.
- Invalid or corrupted data is safely ignored.

### Step 3: Create a Persisted Zustand Store

Define a Zustand store for managing user state and persist it using the secure storage we just created.

```ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { secureStorage } from '@/lib/secureStorage';

interface User {
	id: string;
	name: string;
	email: string;
}

interface UserState {
	user: User | null;
	setUser: (user: User | null) => void;
}

export const userStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user })
		}),
		{
			name: 'user-state',
			storage: createJSONStorage(() => secureStorage)
		}
	)
);
```

#### Key Features

persist Middleware: Zustand's persist middleware allows state to be automatically saved and restored.
Custom Storage: By using createJSONStorage with our secure storage, all persisted data is encrypted.

### Using the Store in Your App

You can now use the userStore in your components to securely manage and persist user data.

```ts
import { userStore } from "@/stores/userStore";

export const UserProfile = () => {
  const { user, setUser } = userStore();

  const handleLogout = () => {
    setUser(null); // Clears user data
  };

  return (
    <div>
      <h1>Welcome, {user?.name || "Guest"}</h1>
      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};
```

### Testing Your Implementation

1. Add user data to the store using setUser.
2. Inspect localStorage in the browser dev tools. You'll notice the data is stored as an encrypted string.
3. Refresh the page to verify that the state is restored correctly and securely.

### Conclusion

By combining Zustand with encrypted storage, we've created a secure and robust solution for persisting sensitive user data. This approach protects against potential data leaks while maintaining the simplicity and flexibility of Zustand.

Feel free to customize the encryption mechanism or extend the store to manage other types of sensitive data. For a production environment, remember to:

- Use environment variables for the encryption key.
- Regularly rotate keys for better security.

By following these best practices, you can ensure that your application's state management is both efficient and secure.
