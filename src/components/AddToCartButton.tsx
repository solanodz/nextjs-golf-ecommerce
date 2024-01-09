"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess
        ? "Producto agregado al carrito exitosamente"
        : "Agregar al carrito"}
    </Button>
  );
};

export default AddToCartButton;
