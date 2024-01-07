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

import { z } from "zod";
import { trpc } from "@/trpc/client";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({});

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image src={logo} alt="" className="w-20 h-20" />
            <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
            <p>
              ¿Ya tienes una cuenta?
              <Link
                href="/sign-in"
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
                </div>
                <Button type="submit" className="w-full py-2">
                  Crear cuenta
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
