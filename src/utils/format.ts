// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}
const getLoanStatusInfo = (status: string) => {
  switch (status) {
    case 'PENDING':
      return { label: 'Chờ xét duyệt', color: '#E6A23C' }; // Cam vàng nhẹ
    case 'ACTIVE':
      return { label: 'Đang vay', color: 'green' };
    case 'REJECTED':
      return { label: 'Bị từ chối', color: 'red' };
    case 'PAID_OFF':
      return { label: 'Đã thanh toán', color: 'blue' };
    default:
      return { label: 'Không xác định', color: 'black' };
  }
};
export default getLoanStatusInfo;
export const formatCurrency = (value: string) => {
  const numericValue = value.replace(/\D/g, ""); 
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Number(numericValue));
};
export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};