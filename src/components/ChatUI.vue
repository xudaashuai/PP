<template>

  <div class="chat-ui">
    <div class="message-list" id="m">
      <div v-for="item in messages" :class="item.name==username?'right':'left'">
        <div class="name">
          {{item.name}}
        </div>
        <div class="message">
          <h3>{{item.content}}</h3>
        </div>
      </div>

      <span id="msg_end"></span>
    </div>

    <Input type="textarea" placeholder="输入爱的讯息吧"
           :autosize="{minRows: 5,maxRows: 5}"
           v-model="message.content"
           @on-keyup.enter='keyup'
    ></Input>
  </div>
</template>
<script>
  export default {
    name: 'ChatUI',
    created:function () {
      this.messages=JSON.parse(this.$localStorage.get('messages','[]'))
      console.log(this.messages)
    },
    data() {
      return {
        messages: [
          {
            content: '你好呀，超爱你的',
            name: 't',
          }
        ],
        message: {
          content: ''
        }
      }
    },
    computed:{
      username () {
        return this.$store.getters.username
      }
    },
    sockets: {
      message: function (data) {
        console.log(data)
        this.messages.push(data)
        this.$localStorage.set('messages',JSON.stringify(this.messages))

        console.log(this.messages)
        setTimeout(function () {
          let t=document.getElementById('m')
          t.scrollTop=t.scrollHeight
        },100)
      }
    },
    methods: {
      keyup: function (event) {
        this.$socket.emit('message', this.message)
        this.messages.push({
          name:this.username,
          content: this.message.content
        })
        this.$localStorage.set('messages',JSON.stringify(this.messages))
        console.log(this.messages)
        this.message.content = ''
        this.$Notice.info({
          desc: '发送成功了呢'
        })
        setTimeout(function () {
          let t=document.getElementById('m')
          t.scrollTop=t.scrollHeight
        },100)
      }
    }
  }
</script>

<style>
  .chat-ui {
    flex-grow: 1;
    background-color: #eeeeee;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .message-list {
    overflow: auto;
    flex-grow: 1;
    display: flex;
    padding: 5px;
    flex-direction: column;
    align-items: flex-start;
  }
  .left , .right{
    display: flex;
    flex-direction: column;
  }
  .left {
    align-self: flex-start;
    border-radius: 10px;
  }

  .right {
    align-self: flex-end;
  }

  .name {
    text-align: left;
    padding: 3px 3px;
    background-color: #cccccc;
    border-radius: 5px;
    align-self: flex-start;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .right>.name{
    text-align: right;
    align-self: flex-end;
  }
  .message {
    border-radius: 10px;
    padding: 20px;

  }

  .left > .message {
    background-color: #ffffff;
  }

  .right > .message {
    background-color: seagreen;
  }

  .input {

  }
</style>
