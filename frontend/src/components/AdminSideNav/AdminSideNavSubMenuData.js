import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarLink = styled(Link)`
  display: flex;
  color: #ffffff !important;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 50px;
  text-decoration: none !important;
  font-size: 15px;
  &:hover {
    background: #001a0f;
    border-left: 5px solid #00e68a;
    cursor: pointer;
  }
`

const SidebarLabel = styled.span`
  margin-left: 16px;
`

const DropdownLink = styled(Link)`
  background: #262626;
  height: 35px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none !important;
  color: #f5f5f5;
  font-size: 15px;
  &:hover {
    background: #00804d;
    color: white;
    cursor: pointer;
    border-right: 5px solid #00e68a;
  }
`

const AdminSideNavSubMenuData = ({ item }) => {
  const [subnav, setSubnav] = useState(false)

  const showSubnav = () => setSubnav(!subnav)

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          )
        })}
    </>
  )
}

export default AdminSideNavSubMenuData
