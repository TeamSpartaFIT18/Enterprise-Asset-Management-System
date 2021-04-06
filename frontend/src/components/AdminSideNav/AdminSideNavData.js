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
      {
        title: 'Clients',
        path: '/admin/clientlist',
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
    ],
  },
  {
    title: 'MailBox',
    path: '/admin/mailtoclient',
    icon: <IoIcons.IoIosMail />,
  },
  {
    title: 'Complaints',
    path: '/messages',
    icon: <RiIcons.RiErrorWarningFill />,
  },
]
