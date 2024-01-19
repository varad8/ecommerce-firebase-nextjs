import { Address } from "@/lib/models/Address";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method == "GET") {
    if (req.query?.userid) {
      res.json(await Address.findOne({ userid: req.query.userid }));
    }
  }

  if (method == "POST") {
    console.log(req.body);
    const {
      userid,
      fullname,
      email,
      phoneno,
      streetaddress,
      landmark,
      village,
      district,
      state,
      postalcode,
      country,
      shipingaddress,
    } = req.body;

    const personalInfo = await Address.create({
      userid,
      fullname,
      email,
      phoneno,
      streetaddress,
      landmark,
      village,
      district,
      state,
      postalcode,
      country,
      shipingaddress,
    });

    res.json(personalInfo);
  }

  if (method == "PUT") {
    const {
      userid,
      fullname,
      email,
      phoneno,
      streetaddress,
      landmark,
      village,
      district,
      state,
      postalcode,
      country,
      shippingaddress,
    } = req.body;

    await Address.updateOne(
      { userid },
      {
        fullname,
        email,
        phoneno,
        streetaddress,
        landmark,
        village,
        district,
        state,
        postalcode,
        country,
        shippingaddress,
      }
    );
    res.json(true);
  }
}
