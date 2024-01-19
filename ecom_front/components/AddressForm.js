import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AddressForm({
  userid: existingUserid,
  fullname: existingFullName,
  email: existingEmail,
  phoneno: existingPhoneNo,
  streetaddress: existingStreetAddress,
  landmark: existingLandMark,
  village: existingVillage,
  district: existingDistrict,
  state: existingState,
  postalcode: existingPostalCode,
  country: existingCountry,
  shipingaddress: existingShippingAddress,
}) {
  const [userid, setUserId] = useState(existingUserid || "");
  const [fullname, setFullName] = useState(existingFullName || "");
  const [email, setEmail] = useState(existingEmail || "");
  const [phoneno, setPhoneNo] = useState(existingPhoneNo || "");
  const [streetaddress, setStreetAddress] = useState(
    existingStreetAddress || ""
  );
  const [landmark, setLandMark] = useState(existingLandMark || "");
  const [village, setVillage] = useState(existingVillage || "");
  const [district, setDistrict] = useState(existingDistrict || "");
  const [state, setState] = useState(existingState || "");
  const [postalcode, setPostalCode] = useState(existingPostalCode || "");
  const [country, setCountry] = useState(existingCountry || "");
  const [shipingaddress, setShippingAddress] = useState(
    existingShippingAddress || {}
  );

  const router = useRouter();
  const { data: session } = useSession();

  const { id } = router.query;

  async function saveAddress(ev) {
    ev.preventDefault();

    console.log("click");

    const pdata = {
      userid: session?.user?.id,
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
    };

    console.log(pdata);

    if (!id) {
      axios.post("/api/personalinfo", pdata).then((response) => {
        if (response.data) {
          console.log(response.data);
        }
      });
    } else {
      if (session?.user?.id == id) {
        axios.put("/api/personalinfo", pdata).then((response) => {
          if (response.data) {
            console.log(response.data);
          }
        });
      }
    }
  }

  return (
    <form onSubmit={saveAddress}>
      <div className="w-full max-w-4xl mx-auto p-4">
        <label className="block mb-2">
          Full Name:
          <input
            type="text"
            name="fullName"
            value={fullname}
            onChange={(ev) => setFullName(ev.target.value)}
            className="w-full border p-2 mt-1"
          />
        </label>

        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              Email:
              <input
                type="email"
                name="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              Mobile No:
              <input
                type="number"
                name="phoneno"
                value={phoneno}
                onChange={(ev) => setPhoneNo(ev.target.value)}
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
        </div>

        <label className="block mb-2">
          Street Address
          <input
            type="text"
            name="streetaddress"
            value={streetaddress}
            onChange={(ev) => setStreetAddress(ev.target.value)}
            className="w-full border p-2 mt-1"
          />
        </label>

        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              Landmark:
              <input
                type="text"
                name="landmark"
                value={landmark}
                onChange={(ev) => setLandMark(ev.target.value)}
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              Village :
              <input
                type="text"
                name="village"
                value={village}
                onChange={(ev) => setVillage(ev.target.value)}
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              District:
              <input
                type="text"
                name="district"
                value={district}
                onChange={(ev) => setDistrict(ev.target.value)}
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              State :
              <input
                type="text"
                name="state"
                value={state}
                onChange={(ev) => setState(ev.target.value)}
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              Country:
              <input
                type="text"
                name="country"
                value={country}
                onChange={(ev) => setCountry(ev.target.value)}
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              Postal Code :
              <input
                type="text"
                name="state"
                value={postalcode}
                onChange={(ev) => setPostalCode(ev.target.value)}
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
        </div>

        <div className="border-b-blue-900 border-b mt-5 mb-5"></div>
        <h2 className="text-xl font-bold mb-3 mt-3">Shipping Address</h2>

        <label className="block">
          Customer Name :
          <input
            type="text"
            name="customername"
            value={shipingaddress.customername || ""}
            onChange={(ev) =>
              setShippingAddress({
                ...shipingaddress,
                customername: ev.target.value,
              })
            }
            className="w-full border p-2 mt-1"
          />
        </label>

        <label className="block">
          Customer Email :
          <input
            type="email"
            name="customeremail"
            value={shipingaddress.customeremail || ""}
            onChange={(ev) =>
              setShippingAddress({
                ...shipingaddress,
                customeremail: ev.target.value,
              })
            }
            className="w-full border p-2 mt-1"
          />
        </label>

        <label className="block">
          Customer Mobile :
          <input
            type="number"
            name="customermobile"
            value={shipingaddress.customermobile || ""}
            onChange={(ev) =>
              setShippingAddress({
                ...shipingaddress,
                customermobile: ev.target.value,
              })
            }
            className="w-full border p-2 mt-1"
          />
        </label>

        <label className="block">
          Customer Address :
          <input
            type="text"
            name="customerstreetaddress"
            value={shipingaddress.customerstreetaddress || ""}
            onChange={(ev) =>
              setShippingAddress({
                ...shipingaddress,
                customerstreetaddress: ev.target.value,
              })
            }
            className="w-full border p-2 mt-1"
          />
        </label>

        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              Landmark:
              <input
                type="text"
                name="customerlandmark"
                value={shipingaddress.customerlandmark || ""}
                onChange={(ev) =>
                  setShippingAddress({
                    ...shipingaddress,
                    customerlandmark: ev.target.value,
                  })
                }
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              State :
              <input
                type="text"
                name="customerstate"
                value={shipingaddress.customerstate || ""}
                onChange={(ev) =>
                  setShippingAddress({
                    ...shipingaddress,
                    customerstate: ev.target.value,
                  })
                }
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              Country :
              <input
                type="text"
                name="customercountry"
                value={shipingaddress.customercountry || ""}
                onChange={(ev) =>
                  setShippingAddress({
                    ...shipingaddress,
                    customercountry: ev.target.value,
                  })
                }
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
          <div className="w-1/2 px-2 mb-2">
            <label className="block">
              Postal Code :
              <input
                type="text"
                name="customerpostalcode"
                value={shipingaddress.customerpostalcode || ""}
                onChange={(ev) =>
                  setShippingAddress({
                    ...shipingaddress,
                    customerpostalcode: ev.target.value,
                  })
                }
                className="w-full border p-2 mt-1"
              />
            </label>
          </div>
        </div>

        {/* Add shiping Address Logic they an object that has customername,customeremail,customermobile,
        customerstreetaddress,customerlandmark,customerstate,customercountry,customerpostalcode
        */}

        <button
          type="submit"
          className="py-3 px-6 rounded-md bg-indigo-600 text-white hover:bg-slate-900"
        >
          Save
        </button>
      </div>

      <div className="mb-5"></div>
    </form>
  );
}
