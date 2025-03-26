<template>
    <div class="container mt-4">
        <h2>Quản lý Người Dùng</h2>
        <button class="btn btn-primary mb-3" @click="addNewUser">Thêm Người Dùng Mới</button>
        <div class="row">
            <div class="col-md-4">
                <UserList :users="users" v-model:activeIndex="activeIndex" />
            </div>
            <div class="col-md-8">
                <UserCard 
                    v-if="activeUser && activeUser._id" 
                    :user="activeUser" 
                    @deleteUser="deleteUser" 
                />
                <UserForm 
                    v-if="activeUser || isAdding" 
                    :user="activeUser || newUser" 
                    @submit:user="saveUser" 
                    @delete:user="deleteUser"  
                />
            </div>
        </div>
    </div>
</template>

<script>
import UserList from "@/components/UserList.vue";
import UserCard from "@/components/UserCard.vue";
import UserForm from "@/components/UserForm.vue";
import UserService from "@/services/user.service";

export default {
    components: {
        UserList,
        UserCard,
        UserForm,
    },
    data() {
        return {
            users: [],
            activeIndex: -1,
            isAdding: false,
            newUser: {
                _id: "", // Sử dụng _id thay vì MaDocGia
                TenDocGia: "",
                // Các thông tin người dùng khác
            },
        };
    },
    computed: {
        activeUser() {
            return this.activeIndex !== -1 ? this.users[this.activeIndex] : null;
        },
    },
    async created() {
        await this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const usersFromApi = await UserService.getAll();
                this.users = usersFromApi.map(user => ({
                    ...user,
                    _id: user._id || user.MaDocGia, // Đảm bảo luôn có _id
                }));
                console.log("📌 Danh sách người dùng đã tải:", this.users);
            } catch (error) {
                console.error("❌ Lỗi khi tải danh sách người dùng:", error);
            }
        },
        addNewUser() {
            this.isAdding = true;
            this.activeIndex = -1;
        },
        async saveUser(userData) {
            try {
                if (userData._id) {
                    await UserService.update(userData._id, userData); // Dùng _id khi cập nhật
                } else {
                    await UserService.create(userData);
                }
                this.isAdding = false;
                await this.fetchUsers();
            } catch (error) {
                console.error("❌ Lỗi khi lưu người dùng:", error);
            }
        },
        async deleteUser(userId) {
            try {
                if (!userId) {
                    console.error("❌ Lỗi: ID người dùng cần xóa không hợp lệ!");
                    return;
                }
                await UserService.delete(userId); // Dùng _id khi xóa
                await this.fetchUsers();
                this.activeIndex = -1;
                this.isAdding = false;
            } catch (error) {
                console.error("❌ Lỗi khi xóa người dùng:", error);
            }
        },
    },
};
</script>
