import { Dispatch, SetStateAction } from "react"

interface Props{
  setFilter: React.Dispatch<React.SetStateAction<string | undefined>>
  setIsMessageModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  archived: boolean
  setArchived: React.Dispatch<React.SetStateAction<boolean>>
}

export default Props