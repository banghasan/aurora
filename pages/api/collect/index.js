import Joi from "joi";
import NextCors from "nextjs-cors";
import db from "../../../lib/db";
import prisma from "../../../lib/dbInstance";
import { parse } from "../../../utils/ua";
import { tag } from "../../../utils/locale";
import { formatEvent } from "../../../utils/responses";

const schema = Joi.object({
  type: Joi.string(),
  element: Joi.string().required(),
  wid: Joi.string().required(),
  language: Joi.string(),
  referrer: Joi.string().allow(""),

  // Currently not used
  uid: Joi.string(),
  isNewVisitor: Joi.boolean(),
  isNewSession: Joi.boolean(),
  lastVisitAt: Joi.number(),
  expires: Joi.number(),
}).unknown(true);

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["PUT", "POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === "POST") {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "Invalid request." });
    }

    const website = await db.getWebsiteById(value.wid);

    if (!website) {
      return res.status(404).json({ message: "Website not found." });
    }

    const ua = parse(req.headers["user-agent"]);
    const locale = tag(value.language);

    const metadata = [];
    for (const index in ua.elements) {
      const element = ua.elements[index];

      let meta = await prisma.metadata.findFirst({
        where: { ...element },
      });

      if (!meta) {
        meta = await prisma.metadata.create({
          data: { ...element },
        });
      }

      metadata.push(meta);
    }

    // Create Event
    const event = await prisma.event.create({
      data: {
        type: value.type,
        element: value.element,
        referrer: value.referrer,
        device: ua.device,
        locale: locale?.tag, // can be null
        website_id: website.id,
        metadata: {
          connect: metadata.map((meta) => ({ id: meta.id })),
        },
      },
      include: {
        metadata: true,
      },
    });

    return res.json(formatEvent(event));
  }

  return res.status(422).json({ message: "Method not allowed" });
};

export default handler;
