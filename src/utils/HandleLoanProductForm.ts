// src/hooks/useLoanProductForm.ts
import { ApplicableObjects, LoanForm, LoanProduct } from '@/types/LoanProduct';
import { useState } from 'react';

export default function useLoanProductForm() {
  const [newLoanProduct, setNewLoanProduct] = useState<LoanProduct>({
    nameLoanProduct: '',
    loanLimit: 0,
    description: '',
    utilities: '',
    loanCondition: '',
    loanForm: LoanForm.SECURED_LOAN,
    applicableObjects: ApplicableObjects.INDIVIDUAL_CUSTOMER,
    termLimit: 0,
  });

  const handleInputChange = (field: keyof LoanProduct, value: any) => {
    console.log("first",value)
    setNewLoanProduct((prev) => ({ ...prev, [field]: value }));
  };

  return { newLoanProduct, handleInputChange };
}
