"use client";

import { trpc } from "@/trpc/client";
import Image from "next/image";
import Link from "next/link";
import { FiXCircle } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <FiXCircle className="text-red-500 w-16 h-16" />
        <h3 className="font-semibold text-xl">Ocurrio un error</h3>
        <p className="text-muted-foreground text-sm">
          El token ya no es valido o ha expirado. Por favor, intenta de nuevo.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/logo-birdie.svg" alt="logo Birdie" fill />
        </div>
        <h3 className="font-semibold text-xl text-green-600 m-2">
          Ya puedes comenzar a comprar
        </h3>

        <p className=" font-semibold text-muted-foreground text-center mt-1">
          Gracias por verificar tu email
        </p>
        <Link href="/sign-in" className={buttonVariants({ className: "mt-4" })}>
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <LuLoader2 className="animate-spin text-zinc-300 w-16 h-16" />
        <h3 className="font-semibold text-xl">Verificando...</h3>
        <p className="text-muted-foreground text-sm">
          Esto demorará unos segundos
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
