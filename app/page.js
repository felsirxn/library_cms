"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { Search, Zap, Cpu, Globe, Database, Wifi } from "lucide-react"

const MOCK_BOOKS = [
  { id: 1, title: "Neural Networks & Deep Learning", author: "Dr. A. Turing", copies_available: 5, rating: 4.5 },
  { id: 2, title: "The Martian Chronicles 2099", author: "Ray Bradbury AI", copies_available: 2, rating: 4.5 },
  { id: 3, title: "Quantum Computing for Beginners", author: "Schrodinger's Cat", copies_available: 0, rating: 4.9 },
  { id: 4, title: "Cybersecurity in the Metaverse", author: "Neo Anderson", copies_available: 12, rating: 4.2 },
  { id: 5, title: "Sustainable Energy Systems", author: "Elon Musk V2", copies_available: 8, rating: 4.5 },
  { id: 6, title: "Designing for AR/VR Interfaces", author: "Jony Ive Holo", copies_available: 3, rating: 4.6 },
  { id: 7, title: "History of the Internet (Ancient)", author: "Tim Berners-Lee", copies_available: 1, rating: 5.0 },
  { id: 8, title: "Robotics Engineering 101", author: "Asimov Bot", copies_available: 6, rating: 4.3 },
  { id: 9, title: "Space Mining Logistics", author: "Weyland Yutani", copies_available: 4, rating: 4.3},
  { id: 10, title: "Synthetic Biology Ethics", author: "Dr. Frankenstein", copies_available: 9, rating: 4.5 },
]

export default function Home() {
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [hoveredBook, setHoveredBook] = useState(null)

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data, error } = await supabase
          .from("books")
          .select("*")

        if (error || !data || data.length === 0) {
          // Fallback to mock data if Supabase fails or is empty
          console.log("Using futuristic mock data")
          setBooks(MOCK_BOOKS)
        } else {
          setBooks(data)
        }
      } catch (err) {
        console.error("Error:", err)
        setBooks(MOCK_BOOKS)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const filteredBooks = books.filter((book) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      book.title?.toLowerCase().includes(searchLower) ||
      book.author?.toLowerCase().includes(searchLower)
    )
  })

  // Neon gradients for futuristic covers
  const getGradient = (id) => {
    const gradients = [
      "from-cyan-500 to-blue-600",
      "from-fuchsia-500 to-purple-600",
      "from-emerald-400 to-teal-600",
      "from-rose-500 to-pink-600",
      "from-violet-500 to-indigo-600",
      "from-amber-400 to-orange-600",
    ]
    return gradients[id % gradients.length]
  }

  return (
    <div className="min-h-screen bg-black text-cyan-50 font-mono selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden relative">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      
      {/* Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-black border border-cyan-500/50 p-2 rounded-lg">
                <Database className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                BukuGo <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">v2.0</span>
              </h1>
              <p className="text-[10px] text-cyan-500/60 uppercase tracking-widest">
                Neural Library System
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
              <Search className="h-4 w-4 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <Input
              type="text"
              placeholder="Query database..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 bg-black/50 border-white/10 text-cyan-100 placeholder:text-cyan-900 focus:bg-black/80 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all rounded-none font-mono text-sm"
            />
            {/* Animated Scan Line */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-cyan-500 w-0 group-focus-within:w-full transition-all duration-700 ease-out" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Stats / Dashboard Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "System Status", value: "ONLINE", icon: Wifi, color: "text-emerald-400" },
            { label: "Active Nodes", value: "8,432", icon: Cpu, color: "text-blue-400" },
            { label: "Global Access", value: "UNRESTRICTED", icon: Globe, color: "text-purple-400" },
            { label: "Power Load", value: "98%", icon: Zap, color: "text-amber-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-sm backdrop-blur-sm flex items-center justify-between group hover:border-white/10 transition-colors">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.color} font-mono`}>{stat.value}</p>
              </div>
              <stat.icon className={`h-5 w-5 ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
            </div>
          ))}
        </div>

        {/* Collection Header */}
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            DATA_ARCHIVE
          </h2>
          <div className="flex items-center gap-4 text-xs font-mono text-cyan-500/60">
            <span>ENTRIES: {filteredBooks.length}</span>
            <span>//</span>
            <span>LATENCY: 12ms</span>
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-white/5 animate-pulse rounded-sm border border-white/5" />
            ))}
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-sm">
            <p className="text-cyan-500/50 font-mono">NO_MATCHES_FOUND_IN_ARCHIVE</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book, idx) => (
              <div
                key={book.id || idx}
                className="group relative h-48 bg-black border border-white/10 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
              >
                {/* Background Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(idx)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-mono text-cyan-500/50 border border-cyan-500/20 px-1.5 py-0.5 rounded-sm">
                        ID_{String(book.id).padStart(4, '0')}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${(book.copies_available || 0) > 0 ? 'bg-emerald-500' : 'bg-red-500'} shadow-[0_0_8px_currentColor]`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {book.title || "Unknown_Data"}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      by {book.author || "Unknown_Entity"}
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="text-[10px] text-slate-500">
                      RATING: <span className="text-cyan-400">{book.rating || "N/A"}</span>/5.0
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-[10px] font-bold py-1 px-3 border border-cyan-500/30">
                      ACCESS_FILE
                    </button>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-cyan-500 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-cyan-500 transition-colors" />

                {/* Scan Line Effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/50 shadow-[0_0_10px_#22d3ee] -translate-y-full group-hover:translate-y-[12rem] transition-transform duration-1000 ease-linear opacity-0 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Futuristic Footer */}
      <footer className="border-t border-white/10 bg-black py-8 relative z-10">
        <div className="container mx-auto px-6 flex justify-between items-center text-[10px] text-slate-600 font-mono">
          <p>SYSTEM_VERSION: 2.0.45-BETA</p>
          <div className="flex gap-4">
            <span className="hover:text-cyan-500 cursor-pointer">TERMS</span>
            <span className="hover:text-cyan-500 cursor-pointer">PRIVACY</span>
            <span className="hover:text-cyan-500 cursor-pointer">CONTACT_ADMIN</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
