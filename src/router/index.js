import { createWebHistory, createRouter } from "vue-router";
import BookManagement from "@/views/BookManagement.vue";
import BorrowManagement from "@/views/BorrowManagement.vue";
import EmployeeManagement from "@/views/EmployeeManagement.vue";
import PublisherManagement from "@/views/PublisherManagement.vue";
import UserManagement from "@/views/UserManagement.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    {
        path: "/",
        redirect: "/books", // Điều hướng mặc định về danh sách sách
    },
    {
        path: "/books",
        name: "books",
        component: BookManagement,
    },
    {
        path: "/borrows",
        name: "borrows",
        component: BorrowManagement,
    },
    {
        path: "/employees",
        name: "employees",
        component: EmployeeManagement,
    },
    {
        path: "/publishers",
        name: "publishers",
        component: PublisherManagement,
    },
    {
        path: "/users",
        name: "users",
        component: UserManagement,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
