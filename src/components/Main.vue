<template>
  <div class="layout">
    <FriendList></FriendList>
    <ChatUI></ChatUI>
  </div>
</template>

<script>
  import ChatUI from '@/components/ChatUI'
  import FriendList from '@/components/FriendList'
  export default {
    name: 'Main',
    components: {
      ChatUI:ChatUI,
      FriendList:FriendList
    },sockets:{
      info: function(data){
        console.log(data)
        if (data.data){
          this.$store.commit({
            type: 'users',
            users: data.data
          })
        }
        this.$Notice.info({
          title:'通知',
          desc: data.content
        })
      },
      message:function (data) {

      }
    },
    data() {
      return {}
    }
  }
</script>

<style>
.layout{
  height: 100%;
  display: flex;
  width: 100%;
}
</style>
