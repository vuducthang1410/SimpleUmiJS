class APIConfig {
  static BASE_URL = 'http://localhost:8080';
  static LOAN_URL = this.BASE_URL + '/loan/api/v1';
  static CUSTOMER_URL = this.BASE_URL + '/customer/api/v1';
  static TRANSACTION_URL = this.BASE_URL + '/transaction/api/v1'
  static ACCOUNT_URL = this.BASE_URL + '/account/api/v1'
}

export default APIConfig;
