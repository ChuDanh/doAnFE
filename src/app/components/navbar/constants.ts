import { TNavItem } from './types.ts';

export const NAV_ITEMS: TNavItem[] = [
  {
    icon: 'ic:round-home',
    title: 'Trang chủ',
    path: '/courses',
  },
  {
    icon: 'ix:road-filled',
    title: 'Lộ trình',
    path: '/learning-path',
  },
  {
    icon: 'f7:book-fill',
    title: 'Khóa học của tôi',
    path: '/my-courses',
  },
  {
    icon: 'lsicon:management-filled',
    title: 'Quản lý khóa học',
    path: '/manage-courses',
    children: [
      {
        icon: 'material-symbols:list-rounded',
        title: 'Danh sách khóa học',
        path: '/manage-courses/list',
      },
      {
        icon: 'gridicons:add',
        title: 'Thêm khóa học',
        path: '/manage-courses/add',
      },
    ],
  },
  {
    icon: 'ri:todo-fill',
    title: 'Báo cáo',
    path: '/report',
    children: [
      {
        icon: 'mdi:report-box-multiple',
        title: 'Khóa học',
        path: '/report/course',
      },
      {
        icon: 'mdi:report-box-multiple',
        title: 'Doanh thu',
        path: '/report/revenue',
      },
    ],
  },
];
