import React from "react";

function Footer() {
  return (
    <div className="mt-4 p-2 rounded-md border-t-2 container mx-auto">
      <div className="flex flex-col md:flex md:flex-row">
        <div className="px-5">
          <div className="flex items-center gap-2 mb-5">
            <h1 className="text-2xl font-bold text-primary">Cóc Travel</h1>
          </div>
          <p className="opacity-50 mb-5">
            "Vi vu trên những con đường mới, khám phá những điều mới lạ, trải
            nghiệm những cảm xúc mới lạ. Hãy để Cóc Travel cùng bạn khám phá thế
            giới."
          </p>
        </div>
        <div className="px-5 ">
          <h2 className="text-xl mb-5 text-primary font-bold">Về chúng tôi</h2>
          <ul className="opacity-50">
            <li className="mb-2">
              <a href="https://www.facebook.com/modareinvented">Facebook</a>
            </li>
            <li className="mb-2">Tiktok</li>
          </ul>
        </div>
        <div className="px-5 ">
          <h2 className="text-xl mb-5 text-primary font-bold">
            Dịch vụ chăm sóc khách hàng
          </h2>
          <ul className="opacity-50">
            <li className="mb-2">Trung tâm bảo hành</li>
            <li className="mb-2">Chính sách</li>
          </ul>
        </div>
        <div className="px-5 ">
          <h2 className="text-xl mb-5 text-primary font-bold">Liên hệ</h2>
          <ul className="opacity-50">
            <li className="mb-2">
              Đại Học FPT Hồ Chí Minh, Quận 9, Thành Phố Hồ Chí Minh
            </li>
            <li className="mb-2">Email: coc-travel.contact@gmail.com</li>
            <li className="mb-2">Phone: +84 366 967 957</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
