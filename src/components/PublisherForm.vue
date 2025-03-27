<template>
    <Form :validation-schema="publisherFormSchema" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitPublisher)">
            <div class="form-group">
                <label for="MaNXB">Mã nhà xuất bản</label>
                <Field 
                    name="MaNXB" 
                    type="text" 
                    class="form-control" 
                    v-model="publisherLocal.MaNXB"
                    :disabled="!!publisher.MaNXB"
                />
                <ErrorMessage name="MaNXB" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="TenNXB">Tên nhà xuất bản</label>
                <Field name="TenNXB" type="text" class="form-control" v-model="publisherLocal.TenNXB" />
                <ErrorMessage name="TenNXB" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="DiaChi">Địa chỉ</label>
                <Field name="DiaChi" type="text" class="form-control" v-model="publisherLocal.DiaChi" />
                <ErrorMessage name="DiaChi" class="error-feedback" />
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button v-if="publisherLocal.MaNXB" type="button" class="ml-2 btn btn-danger" @click="confirmDelete">
                    Xóa
                </button>
            </div>
        </form>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import PublisherService from "@/services/publisher.service";
import { toRaw } from "vue";

export default {
    components: { Form, Field, ErrorMessage },
    emits: ["publisher:created", "publisher:deleted"],
    props: {
        publisher: { type: Object, required: true },
    },
    data() {
        return {
            publisherLocal: { ...this.publisher },
            publisherFormSchema: yup.object().shape({
                MaNXB: yup.string().required("Mã nhà xuất bản không được để trống."),
                TenNXB: yup.string().required("Tên nhà xuất bản không được để trống."),
                DiaChi: yup.string().required("Địa chỉ không được để trống."),
            }),
        };
    },
    methods: {
        async submitPublisher() {
            try {
                const publisherData = toRaw(this.publisherLocal);
                console.log("📤 Gửi dữ liệu nhà xuất bản lên API:", publisherData);

                if (this.publisher.MaNXB) {
                    await PublisherService.update(this.publisher.MaNXB, publisherData);
                    console.log("✅ Nhà xuất bản đã được cập nhật!");
                } else {
                    const response = await PublisherService.create(publisherData);
                    console.log("✅ Nhà xuất bản mới được thêm:", response);
                    this.$emit("publisher:created", response);
                }
            } catch (error) {
                console.error("❌ Lỗi khi lưu nhà xuất bản:", error.response?.data || error);
                alert(error.response?.data?.message || "Lưu nhà xuất bản thất bại! Vui lòng thử lại.");
            }
        },
        confirmDelete() {
            if (confirm("Bạn có chắc muốn xóa nhà xuất bản này không?")) {
                this.deletePublisher();
            }
        },
        async deletePublisher() {
            try {
                if (!this.publisherLocal.MaNXB) return;

                await PublisherService.delete(this.publisherLocal._id);
                console.log("🗑️ Nhà xuất bản đã bị xóa!");
                this.$emit("publisher:deleted", this.publisherLocal._id);
            } catch (error) {
                console.error("❌ Lỗi khi xóa nhà xuất bản:", error.response?.data || error);
                alert("Xóa nhà xuất bản thất bại! Vui lòng thử lại.");
            }
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
