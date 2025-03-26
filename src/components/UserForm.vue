<template>
    <Form :validation-schema="userFormSchema" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitUser)">
            <div class="form-group">
                <label for="TenDocGia">Tên người dùng</label>
                <Field name="TenDocGia" type="text" class="form-control" v-model="userLocal.TenDocGia" />
                <ErrorMessage name="TenDocGia" class="error-feedback" />
            </div>

            <!-- Các trường thông tin người dùng khác -->
            <div class="form-group">
                <label for="Email">Email</label>
                <Field name="Email" type="email" class="form-control" v-model="userLocal.Email" />
                <ErrorMessage name="Email" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="Sdt">Số điện thoại</label>
                <Field name="Sdt" type="text" class="form-control" v-model="userLocal.Sdt" />
                <ErrorMessage name="Sdt" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="DiaChi">Địa chỉ</label>
                <Field name="DiaChi" type="text" class="form-control" v-model="userLocal.DiaChi" />
                <ErrorMessage name="DiaChi" class="error-feedback" />
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button v-if="userLocal.MaDocGia" type="button" class="ml-2 btn btn-danger" @click="deleteUser">
                    Xóa
                </button>
            </div>
        </form>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import UserService from "@/services/user.service"; // Import service để gọi API
import { toRaw } from "vue"; // Dùng để loại bỏ Proxy của Vue

export default {
    components: { Form, Field, ErrorMessage },
    emits: ["user:created", "user:deleted"],  // Emit sự kiện user:deleted
    props: {
        user: { type: Object, required: true }
    },
    data() {
        return {
            userLocal: { ...this.user },
            userFormSchema: yup.object().shape({
                TenDocGia: yup.string().required("Tên người dùng không được để trống.").max(100, "Tên tối đa 100 ký tự."),
                Email: yup.string().email("Email không hợp lệ").required("Email không được để trống."),
                Sdt: yup.string().required("Số điện thoại không được để trống."),
                DiaChi: yup.string().required("Địa chỉ không được để trống."),
            })
        };
    },
    methods: {
        async submitUser() {
            try {
                const userData = toRaw(this.userLocal); // Loại bỏ Proxy của Vue
                console.log("Submitting user:", userData);

                if (userData.MaDocGia) {
                    await UserService.update(userData.MaDocGia, userData);
                    console.log("User updated successfully!");
                } else {
                    const response = await UserService.create(userData);
                    console.log("User created successfully:", response);
                    this.$emit("user:created", response); // Phát sự kiện user:created
                }
            } catch (error) {
                console.error("Error saving user:", error);
                alert("Lưu người dùng thất bại! Vui lòng thử lại.");
            }
        },
        async deleteUser() {
            try {
                if (!this.userLocal.MaDocGia) return;

                await UserService.delete(this.userLocal.MaDocGia);
                console.log("User deleted successfully!");
                this.$emit("user:deleted", this.userLocal.MaDocGia); // Emit sự kiện user:deleted
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Xóa người dùng thất bại! Vui lòng thử lại.");
            }
        }
    }
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
