import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  FaArrowRightArrowLeft,
  FaCreditCard,
  FaTruckArrowRight,
} from "react-icons/fa6";
import Link from "next/link";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

const perks = [
  {
    name: "Envíos gratis",
    description:
      "Si tu compra es mayor a $150.000 o si sos de Tucumán el envío es gratis. Además, podes retirar tu compra en nuestro local.",
    Icon: <FaTruckArrowRight />,
  },
  {
    name: "Pagá en cuotas",
    description:
      "Podes pagar con débito o crédito hasta 12 cuotas sin interés en produyctos seleccionados. Además, podes pagar en efectivo en nuestro local.",
    Icon: <FaCreditCard />,
  },
  {
    name: "90 días de devolución",
    description:
      "Si no estas conforme con tu compra o si vino con alguna falla, tenes hasta 90 dias para devolverla. No te preocupes, nosotros nos hacemos cargo.",
    Icon: <FaArrowRightArrowLeft />,
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            El pro-shop de golf mas completo{" "}
            <span className="text-green-600">del país</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-gray-600">
            Bienvenido a Birdie Golfshop. Acá encontras los mejores productos de
            golf del mercado. Productos importados de primera calidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/productos" className={buttonVariants()}>
              Productos Preferidos
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>

        {/* TODO -> LISTAR PRODUCTOS */}
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => {
              return (
                <div
                  key={perk.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className=",d:flex-shrink-0 flex justify-center">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-green-900 text-2xl">
                      {perk.Icon && perk.Icon}
                    </div>
                  </div>

                  <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      {perk.name}
                    </h3>
                    <p className="mt-3 text-sm text-gray-500">
                      {perk.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
