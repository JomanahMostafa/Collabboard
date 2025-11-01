import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, useNavigate, useLocation, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useEffect, forwardRef, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Shield, Users, TrendingUp, Check, Star, Mail, Lock, Chrome, Search, X, Bell, Settings, ChevronDown, User, LogOut, Menu, ChevronRight, ChevronLeft, Plus, Briefcase, LayoutDashboard, KanbanSquare, CheckCircle2, Clock, AlertCircle, Trash2, Edit2, Calendar, CreditCard, Save, Activity, UserPlus } from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as Tooltip$1, LineChart, CartesianGrid, XAxis, YAxis, Line, BarChart, Bar, Legend } from "recharts";
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  useEffect(() => {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("collabboard-storage");
    let theme = "light";
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        if (parsed.state?.theme) {
          theme = parsed.state.theme;
        }
      } catch (e) {
      }
    }
    html.classList.remove("dark", "light");
    html.classList.add(theme);
  }, []);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    className: "light",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function formatDate(dateString) {
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const Button = forwardRef(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, onClick, ...props }, ref) => {
    const baseStyles = "font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
    const variants = {
      primary: "bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white hover:from-cyan-600 hover:via-teal-600 hover:to-emerald-600 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 ring-1 ring-cyan-400/20 active:scale-[0.98]",
      secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 active:scale-[0.98]",
      ghost: "hover:bg-cyan-50 dark:hover:bg-cyan-950/20 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 active:scale-[0.98]",
      danger: "bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-500/25 active:scale-[0.98]"
    };
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    };
    const handleClick = (e) => {
      if (disabled || isLoading) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };
    return /* @__PURE__ */ jsx(
      motion.button,
      {
        ref,
        whileHover: disabled || isLoading ? {} : { scale: 1.02 },
        whileTap: disabled || isLoading ? {} : { scale: 0.98 },
        className: cn(baseStyles, variants[variant], sizes[size], className),
        disabled: disabled || isLoading,
        onClick: handleClick,
        type: "button",
        ...props,
        children: isLoading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-4 w-4", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
            /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
          ] }),
          "Loading..."
        ] }) : children
      }
    );
  }
);
Button.displayName = "Button";
const Card = forwardRef(
  ({ className, variant = "default", hover = true, children, ...props }, ref) => {
    const variants = {
      default: "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm",
      glass: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/30 dark:border-cyan-500/10 shadow-xl shadow-cyan-500/5",
      gradient: "bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 dark:from-cyan-950/30 dark:via-teal-950/30 dark:to-emerald-950/30 border border-cyan-200/50 dark:border-cyan-800/30 shadow-lg"
    };
    const content = /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "rounded-2xl p-6 shadow-lg transition-all duration-300",
          variants[variant],
          hover && "hover:shadow-xl hover:scale-[1.02]",
          className
        ),
        ...props,
        children
      }
    );
    if (hover) {
      return /* @__PURE__ */ jsx(motion.div, { whileHover: { y: -4 }, transition: { duration: 0.2 }, children: content });
    }
    return content;
  }
);
Card.displayName = "Card";
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.2)";
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "fixed inset-0 pointer-events-none z-0",
      style: { opacity: 0.3 }
    }
  );
};
const features = [{
  icon: Zap,
  title: "Lightning Fast",
  description: "Real-time collaboration with instant updates across all devices."
}, {
  icon: Shield,
  title: "Secure & Private",
  description: "Enterprise-grade security to keep your data safe and protected."
}, {
  icon: Users,
  title: "Team Collaboration",
  description: "Work seamlessly with your team members in shared workspaces."
}, {
  icon: TrendingUp,
  title: "Advanced Analytics",
  description: "Track productivity and performance with detailed insights and charts."
}];
const pricingPlans = [{
  name: "Free",
  price: "$0",
  period: "/month",
  features: ["Up to 3 boards", "5 team members", "Basic analytics", "Community support"],
  popular: false
}, {
  name: "Pro",
  price: "$19",
  period: "/month",
  features: ["Unlimited boards", "Unlimited team members", "Advanced analytics", "Priority support", "Custom integrations", "API access"],
  popular: true
}, {
  name: "Enterprise",
  price: "Custom",
  period: "",
  features: ["Everything in Pro", "Dedicated support", "Custom onboarding", "SSO & advanced security", "99.9% uptime SLA", "Custom integrations"],
  popular: false
}];
const testimonials = [{
  name: "Sarah Johnson",
  role: "Product Manager at TechCorp",
  content: "CollabBoard has transformed how our team collaborates. The real-time updates and intuitive interface make project management a breeze.",
  rating: 5
}, {
  name: "Michael Chen",
  role: "CTO at StartupXYZ",
  content: "The analytics dashboard provides insights we never had before. Highly recommend for any growing team.",
  rating: 5
}, {
  name: "Emily Rodriguez",
  role: "Design Lead at CreativeStudio",
  content: "Beautiful design, powerful features. This is the project management tool we've been waiting for.",
  rating: 5
}];
const index = UNSAFE_withComponentProps(function Landing() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950 relative overflow-hidden",
    children: [/* @__PURE__ */ jsx(AnimatedBackground, {}), /* @__PURE__ */ jsxs("header", {
      className: "relative overflow-hidden z-10",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-emerald-500/10"
      }), /* @__PURE__ */ jsx("div", {
        className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32",
        children: /* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.6
          },
          className: "text-center",
          children: [/* @__PURE__ */ jsxs(motion.div, {
            initial: {
              scale: 0.9
            },
            animate: {
              scale: 1
            },
            transition: {
              delay: 0.2,
              duration: 0.5
            },
            className: "inline-flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-full border border-cyan-200/50 dark:border-cyan-800/30 mb-8 shadow-lg",
            children: [/* @__PURE__ */ jsx(Sparkles, {
              className: "w-4 h-4 text-cyan-600 dark:text-cyan-400"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-sm font-medium text-gray-700 dark:text-gray-300",
              children: "Now with Real-time Collaboration"
            })]
          }), /* @__PURE__ */ jsxs("h1", {
            className: "text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent",
            children: ["Your Team's Productivity", /* @__PURE__ */ jsx("br", {}), "Powerhouse"]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto",
            children: "Collaborate seamlessly with Kanban boards, real-time updates, and powerful analytics. Built for modern teams who value efficiency and beautiful design."
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col sm:flex-row gap-4 justify-center items-center",
            children: [/* @__PURE__ */ jsx(Link, {
              to: "/login",
              children: /* @__PURE__ */ jsxs(Button, {
                size: "lg",
                className: "w-full sm:w-auto",
                children: ["Get Started Free", /* @__PURE__ */ jsx(ArrowRight, {
                  className: "w-5 h-5 ml-2"
                })]
              })
            }), /* @__PURE__ */ jsx(Link, {
              to: "/login",
              children: /* @__PURE__ */ jsx(Button, {
                variant: "secondary",
                size: "lg",
                className: "w-full sm:w-auto",
                children: "Watch Demo"
              })
            })]
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 px-4 sm:px-6 lg:px-8",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto",
        children: [/* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          whileInView: {
            opacity: 1,
            y: 0
          },
          viewport: {
            once: true
          },
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4",
            children: "Everything you need to succeed"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400",
            children: "Powerful features designed for modern teams"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
          children: features.map((feature, index2) => {
            const Icon = feature.icon;
            return /* @__PURE__ */ jsx(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              whileInView: {
                opacity: 1,
                y: 0
              },
              viewport: {
                once: true
              },
              transition: {
                delay: index2 * 0.1
              },
              children: /* @__PURE__ */ jsxs(Card, {
                variant: "glass",
                className: "h-full relative z-10",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30",
                  children: /* @__PURE__ */ jsx(Icon, {
                    className: "w-6 h-6 text-white"
                  })
                }), /* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2",
                  children: feature.title
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-600 dark:text-gray-400",
                  children: feature.description
                })]
              })
            }, feature.title);
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto",
        children: [/* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          whileInView: {
            opacity: 1,
            y: 0
          },
          viewport: {
            once: true
          },
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4",
            children: "Simple, transparent pricing"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400",
            children: "Choose the plan that works for you"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto",
          children: pricingPlans.map((plan, index2) => /* @__PURE__ */ jsx(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            whileInView: {
              opacity: 1,
              y: 0
            },
            viewport: {
              once: true
            },
            transition: {
              delay: index2 * 0.1
            },
            children: /* @__PURE__ */ jsxs(Card, {
              variant: plan.popular ? "gradient" : "default",
              className: `h-full relative z-10 ${plan.popular ? "ring-2 ring-cyan-500 shadow-xl" : ""}`,
              children: [plan.popular && /* @__PURE__ */ jsx("div", {
                className: "absolute -top-4 left-1/2 -translate-x-1/2",
                children: /* @__PURE__ */ jsx("span", {
                  className: "bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg",
                  children: "Most Popular"
                })
              }), /* @__PURE__ */ jsxs("div", {
                className: "text-center mb-6",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2",
                  children: plan.name
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-baseline justify-center gap-1",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-4xl font-bold text-gray-900 dark:text-gray-100",
                    children: plan.price
                  }), plan.period && /* @__PURE__ */ jsx("span", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: plan.period
                  })]
                })]
              }), /* @__PURE__ */ jsx("ul", {
                className: "space-y-3 mb-6",
                children: plan.features.map((feature) => /* @__PURE__ */ jsxs("li", {
                  className: "flex items-start gap-2",
                  children: [/* @__PURE__ */ jsx(Check, {
                    className: "w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-gray-700 dark:text-gray-300",
                    children: feature
                  })]
                }, feature))
              }), /* @__PURE__ */ jsx(Link, {
                to: "/login",
                children: /* @__PURE__ */ jsx(Button, {
                  variant: plan.popular ? "primary" : "secondary",
                  className: "w-full",
                  children: "Get Started"
                })
              })]
            })
          }, plan.name))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 px-4 sm:px-6 lg:px-8",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto",
        children: [/* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          whileInView: {
            opacity: 1,
            y: 0
          },
          viewport: {
            once: true
          },
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4",
            children: "Loved by teams worldwide"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400",
            children: "See what our users have to say"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6",
          children: testimonials.map((testimonial, index2) => /* @__PURE__ */ jsx(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            whileInView: {
              opacity: 1,
              y: 0
            },
            viewport: {
              once: true
            },
            transition: {
              delay: index2 * 0.1
            },
            children: /* @__PURE__ */ jsxs(Card, {
              variant: "glass",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex gap-1 mb-4",
                children: Array.from({
                  length: testimonial.rating
                }).map((_, i) => /* @__PURE__ */ jsx(Star, {
                  className: "w-5 h-5 fill-yellow-400 text-yellow-400"
                }, i))
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-4 italic",
                children: ['"', testimonial.content, '"']
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "font-semibold text-gray-900 dark:text-gray-100",
                  children: testimonial.name
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400",
                  children: testimonial.role
                })]
              })]
            })
          }, testimonial.name))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 px-4 sm:px-6 lg:px-8",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-4xl mx-auto",
        children: /* @__PURE__ */ jsx(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          whileInView: {
            opacity: 1,
            y: 0
          },
          viewport: {
            once: true
          },
          children: /* @__PURE__ */ jsxs(Card, {
            variant: "gradient",
            className: "text-center",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4",
              children: "Ready to boost your team's productivity?"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-gray-700 dark:text-gray-300 mb-8",
              children: "Join thousands of teams already using CollabBoard"
            }), /* @__PURE__ */ jsx(Link, {
              to: "/login",
              children: /* @__PURE__ */ jsxs(Button, {
                size: "lg",
                children: ["Start Free Trial", /* @__PURE__ */ jsx(ArrowRight, {
                  className: "w-5 h-5 ml-2"
                })]
              })
            })]
          })
        })
      })
    }), /* @__PURE__ */ jsx("footer", {
      className: "border-t border-gray-200 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto text-center",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-center gap-2 mb-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-8 h-8 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30",
            children: /* @__PURE__ */ jsx("span", {
              className: "text-white font-bold text-lg",
              children: "C"
            })
          }), /* @__PURE__ */ jsx("span", {
            className: "text-xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent",
            children: "CollabBoard"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400",
          children: "© 2024 CollabBoard. All rights reserved."
        })]
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const generateId = () => Math.random().toString(36).substr(2, 9);
const useStore = create()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, password) => {
        const storedUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
        const user = storedUsers.find((u) => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true });
        } else {
          throw new Error("Invalid credentials");
        }
      },
      signup: async (name, email, password) => {
        const newUser = {
          id: generateId(),
          name,
          email,
          plan: "free",
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        const storedUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
        storedUsers.push(newUser);
        localStorage.setItem("mockUsers", JSON.stringify(storedUsers));
        set({ user: newUser, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, currentWorkspaceId: null, currentBoardId: null });
      },
      // Theme
      theme: "light",
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          return { theme: newTheme };
        });
      },
      // Workspaces
      workspaces: [],
      currentWorkspaceId: null,
      setCurrentWorkspace: (id) => set({ currentWorkspaceId: id }),
      createWorkspace: (name, description) => {
        const user = get().user;
        if (!user) return;
        const workspace = {
          id: generateId(),
          name,
          description,
          ownerId: user.id,
          memberIds: [user.id],
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        set((state) => ({ workspaces: [...state.workspaces, workspace] }));
      },
      // Boards
      boards: [],
      currentBoardId: null,
      setCurrentBoard: (id) => set({ currentBoardId: id }),
      createBoard: (title, workspaceId, description) => {
        const colors = ["bg-cyan-500", "bg-teal-500", "bg-emerald-500", "bg-sky-500", "bg-blue-500"];
        const board = {
          id: generateId(),
          title,
          workspaceId,
          description,
          color: colors[Math.floor(Math.random() * colors.length)],
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        set((state) => ({ boards: [...state.boards, board] }));
        const defaultColumns = [
          { title: "To Do", color: "#06b6d4" },
          { title: "In Progress", color: "#14b8a6" },
          { title: "Done", color: "#10b981" }
        ];
        defaultColumns.forEach((col, index2) => {
          get().createColumn(col.title, board.id, col.color);
        });
      },
      updateBoard: (id, updates) => {
        set((state) => ({
          boards: state.boards.map((b) => b.id === id ? { ...b, ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : b)
        }));
      },
      deleteBoard: (id) => {
        set((state) => ({
          boards: state.boards.filter((b) => b.id !== id),
          columns: state.columns.filter((c) => c.boardId !== id),
          tasks: state.tasks.filter((t) => t.boardId !== id)
        }));
      },
      // Columns
      columns: [],
      createColumn: (title, boardId, color) => {
        const column = {
          id: generateId(),
          title,
          boardId,
          order: get().columns.filter((c) => c.boardId === boardId).length,
          color: color || "#06b6d4"
        };
        set((state) => ({ columns: [...state.columns, column] }));
      },
      updateColumn: (id, updates) => {
        set((state) => ({
          columns: state.columns.map((c) => c.id === id ? { ...c, ...updates } : c)
        }));
      },
      deleteColumn: (id) => {
        set((state) => ({
          columns: state.columns.filter((c) => c.id !== id),
          tasks: state.tasks.filter((t) => t.columnId !== id)
        }));
      },
      reorderColumns: (columnIds) => {
        set((state) => ({
          columns: state.columns.map((col) => ({
            ...col,
            order: columnIds.indexOf(col.id)
          }))
        }));
      },
      // Tasks
      tasks: [],
      createTask: (task) => {
        const newTask = {
          ...task,
          id: generateId(),
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map(
            (t) => t.id === id ? { ...t, ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : t
          )
        }));
      },
      deleteTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
      },
      moveTask: (taskId, newColumnId) => {
        set((state) => ({
          tasks: state.tasks.map(
            (t) => t.id === taskId ? { ...t, columnId: newColumnId, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : t
          )
        }));
      },
      // Analytics
      getTaskStats: () => {
        const { tasks, columns } = get();
        const doneColumn = columns.find((c) => c.title.toLowerCase().includes("done"));
        const inProgressColumn = columns.find((c) => c.title.toLowerCase().includes("progress"));
        const doneTasks = doneColumn ? tasks.filter((t) => t.columnId === doneColumn.id).length : 0;
        const inProgressTasks = inProgressColumn ? tasks.filter((t) => t.columnId === inProgressColumn.id).length : 0;
        const totalTasks = tasks.length;
        const pendingTasks = totalTasks - doneTasks - inProgressTasks;
        const overdueTasks = tasks.filter(
          (t) => t.dueDate && new Date(t.dueDate) < /* @__PURE__ */ new Date() && t.columnId !== doneColumn?.id
        ).length;
        return {
          total: totalTasks,
          completed: doneTasks,
          inProgress: inProgressTasks,
          pending: pendingTasks,
          overdue: overdueTasks
        };
      }
    }),
    {
      name: "collabboard-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        workspaces: state.workspaces,
        boards: state.boards,
        columns: state.columns,
        tasks: state.tasks
      })
    }
  )
);
const Input = forwardRef(
  ({ className, label, error, icon, ...props }, ref) => {
    return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      label && /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: label }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        icon && /* @__PURE__ */ jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", children: icon }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            ...props,
            className: cn(
              "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700",
              "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
              "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500",
              "transition-all duration-200",
              icon && "pl-10",
              error && "border-red-500 focus:ring-red-500",
              className
            )
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: error })
    ] });
  }
);
Input.displayName = "Input";
const login = UNSAFE_withComponentProps(function Login() {
  const navigate = useNavigate();
  const {
    login: login2,
    signup
  } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      if (isLogin) {
        await login2(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleAuth = () => {
    const mockUser = {
      id: "google_" + Math.random().toString(36).substr(2, 9),
      name: "Google User",
      email: "user@gmail.com",
      plan: "free",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    useStore.getState().setUser(mockUser);
    navigate("/dashboard");
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-900 via-cyan-950 to-teal-950 flex items-center justify-center p-4 relative overflow-hidden",
    children: /* @__PURE__ */ jsx(motion.div, {
      initial: {
        opacity: 0,
        scale: 0.95
      },
      animate: {
        opacity: 1,
        scale: 1
      },
      transition: {
        duration: 0.3
      },
      className: "w-full max-w-md",
      children: /* @__PURE__ */ jsxs(Card, {
        variant: "glass",
        className: "backdrop-blur-xl",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-8",
          children: [/* @__PURE__ */ jsxs(Link, {
            to: "/",
            className: "inline-flex items-center gap-2 mb-6",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-10 h-10 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30",
              children: /* @__PURE__ */ jsx("span", {
                className: "text-white font-bold text-xl",
                children: "C"
              })
            }), /* @__PURE__ */ jsx("span", {
              className: "text-2xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent",
              children: "CollabBoard"
            })]
          }), /* @__PURE__ */ jsx("h1", {
            className: "text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2",
            children: isLogin ? "Welcome back" : "Create account"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 dark:text-gray-400",
            children: isLogin ? "Sign in to continue to CollabBoard" : "Get started with your free account"
          })]
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit,
          className: "space-y-4",
          children: [!isLogin && /* @__PURE__ */ jsx(Input, {
            label: "Full Name",
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "John Doe",
            icon: /* @__PURE__ */ jsx(Mail, {
              className: "w-4 h-4"
            }),
            required: true
          }), /* @__PURE__ */ jsx(Input, {
            label: "Email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "you@example.com",
            icon: /* @__PURE__ */ jsx(Mail, {
              className: "w-4 h-4"
            }),
            required: true
          }), /* @__PURE__ */ jsx(Input, {
            label: "Password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: "••••••••",
            icon: /* @__PURE__ */ jsx(Lock, {
              className: "w-4 h-4"
            }),
            required: true,
            minLength: 6
          }), error && /* @__PURE__ */ jsx("div", {
            className: "p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm",
            children: error
          }), /* @__PURE__ */ jsx(Button, {
            type: "submit",
            variant: "primary",
            className: "w-full",
            isLoading,
            children: isLogin ? "Sign In" : "Sign Up"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative my-6",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute inset-0 flex items-center",
            children: /* @__PURE__ */ jsx("div", {
              className: "w-full border-t border-gray-300 dark:border-gray-700"
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "relative flex justify-center text-sm",
            children: /* @__PURE__ */ jsx("span", {
              className: "px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400",
              children: "Or continue with"
            })
          })]
        }), /* @__PURE__ */ jsxs(Button, {
          variant: "secondary",
          className: "w-full",
          onClick: handleGoogleAuth,
          children: [/* @__PURE__ */ jsx(Chrome, {
            className: "w-5 h-5 mr-2"
          }), "Sign in with Google"]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-6 text-center text-sm",
          children: [/* @__PURE__ */ jsx("span", {
            className: "text-gray-600 dark:text-gray-400",
            children: isLogin ? "Don't have an account? " : "Already have an account? "
          }), /* @__PURE__ */ jsx("button", {
            type: "button",
            onClick: () => {
              setIsLogin(!isLogin);
              setError("");
            },
            className: "text-cyan-400 dark:text-cyan-300 font-medium hover:underline",
            children: isLogin ? "Sign up" : "Sign in"
          })]
        })]
      })
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
const Navbar = () => {
  const { user, isAuthenticated, logout, boards: boards2, tasks, columns } = useStore();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const results = [];
    boards2.forEach((board) => {
      if (board.title.toLowerCase().includes(query)) {
        results.push({ type: "board", id: board.id, title: board.title });
      }
    });
    tasks.forEach((task) => {
      if (task.title.toLowerCase().includes(query) || task.description?.toLowerCase().includes(query)) {
        results.push({
          type: "task",
          id: task.id,
          title: task.title,
          boardId: task.boardId
        });
      }
    });
    setSearchResults(results.slice(0, 10));
  }, [searchQuery, boards2, tasks]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);
  const handleLogout = () => {
    logout();
    navigate("/");
    setUserMenuOpen(false);
  };
  const handleSearchResultClick = (result) => {
    if (result.type === "board") {
      navigate(`/boards/${result.id}`);
    } else if (result.type === "task" && result.boardId) {
      navigate(`/boards/${result.boardId}`);
    }
    setSearchOpen(false);
    setSearchQuery("");
  };
  if (!isAuthenticated) {
    return null;
  }
  return /* @__PURE__ */ jsx("nav", { className: "sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-b border-gray-200/50 dark:border-slate-800/50 shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2 group", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          whileHover: { rotate: 360 },
          transition: { duration: 0.6 },
          className: "w-8 h-8 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30",
          children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-lg", children: "C" })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent", children: "CollabBoard" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:flex flex-1 max-w-md mx-4 relative", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: searchOpen ? /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { width: 0, opacity: 0 },
        animate: { width: "100%", opacity: 1 },
        exit: { width: 0, opacity: 0 },
        transition: { duration: 0.2 },
        className: "relative w-full",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                placeholder: "Search boards, tasks...",
                icon: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" }),
                className: "w-full pr-10",
                autoFocus: true,
                onKeyDown: (e) => {
                  if (e.key === "Escape") {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }
                }
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  setSearchOpen(false);
                  setSearchQuery("");
                },
                className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 h-6 w-6 min-w-0",
                children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          searchQuery && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              className: "absolute top-full mt-2 w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden z-50 max-h-96 overflow-y-auto",
              children: searchResults.length > 0 ? /* @__PURE__ */ jsx("div", { className: "p-2", children: searchResults.map((result) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleSearchResultClick(result),
                  className: "w-full text-left px-4 py-3 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-950/20 transition-colors flex items-center gap-3 group",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center ${result.type === "board" ? "bg-gradient-to-br from-cyan-500 to-teal-500" : "bg-gradient-to-br from-blue-500 to-indigo-500"}`, children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 text-white" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors", children: result.title }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 capitalize", children: result.type })
                    ] })
                  ]
                },
                `${result.type}-${result.id}`
              )) }) : /* @__PURE__ */ jsxs("div", { className: "p-8 text-center text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsx(Search, { className: "w-8 h-8 mx-auto mb-2 opacity-50" }),
                /* @__PURE__ */ jsx("p", { children: "No results found" })
              ] })
            }
          )
        ]
      },
      "search-open"
    ) : /* @__PURE__ */ jsxs(
      motion.button,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: () => setSearchOpen(true),
        className: "w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-300 dark:hover:border-gray-700",
        type: "button",
        children: [
          /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children: "Search boards, tasks..." }),
          /* @__PURE__ */ jsxs("kbd", { className: "hidden lg:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: "⌘" }),
            "K"
          ] })
        ]
      },
      "search-closed"
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: () => setSearchOpen(true),
        children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" })
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      !searchOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setNotificationOpen(!notificationOpen),
              className: "relative",
              children: [
                /* @__PURE__ */ jsx(Bell, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    initial: { scale: 0 },
                    animate: { scale: 1 },
                    className: "absolute top-0 right-0 w-2 h-2 bg-gradient-to-r from-red-500 to-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { children: notificationOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "fixed inset-0 z-10",
                onClick: () => setNotificationOpen(false)
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -10, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: -10, scale: 0.95 },
                transition: { duration: 0.15 },
                className: "absolute right-0 mt-2 w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-slate-800/50 z-20 overflow-hidden",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-gray-200 dark:border-slate-800", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-gray-100", children: "Notifications" }) }),
                  /* @__PURE__ */ jsx("div", { className: "max-h-96 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "p-8 text-center text-sm text-gray-500 dark:text-gray-400", children: [
                    /* @__PURE__ */ jsx(Bell, { className: "w-8 h-8 mx-auto mb-2 opacity-50" }),
                    /* @__PURE__ */ jsx("p", { children: "No new notifications" })
                  ] }) })
                ]
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => navigate("/settings"),
            title: "Settings",
            children: /* @__PURE__ */ jsx(Settings, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative ml-4 pl-4 border-l border-gray-200 dark:border-slate-800", children: [
        /* @__PURE__ */ jsxs(
          motion.button,
          {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            onClick: () => setUserMenuOpen(!userMenuOpen),
            className: "flex items-center gap-2 group",
            type: "button",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30", children: /* @__PURE__ */ jsx("span", { className: "text-white font-medium text-sm", children: user?.name.charAt(0).toUpperCase() || "U" }) }),
              /* @__PURE__ */ jsx("span", { className: "hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300", children: user?.name }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: { rotate: userMenuOpen ? 180 : 0 },
                  transition: { duration: 0.2 },
                  children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-gray-500" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: userMenuOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "fixed inset-0 z-10",
              onClick: () => setUserMenuOpen(false)
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: -10, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: -10, scale: 0.95 },
              transition: { duration: 0.15 },
              className: "absolute right-0 mt-2 w-56 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-slate-800/50 z-20 overflow-hidden",
              children: /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "px-3 py-2 border-b border-gray-200 dark:border-slate-800", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900 dark:text-gray-100", children: user?.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: user?.email })
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      navigate("/settings");
                      setUserMenuOpen(false);
                    },
                    className: "w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 rounded-lg transition-colors flex items-center gap-2",
                    type: "button",
                    children: [
                      /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }),
                      "Profile"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleLogout,
                    className: "w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors flex items-center gap-2",
                    type: "button",
                    children: [
                      /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
                      "Logout"
                    ]
                  }
                )
              ] })
            }
          )
        ] }) })
      ] })
    ] })
  ] }) }) });
};
const Modal = ({ isOpen, onClose, title, children, size = "md", showCloseButton = true }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 20 },
        className: cn(
          "bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full",
          sizes[size],
          "pointer-events-auto max-h-[90vh] overflow-y-auto"
        ),
        onClick: (e) => e.stopPropagation(),
        children: [
          (title || showCloseButton) && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800", children: [
            title && /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: title }),
            showCloseButton && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: onClose,
                className: "ml-auto",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6", children })
        ]
      }
    ) })
  ] }) });
};
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: KanbanSquare, label: "Boards", path: "/boards" },
  { icon: Users, label: "Team", path: "/team" },
  { icon: Settings, label: "Settings", path: "/settings" }
];
const Sidebar = () => {
  const { isAuthenticated } = useStore();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const { workspaces, currentWorkspaceId, setCurrentWorkspace, createWorkspace } = useStore();
  workspaces.find((w) => w.id === currentWorkspaceId);
  const handleCreateWorkspace = () => {
    if (workspaceName.trim()) {
      createWorkspace(workspaceName.trim());
      setWorkspaceName("");
      setIsWorkspaceModalOpen(false);
    }
  };
  if (!isAuthenticated) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsMobileOpen(!isMobileOpen),
        className: "lg:hidden fixed top-4 left-4 z-40 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-slate-800",
        children: isMobileOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
      }
    ),
    isMobileOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "lg:hidden fixed inset-0 bg-black/50 z-30",
        onClick: () => setIsMobileOpen(false)
      }
    ),
    /* @__PURE__ */ jsx(
      motion.aside,
      {
        initial: false,
        animate: {
          width: isCollapsed ? "80px" : "280px"
        },
        className: `fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-r border-gray-200/50 dark:border-slate-800/50 overflow-hidden transition-all duration-300 z-30 shadow-lg lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-200 dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              !isCollapsed && /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider", children: "Workspace" }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setIsCollapsed(!isCollapsed),
                  className: "ml-auto",
                  children: isCollapsed ? /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
                }
              )
            ] }),
            !isCollapsed && /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "primary",
                size: "sm",
                onClick: () => setIsWorkspaceModalOpen(true),
                className: "w-full",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
                  "New Workspace"
                ]
              }
            ),
            isCollapsed && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "primary",
                size: "sm",
                onClick: () => setIsWorkspaceModalOpen(true),
                className: "w-full p-2",
                children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4", children: [
            workspaces.length > 0 && !isCollapsed && /* @__PURE__ */ jsx("div", { className: "mb-4", children: workspaces.map((workspace) => /* @__PURE__ */ jsx(
              motion.button,
              {
                whileHover: { x: 4 },
                onClick: () => setCurrentWorkspace(workspace.id),
                className: `w-full text-left px-3 py-2 rounded-lg mb-2 transition-all ${currentWorkspaceId === workspace.id ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/30" : "hover:bg-cyan-50 dark:hover:bg-cyan-950/20 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"}`,
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: workspace.name })
                ] })
              },
              workspace.id
            )) }),
            /* @__PURE__ */ jsx("nav", { className: "space-y-1", children: menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
              return /* @__PURE__ */ jsx(
                motion.div,
                {
                  whileHover: { x: 4 },
                  children: /* @__PURE__ */ jsxs(
                    Link,
                    {
                      to: item.path,
                      onClick: () => setIsMobileOpen(false),
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/30" : "text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 hover:text-cyan-600 dark:hover:text-cyan-400"}`,
                      children: [
                        /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }),
                        !isCollapsed && /* @__PURE__ */ jsx("span", { className: "font-medium", children: item.label })
                      ]
                    }
                  )
                },
                item.path
              );
            }) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        isOpen: isWorkspaceModalOpen,
        onClose: () => setIsWorkspaceModalOpen(false),
        title: "Create New Workspace",
        size: "md",
        children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              label: "Workspace Name",
              value: workspaceName,
              onChange: (e) => setWorkspaceName(e.target.value),
              placeholder: "Enter workspace name",
              onKeyPress: (e) => e.key === "Enter" && handleCreateWorkspace()
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-end", children: [
            /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: () => setIsWorkspaceModalOpen(false), children: "Cancel" }),
            /* @__PURE__ */ jsx(Button, { variant: "primary", onClick: handleCreateWorkspace, children: "Create Workspace" })
          ] })
        ] })
      }
    )
  ] });
};
const COLORS = ["#06b6d4", "#14b8a6", "#10b981", "#f59e0b"];
function meta$5() {
  return [{
    title: "Dashboard | CollabBoard"
  }];
}
const dashboard = UNSAFE_withComponentProps(function Dashboard() {
  const {
    user,
    isAuthenticated,
    boards: boards2,
    tasks,
    getTaskStats,
    createBoard,
    currentWorkspaceId
  } = useStore();
  const navigate = useNavigate();
  const stats = getTaskStats();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) {
    return null;
  }
  const recentBoards = boards2.filter((b) => !currentWorkspaceId || b.workspaceId === currentWorkspaceId).slice(0, 4);
  const taskDistributionData = [{
    name: "Done",
    value: stats.completed,
    color: COLORS[2]
  }, {
    name: "In Progress",
    value: stats.inProgress,
    color: COLORS[1]
  }, {
    name: "To Do",
    value: stats.pending,
    color: COLORS[0]
  }, {
    name: "Overdue",
    value: stats.overdue,
    color: COLORS[3]
  }].filter((item) => item.value > 0);
  const weeklyData = [{
    day: "Mon",
    tasks: 12
  }, {
    day: "Tue",
    tasks: 19
  }, {
    day: "Wed",
    tasks: 15
  }, {
    day: "Thu",
    tasks: 22
  }, {
    day: "Fri",
    tasks: 18
  }, {
    day: "Sat",
    tasks: 8
  }, {
    day: "Sun",
    tasks: 5
  }];
  const priorityData = [{
    priority: "High",
    count: tasks.filter((t) => t.priority === "high").length
  }, {
    priority: "Medium",
    count: tasks.filter((t) => t.priority === "medium").length
  }, {
    priority: "Low",
    count: tasks.filter((t) => t.priority === "low").length
  }];
  const handleCreateBoard = () => {
    if (!currentWorkspaceId) {
      alert("Please select or create a workspace first");
      return;
    }
    const title = prompt("Enter board name:");
    if (title) {
      createBoard(title, currentWorkspaceId);
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950",
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsx("main", {
      className: "ml-0 lg:ml-[280px] pt-16 p-4 sm:p-6 lg:p-8",
      children: /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("h1", {
              className: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2",
              children: ["Welcome back, ", user?.name, "! 👋"]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Here's what's happening with your projects today."
            })]
          }), /* @__PURE__ */ jsxs(Button, {
            onClick: handleCreateBoard,
            className: "w-full sm:w-auto",
            children: [/* @__PURE__ */ jsx(Plus, {
              className: "w-5 h-5 mr-2"
            }), "New Board"]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
          children: [/* @__PURE__ */ jsx(Card, {
            variant: "glass",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                  children: "Total Tasks"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-3xl font-bold text-gray-900 dark:text-gray-100",
                  children: stats.total
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30",
                children: /* @__PURE__ */ jsx(KanbanSquare, {
                  className: "w-6 h-6 text-white"
                })
              })]
            })
          }), /* @__PURE__ */ jsx(Card, {
            variant: "glass",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                  children: "Completed"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-3xl font-bold text-green-600 dark:text-green-400",
                  children: stats.completed
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center",
                children: /* @__PURE__ */ jsx(CheckCircle2, {
                  className: "w-6 h-6 text-white"
                })
              })]
            })
          }), /* @__PURE__ */ jsx(Card, {
            variant: "glass",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                  children: "In Progress"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-3xl font-bold text-blue-600 dark:text-blue-400",
                  children: stats.inProgress
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center",
                children: /* @__PURE__ */ jsx(Clock, {
                  className: "w-6 h-6 text-white"
                })
              })]
            })
          }), /* @__PURE__ */ jsx(Card, {
            variant: "glass",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                  children: "Overdue"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-3xl font-bold text-red-600 dark:text-red-400",
                  children: stats.overdue
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center",
                children: /* @__PURE__ */ jsx(AlertCircle, {
                  className: "w-6 h-6 text-white"
                })
              })]
            })
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",
          children: [/* @__PURE__ */ jsxs(Card, {
            variant: "glass",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4",
              children: "Task Distribution"
            }), taskDistributionData.length > 0 ? /* @__PURE__ */ jsx(ResponsiveContainer, {
              width: "100%",
              height: 300,
              children: /* @__PURE__ */ jsxs(PieChart, {
                children: [/* @__PURE__ */ jsx(Pie, {
                  data: taskDistributionData,
                  cx: "50%",
                  cy: "50%",
                  labelLine: false,
                  label: (props) => {
                    const {
                      name,
                      percent
                    } = props;
                    return `${name} ${((percent || 0) * 100).toFixed(0)}%`;
                  },
                  outerRadius: 80,
                  fill: "#8884d8",
                  dataKey: "value",
                  children: taskDistributionData.map((entry2, index2) => /* @__PURE__ */ jsx(Cell, {
                    fill: entry2.color
                  }, `cell-${index2}`))
                }), /* @__PURE__ */ jsx(Tooltip$1, {})]
              })
            }) : /* @__PURE__ */ jsx("div", {
              className: "h-[300px] flex items-center justify-center text-gray-400",
              children: "No tasks yet"
            })]
          }), /* @__PURE__ */ jsxs(Card, {
            variant: "glass",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4",
              children: "Weekly Activity"
            }), /* @__PURE__ */ jsx(ResponsiveContainer, {
              width: "100%",
              height: 300,
              children: /* @__PURE__ */ jsxs(LineChart, {
                data: weeklyData,
                children: [/* @__PURE__ */ jsx(CartesianGrid, {
                  strokeDasharray: "3 3",
                  className: "stroke-gray-300 dark:stroke-gray-700"
                }), /* @__PURE__ */ jsx(XAxis, {
                  dataKey: "day",
                  className: "text-gray-600 dark:text-gray-400"
                }), /* @__PURE__ */ jsx(YAxis, {
                  className: "text-gray-600 dark:text-gray-400"
                }), /* @__PURE__ */ jsx(Tooltip$1, {
                  contentStyle: {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px"
                  }
                }), /* @__PURE__ */ jsx(Line, {
                  type: "monotone",
                  dataKey: "tasks",
                  stroke: "#06b6d4",
                  strokeWidth: 2,
                  dot: {
                    fill: "#06b6d4",
                    r: 4
                  }
                })]
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",
          children: [/* @__PURE__ */ jsxs(Card, {
            variant: "glass",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4",
              children: "Tasks by Priority"
            }), /* @__PURE__ */ jsx(ResponsiveContainer, {
              width: "100%",
              height: 300,
              children: /* @__PURE__ */ jsxs(BarChart, {
                data: priorityData,
                children: [/* @__PURE__ */ jsx(CartesianGrid, {
                  strokeDasharray: "3 3",
                  className: "stroke-gray-300 dark:stroke-gray-700"
                }), /* @__PURE__ */ jsx(XAxis, {
                  dataKey: "priority",
                  className: "text-gray-600 dark:text-gray-400"
                }), /* @__PURE__ */ jsx(YAxis, {
                  className: "text-gray-600 dark:text-gray-400"
                }), /* @__PURE__ */ jsx(Tooltip$1, {
                  contentStyle: {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px"
                  }
                }), /* @__PURE__ */ jsx(Bar, {
                  dataKey: "count",
                  fill: "#06b6d4",
                  radius: [8, 8, 0, 0]
                })]
              })
            })]
          }), /* @__PURE__ */ jsxs(Card, {
            variant: "glass",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between mb-4",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-xl font-semibold text-gray-900 dark:text-gray-100",
                children: "Recent Boards"
              }), /* @__PURE__ */ jsxs(Button, {
                variant: "ghost",
                size: "sm",
                onClick: () => navigate("/boards"),
                children: ["View All", /* @__PURE__ */ jsx(ArrowRight, {
                  className: "w-4 h-4 ml-2"
                })]
              })]
            }), recentBoards.length > 0 ? /* @__PURE__ */ jsx("div", {
              className: "space-y-3",
              children: recentBoards.map((board) => /* @__PURE__ */ jsxs("button", {
                onClick: () => navigate(`/boards/${board.id}`),
                className: "w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: `w-12 h-12 ${board.color.includes("violet") ? "bg-gradient-to-br from-cyan-500 to-teal-500" : board.color} rounded-lg flex items-center justify-center shadow-lg`,
                  children: /* @__PURE__ */ jsx(KanbanSquare, {
                    className: "w-6 h-6 text-white"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex-1",
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "font-medium text-gray-900 dark:text-gray-100",
                    children: board.title
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: [tasks.filter((t) => t.boardId === board.id).length, " tasks"]
                  })]
                })]
              }, board.id))
            }) : /* @__PURE__ */ jsxs("div", {
              className: "text-center py-8 text-gray-400",
              children: [/* @__PURE__ */ jsx(KanbanSquare, {
                className: "w-12 h-12 mx-auto mb-2 opacity-50"
              }), /* @__PURE__ */ jsx("p", {
                children: "No boards yet. Create one to get started!"
              })]
            })]
          })]
        })]
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4() {
  return [{
    title: "Boards | CollabBoard"
  }];
}
const boards = UNSAFE_withComponentProps(function Boards() {
  const navigate = useNavigate();
  const {
    boards: boards2,
    tasks,
    currentWorkspaceId,
    createBoard
  } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const filteredBoards = boards2.filter((b) => !currentWorkspaceId || b.workspaceId === currentWorkspaceId).filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleCreateBoard = () => {
    if (!currentWorkspaceId) {
      alert("Please select or create a workspace first");
      return;
    }
    if (newBoardTitle.trim()) {
      createBoard(newBoardTitle.trim(), currentWorkspaceId);
      setNewBoardTitle("");
      setIsCreating(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950",
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsx("main", {
      className: "ml-0 lg:ml-[280px] pt-16 p-4 sm:p-6 lg:p-8",
      children: /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2",
              children: "Your Boards"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Manage your Kanban boards and projects"
            })]
          }), /* @__PURE__ */ jsxs(Button, {
            onClick: () => setIsCreating(true),
            children: [/* @__PURE__ */ jsx(Plus, {
              className: "w-5 h-5 mr-2"
            }), "New Board"]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mb-6",
          children: /* @__PURE__ */ jsx(Input, {
            placeholder: "Search boards...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            icon: /* @__PURE__ */ jsx(Search, {
              className: "w-4 h-4"
            })
          })
        }), isCreating && /* @__PURE__ */ jsxs(Card, {
          variant: "glass",
          className: "mb-6",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4",
            children: "Create New Board"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex gap-3",
            children: [/* @__PURE__ */ jsx(Input, {
              placeholder: "Board name",
              value: newBoardTitle,
              onChange: (e) => setNewBoardTitle(e.target.value),
              onKeyPress: (e) => e.key === "Enter" && handleCreateBoard(),
              className: "flex-1"
            }), /* @__PURE__ */ jsx(Button, {
              onClick: handleCreateBoard,
              children: "Create"
            }), /* @__PURE__ */ jsx(Button, {
              variant: "secondary",
              onClick: () => setIsCreating(false),
              children: "Cancel"
            })]
          })]
        }), filteredBoards.length > 0 ? /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
          children: filteredBoards.map((board) => {
            const boardTasks = tasks.filter((t) => t.boardId === board.id);
            return /* @__PURE__ */ jsx(motion.div, {
              initial: {
                opacity: 0,
                scale: 0.95
              },
              animate: {
                opacity: 1,
                scale: 1
              },
              whileHover: {
                y: -4
              },
              children: /* @__PURE__ */ jsxs(Card, {
                variant: "glass",
                className: "cursor-pointer h-full",
                onClick: () => navigate(`/boards/${board.id}`),
                children: [/* @__PURE__ */ jsx("div", {
                  className: `w-full h-32 ${board.color} rounded-xl mb-4 flex items-center justify-center`,
                  children: /* @__PURE__ */ jsx(KanbanSquare, {
                    className: "w-12 h-12 text-white opacity-80"
                  })
                }), /* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2",
                  children: board.title
                }), board.description && /* @__PURE__ */ jsx("p", {
                  className: "text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2",
                  children: board.description
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center justify-between text-sm text-gray-500 dark:text-gray-400",
                  children: [/* @__PURE__ */ jsxs("span", {
                    children: [boardTasks.length, " tasks"]
                  }), /* @__PURE__ */ jsx("span", {
                    children: formatDate(board.updatedAt)
                  })]
                })]
              })
            }, board.id);
          })
        }) : /* @__PURE__ */ jsxs(Card, {
          variant: "glass",
          className: "text-center py-12",
          children: [/* @__PURE__ */ jsx(KanbanSquare, {
            className: "w-16 h-16 mx-auto mb-4 text-gray-400"
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2",
            children: "No boards found"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 dark:text-gray-400 mb-6",
            children: searchQuery ? "Try a different search term" : "Create your first board to get started"
          }), !searchQuery && /* @__PURE__ */ jsxs(Button, {
            onClick: () => setIsCreating(true),
            children: [/* @__PURE__ */ jsx(Plus, {
              className: "w-5 h-5 mr-2"
            }), "Create Board"]
          })]
        })]
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: boards,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const Tooltip = ({ content, children, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };
  const arrows = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700",
    left: "left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700",
    right: "right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative inline-block",
      onMouseEnter: () => setIsVisible(true),
      onMouseLeave: () => setIsVisible(false),
      onClick: (e) => {
        if (e.target.closest("button, a, input, select, textarea")) {
          return;
        }
      },
      children: [
        children,
        /* @__PURE__ */ jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.9 },
            className: `absolute z-50 pointer-events-none ${positions[position]}`,
            children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 dark:bg-gray-700 text-white text-sm py-2 px-3 rounded-lg shadow-xl whitespace-nowrap", children: [
              content,
              /* @__PURE__ */ jsx("div", { className: `absolute w-0 h-0 border-4 border-transparent ${arrows[position]}` })
            ] })
          }
        ) })
      ]
    }
  );
};
function SortableColumn({
  id,
  title,
  color,
  tasks,
  onAddTask,
  onDeleteColumn
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  const columnTasks = tasks.filter((t) => t.columnId === id);
  return /* @__PURE__ */ jsxs("div", {
    ref: setNodeRef,
    style,
    className: "flex-shrink-0 w-full sm:w-80 bg-gray-100 dark:bg-gray-800 rounded-xl p-4",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex items-center justify-between mb-4",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2",
        children: [/* @__PURE__ */ jsx("div", {
          className: "w-3 h-3 rounded-full",
          style: {
            backgroundColor: color
          }
        }), /* @__PURE__ */ jsx("h3", {
          className: "font-semibold text-gray-900 dark:text-gray-100",
          children: title
        }), /* @__PURE__ */ jsxs("span", {
          className: "text-sm text-gray-500 dark:text-gray-400",
          children: ["(", columnTasks.length, ")"]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-1",
        children: [/* @__PURE__ */ jsx(Tooltip, {
          content: "Add Task",
          children: /* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "sm",
            onClick: onAddTask,
            children: /* @__PURE__ */ jsx(Plus, {
              className: "w-4 h-4"
            })
          })
        }), /* @__PURE__ */ jsx(Tooltip, {
          content: "Delete Column",
          children: /* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "sm",
            onClick: onDeleteColumn,
            children: /* @__PURE__ */ jsx(Trash2, {
              className: "w-4 h-4"
            })
          })
        })]
      })]
    }), /* @__PURE__ */ jsx(SortableContext, {
      items: columnTasks.map((t) => t.id),
      strategy: verticalListSortingStrategy,
      children: /* @__PURE__ */ jsx("div", {
        className: "space-y-3 min-h-[200px]",
        children: columnTasks.map((task) => /* @__PURE__ */ jsx(TaskCard, {
          task
        }, task.id))
      })
    })]
  });
}
function TaskCard({
  task
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id
  });
  const {
    updateTask,
    deleteTask
  } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500"
  };
  const handleSave = () => {
    if (editTitle.trim()) {
      updateTask(task.id, {
        title: editTitle.trim()
      });
      setIsEditing(false);
    }
  };
  return /* @__PURE__ */ jsx(motion.div, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
    whileHover: {
      scale: 1.02
    },
    className: "bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800 cursor-grab active:cursor-grabbing",
    children: isEditing ? /* @__PURE__ */ jsxs("div", {
      className: "space-y-2",
      children: [/* @__PURE__ */ jsx(Input, {
        value: editTitle,
        onChange: (e) => setEditTitle(e.target.value),
        onKeyPress: (e) => e.key === "Enter" && handleSave(),
        autoFocus: true
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex gap-2",
        children: [/* @__PURE__ */ jsx(Button, {
          size: "sm",
          onClick: handleSave,
          children: "Save"
        }), /* @__PURE__ */ jsx(Button, {
          variant: "secondary",
          size: "sm",
          onClick: () => setIsEditing(false),
          children: "Cancel"
        })]
      })]
    }) : /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-start justify-between mb-2",
        children: [/* @__PURE__ */ jsx("h4", {
          className: "font-medium text-gray-900 dark:text-gray-100 flex-1",
          children: task.title
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-1",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "sm",
            onClick: (e) => {
              e.stopPropagation();
              setIsEditing(true);
            },
            children: /* @__PURE__ */ jsx(Edit2, {
              className: "w-3 h-3"
            })
          }), /* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "sm",
            onClick: (e) => {
              e.stopPropagation();
              deleteTask(task.id);
            },
            children: /* @__PURE__ */ jsx(X, {
              className: "w-3 h-3"
            })
          })]
        })]
      }), task.description && /* @__PURE__ */ jsx("p", {
        className: "text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2",
        children: task.description
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2 mt-3",
        children: [task.priority && /* @__PURE__ */ jsx("div", {
          className: `w-2 h-2 rounded-full ${priorityColors[task.priority] || "bg-gray-400"}`
        }), task.dueDate && /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400",
          children: [/* @__PURE__ */ jsx(Calendar, {
            className: "w-3 h-3"
          }), formatDate(task.dueDate)]
        })]
      })]
    })
  });
}
function meta$3() {
  return [{
    title: "Board | CollabBoard"
  }];
}
const boards_$boardId = UNSAFE_withComponentProps(function BoardPage() {
  const {
    boardId
  } = useParams();
  const navigate = useNavigate();
  const {
    boards: boards2,
    columns,
    tasks,
    updateTask,
    moveTask,
    createTask,
    createColumn,
    deleteColumn,
    reorderColumns
  } = useStore();
  const [activeId, setActiveId] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnColor, setNewColumnColor] = useState("#06b6d4");
  const board = boards2.find((b) => b.id === boardId);
  const boardColumns = columns.filter((c) => c.boardId === boardId).sort((a, b) => a.order - b.order);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  }));
  if (!board) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center",
      children: /* @__PURE__ */ jsxs(Card, {
        variant: "glass",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400 mb-4",
          children: "Board not found"
        }), /* @__PURE__ */ jsx(Button, {
          onClick: () => navigate("/boards"),
          children: "Go Back"
        })]
      })
    });
  }
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };
  const handleDragOver = (event) => {
    const {
      active,
      over
    } = event;
    if (!over) return;
    const activeId2 = active.id;
    const overId = over.id;
    if (boardColumns.some((col) => col.id === overId)) {
      const activeTask2 = tasks.find((t) => t.id === activeId2);
      if (activeTask2 && activeTask2.columnId !== overId) {
        moveTask(activeId2, overId);
      }
    }
  };
  const handleDragEnd = (event) => {
    const {
      active,
      over
    } = event;
    setActiveId(null);
    if (!over) return;
    const activeId2 = active.id;
    const overId = over.id;
    const activeColumn = boardColumns.find((c) => c.id === activeId2);
    const overColumn = boardColumns.find((c) => c.id === overId);
    if (activeColumn && overColumn) {
      const oldIndex = activeColumn.order;
      const newIndex = overColumn.order;
      const newColumns = [...boardColumns];
      newColumns.splice(oldIndex, 1);
      newColumns.splice(newIndex, 0, activeColumn);
      reorderColumns(newColumns.map((c) => c.id));
      return;
    }
    const activeTask2 = tasks.find((t) => t.id === activeId2);
    if (activeTask2 && activeTask2.columnId !== overId) {
      moveTask(activeId2, overId);
    }
  };
  const handleCreateTask = () => {
    if (newTaskTitle.trim() && selectedColumnId) {
      createTask({
        title: newTaskTitle.trim(),
        description: newTaskDescription,
        columnId: selectedColumnId,
        boardId: board.id,
        priority: newTaskPriority
      });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setSelectedColumnId(null);
      setIsTaskModalOpen(false);
    }
  };
  const handleCreateColumn = () => {
    if (newColumnTitle.trim()) {
      createColumn(newColumnTitle.trim(), board.id, newColumnColor);
      setNewColumnTitle("");
      setIsColumnModalOpen(false);
    }
  };
  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950",
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsx("main", {
      className: "ml-0 lg:ml-[280px] pt-16 p-4 sm:p-6 lg:p-8",
      children: /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between mb-6",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2",
              children: board.title
            }), board.description && /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: board.description
            })]
          }), /* @__PURE__ */ jsxs(Button, {
            onClick: () => setIsColumnModalOpen(true),
            children: [/* @__PURE__ */ jsx(Plus, {
              className: "w-5 h-5 mr-2"
            }), "Add Column"]
          })]
        }), /* @__PURE__ */ jsxs(DndContext, {
          sensors,
          collisionDetection: closestCorners,
          onDragStart: handleDragStart,
          onDragOver: handleDragOver,
          onDragEnd: handleDragEnd,
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex gap-4 overflow-x-auto pb-4",
            children: /* @__PURE__ */ jsx(SortableContext, {
              items: boardColumns.map((c) => c.id),
              strategy: verticalListSortingStrategy,
              children: boardColumns.map((column) => /* @__PURE__ */ jsx(SortableColumn, {
                id: column.id,
                title: column.title,
                color: column.color,
                tasks,
                onAddTask: () => {
                  setSelectedColumnId(column.id);
                  setIsTaskModalOpen(true);
                },
                onDeleteColumn: () => deleteColumn(column.id)
              }, column.id))
            })
          }), /* @__PURE__ */ jsx(DragOverlay, {
            children: activeTask ? /* @__PURE__ */ jsx("div", {
              className: "bg-white dark:bg-gray-900 rounded-lg p-4 shadow-xl border border-gray-200 dark:border-gray-800 w-64",
              children: /* @__PURE__ */ jsx("h4", {
                className: "font-medium text-gray-900 dark:text-gray-100",
                children: activeTask.title
              })
            }) : null
          })]
        })]
      })
    }), /* @__PURE__ */ jsx(Modal, {
      isOpen: isTaskModalOpen,
      onClose: () => setIsTaskModalOpen(false),
      title: "Create New Task",
      size: "md",
      children: /* @__PURE__ */ jsxs("div", {
        className: "space-y-4",
        children: [/* @__PURE__ */ jsx(Input, {
          label: "Task Title",
          value: newTaskTitle,
          onChange: (e) => setNewTaskTitle(e.target.value),
          placeholder: "Enter task title",
          required: true
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            children: "Description"
          }), /* @__PURE__ */ jsx("textarea", {
            value: newTaskDescription,
            onChange: (e) => setNewTaskDescription(e.target.value),
            placeholder: "Enter task description",
            className: "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200",
            rows: 3
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            children: "Priority"
          }), /* @__PURE__ */ jsx("div", {
            className: "flex gap-2",
            children: ["low", "medium", "high"].map((priority) => /* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setNewTaskPriority(priority),
              className: `flex-1 px-4 py-2 rounded-lg border transition-all ${newTaskPriority === priority ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300" : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-cyan-300"}`,
              children: priority.charAt(0).toUpperCase() + priority.slice(1)
            }, priority))
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex gap-3 justify-end",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "secondary",
            onClick: () => setIsTaskModalOpen(false),
            children: "Cancel"
          }), /* @__PURE__ */ jsx(Button, {
            onClick: handleCreateTask,
            disabled: !newTaskTitle.trim(),
            children: "Create Task"
          })]
        })]
      })
    }), /* @__PURE__ */ jsx(Modal, {
      isOpen: isColumnModalOpen,
      onClose: () => setIsColumnModalOpen(false),
      title: "Create New Column",
      size: "md",
      children: /* @__PURE__ */ jsxs("div", {
        className: "space-y-4",
        children: [/* @__PURE__ */ jsx(Input, {
          label: "Column Title",
          value: newColumnTitle,
          onChange: (e) => setNewColumnTitle(e.target.value),
          placeholder: "Enter column title",
          required: true
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            children: "Color"
          }), /* @__PURE__ */ jsx("input", {
            type: "color",
            value: newColumnColor,
            onChange: (e) => setNewColumnColor(e.target.value),
            className: "w-full h-12 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex gap-3 justify-end",
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "secondary",
            onClick: () => setIsColumnModalOpen(false),
            children: "Cancel"
          }), /* @__PURE__ */ jsx(Button, {
            onClick: handleCreateColumn,
            disabled: !newColumnTitle.trim(),
            children: "Create Column"
          })]
        })]
      })
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: boards_$boardId,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const plans = [{
  id: "free",
  name: "Free",
  price: "$0",
  period: "/month",
  features: ["Up to 3 boards", "5 team members", "Basic analytics"]
}, {
  id: "pro",
  name: "Pro",
  price: "$19",
  period: "/month",
  features: ["Unlimited boards", "Unlimited team members", "Advanced analytics", "Priority support"],
  popular: true
}, {
  id: "enterprise",
  name: "Enterprise",
  price: "Custom",
  period: "",
  features: ["Everything in Pro", "Dedicated support", "Custom onboarding", "SSO & advanced security"]
}];
function meta$2() {
  return [{
    title: "Settings | CollabBoard"
  }];
}
const settings = UNSAFE_withComponentProps(function Settings2() {
  const {
    user,
    setUser,
    isAuthenticated
  } = useStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  if (!isAuthenticated || !user) {
    return null;
  }
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setUser({
        ...user,
        name,
        email
      });
      setIsSaving(false);
      alert("Profile updated successfully!");
    }, 500);
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      alert("Password changed successfully!");
    }, 500);
  };
  const handleUpgradePlan = (planId) => {
    setUser({
      ...user,
      plan: planId
    });
    alert(`Plan updated to ${planId}!`);
  };
  const tabs = [{
    id: "profile",
    label: "Profile",
    icon: User
  }, {
    id: "subscription",
    label: "Subscription",
    icon: CreditCard
  }, {
    id: "notifications",
    label: "Notifications",
    icon: Bell
  }, {
    id: "security",
    label: "Security",
    icon: Lock
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950",
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsx("main", {
      className: "ml-0 lg:ml-[280px] pt-16 p-4 sm:p-6 lg:p-8",
      children: /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8",
          children: "Settings"
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col lg:flex-row gap-6",
          children: [/* @__PURE__ */ jsx("div", {
            className: "lg:w-64 flex-shrink-0",
            children: /* @__PURE__ */ jsx(Card, {
              variant: "glass",
              className: "p-2",
              children: /* @__PURE__ */ jsx("nav", {
                className: "space-y-1",
                children: tabs.map((tab) => {
                  const Icon = tab.icon;
                  return /* @__PURE__ */ jsxs("button", {
                    onClick: () => setActiveTab(tab.id),
                    className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/30" : "text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 hover:text-cyan-600 dark:hover:text-cyan-400"}`,
                    children: [/* @__PURE__ */ jsx(Icon, {
                      className: "w-5 h-5"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: tab.label
                    })]
                  }, tab.id);
                })
              })
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex-1",
            children: [activeTab === "profile" && /* @__PURE__ */ jsxs(Card, {
              variant: "glass",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6",
                children: "Profile Settings"
              }), /* @__PURE__ */ jsxs("form", {
                onSubmit: handleUpdateProfile,
                className: "space-y-6",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center gap-6 mb-6",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "w-20 h-20 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30",
                    children: /* @__PURE__ */ jsx("span", {
                      className: "text-white font-bold text-2xl",
                      children: user.name.charAt(0).toUpperCase()
                    })
                  }), /* @__PURE__ */ jsx(Button, {
                    variant: "secondary",
                    type: "button",
                    children: "Change Avatar"
                  })]
                }), /* @__PURE__ */ jsx(Input, {
                  label: "Full Name",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  required: true
                }), /* @__PURE__ */ jsx(Input, {
                  label: "Email",
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  required: true
                }), /* @__PURE__ */ jsx("div", {
                  className: "flex gap-3",
                  children: /* @__PURE__ */ jsxs(Button, {
                    type: "submit",
                    isLoading: isSaving,
                    children: [/* @__PURE__ */ jsx(Save, {
                      className: "w-5 h-5 mr-2"
                    }), "Save Changes"]
                  })
                })]
              })]
            }), activeTab === "subscription" && /* @__PURE__ */ jsxs(Card, {
              variant: "glass",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6",
                children: "Subscription & Billing"
              }), /* @__PURE__ */ jsxs("div", {
                className: "mb-6",
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-gray-600 dark:text-gray-400 mb-2",
                  children: "Current Plan"
                }), /* @__PURE__ */ jsx("div", {
                  className: "inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-lg font-medium",
                  children: user.plan.charAt(0).toUpperCase() + user.plan.slice(1)
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
                children: plans.map((plan) => /* @__PURE__ */ jsxs(Card, {
                  variant: plan.popular ? "gradient" : "default",
                  className: `relative ${user.plan === plan.id ? "ring-2 ring-cyan-500 shadow-xl" : ""}`,
                  children: [plan.popular && /* @__PURE__ */ jsx("span", {
                    className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg",
                    children: "Popular"
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "text-center mb-4",
                    children: [/* @__PURE__ */ jsx("h3", {
                      className: "text-xl font-bold text-gray-900 dark:text-gray-100 mb-2",
                      children: plan.name
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "flex items-baseline justify-center gap-1",
                      children: [/* @__PURE__ */ jsx("span", {
                        className: "text-3xl font-bold text-gray-900 dark:text-gray-100",
                        children: plan.price
                      }), plan.period && /* @__PURE__ */ jsx("span", {
                        className: "text-gray-600 dark:text-gray-400",
                        children: plan.period
                      })]
                    })]
                  }), /* @__PURE__ */ jsx("ul", {
                    className: "space-y-2 mb-4",
                    children: plan.features.map((feature) => /* @__PURE__ */ jsxs("li", {
                      className: "text-sm text-gray-700 dark:text-gray-300",
                      children: ["• ", feature]
                    }, feature))
                  }), /* @__PURE__ */ jsx(Button, {
                    variant: user.plan === plan.id ? "secondary" : "primary",
                    className: "w-full",
                    onClick: () => handleUpgradePlan(plan.id),
                    disabled: user.plan === plan.id,
                    children: user.plan === plan.id ? "Current Plan" : "Upgrade"
                  })]
                }, plan.id))
              }), /* @__PURE__ */ jsxs("div", {
                className: "border-t border-gray-200 dark:border-gray-800 pt-6",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4",
                  children: "Payment Method"
                }), /* @__PURE__ */ jsx("div", {
                  className: "bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4",
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-3",
                      children: [/* @__PURE__ */ jsx("div", {
                        className: "w-10 h-10 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30",
                        children: /* @__PURE__ */ jsx(CreditCard, {
                          className: "w-5 h-5 text-white"
                        })
                      }), /* @__PURE__ */ jsxs("div", {
                        children: [/* @__PURE__ */ jsx("p", {
                          className: "font-medium text-gray-900 dark:text-gray-100",
                          children: "•••• •••• •••• 4242"
                        }), /* @__PURE__ */ jsx("p", {
                          className: "text-sm text-gray-600 dark:text-gray-400",
                          children: "Expires 12/25"
                        })]
                      })]
                    }), /* @__PURE__ */ jsx(Button, {
                      variant: "secondary",
                      size: "sm",
                      children: "Update"
                    })]
                  })
                })]
              })]
            }), activeTab === "notifications" && /* @__PURE__ */ jsxs(Card, {
              variant: "glass",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6",
                children: "Notification Preferences"
              }), /* @__PURE__ */ jsx("div", {
                className: "space-y-4",
                children: [{
                  label: "Email notifications",
                  description: "Receive email updates about your tasks"
                }, {
                  label: "Push notifications",
                  description: "Get notified about important updates"
                }, {
                  label: "Weekly digest",
                  description: "Receive a weekly summary of your activity"
                }, {
                  label: "Team updates",
                  description: "Get notified when team members make changes"
                }].map((item) => /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg",
                  children: [/* @__PURE__ */ jsxs("div", {
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "font-medium text-gray-900 dark:text-gray-100",
                      children: item.label
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-sm text-gray-600 dark:text-gray-400",
                      children: item.description
                    })]
                  }), /* @__PURE__ */ jsxs("label", {
                    className: "relative inline-flex items-center cursor-pointer",
                    children: [/* @__PURE__ */ jsx("input", {
                      type: "checkbox",
                      className: "sr-only peer",
                      defaultChecked: true
                    }), /* @__PURE__ */ jsx("div", {
                      className: "w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-teal-500"
                    })]
                  })]
                }, item.label))
              })]
            }), activeTab === "security" && /* @__PURE__ */ jsxs(Card, {
              variant: "glass",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6",
                children: "Security Settings"
              }), /* @__PURE__ */ jsxs("form", {
                onSubmit: handleChangePassword,
                className: "space-y-6",
                children: [/* @__PURE__ */ jsx(Input, {
                  label: "Current Password",
                  type: "password",
                  value: currentPassword,
                  onChange: (e) => setCurrentPassword(e.target.value),
                  required: true
                }), /* @__PURE__ */ jsx(Input, {
                  label: "New Password",
                  type: "password",
                  value: newPassword,
                  onChange: (e) => setNewPassword(e.target.value),
                  required: true,
                  minLength: 6
                }), /* @__PURE__ */ jsx(Input, {
                  label: "Confirm New Password",
                  type: "password",
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  required: true,
                  minLength: 6
                }), /* @__PURE__ */ jsx("div", {
                  className: "flex gap-3",
                  children: /* @__PURE__ */ jsxs(Button, {
                    type: "submit",
                    isLoading: isSaving,
                    children: [/* @__PURE__ */ jsx(Lock, {
                      className: "w-5 h-5 mr-2"
                    }), "Update Password"]
                  })
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "border-t border-gray-200 dark:border-gray-800 mt-8 pt-6",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-lg font-semibold text-red-600 dark:text-red-400 mb-4",
                  children: "Danger Zone"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4",
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-gray-700 dark:text-gray-300 mb-4",
                    children: "Once you delete your account, there is no going back. Please be certain."
                  }), /* @__PURE__ */ jsxs(Button, {
                    variant: "danger",
                    children: [/* @__PURE__ */ jsx(Trash2, {
                      className: "w-5 h-5 mr-2"
                    }), "Delete Account"]
                  })]
                })]
              })]
            })]
          })]
        })]
      })
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: settings,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const mockUsers = [{
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  plan: "pro",
  joined: "2024-01-15",
  status: "active"
}, {
  id: "2",
  name: "Jane Smith",
  email: "jane@example.com",
  plan: "free",
  joined: "2024-02-20",
  status: "active"
}, {
  id: "3",
  name: "Mike Johnson",
  email: "mike@example.com",
  plan: "enterprise",
  joined: "2024-03-10",
  status: "active"
}, {
  id: "4",
  name: "Sarah Williams",
  email: "sarah@example.com",
  plan: "pro",
  joined: "2024-04-05",
  status: "inactive"
}, {
  id: "5",
  name: "David Brown",
  email: "david@example.com",
  plan: "free",
  joined: "2024-05-12",
  status: "active"
}];
const userActivityData = [{
  month: "Jan",
  users: 120,
  boards: 450
}, {
  month: "Feb",
  users: 180,
  boards: 620
}, {
  month: "Mar",
  users: 250,
  boards: 890
}, {
  month: "Apr",
  users: 320,
  boards: 1100
}, {
  month: "May",
  users: 410,
  boards: 1350
}, {
  month: "Jun",
  users: 520,
  boards: 1620
}];
const planDistribution = [{
  plan: "Free",
  count: 320
}, {
  plan: "Pro",
  count: 180
}, {
  plan: "Enterprise",
  count: 20
}];
function meta$1() {
  return [{
    title: "Admin | CollabBoard"
  }];
}
const admin = UNSAFE_withComponentProps(function Admin() {
  const {
    user,
    isAuthenticated
  } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  if (!isAuthenticated) {
    return null;
  }
  const filteredUsers = mockUsers.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()));
  const stats = {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter((u) => u.status === "active").length,
    totalBoards: useStore.getState().boards.length,
    totalTasks: useStore.getState().tasks.length
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950",
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsx("main", {
      className: "ml-0 lg:ml-[280px] pt-16 p-4 sm:p-6 lg:p-8",
      children: /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex items-center justify-between mb-8",
          children: /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2",
              children: "Admin Dashboard"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Manage users, monitor activity, and view analytics"
            })]
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
          children: [/* @__PURE__ */ jsx(Card, {
            variant: "glass",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                  children: "Total Users"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-3xl font-bold text-gray-900 dark:text-gray-100",
                  children: stats.totalUsers
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center",
                children: /* @__PURE__ */ jsx(Users, {
                  className: "w-6 h-6 text-white"
                })
              })]
            })
          }), /* @__PURE__ */ jsx(Card, {
            variant: "glass",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                  children: "Active Users"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-3xl font-bold text-green-600 dark:text-green-400",
                  children: stats.activeUsers
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center",
                children: /* @__PURE__ */ jsx(Activity, {
                  className: "w-6 h-6 text-white"
                })
              })]
            })
          }), /* @__PURE__ */ jsx(Card, {
            variant: "glass",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                  children: "Total Boards"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-3xl font-bold text-cyan-600 dark:text-cyan-400",
                  children: stats.totalBoards
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30",
                children: /* @__PURE__ */ jsx(TrendingUp, {
                  className: "w-6 h-6 text-white"
                })
              })]
            })
          }), /* @__PURE__ */ jsx(Card, {
            variant: "glass",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                  children: "Total Tasks"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-3xl font-bold text-teal-600 dark:text-teal-400",
                  children: stats.totalTasks
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30",
                children: /* @__PURE__ */ jsx(Clock, {
                  className: "w-6 h-6 text-white"
                })
              })]
            })
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",
          children: [/* @__PURE__ */ jsxs(Card, {
            variant: "glass",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4",
              children: "User Growth & Activity"
            }), /* @__PURE__ */ jsx(ResponsiveContainer, {
              width: "100%",
              height: 300,
              children: /* @__PURE__ */ jsxs(LineChart, {
                data: userActivityData,
                children: [/* @__PURE__ */ jsx(CartesianGrid, {
                  strokeDasharray: "3 3",
                  className: "stroke-gray-300 dark:stroke-gray-700"
                }), /* @__PURE__ */ jsx(XAxis, {
                  dataKey: "month",
                  className: "text-gray-600 dark:text-gray-400"
                }), /* @__PURE__ */ jsx(YAxis, {
                  className: "text-gray-600 dark:text-gray-400"
                }), /* @__PURE__ */ jsx(Tooltip$1, {
                  contentStyle: {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px"
                  }
                }), /* @__PURE__ */ jsx(Legend, {}), /* @__PURE__ */ jsx(Line, {
                  type: "monotone",
                  dataKey: "users",
                  stroke: "#06b6d4",
                  strokeWidth: 2,
                  name: "Users"
                }), /* @__PURE__ */ jsx(Line, {
                  type: "monotone",
                  dataKey: "boards",
                  stroke: "#14b8a6",
                  strokeWidth: 2,
                  name: "Boards"
                })]
              })
            })]
          }), /* @__PURE__ */ jsxs(Card, {
            variant: "glass",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4",
              children: "Plan Distribution"
            }), /* @__PURE__ */ jsx(ResponsiveContainer, {
              width: "100%",
              height: 300,
              children: /* @__PURE__ */ jsxs(BarChart, {
                data: planDistribution,
                children: [/* @__PURE__ */ jsx(CartesianGrid, {
                  strokeDasharray: "3 3",
                  className: "stroke-gray-300 dark:stroke-gray-700"
                }), /* @__PURE__ */ jsx(XAxis, {
                  dataKey: "plan",
                  className: "text-gray-600 dark:text-gray-400"
                }), /* @__PURE__ */ jsx(YAxis, {
                  className: "text-gray-600 dark:text-gray-400"
                }), /* @__PURE__ */ jsx(Tooltip$1, {
                  contentStyle: {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px"
                  }
                }), /* @__PURE__ */ jsx(Bar, {
                  dataKey: "count",
                  fill: "#06b6d4",
                  radius: [8, 8, 0, 0]
                })]
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs(Card, {
          variant: "glass",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between mb-6",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-gray-100",
              children: "Users"
            }), /* @__PURE__ */ jsx(Input, {
              placeholder: "Search users...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              icon: /* @__PURE__ */ jsx(Search, {
                className: "w-4 h-4"
              }),
              className: "w-64"
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "overflow-x-auto",
            children: /* @__PURE__ */ jsxs("table", {
              className: "w-full",
              children: [/* @__PURE__ */ jsx("thead", {
                children: /* @__PURE__ */ jsxs("tr", {
                  className: "border-b border-gray-200 dark:border-gray-800",
                  children: [/* @__PURE__ */ jsx("th", {
                    className: "text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300",
                    children: "Name"
                  }), /* @__PURE__ */ jsx("th", {
                    className: "text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300",
                    children: "Email"
                  }), /* @__PURE__ */ jsx("th", {
                    className: "text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300",
                    children: "Plan"
                  }), /* @__PURE__ */ jsx("th", {
                    className: "text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300",
                    children: "Joined"
                  }), /* @__PURE__ */ jsx("th", {
                    className: "text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300",
                    children: "Status"
                  })]
                })
              }), /* @__PURE__ */ jsx("tbody", {
                children: filteredUsers.map((user2) => /* @__PURE__ */ jsxs("tr", {
                  className: "border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors",
                  children: [/* @__PURE__ */ jsx("td", {
                    className: "py-3 px-4",
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-3",
                      children: [/* @__PURE__ */ jsx("div", {
                        className: "w-8 h-8 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30",
                        children: /* @__PURE__ */ jsx("span", {
                          className: "text-white font-medium text-sm",
                          children: user2.name.charAt(0)
                        })
                      }), /* @__PURE__ */ jsx("span", {
                        className: "font-medium text-gray-900 dark:text-gray-100",
                        children: user2.name
                      })]
                    })
                  }), /* @__PURE__ */ jsx("td", {
                    className: "py-3 px-4 text-gray-600 dark:text-gray-400",
                    children: user2.email
                  }), /* @__PURE__ */ jsx("td", {
                    className: "py-3 px-4",
                    children: /* @__PURE__ */ jsx("span", {
                      className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300",
                      children: user2.plan
                    })
                  }), /* @__PURE__ */ jsx("td", {
                    className: "py-3 px-4 text-gray-600 dark:text-gray-400",
                    children: formatDate(user2.joined)
                  }), /* @__PURE__ */ jsx("td", {
                    className: "py-3 px-4",
                    children: /* @__PURE__ */ jsx("span", {
                      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user2.status === "active" ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`,
                      children: user2.status
                    })
                  })]
                }, user2.id))
              })]
            })
          })]
        })]
      })
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: admin,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const teamMembers = [{
  id: "1",
  name: "John Doe",
  role: "Product Manager",
  email: "john@example.com",
  avatar: null,
  status: "active"
}, {
  id: "2",
  name: "Jane Smith",
  role: "Frontend Developer",
  email: "jane@example.com",
  avatar: null,
  status: "active"
}, {
  id: "3",
  name: "Mike Johnson",
  role: "Backend Developer",
  email: "mike@example.com",
  avatar: null,
  status: "away"
}];
function meta() {
  return [{
    title: "Team | CollabBoard"
  }];
}
const team = UNSAFE_withComponentProps(function Team() {
  const {
    isAuthenticated
  } = useStore();
  if (!isAuthenticated) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950",
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsx("main", {
      className: "ml-0 lg:ml-[280px] pt-16 p-4 sm:p-6 lg:p-8",
      children: /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between mb-8",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2",
              children: "Team"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Manage your team members"
            })]
          }), /* @__PURE__ */ jsxs(Button, {
            children: [/* @__PURE__ */ jsx(UserPlus, {
              className: "w-5 h-5 mr-2"
            }), "Invite Member"]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          children: teamMembers.map((member) => /* @__PURE__ */ jsxs(Card, {
            variant: "glass",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-start justify-between mb-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-white font-bold text-lg",
                    children: member.name.charAt(0).toUpperCase()
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-gray-900 dark:text-gray-100",
                    children: member.name
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: member.role
                  })]
                })]
              }), /* @__PURE__ */ jsx("span", {
                className: `w-2 h-2 rounded-full ${member.status === "active" ? "bg-green-500" : "bg-yellow-500"}`
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "space-y-2",
              children: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400",
                children: [/* @__PURE__ */ jsx(Mail, {
                  className: "w-4 h-4"
                }), member.email]
              })
            })]
          }, member.id))
        })]
      })
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: team,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-gKx-XIYd.js", "imports": ["/assets/chunk-UIGDSWPH-DxYnQsBD.js", "/assets/index-xhti51DD.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-YvduIvp3.js", "imports": ["/assets/chunk-UIGDSWPH-DxYnQsBD.js", "/assets/index-xhti51DD.js"], "css": ["/assets/root-8Ckodohi.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-YYqjynS5.js", "imports": ["/assets/chunk-UIGDSWPH-DxYnQsBD.js", "/assets/Card-DpraJusS.js", "/assets/arrow-right-D11d0I4F.js", "/assets/users-DK1ndWuA.js", "/assets/trending-up-CXYG5M9-.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-DEMjrd1T.js", "imports": ["/assets/chunk-UIGDSWPH-DxYnQsBD.js", "/assets/Input-C058c2S0.js", "/assets/Card-DpraJusS.js", "/assets/mail-D6mvdWvg.js", "/assets/lock-Bs1iUM_s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "root", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-CmE6kf8I.js", "imports": ["/assets/chunk-UIGDSWPH-DxYnQsBD.js", "/assets/Input-C058c2S0.js", "/assets/Card-DpraJusS.js", "/assets/Sidebar-DG9SJx28.js", "/assets/BarChart-KLzD-ixV.js", "/assets/arrow-right-D11d0I4F.js", "/assets/users-DK1ndWuA.js", "/assets/index-xhti51DD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/boards": { "id": "routes/boards", "parentId": "root", "path": "boards", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/boards-tTtbnZUT.js", "imports": ["/assets/chunk-UIGDSWPH-DxYnQsBD.js", "/assets/Input-C058c2S0.js", "/assets/Card-DpraJusS.js", "/assets/Sidebar-DG9SJx28.js", "/assets/users-DK1ndWuA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/boards.$boardId": { "id": "routes/boards.$boardId", "parentId": "root", "path": "boards/:boardId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/boards._boardId-RLxN0a2n.js", "imports": ["/assets/chunk-UIGDSWPH-DxYnQsBD.js", "/assets/index-xhti51DD.js", "/assets/Input-C058c2S0.js", "/assets/Card-DpraJusS.js", "/assets/Sidebar-DG9SJx28.js", "/assets/trash-2-B4xIgt8N.js", "/assets/users-DK1ndWuA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/settings": { "id": "routes/settings", "parentId": "root", "path": "settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/settings-DFhSupni.js", "imports": ["/assets/chunk-UIGDSWPH-DxYnQsBD.js", "/assets/Input-C058c2S0.js", "/assets/Card-DpraJusS.js", "/assets/Sidebar-DG9SJx28.js", "/assets/lock-Bs1iUM_s.js", "/assets/trash-2-B4xIgt8N.js", "/assets/users-DK1ndWuA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin": { "id": "routes/admin", "parentId": "root", "path": "admin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/admin-pFWV5Kdx.js", "imports": ["/assets/chunk-UIGDSWPH-DxYnQsBD.js", "/assets/Input-C058c2S0.js", "/assets/Card-DpraJusS.js", "/assets/Sidebar-DG9SJx28.js", "/assets/users-DK1ndWuA.js", "/assets/trending-up-CXYG5M9-.js", "/assets/BarChart-KLzD-ixV.js", "/assets/index-xhti51DD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/team": { "id": "routes/team", "parentId": "root", "path": "team", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/team-CXZKy9b_.js", "imports": ["/assets/chunk-UIGDSWPH-DxYnQsBD.js", "/assets/Input-C058c2S0.js", "/assets/Card-DpraJusS.js", "/assets/Sidebar-DG9SJx28.js", "/assets/mail-D6mvdWvg.js", "/assets/users-DK1ndWuA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-5368798d.js", "version": "5368798d", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/boards": {
    id: "routes/boards",
    parentId: "root",
    path: "boards",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/boards.$boardId": {
    id: "routes/boards.$boardId",
    parentId: "root",
    path: "boards/:boardId",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "root",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/team": {
    id: "routes/team",
    parentId: "root",
    path: "team",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
