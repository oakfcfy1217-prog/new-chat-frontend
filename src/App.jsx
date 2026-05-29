import { useEffect, useState } from "react"
import "./chat.css"

function App() {
const [search, setSearch] = useState("")
const [messages, setMessages] = useState([])
const [previewImage, setPreviewImage] = useState("")
const [showMenu, setShowMenu] = useState(false)
const [showCalendar, setShowCalendar] = useState(false)

useEffect(() => {

  fetch("/chat.json")
    .then((res) => res.json())
    .then((data) => {
      setMessages(data)
    })

}, [])
 const uniqueDates = [
  ...new Set(messages.map(msg => msg.date))
]
  const filteredMessages = messages.filter((msg) => {
  
  if (!search) return true

  return (
    msg.text &&
    msg.text.includes(search)
  )

})

  return (
        <>
    <div className="app">

      <div className="top-bar">

  <div className="top-title">
    ੯‧̀͡⬮王王子
  </div>

  <div
    className="menu-btn"
    onClick={() => setShowMenu(!showMenu)}
  >
    ⋯
  </div>

</div>
<div className="search-bar">

  <input
    className="search-input"
    placeholder="搜索聊天记录"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

</div>
      {
  showMenu && (

    <div className="menu-popup">

      <div
        className="menu-item"
        onClick={() => {

          setShowCalendar(true)

          setShowMenu(false)

        }}
      >
        查找聊天内容
      </div>

    </div>

  )
}
      <div className="chat-area">

       {filteredMessages.map((msg, index) => (

  <>

    {
  index === 0 ||
  messages[index - 1].date !== msg.date
    ? (
      <div
  className="date-divider"
  id={msg.date}
>
        {msg.date}
      </div>
    )
    : null
}

{
  index === 0 ||
  messages[index - 1].time !== msg.time ? (

    <div className="chat-time">

      {msg.date} {msg.time}

    </div>

  ) : null
}

<div
  key={msg.id}
      className={
        msg.sender === "A"
          ? "message-row right"
          : "message-row left"
      }
    >

      {
        msg.sender === "A" ? (
          <>

            <div className="message-content">

              {
  msg.type === "text" && (
    <div
      className={
        msg.text?.includes("收款")
          ? "bubble transfer-bubble"
          : "bubble"
      }
    >
      {
        msg.reply && (

          <div className="reply-box">

            {msg.reply}

          </div>
        )
      }
      {msg.text}
    </div>
  )
}
              {
                msg.type === "image" && (
                  <img
                    className="chat-image"
                    src={msg.image}
                     onClick={() => setPreviewImage(msg.image)}
                  />
                )
              }

              {
                msg.type === "emoji" && (
                  <img
                    className="emoji-image"
                    src={msg.image}
                  />
                )
              }

              {
                msg.type === "voice" && (
                  <div className="voice-message">

                    <audio
                      controls
                      src={msg.audio}
                    >
                    </audio>

                    <span className="voice-time">
                      {msg.duration}
                    </span>

                  </div>
                )
              }
            {
  msg.type === "transfer" && (

    <div className="bubble transfer-bubble">

      💸 转账 {msg.money}

    </div>

  )
}  
{
  msg.type === "link" && (

    <div className="link-card">

      <div className="link-title">
        链接
      </div>

      <div className="link-desc">
        {msg.url}
      </div>

    </div>

  )
}
{
  msg.type === "invite" && (

    <div className="invite-card">

      <div className="invite-left">

        <div className="invite-title">
          {msg.inviteTitle}
        </div>

        <div className="invite-desc">
          {msg.inviteDesc}
        </div>

      </div>

      <img
        className="invite-image"
        src={msg.inviteImage}
      />

    </div>

  )
}
            </div>

            <img
              className="avatar"
              src="/a.jpg"
            />
          </>
        ) : (
          <>

            <img
              className="avatar"
              src="/b.jpg"
            />

            <div className="message-content">

              {
  msg.type === "text" && (
    <div
      className={
        msg.text?.includes("收款")
          ? "bubble transfer-bubble"
          : "bubble"
      }
    >
      {
        msg.reply && (

          <div className="reply-box">

            {msg.reply}

          </div>
        )
      }
      {msg.text}
    </div>
  )
}

              {
                msg.type === "image" && (
                  <img
                    className="chat-image"
                    src={msg.image}
                     onClick={() => setPreviewImage(msg.image)}
                  />
                )
              }

              {
                msg.type === "emoji" && (
                  <img
                    className="emoji-image"
                    src={msg.image}
                  />
                )
              }

              {
                msg.type === "voice" && (
                  <div className="voice-message">

                    <audio
                      controls
                      src={msg.audio}
                    >
                    </audio>

                    <span className="voice-time">
                      {msg.duration}
                    </span>

                  </div>
                )
              }
              {
  msg.type === "transfer" && (

    <div className="bubble transfer-bubble">

      💸 转账 {msg.money}

    </div>

  )
}
              
{
  msg.type === "link" && (

    <div className="link-card">

      <div className="link-title">
        链接
      </div>

      <div className="link-desc">
        {msg.url}
      </div>

    </div>

  )
}
{
  msg.type === "invite" && (

    <div className="invite-card">

      <div className="invite-left">

        <div className="invite-title">
          {msg.inviteTitle}
        </div>

        <div className="invite-desc">
          {msg.inviteDesc}
        </div>

      </div>

      <img
        className="invite-image"
        src={msg.inviteImage}
      />

    </div>

  )
}
            </div>
          </>
        )
      }
        

    </div>

  </>

))}

            </div>

    </div>

    {
      showCalendar && (

        <div className="calendar-page">

          <div className="calendar-header">

            <div
              className="calendar-back"
              onClick={() => setShowCalendar(false)}
            >
              返回
            </div>

            <div className="calendar-title">
              按日期查找
            </div>

          </div>

          <div className="calendar-grid">

            {
              uniqueDates.map((date) => (

                <div
                  className="calendar-day"
                  key={date}
                  onClick={() => {

                    setShowCalendar(false)

                    setTimeout(() => {

                      document
                        .getElementById(date)
                        ?.scrollIntoView({
                          behavior: "smooth"
                        })

                    }, 100)

                  }}
                >
                  {date}
                </div>

              ))
            }

          </div>

        </div>

      )
    }
</>
  )
}

export default App