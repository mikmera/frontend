import { Box, Button, ButtonGroup, Divider, Grid } from '@mui/material'
import { wrapError } from '~/components/ErrorBoundary'

const gridStyle = {
  left: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}
export const FieldSelector: React.FC = wrapError(() => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
        padding: 1,
        width: 450,
        textAlign: 'center',
      }}
    >
      <ButtonGroup variant="outlined">
        <Button>싱글</Button>
        <Button>더블</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" sx={{ marginTop: 1 }}>
        <Button>일렉트릭 필드</Button>
        <Button>그래스 필드</Button>
        <Button>미스트 필드</Button>
        <Button>사이코 필드</Button>
      </ButtonGroup>
      <Divider sx={{ marginTop: 1 }} />
      <ButtonGroup variant="outlined" sx={{ marginTop: 1 }}>
        <Button>날씨 없음</Button>
        <Button>쾌청</Button>
        <Button>비</Button>
        <Button>모래바람</Button>
        <Button>설경</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" sx={{ marginTop: 1 }}>
        <Button>매직룸</Button>
        <Button>원더룸</Button>
        <Button>중력</Button>
      </ButtonGroup>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
      <Grid container spacing={1}>
        <Grid item xs={6} sx={gridStyle.left}>
          <ButtonGroup variant="outlined">
            <Button>스텔스록</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>0</Button>
            <Button>1</Button>
            <Button>2</Button>
            <Button>3 압정</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>빛의장막</Button>
            <Button>리플렉터</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>씨뿌리기</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>도우미</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>순풍</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>플라워기프트</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>프렌드가드</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>오로라베일</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>충전</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>파워스폿</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6} sx={gridStyle.right}>
          <ButtonGroup variant="outlined">
            <Button>스텔스록</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>3 압정</Button>
            <Button>2</Button>
            <Button>1</Button>
            <Button>0</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>빛의장막</Button>
            <Button>리플렉터</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>씨뿌리기</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>도우미</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>순풍</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>플라워기프트</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>프렌드가드</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>오로라베일</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>충전</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button>파워스폿</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>
  )
})
