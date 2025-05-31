import { TNavItem } from './types.ts';

export const NAV_ITEMS: TNavItem[] = [
  {
    icon: 'ic:round-home',
    title: 'Trang chủ',
    path: '/courses',
    roles: ['user', 'guest', 'admin'], // Accessible by all roles
  },
  {
    icon: 'ix:road-filled',
    title: 'Lộ trình',
    path: '/learning-path',
    roles: ['user', 'guest', 'admin'],
  },
  {
    icon: 'f7:book-fill',
    title: 'Khóa học của tôi',
    path: '/my-courses',
    roles: ['user', 'admin'],
  },
  {
    icon: 'lsicon:management-filled',
    title: 'Quản lý',
    path: '/manage',
    roles: ['admin', 'seller'],
    children: [
      {
        icon: 'material-symbols:dashboard',
        title: 'Khóa học',
        path: '/manage/courses',
        children: [
          {
            icon: 'material-symbols:list-rounded',
            title: 'Danh sách khóa học',
            path: '/manage/courses/list',
          },
          {
            icon: 'bx:plus-circle',
            title: 'Thêm khóa học',
            path: '/manage/courses/add',
          },
        ],
      },
      {
        icon: 'icon-park-solid:map-road-two',
        title: 'Lộ trình',
        path: '/manage/learning-path',
        roles: ['admin'],
        children: [
          {
            icon: 'material-symbols:list-rounded',
            title: 'Danh sách lộ trình',
            path: '/manage/learning-path/list',
          },
          {
            icon: 'bx:plus-circle',
            title: 'Thêm lộ trình',
            path: '/manage/learning-path/add',
          },
        ],
      },
    ],
  },
  {
    icon: 'mdi:report-box',
    title: 'Báo cáo',
    path: '/report',
    roles: ['admin', 'seller'],
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
