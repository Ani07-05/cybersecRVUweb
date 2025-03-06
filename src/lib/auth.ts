import { hash, compare } from 'bcryptjs';

interface User {
  username: string;
  email: string;
  password: string;
}

export async function createUser({ username, email, password }: { 
  username: string, 
  email: string, 
  password: string 
}) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const existingUser = users.find((u: User) => u.email === email || u.username === username);
  
  if (existingUser) {
    return { error: 'User already exists' };
  }

  const hashedPassword = await hash(password, 12);
  users.push({ username, email, password: hashedPassword });
  localStorage.setItem('users', JSON.stringify(users));
  
  return { success: true };
}

export async function validateUser(email: string, password: string) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: User) => u.email === email);
  
  if (!user) {
    return null;
  }
  
  const isValid = await compare(password, user.password);
  if (!isValid) {
    return null;
  }
  
  return { username: user.username, email: user.email };
}
