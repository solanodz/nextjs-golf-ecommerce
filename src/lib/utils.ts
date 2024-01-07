import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | String,
  options: { 
    currency?: "USD" | "ARS",
    notation?: Intl.NumberFormatOptions["notation"], 
  } = {}
) {
  const { currency = "ARS", notation = "compact" } = options
  
  const numericPrice = typeof price === "string" ? parseFloat(price) : Number(price)

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    notation: notation,
    minimumFractionDigits: 2,
  }).format(numericPrice)
}
