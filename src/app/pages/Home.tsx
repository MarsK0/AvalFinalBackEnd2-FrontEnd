import Navbar from "../components/navbar/Navbar"
import MessageCard from "../components/messagecard/MessageCard"
import Box from '@mui/material/Box';
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import IMessage from "../utils/interfaces/IMessage"
import MessageModal from "../components/messagemodal/MessageModal"



const Home: React.FC = () => {

  const [render, setRender] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>()
  const [archived, setArchived] = useState<boolean>(false)
  const [messages, setMessages] = useState<Array<IMessage>>()
  const [messageUnderEdition, setMessageUnderEdition] = useState<IMessage | null>(null)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false)
  
  async function getMessages(){
    try{
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/getmessages?archived=${archived}&filter=${filter?filter:""}`,{
        withCredentials:true
      })
      
      const unarchivedMessages = response.data as Array<IMessage>
      setMessages(unarchivedMessages)  
    }catch(error){
      if(error instanceof AxiosError){
        if(error.response?.status) alert("Ocorreu um erro!")
  
        return
      }
  
      console.log(error)
    }
  }

  useEffect(() => {
    getMessages()
  },[filter, render, archived])

  return(
    <>
      <MessageModal isMessageModalOpen={isMessageModalOpen} 
                    setIsMessageModalOpen={setIsMessageModalOpen}
                    messageUnderEdition={messageUnderEdition}
                    setMessageUnderEdition={setMessageUnderEdition}
                    render={render}
                    setRender={setRender}/>

      <Navbar setFilter={setFilter}
              setIsMessageModalOpen={setIsMessageModalOpen}
              archived={archived}
              setArchived={setArchived}/>
              
      <Box sx={{display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
                padding: "20px"}}>
        {Array.isArray(messages) && messages.length > 0 &&
          messages.map((message, messageIndex) => (
            <MessageCard key={messageIndex}
                         message={message}
                         setIsMessageModalOpen={setIsMessageModalOpen}
                         messageUnderEdition={messageUnderEdition}
                         setMessageUnderEdition={setMessageUnderEdition}
                         render={render}
                         setRender={setRender}/>
          ))}
      </Box>
    </>
  )
}

export default Home