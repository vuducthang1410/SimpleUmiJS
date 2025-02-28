# Hãy sử dụng UmiJS Request kết hợp với TypeScript và DVA để triển khai API sau:

curl -X 'PATCH' \
 'http://10.3.245.23:8084/api/v1/loan-product/active/1111' \
 -H 'accept: _/_' \
 -H 'transactionId: 111'

# Cập nhật phương thức \*activedLoanProduct({ payload }, { call }) trong DVA model để xử lý API này đúng cách.

# Mô tả chi tiết

    -Sử dụng umi-request để gọi API.

    -Xây dựng phương thức trong DVA để kích hoạt sản phẩm vay.
    -
    -Nhận id từ payload và truyền vào API.
    -
    -Xử lý thành công hoặc thất bại và gọi callback nếu có.
    -
    -Đảm bảo TypeScript có kiểu dữ liệu chính xác cho payload.

# Kết quả mong muốn

    - Khi gọi activedLoanProduct, API được thực thi chính xác.
    -
    - Nếu thành công, cập nhật trạng thái của sản phẩm trong Redux store.
    -
    - Nếu thất bại, hiển thị thông báo lỗi phù hợp.
