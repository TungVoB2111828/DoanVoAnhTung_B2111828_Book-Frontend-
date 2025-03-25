<template>
    <div class="container">
        <h2>Quản lý độc giả</h2>

        <!-- Nút Thêm Độc Giả -->
        <div class="mb-3">
            <button class="btn btn-success" @click="addUser">Thêm độc giả</button>
        </div>

        <div class="row">
            <div class="col-md-4">
                <UserList :users="users" v-model:activeIndex="activeIndex" />
            </div>
            <div class="col-md-8">
                <UserCard v-if="activeUser" :user="activeUser" />
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
import UserService from "@/services/user.service.js";

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
            isAdding: false, // Kiểm tra trạng thái thêm mới
            newUser: {
                MaDocGia: "", // Mã độc giả (sẽ được backend cấp nếu cần)
                HoLot: "",
                Ten: "",
                NgaySinh: "",
                Phai: "Nam",
                DiaChi: "",
                DienThoai: "",
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
                this.users = await UserService.getAll();
            } catch (error) {
                console.error("Lỗi khi lấy danh sách độc giả:", error);
            }
        },
        addUser() {
            this.isAdding = true;
            this.activeIndex = -1; // Không chọn độc giả nào cả
        },
        async saveUser(user) {
            try {
                if (user.MaDocGia) {
                    await UserService.update(user.MaDocGia, user);
                } else {
                    await UserService.create(user);
                }
                this.isAdding = false;
                await this.fetchUsers();
            } catch (error) {
                console.error("Lỗi khi lưu độc giả:", error);
            }
        },
        async deleteUser(userId) {
            try {
                await UserService.delete(userId);
                await this.fetchUsers();
                this.activeIndex = -1;
                this.isAdding = false;
            } catch (error) {
                console.error("Lỗi khi xóa độc giả:", error);
            }
        },
    },
};
</script>
