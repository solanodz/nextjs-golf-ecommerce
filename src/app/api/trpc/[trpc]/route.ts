import { appRouter } from '@/trpc';
import {fetchRequestHandler} from '@trpc/server/adapters/fetch';

const handler = (req: Request) => {
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        // Error esperado. context ya pasó por el middleware de express
        createContext: () => ({}) 
    })
}

export {handler as GET, handler as POST}