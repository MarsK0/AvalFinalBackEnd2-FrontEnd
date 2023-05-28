import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Props from "./props"
import TimePicker from "../timepicker/TimePicker"
import axios, { AxiosError } from "axios"

const MessageCard: React.FC<Props> = ({ message, messageUnderEdition, setMessageUnderEdition, setIsMessageModalOpen, setRender, render }) => {
  
  function handleEdit(){
    setMessageUnderEdition(message)
    setIsMessageModalOpen(true)
  }

  async function handleDelete(){
    try{
      const response = await axios.delete(`${process.env.REACT_APP_BASEURL}/deletemessage?messageId=${message.id}`,{
        withCredentials: true
      })
  
      if(response.status === 200){
        alert("Mensagem deletada!")
        setRender(!render)
      }else{
        alert("Ocorreu um erro!")
        setRender(!render)
      }
    }catch(error){
      if(error instanceof AxiosError){
        if(error.response?.status) alert("Ocorreu um erro!")
  
        return
      }
  
      console.log(error)
    }
  }

  async function handleArchive(){
    try{

      if(message.archived){
        const response = await axios.put(`${process.env.REACT_APP_BASEURL}/unarchive`,{
          messageId: message.id
        },{
          withCredentials: true
        })

        if(response.status === 200){
          alert("Mensagem arquivada com sucesso!")
        }else{
          alert("Ocorreu um erro!")
        }

        setRender(!render)

      }else{
        const response = await axios.put(`${process.env.REACT_APP_BASEURL}/archive`,{
          messageId: message.id
        },{
          withCredentials: true
        })

        if(response.status === 200){
          alert("Mensagem arquivada com sucesso!")
        }else{
          alert("Ocorreu um erro!")
        }
        
        setRender(!render)
      }
      
    }catch(error){
      if(error instanceof AxiosError){
        if(error.response?.status) alert("Ocorreu um erro!")
  
        return
      }
  
      console.log(error)
    }
  }

  return (
    <Card sx={{ width: "30%", 
                height: "30%",
                minWidth: "350px",
                boxShadow: "1px 1px 5px 1px, -1px -1px 5px 1px #000"}}>
      <CardContent sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        <TimePicker date={message.date_message}/> 
        <Typography variant="h4" component="div">
          {message.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {message.description}
        </Typography>
      </CardContent>
      <CardActions sx={{
        display: "flex",
        justifyContent: "space-around"
      }}>
        <Button sx={{width: "33%"}} 
                variant="contained" 
                color="primary"
                onClick={handleEdit}>EDITAR</Button>
        <Button sx={{width: "33%"}} 
                variant="contained" 
                color="error"
                onClick={handleDelete}>EXCLUIR</Button>
        <Button sx={{width: "33%"}} 
                variant="contained"
                onClick={handleArchive}
                color="secondary">{message.archived?"Desarquivar":"Arquivar"}</Button>
      </CardActions>
    </Card>
  );
}

export default MessageCard