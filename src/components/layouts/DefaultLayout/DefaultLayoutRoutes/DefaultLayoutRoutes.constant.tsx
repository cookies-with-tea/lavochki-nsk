import Home from "@/pages/Home";
import Benches from "@/pages/Benches";
import React from "react";
import BenchesModeration from "@/pages/BenchesModeration";
import ReportComments from "@/pages/ReportComments";
import Tags from "@/pages/Tags";
import Users from "@/pages/Users";
import {CommentsPage} from "@/pages/Comments/CommentsPage";
import {NotFoundPage} from "@/pages/NotFound/NotFoundPage";

export const routes = [
    {
        path: '',
        element: <Home />
    },
    {
        path: '/benches',
        element: <Benches />
    },
    {
        path: '/benches-moderation',
        element: <BenchesModeration />
    },
    {
        path: '/report-comments',
        element: <ReportComments />
    },
    {
        path: '/tags',
        element: <Tags />
    },
    {
        path: '/users',
        element: <Users />
    },
    {
        path: '/comments',
        element: <CommentsPage />
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
]