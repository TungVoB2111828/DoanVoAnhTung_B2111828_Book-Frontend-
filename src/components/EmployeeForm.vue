<template>
    <Form :validation-schema="employeeFormSchema" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitEmployee)">
            <div class="form-group">
                <label for="MSNV">Mã số nhân viên</label>
                <Field
                    name="MSNV"
                    type="text"
                    class="form-control"
                    v-model="employeeLocal.MSNV"
                    :disabled="!!employee.MSNV"
                />
                <ErrorMessage name="MSNV" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="HoTenNV">Họ tên nhân viên</label>
                <Field name="HoTenNV" type="text" class="form-control" v-model="employeeLocal.HoTenNV" />
                <ErrorMessage name="HoTenNV" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="ChucVu">Chức vụ</label>
                <Field name="ChucVu" type="text" class="form-control" v-model="employeeLocal.ChucVu" />
                <ErrorMessage name="ChucVu" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="DiaChi">Địa chỉ</label>
                <Field name="DiaChi" type="text" class="form-control" v-model="employeeLocal.DiaChi" />
                <ErrorMessage name="DiaChi" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="SoDienThoai">Số điện thoại</label>
                <Field name="SoDienThoai" type="text" class="form-control" v-model="employeeLocal.SoDienThoai" />
                <ErrorMessage name="SoDienThoai" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="Email">Email</label>
                <Field name="Email" type="text" class="form-control" v-model="employeeLocal.Email" />
                <ErrorMessage name="Email" class="error-feedback" />
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button v-if="employeeLocal.MSNV" type="button" class="ml-2 btn btn-danger" @click="deleteEmployee">
                    Xóa
                </button>
            </div>
        </form>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import EmployeeService from "@/services/employee.service";
import { toRaw } from "vue";

export default {
    components: { Form, Field, ErrorMessage },
    emits: ["employee:created", "employee:deleted"],
    props: {
        employee: { type: Object, required: true },
    },
    data() {
        return {
            employeeLocal: { ...this.employee },
            employeeFormSchema: yup.object().shape({
                MSNV: yup
                    .string()
                    .matches(/^\d+$/, "Mã số nhân viên chỉ chứa số.")
                    .min(4, "Mã số nhân viên phải có ít nhất 4 chữ số.")
                    .required("Mã số nhân viên không được để trống."),
                HoTenNV: yup.string().required("Họ tên nhân viên không được để trống."),
                ChucVu: yup.string().required("Chức vụ không được để trống."),
                DiaChi: yup.string().required("Địa chỉ không được để trống."),
                SoDienThoai: yup
                    .string()
                    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa chữ số.")
                    .required("Số điện thoại không được để trống."),
                Email: yup.string().email("Email không hợp lệ."),
            }),
        };
    },
    methods: {
        async submitEmployee() {
            try {
                const employeeData = toRaw(this.employeeLocal);
                console.log("📤 Gửi dữ liệu nhân viên lên API:", employeeData);

                if (!employeeData.MSNV || !employeeData.HoTenNV || !employeeData.ChucVu || !employeeData.DiaChi || !employeeData.SoDienThoai) {
                    console.error("⚠️ Lỗi: Dữ liệu nhân viên không hợp lệ", employeeData);
                    alert("Vui lòng nhập đầy đủ thông tin nhân viên.");
                    return;
                }

                if (this.employee.MSNV) {
                    await EmployeeService.update(this.employee.MSNV, employeeData);
                    console.log("✅ Nhân viên đã được cập nhật!");
                } else {
                    const response = await EmployeeService.create(employeeData);
                    console.log("✅ Nhân viên mới được thêm:", response);
                    this.$emit("employee:created", response);
                }
            } catch (error) {
                console.error("❌ Lỗi khi lưu nhân viên:", error.response?.data || error);
                alert(error.response?.data?.message || "Lưu nhân viên thất bại! Vui lòng thử lại.");
            }
        },
        async deleteEmployee() {
            try {
                if (!this.employeeLocal.MSNV) return;

                await EmployeeService.delete(this.employeeLocal.MSNV);
                console.log("🗑️ Nhân viên đã bị xóa!");
                this.$emit("employee:deleted", this.employeeLocal.MSNV);
            } catch (error) {
                console.error("❌ Lỗi khi xóa nhân viên:", error.response?.data || error);
                alert("Xóa nhân viên thất bại! Vui lòng thử lại.");
            }
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
