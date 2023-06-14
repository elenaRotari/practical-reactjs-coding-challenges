import './index.scss'
import { pronouns } from '../../data/pronouns'

type props = {
  words: String
}

const pron = (pro: string[], text: String) => {
  const smallCase = text
    .toLowerCase()
    .split('?')
    .join(' ')
    .split(' ')
    .join(' ')
    .split('\n')
    .join(' ')
    .split(' ')

  let res = []
  smallCase.forEach((el: any) => {
    if (pro.includes(el)) {
      console.log(el)

      return res.push(el)
    }
  })
  return res.length
}

// console.log(pron(pronouns, 'I love You puiu'))

const ResultBox = ({ words }: props) => {
  const resultBar = [
    {
      title: 'Words',
      value: words.split(' ').length,
    },
    {
      title: 'Characters',
      value: words.length,
    },
    {
      title: 'Sentences',
      value: words.split('.').length,
    },
    {
      title: 'Paragraphs ',
      value: words.split('\n\n').length,
    },
    {
      title: 'Pronouns',
      value: pron(pronouns, words),
    },
  ]

  return (
    <div className="result-bar">
      {resultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default ResultBox
