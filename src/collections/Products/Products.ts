import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    access: {},
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: () => false
            }
        },
        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            label: "Descripción del producto",
        },
        {
            name: "price",
            type: "number",
            min: 0,
            max: 100000000,
            label: "Precio en AR$",
            required: true,
        },
        {
            name: "category",
            type: "select",
            label: "Categoría",
            options: PRODUCT_CATEGORIES.map(
                ({label, value}) => ({label, value})
            ),
            required: true,
        },
        {
            name: "product_files",
            label: "Archivos del producto",
            type: "relationship",
            relationTo: "products_files",
            required: true,
            hasMany: false,
        },
        {
            name: "approvedForSale",
            label: "Estado del producto",
            type: "select",
            defaultValue: "pending",
            access: {
                read: () => true,
                create: ({req}) => req.user.role === "admin",
                update: ({req}) => req.user.role === "admin",
            },
            options: [
                {label: "Pendiente", value: "pending"},
                {label: "Aprobado", value: "approved"},
                {label: "Rechazado", value: "denied"},
            ]
        },
        {
            name: "priceId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "stripeId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "images",
            type: "array",
            label: "Imágenes",
            required: true,
            minRows: 1,
            maxRows: 10,
            labels: {
                singular: "Imagen",
                plural: "Imágenes",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                }
            ]
        },
    
    ]
}
