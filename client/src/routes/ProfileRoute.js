import React, { useState, useEffect } from "react";
import { Row, Col, Drawer, Button, Dropdown, Menu, Modal, Upload } from 'antd'
import { RiMore2Line, RiMenuFill, RiCloseFill } from 'react-icons/ri'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingToRedirect } from '../components'
import VerticalLayout from '../layouts/VerticalLayout'
import { isUserAction } from '../redux/actions/authActions'
import { UploadOutlined } from '@ant-design/icons'
import { storage } from '../Firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage' // Import required functions
import MenuProfile from '../components/Profile/menu'
import Breadcrumbs from '../layouts/components/content/breadcrumbs'
// import menuImg from "../../assets/images/pages/profile/menu-img.svg";
import menuImg from '../assets/images/pages/profile/menu-img.svg'
import doctorMaleAvatar from '../assets/images/illustrations/doctorMaleAvatar.png'
import doctorFemaleAvatar from '../assets/images/illustrations/doctorFemaleAvatar.png'
import { saveImageToUserProfile } from '../redux/actions/userActions'
const ProfileRoute = ({ children, ...restProps }) => {
  const dispatch = useDispatch()
  const [ok, setOk] = useState(false)
  const [visible, setVisible] = useState(false)
  const [avatarModalVisible, setAvatarModalVisible] = useState(false)
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const [dummyState, setDummyState] = useState({})
  console.log('profileRouteUser=>', user)

  // Check if current user is a user
  useEffect(() => {
    // Dispatch the user action
    console.log('dummyState==>', dummyState)
    dispatch(isUserAction({ setOk }))
  }, [dispatch, setOk, dummyState, setDummyState])

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const handleAvatarChange = () => {
    setAvatarModalVisible(true)
  }

  const handleUpload = async () => {
    setUploading(true)
    const file = fileList[0]
    if (!file) return

    const fileRef = ref(storage, `avatars/${file.name}`)

    try {
      await uploadBytes(fileRef, file)
      const downloadURL = await getDownloadURL(fileRef)
      // Save the download URL to the user's profile (via API or Firebase update)
      console.log('File uploaded successfully. Download URL:', downloadURL)
      setAvatarModalVisible(false)
      setFileList([])
      const image = await dispatch(
        saveImageToUserProfile({
          downloadURL,
          userId: user?._id,
          setOk,
          role: user?.role,
          number: user?.role === 'doctor' ? user?.gmcNumber : user?.nhsNumber,
        })
      )
      console.log('image==>', image)
      setDummyState({ ...dummyState, image })
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setUploading(false)
    }
  }

  const uploadProps = {
    onRemove: (file) => {
      setFileList((prevList) => {
        const index = prevList.indexOf(file)
        const newFileList = prevList.slice()
        newFileList.splice(index, 1)
        return newFileList
      })
    },
    beforeUpload: (file) => {
      setFileList([file])
      return false
    },
    fileList,
  }

  const rateMenu = (
    <Menu>
      <Menu.Item key='0' onClick={handleAvatarChange}>
        Change Avatar
      </Menu.Item>
    </Menu>
  )

  const moreBtn = () => {
    return (
      <Dropdown overlay={rateMenu} placement='bottomLeft'>
        <Button
          type='text'
          icon={
            <RiMore2Line
              className='hp-text-color-black-100 hp-text-color-dark-0'
              size={24}
            />
          }></Button>
      </Dropdown>
    )
  }

  return (
    <>
      {ok ? (
        <VerticalLayout>
          <Row gutter={[32, 32]} className='hp-mb-32'>
            <Drawer
              title={moreBtn()}
              className='hp-profile-mobile-menu'
              placement='left'
              closable={true}
              onClose={onClose}
              visible={visible}
              closeIcon={
                <RiCloseFill
                  className='remix-icon hp-text-color-black-80'
                  size={24}
                />
              }>
              <MenuProfile
                onCloseDrawer={onClose}
                moreBtnCheck='none'
                footer='none'
                menuImg={menuImg}
              />
            </Drawer>

            <Col span={24}>
              <Row gutter={[32, 32]} justify='space-between'>
                <Breadcrumbs
                  rootName='Profile'
                  rootLink={`/profile/information`}
                  breadCrumbParent='details'
                />
              </Row>
            </Col>

            <Col span={24}>
              <Row className='hp-profile-mobile-menu-btn hp-bg-color-black-0 hp-bg-color-dark-100 hp-border-radius hp-py-12 hp-px-sm-8 hp-px-24 hp-mb-16'>
                <Button
                  className='hp-p-0'
                  type='text'
                  icon={
                    <RiMenuFill
                      size={24}
                      className='remix-icon hp-text-color-black-80 hp-text-color-dark-30'
                    />
                  }
                  onClick={showDrawer}></Button>
              </Row>

              <Row className='hp-bg-color-black-0 hp-bg-color-dark-100 hp-border-radius hp-pr-sm-16 hp-pr-32'>
                <MenuProfile moreBtn={moreBtn} />

                <Col
                  flex='1 1'
                  className='hp-pl-sm-16 hp-pl-32 hp-py-sm-24 hp-py-32 hp-pb-24 hp-overflow-hidden'>
                  {/* Children */}
                  <Route {...restProps} render={children} />
                </Col>
              </Row>
            </Col>
          </Row>

          <Modal
            visible={avatarModalVisible}
            title='Change Avatar'
            onCancel={() => setAvatarModalVisible(false)}
            footer={[
              <Button key='back' onClick={() => setAvatarModalVisible(false)}>
                Cancel
              </Button>,
              <Button
                key='submit'
                type='primary'
                loading={uploading}
                onClick={handleUpload}>
                Upload
              </Button>,
            ]}>
            <Upload {...uploadProps} style={{ width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </div>
            </Upload>
          </Modal>
        </VerticalLayout>
      ) : (
        <LoadingToRedirect />
      )}
    </>
  )
}

export default ProfileRoute;
