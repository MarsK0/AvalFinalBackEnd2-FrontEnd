import * as React from "react"
import { styled, alpha } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import Button from "@mui/material/Button"
import Props from "./props"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar: React.FC<Props> = ({ setFilter, setIsMessageModalOpen, archived, setArchived }) => {

  const navigate = useNavigate()

  async function handleLogout(){
    const response = await axios.post(`${process.env.REACT_APP_BASEURL}/logout`,{
      withCredentials: true
    })

    if(response.status === 200){
      return navigate("/signin")
    }else{
      return alert("Ocorreu um erro ao realizar o logout!")
    }


  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{padding: "10px 0"}}>
        <Toolbar>
          <Box sx={{display: "flex",
                    alignItems: "center"}}>
            <Search sx={{width: "50%", height: "50%"}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setFilter(e.target.value)}}
              />
            </Search>
            <Box sx={{width:"200px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px"}}>
              <Button variant="contained" 
                      color="secondary"
                      onClick={()=>setArchived(!archived)}>{archived?"Desarquivadas":"Arquivadas"}</Button>
              <Button variant="contained" color="success" onClick={()=>setIsMessageModalOpen(true)}>Novo Recado</Button>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex"}}>
            <IconButton
              size="large"
              edge="end"
              aria-label="Logout"
              aria-haspopup="true"
              onClick={handleLogout}
              color="inherit"
            >
              <img src={`${process.env.PUBLIC_URL}/icons/logout.png`} width={"30px"} height={"30px"}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )

}

export default Navbar