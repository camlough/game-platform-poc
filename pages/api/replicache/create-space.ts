
import { createSpace } from "replicache-nextjs/lib/backend";
export const createReplicacheSpace = async (path: string) => {
    try {
        const space = await createSpace(path);
        return space;
    } catch(error: any) {
        console.error('Error creating space: ', error);
    }
}