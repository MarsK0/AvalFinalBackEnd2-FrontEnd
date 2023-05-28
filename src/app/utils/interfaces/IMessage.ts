interface IMessage{
  id: string,
  archived: boolean,
  userId: string,
  date_message: string,
  title: string,
  description: string,
}

export default IMessage