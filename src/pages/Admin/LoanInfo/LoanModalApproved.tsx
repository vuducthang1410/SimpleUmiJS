import { LoanInfoApproveRq } from '@/types/LoanInfo';
import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

interface LoanModalProps {
    isVisible: boolean;
    onConfirm: (loanInfo: LoanInfoApproveRq) => void;
    onCancel: () => void;
    loanId: string | null;
    approvalStatus: 'APPROVED' | 'REJECTED' | '';
}

const LoanModal: React.FC<LoanModalProps> = ({
    isVisible,
    onConfirm,
    onCancel,
    loanId,
    approvalStatus,
}) => {
    const [loanInfoApproveRq, setLoanInfoApproveRq] = useState<LoanInfoApproveRq>(
        {
            loanDetailInfoId: '',
            note: '',
            requestStatus: '',
        },
    );

    // Cập nhật loanDetailInfoId khi loanId thay đổi
    useEffect(() => {
        if (loanId) {
            setLoanInfoApproveRq((prev) => ({
                ...prev,
                loanDetailInfoId: loanId,
                requestStatus: approvalStatus,
            }));
        }
    }, [loanId]);

    return (
        <Modal
            title="Nhập lý do duyệt/từ chối"
            open={isVisible}
            onOk={() => {
                onConfirm(loanInfoApproveRq);
                setLoanInfoApproveRq({
                    note: '',
                    loanDetailInfoId: '',
                    requestStatus: '',
                });
            }}
            onCancel={() => {
                onCancel();
                setLoanInfoApproveRq({
                    note: '',
                    loanDetailInfoId: '',
                    requestStatus: '',
                });
            }}
            okText={'Xác nhận'}
            cancelText={'Hủy'}
        >
            <Input.TextArea
                value={loanInfoApproveRq.note}
                placeholder="Nhập ghi chú..."
                onChange={(e) =>
                    setLoanInfoApproveRq((prev) => ({ ...prev, note: e.target.value }))
                }
                rows={4}
            />
        </Modal>
    );
};

export default LoanModal;
