import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const AdminSideNavData = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <RiIcons.RiDashboardFill />,
  },
  {
    title: 'Inventory',
    path: '/admin/productslist',
    icon: <FaIcons.FaWarehouse />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Reports',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Reports 2',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Reports 3',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'Users',
    path: '/admin/userslist',
    icon: <FaIcons.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Admins',
        path: '/admin/adminslist',
        icon: <FaIcons.FaArrowAltCircleRight />,
        cName: 'sub-nav',
      },
      {
        title: 'Employees',
        path: '/admin/employeelist',
        icon: <FaIcons.FaArrowAltCircleRight />,
        cName: 'sub-nav',
      },
    ],
  },
  {
    title: 'Orders',
    path: '/admin/orderslist',
    icon: <FaIcons.FaShoppingBag />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Not paid orders',
        path: '/admin/orders/notpaidorders',
        icon: <FaIcons.FaArrowAltCircleRight />,
        cName: 'sub-nav',
      },
      {
        title: 'Not delivered orders',
        path: '/admin/orders/notDeliveredorders',
        icon: <FaIcons.FaArrowAltCircleRight />,
        cName: 'sub-nav',
      },
      {
        title: 'All orders',
        path: '/reports/reports3',
        icon: <FaIcons.FaArrowAltCircleRight />,
      },
    ],
  },
  {
    title: 'Complaints',
    path: '/messages',
    icon: <RiIcons.RiErrorWarningFill />,
  },
]
