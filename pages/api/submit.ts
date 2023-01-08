import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { testimonial } from "@prisma/client";

type body = {
  name: string;
  testimonial: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<testimonial>
) {
  const body: body = req.body;
  const name = body.name;
  const testimonial = body.testimonial;

  const result = await prisma.testimonial.create({
    data: {
      name: name,
      testimonial: testimonial,
    },
  });

  res.status(200).json(result);
}
