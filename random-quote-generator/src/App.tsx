import classnames from "classnames"
import { useEffect, useState } from "react"

import axios from "axios"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import "./App.css"
// import dataJson from "./db.json

type quoteType = {
  quote: string
  author: string
}
type axiosData = {
  status: number
  data: quoteType[]
}
const shuffleQuotes = (arr: quoteType[]) => {
  const shuffle: quoteType[] = []
  while (arr.length > 0) {
    const random = Math.floor(Math.random() * arr.length)
    shuffle.push(arr[random])
    // arr = [...arr.slice(0, random), ...arr.slice(random + 1)]
    arr = arr.filter((el, i) => i !== random)
  }
  return shuffle
}
function App() {
  const [quoteList, setQuoteList] = useState<axiosData>({
    status: 500,
    data: [],
  })
  const [indexQuote, setIndexQuote] = useState<number>(0)
  useEffect(() => {
    axios
      .get("/db/db.json")
      .then((res) => {
        if (res.status === 200) {
          setQuoteList({ status: 200, data: shuffleQuotes(res.data.quotes) })
        } else {
          setQuoteList({ status: 404, data: [] })
        }
      })

      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <header>
        <div className="top-strip" />
      </header>
      <div className="container">
        {quoteList.status !== 200 ? (
          <div style={{ marginTop: "200px", fontSize: "32px" }}>Loading...</div>
        ) : (
          <div className="quotation-box ">
            <Quotation />
            <div className="quote">
              <p>{quoteList.data[indexQuote]?.quote}</p>
              <span>- {quoteList.data[indexQuote]?.author}</span>
            </div>
            <div className="bottom-navigation">
              <div>
                <Button
                  className={classnames("rotate cp")}
                  onClick={() =>
                    setIndexQuote((prev) => (prev = prev === 0 ? 0 : prev - 1))
                  }
                />
                <Button
                  className="cp"
                  onClick={() =>
                    setIndexQuote(
                      (prev) =>
                        (prev =
                          prev === quoteList.data.length - 1 ? prev : prev + 1)
                    )
                  }
                />
              </div>
              <div className="share">
                <span>Share At:</span>
                <Twitter title="Post this quote on twitter!" className="cp" />
                <Whatsapp title="Post this quote on WhatsApp!" className="cp" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bottom-strip" />
    </>
  )
}

export default App
