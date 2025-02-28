# Prompt hiển thị danh sách sản phẩm vay

## Yêu cầu

- Hiển thị chi tiết sản phẩm vay sử dụng UmiJS 4, DVA, TypeScript, Ant Design.
- Nút "Back" để quay lại danh sách sản phẩm.
- Hiển thị thông tin không quá cách xa hoặc trống trải.
- Có nút "Kích hoạt sản phẩm" ở dưới cùng.
- Bảng lãi suất hiển thị gồm:
  - Cột STT
  - Cột thao tác kích hoạt/hủy kích hoạt
  - Cột xóa/chỉnh sửa (Có popup cảnh báo khi xóa, modal nhập thông tin khi sửa)
  - Không hiển thị ID trong bảng.

## dữ liệu nhận về

loanProductRpList": [ { "productId": "02787b44-f26e-40e8-a4d8-c9b75d1dc52a", "productName": "Vay kinh doanh", "productDescription": "string", "formLoan": "UNSECURED_LOAN", "loanLimit": "45.000.000 VND", "interestRate": [ { "id": "01c80f5e-fb78-414c-b0fb-ad49f9f3de6e", "interestRate": "2.9", "unit": "MONTH", "isActive": "true", "minimumAmount": "20000000", "dateActive": "20/02/2025 16:21", "minimumLoanTerm": "3", "createdDate": "20/02/2025 16:21" }, { "id": "03c4b7f7-9fe9-4b1e-a906-9fd793ceb10d", "interestRate": "5.3", "unit": "MONTH", "isActive": "true", "minimumAmount": "10000000", "dateActive": "20/02/2025 16:23", "minimumLoanTerm": "3", "createdDate": "20/02/2025 16:23" }, { "id": "712b5834-741d-4c76-8124-5e5a1cefade0", "interestRate": "3.8", "unit": "MONTH", "isActive": "true", "minimumAmount": "800000", "dateActive": "20/02/2025 16:21", "minimumLoanTerm": "3", "createdDate": "20/02/2025 16:21" }, { "id": "812685bd-8a77-4f1b-b36c-1d46f5d2e009", "interestRate": "4.2", "unit": "MONTH", "isActive": "true", "minimumAmount": "2000000", "dateActive": "20/02/2025 16:21", "minimumLoanTerm": "9", "createdDate": "20/02/2025 16:21" }, { "id": "c6dbafb8-da0c-4cc8-bbac-aa3a72246bc3", "interestRate": "3.4", "unit": "MONTH", "isActive": "true", "minimumAmount": "400000", "dateActive": "20/02/2025 16:21", "minimumLoanTerm": "1", "createdDate": "20/02/2025 16:21" }, { "id": "c821dcaf-b868-4617-be5c-8019e1cc8186", "interestRate": "2.7", "unit": "MONTH", "isActive": "true", "minimumAmount": "5000000", "dateActive": "20/02/2025 16:24", "minimumLoanTerm": "6", "createdDate": "20/02/2025 16:24" }, { "id": "cd924282-0b4f-45f3-bc52-4a441f905048", "interestRate": "10.0", "unit": "MONTH", "isActive": "true", "minimumAmount": "40000000", "dateActive": "20/02/2025 16:20", "minimumLoanTerm": "6", "createdDate": "20/02/2025 16:20" } ], "termLimit": 18, "utilities": "string", "productUrlImage": "https://example.com/djaiajd.jpg", "loanCondition": "string", "applicableObjects": "INDIVIDUAL_CUSTOMER", "createdDate": "2025/02/20 16:18:45", "isActive": true } ]
