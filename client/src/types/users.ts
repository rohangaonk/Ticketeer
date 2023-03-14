export type FetchedUser = {
  name: string;
  email: string;
  id: string;
};

export type FetchedUsersResponse = {
  users: [FetchedUser];
};
