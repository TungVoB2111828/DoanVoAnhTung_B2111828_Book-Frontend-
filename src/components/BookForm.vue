<template>
    <Form :validation-schema="bookFormSchema" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitBook)">
            <div class="form-group">
                <label for="TenSach">Tên sách</label>
                <Field name="TenSach" type="text" class="form-control" v-model="bookLocal.TenSach" />
                <ErrorMessage name="TenSach" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="DonGia">Đơn giá</label>
                <Field name="DonGia" type="number" class="form-control" v-model="bookLocal.DonGia" />
                <ErrorMessage name="DonGia" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="SoQuyen">Số quyển</label>
                <Field name="SoQuyen" type="number" class="form-control" v-model="bookLocal.SoQuyen" />
                <ErrorMessage name="SoQuyen" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="NamXuatBan">Năm xuất bản</label>
                <Field name="NamXuatBan" type="number" class="form-control" v-model="bookLocal.NamXuatBan" />
                <ErrorMessage name="NamXuatBan" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="MaNXB">Mã nhà xuất bản</label>
                <Field name="MaNXB" type="text" class="form-control" v-model="bookLocal.MaNXB" />
                <ErrorMessage name="MaNXB" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="NguonGocTacGia">Tác giả / Nguồn gốc</label>
                <Field name="NguonGocTacGia" type="text" class="form-control" v-model="bookLocal.TacGia" />
                <ErrorMessage name="NguonGocTacGia" class="error-feedback" />
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button v-if="bookLocal.MaSach" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
                    Xóa
                </button>
            </div>
        </form>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import BookService from "@/services/book.service"; // Import service để gọi API
import { toRaw } from "vue"; // Dùng để loại bỏ Proxy của Vue

export default {
    components: { Form, Field, ErrorMessage },
    emits: ["book:created", "book:deleted"],
    props: {
        book: { type: Object, required: true }
    },
    data() {
        return {
            bookLocal: { ...this.book },
            bookFormSchema: yup.object().shape({
                TenSach: yup.string().required("Tên sách không được để trống.").max(100, "Tên sách tối đa 100 ký tự."),
                DonGia: yup.number().required("Đơn giá không được để trống.").min(1000, "Giá sách phải từ 1000 VND trở lên."),
                SoQuyen: yup.number().required("Số quyển không được để trống.").min(1, "Ít nhất phải có 1 quyển."),
                NamXuatBan: yup.number().required("Năm xuất bản không được để trống.").min(1900, "Năm xuất bản không hợp lệ."),
                MaNXB: yup.string().required("Mã nhà xuất bản không được để trống."),
                NguonGocTacGia: yup.string().required("Tác giả / Nguồn gốc không được để trống.")
            })
        };
    },
    methods: {
        async submitBook() {
            try {
                const bookData = toRaw(this.bookLocal); // Loại bỏ Proxy của Vue
                console.log("Submitting book:", bookData);

                if (bookData.MaSach) {
                    await BookService.update(bookData.MaSach, bookData);
                    console.log("Book updated successfully!");
                } else {
                    const response = await BookService.create(bookData);
                    console.log("Book created successfully:", response);
                    this.$emit("book:created", response);
                }
                
            } catch (error) {
                console.error("Error saving book:", error);
                alert("Lưu sách thất bại! Vui lòng thử lại.");
            }
        },
        async deleteBook() {
            try {
                if (!this.bookLocal.MaSach) return;
                
                await BookService.delete(this.bookLocal.MaSach);
                console.log("Book deleted successfully!");
                this.$emit("book:deleted", this.bookLocal.MaSach);
            } catch (error) {
                console.error("Error deleting book:", error);
                alert("Xóa sách thất bại! Vui lòng thử lại.");
            }
        }
    }
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
