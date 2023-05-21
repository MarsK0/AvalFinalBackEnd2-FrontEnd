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
import { TSignupSchema, SignupSchema } from "../../utils/validations/signup"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

const theme = createTheme();

const SignupComponent: React.FC = () => {

  const navigate = useNavigate()

  async function handleSignup({ username, password, repeatPassword }: TSignupSchema){
    try{
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/createuser`,{
        username,
        password,
        repeatPassword
      },{
        withCredentials: true
      })
  
      if(response.status === 201){
        navigate("/signin")
      }
  
      if(response.status === 500){
        alert("Erro na tentativa de cadastro!")
      }
    
    }catch(error){
      if(error instanceof AxiosError){
        if(error.response?.data.message) alert(error.response.data.message)
        return
      }
  
      console.log(error)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TSignupSchema>({
    resolver: zodResolver(SignupSchema)
  })

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
            Cadastrar
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(handleSignup)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Usuário"
                  autoComplete="username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  {...register("username")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Senha"
                  type="password"
                  autoComplete="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Repita a senha"
                  type="password"
                  id="repeatPassword"
                  autoComplete="repeatPassword"
                  error={!!errors.repeatPassword}
                  helperText={errors.repeatPassword?.message}
                  {...register("repeatPassword")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to={"/signin"}>
                  Já possui conta? Entre!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignupComponent