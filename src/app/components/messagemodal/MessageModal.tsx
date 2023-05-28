import { Button, Box, Modal } from "@mui/material"
import Props from "./props"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"

const MessageModal: React.FC<Props> = ({ isMessageModalOpen, setIsMessageModalOpen, messageUnderEdition, setMessageUnderEdition, render, setRender }) => {

  const [date, setDate] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  useEffect(()=>{
    setDate(messageUnderEdition?messageUnderEdition.date_message:"")
    setTitle(messageUnderEdition?messageUnderEdition.title:"")
    setDescription(messageUnderEdition?messageUnderEdition.description:"")
  },[messageUnderEdition])

  function handleClose(){
    setMessageUnderEdition(null)
    setDate("")
    setTitle("")
    setDescription("")
    setIsMessageModalOpen(false)
  }

  async function handleSave(){

    if(messageUnderEdition){
      try{
        
        const response = await axios.put(`${process.env.REACT_APP_BASEURL}/editmessage`,{
          messageId: messageUnderEdition.id,
          date,
          title,
          description
        },{
          withCredentials: true
        })
  
        if(response.status === 200){
          setMessageUnderEdition(null)
          setDate("")
          setTitle("")
          setDescription("")
          setIsMessageModalOpen(false)
          alert("Mensagem editada com sucesso!")
          setRender(!render)
        }else{
          setMessageUnderEdition(null)
          setDate("")
          setTitle("")
          setDescription("")
          setIsMessageModalOpen(false)
          alert("Ocorreu um erro, tente novamente!")
          setRender(!render)
        }
      }catch(error){
        if(error instanceof AxiosError){
          if(error.response?.status) alert("Informações inválidas!")
    
          return
        }
    
        console.log(error)
      }

    }else{
      try{

        const response = await axios.post(`${process.env.REACT_APP_BASEURL}/createmessage`,{
          date,
          title,
          description
        },{
          withCredentials: true
        })
  
        if(response.status === 201){
          setMessageUnderEdition(null)
          setDate("")
          setTitle("")
          setDescription("")
          setIsMessageModalOpen(false)
          alert("Mensagem criada com sucesso!")
          setRender(!render)
        }
        else{
          setMessageUnderEdition(null)
          setDate("")
          setTitle("")
          setDescription("")
          setIsMessageModalOpen(false)
          alert("Ocorreu um erro, tente novamente!")
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
  }

  return(
    <>
      <Modal open={isMessageModalOpen} sx={{
        width:"100%",
        height: "100%",
        display:"flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <>
        <Box component="form" onSubmit={()=>{/* Função async pra tratar criação/modificação de recado */}} sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                height: "400px",
                width: "350px",
                boxShadow: "1px 1px 5px 1px, -1px -1px 5px 1px #000",
                padding: "20px",
                background: "#fff"}}>
          <input style={{
            width: "100%",
            height: "40px",
            padding: "10px",
            border: "1px solid rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
            fontSize: "1.1rem"
          }} 
          type="datetime-local"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setDate(e.target.value)}}/>
          <input style={{
            width: "100%",
            height: "40px",
            padding: "10px",
            border: "1px solid rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
            fontSize: "1.1rem",
          }}
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}/>
          <textarea style={{
            width: "100%",
            padding: "10px",
            border: "1px solid rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
            fontSize: "1.1rem",
            resize: "none"
          }}
          placeholder="Descrição"
          cols={20}
          rows={8}
          maxLength={255}
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {setDescription(e.target.value)}}/>
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap:"10px"
          }}>
            <Button variant="contained" 
                    color="error" 
                    sx={{width:"50%"}}
                    onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" 
                    color="success" 
                    sx={{width:"50%"}}
                    onClick={handleSave}>Salvar</Button>
          </Box>
        </Box>
        </>
      </Modal>
    </>
  )
}

export default MessageModal