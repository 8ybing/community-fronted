<template>
    <div>
        <el-dialog
                class="avatar-dialog"
                title="修改头像"
                :visible.sync="isVisible"
                width="100%"
                @close="handleClose">
            <span slot="title">修改头像</span>
            <el-upload
                    ref="uploadPic"
                    class="upload-demo"
                    action="/ums/user/updateImage"
                    :limit="1"
                    :file-list="fileList"
                    :show-file-list="true"
                    :auto-upload="false"
                    :on-change="handleChange"
                    :on-success="handleAvatarSuccess"
                    :on-remove="handleRemove"
                    :http-request="httpRequest"
                    :before-upload="beforeAvatarUpload">

                <strong>图片上传:</strong> <el-button size="small" type="primary">选择图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
            </el-upload>
            <div class="demo-container">
                <div class="cropper-container columns ">
                    <!--裁剪-->
                    <div class="cropper-wrapper column is-8 is-12-mobile">
                        <peach-cropper ref="cropper" :options="options" />
                    </div>
                    <!--预览-->
                    <div class="column is-4 is-6-mobile">
                        <div class="cropper-preview mb-4 is-size-1-mobile" :class="{'round': false}" />
                        <div class="cropper-preview is-hidden-mobile" :class="{'round': true}" />
                    </div>
                </div>
            </div>
            <el-button size="small" type="primary" plain @click="rotateLeft">↺ 左旋转</el-button>
            <el-button size="small" type="primary" plain @click="rotateRight">↻ 右旋转</el-button>
            <el-button size="small" type="primary" @click="UploadAvatar()" :loading="isUploadPic">上传图片</el-button>
            <el-button size="small" type="" @click="isVisible = false">取消</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import {changeAvatar, updateUserInfo} from '../../api/user';
    import dayjs from "dayjs";

    export default {
        inject:['reload'],
        props: {},
        data() {
            return {
                user: {
                    id: '',
                    avatar: ''
                },
                file: '',
                isVisible: false,
                fileList: [],
                Visible: this.dialogVisible,
                imageUrl: '',
                isUploadPic: false,
                uploadDisabled: false,
                options: {
                    img: '',
                    viewMode: 1,
                    dragMode: 'move',
                    cropW: 300,
                    cropH: 300,
                    round: false,
                    autoCropArea: 1,
                    modal: true,
                    guides: true,
                    center: true,
                    highlight: true,
                    background: true,
                    movable: true,
                    cropBoxMovable: true,
                    preview: '.cropper-preview'
                },
                degree: 0
            };
        },
        watch: {
            dialogVisible(val){
                this.Visible = val
            }
        },
        methods: {
            open(data) {
                this.isVisible = true;
                this.user = { ...data }
                this.options.img = this.user.avatar
            },
            handleChange(file){
                console.log(file)
                const isImg = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
                if (!isImg) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式')
                    return false
                }
                const img = URL.createObjectURL(file.raw)
                console.log(img)
                this.options.img = img

                return true
            },
            //图片缩放
            changeScale(num) {
                num = num || 1
                this.$refs.cropper.scale(num)
            },
            //向左旋转
            rotateLeft() {
                this.$refs.cropper.rotate(-90)
            },
            //向右旋转
            rotateRight() {
                this.$refs.cropper.rotate(90)
            },
            handleRemove(){
                console.log('handleRemove')
                // this.options.img = '@/assets/logo.png'
            },
            handleAvatarSuccess(){
                console.log('handleAvatarSuccess')
            },
            beforeAvatarUpload(file) {
                console.log('file:', file)
            },
            handleClose() {
                this.$emit('update:dialogVisible',false)
            },
            async httpRequest(file){
                _this.file = file
            },
            UploadAvatar(){
                const _this = this
                const base64 = this.$refs.cropper.getDataURL()
                const imgCreateTime = dayjs(new Date()).format('YYYY-MM-DD-HH-mm-ss')
                const filename = this.user.id +'-'+imgCreateTime
                const image = this.base64ToFile(base64,`${filename}.jpg`)
                // 将上传的文件附件转成二进制转给后台 this.form就是表单输入框的内容
                const formData = new FormData()
                formData.append("image", image);
                formData.append("id",this.user.id)
                changeAvatar(formData).then( (async(res) => {
                    const {code,data} = res
                    _this.user.avatar = data.url
                    if(code === 200){
                        updateUserInfo(_this.user).then( (res) => {
                            const {data,code} = res
                            console.log(_this.user)
                            if(code === 200){
                                console.log(_this.user.avatar)
                                this.$message.success("修改成功！")
                                this.isVisible = false
                                this.reload()
                            }
                        })
                        console.log("图片上传至图床成功！")
                    }else{
                        this.$message.warning("修改失败！")
                    }
                    this.isUploadPic = false;
                }))
            },
            base64ToFile(dataUrl,fileName){
                var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], fileName, {type:mime});
            }
        }
    };
</script>
<style lang="scss">
    .avatar-dialog .el-dialog{
        max-width: 800px;
        overflow: hidden;
    }

    .demo-container {
        /*width: 100vw;*/
        /*height: 100vh;*/
        padding: 20px;
        .cropper-wrapper {
            width: 70%;
            height: 400px;
        }
        .cropper-preview {
            // width: 200px;
            width: 100%;
            height: 150px;
            overflow: hidden;
            border: 1px solid #25a3f3;
        }
        .demo-control {
            display: flex;
            margin-top: 20px;
            .upload-area {
                margin-right: 20px;
            }
        }
    }
    .round {
        border-radius: 50%;
    }


</style>