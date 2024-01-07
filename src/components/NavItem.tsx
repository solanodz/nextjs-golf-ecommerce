import { type } from "os";
import { Button } from "./ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { FaChevronDown } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({ isAnyOpen, category, handleOpen, isOpen }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <FaChevronDown
            className={cn("h-4 w-4 transition-all text-gray-500", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          className={cn("absolute inset-x-0 top-full text-gray-500", {
            "animate-in fade-in-10 slide-in-from-top": !isAnyOpen,
          })}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow-xl"
            aria-hidden="true"
          />

          <div className="relative bg-white">
            <div className="mx-auto max-w-7xl px-8 py-6">
              <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8 gap-y-6">
                {category.featured.map((item) => (
                  <div
                    key={item.name}
                    className="group relative text-base sm:text-sm"
                  >
                    {/* <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                      <Image
                        src={item.imagesrc}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover object-center"
                      />
                    </div> */}
                    <Link
                      href={item.href}
                      className="mt-6 block font-medium text-gray-900"
                    >
                      {item.name}

                      <p
                        className="mt-1 text-sm text-gray-500"
                        aria-hidden="true"
                      >
                        Ver productos
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
