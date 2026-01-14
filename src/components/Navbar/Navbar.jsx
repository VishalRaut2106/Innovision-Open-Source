"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  LogIn,
  LogOut,
  Palette,
  Trophy,
  BarChart3,
  Upload,
  Flame,
  Sparkles,
  Code2,
  Youtube,
  BookOpen,
  Crown,
  MoonStar,
  Home,
  MessageSquare,
  ChevronDown,
  Settings,
  User,
  Menu,
  X,
  Zap,
  Globe,
} from "lucide-react";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import PremiumGoogleTranslate from "../PremiumGoogleTranslate";
import { useContext } from "react";
import xpContext from "@/contexts/xp";
import { useNightMode } from "@/contexts/nightMode";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("light");
  const [streak, setStreak] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { xp, show, changed } = useContext(xpContext);
  const { nightMode, toggleNightMode } = useNightMode();
  const router = useRouter();
  const pathname = usePathname();

  const isActiveLink = (href) => {
    return pathname === href || (href === "/roadmap" && pathname === "/");
  };

  const isActiveGroup = (paths) => {
    return paths.some(p => pathname?.startsWith(p) || isActiveLink(p));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  useEffect(() => {
    if (user?.email) {
      fetchStreak(user.email);
      fetchPremiumStatus(user.email);
    }
  }, [user]);

  const fetchPremiumStatus = async (email) => {
    try {
      const res = await fetch(`/api/premium/status`);
      const data = await res.json();
      setIsPremium(data.isPremium || false);
    } catch (error) {
      console.error("Error fetching premium status:", error);
    }
  };

  const fetchStreak = async (email) => {
    try {
      const res = await fetch(`/api/gamification/stats?userId=${email}`);
      const data = await res.json();
      setStreak(data.streak || 0);
    } catch (error) {
      console.error("Error fetching streak:", error);
    }
  };

  const signOutUser = async () => {
    try {
      await logout();
      window.location.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
      window.location.replace("/");
    }
  };

  // Navigation items for logged-in users
  const createMenuItems = [
    { href: "/generate", label: "AI Course Generator", icon: Sparkles, description: "Create courses with AI" },
    { href: "/studio", label: "Course Studio", icon: Palette, description: "Design custom courses" },
    { href: "/content-ingestion", label: "Content Ingestion", icon: Upload, description: "Import existing content" },
    { href: "/youtube-course", label: "YouTube Course", icon: Youtube, description: "Learn from YouTube" },
  ];

  const learnMenuItems = [
    { href: "/roadmap", label: "My Courses", icon: Home, description: "Your learning dashboard" },
    { href: "/courses", label: "Browse Courses", icon: BookOpen, description: "Explore all courses" },
    { href: "/code-editor", label: "Code Editor", icon: Code2, description: "Practice coding" },
  ];

  const moreMenuItems = [
    { href: "/features", label: "Features", icon: Trophy, description: "Platform features" },
    { href: "/gamification", label: "Achievements", icon: Zap, description: "Badges & rewards" },
    { href: "/demo", label: "Demo", icon: BarChart3, description: "See how it works" },
    { href: "/contact", label: "Contact", icon: MessageSquare, description: "Get in touch" },
  ];

  // Landing page navigation
  const landingNavItems = [
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How it Works" },
    { id: "faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="h-16 w-full border-b fixed top-0 left-0 bg-background/80 backdrop-blur-xl z-50 border-border/50">
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={user ? `/roadmap` : "/"}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image src="/InnoVision_LOGO-removebg-preview.png" alt="logo" width={40} height={40} />
          <span className="text-xl font-bold hidden sm:block">InnoVision</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              {/* Create Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`gap-1 ${isActiveGroup(['/generate', '/studio', '/content-ingestion', '/youtube-course']) ? 'bg-muted' : ''}`}>
                    Create
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {createMenuItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="flex items-start gap-3 p-2">
                        <item.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Learn Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`gap-1 ${isActiveGroup(['/roadmap', '/courses', '/code-editor']) ? 'bg-muted' : ''}`}>
                    Learn
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {learnMenuItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="flex items-start gap-3 p-2">
                        <item.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`gap-1 ${isActiveGroup(['/features', '/gamification', '/demo', '/contact']) ? 'bg-muted' : ''}`}>
                    More
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {moreMenuItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="flex items-start gap-3 p-2">
                        <item.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // Landing page nav
            <>
              {landingNavItems.map((item) => (
                <Button
                  key={item.id || item.href}
                  variant="ghost"
                  asChild={!!item.href}
                  onClick={() => {
                    if (item.id) {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span className="cursor-pointer">{item.label}</span>
                  )}
                </Button>
              ))}
            </>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {user && (
            <>
              {/* Premium Badge */}
              {isPremium && (
                <Link href="/premium" className="hidden sm:flex">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 hover:border-yellow-500/50 transition-colors">
                    <Crown className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">PRO</span>
                  </div>
                </Link>
              )}

              {/* XP */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 cursor-help relative">
                    <Sparkles className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">{xp}</span>
                    {show && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: -10 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-2 right-0 text-xs text-green-500 font-bold"
                      >
                        +{changed}
                      </motion.span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">Level {Math.floor(xp / 500) + 1}</p>
                  <p className="text-xs text-muted-foreground">{xp} XP earned</p>
                </TooltipContent>
              </Tooltip>

              {/* Streak */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 cursor-help">
                    <Flame className={`h-4 w-4 ${streak >= 7 ? 'text-red-500' : 'text-orange-500'}`} />
                    <span className={`text-sm font-semibold ${streak >= 7 ? 'text-red-600 dark:text-red-400' : 'text-orange-700 dark:text-orange-400'}`}>
                      {streak}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{streak} Day Streak!</p>
                  <p className="text-xs text-muted-foreground">Keep learning daily</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}

          {/* Theme & Night Mode */}
          <div className="hidden sm:flex items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleNightMode}
                  className={nightMode ? 'text-amber-500' : ''}
                >
                  <MoonStar className={`h-5 w-5 ${nightMode ? 'fill-amber-500' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Night Mode</TooltipContent>
            </Tooltip>

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>

          {/* User Menu or Login */}
          {user ? (
            <div className="flex items-center gap-2">
              {/* Profile Avatar - Direct Link */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/profile" className="relative">
                    <Avatar className="h-9 w-9 ring-2 ring-transparent hover:ring-blue-500/50 transition-all cursor-pointer">
                      <AvatarImage src={user?.image} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    {isPremium && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-yellow-500 flex items-center justify-center">
                        <Crown className="h-2.5 w-2.5 text-black" />
                      </span>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View Profile</TooltipContent>
              </Tooltip>

              {/* Settings Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link href="/gamification" className="flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Achievements
                    </Link>
                  </DropdownMenuItem>

                  {!isPremium && (
                    <DropdownMenuItem asChild>
                      <Link href="/premium" className="flex items-center gap-2 text-yellow-600">
                        <Crown className="h-4 w-4" />
                        Upgrade to Pro
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />

                  {/* Mobile only stats */}
                  <div className="sm:hidden px-2 py-1.5 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">XP</span>
                    <span className="font-medium text-green-600">{xp}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Streak</span>
                    <span className="font-medium text-orange-600">{streak} days</span>
                  </div>
                </div>
                <DropdownMenuSeparator className="sm:hidden" />

                <div className="px-2 py-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Night Mode</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleNightMode}
                      className={`h-8 w-8 p-0 ${nightMode ? 'text-amber-500' : ''}`}
                    >
                      <MoonStar className={`h-4 w-4 ${nightMode ? 'fill-amber-500' : ''}`} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Theme</span>
                    <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-8 w-8 p-0">
                      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <div className="px-2 py-1.5">
                  <p className="text-xs text-muted-foreground mb-1">Language</p>
                  <PremiumGoogleTranslate />
                </div>

                <DropdownMenuSeparator />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500 focus:text-red-500">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be logged out from your current session.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-white" onClick={signOutUser}>
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <nav className="p-4 space-y-2">
              {user ? (
                <>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">Create</p>
                  {createMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActiveLink(item.href) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}

                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2 mt-4">Learn</p>
                  {learnMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActiveLink(item.href) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}

                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2 mt-4">More</p>
                  {moreMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActiveLink(item.href) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  {landingNavItems.map((item) => (
                    <button
                      key={item.id || item.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (item.id) {
                          document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                        } else if (item.href) {
                          router.push(item.href);
                        }
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground w-full text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;