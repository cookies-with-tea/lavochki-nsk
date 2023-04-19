import React from 'react'

import { BenchesPage, HomePage } from '@/pages'
// import Benches from "@/pages/Benches";
// import BenchesModeration from "@/pages/BenchesModeration";
// import ReportComments from "@/pages/ReportComments";
// import Tags from "@/pages/Tags";
// import Users from "@/pages/Users";
// import {CommentsPage} from "@/pages/Comments/CommentsPage";

export const mainLayoutRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/benches',
    element: <BenchesPage />
  },
  // {
  //     path: '/benches-moderation',
  //     element: <BenchesModeration />
  // },
  // {
  //     path: '/report-comments',
  //     element: <ReportComments />
  // },
  // {
  //     path: '/tags',
  //     element: <Tags />
  // },
  // {
  //     path: '/users',
  //     element: <Users />
  // },
  // {
  //     path: '/comments',
  //     element: <CommentsPage />
  // },
  // {
  //     path: '*',
  //     element: <NotFoundPage />
  // }
]
