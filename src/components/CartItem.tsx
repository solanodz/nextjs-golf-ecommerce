import { Product } from "@/payload-types";
import Image from "next/image";
import { FaImage } from "react-icons/fa6";

const CartItem = ({ product }: { product: Product }) => {
  const { image } = product.images[0];

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image.url ? (
              <Image
                className="object-cover absolute"
                src={image.url}
                alt={product.name}
                layout="fill"
              />
            ) : (
              <div className="flex h-full items-cetner justify-center bg-secondary">
                <FaImage
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
