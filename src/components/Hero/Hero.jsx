import React from "react";
import { Input } from "antd";

import { FaMapMarkerAlt, FaRegCalendar} from "react-icons/fa";

function Hero() {
  return (
    <div className=" bg-black/20 h-full">
      <div className="h-full flex justify-center items-center p-4 bg-primary/10">
        <div className="container grid grid-cols-1 gap-4">
          <div className="text-white">
            <p data-aos="fade-up" className="font-bold text-3xl mb-2">
              Bất kể bạn đi đâu, chúng tôi sẽ đưa bạn đến đó
            </p>
            <p data-aos="fade-up" data-aos-delay="300" className="text-xl mb-4">
              Phục vụ tận tâm, giá siêu ưu đãi
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="space-y-5 bg-white rounded-md p-7 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-40 py-3 items-center px-10">
              <div>
                <label
                  htmlFor="destination"
                  className="opacity-70 flex items-center text-xl"
                >
                  <FaMapMarkerAlt className="text-mainColor mr-2" />
                  Bạn muốn đi đâu?
                </label>
                <Input
                  type="text"
                  name="destination"
                  id="destination"
                  placeholder="Tìm tour..."
                  className="w-full  text-xl bg-gray-100 my-2 range accent-primary focus:outline-primary focus:outline outline-1 p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className="opacity-70 flex items-center text-xl"
                >
                  <FaRegCalendar className="text-mainColor mr-2" />
                  Ngày khởi hành
                </label>
                <input
                  type="date"
                  name="destination"
                  id="destination"
                  className="rounded-lg w-full text-xl !placeholder-slate-400 bg-gray-100 my-2 focus:outline-primary focus:outline outline-1 p-2"
                />
              </div>
            </div>
            <button className=" text-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-6 py-4 rounded-full duration-200 absolute -bottom-8 left-1/2 -translate-x-1/2">
              TÌM KIẾM TOUR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
