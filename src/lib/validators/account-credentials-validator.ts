import { z } from "zod";


export const AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
      .max(32, { message: "La contraseña debe tener menos de 32 caracteres." }),
  });

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>;
