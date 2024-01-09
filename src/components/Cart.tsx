"use client";

import { FaCartShopping } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { SeparatorVertical } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import CartItem from "./CartItem";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  const fee = 1;

  return (
    <Sheet>
      <SheetTrigger
        aria-hidden="true"
        className="group -m-2 flex items-center p-2"
      >
        <FaCartShopping className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-600 duration-100" />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Carrito</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/* TODO -> LOGICA DEL CARRITO */}
              Productos agregados
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Costos de envío</span>
                  {/* TODO -> HACER LOGICA DE ENVIO GRATIS O NO GRATIS */}
                  <span className="">Gratis</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaccion fee</span>
                  <span className="">{formatPrice(cartTotal + fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  {/* TODO -> LOGICA PARA CALCULAR PRECIO TOTAL */}
                  <span className="">{formatPrice(1)}</span>
                </div>
              </div>
              <SheetFooter>
                <Link
                  href="/cart"
                  className={buttonVariants({
                    className: "w-full",
                  })}
                >
                  Ir a pagar
                </Link>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex w-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-gray-400"
            >
              <Image src="/carrito.jpg" fill alt="Carrito vacio" />
            </div>
            <div className="text-xl font-semibold">Tu carrito esta vacío</div>
            <SheetTrigger asChild>
              <Link
                href="./products"
                className={buttonVariants({
                  variant: "link",
                  size: "lg",
                  className: "text-sm text-green-600",
                })}
              >
                Mira nuestros productos aquí
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
