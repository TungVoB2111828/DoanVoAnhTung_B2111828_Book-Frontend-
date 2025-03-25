<template>
    <Form :validation-schema="borrowFormSchema" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitBorrow)">
            <div class="form-group">
                <label for="MaDocGia">Mã độc giả</label>
                <Field name="MaDocGia" type="text" class="form-control" v-model="borrowLocal.MaDocGia" />
                <ErrorMessage name="MaDocGia" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="MaSach">Mã sách</label>
                <Field name="MaSach" type="text" class="form-control" v-model="borrowLocal.MaSach" />
                <ErrorMessage name="MaSach" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="NgayMuon">Ngày mượn</label>
                <Field name="NgayMuon" type="date" class="form-control" v-model="borrowLocal.NgayMuon" />
                <ErrorMessage name="NgayMuon" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="NgayTra">Ngày trả</label>
                <Field name="NgayTra" type="date" class="form-control" v-model="borrowLocal.NgayTra" />
                <ErrorMessage name="NgayTra" class="error-feedback" />
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button v-if="borrowLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBorrow">
                    Xóa
                </button>
            </div>
        </form>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import BorrowService from "@/services/borrow.service";
import { toRaw } from "vue";

export default {
    components: { Form, Field, ErrorMessage },
    emits: ["borrow:created", "borrow:deleted"],
    props: {
        borrow: { type: Object, required: false, default: () => ({}) }
    },
    data() {
        return {
            borrowLocal: {
                _id: this.borrow?._id || null,
                MaDocGia: this.borrow?.MaDocGia || "",
                MaSach: this.borrow?.MaSach || "",
                NgayMuon: this.borrow?.NgayMuon || new Date().toISOString().split("T")[0], // Mặc định ngày hôm nay
                NgayTra: this.borrow?.NgayTra || "",
            },
            borrowFormSchema: yup.object().shape({
                MaDocGia: yup.string().required("Mã độc giả không được để trống."),
                MaSach: yup.string().required("Mã sách không được để trống."),
                NgayMuon: yup.date().required("Ngày mượn không được để trống."),
                NgayTra: yup.date().min(yup.ref("NgayMuon"), "Ngày trả phải sau ngày mượn."),
            }),
        };
    },
    methods: {
        async submitBorrow() {
            try {
                const borrowData = toRaw(this.borrowLocal);
                console.log("📡 Gửi dữ liệu lên API:", borrowData);

                if (borrowData._id) {
                    await BorrowService.update(borrowData._id, borrowData);
                    console.log("✅ Cập nhật đơn mượn thành công!");
                } else {
                    const response = await BorrowService.create(borrowData);
                    console.log("✅ Tạo đơn mượn thành công:", response);
                    this.$emit("borrow:created", response);
                }

            } catch (error) {
                console.error("❌ Lỗi khi lưu đơn mượn:", error.response?.data || error);
                alert("Lưu đơn mượn thất bại! Vui lòng thử lại.");
            }
        },
        async deleteBorrow() {
            try {
                if (!this.borrowLocal._id) return;

                await BorrowService.delete(this.borrowLocal._id);
                console.log("✅ Xóa đơn mượn thành công!");
                this.$emit("borrow:deleted", this.borrowLocal._id);

                // Reset form sau khi xóa
                this.borrowLocal = {
                    _id: null,
                    MaDocGia: "",
                    MaSach: "",
                    NgayMuon: new Date().toISOString().split("T")[0],
                    NgayTra: "",
                };
            } catch (error) {
                console.error("❌ Lỗi khi xóa đơn mượn:", error.response?.data || error);
                alert("Xóa đơn mượn thất bại! Vui lòng thử lại.");
            }
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
