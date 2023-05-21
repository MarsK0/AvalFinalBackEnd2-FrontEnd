import IMessage from "../../utils/interfaces/IMessage"

interface Props{
  isMessageModalOpen: boolean,
  setIsMessageModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  messageUnderEdition: IMessage | null
  setMessageUnderEdition: React.Dispatch<React.SetStateAction<IMessage | null>>
  render: boolean
  setRender: React.Dispatch<React.SetStateAction<boolean>>
}

export default Props