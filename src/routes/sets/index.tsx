import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import {
  Input,
  FormControl,
  InputAdornment,
  Button,
  CardActions,
  CardContent,
  Typography,
  Card,
  Avatar,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import searchIcon from '~/assets/images/search.svg'

export const SetsView: React.FC = wrapError(() => {
  const card = (
    <Card sx={{ minWidth: '330px', maxWidth: '400px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          존불 일격필살 괴력몬
          <Avatar
            sx={{ float: 'right', width: 72, height: 72 }}
            src="https://w.namu.la/s/e0aa91ad2cbdbdf6bf942c7f268c968a886794bbca7e45fc21c1d2f8ca03466883a6a7d4f0eaa8be8d6eaf2bdf32e5bd4b9f97883a7f48c864066ef760f2d186f8c5f0857d403a88da9494dca23ae07093180eb157583d3a630aecfdead7ecfc07cde270d669adc55a79f69f0dd18e0e"
          />
        </Typography>
        <Avatar
          sx={{ float: 'right', width: 32, height: 32 }}
          src="https://www.serebii.net/itemdex/sprites/pgl/choicescarf.png"
        />
        <Typography variant="h5" component="div" sx={{ wordBreak: 'keep-all' }}>
          괴력몬
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          @구애스카프
        </Typography>
        <Typography variant="body2">
          특성: 노가드
          <br />
          성격: 명랑
          <br />
          개체값: VVVVVV
          <br />
          노력치: AS252 H6
        </Typography>
        <Typography variant="body2">
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table sx={{ width: '100%', textAlign: 'left' }} size="small">
              <TableBody>
                <TableRow>
                  <TableCell align="left" sx={{ width: '22px' }}>
                    <Avatar
                      sx={{ width: 20, height: 20 }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa96H_h4g735h8p0ciVKgpq3LUwkBUBYM0s1ytzPjBe4vf1FzKrfU-DHUnkkelakUfPug&usqp=CAU"
                    />
                  </TableCell>
                  <TableCell align="left">대충물리기</TableCell>
                  <TableCell>
                    <Avatar
                      sx={{ width: 30, height: 20 }}
                      src="https://img.pokemondb.net/images/icons/move-physical.png"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Avatar
                      sx={{ width: 20, height: 20 }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/1200px-Pok%C3%A9mon_Ground_Type_Icon.svg.png"
                    />
                  </TableCell>
                  <TableCell align="left">대충물리기</TableCell>
                  <TableCell>
                    <Avatar
                      sx={{ width: 30, height: 20 }}
                      src="https://img.pokemondb.net/images/icons/move-physical.png"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Avatar
                      sx={{ width: 20, height: 20 }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/2048px-Pok%C3%A9mon_Ice_Type_Icon.svg.png"
                    />
                  </TableCell>
                  <TableCell>대충변화기</TableCell>
                  <TableCell>
                    <Avatar
                      sx={{ width: 30, height: 20 }}
                      src="https://img.pokemondb.net/images/icons/move-special.png"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Avatar
                      sx={{ width: 20, height: 20 }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa96H_h4g735h8p0ciVKgpq3LUwkBUBYM0s1ytzPjBe4vf1FzKrfU-DHUnkkelakUfPug&usqp=CAU"
                    />
                  </TableCell>
                  <TableCell>대충특수기</TableCell>
                  <TableCell>
                    <Avatar
                      sx={{ width: 30, height: 20 }}
                      src="https://img.pokemondb.net/images/icons/move-status.png"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )

  const rendering = () => {
    const result = []
    for (let i = 0; i < 100; i++) {
      result.push(
        <Grid
          xs={6}
          md={2}
          mdOffset={0}
          sx={{ minWidth: '350px', maxWidth: '400px' }}
        >
          <Card variant="outlined">{card}</Card>
        </Grid>
      )
    }
    return result
  }

  return (
    <Box>
      <Box
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        mt={4}
        mb={4}
      >
        <FormControl variant="outlined" sx={{ width: '70%' }}>
          <Input
            id="input-with-icon-adornment"
            placeholder="검색"
            startAdornment={
              <InputAdornment position="start">
                <img src={searchIcon} />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box>
        <Grid
          container
          spacing={3}
          sx={{
            flexGrow: 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginLeft: 0,
          }}
        >
          {rendering()}
        </Grid>
      </Box>
    </Box>
  )
})
