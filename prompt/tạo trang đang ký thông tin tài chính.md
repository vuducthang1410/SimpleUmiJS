curl --location 'http://10.3.245.23:8084/api/v1/financial-info/individual-customer/save-info' \
--header 'accept: _/_' \
--header 'transactionId: 123456789' \
--header 'Content-Type: application/json' \
--form 'financialInfoRq="{ \"unit\": \"MONTH\", \"income\": 50000000, \"incomeSource\": \"company\", \"incomeType\": \"salary\", \"cifCode\":123456789 }";type=application/json' \
--form 'incomeVerificationDocuments=@"postman-cloud:///1efe853b-b333-4680-85fe-6e9a58af4653"' \
--form 'incomeVerificationDocuments=@"postman-cloud:///1efe853b-6bc2-4d50-9429-26b3f19816da"' -từ curl sau thay dùng umijs + ant design tạo cho tôi giao diện để thực hiện đăng ký thông tin tài chính -dùng umijs request để thực hiện call lên api và dùng dva để quản lý trang thái -viết hàm xử lý phần nhập dữ liệu từ ô input ánh xạ và đối tượng -giao diện không được có khoảng trống lớn -viết tách file để dễ quản lý và nâng cấp
