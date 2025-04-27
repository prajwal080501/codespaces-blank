import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    ListTodo,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
  } from "lucide-react"

export const SidebarMenu =  [
    {
      title: "To Do",
      url: "#",
      icon: ListTodo,
      isActive: true,
    //   items: [
    //     {
    //       title: "History",
    //       url: "#",
    //     },
    //     {
    //       title: "Starred",
    //       url: "#",
    //     },
    //     {
    //       title: "Settings",
    //       url: "#",
    //     },
    //   ],
    },
    {
      title: "Events",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Projects",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ];


  export const FeaturesArray = [
    {
      id: 1,
      title: '✅ Conquer Your Day with Ease',
      subtitle: 'Stay organized, prioritize effortlessly, and achieve more with our intuitive task manager built for busy lives.',
    }
  ]