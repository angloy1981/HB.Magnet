<template>
  <el-card style="margin-bottom:20px;">
    <div
      slot="header"
      class="clearfix"
    >
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
          {{ user.roles }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">
          {{ user.name }}
        </div>
        <div class="user-role text-center text-muted">
          {{ user.roles | uppercaseFirstChar }}
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon name="education" /><span>Education</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            JS in Computer Science from the University of Technology
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon name="skill" /><span>Skills</span>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="51" />
          </div>
          <div class="progress-item">
            <span>Typescript</span>
            <el-progress :percentage="45" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <el-progress :percentage="4" />
          </div>
          <div class="progress-item">
            <span>ESLint</span>
            <el-progress
              :percentage="100"
              status="success"
            />
          </div>
        </div>
      </div>
      <div class="block">
          <el-button
            class="item-btn"
            size="small"
            type="primary"
            @click.native.prevent = "changePassword"
          >
            {{ $t('navbar.changePassword') }}
          </el-button>
          <el-button
            class="item-btn"
            size="small"
            type="primary"
            @click.native.prevent="logout"
          >
            {{ $t('navbar.logOut') }}
          </el-button>
      </div>
    </div>

    <el-dialog
      v-el-draggable-dialog
      :visible.sync="dialogTableVisible"
      :title="$t('navbar.changePassword')"
    >
      <el-form
        ref="changePasswordForm"
        :model="changePasswordForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
      <el-form-item prop="oldpassword">
        <div>{{$t('login.oldPassword')}}</div>
        <div>
          <el-input 
          ref="oldpassword" 
          name="oldpassword" 
          :key="1" 
          type="password" 
          size = "small"
          v-model="changePasswordForm.oldpassword" 
          :placeholder="$t('login.oldPassword')"/>
        </div>
      </el-form-item>
      <el-form-item prop="newpassword">
        <div>{{$t('login.newPassword')}}</div>
        <div>
          <el-input 
          ref="newpassword" 
          name="newpassword" 
          :key="1" 
          type="password" 
          size = "small"
          v-model="changePasswordForm.newpassword" 
          :placeholder="$t('login.newPassword')"/>
        </div>
      </el-form-item>
      <el-form-item prop="confirmnewpassword">
        <div>{{$t('login.confirmNewPassword')}}</div>
        <div>
          <el-input 
          ref="confirmnewpassword" 
          name="confirmnewpassword" 
          :key="1" 
          type="password" 
          size = "small"
          v-model="changePasswordForm.confirmnewpassword" 
          :placeholder="$t('login.confirmNewPassword')"/>
        </div>
      </el-form-item>
        <div>
          <el-button
            :loading="loading"
            size="small"
            type="primary"
            @click.native.prevent="handleChangePassword"
          >
          {{ $t('permission.confirm') }}
          </el-button>
            <el-button
              :loading="loading"
              size="small"
              type="primary"
              @click.native.prevent="handleCancel"
            >
            {{ $t('permission.cancel') }}
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </el-card>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IProfile } from '../index.vue'
import PanThumb from '@/components/PanThumb/index.vue'
import local from '../../i18n-demo/local'
import LangSelect from '@/components/LangSelect/index.vue'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'UserCard',
  components: {
    PanThumb
  }
})
export default class extends Vue {
  @Prop({ required: true }) private user!: IProfile
  private dialogTableVisible = false
  private loading = false
  private changePasswordForm = {
    oldpassword: '',
    newpassword: '',
    confirmnewpassword:''
  }
  private validateOldPassword = (rule: any, value: string, callback: Function) => {
    if(value == ''){
      callback(new Error('The password can not be null'))
    }
    else {
      callback()
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if(value == ''){
      callback(new Error('The password can not be null'))
    }else if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
    }
  }
  private validateConfirmPassword = (rule: any, value: string, callback: Function) => {
    if (value != this.changePasswordForm.newpassword) {
      callback(new Error('The confirm password must be same as new password'))
    } else {
      callback()
    }
  }
  private loginRules = {
    oldpassword: [{ validator: this.validateOldPassword, trigger: 'blur' }],
    newpassword: [{ validator: this.validatePassword, trigger: 'blur' }],
    confirmnewpassword: [{ validator: this.validateConfirmPassword, trigger: 'blur' }]
  }
  
  private async logout() {
    await UserModule.LogOut()
    this.$router.push(`/login?redirect=${this.$route.fullPath}`).catch(err => {
      console.warn(err)
    })
  }
  private changePassword(){
    this.dialogTableVisible=true
  }
  private handleChangePassword(){
    (this.$refs.changePasswordForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        this.loading = true
        UserModule.ChangePassword( { "currentPassword": this.changePasswordForm.oldpassword , "newPassword": this.changePasswordForm.newpassword})
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false
        }, 0.5 * 1000)
        
        this.dialogTableVisible=false
      }else{
        this.loading = true
        return false
    }})
  }
  private handleCancel(){
    this.dialogTableVisible=false
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
