<template>
  <Col span="8" offset="8">
  <Form inline>
    <FormItem prop="user">
      <Input type="text" v-model="username" placeholder="Username">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="login">Signin</Button>
    </FormItem>
  </Form>
  </Col>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        username: ''
      }
    },
    sockets:{
      login: function(data){
        if (data.status){
          console.log('登陆成功',data)
          this.$store.commit({
            type: 'login',
            username: this.username
          })
          this.$store.commit({
            type: 'users',
            users: data.data
          })
          this.$router.push('index')
        }else{
          console.log('登录失败，这个用户名有人用啦。')
        }
      },
    },
    methods:{
      login:function () {
        this.$socket.emit('login', {
          type: 'login',
          username: this.username
        });
      }
    }
  }
</script>

<style>

</style>
