import { z } from 'zod';

import { MESSAGE_TYPE_EMAIL } from './errors';

export const emailSchema = z
  .string()
  .regex(
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,})(\]?)$/,
    MESSAGE_TYPE_EMAIL
  );
