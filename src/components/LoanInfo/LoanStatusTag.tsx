import getLoanStatusInfo from "@/utils/format";
import React from "react";

const LoanStatusTag: React.FC<{ status: string }> = ({ status }) => {
    const { label, color } = getLoanStatusInfo(status);

    return <p style={{ color, fontWeight: "bold" }}>🔖 {label}</p>;
};
export default LoanStatusTag;