import {
    BookOpen,
    Bot,
    Calendar,
    List,
    ListTodo,
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

  export const views = [
    {
      id:1,
      title: 'List View',
      value: 'list-view',
      icon: List,
    },
    {
      id:2,
      title: 'Kanban View',
      value: 'kanban-view',
      icon: SquareTerminal,
    },
    {
      id:3,
      title: 'Calendar View',
      value: 'calendar-view',
      icon: Calendar,
    },
    {
      id:4,
      title: 'Dashboard View',
      value: 'dashboard-view',
      icon: PieChart,
    },

  ]