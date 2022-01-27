<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div
      :key="key"
      style="margin-top:30px;"
    >
      <div>
        <span
          v-permission="['ADMIN']"
          class="permission-alert"
        >
          Only
          <el-tag
            class="permission-tag"
            size="small"
          >ADMIN</el-tag> can see this
        </span>
        <el-tag
          v-permission="['ADMIN']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['ADMIN']"
        </el-tag>
      </div>

      <div>
        <span
          v-permission="['EDITOR']"
          class="permission-alert"
        >
          Only
          <el-tag
            class="permission-tag"
            size="small"
          >EDITOR</el-tag> can see this
        </span>
        <el-tag
          v-permission="['EDITOR']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['EDITOR']"
        </el-tag>
      </div>

      <div>
        <span
          v-permission="['ADMIN','EDITOR']"
          class="permission-alert"
        >
          Both
          <el-tag
            class="permission-tag"
            size="small"
          >ADMIN</el-tag> and
          <el-tag
            class="permission-tag"
            size="small"
          >EDITOR</el-tag> can see this
        </span>
        <el-tag
          v-permission="['ADMIN','EDITOR']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['ADMIN','EDITOR']"
        </el-tag>
      </div>
    </div>

    <div
      :key="'checkPermission'+key"
      style="margin-top:60px;"
    >
      <aside>
        {{ $t('permission.tips') }}
        <br> e.g.
      </aside>

      <el-tabs
        type="border-card"
        style="width:550px;"
      >
        <el-tab-pane
          v-if="checkPermission(['ADMIN'])"
          label="ADMIN"
        >
          ADMIN can see this
          <el-tag
            class="permission-sourceCode"
            type="info"
          >
            v-if="checkPermission(['ADMIN'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission(['EDITOR'])"
          label="EDITOR"
        >
          Editor can see this
          <el-tag
            class="permission-sourceCode"
            type="info"
          >
            v-if="checkPermission(['EDITOR'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission(['ADMIN','EDITOR'])"
          label="ADMIN-OR-EDITOR"
        >
          Both ADMIN or EDITOR can see this
          <el-tag
            class="permission-sourceCode"
            type="info"
          >
            v-if="checkPermission(['ADMIN','EDITOR'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { checkPermission } from '@/utils/permission' // Use permission directly
import SwitchRoles from './components/SwitchRoles.vue'

@Component({
  name: 'DirectivePermission',
  components: {
    SwitchRoles
  }
})
export default class extends Vue {
  private key = 1 // 为了能每次切换权限的时候重新初始化指令
  private checkPermission = checkPermission

  private handleRolesChange() {
    this.key++
  }
}
</script>

<style lang="scss" scoped>
.permission-alert {
  width: 320px;
  margin-top: 15px;
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
}

.permission-sourceCode {
  margin-left: 15px;
}

.permission-tag {
  background-color: #ecf5ff;
}
</style>
