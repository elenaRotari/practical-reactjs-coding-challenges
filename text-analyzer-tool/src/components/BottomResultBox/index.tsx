import './index.scss'
type props = {
  words: String
}

const average = (str: String) => {
  let split = str.split(' ').length

  const res = Math.ceil((split * 0.6) / 225)

  return `~  ${res} minute`
}

const longWord = (str: String) => {
  const split = str
    .toLowerCase()
    .split('?')
    .join(' ')
    .split(' ')
    .join(' ')
    .split('\n')
    .join('')
    .split(' ')
  const sort = split.sort((a, b) => a.length - b.length)[split.length - 1]
  return sort
}

const BottomResultBox = ({ words }: props) => {
  const bottomResultBar = [
    {
      title: 'Average Reading Time:',
      value: average(words),
    },
    {
      title: 'Longest word:',
      value: longWord(words),
    },
  ]

  return (
    <div className="bottom-result-bar">
      {bottomResultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox
