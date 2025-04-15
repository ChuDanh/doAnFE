import * as Yup from 'yup';

export const useRegisterValidation = () => {
  const schema = Yup.object().shape({
    full_name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Họ và tên không được chứa số hoặc ký tự đặc biệt')
      .required('Vui lòng nhập họ và tên'),
    username: Yup.string().required('Vui lòng điền tên đăng nhập'),
    password: Yup.string()
      .min(8, 'Mật khẩu phải dài ít nhất 8 ký tự')
      .required('Vui lòng nhập mật khẩu'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp với mật khẩu')
      .required('Vui lòng xác nhận mật khẩu'),
    email: Yup.string()
      .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email phải có định dạng @gmail.com')
      .required('Vui lòng nhập email'),
    phone_number: Yup.string()
      .length(13, 'Số điện thoại phải có 13 ký tự')
      .required('Vui lòng nhập số điện thoại'),
    role: Yup.string().default('user'),
  });

  return { schema };
};
