import './index.scss'
type props = {
  setWords: React.Dispatch<React.SetStateAction<String>>
}
const TextArea = ({ setWords }: props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWords(e.target.value)
  }
  return (
    <>
      <textarea
        className="text-area"
        placeholder="Paste your text here..."
        onChange={handleChange}
      />
    </>
  )
}

export default TextArea
