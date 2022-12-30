import { NextApiRequest, NextApiResponse } from "next";
import { handleRequest } from "replicache-nextjs/lib/backend";
import { mutators } from "../../../utils/mutators";

const ReplicacheRequestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await handleRequest(req, res, mutators);
};

export default ReplicacheRequestHandler
