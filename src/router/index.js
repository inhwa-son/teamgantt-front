import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "@/views/SignIn/SignIn";
import Home from "@/views/Home";
import Tasks from "@/views/Tasks/Tasks";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/signin",
        name: "SignIn",
        component: SignIn
    },
    {
        path: "/tasks",
        name: "Tasks",
        component: Tasks
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;