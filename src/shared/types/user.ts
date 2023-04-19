export type UserType = {
  auth_date: number;
  first_name: string;
  hash: string;
  id: number;
  last_name: string;
  photo_url: string;
  username: string;
};

export type LoginResponseType = {
  access: string;
  refresh: string;
};

export type UserMeType = {
  id: string;
  telegram_id: number;
  username: string;
  role: string;
};
