import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { Grid } from '@mui/material'
import { apiUrl } from '~/util'

export const UserRankTable: React.FC = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={6}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={apiUrl('/v1/sprites/role/0')}
                imgProps={{ crossOrigin: 'anonymous' }}
              />
            </ListItemAvatar>
            <ListItemText
              primary="스트레인지볼"
              secondary="계정정지상태 혹은 로그인되지 않은 유저입니다"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={apiUrl('/v1/sprites/role/1')}
                imgProps={{ crossOrigin: 'anonymous' }}
              />
            </ListItemAvatar>
            <ListItemText
              primary="몬스터볼"
              secondary="최초 가입시 배정되는 등급입니다"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={apiUrl('/v1/sprites/role/2')}
                imgProps={{ crossOrigin: 'anonymous' }}
              />
            </ListItemAvatar>
            <ListItemText
              primary="슈퍼볼"
              secondary="열심히 활동하시는 분들을 위한 슈퍼볼입니다"
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={apiUrl('/v1/sprites/role/3')}
                imgProps={{ crossOrigin: 'anonymous' }}
              />
            </ListItemAvatar>
            <ListItemText
              primary="하이퍼볼"
              secondary="열심히 활동하시는 분들을 위한 하이퍼볼입니다"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={apiUrl('/v1/sprites/role/4')}
                imgProps={{ crossOrigin: 'anonymous' }}
              />
            </ListItemAvatar>
            <ListItemText
              primary="울트라볼"
              secondary="포케지지를 위해 열심히 기여해주신 분들입니다"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={apiUrl('/v1/sprites/role/9')}
                imgProps={{ crossOrigin: 'anonymous' }}
              />
            </ListItemAvatar>
            <ListItemText
              primary="마스터볼"
              secondary="포케지지의 관리진입니다"
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}
