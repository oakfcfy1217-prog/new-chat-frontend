const fs = require("fs")

const txt = fs.readFileSync(
  "./chat.txt",
  "utf-8"
)

const lines = txt.split("\n")

const messages = []

let id = 1

lines.forEach((line) => {

  if (!line.trim()) return

  const parts = line.split(" - ")

  if (parts.length < 3) return

  const datetime = parts[0]

  const sender = parts[1]

  const content = parts.slice(2).join(" - ")

  let reply = ""

  let pureContent = content

  // 引用回复
  if (content.includes(" - reply：")) {

    const replySplit =
      content.split(" - reply：")

    pureContent = replySplit[0]

    reply = replySplit[1]?.trim() || ""

  }

  // 支持中英文冒号
  const typeSplit =
    pureContent.split(/[:：]\s*/)

  if (typeSplit.length < 2) return

  const type = typeSplit[0].trim()

  const value =
    typeSplit.slice(1).join(": ").trim()

  const date =
    datetime.split(" ")[0]

  const time =
    datetime.split(" ")[1]

  const msg = {

    id: id++,

    sender,

    type,

    time,

    date,

    reply

  }

  // 文字
  if (type === "text") {
    msg.text = value
  }

  // 图片
  if (type === "image") {
    msg.image = "/" + value
  }

  // emoji
  if (type === "emoji") {
    msg.image = "/" + value
  }

  // 语音
  if (type === "voice") {
    msg.audio = "/" + value
    msg.duration = "6''"
  }

  // 转账
  if (type === "transfer") {
    msg.money = value
  }

  // 链接
  if (type === "link") {

    msg.url = value

    msg.title = "网页链接"

    msg.desc = value

    msg.linkImage = "/link.jpg"

  }

  // 文件
  if (type === "file") {
    msg.file = value
  }

  messages.push(msg)

})

fs.writeFileSync(

  "./public/chat.json",

  JSON.stringify(
    messages,
    null,
    2
  )

)

console.log("聊天记录转换成功！")