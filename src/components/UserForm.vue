<template>
    <Form :validation-schema="userFormSchema" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitUser)">
            <div class="form-group">
                <label for="MaDocGia">Mã độc giả</label>
                <Field 
                    name="MaDocGia" 
                    type="text" 
                    class="form-control" 
                    v-model="userLocal.MaDocGia"
                    :disabled="!!user.MaDocGia"
                />
                <ErrorMessage name="MaDocGia" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="HoLot">Họ lót</label>
                <Field name="HoLot" type="text" class="form-control" v-model="userLocal.HoLot" />
                <ErrorMessage name="HoLot" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="Ten">Tên</label>
                <Field name="Ten" type="text" class="form-control" v-model="userLocal.Ten" />
                <ErrorMessage name="Ten" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="NgaySinh">Ngày sinh</label>
                <Field name="NgaySinh" type="date" class="form-control" v-model="userLocal.NgaySinh" />
                <ErrorMessage name="NgaySinh" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="Phai">Giới tính</label>
                <Field name="Phai" as="select" class="form-control" v-model="userLocal.Phai">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </Field>
                <ErrorMessage name="Phai" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="DiaChi">Địa chỉ</label>
                <Field name="DiaChi" type="text" class="form-control" v-model="userLocal.DiaChi" />
                <ErrorMessage name="DiaChi" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="DienThoai">Điện thoại</label>
                <Field name="DienThoai" type="tel" class="form-control" v-model="userLocal.DienThoai" />
                <ErrorMessage name="DienThoai" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="Email">Email</label>
                <Field name="Email" type="tel" class="form-control" v-model="userLocal.Email" />
                <ErrorMessage name="Email" class="error-feedback" />
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button v-if="userLocal.MaDocGia" type="button" class="ml-2 btn btn-danger" @click="confirmDelete">
                    Xóa
                </button>
            </div>
        </form>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import UserService from "@/services/user.service";
import { toRaw } from "vue";

export default {
    components: { Form, Field, ErrorMessage },
    emits: ["user:created", "user:deleted"],
    props: {
        user: { type: Object, required: true },
    },
    data() {
        return {
            userLocal: { ...this.user },
            userFormSchema: yup.object().shape({
                MaDocGia: yup.string().required("Mã độc giả không được để trống."),
                HoLot: yup.string().required("Họ lót không được để trống."),
                Ten: yup.string().required("Tên không được để trống."),
                NgaySinh: yup.date().required("Ngày sinh không được để trống."),
                Phai: yup.string().oneOf(["Nam", "Nữ"], "Vui lòng chọn giới tính hợp lệ."),
                DiaChi: yup.string().required("Địa chỉ không được để trống."),
                DienThoai: yup
                    .string()
                    .matches(/^[0-9]+$/, "Số điện thoại chỉ chứa số.")
                    .required("Số điện thoại không được để trống."),
            }),
        };
    },
    methods: {
        async submitUser() {
            try {
                const userData = toRaw(this.userLocal);
                console.log("📤 Gửi dữ liệu độc giả lên API:", userData);

                if (this.user.MaDocGia) {
                    await UserService.update(this.user.MaDocGia, userData);
                    console.log("✅ Độc giả đã được cập nhật!");
                } else {
                    const response = await UserService.create(userData);
                    console.log("✅ Độc giả mới được thêm:", response);
                    this.$emit("user:created", response);
                }
            } catch (error) {
                console.error("❌ Lỗi khi lưu độc giả:", error.response?.data || error);
                alert(error.response?.data?.message || "Lưu độc giả thất bại! Vui lòng thử lại.");
            }
        },
        confirmDelete() {
            if (confirm("Bạn có chắc muốn xóa độc giả này không?")) {
                this.deleteUser();
            }
        },
        async deleteUser() {
            try {
                if (!this.userLocal.MaDocGia) return;

                await UserService.delete(this.userLocal.MaDocGia);
                console.log("🗑️ Độc giả đã bị xóa!");
                this.$emit("user:deleted", this.userLocal.MaDocGia);
            } catch (error) {
                console.error("❌ Lỗi khi xóa độc giả:", error.response?.data || error);
                alert("Xóa độc giả thất bại! Vui lòng thử lại.");
            }
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
