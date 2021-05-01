import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as RiIcons from 'react-icons/ri'
import * as AiIcons from 'react-icons/ai'

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
    title: 'Complaints',
    path: '/admin/complaints',
    icon: <RiIcons.RiErrorWarningFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Not handled complaints',
        path: '/admin/complaints/nothandled',
        icon: <FaIcons.FaArrowAltCircleRight />,
        cName: 'sub-nav',
      },
    ],
  },
  {
    title: 'Schedules',
    path: '/admin/schedules',
    icon: <AiIcons.AiFillSchedule />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Ongoing Schedules',
        path: '/admin/schedules/ongoing',
        icon: <FaIcons.FaArrowAltCircleRight />,
        cName: 'sub-nav',
      },
      {
        title: 'Completed Schedules',
        path: '/admin/schedules/completed',
        icon: <FaIcons.FaArrowAltCircleRight />,
        cName: 'sub-nav',
      },
    ],
  },
]
