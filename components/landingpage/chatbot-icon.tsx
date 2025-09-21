"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you plan your next adventure?", sender: "bot" },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = { id: Date.now(), text: message, sender: "user" }
    setMessages((prev) => [...prev, newMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "Thanks for your message! Our travel experts will get back to you soon. You can also call us at 9447046426 for immediate assistance.",
        sender: "bot",
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setMessage("")
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.div
  className="fixed bottom-6 right-6 z-50"
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
>
  <motion.div
    animate={{
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatDelay: 5,
    }}
  >
    <Button
      onClick={() => setIsOpen(!isOpen)}
      size="lg"
      className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative"
    >
      {/* Pulsing ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-green-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
      
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="h-6 w-6" />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MessageCircle className="h-6 w-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  </motion.div>
</motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)]"
          >
            <Card className="bg-card border-border shadow-2xl bg-white text-black">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="text-lg">Travel Assistant</CardTitle>
                <p className="text-sm text-primary-foreground/80">We&apos;re here to help!</p>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 bg-input border-border text-foreground"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-orange-800 hover:bg-primary/90 text-primary-foreground"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
