"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Github,
  Linkedin,
  ExternalLink,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  ArrowRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
}

interface Experience {
  id: number
  company: string
  position: string
  period: string
  location: string
  technologies: string[]
  learnings: string[]
  description: string
  logo: string
  transferredFrom?: string
}

// Repositórios em destaque - incluindo variações de capitalização
const featuredRepos = [
  "flykit",
  "cellphone-plans",
  "CellphonePlans",
  "finnance-backend-challange",
  "Finnance-backend-challange",
  "coinpilot",
  "CoinPilot",
  "bankAPI",
]

// Experiências separadas com indicação de transferência
const experiences: Experience[] = [
  {
    id: 1,
    company: "CDR LOG",
    position: "Full Stack Developer",
    period: "Set 2021 - Jan 2022",
    location: "Belo Horizonte, MG",
    technologies: ["PHP", "JavaScript", "MySQL", "Bootstrap", "CSS"],
    learnings: [
      "Atualização de sistemas legados",
      "Controle de estoque e localização",
      "Resolução de problemas críticos",
      "Prevenção de depreciação de código",
    ],
    description:
      "Contribuí para atualização do sistema PHP legado, implementei sistema de controle de localização de estoque e resolvi problemas que impediam o fluxo dos clientes.",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQGcLq6Lu7qddA/company-logo_200_200/company-logo_200_200/0/1630626999759/cdrlog_logo?e=2147483647&v=beta&t=BBhBTNP9Lbyrv-UYecQWDX0hzdG0bNZEIKHGq7deMFc",
  },
  {
    id: 2,
    company: "AIX",
    position: "Full Stack Engineer",
    period: "Fev 2022 - Out 2022",
    location: "Belo Horizonte, MG",
    technologies: ["PHP", "Laravel", "JavaScript", "Docker", "SQL Server", "Vagrant"],
    learnings: [
      "Containerização com Docker",
      "Sistema de gestão acadêmica",
      "Refatoração de código crítico",
      "Apresentações técnicas para equipe",
    ],
    description:
      "Implementei estrutura completa da aplicação em Docker, desenvolvi sistema inovador de gestão acadêmica para ENEM/Processos Seletivos e realizei refatoração refinada em seção crítica do código.",
    logo: "https://media.glassdoor.com/sqll/2487947/aix-sistemas-squarelogo-1554087025811.png",
  },
  {
    id: 3,
    company: "Activesoft",
    position: "Full Stack Engineer",
    period: "Jul 2022 - Dez 2022",
    location: "Natal, RN",
    technologies: ["Python", "Django", "React", "TypeScript", "SQL Server", "Node.js"],
    learnings: [
      "Otimização meticulosa de páginas",
      "Correções em SQL Server",
      "Cálculos de taxas precisos",
      "Padrões superiores de interface",
    ],
    description:
      "Conduzi otimização meticulosa de páginas, integrei padrões superiores resultando em interface mais intuitiva e código mais sólido e sustentável.",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGIg7kezDiqwg/company-logo_100_100/company-logo_100_100/0/1713208368277/activesoft_consultoria_logo?e=1756944000&v=beta&t=wfDEL_vvI1y-fF_YyJavc_JokV0AJn-_neO1kS5S41Q",
    transferredFrom: "AIX",
  },
  {
    id: 4,
    company: "For People",
    position: "Full Stack Engineer",
    period: "Dez 2022 - Mai 2023",
    location: "Brasil",
    technologies: ["PHP", "Laravel", "React", "TypeScript", "AWS", "Docker"],
    learnings: [
      "Otimização de queries (n+1)",
      "Geração de relatórios de absenteísmo",
      "Captura de exceções do sistema",
      "Implementação de padrões PSR",
    ],
    description:
      "Limpei código com queries errôneas, implementei geração completa de relatórios de absenteísmo e desenvolvi funcionalidade para capturar exceções do sistema automaticamente.",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQGILem4wxKbpw/company-logo_100_100/company-logo_100_100/0/1630594552638/for_people_softwares_logo?e=1756944000&v=beta&t=yKIdNrCFagjlQJcJsdRjxd-T42x1vS0nSnFQZjJsuhQ",
  },
  {
    id: 5,
    company: "4yousee",
    position: "Full Stack Engineer",
    period: "Mai 2023 - Jan 2025",
    location: "Belo Horizonte, MG",
    technologies: ["PHP", "Symfony", "TypeScript", "Linux", "AWS", "MySQL", "Docker", "RabbitMQ"],
    learnings: [
      "Projeto TypeScript para Raspberry Pi",
      "Regras de sanitização de segurança",
      "Refatoração com arquitetura hexagonal",
      "Digital Signage e microsserviços",
    ],
    description:
      "Pilar na análise, planejamento e implementação de projeto em TypeScript para reproduções de mídia digital signage no Raspberry Pi, contribuí para implementação de regras de sanitização e participei ativamente da refatoração da API em Symfony.",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQHn_ch5P8YQnA/company-logo_100_100/company-logo_100_100/0/1730471951129/4yousee_logo?e=1756944000&v=beta&t=VEQvyVYOo91z3ubeqgkYfu5XcbaUF8x4JuX_uvy_93Y",
  },
  {
    id: 6,
    company: "Eletromidia",
    position: "Full Stack Engineer",
    period: "Jan 2025 - Presente",
    location: "Brasil",
    technologies: ["Node.js", "PHP", "Java", "Symfony", "Jest", "PHPUnit"],
    learnings: [
      "Algoritmos recursivos em Node.js",
      "Validação dinâmica de grupos de restrição",
      "Desenvolvimento de REST API em Symfony",
      "100% de cobertura de testes unitários",
    ],
    description:
      "Implementei algoritmo recursivo em Node.js com complexidade O(n) para validação dinâmica de grupos de restrição de conteúdo, contribuí ativamente para desenvolvimento da REST API em Symfony.",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQHRJejzloogIA/company-logo_100_100/company-logo_100_100/0/1638324303551/eletromidia_logo?e=1756944000&v=beta&t=z-jjCarJYuWNwbQprN7W97hyO5r3r8tLDkQoAzGvqmY",
    transferredFrom: "4yousee",
  },
]

