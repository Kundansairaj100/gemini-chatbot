import { PrismaClient } from "@prisma/client"
import { NextApiRequest,NextApiResponse } from "next";
const prisma = new PrismaClient();


export default async function handler(req: NextApiRequest,res: NextApiResponse)
{
    const username = req.body.username;
    const password = req.body.password;
    if(req.method=='POST')
    {
        const resp = await prisma.user.create({
            data: {
                username,
                password
            }
        });
        if (resp)
        {
            res.status(200).json({message:"User has been created"});
            
        }
    }
}


