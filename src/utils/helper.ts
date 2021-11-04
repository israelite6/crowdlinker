import { SALT_ROUND } from './../config/constant';

import * as bcrypt from 'bcrypt';

export const hash = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, SALT_ROUND);
  return hash;
};
export const hashMatch = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
