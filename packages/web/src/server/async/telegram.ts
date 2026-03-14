type SendMessageOptions = {
  parseMode?: "HTML" | "MarkdownV2"
  disableWebPagePreview?: boolean
}

const getBaseUrl = (token: string) => `https://api.telegram.org/bot${token}`

export const sendTelegramMessage = async (
  token: string,
  chatId: string,
  text: string,
  options?: SendMessageOptions,
) => {
  const res = await fetch(`${getBaseUrl(token)}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "chat_id": chatId,
      text,
      "parse_mode": options?.parseMode,
      "disable_web_page_preview": options?.disableWebPagePreview,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Telegram sendMessage failed: ${res.status} ${body}`)
  }
}

