export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必传内容',
      trigger: 'blur' //当失去焦点就验证
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码没有填写',
      trigger: 'blur' //当失去焦点就验证
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3个以上字母或数字',
      trigger: 'blur'
    }
  ]
}
