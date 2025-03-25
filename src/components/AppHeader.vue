<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Library Management</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'books' }" class="nav-link">
                    Books <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'publishers' }" class="nav-link">
                    Publishers <i class="fas fa-building"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'users' }" class="nav-link">
                    Readers <i class="fas fa-user"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'borrows' }" class="nav-link">
                    Borrowings <i class="fas fa-book-reader"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'employees' }" class="nav-link">
                    Employees <i class="fas fa-users"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>

<script>
export default {
    name: "AppHeader",
};
</script>

<style scoped>
.navbar-brand {
    font-weight: bold;
}
</style>
