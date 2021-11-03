import Joi from "joi";
import prisma from "../../../../lib/dbInstance";

const schema = Joi.object({
  duration: Joi.number(),
});

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "Invalid request." });
    }

    const { duration } = value;

    let event;

    try {
      event = await prisma.event.update({
        where: { id: req.params.id },
        data: { duration: duration },
      });
    } catch (err) {
      console.log("Impossible to log duration.", err);
      return res.status(500).json({ message: "Impossible to log duration." });
    }

    return res.status(200).json(event);
  }

  return res.status(422).json({ message: "Method not allowed" });
};

export default handler;
