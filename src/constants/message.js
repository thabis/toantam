export const messageFirebase = (key) => {
  switch (key) {
    case 'ERROR_EMAIL_ALREADY_IN_USE':
      return 'Email đã tồn tại';
    case 'ERROR_WRONG_PASSWORD':
    case 'ERROR_USER_NOT_FOUND':
      return 'tài khoản hoặc mật khẩu không đúng';
    case 'ERROR_USER_DISABLED':
      return 'Tài khoản bị khoá';
    default:
      return '';
  }
};

export const EMAIL_REQUIRED = 'Xin nhập email';
export const EMAIL_VALID = 'email không đúng';
export const PASSWORD_LENGTH = 'mật khẩu ít nhất 6 ký tự';
export const PASSWORD_REQUIRED = 'mật khẩu là bắt buộc';
export const NAME_REQUIRED = 'Xin nhập họ tên';
export const NOTE_REQUIRED = 'Bạn phải ghi chú lại nội dung đơn hàng';
export const PHONE_REQUIRED = 'Xin nhập số điện thoại';
export const PHONE_LENGTH = 'Số điện thoại không đúng';
export const DISTRICT_REQUIRED = 'Xin chọn quận';
export const WARD_REQUIRED = 'Xin chọn phường/huyện';
export const ADDRESS_REQUIRED = 'Xin nhập địa chỉ';
export const COMPANY_REQUIRED = 'Nhập tên công ty';
export const COMPANY_SELECT_REQUIRED = 'Chọn công ty ở danh sách công ty';
export const CODECOMPANY_REQUIRED = 'Xin nhập mã viết tắt (Toàn Tâm: TT)';
export const NUMBER_VALID = 'Xin nhập ký tự là số';
export const LOGIN_ERROR = 'Tài khoản hoặc mật khẩu không đúng';
export const MESSAGE_SYSTEM = 'Hệ thống bị lỗi';
export const messageError = (key) => {
  switch (key) {
    case 'error_ward':
      return 'Không lấy được quận';
    case 'error_company':
      return 'Không lấy được danh sách công ty';
    case 'error_assign_order':
      return 'Lỗi khi xử lý đơn hàng';
    case 'error_reject_order':
      return 'Lỗi khi từ chối đơn hàng';
    case 'error_confirm_order':
      return 'Lỗi khi xác nhận đơn hàng';
    case 'error_done_order':
      return 'Lỗi khi hoàn thành đơn hàng';
    case 'error_get_order_detail':
      return 'Lỗi khi lấy chi tiết đơn hàng';
    case 'error_get_order_status_history':
      return 'Lỗi khi lấy lịch sử đơn hàng';
    case 'error_get_list_order':
      return 'Lỗi danh sách đơn hàng';
    case 'error_create_order':
      return 'Tạo đơn hàng bị lỗi';
    case 'error_update_order':
      return 'Cập nhật đơn hàng bị lỗi';
    case 'error_search_order':
      return 'Tìm kiếm đơn hàng bị lỗi';
    case 'error_create_update_company':
      return 'Cập nhật công ty lỗi';
    default:
      return 'Lỗi hệ thống';
  }
};
