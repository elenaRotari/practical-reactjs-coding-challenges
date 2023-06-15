import Slider from 'rc-slider'
import { useEffect, useState } from 'react'
import passwordGif from '../../assets/gif/password.gif'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg'
import Checkbox from '../Checkbox'
import 'rc-slider/assets/index.css'
import './index.css'

type state = {
  data: string
  upper: boolean
  lower: boolean
  numbers: boolean
  specialChars: boolean
  isShort: boolean
}

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8)
  const [password, setPassword] = useState<state>({
    data: 'B95hQL$%',
    upper: false,
    lower: true,
    numbers: false,
    specialChars: false,
    isShort: passwordLength < 8,
  })

  const onChangePasswordLength = (value: number | number[]) => {
    setPasswordLength(value as number)
    setPassword((prev) => (prev = { ...prev, isShort: passwordLength < 8 }))
  }
  const letters: string = 'abcdefghijklmnopqrstuvwxyz'
  const lettersCap: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const special: string = '!@#$%^&*()-_=+'
  const numbers: string = '0123456789'

  const generatePass = () => {
    let result: string = ''
    const myCharachters = {
      [letters]: password.lower,
      [lettersCap]: password.upper,
      [special]: password.specialChars,
      [numbers]: password.numbers,
    }

    const filtered = Object.entries(myCharachters)
      .filter((el) => el[1])
      .map((el) => el[0])
      .join('')
    for (let i = 0; i < passwordLength; i++) {
      const random = Math.floor(Math.random() * filtered.length)
      result += filtered[random]
    }
    setPassword((prev) => (prev = { ...prev, data: result }))
  }

  const changeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => (prev = { ...prev, [e.target.name]: e.target.checked }))
  }
  const checkStrogness = () => {
    const strogness = [
      password.lower,
      password.upper,
      password.numbers,
      password.specialChars,
    ].filter((el) => el).length

    return strogness === 2
      ? { text: 'Weak', color: 'red' }
      : strogness === 3
      ? { text: 'Medium', color: 'orange' }
      : strogness === 4
      ? { text: 'Hard', color: 'green' }
      : { text: 'To Short', color: 'red' }
  }
  useEffect(() => {
    if (!password.upper && !password.numbers && !password.specialChars) {
      setPassword((prev) => (prev = { ...prev, lower: true }))
    }
  }, [password.upper, password.numbers, password.specialChars])

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" value={password.data} />
          <Refresh onClick={generatePass} />
        </div>
        <button className="copy-btn">
          <Copy /> Copy
        </button>
      </div>
      <span className="fw-500" style={{ color: checkStrogness().color }}>
        {password.isShort ? 'To Short' : checkStrogness().text}
      </span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox
          id="uppercase"
          label="Uppercase"
          checked={password.upper}
          name="upper"
          onChange={changeChecked}
        />
        <Checkbox
          id="lowercase"
          label="Lowercase"
          checked={password.lower}
          name="lower"
          onChange={changeChecked}
        />
        <Checkbox
          id="numbers"
          label="Numbers"
          checked={password.numbers}
          name="numbers"
          onChange={changeChecked}
        />
        <Checkbox
          id="special chars"
          label="Special Characters"
          checked={password.specialChars}
          name="specialChars"
          onChange={changeChecked}
        />
      </div>
    </div>
  )
}

export default PasswordGenerator
