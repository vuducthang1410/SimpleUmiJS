import React, { useState, useEffect } from "react";
import { Row, Col, Pagination, Spin } from "antd";
import LoanCard from "./LoanInfoDetailActiveCard";
import { useDispatch } from "@umijs/max";
import { getUserInfoInLocalStorage } from "@/utils/UserInfo";
import { LoanDetailActiveRp } from "@/types/LoanInfo";

const pageSize = 6; // Số thẻ trên mỗi trang

const LoanList: React.FC = () => {
    const dispatch = useDispatch()
    const [loanDetailActiveRp, setLoanDetailActiveRp] = useState<LoanDetailActiveRp[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const user = getUserInfoInLocalStorage()
        dispatch({
            type: 'loanDetailInfo/getLoanInfoActiveByCifCode',
            payload: { pageSize: pageSize, pageNumber: currentPage - 1, cifCode: user.cifCode },
            callback: (response: LoanDetailActiveRp[], totalRecord: number) => {
                setLoanDetailActiveRp(response);
                setTotalItems(totalRecord)
                setLoading(false)
            }
        })
        // fetchLoans(currentPage);
    }, [currentPage]);

    return (
        <>
            {loading ? (
                <Spin size="large" style={{ display: "block", textAlign: "center", marginTop: 50 }} />
            ) : (
                <>
                    <Row gutter={[24, 24]} justify="start">
                        {loanDetailActiveRp.map((loan, index) => (
                            <Col key={index} xs={24} sm={12} md={12} lg={12}>
                                <LoanCard loan={loan} />
                            </Col>
                        ))}
                    </Row>

                    {/* Phân trang */}
                    {totalItems > pageSize &&
                        <Pagination
                            current={currentPage}
                            total={totalItems}
                            pageSize={pageSize}
                            onChange={setCurrentPage}
                            style={{ marginTop: 20, textAlign: "center" }}
                        />}
                </>
            )}
        </>
    );
};

export default LoanList;
