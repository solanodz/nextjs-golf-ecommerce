import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import logoBirdie from "../../public/logo-birdie.svg";
import Image from "next/image";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import { Span } from "next/dist/trace";
import Cart from "./Cart";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* TODO -> MOBILE NAVBAR */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Image className="h-14 w-14" src={logoBirdie} alt="Birdie" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-6">
                  {/* Boton de iniciar sesion */}
                  {user ? (
                    <p>
                      <UserAccountNav user={user} />
                    </p>
                  ) : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Iniciar Sesión
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {/* Boton de registrarse */}
                  {user ? (
                    <p></p>
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: "default" })}
                    >
                      Registrarse
                    </Link>
                  )}

                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  {/* Boton de carrito */}
                  <div className="ml-4 flow-root lg-ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
