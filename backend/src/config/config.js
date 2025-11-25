import dotenv from 'dotenv';

dotenv.config();

const {
  SUPABASE_URL,
  SUPABASE_API_KEY,
  DATABASE,
  SERVER_PORT,
  SERVER_HOST,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
} = process.env;

export const config = {
  SUPABASE_URL,
  SUPABASE_API_KEY,
  DATABASE,
  SERVER_PORT,
  SERVER_HOST,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
};
