<template>
  <div class="friend-list">

    <Menu v-if="friends.length!==0" theme="dark" :active-name="now" style="height: 100%;overflow: auto">

        <MenuItem v-for="item in friends" :name="item">
          {{item}}
        </MenuItem>
    </Menu>
  </div>
</template>

<script>
    export default {
        name: 'FriendList',
        data() {
            return {
              now:null
            }
        },
      computed:{
        friends () {
          return this.$store.getters.friends
        }
      }
    }
</script>

<style>
.friend-list{
}
</style>
