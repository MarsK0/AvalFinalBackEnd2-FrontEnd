import IMessage from "../../utils/interfaces/IMessage"

interface Props{
  message: IMessage
  setMessageUnderEdition: React.Dispatch<React.SetStateAction<IMessage | null>>
  messageUnderEdition: IMessage | null,
  setIsMessageModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  render: boolean
  setRender: React.Dispatch<React.SetStateAction<boolean>>
}

export default Props