// Certificações reais do seu LinkedIn
const certifications = [
  {
    name: "Go: criando uma API Rest",
    issuer: "Alura",
    year: "2025",
    credentialId: "2f518f62-0aef-46bc-8ca0-c7272d933e8e",
  },
  {
    name: "NLW Journey - DevOps",
    issuer: "Rocketseat",
    year: "2024",
    credentialId: "0078e936-6406-400b-9d97-89cafc7ce80a",
  },
  {
    name: "NLW Journey - Node.js",
    issuer: "Rocketseat",
    year: "2024",
    credentialId: "1bc19357-7c9c-4f05-a5ae-ec4c4cf829dd",
  },
  {
    name: "Arquitetura com PHP: escalando uma aplicação monolítica",
    issuer: "Alura",
    year: "2024",
    credentialId: "2fcfd66e-76e2-4e6c-922b-27b62598e3aa",
  },
  {
    name: "NLW Expert trilha de Java",
    issuer: "Rocketseat",
    year: "2024",
    credentialId: "39f937cb-9753-4347-bab5-d8e3a4e148aa",
  },
  {
    name: "Design Patterns em PHP: padrões comportamentais",
    issuer: "Alura",
    year: "2024",
    credentialId: "6fe26d6f-4ef3-4ef2-8c0b-08214e0e7669",
  },
  {
    name: "Go: Orientação a Objetos",
    issuer: "Alura",
    year: "2023",
    credentialId: "93f300c1-bcbe-458b-8cf5-b1085d799f36",
  },
  {
    name: "Symfony Framework: criando uma aplicação com MVC",
    issuer: "Alura",
    year: "2023",
    credentialId: "4882c4a4-7ee1-46e5-8a18-26fefe82dcfa",
  },
  {
    name: "Bootcamp Amazon Web Services (AWS)",
    issuer: "The Cloud Bootcamp",
    year: "2023",
    credentialId: "xabztpxinv",
  },
  {
    name: "NGINX: servidor Web, Proxy Reverso e API Gateway",
    issuer: "Alura",
    year: "2023",
    credentialId: "6f7d7567-1db6-43d2-bede-7e16c02257c9",
  },
  {
    name: "PHP Composer: Dependências, Autoload e Publicação",
    issuer: "Alura",
    year: "2023",
    credentialId: "2e0a30c8-7943-4c0d-a9ce-ba89fa9858a8",
  },
  {
    name: "Pentest: explorando vulnerabilidades em aplicações web",
    issuer: "Alura",
    year: "2023",
    credentialId: "85920cf0-01db-471b-89d7-8ee2ad50c42a",
  },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [currentExperience, setCurrentExperience] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showAllCertifications, setShowAllCertifications] = useState(false)
  const certificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeSection === "repositories") {
      fetchRepositories()
    }
  }, [activeSection])

  useEffect(() => {
    const handleScroll = () => {
      if (certificationsRef.current && activeSection === "home") {
        const rect = certificationsRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0

        if (isVisible && !showAllCertifications) {
          setShowAllCertifications(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection, showAllCertifications])

  const fetchRepositories = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://api.github.com/users/thetheago/repos?sort=updated&per_page=100")
      const data = await response.json()

      // Filtrar repositórios excluindo os especificados
      const excludedRepos = ["focus-brew", "thetheago", "kickstart.nvim", "portifoliov2"]
      const filteredRepos = data.filter((repo: Repository) => !excludedRepos.includes(repo.name))

      setRepositories(filteredRepos)
    } catch (error) {
      console.error("Erro ao buscar repositórios:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextExperience = () => {
    if (currentExperience < experiences.length - 1 && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentExperience((prev) => prev + 1)
        setTimeout(() => setIsAnimating(false), 200)
      }, 150)
    }
  }

  const prevExperience = () => {
    if (currentExperience > 0 && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentExperience((prev) => prev - 1)
        setTimeout(() => setIsAnimating(false), 200)
      }, 150)
    }
  }

  const isRepoFeatured = (repoName: string) => {
    return featuredRepos.includes(repoName)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-indigo-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center space-x-8">
            {[
              { id: "home", label: "Início" },
              { id: "repositories", label: "Repositórios" },
              { id: "trajectory", label: "Trajetória" },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                onClick={() => setActiveSection(item.id)}
                className={`${
                  activeSection === item.id
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "text-slate-100 hover:text-indigo-300 hover:bg-indigo-900/50"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Home Section */}
      {activeSection === "home" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                <Avatar className="w-32 h-32 mx-auto mb-8 ring-4 ring-indigo-500">
                  <AvatarImage src="https://github.com/thetheago.png" alt="Thiago Henrique Gomes" />
                  <AvatarFallback className="text-2xl bg-indigo-700 text-white">TH</AvatarFallback>
                </Avatar>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-5xl font-bold text-slate-100 mb-4"
              >
                Thiago (Henrique) Gomes
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-slate-300 max-w-2xl mx-auto mb-8"
              >
                Software Engineer at Eletromidia | PHP & Node Specialist. Full Stack Developer especializado em criar
                soluções robustas e escaláveis com foco em performance e qualidade de código.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center space-x-4"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="text-slate-100 border-indigo-400 hover:bg-indigo-600 hover:text-white bg-transparent"
                  onClick={() => window.open("https://github.com/thetheago", "_blank")}
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-slate-100 border-indigo-400 hover:bg-indigo-600 hover:text-white bg-transparent"
                  onClick={() => window.open("https://www.linkedin.com/in/thetheago/", "_blank")}
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </motion.div>
            </div>

            {/* Educação */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-slate-100 text-center mb-8">Educação</h2>
              <div className="max-w-2xl mx-auto">
                <Card className="bg-slate-800/40 backdrop-blur-md border-indigo-500/30 hover:bg-slate-700/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center border border-indigo-500/30">
                        <img
                          src="https://yt3.googleusercontent.com/ytc/AIdro_mg7i2LUoYz-tyX_j7Bcl7-2E10HU0oGScH5xBI1pf3uV0=s900-c-k-c0x00ffffff-no-rj"
                          alt="FUMEC logo"
                          className="w-12 h-12 object-contain rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <GraduationCap className="w-5 h-5 text-indigo-400 mr-2" />
                          <h3 className="text-xl font-bold text-slate-100">Bacharelado em Ciência da Computação</h3>
                        </div>
                        <p className="text-indigo-300 font-medium">Universidade FUMEC</p>
                        <p className="text-slate-400 text-sm">
                          Formação sólida em desenvolvimento de software, algoritmos e estruturas de dados
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Certificações */}
            <motion.div
              ref={certificationsRef}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="relative"
            >
              <h2 className="text-3xl font-bold text-slate-100 text-center mb-8">Certificações</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Primeiras 3 certificações sempre visíveis */}
                {certifications.slice(0, 3).map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="bg-slate-800/40 backdrop-blur-md border-indigo-500/30 hover:bg-slate-700/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-slate-100 mb-2">{cert.name}</h3>
                        <p className="text-slate-300 text-sm mb-1">{cert.issuer}</p>
                        <p className="text-indigo-300 text-sm mb-2">{cert.year}</p>
                        <p className="text-slate-400 text-xs opacity-75">{cert.credentialId}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Certificações adicionais com animação */}
                <AnimatePresence>
                  {showAllCertifications &&
                    certifications.slice(3).map((cert, index) => (
                      <motion.div
                        key={index + 3}
                        initial={{ y: 50, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                      >
                        <Card className="bg-slate-800/40 backdrop-blur-md border-indigo-500/30 hover:bg-slate-700/50 transition-all duration-300">
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-slate-100 mb-2">{cert.name}</h3>
                            <p className="text-slate-300 text-sm mb-1">{cert.issuer}</p>
                            <p className="text-indigo-300 text-sm mb-2">{cert.year}</p>
                            <p className="text-slate-400 text-xs opacity-75">{cert.credentialId}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* Indicador de scroll */}
              {!showAllCertifications && (
                <div className="text-center mt-8">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                    className="text-slate-400/60"
                  >
                    <p className="text-sm mb-2">Role para ver mais</p>
                    <ChevronDown className="w-6 h-6 mx-auto" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Repositories Section */}
      {activeSection === "repositories" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-slate-100 text-center mb-12">Meus Repositórios</h2>

            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto"></div>
                <p className="text-slate-300 mt-4">Carregando repositórios...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repositories.map((repo, index) => (
                  <motion.div
                    key={repo.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`backdrop-blur-md transition-all duration-300 h-full relative ${
                        isRepoFeatured(repo.name)
                          ? "bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/50 shadow-lg shadow-yellow-500/20"
                          : "bg-slate-800/40 border-indigo-500/30 hover:bg-slate-700/50"
                      }`}
                    >
                      {isRepoFeatured(repo.name) && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold text-xs">
                            ⭐ Destaque
                          </Badge>
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3
                            className={`font-semibold text-lg pr-4 ${
                              isRepoFeatured(repo.name) ? "text-yellow-100" : "text-slate-100"
                            }`}
                          >
                            {repo.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(repo.html_url, "_blank")}
                            className={`flex-shrink-0 ${
                              isRepoFeatured(repo.name)
                                ? "text-yellow-300 hover:text-yellow-100 hover:bg-yellow-600/50"
                                : "text-slate-300 hover:text-slate-100 hover:bg-indigo-600/50"
                            }`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>

                        <p
                          className={`text-sm mb-4 line-clamp-3 ${
                            isRepoFeatured(repo.name) ? "text-yellow-200" : "text-slate-300"
                          }`}
                        >
                          {repo.description || "Sem descrição disponível"}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {repo.language && (
                              <Badge
                                variant="secondary"
                                className={
                                  isRepoFeatured(repo.name)
                                    ? "bg-yellow-600 text-yellow-100"
                                    : "bg-indigo-600 text-white"
                                }
                              >
                                {repo.language}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Trajectory Section */}
      {activeSection === "trajectory" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold text-slate-100 text-center mb-12">Minha Trajetória</h2>

            <div className="relative max-w-6xl mx-auto">
              {/* Card da experiência atual com animação de flutuação */}
              <div className="relative z-20 mb-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentExperience}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      rotateY: 90,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                      y: [0, -10, 0],
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      rotateY: -90,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      y: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 3,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <Card className="bg-slate-800/50 backdrop-blur-md border-indigo-500/40 shadow-2xl shadow-indigo-500/20">
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-4 gap-8">
                          {/* Logo da empresa */}
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-slate-700/50 rounded-xl flex items-center justify-center border border-indigo-500/30">
                              <img
                                src={experiences[currentExperience].logo || "/placeholder.svg"}
                                alt={`${experiences[currentExperience].company} logo`}
                                className="w-12 h-12 object-contain rounded-lg"
                                crossOrigin="anonymous"
                              />
                            </div>
                            <h3 className="text-xl font-bold text-slate-100 mb-1">
                              {experiences[currentExperience].company}
                            </h3>
                            {experiences[currentExperience].transferredFrom && (
                              <div className="flex items-center justify-center text-xs text-amber-400 mb-2">
                                <ArrowRight className="w-3 h-3 mr-1" />
                                Transferido da {experiences[currentExperience].transferredFrom}
                              </div>
                            )}
                            <p className="text-indigo-300 text-sm mb-3">{experiences[currentExperience].position}</p>
                            <div className="space-y-1 text-slate-400 text-xs">
                              <div className="flex items-center justify-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {experiences[currentExperience].period}
                              </div>
                              <div className="flex items-center justify-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {experiences[currentExperience].location}
                              </div>
                            </div>
                          </div>

                          {/* Descrição e detalhes */}
                          <div className="md:col-span-3 space-y-6">
                            <div>
                              <p className="text-slate-300 leading-relaxed">
                                {experiences[currentExperience].description}
                              </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-slate-100 font-semibold mb-3 flex items-center">
                                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                                  Tecnologias
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {experiences[currentExperience].technologies.map((tech, techIndex) => (
                                    <motion.div
                                      key={techIndex}
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: techIndex * 0.05 }}
                                    >
                                      <Badge variant="secondary" className="bg-indigo-600 text-white">
                                        {tech}
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-slate-100 font-semibold mb-3 flex items-center">
                                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                  Principais Aprendizados
                                </h4>
                                <ul className="text-slate-300 text-sm space-y-2">
                                  {experiences[currentExperience].learnings.map((learning, learningIndex) => (
                                    <motion.li
                                      key={learningIndex}
                                      className="flex items-start"
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: learningIndex * 0.05 }}
                                    >
                                      <span className="text-purple-400 mr-2 mt-1">•</span>
                                      {learning}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Linha do tempo embaixo */}
              <div className="relative">
                <div className="flex justify-between items-center mb-8">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="flex flex-col items-center relative z-10">
                      <motion.div
                        className={`w-4 h-4 rounded-full border-2 mb-2 relative z-20 ${
                          index === currentExperience
                            ? "bg-indigo-400 border-indigo-300 scale-125 shadow-lg shadow-indigo-400/50"
                            : index < currentExperience
                              ? "bg-indigo-600 border-indigo-400"
                              : "bg-slate-600 border-slate-500"
                        }`}
                        animate={{
                          scale: index === currentExperience ? 1.25 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-1">{exp.period.split(" - ")[0]}</p>
                        <p
                          className={`text-xs font-medium ${
                            index === currentExperience ? "text-indigo-300" : "text-slate-500"
                          }`}
                        >
                          {exp.company}
                        </p>
                        {exp.transferredFrom && (
                          <div className="text-xs text-amber-400/60 mt-1">← {exp.transferredFrom}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Linha conectora */}
                <div className="absolute top-2 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-600 via-indigo-500 to-slate-600 transform -translate-y-1/2 z-0"></div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center space-x-6 mt-12">
                <Button
                  onClick={prevExperience}
                  disabled={currentExperience === 0 || isAnimating}
                  variant="outline"
                  size="lg"
                  className="text-slate-100 border-indigo-400 hover:bg-indigo-600 hover:text-white bg-transparent disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Anterior
                </Button>

                <div className="text-slate-400 text-sm">
                  {currentExperience + 1} de {experiences.length}
                </div>

                <Button
                  onClick={nextExperience}
                  disabled={currentExperience === experiences.length - 1 || isAnimating}
                  variant="outline"
                  size="lg"
                  className="text-slate-100 border-indigo-400 hover:bg-indigo-600 hover:text-white bg-transparent disabled:opacity-50"
                >
                  Próximo
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
