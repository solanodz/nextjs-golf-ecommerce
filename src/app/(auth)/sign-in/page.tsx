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
import { useRouter, useSearchParams } from "next/navigation";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      toast.success("Iniciaste sesión correctamente");

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Credenciales inválidas");
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image src={logo} alt="" className="w-20 h-20" />
            <h1 className="text-2xl font-bold">
              Ingresa a tu cuenta {isSeller ? "de vendedor" : "de cliente"}
            </h1>
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
            {isSeller ? (
              <Button
                onClick={continueAsBuyer}
                variant="secondary"
                disabled={isLoading}
              >
                Continuar como comprador
              </Button>
            ) : (
              <Button
                onClick={continueAsSeller}
                variant="secondary"
                disabled={isLoading}
              >
                Continuar como vendedor
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
