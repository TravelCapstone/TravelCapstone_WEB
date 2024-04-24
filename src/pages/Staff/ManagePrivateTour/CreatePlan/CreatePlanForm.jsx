import { AutoComplete } from "antd";
import { useState } from "react";

const CreatePlanForm = () => {
  return (
    <>
      <h3 className="font-bold text-mainColor text-xl text-center">
        TẠO KẾ HOẠCH TOUR CHI TIẾT
      </h3>
      <div className=" p-12 shadow-xl rounded-xl ">
        <div className="flex items-center">
          <h5 className="font-semibold">Phân loại: </h5>
          <span className="font-medium text-14 mx-2">Gói cơ bản</span>
        </div>
        <div>
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            LỰA CHỌN DỊCH VỤ THEO YÊU CẦU
          </h2>
          <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              Nơi lưu trú:
            </h3>
            <div>
              <div>
                <div className="flex">
                  <span className="w-1/12">1</span>

                  <div className="flex flex-col justify-between w-11/12">
                    <div className="flex justify-between">
                      <div className="flex justify-between w6/12">
                        <strong>Khu vực: </strong>
                        <div className="mx-2">Hà Giang - TP Hà Giang</div>
                      </div>
                      <div className="w6/12">
                        <strong>Ngày lưu trú: </strong>
                        <span className="mx-2">27/04/2024 - 30/1/2024</span>
                      </div>
                    </div>
                    <div className="flex">
                      <p className="font-medium my-3">Loại hình lưu trú</p>
                    </div>
                    <div>
                      <div>
                        <div className="flex justify-between">
                          <p>
                            <strong>Khách sạn - khách sạn 1 sao</strong> 800.000
                            - 1.000.000 đ/ người
                          </p>
                          <p>Số lượng ngày/đêm: 2</p>
                        </div>
                        <div className="flex my-4">
                          <p className="w-3/12">Chọn khách sạn</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1
                              phòng
                            </option>
                          </select>
                        </div>
                        <div className="flex justify-between">
                          <p>
                            <strong>Khách sạn - khách sạn 1 sao</strong> 800.000
                            - 1.000.000 đ/ người
                          </p>
                          <p>Số lượng ngày/đêm: 2</p>
                        </div>
                        <div className="flex my-4">
                          <p className="w-3/12">Chọn khách sạn</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1
                              phòng
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <span className="w-1/12">2</span>

                  <div className="flex flex-col justify-between w-11/12">
                    <div className="flex justify-between">
                      <div className="flex justify-between w6/12">
                        <strong>Khu vực: </strong>
                        <div className="mx-2">Phú Thọ -TP Việt Trì</div>
                      </div>
                      <div className="w6/12">
                        <strong>Ngày lưu trú: </strong>
                        <span className="mx-2">27/04/2024 - 30/1/2024</span>
                      </div>
                    </div>
                    <div className="flex">
                      <p className="font-medium my-3">Loại hình lưu trú</p>
                    </div>
                    <div>
                      <div>
                        <div className="flex justify-between">
                          <p>
                            <strong>Khách sạn - khách sạn 1 sao</strong> 800.000
                            - 1.000.000 đ/ người
                          </p>
                          <p>Số lượng ngày/đêm: 2</p>
                        </div>
                        <div className="flex my-4">
                          <p className="w-3/12">Chọn khách sạn</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1
                              phòng
                            </option>
                          </select>
                        </div>
                        <div className="flex justify-between">
                          <p>
                            <strong>Khách sạn - khách sạn 1 sao</strong> 800.000
                            - 1.000.000 đ/ người
                          </p>
                          <p>Số lượng ngày/đêm: 2</p>
                        </div>
                        <div className="flex my-4">
                          <p className="w-3/12">Chọn khách sạn</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1
                              phòng
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              Dịch vụ ăn uống:
            </h3>
            <div>
              <div>
                <div className="flex">
                  <span className="w-1/12">1</span>

                  <div className="flex flex-col justify-between w-11/12">
                    <div className="flex justify-between">
                      <div className="flex justify-between w6/12">
                        <strong>Khu vực: </strong>
                        <div className="mx-2">Hà Giang - TP Hà Giang</div>
                      </div>
                      <div className="w6/12">
                        <strong>Ngày lưu trú: </strong>
                        <span className="mx-2">27/04/2024 - 30/1/2024</span>
                      </div>
                    </div>
                    <div className="flex">
                      <p className="font-medium my-3">Loại hình lưu trú</p>
                    </div>
                    <div>
                      <div>
                        <div className="flex justify-between">
                          <p>
                            <strong>Khách sạn - khách sạn 1 sao</strong> 800.000
                            - 1.000.000 đ/ người
                          </p>
                          <p>Số lượng ngày/đêm: 2</p>
                        </div>
                        <div className="flex my-4">
                          <p className="w-3/12">Chọn khách sạn</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1
                              phòng
                            </option>
                          </select>
                        </div>
                        <div className="flex justify-between">
                          <p>
                            <strong>Khách sạn - khách sạn 1 sao</strong> 800.000
                            - 1.000.000 đ/ người
                          </p>
                          <p>Số lượng ngày/đêm: 2</p>
                        </div>
                        <div className="flex my-4">
                          <p className="w-3/12">Chọn khách sạn</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1
                              phòng
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <span className="w-1/12">2</span>

                  <div className="flex flex-col justify-between w-11/12">
                    <div className="flex justify-between">
                      <div className="flex justify-between w6/12">
                        <strong>Khu vực: </strong>
                        <div className="mx-2">Phú Thọ -TP Việt Trì</div>
                      </div>
                      <div className="w6/12">
                        <strong>Ngày lưu trú: </strong>
                        <span className="mx-2">27/04/2024 - 30/1/2024</span>
                      </div>
                    </div>
                    <div className="flex">
                      <p className="font-medium my-3">Loại hình lưu trú</p>
                    </div>
                    <div>
                      <div>
                        <div className="flex justify-between">
                          <p>
                            <strong>Khách sạn - khách sạn 1 sao</strong> 800.000
                            - 1.000.000 đ/ người
                          </p>
                          <p>Số lượng ngày/đêm: 2</p>
                        </div>
                        <div className="flex my-4">
                          <p className="w-3/12">Chọn khách sạn</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1
                              phòng
                            </option>
                          </select>
                        </div>
                        <div className="flex justify-between">
                          <p>
                            <strong>Khách sạn - khách sạn 1 sao</strong> 800.000
                            - 1.000.000 đ/ người
                          </p>
                          <p>Số lượng ngày/đêm: 2</p>
                        </div>
                        <div className="flex my-4">
                          <p className="w-3/12">Chọn khách sạn</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1
                              phòng
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              Phương tiện di chuyển:
            </h3>
            <div>
              <div>
                <p>
                  Địa điểm đón khách: <strong>TP. HCM</strong>
                </p>
                <div className="flex">
                  <span className="w-1/12">1</span>

                  <div className="flex flex-col justify-between w-11/12">
                    <div className="flex justify-between">
                      <div className="flex justify-between w6/12">
                        <strong>Khu vực: </strong>
                        <div className="mx-2">Hà Giang - TP Hà Giang</div>
                      </div>
                      <div className="w6/12">
                        <strong>Ngày đi: </strong>
                        <span className="mx-2">27/04/2024 - 30/1/2024</span>
                      </div>
                    </div>
                    <div className="flex my-3">
                      <p className="font-medium ">
                        Phương tiện di chuyển từ <strong>TP HCM</strong> đến{" "}
                        <strong>Hà Giang</strong>
                      </p>
                      <p className="mx-2">Máy bay : 1.400.000đ - 1.700.000đ</p>
                    </div>
                    <div>
                      <div>
                        <div className="flex my-4">
                          <p className="w-3/12">Chọn hãng máy bay</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">VietnamAirline</option>
                          </select>
                        </div>

                        <div className="flex my-4">
                          <p className="w-3/12">Chọn chuyến máy bay</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1
                              phòng
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <span className="w-1/12">1</span>

                  <div className="flex flex-col justify-between w-11/12">
                    <div className="flex justify-between">
                      <div className="flex justify-between w6/12">
                        <strong>Khu vực: </strong>
                        <div className="mx-2">Hà Giang - TP Hà Giang</div>
                      </div>
                      <div className="w6/12">
                        <strong>Ngày đi: </strong>
                        <span className="mx-2">27/04/2024 - 30/1/2024</span>
                      </div>
                    </div>
                    <div className="flex my-3">
                      <p className="font-medium ">
                        Phương tiện di chuyển từ <strong>TP HCM</strong> đến{" "}
                        <strong>Hà Giang</strong>
                      </p>
                      <p className="mx-2">Máy bay : 1.400.000đ - 1.700.000đ</p>
                    </div>
                    <div>
                      <div>
                        <div className="flex my-4">
                          <p className="w-3/12">Chọn hãng máy bay</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">VietnamAirline</option>
                          </select>
                        </div>

                        <div className="flex my-4">
                          <p className="w-3/12">Chọn chuyến máy bay</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1
                              phòng
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              Phương tiện di chuyển trong tỉnh:
            </h3>
            <div>
              <div>
                <div className="flex">
                  <span className="w-1/12">1</span>

                  <div className="flex flex-col justify-between w-11/12">
                    <div className="flex justify-between">
                      <div className="flex justify-between w6/12">
                        <strong>Khu vực: </strong>
                        <div className="mx-2">Hà Giang - TP Hà Giang</div>
                      </div>
                      <div className="w6/12">
                        <strong>Số lượng xe </strong>
                        <span className="mx-2">1</span>
                      </div>
                    </div>
                    <div className="flex my-4">
                      <p className="w-3/12">Ngày di chuyển</p>
                      <div className="flex">
                        <input type="date" />
                        -
                        <input type="date" className="mx-2" />
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="flex my-4">
                          <p className="w-3/12">Nhà cung cấp xe</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">Mon</option>
                          </select>
                        </div>

                        <div className="flex my-4">
                          <p className="w-3/12">Chọn tài xế</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Phạm Bùi Minh Khang SĐT: 0336678864 - Tiền công:
                              1.000.000/ngày
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              Giải trí- điểm du lịch
            </h3>
            <div>
              <div>
                <div className="flex">
                  <span className="w-1/12">1</span>

                  <div className="flex flex-col justify-between w-11/12">
                    <div className="flex justify-between">
                      <div className="flex justify-between w6/12">
                        <strong>Hà Giang </strong>
                        <div className="mx-2">
                          Gía vé trung bình: 20.000đ - 180.000đ/vé
                        </div>
                      </div>
                      <div className="w6/12">
                        <strong>Số lượng địa điểm du lịch </strong>
                        <input
                          type="number"
                          value={2}
                          className="input input-bordered w-16 mx-2"
                        ></input>
                      </div>
                    </div>
                    <div className="flex my-4">
                      <p className="w-3/12">Chọn khu du lịch</p>
                      <div className="w-9/12">
                        <select
                          name=""
                          id=""
                          className="w-full select select-bordered mb-3"
                        ></select>
                        <div className="flex flex-col">
                          <div className="flex justify-between px-10">
                            <span>Dịch vụ vua mèo</span>
                            <span>Gía vé tham quan: 30.000đ</span>
                          </div>
                          <div className="flex justify-between px-10">
                            <span>Dịch vụ vua mèo</span>
                            <span>Gía vé tham quan: 30.000đ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //TẠO KẾ HOẠCH CHI TIẾT CHO TOUR */}
        <div className="my-16">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            TẠO KẾ HOẠCH CHI TIẾT CHO TOUR
          </h2>
          <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              LỊCH TRÌNH CƠ BẢN
            </h3>
            <div className="flex items-center justify-evenly mt-16">
              <div className="flex flex-col">
                <select name="" id="" className="select select-bordered">
                  <option value="">TP. Hồ Chí Minh</option>
                </select>
                <div className="flex items-center">
                  <div className="flex items-end">
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-map-pin text-4xl text-center"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                  </div>
                </div>
                <input type="date" />
              </div>
              <div className="flex flex-col">
                <select name="" id="" className="select select-bordered">
                  <option value="">TP. Hồ Chí Minh</option>
                </select>
                <div className="flex items-center">
                  <div className="flex items-end">
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-map-pin text-4xl text-center"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                  </div>
                </div>
                <input type="date" />
              </div>
              <div className="flex flex-col">
                <select name="" id="" className="select select-bordered">
                  <option value="">TP. Hồ Chí Minh</option>
                </select>
                <div className="flex items-center">
                  <div className="flex items-end">
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-map-pin text-4xl text-center"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                  </div>
                </div>
                <input type="date" />
              </div>
              <div className="flex flex-col">
                <select name="" id="" className="select select-bordered">
                  <option value="">TP. Hồ Chí Minh</option>
                </select>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-map-pin text-4xl text-center"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                  </div>
                </div>
                <input type="date" />
              </div>
            </div>
            <button className="btn bg-mainColor text-white rounded-lg mt-4">
              Thêm mốc thời gian
            </button>
          </div>
        </div>
        {/* LỊCH TRÌNH TỪNG THỜI GIAN */}
        <div className="my-16">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            LỊCH TRÌNH TỪNG THỜI GIAN
          </h2>
          <div className="flex justify-center item-center flex-col">
            <div className="flex flex-col">
              <div className="flex item-center">
                <div className=" bg-red-600 text-white w-12 h-12 text-center flex justify-center items-center">
                  <span className="font-bold">01</span>
                </div>

                <div className="flex items-center">
                  <span className="mx-2 font-bold">Giai đoạn 1</span>

                  <p className="mx-5 font-bold">Từ ngày</p>
                  <input type="date" />
                </div>
                <div className="flex items-center">
                  <p className="mx-5 font-bold">Đến ngày</p>
                  <input type="date" />
                </div>
              </div>
              <div className="px-14 py-6 ">
                <label className="input input-bordered flex items-center ">
                  <input type="text" className="grow" placeholder="Tiên đề" />
                </label>
              </div>
              <div className="flex flex-col mx-16">
                <div className="flex justify-around">
                  <p className="block font-bold">Thời gian</p>
                  <p className="block m-18 font-bold">
                    Nội dung từng thời gian
                  </p>
                </div>
                <div className="flex justify-around my-2">
                  <input type="date" />
                  <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" />
                  </label>
                </div>
                <div className="flex justify-around my-2">
                  <input type="date" />
                  <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex item-center">
                <div className=" bg-red-600 text-white w-12 h-12 text-center flex justify-center items-center">
                  <span className="font-bold">02</span>
                </div>

                <div className="flex items-center">
                  <span className="mx-2 font-bold">Giai đoạn 2</span>

                  <p className="mx-5 font-bold">Từ ngày</p>
                  <input type="date" />
                </div>
                <div className="flex items-center">
                  <p className="mx-5 font-bold">Đến ngày</p>
                  <input type="date" />
                </div>
              </div>
              <div className="px-14 py-6 ">
                <label className="input input-bordered flex items-center ">
                  <input type="text" className="grow" placeholder="Tiên đề" />
                </label>
              </div>
              <div className="flex flex-col mx-16">
                <div className="flex justify-around">
                  <p className="block font-bold">Thời gian</p>
                  <p className="block m-18 font-bold">
                    Nội dung từng thời gian
                  </p>
                </div>
                <div className="flex justify-around my-2">
                  <input type="date" />
                  <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" />
                  </label>
                </div>
                <div className="flex justify-around my-2">
                  <input type="date" />
                  <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button className="btn bg-mainColor w46 text-white rounded-lg mt-4">
            Thêm mốc thời gian
          </button>
        </div>

        {/* THÔNG TIN HƯỚNG DẪN VIÊN */}
        <div className="my-16">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            THÔNG TIN HƯỚNG DẪN VIÊN
          </h2>
          <div className="flex justify-center item-center flex-col">
            <div className="flex flex-col">
              <div className="flex flex-col justify-evenly item-center">
                <div className="flex items-center justify-evenly">
                  <span className="m-6 font-bold">Tên hướng dẫn viên</span>

                  <p className="mx-5 font-bold">Nơi hướng dẫn du lịch</p>
                </div>
                <div className="flex items-center">
                  <select
                    name=""
                    className="select select-bordered w-6/12"
                    id=""
                  >
                    <option value="">
                      Nguyễn Văn A SĐT: .... Tiền công: 500.000/ngày
                    </option>
                  </select>
                  <select
                    name=""
                    className="select select-bordered w-5/12 mx-4"
                    id=""
                  >
                    <option value="">Lâm Đồng</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button className="btn bg-mainColor w46 text-white rounded-lg mt-4">
            Thêm hướng dẫn viên
          </button>
        </div>

        <div className="my-16">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            NHỮNG DỤNG CỤ CẦN THIẾT MANG THEO TOUR
          </h2>
          <div className="overflow-x-auto my-10 w-200 rounded-md shadow-md">
            <table className="table table-xs">
              <thead className="bg-mainColor text-white h-14">
                <tr>
                  <th></th>
                  <th>Tên dụng cụ</th>
                  <th>Mức độ cần thiết</th>
                  <th>Đơn vị</th>
                  <th>Số lượng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Đi máy bay tầm 3 tỷ đến 5 tỷ</td>
                  <td>Đi lamboghini</td>
                  <td>Nhìu tiền á</td>
                  <td>1</td>
                  <td className="flex">
                    <div className="flex">
                      <button className="">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                      <button className="mx-2">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreatePlanForm;
