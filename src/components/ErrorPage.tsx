import { Button, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '~/styles/404page.scss'

const ErrorCode = {
  '401': {
    title: '로그인이 필요해요',
    message:
      '이곳은 트레이너 전용 구역이에요! 어서 포켓몬센터의 PC에서 로그인해주세요',
  },
  '403': {
    title: '접근 권한이 없어요',
    message:
      '여기는 탐험할 수 없는 구역이에요! 접근하려면 특별한 배지가 필요할 것 같아요',
  },
  '404': {
    title: '페이지를 찾을 수 없어요',
    message: '앗! 야생의 페이지가 도망쳤다',
  },
  '500': {
    title: '서버에 문제가 발생했어요',
    message:
      '서버가 혼란에 빠져 영문도 모른체 자신을 공격한것 같아요, 잠시후 다시 시도해보세요',
  },
  '503': {
    title: '서비스를 현재 사용할 수 없어요',
    message: '열심히 일한 미끄메라는 잠시 포켓몬센터에서 휴식중이랍니다',
  },
}

export interface ErrorPageProps {
  code: '401' | '403' | '404' | '500' | '503'
}

export const Pokeball: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return <div className={`pokeball notfound ${isMobile ? 'mobile' : ''}`}></div>
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ code }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div className="figure">
      <div className="error-no">
        <span className={`error-digit ${isMobile ? 'mobile' : ''}`}>
          {code?.[0]}
        </span>
        {/** when code[1] === 0 then pokeball else just code[1]*/}
        {code?.[1] === '0' ? (
          <Pokeball />
        ) : (
          <span className={`error-digit ${isMobile ? 'mobile' : ''}`}>
            {code?.[1]}
          </span>
        )}
        <span className={`error-digit ${isMobile ? 'mobile' : ''}`}>
          {code?.[2]}
        </span>
      </div>
      <div className="error-text" style={{ textAlign: 'center' }}>
        <h1>{ErrorCode[code].title}</h1>
        <p>{ErrorCode[code].message}</p>
        <Button variant="contained" onClick={handleClick}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  )
}
