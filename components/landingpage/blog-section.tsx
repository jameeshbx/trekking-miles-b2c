"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia You Must Visit",
    image: "/images/blog.png",
    excerpt:
      "Discover breathtaking destinations off the beaten path that offer authentic cultural experiences and stunning natural beauty.",
    author: "Sarah Johnson",
    date: "January 15, 2025",
    readTime: "5 min read",
    category: "Destinations",
  },
  {
    id: 2,
    title: "Essential Packing Guide for Himalayan Treks",
    image: "/images/blog1.png",
    excerpt:
      "Everything you need to know about packing for high-altitude adventures, from clothing layers to essential equipment.",
    author: "Mike Chen",
    date: "January 12, 2025",
    readTime: "8 min read",
    category: "Trekking",
  },
  {
    id: 3,
    title: "Best Street Food Adventures in Asia",
    image: "/images/blog2.png",
    excerpt:
      "A culinary journey through Asia's most vibrant street food scenes, from Bangkok's floating markets to Tokyo's night stalls.",
    author: "Priya Sharma",
    date: "January 10, 2025",
    readTime: "6 min read",
    category: "Food & Culture",
  },
]

export default function BlogSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Travel Stories & Tips
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Get inspired by our latest travel stories, expert tips, and insider guides to make your next adventure
            unforgettable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border bg-white text-black h-full">
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </div>
                </div>

                <CardContent className="p-6 bg-card text-card-foreground flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-card-foreground mb-3 text-balance group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 text-pretty flex-1">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded">{post.readTime}</span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground group bg-transparent"
                    onClick={() => {
                      const message = `Hi, I'm interested in the blog post "${post.title}". Can you provide more details?`;
                      window.open(`https://api.whatsapp.com/send?phone=919447046426&text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 bg-transparent"
          >
            View All Posts
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
