function formatPrice(gia) {
    /**
     * Định dạng giá tiền Việt Nam từ số nguyên thành chuỗi có dấu phân cách và ký tự đồng.
     * 
     * @param {number} gia - Giá tiền cần định dạng.
     * @returns {string} - Chuỗi đã định dạng giá tiền.
     */
    if (gia !== null && gia !== undefined) {
        return gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    } else {
        return '0';
    }
}


function formatDateTime(ngayGio) {
    /**
     * Định dạng thời gian thành chuỗi dd/mm/yyyy hh/mm/ss.
     * 
     * @param {Date} ngayGio - Thời gian cần định dạng.
     * @returns {string} - Chuỗi đã định dạng thời gian.
     */
    var ngay = ngayGio.getDate();
    var thang = ngayGio.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    var nam = ngayGio.getFullYear();
    var gio = ngayGio.getHours();
    var phut = ngayGio.getMinutes();
    var giay = ngayGio.getSeconds();

    // Thêm số 0 vào trước nếu số chỉ có 1 chữ số
    if (ngay < 10) ngay = '0' + ngay;
    if (thang < 10) thang = '0' + thang;
    if (gio < 10) gio = '0' + gio;
    if (phut < 10) phut = '0' + phut;
    if (giay < 10) giay = '0' + giay;

    return ngay + '/' + thang + '/' + nam + ' ' + gio + ':' + phut + ':' + giay;
}



export{formatPrice, formatDateTime}