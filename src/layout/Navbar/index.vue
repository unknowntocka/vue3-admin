<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { useUserStore } from '@/store/modules/user'
import {
  Search as IconSearch,
  Message as IconMessage,
  Remind as IconRemind,
  Down as IconDown,
  Caution as IconCaution,
  SettingTwo as IconSettingTwo,
  Peoples as IconPeoples,
  HamburgerButton as IconHamburgerButton
} from '@icon-park/vue-next'
import { getMessage } from '@/api/socket'

import type { MessageItem } from '@/interfaces/socket'

interface State {
  keyword: string
  messageList: MessageItem[]
}

const state: State = reactive({
  keyword: '',
  messageList: []
})

const userStore = useUserStore()

const name = computed(() => {
  return userStore.name
})

const avatar = computed(() => {
  return userStore.avatar
})

const getMessageList = async () => {
  const res = await getMessage()
  state.messageList = res.data.messageList
}

onMounted(() => {
  getMessageList()
})


</script>

<template>
  <div class="navbar">
    <div class="navbar-left">
        <img src="@/icons/logo.svg" />
        <icon-hamburger-button theme="outline" size="24" fill="#333"/>
    </div>
    <div class="navbar-right">
      <div class="navbar-search__wrapper">
        <div class="navbar-search">
          <icon-search class="navbar-search__icon" theme="outline" size="16" />
          <input
            v-model="state.keyword"
            class="navbar-search__inner"
            placeholder="输入内容并按下回车搜索"
            type="text"
          />
        </div>
      </div>
      <div class="navbar-nav">
        <div class="nav-item icon">
          <el-dropdown
            trigger="click"
            placement="bottom-end"
            :teleported="false"
          >
            <icon-message theme="outline" size="24" />
            <template #dropdown>
              <div class="dropdown-title">消息</div>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in state.messageList" :key="item.id">
                  <div class="message-item">
                    <img class="message-avatar" :src="item.avatar" />
                    <div class="message">
                      <div class="message__name">{{ item.nickname }}</div>
                      <div class="message__content elip">{{ item.lastMessage }}</div>
                    </div>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="nav-item icon">
          <el-dropdown
            trigger="click"
            placement="bottom-end"
            :teleported="false"
          >
            <icon-remind theme="outline" size="24" />
            <template #dropdown>
              <div class="dropdown-title">通知</div>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div class="notification-item">
                    <div class="notification-icon">
                      <icon-caution theme="outline" size="24" fill="#333"/>
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div class="notification-item">
                    <div class="notification-icon">
                      <icon-setting-two theme="outline" size="24" fill="#333"/>
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div class="notification-item">
                    <div class="notification-icon">
                      <icon-peoples theme="outline" size="24" fill="#333"/>
                    </div>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="nav-item profile">
          <img class="profile__avatar" :src="avatar" />
          <span class="profile__name">{{ name }}</span>
          <icon-down theme="outline" size="16" fill="#333"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  height: 60px;
  border-bottom: 1px solid var(--border-color);
  background-color: #fff;

  .navbar-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: 257px;
    height: 60px;
    border-right: 1px solid var(--border-color);
  }

  .navbar-right {
    display: flex;
    flex: 1;
    padding: 0 20px;
  }

  .navbar-search__wrapper {
    flex: 1;
    padding-right: 20px;
    padding-block: 10px;
    margin-right: 20px;

    .navbar-search {
      padding: 0 10px;
      height: 100%;
      background: #ececec;
      border-radius: 4px;

      .navbar-search__icon {
        vertical-align: middle;
      }

      .navbar-search__inner {
        padding: 0 10px;
        width: calc(100% - 18px);
        height: 100%;
        background: #ececec;

        &::placeholder {
          font-size: 16px;
        }
      }
    }
  }

  .navbar-nav {
    display: flex;
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: center;

    .icon {
      margin-right: 20px;

      .i-icon {
        color: var(--icon-gray);
        cursor: pointer;
      }
    }

    :deep(.el-scrollbar) {
      .dropdown-title {
        padding-inline: 16px;
        padding-block: 5px;
        font-size: 16px;
      }

      .message-item {
        display: flex;
        align-items: center;

        .message-avatar {
          width: 36px;
          height: 36px;
          object-fit: contain;
          border-radius: 50%;
        }

        .message {
          margin-left: 20px;

          &__name {
            margin-bottom: 8px;
            font-size: 16px;
            color: var(--main-text-color);
          }

          &__content {
            width: 120px;
            font-size: 14px;
            color: var(--secondary-text-color);
          }
        }
      }

      .notification-item {
        display: flex;
        align-items: center;

        .notification-icon {
          width: 36px;
          height: 36px;
          text-align: center;
          background: #ccc;
          border-radius: 50%;
          line-height: 30px;

          .i-icon {
            vertical-align: middle;
          }
        }
      }
    }

    .profile {
      margin: 0 20px;

      &__avatar {
        margin-right: 10px;
        width: 32px;
        height: 32px;
        vertical-align: middle;
      }

      &__name {
        vertical-align: middle;
        display: inline-block;
        width: 60px;
        text-align: center;
      }

      .i-icon {
        margin-left: 10px;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }
}
</style>
