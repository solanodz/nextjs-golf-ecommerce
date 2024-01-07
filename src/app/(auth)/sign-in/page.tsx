"use client";

import Image from "next/image";
import logo from "../../../../public/logo-birdie.svg";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";

import { ZodError, z } from "zod";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter();

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (error) => {
      if (error.data?.code === "CONFLICT") {
        toast.error("El email ya está en uso");
        return;
      }

      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
        return;
      }

      toast.error("Algo salió mal, intenta de nuevo.");
    },

    onSuccess: ({ sentToEmail }) => {
      toast.success(
        `Cuenta creada exitosamente, se envió un email a ${sentToEmail} para verificar tu cuenta`
      );
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image src={logo} alt="" className="w-20 h-20" />
            <h1 className="text-2xl font-bold">Ingresa a tu cuenta</h1>
            <p>
              ¿No tienes una cuenta?
              <Link
                href="/sign-up"
                className={buttonVariants({
                  variant: "link",
                  className: "text-green-600 gap-x-2",
                })}
              >
                Ingresa aquí <FaArrowRightLong />
              </Link>
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    name="email"
                    placeholder="nombre@ejemplo.com"
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full py-2">
                  Ingresar
                </Button>
              </div>
            </form>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
