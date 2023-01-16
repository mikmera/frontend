import React from 'react'
import './404page.scss'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <div className="figure">
      <div className="error-no">
        {' '}
        <span>4</span>
        <div className="pokeball notfound"></div>
        <span>4</span>
      </div>
      {/* make center */}
      <div className="error-text" style={{ textAlign: 'center' }}>
        <h1>페이지를 찾을수 없습니다</h1>
        <p>찾으시는게 어떤건지는 모르겠지만 아무래도 길을 잘못드신것 같아요</p>
        <Button variant="contained" onClick={handleClick}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  )
}
