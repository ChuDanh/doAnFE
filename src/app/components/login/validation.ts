import * as Yup from 'yup';

export const useLoginValidation = () => {
  const schema = Yup.object().shape({
    username: Yup.string().required('Vui lòng điền tên đăng nhập'),
    password: Yup.string()
      .min(8, 'Mật khẩu phải dài ít nhất 8 ký tự')
      .required('Vui lòng nhập mật khẩu'),
  });

  return { schema };
};
