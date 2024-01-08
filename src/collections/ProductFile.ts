import { User } from '../payload-types'
import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { Access, CollectionConfig } from 'payload/types'

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null
  return { ...data, user: user?.id }
}

const yourOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null

  if (user?.role === 'admin') return true
  if (!user) return false

  const { docs: products } = await req.payload.find({
    collection: 'products',
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  })

  const ownProductFileIds = products
    .map((prod) => prod.product_files)
    .flat()

  const { docs: orders } = await req.payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  })

  const purchasedProductFileIds = orders
    .map((order) => {
      return order.products.map((product) => {
        if (typeof product === 'string')
          return req.payload.logger.error(
            'La profundidad de la busqueda no es suficiente para encontrar el ID del archivo del producto'
          )

        return typeof product.product_files === 'string'
          ? product.product_files
          : product.product_files.id
      })
    })
    .filter(Boolean)
    .flat()

  return {
    id: {
      in: [
        ...ownProductFileIds,
        ...purchasedProductFileIds,
      ],
    },
  }
}


export const ProductFiles: CollectionConfig = {
    slug: 'products_files',
    admin: {
        hidden: ({user}) => user.role !== 'admin',
    },
    hooks: {
        beforeChange: [addUser],
    },
    access: {
        read: yourOwnAndPurchased,
    },
    upload: {
        staticURL: '/product_files',
        staticDir: 'product_files',
        mimeTypes: ["image/*", "font/*", "application/postscript", "application/pdf", "application/zip", "application/x-zip-compressed", "application/x-rar-compressed", "application/x-7z-compressed", "application/x-tar", "application/x-gzip", "application/x-bzip2", "application/x-apple-diskimage", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.oasis.opendocument.text", "application/vnd.oasis.opendocument.spreadsheet", "application/vnd.oasis.opendocument.presentation", "application/vnd.oasis.opendocument.graphics", "application/vnd.oasis.opendocument.chart", "application/vnd.oasis.opendocument.database", "application/vnd.oasis.opendocument.formula", "application/vnd.oasis.opendocument.image", "application/vnd.oasis.opendocument.text-master"],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            admin: {
                condition: () => false,
            },
            hasMany: false,
            required: true,
        }
    ]
}

