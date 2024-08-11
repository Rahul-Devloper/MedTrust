import React from 'react'
import { Row, Col, Typography, Divider } from 'antd'
import { useHistory } from 'react-router-dom'
import MenuFooter from '../../layouts/components/footer'
import { useSelector } from 'react-redux'

const { Title } = Typography

const SpecialityDirectory = () => {
  const history = useHistory()
  const role = useSelector((state) => state?.auth?.user?.role)

  const specialities = [
    'Acupuncture',
    'Addiction Medicine',
    'Addiction Psychiatry',
    'Adolescent Psychology',
    'Advanced Heart Failure & Transplant Cardiology',
    'Aerospace Medicine',
    'Allergy & Immunology',
    'Anesthesiology',
    'Audiology',
    'Bariatric Surgery',
    'Behavioral Health',
    'Breast Surgery',
    'Cardiology',
    'Cardiothoracic Surgery',
    'Chiropractic',
    'Clinical Genetics',
    'Clinical Neurophysiology',
    'Colon & Rectal Surgery',
    'Critical Care Medicine',
    'Dentistry',
    'Dermatology',
    'Developmental-Behavioral Pediatrics',
    'Emergency Medicine',
    'Endocrinology',
    'Family Doctor',
    'Gastroenterology',
    'General Surgery',
    'Geriatric Medicine',
    'Gynecology',
    // Add more specialties as needed
  ]

  const alphabets = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  const getSpecialitiesByLetter = (letter) => {
    return specialities.filter((speciality) =>
      speciality.toUpperCase().startsWith(letter)
    )
  }

  const handleChildClick = (child) => {
    const formattedChild = child.trim().replace(/\s+/g, '-')
    history.push(
      `/${
        role?.toLowerCase() === 'patient' ? 'patient' : 'guest'
      }/speciality/${formattedChild.trim()}`
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Find a Doctor By Specialty</Title>
      <p>
        Choose a specialty below to find local providers, research their
        background, read patient reviews, and more.
      </p>
      <Divider />
      <Row gutter={[16, 16]}>
        {alphabets.map((letter) => (
          <Col key={letter} xs={24} sm={8}>
            <Title level={4}>
              {getSpecialitiesByLetter(letter).length > 0 && letter}
            </Title>
            {getSpecialitiesByLetter(letter).length > 0 &&
              getSpecialitiesByLetter(letter).map((speciality) => (
                <p
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleChildClick(speciality)}
                  key={speciality}>
                  {speciality}
                </p>
              ))}
          </Col>
        ))}
      </Row>
      <MenuFooter />
    </div>
  )
}

export default SpecialityDirectory
