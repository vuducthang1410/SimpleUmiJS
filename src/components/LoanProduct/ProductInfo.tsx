import { LoanProductRp } from '@/types/LoanProduct';

interface ProductInfoProps {
    loanProductRp: LoanProductRp;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ loanProductRp }) => (
    <>
        <p><strong>Tên sản phẩm:</strong> {loanProductRp.productName}</p>
        <p><strong>Hạn mức vay:</strong> {loanProductRp.loanLimit}</p>
        <p><strong>Hạn mức kỳ hạn:</strong> {loanProductRp.termLimit} tháng</p>
        <p><strong>Hình thức vay:</strong> {loanProductRp.formLoan}</p>
    </>
);

export default ProductInfo;
