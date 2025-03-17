import React from "react";
import { Spin } from "antd";

interface LoadingOverlayProps {
  loading: boolean;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  zIndex: 9999,
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div style={overlayStyle}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingOverlay;