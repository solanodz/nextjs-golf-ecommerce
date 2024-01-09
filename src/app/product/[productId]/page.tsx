import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

interface PageProps {
  params: {
    productId: string;
  };
}

const BREADCRUMPS = [
  { id: 1, name: "home", href: "/" },
  { id: 2, name: "products", href: "/products" },
];

const Page = ({ params }: PageProps) => {
  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Detalles de productos aca abajo */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMPS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
