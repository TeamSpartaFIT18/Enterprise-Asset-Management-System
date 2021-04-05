import React, { useState } from 'react'
import styled from 'styled-components'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { AdminSideNavData } from './AdminSideNavData'
import AdminSideNavSubMenuData from './AdminSideNavSubMenuData'
import { IconContext } from 'react-icons/lib'
import './AdminSideNav.css'

const Div = styled.div`
  background: #000000;
  height: 60px;
  width: 80px;
  left: 0 !important;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: ${({ burg }) => (burg ? '0' : '-100%')};
  margin-top: 50px;
  margin-left: 0;
  z-index: 10;
  position: fixed;
  border-radius: 0px 40px 40px 0px;
`

const SidebarNav = styled.nav`
  margin-top: 63px;
  background: #000000;
  width: 250px;
  height: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 500ms;
  z-index: 10;
  border-radius: 0px 30px 30px 0px;
`

const SidebarWrap = styled.div`
  width: 100%;
`

const AdminSideNav = () => {
  const [sidebar, setSidebar] = useState(true)
  const [burg] = useState(true)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Div burg={burg}>
          <i className='openSide' to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </i>
        </Div>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <i className='closeSide' to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </i>
            {AdminSideNavData.map((item, index) => {
              return <AdminSideNavSubMenuData item={item} key={index} />
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  )
}

export default AdminSideNav
