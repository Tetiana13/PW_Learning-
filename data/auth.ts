import 'dotenv/config';

const userEmail = process.env.EMAIL;
if (!userEmail) {
  throw new Error('EMAIL environment variable is required');
}

export const users = {
   customer_1: {
    login: userEmail,
    password: process.env.PASSWORD as string,

    //login: 'kasyatest@mailinator.com',
    //password: 'Mypass_12345',
  },
};