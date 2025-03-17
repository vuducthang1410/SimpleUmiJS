import CreateInterestRateModal from '@/components/LoanProduct/CreateInterestRateModal';
import EditInterestRateModal from '@/components/LoanProduct/EditInterestRateModal';
import InterestRateTable from '@/components/LoanProduct/InterestRateTable';
import ProductInfo from '@/components/LoanProduct/ProductInfo';
import { DataCallback } from '@/types/InterestRate';
import { LoanProductRp } from '@/types/LoanProduct';
import { useDispatch, useParams } from '@umijs/max';
import { App, Button, Card, message, Select } from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

const LoanProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loanProductRp, setLoanProductRp] = useState<LoanProductRp>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [editingRate, setEditingRate] = useState({
    loanProductId: '',
    interestRate: 0,
    unit: 'MONTH',
    minimumAmount: 0,
    minimumLoanTerm: 0,
  });
  useEffect(() => {
    if (id) loadData(id);
  }, [id]);

  const loadData = (id: string) => {
    dispatch({
      type: 'loanProduct/getLoanProductById',
      payload: { id, callback: setLoanProductRp },
      callback: (response: DataCallback) => {
        if (response.isSuccess) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
      },
    });
  };

  const handleBack = () => history.back();

  const handleToggleProductStatus = () => {
    dispatch({
      type: 'loanProduct/activedLoanProduct',
      payload: {
        id: loanProductRp?.productId,
        isUnActive: false,
      },
      callback: (response: DataCallback) => {
        if (response.isSuccess) {
          message.success(response.message);
          handleBack();
        } else {
          message.error(response.message);
        }
      },
    });
  };
  return (
    <App>
      <Card
        title="Chi tiết sản phẩm vay"
        extra={<Button onClick={handleBack}>Quay lại</Button>}
      >
        {loanProductRp && (
          <>
            <ProductInfo loanProductRp={loanProductRp} />
            <InterestRateTable
              loanProductRp={loanProductRp}
              setIsModalCreateOpen={setIsModalCreateOpen}
              setIsModalUpdateOpen={setIsModalUpdateOpen}
            />
            <Button
              type="primary"
              onClick={handleToggleProductStatus}
              style={{ marginTop: '16px' }}
            >
              {loanProductRp.isActive ? 'Hủy kích hoạt' : 'Kích hoạt sản phẩm'}
            </Button>
          </>
        )}
        <CreateInterestRateModal
          isOpen={isModalCreateOpen}
          setIsOpen={setIsModalCreateOpen}
          id={id}
          dispatch={dispatch}
          setEditingRate={setEditingRate}
        />
        <EditInterestRateModal
          isOpen={isModalUpdateOpen}
          setIsOpen={setIsModalUpdateOpen}
          editingRate={editingRate}
        />
      </Card>
    </App>
  );
};
export default LoanProductDetail;
