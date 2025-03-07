import React, { useState, useEffect, lazy, Suspense } from "react";
import { Row, Col, Pagination, Spin } from "antd";
import { useDispatch, useSelector } from "@umijs/max";
import { getUserInfoInLocalStorage } from "@/utils/UserInfo";
import { LoanDetailActiveRp } from "@/types/LoanInfo";

// Lazy load các component
const LoanCard = lazy(() => import("./LoanInfoDetailActiveCard"));
const LoanDetailModal = lazy(() => import("../PaymentLoan/PaymentLoanEarly"));
const LoanInfoDetailPaymentModal = lazy(() => import("@/components/LoanInfo/LoanInfoDetailPaymentModal"));

const pageSize = 6; // Số thẻ trên mỗi trang

const LoanList: React.FC = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleDetail, setIsModalVisibleDetail] = useState(false);
    const { loanDetailInfoList, totalRecord } = useSelector(
        (state: any) => state.loanDetailInfo.fetchLoanDetailInfo,
    );
    const [loanInfoId, setLoanInfoId] = useState<string>("");

    const showModal = (loanInfoId: string) => {
        setLoanInfoId(loanInfoId);
        setIsModalVisible(true);
    };

    useEffect(() => {
        setLoading(true);
        const user = getUserInfoInLocalStorage();
        dispatch({
            type: "loanDetailInfo/getLoanInfoActiveByCifCode",
            payload: { pageSize: pageSize, pageNumber: currentPage - 1, cifCode: user.cifCode },
            callback: () => {
                setLoading(false);
            },
        });
    }, [currentPage]);

    return (
        <>
            {loading ? (
                <Spin size="large" style={{ display: "block", textAlign: "center", marginTop: 50 }} />
            ) : (
                <>
                    <Row gutter={[24, 24]} justify="start">
                        {loanDetailInfoList.map((loan: LoanDetailActiveRp, index: number) => (
                            <Col key={index} xs={24} sm={12} md={12} lg={12}>
                                <Suspense fallback={<Spin size="small" />}>
                                    <LoanCard
                                        loan={loan}
                                        showModal={showModal}
                                        dispatch={dispatch}
                                        showDetailModal={setIsModalVisibleDetail}
                                    />
                                </Suspense>
                            </Col>
                        ))}
                    </Row>

                    {/* Phân trang */}
                    {totalRecord > pageSize && (
                        <Pagination
                            current={currentPage}
                            total={totalRecord}
                            pageSize={pageSize}
                            onChange={setCurrentPage}
                            style={{ marginTop: 20, textAlign: "center" }}
                        />
                    )}
                </>
            )}

            {/* Modal với Lazy Loading */}
            <Suspense fallback={<Spin size="large" />}>
                {isModalVisible && (
                    <LoanDetailModal
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                        loanId={loanInfoId}
                        pageSize={pageSize}
                        currentPage={currentPage}
                    />
                )}
            </Suspense>

            <Suspense fallback={<Spin size="large" />}>
                {isModalVisibleDetail && (
                    <LoanInfoDetailPaymentModal
                        visible={isModalVisibleDetail}
                        onClose={() => setIsModalVisibleDetail(false)} />
                )}
            </Suspense>
        </>
    );
};

export default LoanList;
