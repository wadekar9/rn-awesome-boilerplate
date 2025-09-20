import { z } from 'zod';

const signInValidatorSchema = z.object({
    email: z.string().nonempty({ message: 'Please enter email address.' }),
    password: z.string().nonempty({ message: 'Please enter password.' }).min(8, 'Password must be at least 8 characters long.'),
});


type signInValidatorSchemaType = z.infer<typeof signInValidatorSchema>;
export { signInValidatorSchema, type signInValidatorSchemaType };
