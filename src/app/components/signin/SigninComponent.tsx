import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Link } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { TSigninSchema, SigninSchema } from "../../utils/validations/signin"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const theme = createTheme();

const SigninComponent: React.FC = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TSigninSchema>({
    resolver: zodResolver(SigninSchema)
  })

  async function handleSignin({ username, password }:TSigninSchema){
    try{
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/login`,{
        username,
        password
      },{
        withCredentials: true
      })

      if(response.status === 200) navigate("/")

      if(response.status === 500) alert("Erro na tentativa de login!")


    }catch(error){
      if(error instanceof AxiosError){
        if(error.response?.data.message) alert(error.response.data.message)
        return
      }
  
      console.log(error)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleSignin)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuário"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register("username")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              id="password"
              type="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid >
              <Grid sx={{width: "100%",
                         display: "flex",
                         flexDirection: "column",
                         alignItems: "center"}}>
                <Link to={"/signup"}>
                  Não possui conta? Cadastre-se!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SigninComponent