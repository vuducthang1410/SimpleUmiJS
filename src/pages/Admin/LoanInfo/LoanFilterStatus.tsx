import React from 'react';
import { Select } from 'antd';

interface LoanFilterProps {
    loanStatusList: { label: string; value: string }[];
    selectedLoanStatus: string;
    onChange: (value: string) => void;
}

const LoanFilter: React.FC<LoanFilterProps> = ({ loanStatusList, selectedLoanStatus, onChange }) => {
    return (
        <Select
            showSearch
            placeholder="Chọn trạng thái"
            optionFilterProp="label"
            onChange={onChange}
            value={selectedLoanStatus}
            options={loanStatusList}
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
        />
    );
};

export default LoanFilter;
