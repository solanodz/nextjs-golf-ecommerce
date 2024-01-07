import dotenv from 'dotenv'
import path from 'path'
import type { InitOptions } from 'payload/config'
import payload, { Payload } from 'payload/dist'


dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET;


let cached = (global as any).payload
if(!cached) {
    cached = (global as any).payload = {
        client: null,
        promise:null,
    }
}

interface Args {
    initOptions?: Partial<InitOptions>

}

export const getPayloadClient = async ({
    initOptions,
  }: Args = {}): Promise<Payload | undefined> => {
    if (!PAYLOAD_SECRET) {
      throw new Error('PAYLOAD_SECRET is missing')
    }

    if(cached.client) {
        return cached.client
    }

    if(!cached.promise) {
        cached.promise =payload.init({
            secret: PAYLOAD_SECRET,
            local: initOptions?.express ? false : true,
            ...(initOptions || {}),
        })
        
        try {
            cached.client = await cached.promise
          } catch (e: unknown) {
            cached.promise = null
            throw e
          }

        return cached.client
    }
}