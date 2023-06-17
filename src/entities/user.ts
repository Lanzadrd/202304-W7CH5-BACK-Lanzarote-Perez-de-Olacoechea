export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
  description: string;
  age: undefined;
  profilePicture: '';
  Enemies: User[];
  Friends: User[];
};

export type UserLogin = {
  user: string; // Equal to userName or email
  password: string;
};
