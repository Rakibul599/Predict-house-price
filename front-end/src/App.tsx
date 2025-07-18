import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import axios from "axios";

function App() {
  const [isloading, setLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<boolean>(false);
  type Benefits = {
    mainRoad: boolean;
    guestRoom: boolean;
    basement: boolean;
    hotWaterHeating: boolean;
    airConditioning: boolean;
  };

  type PropertyInfo = {
    area: number;
    bedrooms: number;
    bathrooms:number;
    stories: number;
    parking: number;
    benefits: Benefits;
  };
  const [formData, setFormData] = useState<PropertyInfo>({
    area: 500,
    bedrooms: 1,
    bathrooms:1,
    stories: 1,
    parking: 0,
    benefits: {
      mainRoad: false,
      guestRoom: false,
      basement: false,
      hotWaterHeating: false,
      airConditioning: false,
    },
  });
  const [Price,setPrice]=useState<number>(0);
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      benefits: {
        ...prev.benefits,
        [name]: checked,
      },
    }));
  };
   console.log(formData);
  async function handlePredictprice() {
    try {
      setLoading(true)
      const response = await axios.post("http://127.0.0.1:5000/predict_price", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setPrice(response.data.price)
      setLoading(false)
      setOutput(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="bg-[#f0f3f8] w-full h-[100vh] flex items-center justify-center ">
        <div className="bg-[#ffffff]  h-[98%] w-[90%] rounded-xl shadow-xl fixed">
          <div className="mt-1 ml-5 mr-5 mb-1">
            <div className="text-center">
              <h1 className="text-2xl font-bold pt-1">House Price Predictor</h1>
            </div>
            <div>
              <div>
                <p>Area (sqrt)</p>
                <input
                  type="range"
                  name="area"
                  min={100}
                  max={5000}
                  value={formData.area}
                  onChange={handleRangeChange}
                  id=""
                  className="w-full "
                />
                <p>{formData.area}</p>
              </div>
              <div>
                <p>Bedrooms</p>
                <input
                  type="range"
                  name="bedrooms"
                  min={1}
                  max={10}
                  value={formData.bedrooms}
                  onChange={handleRangeChange}
                  id=""
                  className="w-full "
                />
                <p>{formData.bedrooms}</p>
              </div>
              <div>
                <p>Bathrooms</p>
                <input
                  type="range"
                  name="bathrooms"
                  min={1}
                  max={10}
                  value={formData.bathrooms}
                  onChange={handleRangeChange}
                  id=""
                  className="w-full "
                />
                <p>{formData.bathrooms}</p>
              </div>
              <div>
                <p>Stories</p>
                <input
                  type="range"
                  name="stories"
                  min={1}
                  max={5}
                  value={formData.stories}
                  onChange={handleRangeChange}
                  id=""
                  className="w-full "
                />
                <p>{formData.stories}</p>
              </div>
              <div>
                <p>Parking Car</p>
                <input
                  type="range"
                  name="parking"
                  min={0}
                  max={5}
                  value={formData.parking}
                  onChange={handleRangeChange}
                  id=""
                  className="w-full "
                />
                <p>{formData.parking}</p>
              </div>
            </div>
            <div>
              <p className="font-bold">Benefits</p>
              <div className="grid grid-cols-2 ml-2 ">
                <div>
                  <input
                    type="checkbox"
                    name="mainRoad"
                    checked={formData.benefits.mainRoad}
                    onChange={handleCheckboxChange}
                    id=""
                  />{" "}
                  <label>Main Road</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="guestRoom"
                    checked={formData.benefits.guestRoom}
                    onChange={handleCheckboxChange}
                    id=""
                  />{" "}
                  <label>Guest Room</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="basement"
                    checked={formData.benefits.basement}
                    onChange={handleCheckboxChange}
                    id=""
                  />{" "}
                  <label>Basement</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="hotWaterHeating"
                    checked={formData.benefits.hotWaterHeating}
                    onChange={handleCheckboxChange}
                    id=""
                  />{" "}
                  <label>Hot Water Heating</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="airConditioning"
                    checked={formData.benefits.airConditioning}
                    onChange={handleCheckboxChange}
                    id=""
                  />{" "}
                  <label>Air Conditioning</label>
                </div>
              </div>
            </div>
            <div>
              <button onClick={handlePredictprice} className="w-full bg-[#4298e1] h-[35px] rounded-md mt-4">
                {isloading ? "Loading..." : "Predict Price"}
                
              </button>
            </div>
            <div className={`bg-[#e0f2fe] w-full h-[35px] flex items-center justify-center rounded-md font-bold mt-2 ${output ? "" :"hidden"}`}>
              <p>Predicted House Price: ${Price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
