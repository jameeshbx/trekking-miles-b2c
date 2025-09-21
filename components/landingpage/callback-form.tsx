"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface CallbackFormProps {
  destination: string
  onClose: () => void
}

export function CallbackForm({ destination, onClose }: CallbackFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const chatUrl = "https://mail.google.com/chat/u/2/#chat/dm/2viJnCAAAAE"

    // Open chat in new window
    window.open(chatUrl, "_blank")

    // You could also send this data via an API endpoint to the chat
    console.log("Callback request:", { destination, ...formData })

    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="w-full max-w-md bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-card-foreground">Request Callback</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Interested in <span className="font-semibold text-primary">{destination}</span>? We&apos;ll get back to
                you soon!
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-center text-black">
                <h1 className="text-center text-2xl font-bold text-black">{destination}</h1>
                <div>
                  <Label htmlFor="fullName" className="text-card-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                    className="bg-input border-border text-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-card-foreground">
                    Email ID
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="bg-input border-border text-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-card-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="bg-input border-border text-foreground"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Send Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
